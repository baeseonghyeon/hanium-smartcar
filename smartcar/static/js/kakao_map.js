var container = document.getElementById('map-kakao');
var options = {
	center: new kakao.maps.LatLng(35.5178106, 129.3945416),
	level: 2
};

var map = new kakao.maps.Map(container, options);