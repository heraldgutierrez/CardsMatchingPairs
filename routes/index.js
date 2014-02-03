var Deck = require('../model/deck');
var DECKS = new Array();
var ID = 0;

module.exports = function(io) {
	var routes = {};
	routes.index = function(req, res){
		// if no ID given, redirect with a new ID
		if(typeof req.params.id == 'undefined') {			
			res.redirect('/' + ID);
			ID++;
		} else {
			console.log('Starting Match Pair: Game ' +  req.params.id);
			res.render('index');
		}
	};

	io.sockets.on('connection', function (socket) {
		// create a new deck for the ID
		socket.on('createNewDeck', function(data) { DECKS[data.id] = new Deck(data.numberDecks); });
	    
		// return a new deck to client ID
	    socket.on('getNewDeck', function(data) { io.sockets.emit('getDeck', DECKS[data.id], data.id); });

	    // shuffle the clients deck
	    socket.on('shuffleDeck', function(data) {
	    	console.log('Shuffling Deck for client ' + data.id + '...');
	    	DECKS[data.id].shuffle();
	    });
	});

	return routes;
};