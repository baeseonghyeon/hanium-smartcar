"""smartcar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

from rest_framework import routers
import main.api
import map.api


router = routers.DefaultRouter()
router.register('CarInfo', main.api.CarViewSet)
router.register('PiInfo', main.api.PiViewSet)
router.register('ContainerInfo', main.api.ContainerViewSet)
router.register('MapInfo', map.api.MapViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', TemplateView.as_view(template_name='auth.html'), name='auth'),
    path('api/', include((router.urls, 'CarInfo'), namespace='CarInfo')),
    path('api/', include((router.urls, 'PiInfo'), namespace='PiInfo')),
    path('api/', include((router.urls, 'ContainerInfo'), namespace='ContainerInfo')),
    path('api/', include((router.urls, 'MapInfo'), namespace='MapInfo')),
    path('map/', include('map.urls')),
    path('main/', include('main.urls')),
    path('openapi/', include('openapi.urls')),
    path('user/', include('django.contrib.auth.urls')),
]
