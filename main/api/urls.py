from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('centers/search/', views.searchCenters),
    path('centers/add/', views.addCenter),
    path('centers/slot/avilable/', views.getSlotAvilable),
    path('centers/slot/book/', views.BookSlot),
    path('centers/slot/booked/', views.getBookedSlots),
    path('signup/', views.signUp)
]
