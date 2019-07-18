function detail(){

    var num = document.getElementById("main_carnumber").value;

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
