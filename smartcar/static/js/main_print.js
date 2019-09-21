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
				var car_state_wrapper = document.createElement("div");
				car_state_div.setAttribute("id", i-1);			
				car_state_div.setAttribute("class", 'car_state_div'+' '+'div'+(i-1));			
				car_state_div.setAttribute('OnClick', 'car_detail(this.id)');
				car_state_img.setAttribute("class", 'car_state_img'+' '+'img'+(i-1));
                car_name_div.setAttribute("class", 'car_name_div'+' '+'name'+(i-1));
                car_name_div.setAttribute('OnClick', 'car_detail(this.id)');
                car_name_div.innerHTML = data[i-1].car_name;
                pi_pi[i-1] = data[i-1].pi_id;
                $.ajax({
                    url : "http://127.0.0.1:8000/api/PiInfo/?format=json",
                    dataType : 'json',
                    success : function (pi_data) {
                        for(var i=0; i<=Car.length-1; i++){
                            for(var j=0; j<=Car.length-1; j++){
                                if(pi_pi[i]==pi_data[j].pi_id){
                                    car_name_div.innerHTML=pi_data[j].car_type
                                }
                            }
                        }
                    }
				});
				var divid = "div"+(i-1);
				var wrapid = "wrap"+(i-1);
				var imgid = "img"+(i-1);
				
				$("#main-side2").append(car_state_div);
				$("#main-side2").append(car_name_div);
				$("."+divid).append(car_state_img);

				// 자동차 이미지
				if(data[i-1].container_id ==! null ) {
					$("."+imgid).css({'background-image': 'url("../static/img/car/car_con.png")'});
				} else {
					$("."+imgid).css({'background-image': 'url("../static/img/car/car.png")'});
				}

            }
        }
    });
}

// 클릭 했을 때
function car_detail(clicked_id){
var id = clicked_id;

if (id == clicked_id) {
	if ($('#'+id).hasClass('highlight')) {
		$('#'+id).removeClass('highlight');
	}
	else {
		$('#'+id).addClass('highlight');
	}
} else {
	$('#'+id).addClass('highlight');
}
	
	
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
            $("#car_number").val(data[clicked_id].id).text(data[clicked_id].id);
			$("#car_name").text(data[clicked_id].car_name);
			
			// 자동차 이미지
			if(data[clicked_id].container_id ==! null ) {
				$(".car_state_wrapper").css({'background-image': 'url("../static/img/car/car_con.png")'});	
			} else {
				$(".car_state_wrapper").css({'background-image': 'url("../static/img/car/car.png")'});
			}

			$.ajax({
				url : "http://127.0.0.1:8000/api/PiInfo/?format=json",
				dataType : 'json',
				success : function (pi_data) {
					for(var j=0; j<=pi_data.length-1; j++){
						if(data[clicked_id].pi_id ==pi_data[j].pi_id){
							$("#car_type").text("["+pi_data[j].car_type+"]");

							$(".car_battery").text(pi_data[j].battery);

							// var battery_icon = document.createElement("i");

							// if (pi_data[j].battery >= 100 ) {
							// 	battery_icon.setAttribute("class", 'fas fa-battery-full');
							// } if (pi_data[j].battery >= 80) {
							// 	battery_icon.setAttribute("class", 'fas fa-battery-three-quarters');
							// } else {
								
							// }
							

							// $(".fas").append(battery_icon);
							$(".car_data").text(pi_data[j].communication);
						}
					}	
				}
			});

			$(".car_state_wrapper").fadeIn("fast");
			 
            $("#x").val(data[clicked_id].now_x);
            $("#y").val(data[clicked_id].now_y);
            $("#a").val(data[clicked_id].target_x);
            $("#b").val(data[clicked_id].target_y);
            }
        });
}






