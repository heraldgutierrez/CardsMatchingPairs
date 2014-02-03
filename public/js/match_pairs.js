var DECK;					// deck from the server
var CARDS;					// array of cards, keeps track of which cards are in what position
var CARD_ONE = null;		// first card clicked on to be matched
var CARD_TWO = null;		// second card clicked on to be matched
var CLICKED = false;		// is it first or second click; second == check if cards match
var CHECKING = false;		// are we currently checking a match?
var MATCHES_MADE = 0;		// number of matches we made
var MATCHES_NEEDED = 0;		// total of matches needed to complete the game

var NUM_FLIPS = 0;			// number of flips we've attempted
var CARD_SIZE = 'sizeXS';	// size of the cards

var SCORE = 0;				// score for the game
var MULTIPLIER = 1;			// score multiplier. each correct pair increments the multiplier
var SCORE_INC = 10;			// base score for the multiplier

$(document).ready(function() {
	// need to get the ID so we only update this clients page,
	// not every client viewing the page
	var pathnameID = ($(location).attr('pathname')).replace(/\//, '');

	// need to get url for socket.io
	var url = $(location).attr('origin');
	// var socket = io.connect('http://localhost:5000');
	var socket = io.connect(url);

	/*****************************
		Socket.io commands
	*****************************/
	// CreateNewDeck: creates a new deck to play with
	// - numberDecks: 1 deck = 52 cards
	// - id: current clients ID
	socket.emit('createNewDeck', { numberDecks : 1, id : pathnameID });

	startNewGame();

	// StartNewGame: starts a new game
	// - shuffles the deck
	// - clears the board, and places new cards for play
	function startNewGame() {
		resetBoard();

		// ShuffleDeck: randomaly shuffles the deck
		socket.emit('shuffleDeck', { id : pathnameID });

		// GetNewDeck: gets a new Deck object which contains the cards used for play
		socket.emit('getNewDeck', { id : pathnameID });
		socket.on('getDeck', function (deck, id) {
			// only update the current deck with a new deck if we are the current client
			if(pathnameID == id) {
				DECK = deck;
				MATCHES_NEEDED = DECK.cards.length / 2;		// total number of cards / 2 = number of pairs
				createCards();
			}
		});
	}

	$('#newGame').click(function() {
		startNewGame();
	});
});

// ResetBoard: reset the board to a brand new state
function resetBoard() {
	DECK = null;
	CARDS = null;
	CARD_ONE = null;		
	CARD_TWO = null;		
	CLICKED = false;		
	CHECKING = false;
	NUM_FLIPS = 0;		
	MATCHES_MADE = 0;	
	MATCHES_NEEDED = 0;	

	SCORE = 0;
	MULTIPLIER = 1;

	$('#numFlips').html(NUM_FLIPS);	
	$('#multiplier').html(MULTIPLIER);
	$('#score').html(SCORE);
}

// CreateCards: creates the cards being used for the game.
// - Each card contains a 'front' and 'back' side, allowing the card to be flipped over
function createCards() {
	var fronHtml;		// html containing the front face of the card; eg. Ace of hearts
	var backHtml;		// html for the back face of the card; eg. the design
	var html;			// entire html of the card

	CARDS = new Array(); 	// array of all the cards. This will hold all the information about each card
	var card;				// the current card being processed

	$('#container').html('');	// clear the container

	for(var i = 0; i < DECK.cards.length; i++) {
		card = DECK.cards[i];				// get the card from the deck
		CARDS.push(card);					// push the current card into the array
		// frontHtml = card.frontHtml;			
		backHtml = card.backHtml;

		// this is the container which holds the 'front' and 'back' of the card
		// - class 'flipped' indicates if it's showing the back or front side
		// - cardNum is which position the card is in the array, CARDS. It is used later to determind if a match has occurred
		html = '<div class="flip-container flipped ' + CARD_SIZE + '" cardNum="' + i + '">';
		html += '<div class="flipper">';
		html += '<div class="front">';
		// we leave the front html blank so the users cannot simply check the values of each card 
		// by using the developer window
		// html += frontHtml;			
		html += '</div>';
		html += '<div class="back">';
		html += backHtml;
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('#container').append(html);
	}// for loop

	// set the size of the cards
	$('.card').addClass(CARD_SIZE);

	// when a container is clicked, we flip the card over
	$('.flip-container').click(function() {
		// check if we are currently checking a match and 
		// only allow a card to flip if the back side is currenly shown
		if(!CHECKING && $(this).hasClass('flipped')) {
			// get the card number, this associates which card infor in the array CARDS we use
			var cardNum = $(this).attr('cardNum');

			// apply the front html to the card we clicked
			// this will show the value of the card; eg. Ace of hearts
			$(this).children('.flipper').children('.front').html(DECK.cards[cardNum].frontHtml);

			// apply the class 'flipped' to animate the card being flipped over
			$(this).toggleClass('flipped');

			// need to assign the card size to the front size so it matches all the other cards
			$('.card').addClass(CARD_SIZE);


			// !CLICKED == we are picking our first card to match
			if(!CLICKED) {
				CLICKED = true;

				// card one information
				CARD_ONE = {
					index : cardNum,		// position in array, CARDS
					card : CARDS[cardNum]	// the card information; eg. value, html
				};
			} else {
				// we are picking our second card to match
				CLICKED = false;
				CARD_TWO = {
					index : cardNum,		// position in array, CARDS
					card : CARDS[cardNum]	// the card information; eg. value, html
				};

				CHECKING = true;			// we are currenly checking a match

				// we need to set a timeout before we do a check for a match
				// this allows the user to examine what the second card is
				setTimeout(function() { checkMatch(); }, 1000);
			}// if(!CLICKED)
		}// if(!CHECKING && is(flipped))
	});// card clicked
}

// CheckMatch: we compare the values of the two cards we selected
// If they match, we leave the showing.
// Otherwise, we clear the front html (so they can't use developer window)
//	and flip the cards again to show the back side

function checkMatch() {
	// compare the values of our cards
	if((CARD_ONE.card).value == (CARD_TWO.card).value) {
		// increment matches made
		MATCHES_MADE++;

		// increase score and multiplier
		SCORE = SCORE + (MULTIPLIER * SCORE_INC);
		MULTIPLIER++;
		$('#score').html(SCORE);
	} else {
		// they don't match so we need to reset our cards

		// clear front html using card one and card two's index value
		$('.flip-container[cardNum="' + CARD_ONE.index + '"]').children('.flipper').children('.front').html('');
		$('.flip-container[cardNum="' + CARD_TWO.index + '"]').children('.flipper').children('.front').html('');

		// re-flip the cards to show the back side
		$('.flip-container[cardNum="' + CARD_ONE.index + '"]').toggleClass('flipped');
		$('.flip-container[cardNum="' + CARD_TWO.index + '"]').toggleClass('flipped');

		// reset multiplier
		MULTIPLIER = 1;
	}

	// set cards to null
	CARD_ONE = null;
	CARD_TWO = null;

	// we are done checking
	CHECKING = false;

	// increment number of flips we attampted
	NUM_FLIPS++;
	$('#numFlips').html(NUM_FLIPS);

	// display multiplier
	$('#multiplier').html(MULTIPLIER);

	// prompt user that they paired all the cards
	// do they want to play again?
	if(MATCHES_MADE == MATCHES_NEEDED) {
		var result = confirm('Congratulations, you paired all the cards!\nDo you want to play again?');
		if(result)
			startNewGame();
	}

}