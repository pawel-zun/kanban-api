function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').attr('id', self.id).addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnDelete = $('<button>').addClass('btn-delete').text('x');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		var $columnEdit = $('<button>').addClass('create-column').text('Edit');

	$columnDelete.click(function() {
		self.deleteColumn();
	});

	$columnEdit.click(function() {
		self.editColumn();
	});

	$columnAddCard.click(function() {
		var cardName = prompt('Enter the name of the card');
		if ((!(cardName == false)) && (!(cardName == null))) {
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.addCard(card);
				}
			});
		} else if (cardName == false) {
			alert('Please write down task description');
		};
	});

		$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnEdit).append($columnCardList);

		return $column;
	};
};

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},

	deleteColumn: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response) {
				self.$element.remove();
			}
		});
	},

	editColumn: function() {
		var self = this;
		var newName = prompt('Enter new column description');
		if ((!(newName == false)) && (!(newName == null))) {
		$.ajax({
				url: baseUrl + '/column/' + self.id,
				method: 'PUT',
				data: {
					name: newName
				},
				success: function() {
					$(self.$element).children('.column-title').text(newName);
				}
			});
		} else if (newName == false) {
			alert('Please write down task description');
		}
	}
}