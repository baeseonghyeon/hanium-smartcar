function car_input(){
        $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/main/main_input',
            data : {
                    'portinfo' : 'ddddd ',
                    'portmap' : '000',
            },
            dataType:'json',
            success: function(){
            }
        });
    alert('차량 세부정보를 입력해주세요');
      $.ajax({
                 url : "http://127.0.0.1:8000/api/MainInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                 var length = data.length;
                 $("#carnumber").val( function( index, val){
                 return val + length;
                 });
                 }
      });
}
function input(){
    var container_car = document.getElementById("container").value;
    var destination_car = document.getElementById("destination").value;
    var route_car = document.getElementById("route").value;
    var speed_car = document.getElementById("speed").value;
    var battery_car = document.getElementById("battery").value;
    var communication_car = document.getElementById("communication").value;
    var drivingmode_car = document.getElementById("drivingmode").value;
    var carnumber_car = document.getElementById("carnumber").value;
    $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/main/car_input',
            data : {
                    'container' : container_car,
                    'destination' : destination_car,
                    'route' : route_car,
                    'speed' : speed_car,
                    'battery' : battery_car,
                    'communication' : communication_car,
                    'drivingmode' : drivingmode_car,
                    'carnumber' : carnumber_car,
            },
            dataType:'json',
            success: function(){
            console.log('okokok');
            }
        });
    alert('저장완료!');
    $("#container").val('');
    $("#destination").val('');
    $("#route").val('');
    $("#speed").val('');
    $("#battery").val('');
    $("#communication").val('');
    $("#drivingmode").val('');
    $("#carnumber").val('');
}
