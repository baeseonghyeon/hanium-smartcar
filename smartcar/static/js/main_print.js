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
    car = new Array();
    for(var i=1; i<=Car.length; i++){
    var cardiv = document.createElement("div");
    cardiv.setAttribute("id", i-1);
    cardiv.setAttribute("class", 'cardiv');
    cardiv.setAttribute('OnClick', 'car_detail(this.id)');
    cardiv.innerHTML = 'CAR'+i;
    $("#main-side2").append(cardiv);
//    document.getElementById('main-side2').appendChild(cardiv);
    // document.body.appendChild(button);
    }
}

function car_detail(clicked_id){
var id = clicked_id;
         $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                    $("#car_number").val(data[clicked_id].id).text(data[clicked_id].id);
                    $("#car_name").text(data[clicked_id].car_name);
                    $("#x").val(data[clicked_id].now_x);
                    $("#y").val(data[clicked_id].now_y);
                    $("#a").val(data[clicked_id].target_x);
                    $("#b").val(data[clicked_id].target_y);
                 }
      });
}






