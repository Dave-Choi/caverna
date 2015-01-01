import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ["user"],
	playerBinding: "controllers.user.player",

	numSeats: 1,

	actions: {
		create: function(){
			var controller = this;
			var store = this.store;
			var firebase = this.firebase;
			var numSeats = this.get("numSeats");
			console.log(firebase);

			var newGame = store.createRecord("game", {
				name: "bob",
				createdAt: firebase.get("serverTime")
			});

			newGame.save().then(function(game){
				console.log("game saved", game);
				console.log(game.get("createdAt"));

				var seats = [];
				for(var i=numSeats-1; i>=0; i--){
					var seatArgs = {
						name: "asdf",
						game: game
					};
					if(i === 0){
						seatArgs.player = controller.get("player");
					}
					seats.push(store.createRecord("seat", seatArgs));
				}
				return Ember.RSVP.all(seats.invoke("save"));
			})
			.then(
				function(seats){
					console.log("creation success", seats);
				},
				function(reason) {
					console.log("creation failure", reason);
				}
			);
		}
	}
});
