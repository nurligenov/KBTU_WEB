from django.urls import path
from api import views


urlpatterns = [
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<int:product_id>', views.product_detail_view, name='product-detail'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('categories/<int:category_id>/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('categories/<int:category_id>/products/', views.ProductListView.as_view(),
         name='product-category-list'
         ),
    path('companies/', views.CompanyListView.as_view(), name='company-list'),
    path('companies/<int:company_id>', views.CompanyDetailView.as_view(), name='company-detail'),
    path('companies/city/<str:city_name>', views.CompanyListView.as_view(slug='city'), name='company-city'),
    path('companies/<int:company_id>/vacancies/', views.VacancyListView.as_view(), name='company-vacancy-list'),
    path('vacancies/', views.VacancyListView.as_view(), name='vacancy-list'),
    path('vacancies/<int:vacancy_id>', views.VacancyDetailView.as_view(), name='vacancy-detail'),
    path('vacancies/top_ten/', views.VacancyListView.as_view(slug='top_ten'), name='vacancy-top_ten-list'),
]