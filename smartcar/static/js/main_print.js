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
    var button = document.createElement("button");
    button.setAttribute("id", i-1);
    button.setAttribute('OnClick', 'car_detail(this.id)');
//    버튼 디자인부분 ----------------------------------------
    button.style.width = "70px";
    button.style.height = "70px";
    button.innerHTML = 'CAR'+i;
    document.body.appendChild(button);
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






