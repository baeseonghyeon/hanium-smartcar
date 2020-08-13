# DB Settings

1. **mysql정보**
   - MYSQL 8.0
   - root계정
   - 비밀번호 :  1111
   - smartcar database 생성
2. **데이터베이스/테이블 생성**

```
(mysql) create database smartcar
(django) python manage.py makemigrations
(django) python manage.py migrate
```

3. **insert**
   - 127.0.0.1/8000/api/MapInfo 의 Map에 입력 후 저장

```
8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8s8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8s8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8s8, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 8s8, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 8s8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8s8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8s8, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 8s8, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 8s8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8s8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8s8, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 8s8, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 8s8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8s
```

4. **외래키 관련 삭제방법**

```
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE table1;
TRUNCATE table2;

SET FOREIGN_KEY_CHECKS = 1;
```

5. **Model**

```
class CarInfo(models.Model):
	pi_id = models.ForeignKey(PiInfo, unique=True, on_delete = models.CASCADE)
	container_id = models.ForeignKey(ContainerInfo, unique=True, on_delete = models.CASCADE)
	car_name = models.CharField(max_length=20)
	car_route = models.CharField(max_length=100, null=True, default='')
	car_speed = models.CharField(max_length=5, null=True)
	car_arrive_time = models.CharField(max_length=20, null=True)
	car_destination_distance = models.CharField(max_length=20, null=True)
	car_now_situation = models.CharField(max_length=10, null=True)
	now_x = models.CharField(max_length=2, null=True, default='')
	now_y = models.CharField(max_length=2, null=True, default='')
	target_x = models.CharField(max_length=2, null=True, default='')
	target_y = models.CharField(max_length=2, null=True, default='')

class PiInfo(models.Model):
	pi_id = models.CharField(max_length=10, primary_key=True)
	battery = models.CharField(max_length=10)
	communication = models.CharField(max_length=10)
	car_type = models.CharField(max_length=10)
	picture = models.URLField(max_length=200)

class ContainerInfo(models.Model):
	container_id = models.CharField(max_length=10, primary_key=True)
	destination = models.CharField(max_length=10)
	container_company = models.CharField(max_length=10)
	container_product = models.CharField(max_length=10)
	container_shipment_day = models.CharField(max_length=10)

class PortInfo(models.Models):
	portname = models.CharField(max_length=10, primary_key=True)
	map = models.CharField(max_length=1000)

class UserInfo(models.Model):
	portname = models.ForeignKey(PortInfo, unique=True, on_delete=models.CASCADE)
	username = models.CharField(max_length=10, primary_key=True)
	
```

