from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from blog.documents import BlogDocument
from elasticsearch_dsl import Q

class BlogViewSet(viewsets.ModelViewSet):
    document_class = BlogDocument

    @action(
        detail=False, 
        methods=['get'], 
        authentication_classes=[JWTAuthentication], 
        permission_classes=[AllowAny]
    )
    def get_blog(self, request):
        """
        ElasticSearch ile belirli bir blogun detaylarını getirir.
        """
        blog_id = request.query_params.get('id', None)
        if not blog_id:
            return Response({"error": "Blog ID gereklidir."}, status=status.HTTP_400_BAD_REQUEST)

        search = self.document_class.search().query(Q("term", _id=blog_id))
        response = search.execute()

        if not response.hits:
            return Response({"error": "Blog bulunamadı."}, status=status.HTTP_404_NOT_FOUND)

        blog = response.hits[0]
        blog_data = {
            "id": blog.meta.id,
            "title": blog.title,
            "description": blog.description,
            "author_name": blog.author.name,
            "content": blog.content,
            "author_image": blog.author.profile_image_url,
            "author_username": blog.author.username,
            "banner": blog.banner,
            "read_time": blog.read_time,
            "date": blog.date,
            "tags": [tag.name for tag in blog.tags]
        }
        return Response(blog_data, status=status.HTTP_200_OK)

    @action(
        detail=False, 
        methods=['post'], 
        authentication_classes=[JWTAuthentication],
        permission_classes=[IsAuthenticated, IsAdminUser]
    )
    def search_blog(self, request):
        query = request.query_params.get('query', None)
        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        q = self.build_search_query(query)
        search = self.document_class.search().query(q)
        response = search.execute()

        blogs = [
            {"id": hit.meta.id, "title": hit.title, "author_name": hit.author.name, "author_username": hit.author.username, "tags": [tag.name for tag in hit.tags]}
            for hit in response
        ]
        return Response({"blogs": blogs}, status=status.HTTP_200_OK)
    
    def build_search_query(self, query):
        return Q(
            "bool",
            should=[
                Q("match", title={"query": query, "fuzziness": "AUTO"}),
                Q("nested", path="tags", query=Q("match", tags__name={"query": query, "fuzziness": "AUTO"})),
                Q("match", author__name={"query": query, "fuzziness": "AUTO"}),
                Q("match", author__username={"query": query, "fuzziness": "AUTO"}),
            ],
            minimum_should_match=1
        )

    @action(
        detail=False,
        methods=['get'],
        authentication_classes=[],
        permission_classes=[AllowAny]
    )
    def list_blogs(self, request):
        """
        Elasticsearch üzerinden pagination ve filtreler ile tüm blogları getirir.
        """
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 10))

        # Filtreler
        sort_by = request.query_params.get('sortBy', 'newest')  # Varsayılan sıralama: newest
        read_time_min = int(request.query_params.get('readTime_min', 0))  # Varsayılan min: 0
        read_time_max = int(request.query_params.get('readTime_max', 60))  # Varsayılan max: 60
        tag = request.query_params.get('tag', '')  # Varsayılan: boş string
        search_query = request.query_params.get('search', '')  # Varsayılan: boş string

        # Elasticsearch sorgusu oluştur
        search = self.document_class.search()

        # Sıralama
        if sort_by == 'newest':
            search = search.sort('-date')  # Tarihe göre azalan (en yeni)
        elif sort_by == 'oldest':
            search = search.sort('date')  # Tarihe göre artan (en eski)

        # Okuma süresi filtresi
        search = search.filter('range', read_time={'gte': read_time_min, 'lte': read_time_max})

        # Tag filtresi
        if tag:
            search = search.query(
                Q('nested', 
                path='tags', 
                query=Q('match', **{'tags.name': tag}))
        )

        # Arama filtresi (başlık veya açıklamada)
        if search_query:
            search = search.query(
                'multi_match',
                query=search_query,
                fields=['title', 'description'],
                fuzziness='AUTO'
            )

        # Pagination
        start = (page - 1) * page_size
        search = search[start:start + page_size]

        # Sorguyu çalıştır
        response = search.execute()
        total_blogs = response.hits.total.value

        # Blog verilerini hazırla
        blogs = [
            {
                "id": hit.meta.id,
                "title": hit.title,
                "description": hit.description,
                "author_name": hit.author.name,
                "author_image": hit.author.profile_image_url,
                "author_username": hit.author.username,
                'banner': hit.banner,
                "read_time": hit.read_time,
                "date": hit.date,
                "tags": [tag.name for tag in hit.tags]
            }
            for hit in response
        ]

        # Yanıtı döndür
        return Response({
            "total_blogs": total_blogs,
            "page": page,
            "page_size": page_size,
            "blogs": blogs
        }, status=status.HTTP_200_OK)

    @action(
        detail=False, 
        methods=['get'], 
        authentication_classes=[],
        permission_classes=[AllowAny]
    )
    def top_tags(self, request):
        """
        En çok kullanılan 10 etiketi döndürür.
        """
        try:
            top_tags = self.document_class.get_top_tags()
            return Response({"top_tags": top_tags}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)