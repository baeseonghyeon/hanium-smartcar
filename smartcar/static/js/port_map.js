$(document).ready(function array(){

    var map_display;
    var map_array = new Array();
    var map_array2 = new Array();
    for(var i=0;i<=19;i++){
        map_array2[i] = new Array();
    }
     $.ajax({
                 url : "http://127.0.0.1:8000/api/MapInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                     map_display=data[0].map;
                     map_array=map_display.split('s');
                     console.log(map_array);
//                      var k =0;
//                      for(var i=0; i<=19; i++){
//                       for(var j=0; j<=19; j++){
//                                map_array2[i][j]=map_array[k];
//                                k++;
//                       }
//                     }
//                 for(var i=0; i<=19; i++){
//                     for(var j=0; j<=19; j++){
//                     console.log(map_array2[i][j]);
//                         $("#map").append(map_array2[i][j]);
//                     }
//                     $("#map").append("<br>");
//                 }
                }
      });
});
