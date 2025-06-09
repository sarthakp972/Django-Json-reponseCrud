from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # root path
    path('api/products',views.ProductAPI.as_view(),name='products')
]