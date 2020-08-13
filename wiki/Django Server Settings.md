# Django Server Settings

- 가상환경 에서 진행 권장

## 1. 장고 환경 세팅

**1.1 pip install**

```
python -m pip install --upgrade pip
```

**1.2 pip pakage install**

```
pip install -r requirements.txt
```

- [Pip List](./Pip List.md)

**1.3 앱(User) 생성**

```
python manage.py startapp user
```

**1.4 settings.py 설정**

​	1.4.1 installed_app 구간에 'users.apps.UsersConfig', 추가

​	1.4.2 database수정

```
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'smartcar',
    'USER': 'root',
    'PASSWORD': '1111',
    'HOST': 'localhost',
    'PORT': '3306',
  }
}
```

**1.5 urls.py 설정**

**1.6 Database 생성**

```
MYSQL CREATE DATABASE SMARTCAR
```

**1.7 migrate**

```
python manaeg.py migrate
```



## 2. Login 구현

**2.1 login 템플릿 생성**

​	2.1.1 templates/registration/login.html 생성

**2.2 settings.py 설정**

​	2.2.1 TEMPLATES부분에 'DIRS': [os.path.join(BASE_DIR, 'templates')], 추가

​	2.2.2 LOGIN_REDIRECT_URL = '/' 추가

​	2.2.3 LOGIN_REDIRECT_URL = 'auth'

​	2.2.4 LOGOUT_REDIRECT_URL = 'auth'

**2.3 auth 템플릿 생성**

​	2.3.1 templates/auth.html 

```html
loading...
{% block content %}
  {% if user.is_authenticated %}
  	<script>
    	var newURL = window.location.href+'main';
    	window.location.href = newURL;
    </script>
  {% else %}
  	<script>
    	var newURL = window.location.href+'user/login';
    	window.location.href = newURL;
    </script>
  {% endif %}
{% endblock %}
```

 2.4 url 세팅

​	2.4.1 smartcar/urls.py

```django
 from django.views.generic.base import TemplateView

 path('', TemplateView.as_view(template_name='auth.html'), name='auth'),
```



## 3. Main app 세팅

**3.1 앱(main)생성**

```
python manage.py startapp main
```

**3.2 settings.py 설정**

```
path('main/', include('main.urls')),
```

**3.3. urls.py 설정**

**3.4 템플릿 생성**

​	3.4.1 main.html 생성

**3.5 main/urls.py 설정**

​	3.5.1 main/urls.py 생성

```
  from django.views.generic.base import TemplateView
	from django.urls import path

	urlpatterns = [
 	 path('', TemplateView.as_view(template_name='main.html'), name='main'),
	]
```

**3.6 모델생성**

​	3.6.1main/models.py

```python
from django.db import models

	class MainInfo(models.Model):
  	portinfo = models.CharField(max_length=10)
  	portmap = models.CharField(max_length=1000)
  	
	class CarInfo(models.Model):
		carnumber = models.ForeignKey(MainInfo)
		container = models.CharField(max_length=20)
		destination = models.CharField(max_length=20)
		route = models.CharField(max_length=300)
		speed = models.CharField(max_length=10)
		communication = models.CharField(max_length=10)
		drivingmode = models.CharField(max_length=5)
```

**3.7 마이그레이션 & 마이그레이트**

```
python manage.py makemigrations
python manage.py migrate
```



## 4. Rest API 설정

 **4.1 settings.py installed_app 앱 설정**

```
'rest_framework',
```

**4.2 main/api.py 생성**

```
from .models import MainInfo, CarInfo
from rest_framework import serializers, viewsets

class MainSerialalizer(serializers.ModelSerializer):
  class Meta:
    model = MainInfo
    fields = 'all'

class MainViewSet(viewsets.ModelViewSet):
  queryset = MainInfo.objects.all()
  serializer_class = MainSerialalizer

class CarSerialalizer(serializers.ModelSerializer):
  class Meta:
    model = CarInfo
    fields = 'all'

class CarViewSet(viewsets.ModelViewSet):
  queryset = CarInfo.objects.all()
  serializer_class = CarSerialalizer
```

 **4.2 smartcar/urls.py**

```
from rest_framework import routers
import main.api

	router = routers.DefaultRouter()
	router.register('MainInfo', main.api.MainViewSet)
	router.register('CarInfo', main.api.CarViewSet)
	
	path('api/', include((router.urls, 'MainInfo'), namespace='MainInfo')),
 	path('api/', include((router.urls, 'CarInfo'), namespace='CarInfo')),
```

**4.3 STATICS설정**

​	4.3.1 settings.py

```
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
```

​	4.3.1 smartcar/static/js

​	4.3.2 smartcar/static/css

​	4.3.3 html 파일에 {% load static %} 추가

```
<script src="{% static 'js/portmap.js' %}"></script> 
```



## 5. 통신

**4.1 settings.py 설정**

​	4.1.1installed_app

```
'corsheaders',
```

​	4.2.2

```
middleware
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.common.CommonMiddleware', 

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
```



## 6. DB

6.1 DB정보

​	6.1.1 MYSQL 8.0

​	6.1.2 root계정 

​	6.1.3 비밀번호 1111

6.2 데이터베이스 생성

```
create database smartcar
```

6.3 마이그레이션 & 마이그레이트 & 어드민 계정 생성

```
python manage.py makemigrations
python manage.py migrate
python manage.py create superuser
```

 6.4  mysql root 계정 접속

```
use smartcar
```

 6.5 mysql truncate (외래키 걸렸을 때)

```
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE table1;
TRUNCATE table2;
SET FOREIGN_KEY_CHECKS = 1;
```

- models 수정시 null=True 속성을 추가해야 오류가 안남