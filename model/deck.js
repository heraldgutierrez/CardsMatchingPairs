var Card = require('./card');

var FINAL_SUITS = [ 'heart', 'club', 'spade', 'diamond' ];
// var FINAL_SUITS2 = [ 'Hearts', 'Clubs', 'Spades', 'Diamonds' ];
var FINAL_VALUES = ['', 'ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
// var FINAL_VALUES2 = ['', 'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
// var FINAL_ACE = 1;
// var FINAL_2 = 2;
// var FINAL_3 = 3;
// var FINAL_4 = 4;
// var FINAL_5 = 5;
// var FINAL_6 = 6;
// var FINAL_7 = 7;
// var FINAL_8 = 8;
// var FINAL_9 = 9;
// var FINAL_10 = 10;
// var FINAL_JACK = 11;
// var FINAL_QUEEN = 12;
// var FINAL_KING = 13;

// var RANKS = {
// 	ace: 'A',
// 	two: '2',
// 	three: '3',
// 	four: '4',
// 	five: '5',
// 	six: '6',
// 	seven: '7',
// 	eight: '8',
// 	nine: '9',
// 	ten: '10',
// 	jack: 'J',
// 	queen: 'Q',
// 	king: 'K'
// };

module.exports = Deck;

// new Deck object
// - numDecks": how many decks we want; eg. 1 = 52 cards, 2 = 104 cards, etc...
function Deck (numDecks) {	
	this.cards = createDeck(numDecks);
	this.cardsUsed = 0;


	// CreateDeck: we create each card of the deck
	// - numDecks: how many decks we're creating
	function createDeck(numDecks) {
		var cards = new Array();	// array which holds all our cards
		// var cardsPerDecks = 52;		// number of cards per deck

		// for number of decks we're creating
		for(var deck = 0; deck < numDecks; deck++) {

			// we create each suit: Hearts, Diamonds, Spades, and Clubs
			for (var suit = 0; suit < 4; suit++) {

				// we create each card: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, and K
				for(var i = 1; i <= 13; i++) {

					// push each card into the array
					// each card has a value
					cards.push( 
					{
						card: FINAL_VALUES[i] + '-' + FINAL_SUITS[suit],
						value: i,
						suit: FINAL_SUITS[suit],
						class: 'card-' + FINAL_SUITS[suit] + '-' + FINAL_VALUES[i],
						html: Card.createCard(FINAL_VALUES[i], FINAL_SUITS[suit]),
						backHtml: Card.backHTML(),
						frontHtml: Card.frontHTML(FINAL_VALUES[i], FINAL_SUITS[suit])
					});
				}// for-cards
			}// for-suits
		}// for-decks

		return cards;
	}
} 


// Shuffle: shuffling the deck into a random order
Deck.prototype.shuffle = function() {
	// we shuffle the deck 3 times to ensure it is completely random
	for(var i = 0; i < 3; i++) {
		this.shuffleDeck();
	}

	// reset how many cards have been used
	this.cardsUsed = 0;
}

// ShuffleDeck: shuffle the deck into a random order
Deck.prototype.shuffleDeck = function() {
	// Put all the used cards back into the deck, and shuffle it into
	// a random order.
	var min = 0;
	var max = this.cards.length - 1;
	var rand;
	var temp

	// shuffling is done by iterating through the deck and swapping it with
	// a random card in the deck
	for (var i = max; i >= 0; i--) {
		rand = Math.floor(Math.random() * (max + 1));
		temp = this.cards[i];
		this.cards[i] = this.cards[rand];
		this.cards[rand] = temp;
	}
}

// DealCard: return the next card of the deck
// 	ideally used for Black Jack or Texa-Hold'em
Deck.prototype.dealCard = function() {
	var card = this.cards[this.cardsUsed];
	this.cardsUsed++;
	return card;
}

