function Smartphone(brand, name, price, color) {
	this.brand = brand;
	this.name = name;
	this.price = price;
	this.color = color;
}

Smartphone.prototype.printInfo = function () {
	var info = this.name + ' to telefon marki ' + this.brand + ', jego kolor to ' + this.color + ', a kosztuje ' + this.price + ' zł.';
	console.log(info);
	this.$p = $('<p>').text(info);
	$('.zad1').append(this.$p);
};

var iPhone6S = new Smartphone('Apple', 'iPhone 6s', '3000', 'Złoty');
var galaxyS7 = new Smartphone('Samsung', 'Galaxy S7', '2000', 'Srebrny');
var lumia650 = new Smartphone('Nokia', 'Lumia 650', '1000', 'Czarny');

iPhone6S.printInfo();
galaxyS7.printInfo();
lumia650.printInfo();

function Button(name, text) {
	this.name = name || 'Button';
	this.text = text || 'Hello';
}

Button.prototype.create = function () {
	var self = this;
	this.$element = $('<button>').text(this.name);
	this.$element.on('click', function () {
		alert(self.text);
	});
	$('.zad2').append(this.$element);
};

var btn1 = new Button('Przycisk', '');
btn1.create();