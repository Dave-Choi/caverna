import Ember from 'ember';

export default Ember.Controller.extend({
	authDataBinding: "firebaseAuthService.authData",

	authDataChanged: function(){
		var authData = this.get("authData");

		if(!authData){
			this.set("player", null);
			return;
		}

		var uid = authData.uid;
		var displayName = this.firebaseAuthService.get("displayName");
		var userController = this;

		this.store.findOrCreate("player", {
			id: uid,
			uid: uid,
			name: displayName // should work with google, but should add something more robust to the firebase auth service
		}).then(
			function(newPlayer){
				userController.set("player", newPlayer);
			}, 
			function(){
				console.log("Error creating new player.");
			}
		);
	}.observes("authData").on("init"),

	actions: {
		login: function(provider){
			var authService = this.firebaseAuthService;

			authService.login(provider);
		},

		logout: function(){
			this.firebaseAuthService.logout();
		}
	}
});
