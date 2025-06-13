from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from store.serializers import ProductSerializer
from store.models import Product

class CartItemSerializer(serializers.ModelSerializer):
    # Allow sending "product": 3 (id) from frontend
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )
    product_details = ProductSerializer(source='product', read_only=True)


    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_details', 'quantity']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'unit_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status', 'created_at', 'items']
        read_only_fields = ['user', 'status', 'created_at']
