$(document).ready(function(){
playMap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].car_route != "1"){
            map()
            data_car(data[0].car_code, data[0].id)
            playReturn()
            clearInterval(playMap);
            }
        }
    });
}, 3000);
// detail 페이지로 넘어가면 x가 1로 초기화되서 if 코드가 수행안됨
var x = 1
var y = 1
playCap = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
//            x = Number(data[0].for_commute)/2 + 1
            if(data[0].for_commute == 2*x){
                x += 1;
                moving1(data[0].id, data[0].now_behavior)
                if(data[0].car_finish == '99'){
                    sleep(1000)
                    console.log('끝!')
                    map()
                    playcapReturn()
                    clearInterval(playCap)
                }
            }
        }
    });
}, 300);
// 차 2대일때
//playMap1 = setInterval(function() {
//    $.ajax({
//        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
//        dataType : 'json',
//        success : function (data) {
//            if(data[1].car_route != "1"){
//            map()
//            console.log(data[1].car_route)
//            data_car(data[1].car_route)
//            clearInterval(playMap1);
//            }
//        }
//    });
//}, 3000);
})
function playReturn(){
playReturn = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].container_id == "z"){
            map()
            data_car(data[0].car_code, data[0].id)
            clearInterval(playReturn);
            }
        }
    });
}, 3000);
}
function playcapReturn(){
playCapReturn = setInterval(function() {
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            if(data[0].for_commute == 2*y){
                y += 1;
                moving1(data[0].id, data[0].now_behavior)
                if(data[0].car_finish == '99'){
                    sleep(1000)
                    console.log('끝!')
                    map()
                    clearInterval(playCapReturn)
                }
            }
        }
    });
}, 300);
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