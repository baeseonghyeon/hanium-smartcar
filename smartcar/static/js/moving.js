$(document).ready(function(){
playMap()
//playMap2()
playCap()
//playCap2()
playReturn()
//playReturn2()
})
function playMap(){
// 컨테이너 적재여부 검사
playMap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].car_route != "1"){
            map()
            data_car(data[0].car_code, data[0].id)
//            playCap()
            clearInterval(playMap);
            }
        }
    });
}, 3000);
}
function playMap2(){
// 컨테이너 적재여부 검사
playMap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[1].car_route != "1"){
            map()
            data_car(data[1].car_code, data[1].id)
//            playCap()
            clearInterval(playMap2);
            }
        }
    });
}, 3000);
}
function playCap(){
//차량으로부터 수행코드 받음
var xxx = 1
playCap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
//            var x = int(Number(data[0].for_index)/2) + 1
            sleep(50)
            console.log('밖'+xxx)
            if(data[0].for_commute == 2*xxx){
                console.log('안'+xxx)
                moving1(data[0].id, data[0].now_behavior)
                xxx += 1
                if(data[0].car_finish == '99'){
                    console.log('finish들어옴')
                    console.log('끝!')
                    xxx = 1
                    map()
                }
            }
        }
    });
}, 800);
}
function playCap2(){
//차량으로부터 수행코드 받음
var yyy = 1
playCap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
//            var x = int(Number(data[0].for_index)/2) + 1
            sleep(50)
            if(data[1].for_commute == 2*yyy){
                moving1(data[1].id, data[1].now_behavior)
                yyy += 1
                sleep(50)
                if(data[1].car_finish == '99'){
                    console.log('finish들어옴')
                    sleep(1000)
                    console.log('끝!')
                    map()
//                    playReturn()
                }
            }
        }
    });
}, 800);
}
function playReturn(){
//컨테이너 떨어졌는지 검사
playReturn = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].container_id == "z"){
            sleep(100)
            map()
            data_car(data[0].car_code, data[0].id)
            console.log(data[0].car_code)
            console.log(data[0].id)
            clearInterval(playReturn);
            }
        }
    });
}, 3000);
}
function playReturn2(){
//컨테이너 떨어졌는지 검사
playReturn = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[1].container_id == "z"){
            sleep(100)
            map()
            data_car(data[1].car_code, data[1].id)
            console.log(data[1].car_code)
            console.log(data[1].id)
            clearInterval(playReturn);
            }
        }
    });
}, 3000);
}
function data_car(x, id){
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
function sample(){
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.10:8000/',
        dataType:'json',
        data : {
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
function moving1(i, code){
        if(code==11){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
        if(code==12){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
        if(code==13){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
        if(code==14){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
        if(code==21){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
        if(code==22){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
        if(code==23){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
        if(code==24){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
        if(code==31){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
        if(code==32){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
        if(code==33){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
        if(code==34){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
                     $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
}
function m11(i){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
function m12(i){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
function m13(i){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
function m14(i){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
function m21(i){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
                $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
function m22(i){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
                $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
function m23(i){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
                $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
function m24(i){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
                $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}
function m31(i){$(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
                $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)}
function m32(i){$(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
                $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)}
function m33(i){$(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
                $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)}
function m34(i){$(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
                $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)}