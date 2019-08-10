$(document).ready( function(){map()})
//function moving(){
//    $("#route3").insertAfter(".1a2")
//}
function moving(){
    var obj=$("#route3").offset()
    $("#route3").css("left", obj.left+1);
    console.log(obj)
}
//var timer = window.setInterval(function () { map(); }, 1000);
function map(){
    $("#map *").remove()
    var map_display;
    var map_array = new Array();
    var map_array2 = new Array();
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

                     for(var i=0; i<=13; i++){
                         for(var j=0; j<=13; j++){
                            if(map_array2[i][j]==0){
                                 var map_span = document.createElement("span");
                                 var map_div = document.createElement("div");
                                 map_span.setAttribute("id", "route0");
                                 map_span.setAttribute("class", i+'a'+j);
                                 map_span.setAttribute("onclick", 'position_check(this.className)');
                                 $("#map").append(map_span);
                                 $(b).wrapInner(map_div);
                            }
                            else if(map_array2[i][j]==1){
                                 var map_span = document.createElement("span");
                                 map_span.setAttribute("id", "route1");
                                 map_span.setAttribute("class", i+'a'+j);
                                 map_span.innerHTML = 'Con';
                                 $("#map").append(map_span);
                            }
                            else if(map_array2[i][j]==2){
                                 var map_span = document.createElement("span");
                                 map_span.setAttribute("id", "route2");
                                 map_span.setAttribute("class", i+'a'+j);
                                 $("#map").append(map_span);
                            }
                            else if(map_array2[i][j]==3){
                                 var map_span = document.createElement("span");
                                 map_span.setAttribute("id", "route3");
                                 map_span.setAttribute("class", i+'a'+j);
                                 map_span.innerHTML = 'Car';
                                 $("#map").append(map_span);
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
                            else if(map_array2[i][j]==4){
                                 var map_span = document.createElement("span");
                                 map_span.setAttribute("id", "route4");
                                 map_span.setAttribute("class", i+'a'+j);
                                 $("#map").append(map_span);
                            }
                         }
                         $("#map").append("<br>");
                     }
                 }
     });
}
function position_check(clicked_class){
    var c_class = clicked_class;
    var d_class = c_class.split('a')
    $("#a").val(d_class[0]);
    $("#b").val(d_class[1]);
}
function xy_input(){
    var number = document.getElementById("car_number").value;
    if(number==undefined){
        alert('차량을 선택 후 실행하세요')
        return 0
    }
    else{
        check_xy(number)
    }
}
function check_xy(number){
var num = Number(number)-1
         $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                 console.log(num)
                 console.log(data[num])
                    if(data[num].target_x != ""){
                        alert('이미 좌표 있음')
                    }
                    else{
                        var now_x = document.getElementById("x").value;
                        var now_y = document.getElementById("y").value;
                        var target_x = document.getElementById("a").value;
                        var target_y = document.getElementById("b").value;
                        var number = document.getElementById("car_number").value;
                                $.ajax({
                                    type : 'POST',
                                    url : 'http://127.0.0.1:8000/map/car_point',
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
                                sleep(100)
                                $("#map *").remove()
                                map()
                    }
                 }
         });
}
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
                    map()
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