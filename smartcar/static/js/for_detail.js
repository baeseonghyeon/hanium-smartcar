function new_position(posi){
    var index = $("#car_number").val()
    var position = posi
    console.log('도착!')
    $.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/main/position',
        data : {
            'car_number' : index,
            'position' : position
        },
        dataType:'json',
        success: function(){
        }
    });
}
function straight(){
var index = $("#car_number").val()
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
                var p = data[index-1].position
                if(p == 3){straight_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 1){straight_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 2){straight_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 4){straight_check(data[index-1].now_x, data[index-1].now_y, p);}
            }
        });
    var a = '1 '
        <!--$.ajax({-->
            <!--type : 'POST',-->
            <!--url : 'http://192.168.0.9:8000',-->
            <!--dataType:'json',-->
            <!--data : {-->
            <!--'bbb': a-->
            <!--},-->
            <!--success: function(){-->
            <!--}-->
        <!--});-->
}
function straight_check(x, y, p){
    var index = $("#car_number").val()
	var xx = x
	var yy = y
	var position = p
	var map1 = new Array()
	var map2 = new Array()
	for(var i = 0; i<=13; i++){
		map2[i] = new Array()
	}
	        $.ajax({
            url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
            dataType : 'json',
            success : function (data) {
				map1 = data[1].map.split('s')
				for(var i = 0; i<=13; i++){
					map2[i] = map1[i].split(', ')
				}
				if(position == 3){
					if(map2[Number(xx)][Number(yy)+1] != 0 ){
						alert('이동불가')
						return 0
					}
					m11(index); straight_xy(); return 0
				}
				if(position == 1){
					if(map2[Number(xx)-1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m11(index); straight_xy(); return 0
				}
				if(position == 2){
					if(map2[Number(xx)][Number(yy)-1] != 0 ){
						alert('이동불가')
						return 0
					}
					 m13(index); straight_xy(); return 0
				}
				if(position == 4){
					if(map2[Number(xx)+1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					 m12(index); straight_xy(); return 0
				}
            }
        	});
}
function straight_xy(){
	var index = $("#car_number").val()
	$.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/main/straight_xy',
        data : {
            'car_number' : index
        },
        dataType:'json',
        success: function(){
        }
    });
}
function back(){
    var index = $("#car_number").val()
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
                var p = data[index-1].position
                if(p == 3){back_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 1){back_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 2){back_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 4){back_check(data[index-1].now_x, data[index-1].now_y, p);}
            }
        });
    var a = '4 '
        <!--$.ajax({-->
            <!--type : 'POST',-->
            <!--url : 'http://192.168.0.9:8000',-->
            <!--dataType:'json',-->
            <!--data : {-->
            <!--'bbb': a-->
            <!--},-->
            <!--success: function(){-->
            <!--}-->
        <!--});-->
}
function back_xy(){
	var index = $("#car_number").val()
	$.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/main/back_xy',
        data : {
            'car_number' : index
        },
        dataType:'json',
        success: function(){
        }
    });
}
function back_check(x, y, p){
    var index = $("#car_number").val()
	var xx = x
	var yy = y
	var position = p
	var map1 = new Array()
	var map2 = new Array()
	for(var i = 0; i<=13; i++){
		map2[i] = new Array()
	}
	        $.ajax({
            url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
            dataType : 'json',
            success : function (data) {
				map1 = data[1].map.split('s')
				for(var i = 0; i<=13; i++){
					map2[i] = map1[i].split(', ')
				}
				if(position == 3){
					if(map2[Number(xx)][Number(yy)-1] != 0 ){
						alert('이동불가')
						return 0
					}
					 m13(index); back_xy(); return 0
				}
				if(position == 1){
					if(map2[Number(xx)+1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					 m12(index); back_xy(); return 0
				}
				if(position == 2){
					if(map2[Number(xx)][Number(yy)+1] != 0 ){
						alert('이동불가')
						return 0
					}
					  m11(index); back_xy(); return 0
				}
				if(position == 4){
					if(map2[Number(xx)-1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					  m14(index); back_xy(); return 0
				}
            }
        	});
}
function right(){
    var index = $("#car_number").val()
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
                var p = data[index-1].position
                if(p == 3){right_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 1){right_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 2){right_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 4){right_check(data[index-1].now_x, data[index-1].now_y, p);}
            }
        });

    var a = '2 '
        <!--$.ajax({-->
            <!--type : 'POST',-->
            <!--url : 'http://192.168.0.9:8000',-->
            <!--dataType:'json',-->
            <!--data : {-->
            <!--'bbb': a-->
            <!--},-->
            <!--success: function(){-->
            <!--}-->
        <!--});-->
}
function right_xy(){
	var index = $("#car_number").val()
	$.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/main/right_xy',
        data : {
            'car_number' : index
        },
        dataType:'json',
        success: function(){
        }
    });
}
function right_check(x, y, p){
    var index = $("#car_number").val()
	var xx = x
	var yy = y
	var position = p
	var map1 = new Array()
	var map2 = new Array()
	for(var i = 0; i<=13; i++){
		map2[i] = new Array()
	}
	        $.ajax({
            url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
            dataType : 'json',
            success : function (data) {
				map1 = data[1].map.split('s')
				for(var i = 0; i<=13; i++){
					map2[i] = map1[i].split(', ')
				}
				if(position == 3){
					if(map2[Number(xx)+1][Number(yy)+1] != 0 || map2[Number(xx)][Number(yy)+1] != 0 ){
						alert('이동불가')
						return 0
					}
					m21(index); position=4; right_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
				if(position == 1){
					if(map2[Number(xx)-1][Number(yy)+1] != 0 || map2[Number(xx)-1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m23(index); position=3; right_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
				if(position == 2){
					if(map2[Number(xx)-1][Number(yy)-1] != 0 || map2[Number(xx)][Number(yy)+1] != 0 ){
						alert('이동불가')
						return 0
					}
					m22(index); position=1; right_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
				if(position == 4){
					if(map2[Number(xx)+1][Number(yy)-1] != 0 || map2[Number(xx)+1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m24(index); position=2; right_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
            }
        	});
}
function left(){
    var index = $("#car_number").val()
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
                var p = data[index-1].position
                if(p == 3){left_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 1){left_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 2){left_check(data[index-1].now_x, data[index-1].now_y, p);}
                if(p == 4){left_check(data[index-1].now_x, data[index-1].now_y, p);}
            }
        });
    var a = '3 '
        <!--$.ajax({-->
            <!--type : 'POST',-->
            <!--url : 'http://192.168.0.9:8000',-->
            <!--dataType:'json',-->
            <!--data : {-->
            <!--'bbb': a-->
            <!--},-->
            <!--success: function(){-->
            <!--}-->
        <!--});-->
}
function left_check(x, y, p){
    var index = $("#car_number").val()
	var xx = x
	var yy = y
	var position = p
	var map1 = new Array()
	var map2 = new Array()
	for(var i = 0; i<=13; i++){
		map2[i] = new Array()
	}
	        $.ajax({
            url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
            dataType : 'json',
            success : function (data) {
				map1 = data[1].map.split('s')
				for(var i = 0; i<=13; i++){
					map2[i] = map1[i].split(', ')
				}
				if(position == 3){
					if(map2[Number(xx)-1][Number(yy)+1] != 0 || map2[Number(xx)][Number(yy)+1] != 0 ){
						alert('이동불가')
						return 0
					}
					m31(index); position=1; left_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
				if(position == 1){
					if(map2[Number(xx)-1][Number(yy)-1] != 0 || map2[Number(xx)-1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m34(index); position=2; left_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
				if(position == 2){
					if(map2[Number(xx)+1][Number(yy)-1] != 0 || map2[Number(xx)][Number(yy)-1] != 0 ){
						alert('이동불가')
						return 0
					}
					m32(index); position=4; left_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
				if(position == 4){
					if(map2[Number(xx)+1][Number(yy)+1] != 0 || map2[Number(xx)+1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m33(index); position=3; left_xy(); sleep(100); new_position(position); sleep(100); return 0
				}
            }
        	});
}
function left_xy(){
	var index = $("#car_number").val()
	$.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/main/left_xy',
        data : {
            'car_number' : index
        },
        dataType:'json',
        success: function(){
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
function map(route, x, y, a, b){
    var car_route1 = new Array()
    var car_route2 = new Array()
    car_route = route
    now_x = Number(x)
    now_y = Number(y)
    target_x = Number(a)
    target_y = Number(b)
    var index = $("#car_number").val()
    car_route1 = car_route.split(']')
    count = car_route1.length - 2
    for(var i = 0; i<=count; i++){
          car_route2[i] = new Array()
    }
    for(var i = 0; i<= count; i++){
          car_route2[i] = car_route1[i].split('a')
    }
    for(var x = 0; x <= count; x++)
          for(var y = 0; y <= 1; y++){
               car_route2[x][y] = Number(car_route2[x][y])
    }
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
                     map_display=data[1].map;
                     map_array=map_display.split('s');
                     for(var i=0; i<=13; i++){
                       map_array2[i]=map_array[i].split(', ');
                     }
                     if( now_x != ''){
                            map_array2[now_x][now_y]="3"
                     }
                     if(car_route == ''){
                        if( target_x !=''){
                            map_array2[target_x][target_y]="5"
                        }
                     }
    var idx = 0
    try{
        while(1){
            if(car_route2[idx][0] == car_route2[idx + 1][0]){
                if(car_route2[idx][1] + 1 == car_route2[idx + 1][1]){
                    map_array2[car_route2[idx][0]][car_route2[idx][1]] = '41'
                    idx += 1
                }
                else if(car_route2[idx][1] - 1 == car_route2[idx + 1][1]){
                    map_array2[car_route2[idx][0]][car_route2[idx][1]] = '41'
                    idx += 1
                }
            }
            if(car_route2[idx][1] == car_route2[idx + 1][1]){
                if(car_route2[idx][0] + 1 == car_route2[idx + 1][0]){
                    map_array2[car_route2[idx][0]][car_route2[idx][1]] = '42'
                    idx += 1
                }
                else if(car_route2[idx][0] - 1 == car_route2[idx + 1][0]){
                    map_array2[car_route2l[idx][0]][car_route2[idx][1]] = '42'
                    idx += 1
                }
            }
            if(car_route2[idx][0] + 1 == car_route2[idx + 2][0]){
                if(car_route2[idx][1] + 1 == car_route2[idx + 2][1]){
                    if(car_route2[idx][0] == car_route2[idx + 1][0]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '41'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '43'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '42'
                        idx += 3
                    }
                    else if(car_route2[idx][1] == car_route2[idx + 1][1]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '42'
                        map_array2[car_route2l[idx + 1][0]][car_route2[idx + 1][1]] = '44'
                        map_array2[car_route2[idx + 2][0]][car_route2l[idx + 2][1]] = '41'
                        idx += 3
                    }
                }
            }
            if(car_route2[idx][0] - 1 == car_route2[idx + 2][0]){
                if(car_route2[idx][1] + 1 == car_route2[idx + 2][1]){
                    if(car_route2[idx][1] == car_route2[idx + 1][1]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '42'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '45'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '41'
                        idx += 3
                    }
                    else if(car_route2[idx][0] == car_route2[idx + 1][0]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '41'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '46'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '42'
                        idx += 3
                    }
                }
            }
            if(car_route2[idx][0] - 1 == car_route2[idx + 2][0]){
                if(car_route2[idx][1] - 1 == car_route2[idx + 2][1]){
                    if(car_route2[idx][1] == car_route2[idx + 1][1]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '42'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '43'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '41'
                        idx += 3
                    }
                    else if(car_route2[idx][0] == car_route2[idx + 1][0]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '41'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '44'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '42'
                        idx += 3
                    }
                }
            }
            if(car_route2[idx][0] + 1 == car_route2[idx + 2][0]){
                if(car_route2[idx][1] - 1 == car_route2[idx + 2][1]){
                    if(car_route2[idx][1] == car_route2[idx + 1][1]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '42'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '46'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '41'
                        idx += 3
                    }
                    else if(car_route2[idx][0] == car_route2[idx + 1][0]){
                        map_array2[car_route2[idx][0]][car_route2[idx][1]] = '41'
                        map_array2[car_route2[idx + 1][0]][car_route2[idx + 1][1]] = '45'
                        map_array2[car_route2[idx + 2][0]][car_route2[idx + 2][1]] = '42'
                        idx += 3
                    }
                }
            }
        }
    } catch(e) {
    	if(e instanceof TypeError){ }
    	else if(e instanceof RangeError){ }
    	else if(e instanceof EvalError){ }
    	else { }
    }
    if(car_route2!=0){
        var ix = car_route2.length - 3
        if(map_array2[car_route2[ix][0]][car_route2[ix][1]] == '41' || '42'){
            if(map_array2[car_route2[ix + 1][0]][car_route2[ix + 1][1]] == '0'){
                map_array2[car_route2[ix + 1][0]][car_route2[ix + 1][1]] = map_array2[car_route2[ix][0]][car_route2[ix][1]]
                map_array2[car_route2[ix + 2][0]][car_route2[ix + 2][1]] = map_array2[car_route2[ix][0]][car_route2[ix][1]]
            }
        }
    }
    map_array2[now_x][now_y] = '3'
                     for(var i=0; i<=13; i++){
                         for(var j=0; j<=13; j++){
                            if(map_array2[i][j]==0){
                                 var map_span = document.createElement("span");
                                 map_span.setAttribute("id", "route0");
                                 map_span.setAttribute("class", i+'a'+j);
                                 $("#map").append(map_span);
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
                                 $("#map").append(map_span);
                                 var map_div = document.createElement("div");
                                 map_div.setAttribute("class", "carcar"+index);
                                 map_div.innerHTML = 'Car'+index;
								 $("#route3").append(map_div);

								// container 있으면
								<!--var carcon = document.createElement("div");-->
								<!--carcon.setAttribute("class", "carcon");-->
								<!--$(".carcar"+index).append(carcon);	-->


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