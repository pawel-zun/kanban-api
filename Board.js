var board = {
	name: 'Kanban Board',
	$element: $('#board .column-container'),
	addColumn: function(column) {
	this.$element.append(column.$element);
	initSortableCards();
	}
};

$('.create-column').click(function() {
 	var columnName = prompt('Enter a column name');
 	if ((!(columnName == false)) && (!(columnName == null))) {
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response) {
        var column = new Column(response.id, columnName);
        board.addColumn(column);  
      }
    });
  } else if (columnName == false) {
  	alert('Error! New column must be named.');
  };
});


function initSortableCards() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder',
    receive: function(event, ui) {
      itemId = ui.item[0].id;
      itemName = ui.item[0].childNodes[2].innerText;
      targetColumnId = ui.item[0].parentElement.parentElement.id;
        moveItem(itemId, itemName, targetColumnId);
        console.log(ui);
      }
  }).disableSelection();
}