from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[])
    def register(self, request):
        """
        Register a new user.
        """
        username = request.data.get("username", None)
        password = request.data.get("password", None)
        email = request.data.get("email", None)

        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )
            logger.info(f"User {username} registered successfully.")
            return Response(
                {"message": "User registered successfully.", "user_id": user.id},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            logger.error(f"Failed to register user: {str(e)}")
            return Response(
                {"error": "Failed to register user."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['post'])
    def login(self, request):
        """
        Login a user and return tokens along with user information.
        """
        logger.info('Methoda giriş yapıldı')
        username = request.data.get("username", None)
        password = request.data.get("password", None)

        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(username=username).first()

        if user is None or not user.check_password(password):
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user_roles = user.groups.all()
        roles = [group.name for group in user_roles]

        try:
            refresh = RefreshToken.for_user(user)
            response_data = {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'roles': roles,
                },
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                }
            }
            logger.info(f"User {username} logged in successfully.")
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to generate tokens: {str(e)}")
            return Response(
                {"error": "Failed to generate tokens."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )