function pi_check2(){
    var pi_id3 = document.getElementById("pi_id").value;
    var check = 0;
     $.ajax({
                 url : "http://127.0.0.1:8000/api/PiInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                    for(var i=0; i<=data.length-1; i++){
                        if(pi_id3 == data[i].pi_id){
                            pi_check()
                            check=1
                            break
                        }
                    }
                    if(check==0){
                        alert('등록된 pi가 아닙니다.')
                    }
                 }
     });
}
function pi_check(){
     var pi_id2 = document.getElementById("pi_id").value;
     var check = 1;
     $.ajax({
                 url : "http://127.0.0.1:8000/api/CarInfo/?format=json",
                 dataType : 'json',
                 success : function (data) {
                    if(data.length !=0){
                        for(var i=0; i<=data.length-1; i++){
                            if(pi_id2==data[i].pi_id){
                            alert('이미 등록된 차량입니다.')
                                $("#pi_id").val('');
                                $("#car_name").val('');
                            check = 0
                            }
                        }
                        if(check==1){
                            input()
                        }
                    }
                    else if(data.length == 0){
                        input()
                    }
                 }
     });
}

function input(){
    var name_car = document.getElementById("carname").value;
    var id_pi = document.getElementById("pi_id").value;
    $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/main/car_input',
            data : {
                    'car_name' : name_car,
                    'pi_id' : id_pi,
            },
            dataType:'json',
            success: function(){
            }
    });
    alert('차량을 성공적으로 등록 하였습니다.');
    $("#pi_id").val('');
    $("#car_name").val('');
}

