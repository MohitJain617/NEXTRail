from django.http import request
from django.shortcuts import render
from typing import Any, Dict
from html5lib import serialize
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth import authenticate

from .serializer import UserSerializer
# Create your views here.


class LoginView(generics.GenericAPIView):
    def post(self, request, format=None):
        user_name = request.data.get('userName')
        password = request.data.get('password')
        user = authenticate(username=user_name, password=password)

        if user is not None:
            print(user.email)
            return Response(
                {
                "username": user.username, 
            "email": user.email, 
            "token": AuthToken.objects.create(user)[1]
            },
            status=status.HTTP_200_OK)

        else:
            return Response({"Authentication Error":"Invalid Credentials."}, 
            status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class RegisterUserView(generics.GenericAPIView):

    def post(self, request, format=None):
        # User.objects.all().delete()
        user_name = request.data.get('userName')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')

        try:
            match = User.objects.get(username=user_name)
        except User.DoesNotExist:
            try:
                match = User.objects.get(email=email)
            except User.DoesNotExist:
                # Unique
                user = User.objects.create_user(user_name, email, password)
                user.first_name = first_name
                user.last_name = last_name
                user.save()
                print(user)
                print(user_name, email, password, sep='\n')
                return Response({"username": user.username,
                 "email": user.email,
                  "token": AuthToken.objects.create(user)[1]}, status=status.HTTP_200_OK)
            return Response({"error": "Email in Use"}, status=status.HTTP_409_CONFLICT)

        return Response({"error": "User Name in Use"}, status=status.HTTP_409_CONFLICT)


class getUserView(generics.RetrieveAPIView):
    permission_classes=[
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user