from rest_framework import serializers
from .models import Category, Product, Company, Vacancy


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.CharField(source='category.id')

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'category_id', 'description')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'description', 'city', 'address')


class VacancySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', default='')

    class Meta:
        model = Vacancy
        fields = ('id', 'name', 'salary', 'description', 'company_name')
