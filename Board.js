var board = {
	name: 'Kanban Board',
	$element: $('#board .column-container'),
	addColumn: function(column) {
	this.$element.append(column.$element);
	initSortable();
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

function initSortable() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
};