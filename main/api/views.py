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
        token['is_superuser'] = user.is_superuser
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
        post = request.data
        post['user'] = request.user
        service.addCenter(post)
        return Response(status=200)
    except Exception as e:
        print(e)
        return Response(status=500)
    
@api_view(['POST'])
def getSlotAvilable(request):
    res = service.getSlotAvilable(request.data)
    return Response(res)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def BookSlot(request):
    try:
        post = request.data
        post['user'] = request.user
        service.bookSlots(post)
        return Response(status=200)
    except Exception as e:
        print(e)
        return Response(status=500)
    
    
@api_view(['POST'])
@permission_classes([IsAdminUser, IsAuthenticated])
def getBookedSlots(request):
    return Response(service.GetBookedSlot(request.data))