var DECK;
var CARDS;
var CARD_ONE;
var CARD_TWO;
var CLICKED = false;
var CHECKING = false;
var NUM_FLIPS = 0;
var CARD_SIZE = 'sizeXS';

$(document).ready(function() {
	CARD_ONE = null;
	CARD_TWO = null;
	var pathnameID = ($(location).attr('pathname')).replace(/\//, '');
	var socket = io.connect('http://localhost:5000');

	socket.emit('createNewDeck', { numberDecks : 1, id : pathnameID });
	socket.emit('shuffleDeck');
	socket.emit('getNewDeck', { id : pathnameID });
	socket.on('getDeck', function (deck, id) {
		if(pathnameID == id.id) {
			DECK = deck;
			createCards();
		}
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
		html = '<div class="flip-container flipped ' + CARD_SIZE + '" cardNum="' + i + '">';
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
		$('.card').addClass(CARD_SIZE);
	}

	//$('.back').hide();
	$('.flip-container').click(function() {
		if(!CHECKING && $(this).hasClass('flipped')) {
		// if(!CHECKING) {
			var cardNum = $(this).attr('cardNum');
			$(this).children('.flipper').children('.front').html(DECK.cards[cardNum].frontHtml);
			$(this).toggleClass('flipped');
			$('.card').addClass(CARD_SIZE);

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
		$('.flip-container[cardNum="' + CARD_ONE.index + '"]').toggleClass('flipped');
		$('.flip-container[cardNum="' + CARD_TWO.index + '"]').toggleClass('flipped');
	}

	CARD_ONE = null;
	CARD_TWO = null;
	CHECKING = false;
	NUM_FLIPS++;
	$('#numFlips').html(NUM_FLIPS);
}

function addCard(html) {
	$('#container').append(html);
}