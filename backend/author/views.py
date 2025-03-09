from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from author.tasks import test, add_new_authors
from elasticsearch_dsl import Q
from author.documents import AuthorDocument
from author.services import get_queue  # get_queue fonksiyonunu import ettik
import logging
from api.tasks import update_proxies

logger = logging.getLogger(__name__)

class AuthorViewSet(viewsets.ViewSet):
    @action(
    detail=False, 
    methods=['get'], 
    authentication_classes=[],
    permission_classes=[AllowAny]
    )
    def test(self, request):
        update_proxies.delay()
        return Response({"Message": test()}, status=status.HTTP_202_ACCEPTED)

    @action(
        detail=False, 
        methods=['get'], 
        authentication_classes=[JWTAuthentication],
        permission_classes=[IsAuthenticated, IsAdminUser]
    )
    def search_author(self, request):
        query = request.query_params.get('query', None)
        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not query.strip():
            return Response({"error": "Query cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            q = self.build_search_query(query)
            search = AuthorDocument.search().query(q)
            response = search.execute()

            if not response.hits:
                return Response({"message": "No authors found."}, status=status.HTTP_404_NOT_FOUND)

            authors = [{"username": hit.username, "name": hit.name} for hit in response]
            return Response({"authors": authors}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to execute search query: {str(e)}")
            return Response({"error": f"Failed to execute search query: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(
    detail=False, 
    methods=['post'], 
    authentication_classes=[JWTAuthentication],
    permission_classes=[IsAuthenticated, IsAdminUser]
    )
    def scrape_authors(self, request):
        usernames = request.data.get("usernames", [])
        if not isinstance(usernames, list) or not usernames:
            return Response({"error": "Usernames must be a non-empty list."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            add_new_authors.delay(usernames)
            logger.info(f"Bulk scraping process started for {len(usernames)} authors.")
            return Response({"message": f"Bulk scraping process started for {len(usernames)} authors."}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            logger.error(f"Failed to start bulk scraping process: {str(e)}")
            return Response({"error": f"Failed to start bulk scraping process: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(
    detail=False,
    methods=['get'],
    authentication_classes=[],
    permission_classes=[AllowAny]
    )
    def author_detail(self, request):
        username = request.query_params.get('username', None)
        if not username:
            return Response({"error": "Username parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not username.strip():
            return Response({"error": "Username cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            search = AuthorDocument.search().query("match", username=username)
            response = search.execute()

            if not response.hits:
                return Response({"error": "Author not found."}, status=status.HTTP_404_NOT_FOUND)

            author = response[0]

            author_details = {
                "username": author.username,
                "name": author.name,
                "profile_image_url": author.profile_image_url,
                "followers": author.followers
            }

            return Response(author_details, status=status.HTTP_200_OK)
    
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(
    detail=False,
    methods=['get'],
    authentication_classes=[JWTAuthentication],
    permission_classes=[IsAuthenticated, IsAdminUser]
    )
    def get_queue_details(self, request):
        try:
            queued_authors = get_queue()
            if not queued_authors:
                return Response({"message": "No authors in the queue."}, status=status.HTTP_404_NOT_FOUND)
            
            return Response({"queued_authors": queued_authors}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Failed to get queued authors: {str(e)}")
            return Response({"error": f"Failed to get queued authors: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def build_search_query(self, query):
        return Q(
            "bool",
            should=[
                Q("match", username={"query": query, "fuzziness": "AUTO"}),
                Q("match", name={"query": query, "fuzziness": "AUTO"}),
            ],
            minimum_should_match=1
        )
