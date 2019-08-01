$(document).ready(map())
function map(){
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
                                 $("#map").append('<img src="/static/img/white.jpg" width="45px" height="45px" display="block" border="0" padding="0px 0px 0px 0px">');
                            }
                            else if(map_array2[i][j]==1){
                                 $("#map").append('<img src="/static/img/black.jpg" width="45px" height="45px" display="block" border="0" padding="0px 0px 0px 0px">');
                            }
                            else if(map_array2[i][j]==2){
                                 $("#map").append('<img src="/static/img/blue.jpg" width="45px" height="45px" display="block" border="0" padding="0px 0px 0px 0px">');
                            }
                            else if(map_array2[i][j]==3){
                                 $("#map").append('<img src="/static/img/green.jpg" width="45px" height="45px" display="block" border="0" padding="0px 0px 0px 0px">');
                            }
                            else if(map_array2[i][j]==5){
                                 $("#map").append('<img src="/static/img/red.jpg" width="45px" height="45px" display="block" border="0" padding="0px 0px 0px 0px">');
                            }
                            else if(map_array2[i][j]==8){
                                 $("#map").append();
                            }
                            else if(map_array2[i][j]==4){
                                 $("#map").append('<img src="/static/img/pink.jpg" width="45px" height="45px" display="block" border="0" padding="0px 0px 0px 0px">');
                            }
                         }
                         $("#map").append("<br>");
                     }
                 }
     });
}
function xy_input(){
    var now_x = document.getElementById("x").value;
    var now_y = document.getElementById("y").value;
    var target_x = document.getElementById("a").value;
    var target_y = document.getElementById("b").value;
    var number = document.getElementById("main_carnumber").value;
    if(number==undefined){
        alert('차량을 선택 후 실행하세요')
//        $("#x").val('')
//        $("#y").val('')
//        $("#a").val('')
//        $("#b").val('')
        return 0
    }
    else{
        $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/map/car_point',
            data : {
             'carnumber' : number,
             'xxx' : now_x,
             'yyy' : now_y,
             'aaa' : target_x,
             'bbb' : target_y,
            },
            dataType:'json',
            success: function(){
            }
        });
        $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/main/xy_input',
            data : {
                    'carnumber' : number,
                    'now_x' : now_x,
                    'now_y' : now_y,
                    'target_x' : target_x,
                    'target_y' : target_y,
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
function xy_reset(){
    var now_x = document.getElementById("x").value;
    var now_y = document.getElementById("y").value;
    var target_x = document.getElementById("a").value;
    var target_y = document.getElementById("b").value;
    var number = document.getElementById("main_carnumber").value;
    if(number==undefined){
        alert('차량을 선택 후 실행하세요')
        return 0
    }
    else{
    $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/map/reset',
            data : {
              'carnumber' : number,
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
    var now_x = document.getElementById("x").value;
    var now_y = document.getElementById("y").value;
    var target_x = document.getElementById("a").value;
    var target_y = document.getElementById("b").value;
    var number = document.getElementById("main_carnumber").value;
    if(number==undefined){
        alert('차량을 선택 후 실행하세요')
        return 0
    }
    else{
        $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/map/path',
            data : {
              'carnumber' : number,
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
function sleep(num){
			 var now = new Date();
			 var stop = now.getTime() + num;
			 while(true){
	             now = new Date();
				 if(now.getTime() > stop)return;
			 }

}