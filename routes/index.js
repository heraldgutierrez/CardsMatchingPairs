var Deck = require('../model/deck');
var DECK;
var ID = 0;
var CLIENTS = {};
/*
 * GET home page.
 */

module.exports = function(io) {
	var routes = {};
	routes.index = function(req, res){
		if(typeof req.params.id == 'undefined') {			
			res.redirect('/' + ID);
			ID++;
		} else {
			// console.log('ID = ' + req.params.id);
			console.log('Starting Match Pair: Game ' +  req.params.id);
			res.render('index');
		}
	};

	routes.test = function(req, res){
		// res.render('test');
		DECK = new Deck(1);
		res.render('test', {
			test : DECK.cards
		});
	};

	routes.test2 = function(req, res){
		// res.render('test');

		// console.log('ID = ' + req.params.id);
		res.render('test-two');
	};

	routes.flipOne = function(req, res) {
		res.render('card-flip-one');
	};

	io.sockets.on('connection', function (socket) {
		// console.log(socket.id);
		// CLIENTS[ID] = socket.id;
		socket.on('createNewDeck', function(numDeck, id) {
			// CLIENTS[id] = socket.id;
			// console.log('Socket ID = ' + CLIENTS[id]);
			// socket.room = id;
	    	DECK = new Deck(numDeck.numberDecks);
	    });

	    socket.on('getNewDeck', function(id) {
	    	io.sockets.emit('getDeck', DECK, id);
	    });

	    socket.on('shuffleDeck', function() {
	    	console.log('Shuffling Deck...');
	    	DECK.shuffle();
	    });
	});

	return routes;
};