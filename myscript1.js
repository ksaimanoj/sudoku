var tab_elem = [];
var tab_val=[];
var one_row_elem = [];
var one_row = [];
var possibility = new Array(9);
var answers = [];

for (var i = 0; i < possibility.length; i++) {
	possibility[i] = new Array(9);
	for (var j = 0; j < possibility[i].length; j++) {
		possibility[i][j] = new Array(9);
	};
};

for (var i = 0; i < possibility.length; i++) {
	for (var j = 0; j < possibility[i].length; j++) {
		for (var k = 0; k < possibility[i][j].length; k++) {
			possibility[i][j][k] = true;
		};
	};
};

$('td').keypress(extract_data_from_table);

// All the data from the sudoku is stored in tab_val.
function extract_data_from_table() {
	tab_val = [];
	tab_elem = [];
	$('tr').each(function() {
		one_row = [];
		one_row_elem = [];
		$(this).find('td').each(function() {
			val = $(this).html();
			one_row_elem.push($(this));
			if(val=='') val = 0;
			one_row.push(val);
		});
		tab_val.push(one_row);
		tab_elem.push(one_row_elem);
	});
	//console.log(tab_val);
}

// To change apperance of the locked elements. The question!
$('#lock').click(function() {
	$('tr').each(function() {
		$(this).find('td').each(function() {
			if($(this).html()!=''){
				$(this).css('font-weight','bolder');
				$(this).css('font-size','22px');
				$(this).attr('contenteditable','false');
				$(this).css('color','red');
			}
		});
	});
});

$('#ans').click(function() {
	extract_data_from_table();
	find_possibility_matrix();
	solve();
	publish();
});

// To calculate the possibilities.
function find_possibility_matrix () {
	for (var i = 0; i < tab_val.length; i++) {
		for (var j = 0; j < tab_val[i].length; j++) {
			if(tab_val[i][j]!=0){
				var row_num = i, col_num = j, num = tab_val[i][j];
				// false for that particular cell.
				for (var elem_index = 0; elem_index < 9; elem_index++) {
					possibility[row_num][col_num][elem_index] = false;
				};
				// false for the entire row.
				for (var col_index = 0; col_index < 9; col_index++) {
					possibility[row_num][col_index][num-1] = false;
				};
				// false for the entire column.
				for (var row_index = 0; row_index < 9; row_index++) {
					possibility[row_index][col_num][num-1] = false;
				};
				// false for entire block.
				false_for_block(Math.floor(row_num/3), Math.floor(col_num/3), num-1);
			} 
		};
	};
	//console.log(possibility);
}

function false_for_block (a, b, num) {
	for (var i = 3*a; i < 3*(a+1); i++) {
		for (var j = 3*b; j < 3*(b+1); j++) {
			possibility[i][j][num] = false;
		};
	};
}

function solve () {
	answers = [];
	//In each cell check if only one number is possible.
	for (var i = 0; i < possibility.length; i++) {
		for (var j = 0; j < possibility[i].length; j++) {
			var count = 0;
			for (var k = 0; k < possibility[i][i].length; k++) {
				if(possibility[i][j][k]) count++;
			};
			if(count == 1){
				for (var k = 0; k < possibility[i][j].length; k++) {
					if(possibility[i][j][k]) answers.push([i,j,k+1]);
				};
			}
		};
	};

	//In each row, check if for a particular number only one cell is possible.
	for (var i = 0; i < possibility.length; i++) {
		for (var k = 0; k < 9; k++) {
			var count = 0;
			for (var j = 0; j < possibility[i].length; j++) {
				if(possibility[i][j][k]) count++;
			};
			if(count == 1) {
				for (var j = 0; j < possibility[i].length; j++) {
					if(possibility[i][j][k]) answers.push([i,j,k+1]);
				};
			}
		};
	};

	//In each column, check if for a particular number only one cell is possible.
	for (var j = 0; j < possibility[0].length; j++) {
		for (var k = 0; k < 9; k++) {
			var count = 0;
			for (var i = 0; i < possibility.length; i++) {
				if(possibility[i][j][k]) count++;
			};
			if(count == 1){
				for (var i = 0; i < possibility.length; i++) {
					if(possibility[i][j][k]) answers.push([i,j,k+1]);
				};
			}
		};
	};

	// In each block, for each number each if it is unique.
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			check_if_number_unique_in_block(i,j);
		};
	};
	check_if_number_unique_in_block();

	console.log(answers);
	answers_to_tab_val();
}

function answers_to_tab_val () {
	for (var i = 0; i < answers.length; i++) {
		tab_val[answers[i][0]][answers[i][1]] = answers[i][2];
	};
}

function publish () {
	for (var i = 0; i < tab_elem.length; i++) {
		for (var j = 0; j < tab_elem[i].length; j++) {
			if(tab_val[i][j]!=0) tab_elem[i][j].html(tab_val[i][j]);
		};
	};
}

function check_if_number_unique_in_block (a, b) {
	var count = 0;
	for (var k = 0; k < 9; k++) {
		
	};
}