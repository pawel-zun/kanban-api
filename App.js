var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '2533',
	'X-Auth-Token': '80ae77ad4c9bf5ebd6705aedf4938aee'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns)
	}
});

function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.addCard(card);
	});
}

/* function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	for (var i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
} 

var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

todoColumn.addCard(card1);
doingColumn.addCard(card2); */