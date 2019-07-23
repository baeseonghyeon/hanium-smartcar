$(document).ready(function(){
    var map_info;
     $.ajax({
                 url : "http://127.0.0.1:8000/api/MainInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                 map_info=data[0].portinfo;
//                 $("#portname").text(map_info);
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
    document.getElementById('main-side2').appendChild(cardiv);
    // document.body.appendChild(button);
    }
}

function car_detail(clicked_id){
var id = clicked_id;
         $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                    $("#main_carnumber").val(data[clicked_id].carnumber).text(data[clicked_id].carnumber);
                    $("#main_communication").text(data[clicked_id].communication);
                    $("#main_battery").text(data[clicked_id].battery);
                 }
      });
}






