from django.urls import path
from .views import (
    CartItemListCreateView,
    CartItemDetailView,
    OrderCreateView,
    RazorpayOrderView  # Make sure this exists in views.py
)

urlpatterns = [
    path('cart/', CartItemListCreateView.as_view(), name='cart-list-create'),
    path('cart/<int:pk>/', CartItemDetailView.as_view(), name='cart-detail'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('razorpay-order/', RazorpayOrderView.as_view(), name='razorpay-order'),
]
