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
				car_state_div.setAttribute("id", i-1);
				car_state_div.setAttribute("class", 'car_state_div'+' '+'div'+(i-1));
				car_state_div.setAttribute('OnClick', 'car_detail(this.id , this)');
				// 실제 사용할 index를 속성으로 등록함
				car_state_div.setAttribute('data-car-idx', i);

				var car_state_img = document.createElement("div");
				car_state_img.setAttribute("class", 'car_state_img'+' '+'img'+(i-1));

				var car_name_div = document.createElement("div");
                car_name_div.setAttribute("class", 'car_name_div'+' '+'name'+(i-1));
                car_name_div.setAttribute('OnClick', 'car_detail(this.id , this)');
				car_name_div.innerHTML = data[i-1].car_name;
				$('.car_div_name').text(data[i-1].car_name);

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
function car_detail(clicked_id ,elem){
	let curElem = $(elem);
	let curIdx = Number(curElem.attr('data-car-idx'));
	let car_states = $('.car_state_div');
	let carcar_states = $('[class^=carcar]');
	
	car_states.map(function(idx , item){	
		item = $(item);
		if(curIdx === Number(item.attr("data-car-idx"))){
			// highlight
			if(!item.hasClass('highlight'))
			{
				item.addClass("highlight");
				$('[class^=carcar][data-carcar-idx='+(idx+1)+']').addClass("highlight");
				$('#route3_'+(idx+1)+'').addClass("map-high");
				$('.name'+idx+'').addClass("highlight");
			}
		}
		else{
			// highlight 없앰
			item.removeClass("highlight");
			$('[class^=carcar][data-carcar-idx='+(idx+1)+']').removeClass("highlight");
			$('#route3_'+(idx+1)+'').removeClass("map-high");
			$('.name'+idx+'').removeClass("highlight");
		}
	});
		
	var id = clicked_id
	
        $.ajax({
            url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
            dataType : 'json',
            success : function (data) {
            $("#car_number").val(data[id].id).text(data[id].id);
			$("#car_name").text(data[id].car_name);
			// 자동차 이미지
			if(data[clicked_id].container_id ==! null ) {
				$(".car_state_wrapper").css({'background-image': 'url("../static/img/car/car_con.png")'});	
			} else {
				$(".car_state_wrapper").css({'background-image': 'url("../static/img/car/car.png")'});
			}
			$(".car_battery_icon, .car_data_icon").empty();
		
			$.ajax({
				url : "http://127.0.0.1:8000/api/PiInfo/?format=json",
				dataType : 'json',
				success : function (pi_data) {
					for(var j=0; j<=pi_data.length-1; j++){
						if(data[clicked_id].pi_id ==pi_data[j].pi_id){
							$("#car_type").text("["+pi_data[j].car_type+"]");
							$(".car_battery").text(pi_data[j].battery+"%");

							battery = Number(pi_data[j].battery)
							var battery_icon = document.createElement("i");
								if(battery > 80 ) {
									battery_icon.setAttribute("class", 'fas fa-battery-full active');
									$(".car_battery").addClass('active');
								}
								else if(80 >= battery && battery > 60) {
									battery_icon.setAttribute("class", 'fas fa-battery-three-quarters active');
								}
								else if(60 >= battery && battery > 40) {
									battery_icon.setAttribute("class", 'fas fa-battery-half active');
								}
								else if(40 >= battery && battery > 20) {
									battery_icon.setAttribute("class", 'fas fa-battery-quarter active');
								}
								else if(20 > battery) {
									battery_icon.setAttribute("class", 'fas fa-battery-empty active');
								}
							$(".car_battery_icon").append(battery_icon);

							// commnication
							communication = Number(pi_data[j].communication)
							var communication_icon = document.createElement("i");
								if(communication > 80 ) {
									communication_icon.setAttribute("class", 'fas fa-signal active');
									$(".car_data").text("양호").addClass('active');
								}
								else if(80 >= communication && communication > 50) {
									communication_icon.setAttribute("class", 'fas fa-signal low');
									$(".car_data").text("불안정");
								}
								else if(50 >= communication && communication > 20) {
									communication_icon.setAttribute("class", 'fas fa-signal very-low');
									$(".car_data").text("불안정");
								}
								else if(20 > communication ) {
									communication_icon.setAttribute("class", 'fas fa-signal none');
									$(".car_data").text("불량");
								}
							$(".car_data_icon").append(communication_icon);
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






