// 메인화면에서 선택된 차량의 정보를 디테일 페이지로 넘김
function detail(){

    var num = document.getElementById("car_number").value;
    if(num==undefined){
    alert('차량 선택 후 실행하세요')
    }
    else{
    var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('action', 'http://127.0.0.1:8000/main/car_detail');
	document.charset = "utf-8";
	var hiddenField = document.createElement('input');
	hiddenField.setAttribute('type', 'hidden');
	hiddenField.setAttribute('name', 'carNumber');
	hiddenField.setAttribute('value', num);
	form.appendChild(hiddenField);

	document.body.appendChild(form);
	form.submit();
	}
}

//컨테이너 등록 함수
function container(){

var number = document.getElementById("for_container").value;
var container_number = document.getElementById("container_id").value;
    $.ajax({
            type : 'POST',
            url : 'http://127.0.0.1:8000/main/container_input',
            data : {
                    'id' : number,
                    'container_id' : container_number,
            },
            dataType:'json',
            success: function(){
            }
    });
alert('등록완료')
$("#container_id").val('')
}