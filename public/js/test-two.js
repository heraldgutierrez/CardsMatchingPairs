var DECK;
var CARDS;
var CARD_ONE;
var CARD_TWO;
var CLICKED = false;
var CHECKING = false;

$(document).ready(function() {
	CARD_ONE = null;
	CARD_TWO = null;
	var socket = io.connect('http://localhost:5000');

	socket.emit('createNewDeck', { numberDecks : 1 });
	socket.emit('shuffleDeck');
	socket.emit('getNewDeck');
	socket.on('getDeck', function (data) {
		DECK = data;
		createCards();
	});
});

function createCards() {
	var fronHtml;
	var backHtml;
	var html;

	CARDS = new Array();
	var card;

	for(var i = 0; i < DECK.cards.length; i++) {
		card = DECK.cards[i];
		CARDS.push(card);
		frontHtml = card.frontHtml;
		backHtml = card.backHtml;
		html = '<div class="flip-container flip" cardNum="' + i + '">';
		html += '<div class="flipper">';
		html += '<div class="front">';
		// html += frontHtml;
		html += '</div>';
		html += '<div class="back">';
		html += backHtml;
		html += '</div>';
		html += '</div>';
		html += '</div>';

		addCard(html);
	}

	//$('.back').hide();
	$('.flip-container').click(function() {
		if(!CHECKING && $(this).hasClass('flip')) {
			var cardNum = $(this).attr('cardNum');
			$(this).children('.flipper').children('.front').html(DECK.cards[cardNum].frontHtml);
			$(this).toggleClass('flip');
			if(!CLICKED) {
				CLICKED = true;
				CARD_ONE = {
					index : cardNum,
					card : CARDS[cardNum]
				};
			} else {
				CLICKED = false;
				CARD_TWO = {
					index : cardNum,
					card : CARDS[cardNum]
				};
				CHECKING = true;
				setTimeout(function() { checkMatch(); }, 1000);
			}
		}
	});
}

function checkMatch() {
	if((CARD_ONE.card).value != (CARD_TWO.card).value) {
		$('.flip-container[cardNum="' + CARD_ONE.index + '"]').children('.flipper').children('.front').html('');
		$('.flip-container[cardNum="' + CARD_TWO.index + '"]').children('.flipper').children('.front').html('');
		$('.flip-container[cardNum="' + CARD_ONE.index + '"]').toggleClass('flip');
		$('.flip-container[cardNum="' + CARD_TWO.index + '"]').toggleClass('flip');
	}

	CARD_ONE = null;
	CARD_TWO = null;
	CHECKING = false;
}

function addCard(html) {
	$('#container').append(html);
}