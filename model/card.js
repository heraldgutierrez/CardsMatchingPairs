var RANKS = {
	ace: 'A',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
	ten: '10',
	jack: 'J',
	queen: 'Q',
	king: 'K'
};

var SUITS = {
	club: '&clubs;',
	diamond: '&diams;',
	spade: '&spades;',
	heart: '&hearts;'
};

var FINAL_ACE = 'ace';
var FINAL_TWO = 'two';
var FINAL_THREE = 'three';
var FINAL_FOUR = 'four';
var FINAL_FIVE = 'five';
var FINAL_SIX = 'six';
var FINAL_SEVEN = 'seven';
var FINAL_EIGHT = 'eight';
var FINAL_NINE = 'nine';
var FINAL_TEN = 'ten';
var FINAL_JACK = 'jack';
var FINAL_QUEEN = 'queen';
var FINAL_KING = 'king';

exports.backHTML = function() {
	var html = '<div class="card">';
	html += '<div class="card-back">';
	html += '<img src="img/back.png">';
	html += '</div>';
	html += '</div>';

	return html;
}

exports.frontHTML = function(rank, suit) {
	var html = '';

	html += '<div class="card">';
	html += '<div class="card-' + rank + ' ' + suit + '">';
	html += '<div class="corner top">';
	html += '<span class="number">' + RANKS[rank] + '</span>';
	html += '<span>' + SUITS[suit] + '</span>';
	html += '</div>';

	if (rank == FINAL_ACE) {
		html += '<span class="suit middle_center">' + SUITS[suit] + '</span>';
	} else if ((rank == FINAL_TWO) || (rank == FINAL_THREE)) {
		html += '<span class="suit top_center">' + SUITS[suit] + '</span>';

		if (rank == FINAL_THREE) {
			html += '<span class="suit middle_center">' + SUITS[suit] + '</span>';
		}

		html += '<span class="suit bottom_center">' + SUITS[suit] + '</span>';
	} else if ((rank == FINAL_FOUR) || (rank == FINAL_FIVE) || (rank == FINAL_SIX) || (rank == FINAL_SEVEN) || (rank == FINAL_EIGHT)  || (rank == FINAL_NINE) || (rank == FINAL_TEN)) {
		html += '<span class="suit top_left">' + SUITS[suit] + '</span>';
		html += '<span class="suit top_right">' + SUITS[suit] + '</span>';

		if (rank == FINAL_FIVE) {
			html += '<span class="suit middle_center">' + SUITS[suit] + '</span>';
		} else if ((rank == FINAL_SIX) || (rank == FINAL_SEVEN) || (rank == FINAL_EIGHT)) {
			html += '<span class="suit middle_left">' + SUITS[suit] + '</span>';

			if ((rank == FINAL_SEVEN) || (rank == FINAL_EIGHT)) {
				html += '<span class="suit middle_top">' + SUITS[suit] + '</span>';

				if (rank == FINAL_EIGHT) {
					html += '<span class="suit middle_bottom">' + SUITS[suit] + '</span>';
				}
			}

			html += '<span class="suit middle_right">' + SUITS[suit] + '</span>';
		} else if ((rank == FINAL_NINE) || (rank == FINAL_TEN)) {
			html += '<span class="suit middle_top_left">' + SUITS[suit] + '</span>';
			html += '<span class="suit middle_top_right">' + SUITS[suit] + '</span>';

			if (rank == FINAL_NINE) {
				html += '<span class="suit middle_bottom">' + SUITS[suit] + '</span>';
			}

			else if (rank == FINAL_TEN) {
				html += '<span class="suit middle_top_center">' + SUITS[suit] + '</span>';
				html += '<span class="suit middle_bottom_center">' + SUITS[suit] + '</span>';
			}

			html += '<span class="suit middle_bottom_left">' + SUITS[suit] + '</span>';
			html += '<span class="suit middle_bottom_right">' + SUITS[suit] + '</span>';
		}

		html += '<span class="suit bottom_left">' + SUITS[suit] + '</span>';
		html += '<span class="suit bottom_right">' + SUITS[suit] + '</span>';
	} else if (rank == FINAL_JACK || rank == FINAL_QUEEN || rank == FINAL_KING) {
		html += getFaceCard(rank, suit);
	}

	html += '<div class="corner bottom">';
	html += '<span class="number">' + RANKS[rank] + '</span>';
	html += '<span>' + SUITS[suit] + '</span>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

	return html;
}

function getFaceCard(face, suit) {
	var html = '';
	html += '<span class="face middle_center">';
	html += '<img src="img/face-' + face + '-' + suit + '.png">';			
	html += '</span>';

	return html;
}

exports.createCard = function(rank, suit) {
	var html = '';

	// if(rank === '') {
		
	// } else {
		html += '<div class="card-' + rank + ' ' + suit + ' front">';
		html += '<div class="corner top">';
		html += '<span class="number">' + RANKS[rank] + '</span>';
		html += '<span>' + SUITS[suit] + '</span>';
		html += '</div>';

		if (rank == 'ace') {
			html += '<span class="suit middle_center">' + SUITS[suit] + '</span>';
		} else if ((rank == 'two') || (rank == 'three')) {
			html += '<span class="suit top_center">' + SUITS[suit] + '</span>';

			if (rank == 'three') {
				html += '<span class="suit middle_center">' + SUITS[suit] + '</span>';
			}

			html += '<span class="suit bottom_center">' + SUITS[suit] + '</span>';
		}

		else if ((rank == 'four') || (rank == 'five') || (rank == 'six') || (rank == 'seven') || (rank == 'eight')  || (rank == 'nine') || (rank == 'ten')) {
			html += '<span class="suit top_left">' + SUITS[suit] + '</span>';
			html += '<span class="suit top_right">' + SUITS[suit] + '</span>';

			if (rank == 'five') {
				html += '<span class="suit middle_center">' + SUITS[suit] + '</span>';
			}

			else if ((rank == 'six') || (rank == 'seven') || (rank == 'eight')) {
				html += '<span class="suit middle_left">' + SUITS[suit] + '</span>';

				if ((rank == 'seven') || (rank == 'eight')) {
					html += '<span class="suit middle_top">' + SUITS[suit] + '</span>';

					if (rank == 'eight') {
						html += '<span class="suit middle_bottom">' + SUITS[suit] + '</span>';
					}
				}

				html += '<span class="suit middle_right">' + SUITS[suit] + '</span>';
			}

			else if ((rank == 'nine') || (rank == 'ten')) {
				html += '<span class="suit middle_top_left">' + SUITS[suit] + '</span>';
				html += '<span class="suit middle_top_right">' + SUITS[suit] + '</span>';

				if (rank == 'nine') {
					html += '<span class="suit middle_bottom">' + SUITS[suit] + '</span>';
				}

				else if (rank == 'ten') {
					html += '<span class="suit middle_top_center">' + SUITS[suit] + '</span>';
					html += '<span class="suit middle_bottom_center">' + SUITS[suit] + '</span>';
				}

				html += '<span class="suit middle_bottom_left">' + SUITS[suit] + '</span>';
				html += '<span class="suit middle_bottom_right">' + SUITS[suit] + '</span>';
			}

			html += '<span class="suit bottom_left">' + SUITS[suit] + '</span>';
			html += '<span class="suit bottom_right">' + SUITS[suit] + '</span>';
		}

		else if (rank == 'jack') {
			html += '<span class="face middle_center">';
			html += '<img src="img/face-jack-' + suit + '.png">';
			html += '</span>';
		}

		else if (rank == 'queen') {
			html += '<span class="face middle_center">';
			html += '<img src="img/face-queen-' + suit + '.png">';
			html += '</span>';
		}

		else if (rank == 'king') {
			html += '<span class="face middle_center">';
			html += '<img src="img/face-king-' + suit + '.png">';			
			html += '</span>';
		}

		html += '<div class="corner bottom">';
		html += '<span class="number">' + RANKS[rank] + '</span>';
		html += '<span>' + SUITS[suit] + '</span>';
		html += '</div>';
		html += '</div>';
	// }

	html += '<div class="card-back back">';
		html += '<img src="img/back.png">';
		html += '</div>';

	return html;
}