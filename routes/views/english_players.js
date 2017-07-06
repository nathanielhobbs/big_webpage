var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'english_players';
	locals.data = {
		players: [],
	};

	// Load the players
	view.on('init', function (next) {

		var q = keystone.list('User').model.find().sort('status')
			//.populate('author categories');

		q.exec(function (err, results) {
			locals.data.players = results;
			console.log(results)
			next(err);
		});
	});

	// Render the view
	view.render('english_players');
};
