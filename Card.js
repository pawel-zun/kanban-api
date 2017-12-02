function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.$element = createCard();

	function createCard() {
		if ((!(self.name == false)) && (!(self.name == null))) {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		$cardDelete.click(function() {
			self.removeCard();
		});

		$card.append($cardDelete).append($cardDescription);

		return $card;
		} else if (self.description == false) {
			alert('Please write down task description');
		};
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
	}
};