$(document).ready(function(){
    var map_info;
     $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                 var length = data.length;
                 $("#car_count").text(data.length)
                 create_car(data);
                 }
     });
});

function create_car(Car){
    var pi_pi = new Array()
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            car = new Array();
            for(var i=1; i<=Car.length; i++){
				var car_state_div = document.createElement("div");
				var car_state_img = document.createElement("div");
				var car_name_div = document.createElement("div");
				car_state_div.setAttribute("id", i-1);
				car_name_div.setAttribute("id", i-1);
				car_state_img.setAttribute("id", i-1);
				car_state_div.setAttribute("class", 'car_state_div');
				car_state_img.setAttribute("class", 'car_state_img');
				car_name_div.setAttribute("class", 'car_name_div');
				car_state_div.setAttribute('OnClick', 'car_detail(this.id)');
                car_name_div.setAttribute('OnClick', 'car_detail(this.id)');
                car_name_div.innerHTML = data[i-1].car_name;
                pi_pi[i-1] = data[i-1].pi_id
                $.ajax({
                    url : "http://127.0.0.1:8000/api/PiInfo/?format=json",
                    dataType : 'json',
                    success : function (pi_data) {
                        for(var j=0; j<=Car.length; j++){
                            if(pi_pi[j]==pi_data[j].pi_id){
                                car_name_div.innerHTML=pi_data[j].car_type
                            }
                        }
                    }
				});
				$("#main-side2").append(car_state_div);
				$("#main-side2").append(car_name_div);
				$(".car_state_div, .car_state_wrapper").append(car_state_img);
            }
        }
    });
}

function car_detail(clicked_id){
var id = clicked_id;
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
            $("#car_number").val(data[clicked_id].id).text(data[clicked_id].id);
			$("#car_name").text(data[clicked_id].car_name);
			$(".car_state_wrapper").fadeIn("fast");
            $("#x").val(data[clicked_id].now_x);
            $("#y").val(data[clicked_id].now_y);
            $("#a").val(data[clicked_id].target_x);
            $("#b").val(data[clicked_id].target_y);
            }
        });
}






