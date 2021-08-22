from django.urls import path
from . import views

# app_name = "availability_list"
urlpatterns = [
        path('', views.AvailabilityView.as_view(), name='availability_list'),
 ]
