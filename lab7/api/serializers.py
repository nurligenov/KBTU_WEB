from rest_framework import serializers
from .models import Category, Product


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.CharField(source='category.id')

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'category_id', 'description')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

