function moving(){
    moving2()
    moving22()
//    position_refresh()
}
function moving2(){
    var clicked_car = document.getElementById("car_number").value
    var route
    var route2 = new Array()
    var route3 = new Array()
    var move = new Array()
    var exam =''
    var index = 0
     $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                    route = data[clicked_car-1].car_route
                    route2 = route.split(']')
                    for(var i=0; i<=route2.length-2; i++){
                        route3 = new Array()
                    }
                    for(var i=0; i<=route2.length-2; i++){
                        route3[i] = route2[i].split('a')
                    }
                    for(var i=0; i<=route2.length-2; i++)
                        for(var j=0; j<=1; j++){
                            route3[i][j] = Number(route3[i][j])
                        }
                    var i = 0
                    try {
                        while(1){
                            if(route3[index + 2][0] == route3[index][0] + 1){
                                if(route3[index + 2][1] == route3[index][1] + 1){
                                    if(route3[index + 1][0] == route3[index][0]){
                                        move[i]='21'
                                        index += 2
                                        i++
                                        continue
                                    }
                                    if(route3[index + 1][1] == route3[index][1]){
                                        move[i]='33'
                                        index += 2
                                        i++
                                        continue
                                    }
                                }
                            }
                            if(route3[index + 2][0] == route3[index][0] - 1)
                                if(route3[index + 2][1] == route3[index][1] +1){
                                    if(route3[index][0] == route3[index + 1][0]){
                                        move[i]='31'
                                        index += 2
                                        i++
                                        continue
                                    }
                                    if(route3[index + 1][1] == route3[index][1]){
                                        move[i]='23'
                                        index += 2
                                        i++
                                        continue
                                    }
                                }
                            if(route3[index + 2][0] == route3[index][0] - 1)
                                if(route3[index + 2][1] == route3[index][1] - 1){
                                    if(route3[index][0] == route3[index + 1][0]){
                                        move[i]='22'
                                        index += 2
                                        i++
                                        continue
                                    }
                                    if(route3[index][1] == route3[index + 1][1]){
                                        move[i]='34'
                                        index += 2
                                        i++
                                        continue
                                    }
                                }
                            if(route3[index + 2][0] == route3[index][0] + 1)
                                if(route3[index + 2][1] == route3[index][1] - 1){
                                    if(route3[index + 1][1] == route3[index][1]){
                                        move[i]='24'
                                        index += 2
                                        i++
                                        continue
                                    }
                                    if(route3[index + 1][0] == route3[index][0]){
                                        move[i]='32'
                                        index += 2
                                        i++
                                        continue
                                    }
                                }
                            if(route3[index][0] == route3[index + 1][0]){
                                if(route3[index][1] > route3[index + 1][1]){
                                    move[i]='13'
                                    index += 1
                                    i++
                                    continue
                                }
                                if(route3[index][1] < route3[index + 1][1]){
                                    move[i]='11'
                                    index += 1
                                    i++
                                    continue
                                }
                            }
                            if(route3[index][1] == route3[index + 1][1]){
                                if(route3[index + 1][0] > route3[index][0]){
                                    move[i]='12'
                                    index += 1
                                    i++
                                    continue
                                }
                                if(route3[index][0] > route3[index + 1][0]){
                                    move[i]='14'
                                    index += 1
                                    i++
                                    continue
                                }
                            }
                        index += 1
                        i++
                        }
                    } catch(e){
                            if(e instanceof TypeError){ }
                            else if(e instanceof RangeError){ }
                            else if(e instanceof EvalError){ }
                            else { }
                      }
                      if(move[move.length-1]==11){ move[move.length]=11}
                      if(move[move.length-1]==12){ move[move.length]=12}
                      if(move[move.length-1]==13){ move[move.length]=13}
                      if(move[move.length-1]==14){ move[move.length]=14}
                         for(var k=0; k<=move.length; k++){
                            if(move[k]==11){m11(clicked_car)}
                            if(move[k]==12){m12(clicked_car)}
                            if(move[k]==13){m13(clicked_car)}
                            if(move[k]==14){m14(clicked_car)}
                            if(move[k]==21){m21(clicked_car)}
                            if(move[k]==22){m22(clicked_car)}
                            if(move[k]==23){m23(clicked_car)}
                            if(move[k]==24){m24(clicked_car)}
                            if(move[k]==31){m31(clicked_car)}
                            if(move[k]==32){m32(clicked_car)}
                            if(move[k]==33){m33(clicked_car)}
                            if(move[k]==34){m34(clicked_car)}
                         }
                 }
     })
}
function moving22(){
var click_car = document.getElementById("car_number").value
    $.ajax({
        url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
        dataType : 'json',
        success : function (data) {
            var bb = data[click_car-1].car_route
            console.log(bb)
            var aa = data[click_car-1].car_code
//            $.ajax({
//                type : 'POST',
//                url : 'http://192.168.0.9:8000/',
//                dataType:'json',
//                data : {
//                    'bbb': aa
//                },
//                success: function(){
//                }
//            });
        }
    });
}
function position_refresh(){
    var clicked_car = document.getElementById("car_number").value
    var target_x = document.getElementById("a").value
    var target_y = document.getElementById("b").value
    $.ajax({
        type : 'POST',
        url : 'http://127.0.0.1:8000/map/refresh',
        dataType:'json',
        data : {
            'car_number': clicked_car,
            'target_x': target_x,
            'target_y': target_y
        },
        success: function(){
        }
    });
}
function m11(i){
        $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
}
function m12(i){
        $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
}
function m13(i){
        $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
}
function m14(i){
        $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
}
function m21(i){
    $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
    $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
}
function m22(i){
    $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
    $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
}
function m23(i){
    $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
    $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
}
function m24(i){
    $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
    $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
}
function m31(i){
    $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
    $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
}
function m32(i){
    $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
    $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
}
function m33(i){
    $(".carcar"+i).animate({top: "+=79.1625366210938"}, 500)
    $(".carcar"+i).animate({left: "+=79.1625366210938"}, 500)
}
function m34(i){
    $(".carcar"+i).animate({top: "-=79.1625366210938"}, 500)
    $(".carcar"+i).animate({left: "-=79.1625366210938"}, 500)
}