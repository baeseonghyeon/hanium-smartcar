$(document).ready( function(){map()})
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
                            map_array2[now_xx[k]][now_yy[k]] = '3'+data_car[k].id
                        }
                        console.log(now_xx.allValuesSame())
                        console.log(now_yy.allValuesSame())
                        if(now_xx.allValuesSame()==true){
                                if(now_yy.allValuesSame()==true){
                                    map_array2[now_xx[0]][now_yy[0]] = '99'
                                }
                                else{
                                     for(var k=0; k<=now_xx.length-1; k++){
                                        map_array2[now_xx[k]][now_yy[k]] = '3'+data_car[k].id
                                     }
                                }
                        }
                        for(var i=0; i<=13; i++){
                            for(var j=0; j<=13; j++){
                                if(map_array2[i][j]==0){
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
                                    map_span.innerHTML = 'Con<br>'+i+'-'+j;
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
                                            map_div.innerHTML = 'Car'+kk;
                                            $("#route3").append(map_div);
                                        }
                                }
                                else if(map_array2[i][j]==31){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3_"+1);
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        var map_div = document.createElement("div");
                                        map_div.setAttribute("class", "carcar"+1);
                                        map_div.innerHTML = 'Car'+1;
                                        $("#route3_"+1).append(map_div);
                                }
                                 else if(map_array2[i][j]==32){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3_"+2);
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        var map_div = document.createElement("div");
                                        map_div.setAttribute("class", "carcar"+2);
                                        map_div.innerHTML = 'Car'+2;
                                        $("#route3_"+2).append(map_div);
                                }
                                 else if(map_array2[i][j]==33){
                                        var map_span = document.createElement("span");
                                        map_span.setAttribute("id", "route3_"+3);
                                        map_span.setAttribute("class", i+'a'+j);
                                        $("#map").append(map_span);
                                        var map_div = document.createElement("div");
                                        map_div.setAttribute("class", "carcar"+3);
                                        map_div.innerHTML = 'Car'+3;
                                        $("#route3_"+3).append(map_div);
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
<<<<<<< HEAD
                            for(k=1; k<=car_data.length; k++){
                                var map_div = document.createElement("div");
								map_div.setAttribute("class", "carcar"+car_count);
                                map_div.innerHTML = 'Car'+car_count;
								$("#route3_"+car_count).append(map_div);
								
								// container 있으면
								var carcon = document.createElement("div");
								carcon.setAttribute("class", "carcon"+car_count);
								$(".carcar"+car_count).append(carcon);


                                car_count++
                            }
=======
>>>>>>> 156825d48e7fbff92722863f78cf5ad73a1b49b6
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