from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
import main.service as service 


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh',
    ]
    
    return Response(routes)

@api_view(['POST'])
def searchCenters(request):
    print(request.data)
    return Response(service.searchCenter(request.data))

@api_view(['PUT'])
@permission_classes([IsAdminUser, IsAuthenticated])
def addCenter(request):
    try:
        service.addCenter(request.data+{'created_by':request.user})
        return Response(status=200)
    except:
        return Response(status=500)