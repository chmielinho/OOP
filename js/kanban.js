$(function () {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
			str = 0,
			i = 0;
		for (i = 0; i < 20; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	function Board(headline) {
		var self = this;
		self.id = randomString();
		self.headline = headline;
		self.$element = createBoard();
		function createBoard() {
			var $board = $('<div>').addClass('board'),
				$boardHeadline = $('<h2>').addClass('board-title').text(self.headline),
				$boardColumnList = $('<ul>').addClass('board-column-list'),
				$boardDelete = $('<button>').addClass('btn-delete').text('x'),
				$boardAddColumn = $('<button>').addClass('btn-add-column').text('Dodaj kolumnę');
			$boardDelete.on('click', function () {
				self.removeBoard();
			});
			$boardAddColumn.on('click', function () {
				var input = prompt("Wpisz nazwę kolumny");
				if (input === null || input === '') {
					return;
				}
				self.addColumn(new Column(input));
			});	$board.append($boardHeadline).append($boardDelete).append($boardAddColumn).append($boardColumnList);
			return $board;
		}
	}
	Board.prototype = {
		addColumn: function(column) {
			this.$element.children('ul').append(column.$element);
				Sortable1();
		},
		addBoard: function(board) {
			$('#boards').children('.board-container').append(board.$element);
		},
		removeBoard: function() {
			this.$element.remove();
		}
	};
	function Column(name) {
		var self = this;
		self.id = randomString();
		self.name = name;
		self.$element = createColumn();
		function createColumn() {
			var $column = $('<li>').addClass('column'),
				$columnTitle = $('<h3>').addClass('column-title').text(self.name),
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
			Sortable2();
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
	function Sortable1() {
		$('.board-column-list').sortable({
			connectWith: '.board-column-list',
			placeHolder: '.column-placeholder'
		}).disableSelection();
	}
	function Sortable2() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeHolder: '.card-placeholder'
		}).disableSelection();
	}
	$('.create-board', '#boards').on('click', function () {
		var headline = prompt('Wpisz nazwę tablicy'),
			board = new Board(headline);
		if (headline === null || headline === '') {
			return;
		}
		board.addBoard(board);
	});
});