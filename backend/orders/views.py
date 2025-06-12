from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import transaction
from django.conf import settings
import razorpay

from .models import Order, OrderItem, CartItem
from .serializers import OrderSerializer, CartItemSerializer
from store.models import Product


class CartItemListCreateView(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        existing_item = CartItem.objects.filter(user=user, product=product).first()

        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
        else:
            serializer.save(user=user)


class CartItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        user = request.user
        cart_items = CartItem.objects.filter(user=user).select_related('product')

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        total = sum(item.product.price * item.quantity for item in cart_items)
        amount_in_paise = int(total * 100)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

        try:
            razorpay_order = client.order.create({
                "amount": amount_in_paise,
                "currency": "INR",
                "payment_capture": 1
            })

            order = Order.objects.create(user=user, total_amount=total, status='PENDING')

            order_items = [
                OrderItem(order=order, product=item.product, quantity=item.quantity, unit_price=item.product.price)
                for item in cart_items
            ]
            OrderItem.objects.bulk_create(order_items)

            cart_items.delete()

            return Response({
                "order": OrderSerializer(order).data,
                "razorpay_order_id": razorpay_order["id"],
                "razorpay_key": settings.RAZORPAY_KEY_ID,
                "amount": amount_in_paise,
                "currency": "INR"
            }, status=status.HTTP_201_CREATED)

        except razorpay.errors.BadRequestError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RazorpayOrderView(APIView):
    def post(self, request, *args, **kwargs):
        # Optional Razorpay order logic if needed separately
        pass
