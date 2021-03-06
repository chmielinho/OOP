// Only one board version !!!
*$(function () {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
			str = 0,
			i = 0;
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();
		function createColumn() {
			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnAddCard = $('<button>').addClass('btn-add-card').text('Dodaj kartę');
			$columnDelete.on('click', function () {
				self.removeColumn();
			});
			$columnAddCard.on('click', function () {
				var input = prompt("Wpisz nazwę karty");
				if (input === null || input === '') {
					return;
				}
				self.addCard(new Card(input));
			});	$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
			return $column;
		}
	}
	Column.prototype = {
		addCard: function (card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function () {
			this.$element.remove();
		}
	};
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();
		function createCard() {
			var $card = $('<li>').addClass('card'),
				$cardDescription = $('<p>').addClass('card-description').text(self.description),
				$cardDelete = $('<button>').addClass('btn-delete').text('x');
			$cardDelete.on('click', function () {
				self.removeCard();
			});
			$card.append($cardDelete).append($cardDescription);
			return $card;
		}
	}
	Card.prototype = {
		removeCard: function () {
			this.$element.remove();
		}
	};
	var board = {
		name: 'Tablica Kanban',
		addColumn: function (column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('.column-container', '#board')
	};
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeHolder: '.card-placeholder'
		}).disableSelection('<p>');
	}
	$('.create-column', '#board').on('click', function () {
		var name = prompt('Wpisz nazwę kolumny'),
			column = new Column(name);
		if (name === null || name === '') {
			return;
		}
		board.addColumn(column);
	});
	var todoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyc tablice kanban');
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});