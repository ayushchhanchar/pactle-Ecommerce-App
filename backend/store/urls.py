

from django.urls import path
from .views import ProductListView, ProductDetailView, ReviewCreateView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/<int:pk>/reviews/', ReviewCreateView.as_view(), name='review-create'),  # ✅ FIXED
]
