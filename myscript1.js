var tab_val=[];
var one_row = [];

$('td').keypress(extract_data_from_table);

function extract_data_from_table() {
	tab_val = [];
	$('tr').each(function() {
		one_row = [];
		$(this).find('td').each(function() {
			val = $(this).html();
			if(val=='') val = 0;
			one_row.push(val);
		});
		tab_val.push(one_row);
	});
	console.log(tab_val);
}

$('#lock').click(function() {
	$('tr').each(function() {
		$(this).find('td').each(function() {
			if($(this).html()!=''){
				$(this).css('font-weight','bolder');
				$(this).css('font-size','22px');
				$(this).attr('contenteditable','false');
			}
		});
	});
});