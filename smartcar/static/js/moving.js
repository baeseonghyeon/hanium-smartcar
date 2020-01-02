$(document).ready(function(){
playMap()
playCap()
playMap2()
playCap2()
playReturn()
playReturn2()
})
function sample(){
    //nfc키는 코드
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.10:8000/',
        dataType:'json',
        data : {
        },
        success: function(){
        }
    });
       $.ajax({
        type : 'POST',
        url : 'http://192.168.0.18:8000/',
        dataType:'json',
        data : {
        },
        success: function(){
        }
    });
}
function playMap(){
// 컨테이너 적재여부 검사
console.log('적재여부 검사중')
playMap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].car_route != "1" && data[0].container_id != "z" && data[0].sample == '1'){
            console.log('적재여부검사가 보냈다.')
            map();
            console.log(data[0].car_code);
            console.log(data[0].car_id);
            data_car(data[0].car_code, data[0].id)
            $.ajax({
                type : 'POST',
                url : 'http://127.0.0.1:8000/main/sample_change',
                dataType:'json',
                data : {
                    'id': 1
                },
                success: function(){
                }
            });
            }
        }
    });
}, 3000);
}
function playMap2(){
// 컨테이너 적재여부 검사
console.log('2적재여부 검사중')
playMap2 = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[1].car_route != "1" && data[1].container_id != "z" && data[1].sample == '1'){
            console.log('2적재여부검사가 보냈다.')
            map()
            data_car2(data[1].car_code, data[1].id)
//            clearInterval(playMap);
            $.ajax({
                type : 'POST',
                url : 'http://127.0.0.1:8000/main/sample_change',
                dataType:'json',
                data : {
                    'id': 2
                },
                success: function(){
                }
            });
            }
        }
    });
}, 3000);
}
function playCap(){
//차량으로부터 수행코드 받음
console.log('수행코드 받는중')
playCap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            var xxx = Number(data[0].for_index);
            var yyy = Number(data[0].for_commute)
            sleep(50)
            if(yyy == 2*xxx){
                console.log('안에 들어옴')
                moving1(data[0].id, data[0].now_behavior)
                if(data[0].car_finish == '99'){
                    console.log('finish들어옴')
                    console.log('끝!')
                $.ajax({
                    type : 'POST',
                    url : 'http://127.0.0.1:8000/main/reset_index',
                    dataType:'json',
                    data : {
                    'id': data[0].id,
                    },
                    success: function(){
                    }
                });
                map()
                }
                else{
                console.log('else실행')
                $.ajax({
                    type : 'POST',
                    url : 'http://127.0.0.1:8000/main/change_index',
                    dataType:'json',
                    data : {
                    'id': data[0].id,
                    },
                    success: function(){
                    }
                });
                }
            }
        }
    });
}, 500);
}
function playCap2(){
//차량으로부터 수행코드 받음
console.log('2수행코드 받는중')
playCap2 = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            var xxx = Number(data[1].for_index)
            var yyy = Number(data[1].for_commute)
            sleep(50)
            if(yyy == 2*xxx){
                console.log('2안에 들어옴')
                console.log(data[1].car_finish)
                console.log('data[1].car_finish')
                moving1(data[1].id, data[1].now_behavior)
                if(data[1].car_finish == '99'){
                    console.log('2finish들어옴')
                    console.log('2끝!')
                $.ajax({
                    type : 'POST',
                    url : 'http://127.0.0.1:8000/main/reset_index',
                    dataType:'json',
                    data : {
                    'id': data[1].id,
                    },
                    success: function(){
                    }
                });
                map()
                }
                else{
                console.log('else실행')
                $.ajax({
                    type : 'POST',
                    url : 'http://127.0.0.1:8000/main/change_index',
                    dataType:'json',
                    data : {
                    'id': data[1].id,
                    },
                    success: function(){
                    }
                });
                }
            }
        }
    });
}, 500);
}
function playReturn(){
//컨테이너 떨어졌는지 검사
playReturn = setInterval(function() {
    console.log('1떨어졌는지 검사 실행중')


    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].container_id == "z"){
            console.log('1떨어졌는지 검사가 보냈다.')
            sleep(100)
            map()
            data_car(data[0].car_code, data[0].id)
//            clearInterval(playReturn);
//            playMap()
                $.ajax({
                    type : 'POST',
                    url : 'http://127.0.0.1:8000/main/reset_data',
                    dataType:'json',
                    data : {
                    'id': 1,
                    },
                    success: function(){
                    }
                });
            }
        }
    });
}, 3000);
}
function playReturn2(){
//컨테이너 떨어졌는지 검사
playReturn2 = setInterval(function() {
    console.log('떨어졌는지 검사 실행중')


    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[1].container_id == "z"){
            console.log('떨어졌는지 검사가 보냈다.')
            sleep(100)
            map()
            data_car2(data[1].car_code, data[1].id)
//            clearInterval(playReturn);
//            playMap()
                $.ajax({
                    type : 'POST',
                    url : 'http://127.0.0.1:8000/main/reset_data',
                    dataType:'json',
                    data : {
                    'id': 2,
                    },
                    success: function(){
                    }
                });
            }
        }
    });
}, 3000);
}
function data_car(x, id){
    //차량1에 주행코드를 보냄
	$.ajax({
        type : 'POST',
        url : 'http://192.168.0.12:8000/',
        dataType:'json',
        data : {
            'code': x,
            'car_id': id,
            'emergency': 'false',
        },
        success: function(){
        }
    });
}
function data_car2(x, id){
    //차량2에 주행 코드를 보냄
    console.log('data2보냄')
	$.ajax({
        type : 'POST',
        url : 'http://192.168.0.19:8000/',
        dataType:'json',
        data : {
            'code': x,
            'car_id': id,
            'emergency': 'false',
        },
        success: function(){
        }
    });
}
function position_refresh(){
    var clicked_car = document.getElementById("car_number").value
    var target_x = document.getElementById("a").value
    var target_y = document.getElementById("b").value
    $.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/map/refresh',
        dataType:'json',
        data : {
            'car_number': clicked_car,
            'target_x': target_x,
            'target_y': target_y
        },
        success: function(){
        }
    });
}

//화면상에서 이동을 위한 함수
function moving1(i, code){
		// ->
		if(code==11){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
		// down
		if(code==12){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
		// <-
		if(code==13){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
		// up
		if(code==14){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
		// ⌝ down
		if(code==21){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(90deg)'),
					 $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
					}
		// ⌞ up			 
		if(code==22){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(-90deg)'),
					 $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
		// ⌜>
		if(code==23){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(0deg)'),
					 $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
		// <⌟
		if(code==24){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(180deg)'),
					 $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
		// ⌟up
        if(code==31){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(-90deg)'),
					 $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
		// ⌜down
		if(code==32){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
                     $(".carcar"+i).css('transform','rotate(90deg)'),
					 $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
		// ⌞>
		if(code==33){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(0deg)'),
					 $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
		// <⌝
		if(code==34){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
                    $(".carcar"+i).css('transform','rotate(180deg)'),
                    $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
}
function m11(i){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
function m12(i){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
function m13(i){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
function m14(i){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
// ⌝ down
function m21(i){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(90deg)'),
				$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
			}
// ⌞ up					
function m22(i){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(-90deg)'),
				$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
			}
// ⌜>				
function m23(i){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(0deg)'),
				$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
			}
// <⌟				
function m24(i){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(180deg)'),
				$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
			}
// ⌟up				
function m31(i){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(-90deg)'),
				$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
			}
// ⌜down
function m32(i){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(90deg)'),
				$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
			}
// ⌞>				
function m33(i){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(0deg)'),
				$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
			}
// <⌝
function m34(i){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
				$(".carcar"+i).css('transform','rotate(180deg)'),
				$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
			}

function normal(){
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.12:8000/OpenCV',
        dataType:'json',
        data : {
        'data': 0
        },
        success: function(){
        }
    });
}
function slow(){
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.12:8000/OpenCV',
        dataType:'json',
        data : {
        'data': 1
        },
        success: function(){
        }
    });
}
function stop(){
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.12:8000/OpenCV',
        dataType:'json',
        data : {
        'data': 2
        },
        success: function(){
        }
    });
}
function turn(){
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.12:8000/OpenCV',
        dataType:'json',
        data : {
        'data': 3
        },
        success: function(){
        }
    });
}
