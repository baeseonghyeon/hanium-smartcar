$(document).ready( function(){map()})
//차량정보와 맵정보를 db에서 꺼내 화면에 출력
function map(){
    $("#map *").remove()
    var map_display;
    var map_array = new Array();
    var map_array2 = new Array();
    var now_xx = new Array();
    var now_yy = new Array();
    var car_count = 1
//    배열 모든 값이 같은지 확인
    Array.prototype.allValuesSame = function() {
    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0])
            return false;
    }
    return true;
    }

    for(var i=0;i<=13;i++){
        map_array2[i] = new Array();
    }
     $.ajax({
                 url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
                 dataType : 'json',
                 success : function(data){
                     map_display=data[0].map;
                     map_array=map_display.split('s');
                     for(var i=0; i<=13; i++){
                       map_array2[i]=map_array[i].split(', ');
                     }
                    $.ajax({
                        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                        dataType : 'json',
                        success : function (data_car) {
                        for(var i=0; i<=data_car.length -1; i++){
                            now_xx[i] = Number(data_car[i].now_x)
                            now_yy[i] = Number(data_car[i].now_y)
                        }
                        for(var k=0; k<=now_xx.length-1; k++){
                            map_array2[now_xx[k]][now_yy[k]] = '3'+data_car[k].id;
                        }
                        if(now_xx.allValuesSame()==true){
                                if(now_yy.allValuesSame()==true){
                                    if(now_xx != 0){
                                        map_array2[now_xx[0]][now_yy[0]] = '99'
                                    }
                                }
                        }
                        for(var i=0; i<=13; i++){
                            for(var j=0; j<=13; j++){
                                if(map_array2[i][j]==0 || map_array2[i][j]==3){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route0");
                                    map_span.setAttribute("class", i+'a'+j);
                                    map_span.setAttribute("onclick", 'position_check(this.className)');
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==1){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route1");
                                    map_span.setAttribute("class", i+'a'+j);
                                    // map_span.innerHTML = 'Con<br>'+i+'-'+j;
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==2){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route2");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==99){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3");
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        for(var kk=1; kk<=data_car.length; kk++){
                                            var map_div = document.createElement("div");
											map_div.setAttribute("class", "carcar"+kk);
											map_div.setAttribute('data-carcar-idx', kk);
//											map_div.setAttribute('data-car-direction', data_car[kk].position);
                                            map_div.setAttribute("id", "carcar"+(kk-1));
                                            map_div.innerHTML = 'Car'+kk;
											$("#route3").append(map_div);
											
											// container 있으면
											// var carcon = document.createElement("div");
											// carcon.setAttribute("class", "carcon"+car_count);
											// $(".carcar"+car_count).append(carcon);
                                        }
                                }
                                else if(map_array2[i][j]==31){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3_"+1);
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        var map_div = document.createElement("div");
										map_div.setAttribute("class", "carcar"+1);
										map_div.setAttribute('data-carcar-idx', 1);
										map_div.setAttribute('data-car-direction', data_car[0].position);
										map_div.innerHTML = 'Car'+1;
										
										$("#route3_"+1).append(map_div);
										if ($(".carcar"+1).attr('data-car-direction') == 1) {
											console.log('1번 차량 방향은 3이맞음')
											$(".carcar"+1).css('transform','rotate(-90deg)');
										}
										else if ($(".carcar"+1).attr('data-car-direction') == 2) {
											$(".carcar"+1).css('transform','rotate(-180deg)');
											$(".carcar"+1).css('top','20px');
											$(".carcar"+1).css('left','12px');
										}
										else if ($(".carcar"+1).attr('data-car-direction') == 4) {
											$(".carcar"+1).css('transform','rotate(90deg)');
											$(".carcar"+1).css('top','20px');
											$(".carcar"+1).css('left','12px');
										}
										
                                }
                                else if(map_array2[i][j]==32){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3_"+2);
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        var map_div = document.createElement("div");
										map_div.setAttribute("class", "carcar"+2);
										map_div.setAttribute('data-carcar-idx', 2);
										map_div.setAttribute('data-car-direction', data_car[1].position);
                                        map_div.innerHTML = 'Car'+2;
										$("#route3_"+2).append(map_div);
										if ($(".carcar"+2).attr('data-car-direction') == 1) {
											$(".carcar"+2).css('transform','rotate(-90deg)');
										}
										else if ($(".carcar"+2).attr('data-car-direction') == 2) {
											$(".carcar"+2).css('transform','rotate(-180deg)');
											$(".carcar"+2).css('top','20px');
											$(".carcar"+2).css('left','12px');
										}
										else if ($(".carcar"+2).attr('data-car-direction') == 4) {
											$(".carcar"+2).css('transform','rotate(90deg)');
											$(".carcar"+2).css('top','20px');
											$(".carcar"+2).css('left','12px');
										}
                                }
                                 else if(map_array2[i][j]==33){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3_"+3);
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        var map_div = document.createElement("div");
										map_div.setAttribute("class", "carcar"+3);
										map_div.setAttribute('data-car-direction', data_car[2].position);
										map_div.setAttribute('data-carcar-idx', 3);
                                        map_div.innerHTML = 'Car'+3;
										$("#route3_"+3).append(map_div);
										if ($(".carcar"+3).attr('data-car-direction') == 1) {
											console.log('1번 차량 방향은 3이맞음')
											$(".carcar"+3).css('transform','rotate(-90deg)');
										}
										else if ($(".carcar"+3).attr('data-car-direction') == 2) {
											$(".carcar"+3).css('transform','rotate(-180deg)');
											$(".carcar"+3).css('top','20px');
											$(".carcar"+3).css('left','12px');
										}
										else if ($(".carcar"+3).attr('data-car-direction') == 4) {
											$(".carcar"+3).css('transform','rotate(90deg)');
											$(".carcar"+3).css('top','20px');
											$(".carcar"+3).css('left','12px');
										}
                                }
                                else if(map_array2[i][j]==5){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route5");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==8){
                                    $("#map").append();
                                }
                                else if(map_array2[i][j]==41){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route41");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==42){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route42");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==43){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route43");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==44){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route44");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==45){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route45");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                                else if(map_array2[i][j]==46){
                                    var map_span = document.createElement("span");
                                    map_span.setAttribute("id", "route46");
                                    map_span.setAttribute("class", i+'a'+j);
                                    $("#map").append(map_span);
                                }
                            }
                            $("#map").append("<br>");
                        }
                        }
                    });

                 }
     });
}
function position_check(clicked_class){
    var c_class = clicked_class;
    var d_class = c_class.split('a')
    $("#a").val(d_class[0]);
    $("#b").val(d_class[1]);
}
//function xy_input(){
//    var number = document.getElementById("car_number").value;
//    if(number==undefined){
//        alert('차량을 선택 후 실행하세요')
//        return 0
//    }
//    else{
//        check_xy(number)
//    }
//}
//function check_xy(number){
//var num = Number(number)-1
//         $.ajax({
//                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
//                 dataType : 'json',
//                 success : function (data) {
//                 console.log(num)
//                 console.log(data[num])
//                    if(data[num].target_x != ""){
//                        alert('이미 좌표 있음')
//                    }
//                    else{
//                        var now_x = document.getElementById("x").value;
//                        var now_y = document.getElementById("y").value;
//                        var target_x = document.getElementById("a").value;
//                        var target_y = document.getElementById("b").value;
//                        var number = document.getElementById("car_number").value;
//                                $.ajax({
//                                    type : 'POST',
//                                    url : 'http://127.0.0.1:8000/map/car_point',
//                                    data : {
//                                        'car_number' : number,
//                                        'xxx' : now_x,
//                                        'yyy' : now_y,
//                                        'aaa' : target_x,
//                                        'bbb' : target_y,
//                                    },
//                                    dataType:'json',
//                                    success: function(){
//                                    }
//                                });
//                                sleep(100)
//                                $("#map *").remove()
//                                map()
//                    }
//                 }
//         });
//}
function xy_reset(){
    var now_x = document.getElementById("x").value;
    var now_y = document.getElementById("y").value;
    var target_x = document.getElementById("a").value;
    var target_y = document.getElementById("b").value;
    var number = document.getElementById("car_number").value;
    if(number==undefined){
        alert('차량을 선택 후 실행하세요')
        return 0
    }
    else{
    $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/map/reset',
            data : {
              'car_number' : number,
              'xxx' : now_x,
              'yyy' : now_y,
              'aaa' : target_x,
              'bbb' : target_y,
            },
            dataType:'json',
            success: function(){
            }
    });
    $("#x").val('')
    $("#y").val('')
    $("#a").val('')
    $("#b").val('')
    sleep(100)
    $("#map *").remove()
    map()
    }
}
function search(){
    var number = document.getElementById("car_number").value;
    if(number==undefined){
        alert('차량을 선택 후 실행하세요')
        return 0
    }
    else{
        check_route(number)
    }
}
function check_route(number){
    num = Number(number)-1
     $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                    if(data[num].car_route != "1"){
                    alert('이미 경로 있음')
                    }
                    else{
                        var now_x = document.getElementById("x").value;
                        var now_y = document.getElementById("y").value;
                        var target_x = document.getElementById("a").value;
                        var target_y = document.getElementById("b").value;
                        var number = document.getElementById("car_number").value;
                            $.ajax({
                                type : 'POST',
                                url : 'http://127.0.0.1:8000/map/path',
                                data : {
                                    'car_number' : number,
                                    'xxx' : now_x,
                                    'yyy' : now_y,
                                    'aaa' : target_x,
                                    'bbb' : target_y,
                                },
                                dataType:'json',
                                success: function(){
                                }
                            });
                    }
                    sleep(100)
                    $("#map *").remove()
                    map(number)
                 }
     });
}
function sleep(num){
			 var now = new Date();
			 var stop = now.getTime() + num;
			 while(true){
	             now = new Date();
				 if(now.getTime() > stop)return;
			 }

}