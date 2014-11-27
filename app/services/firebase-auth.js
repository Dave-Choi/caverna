import Ember from 'ember';

export default Ember.Object.extend({
	authData: null,
	isLoggedIn: Ember.computed.notEmpty("authData"),

	// providers: ["google", "github", "facebook", "twitter"], // Firebase auth providers
	providers: ["google"], // Only google is enabled for this app, but flesh this out if extracting

	setupOnAuth: function(){
		// Updates the authData property whenever Firebase's auth status changes
		var firebase = this.firebase.instance;
		var service = this;

		firebase.onAuth(function(authData){
			service.set('authData', authData);
		});
	}.on("init"),

	login: function(provider, options){
		/*
			provider is a string argument that must be in the `providers` array
			of existing Firebase auth providers.

			Returns a promise that resolves with Firebase's authData on success
			and rejects with an error on auth failure.
		*/
		var service = this;
		var firebase = this.firebase.instance;

		return new Ember.RSVP.Promise(function(resolve, reject){
			var validProviders = service.get("providers");
			if(!validProviders.contains(provider)){
				service.set("authData", {});
				reject(new Error("Attempted to login with an invalid provider."));
				return;
			}

			firebase.authWithOAuthPopup(provider, function(error, authData){
				if(error){
					reject(new Error("There was an authentication error: " + error));
				}
				else{
					resolve(authData);
				}
			}, options);
		});
	},

	logout: function(){
		/*
			Firebase doesn't provide any useful hooks here, but authData will
			be updated to null via the onAuth callback.
		*/

		var firebase = this.firebase.instance;
		firebase.unauth();
	}
});
