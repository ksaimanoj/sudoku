var tab = $('table')[0];
//console.log(tab);

$('td').keyup(function (event) {
	var val = $(this);
	if(isNaN(val.html())) {
		val.html('');
	}
});

$('td').keypress(function (event) {
	var val = $(this);
	if(val.html().length > 0) {
		val.html(val.html().substring(0,0));
	}
	//console.log($(this).html().length);
});