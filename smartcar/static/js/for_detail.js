function new_position(posi){
    var index = $("#car_number").val()
    var position = posi
    console.log('도착!')
    $.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/main/position',
        data : {
            'car_number' : index,
            'position' : posi
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
					m21(index); position=4; new_position(position); right_xy(); return 0
				}
				if(position == 1){
					if(map2[Number(xx)-1][Number(yy)+1] != 0 || map2[Number(xx)-1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m23(index); position=3; new_position(position); right_xy(); return 0
				}
				if(position == 2){
					if(map2[Number(xx)-1][Number(yy)-1] != 0 || map2[Number(xx)][Number(yy)+1] != 0 ){
						alert('이동불가')
						return 0
					}
					m22(index); position=1; new_position(position); right_xy(); return 0
				}
				if(position == 4){
					if(map2[Number(xx)+1][Number(yy)-1] != 0 || map2[Number(xx)+1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m24(index); position=2; new_position(position); right_xy(); return 0
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
					m31(index); p=1; new_position(p); left_xy(); return 0
				}
				if(position == 1){
					if(map2[Number(xx)-1][Number(yy)-1] != 0 || map2[Number(xx)-1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m34(index); p=2; new_position(p); left_xy(); return 0
				}
				if(position == 2){
					if(map2[Number(xx)+1][Number(yy)-1] != 0 || map2[Number(xx)][Number(yy)-1] != 0 ){
						alert('이동불가')
						return 0
					}
					m32(index); p=4; new_position(p); left_xy(); return 0
				}
				if(position == 4){
					if(map2[Number(xx)+1][Number(yy)+1] != 0 || map2[Number(xx)+1][Number(yy)] != 0 ){
						alert('이동불가')
						return 0
					}
					m33(index); p=3; new_position(p); left_xy(); return 0
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
