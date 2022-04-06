from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from .models import Category, Product
from django.http import JsonResponse
from .serializers import ProductSerializer, CategorySerializer


class ProductListView(ListView):
    model = Product
    paginate_by = 10

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        if category_id:
            return Product.objects.filter(category_id=category_id)
        return Product.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = ProductSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class ProductDetailView(DetailView):
    model = Product

    def get_object(self):
        return self.model.objects.filter(pk=self.kwargs['product_id']).first()

    def get(self, request, *args, **kwargs):
        product = self.get_object()
        if not product:
            return JsonResponse({}, safe=False)
        serializer = CategorySerializer(product, many=False)
        return JsonResponse(serializer.data, safe=False)


class CategoryListView(ListView):
    model = Category
    paginate_by = 10

    def get_queryset(self):
        return Category.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = CategorySerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class CategoryDetailView(DetailView):
    model = Category

    def get_object(self):
        return self.model.objects.filter(pk=self.kwargs['category_id']).first()

    def get(self, request, *args, **kwargs):
        category = self.get_object()
        if not category:
            return JsonResponse({}, safe=False)
        serializer = CategorySerializer(category, many=False)
        return JsonResponse(serializer.data, safe=False)
