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
