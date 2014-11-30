import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

var FirebaseAuthServiceMock = Ember.Object.extend({
	authData: null
});

var StoreMock = Ember.Object.extend({
	findOrCreate: function(type, properties){
		return new Ember.RSVP.Promise(function(resolve, reject){
			return resolve(properties);
		});
	}
});

moduleFor('controller:user', 'UserController', {
	// Specify the other units that are required for this test.
	// needs: ['service:firebase-auth']
});

// Replace this with your real tests.
test('it exists', function() {
	var controller = this.subject();
	ok(controller);
});

test("it updates its player reference in response to changes in FirebaseAuthService authData", function(){
	expect(2);

	var firebaseAuthServiceMock = FirebaseAuthServiceMock.create();
	var controller = this.subject({
		firebaseAuthService: firebaseAuthServiceMock,
		store: StoreMock.create()
	});

	var player = controller.get("player");
	Ember.run(function(){
		firebaseAuthServiceMock.set("authData", {});
	});

	strictEqual(player, null, "Player is null when not authorized.");

	var authData = {
		uid: "google:fakeid"
	};
	Ember.run(function(){
		firebaseAuthServiceMock.set("authData", authData);
	});

	stop();

	Ember.run.next(function(){
		start();
		
		player = controller.get("player");
		strictEqual(player.id, authData.uid, "The fetched player.id reflects authData.uid");
	});
});
