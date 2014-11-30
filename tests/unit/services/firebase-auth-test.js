import {
  moduleFor,
  test
} from 'ember-qunit';

function mockAuthData(provider){
	var providers = {
		google: {
		  "uid": "google:000000000000000000000",
		  "provider": "google",
		  "google": {
		    "id": "000000000000000000000",
		    "accessToken": "testaccesstoken",
		    "displayName": "David Choi",
		    "cachedUserProfile": {
		      "id": "000000000000000000000",
		      "name": "David Choi",
		      "given_name": "David",
		      "family_name": "Choi",
		      "link": "https://plus.google.com/000000000000000000000",
		      "picture": "",
		      "gender": "male",
		      "locale": "en"
		    }
		  },
		  "token": "testtoken",
		  "auth": {
		    "uid": "google:000000000000000000000",
		    "provider": "google"
		  },
		  "expires": 9999999999
		}
	};

	return providers[provider] || {
		uid: provider + ":testid",
		provider: provider,
		auth: "testtoken"
	};
}

var FirebaseServiceMock = {
	instance: {
		authChanged: function(){},

		onAuth: function(callback){
			this.authChanged = callback;
		},

		authWithOAuthPopup: function(provider, callback, options){
			if(options.shouldAuth){
				var authData = mockAuthData(provider);
				this.authChanged(authData);
				callback(null, authData);
			}
			else{
				this.authChanged({});
				callback("Error", {});
			}
		},

		unauth: function(){
			this.authChanged({});
		}
	}
};


moduleFor('service:firebase-auth', 'FirebaseAuthService', {
	// Specify the other units that are required for this test.
	// needs: ['service:firebase']
});

test('it exists', function() {
	var service = this.subject({
		firebase: FirebaseServiceMock
	});
	ok(service);
});


moduleFor('service:firebase-auth', 'FirebaseAuthService#login', {
	// Specify the other units that are required for this test.
	// needs: ['service:firebase']
});

test('authData is updated after a successful login', function() {
	expect(1);

	var service = this.subject({
		firebase: FirebaseServiceMock
	});

	var provider = "google";

	return service.login("google", { shouldAuth: true }).then(function(authData){
		deepEqual(
			authData, 
			mockAuthData(provider),
			"On auth success, auth data is populated with uid, auth token, and provider."
		);
	});
});

test("authData is empty after a login failure", function(){
	expect(2);
	var service =  this.subject({
		firebase: FirebaseServiceMock
	});

	service.set("authData", { uid: "dummyUID" });

	return service.login("google", { shouldAuth: false }).catch(function(reason){
		deepEqual(service.get("authData"), {}, "authData is emptied.");
		ok(reason.message.match("There was an authentication error"), "An error is thrown.");
	});
});

test("login fails if attempting to use an invalid provider", function(){
	expect(2);
	var service =  this.subject({
		firebase: FirebaseServiceMock,
		providers: ["aValidProvider"]
	});

	service.set("authData", { uid: "dummyUID" });

	return service.login("invalidProvider", { shouldAuth: true }).catch(function(reason){
		deepEqual(service.get("authData"), {}, "authData is emptied.");
		ok(reason.message.match("Attempted to login with an invalid provider."), "An error is thrown.");
	});
});


moduleFor('service:firebase-auth', 'FirebaseAuthService#logout', {
	// Specify the other units that are required for this test.
	// needs: ['service:firebase']
});

test('authData is emptied after logout', function() {
	expect(1);

	var service = this.subject({
		firebase: FirebaseServiceMock
	});

	service.logout();
	var authData = service.get("authData");

	deepEqual(
		authData,
		{},
		"authData is emptied."
	);
});

moduleFor('service:firebase-auth', 'FirebaseAuthService#displayName', {
	// Specify the other units that are required for this test.
	// needs: ['service:firebase']
});

test('displayName is correctly extracted from authData.', function() {
	expect(1);

	var service = this.subject({
		firebase: FirebaseServiceMock
	});

	service.set("authData", mockAuthData("google"));
	var displayName = service.get("displayName");

	deepEqual(
		displayName,
		"David Choi",
		"displayName is correct for google provided data."
	);
});
