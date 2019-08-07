function input(){
    var name_car = document.getElementById("carname").value;
    var id_pi = document.getElementById("pi_id").value;
    console.log(name_car)
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

