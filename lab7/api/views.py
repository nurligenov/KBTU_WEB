from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from .models import Category, Product, Company, Vacancy
from django.http import JsonResponse
from .serializers import ProductSerializer, CategorySerializer, CompanySerializer, VacancySerializer


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


def product_detail_view(request, *args, **kwargs):
    if request.method == 'GET':
        product_id = kwargs.get('product_id', None)
        if not product_id:
            return JsonResponse({}, safe=False)
        serializer = ProductSerializer(Product.objects.filter(id=product_id).first(), many=False)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({}, safe=False)


class ProductDetailView(DetailView):
    model = Product

    def get_object(self):
        return self.model.objects.filter(pk=self.kwargs['product_id']).first()

    def get(self, request, *args, **kwargs):
        product = self.get_object()
        if not product:
            return JsonResponse({}, safe=False)
        serializer = ProductSerializer(product, many=False)
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


class CompanyListView(ListView):
    model = Company
    slug = None

    def get_queryset(self, *args, **kwargs):
        if self.slug == 'city':
            city = kwargs.get('city_name')
            print(city)
            return Company.objects.filter(city=city)

        return Company.objects.all()

    def get(self, request, *args, **kwargs):
        serializer = CompanySerializer(self.get_queryset(*args, **kwargs), many=True)
        return JsonResponse(serializer.data, safe=False)


class CompanyDetailView(DetailView):
    model = Company

    def get_object(self):
        return self.model.objects.filter(pk=self.kwargs['company_id']).first()

    def get(self, request, *args, **kwargs):
        company = self.get_object()
        if not company:
            return JsonResponse({}, safe=False)
        serializer = CompanySerializer(company, many=False)
        return JsonResponse(serializer.data, safe=False)


class VacancyListView(ListView):
    model = Vacancy
    slug = None

    def get_queryset(self):
        company_id = self.kwargs.get('company_id')
        if company_id:
            return Vacancy.objects.filter(company_id=company_id)
        if self.slug == 'top_ten':
            return Vacancy.objects.all().order_by('-salary')[:10]
        return Vacancy.objects.all()

    def get(self, request, *args, **kwargs):
        serializer = VacancySerializer(self.get_queryset(), many=True)
        return JsonResponse(serializer.data, safe=False)


class VacancyDetailView(DetailView):
    model = Vacancy

    def get_object(self):
        return self.model.objects.filter(pk=self.kwargs['vacancy_id']).first()

    def get(self, request, *args, **kwargs):
        vacancy = self.get_object()
        if not vacancy:
            return JsonResponse({}, safe=False)
        serializer = VacancySerializer(vacancy, many=False)
        return JsonResponse(serializer.data, safe=False)
