$(document).ready(function map(){
    var map_display;
    var map_array = new Array();
    var map_array2 = new Array();
    for(var i=0;i<=19;i++){
        map_array2[i] = new Array();
    }
     console.log("여기까지");
     $.ajax({
                 url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
                 dataType : 'json',
                 success : function(data){
                     map_display=data[0].map;
                     map_array=map_display.split('s');

                     for(var i=0; i<=19; i++){
                       map_array2[i]=map_array[i].split(', ');
                     }

                     for(var i=0; i<=19; i++){
                         for(var j=0; j<=19; j++){
                             $("#map").append(map_array2[i][j]);
                         }
                        $("#map").append("<br>");
                     }
                 }
      });
});
function view(){
    var xx = document.getElementById("x").value;
    var yy = document.getElementById("y").value;
    $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/map/mapinfo',
            data : {
            'xxx' : xx,
            'yyy' : yy
            },
            dataType:'json',
            success: function(){
            }
        });
    window.location.reload()
    }