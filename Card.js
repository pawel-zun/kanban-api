function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name;
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').attr('id', self.id).addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');
		var $cardEdit = $('<button>').addClass('create-column').text('Edit');

		$cardDelete.click(function() {
			self.removeCard();
		});

		$cardEdit.click(function() {
			self.editCard();
		});

		$card.append($cardDelete).append($cardEdit).append($cardDescription);

		return $card;
	};
};

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {
				self.$element.remove();
			}
		});
	},

	editCard: function() {
		var self = this;
		var newName = prompt('Enter new description');
		if ((!(newName == false)) && (!(newName == null))) {
		$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					id: self.id,
					name: newName,
					bootcamp_kanban_column_id: $(self.$element).parent().parent().attr('id')
				},
				success: function(response) {
					$(self.$element).children('.card-description').text(newName);
				}
			});
		} else if (newName == false) {
			alert('Please write down task description');
		}
	}
};