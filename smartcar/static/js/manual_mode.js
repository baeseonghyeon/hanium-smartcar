$(document).ready(function(){
    $("#control").fadeOut("fast");
})
function manual(){
    $("#drivingmode").text('수동');
    $("#control").fadeIn("fast");
}
function auto(){
    $("#drivingmode").text('자동');
    $("#control").fadeOut('fast');
}
function go(){
var a = '1 '
        $.ajax({
            type : 'POST',
            url : 'http://192.168.0.9:8000',
            dataType:'json',
            data : {
            'bbb': a
            },
            success: function(){
            }
        });
}
function back(){
var a = '4 '
        $.ajax({
            type : 'POST',
            url : 'http://192.168.0.9:8000',
            dataType:'json',
            data : {
            'bbb': a
            },
            success: function(){
            }
        });
}
function right(){
var a = '2 '
        $.ajax({
            type : 'POST',
            url : 'http://192.168.0.9:8000',
            dataType:'json',
            data : {
            'bbb': a
            },
            success: function(){
            }
        });
}
function left(){
var a = '3 '
        $.ajax({
            type : 'POST',
            url : 'http://192.168.0.9:8000',
            dataType:'json',
            data : {
            'bbb': a
            },
            success: function(){
            }
        });
}
