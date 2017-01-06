var tab = $('table')[0];
//console.log(tab);

$('td').keyup(checkIfNumber);

// Allow only one character to be present.
$('td').keypress(function (event) {
	var val = $(this);
	if(val.html().length > 0) {
		val.html(val.html().substring(0,0));
	}
	//console.log($(this).html().length);
});

// To check which arrow key has been pressed.
$('td').keyup(function (event) {
	switch(event.which) {
		case 37:
			move($(this),-1,0);
		break;
		case 38:
			move($(this),0,-1);
		break;
		case 39:
			move($(this),1,0);
		break;
		case 40:
			move($(this),0,1);
		break;
	}
});

// Move the focus depending on the key pressed.
function move(element, x, y) {
	var col = element.index();
	var row = element.parent().index();
	if(row+y >= 0 && row+y <= 8 ) row = row + y;
	if(col+x >= 0 && col+x <= 8  ) col = col + x;
	$('td').eq(row*9+col).focus();
}

// If mouse is over this cell, focus on the cell.
$('td').mouseover(function(event) {
	$(this).focus();
});

// Change color to pale yellow when the cell is focussed, either by mouse or by program.
$('td').focusin(function(event) { 
	$(this).css('background-color','#ffffcc');
});

// Change color to white when the cell losses focus.
$('td').focusout(function(event) {
	$(this).css('background-color','#ffffff');
});

// Check a cell for alphabets when it losses focus.
$('td').focusout(checkIfNumber);

// Check if alphabets have been entered.
function checkIfNumber (event) {
	var val = $(this);
	if(isNaN(val.html())) {
		val.html('');
	}
}