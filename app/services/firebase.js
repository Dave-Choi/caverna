/* global Firebase */
import ENV from "caverna/config/environment";
import Ember from 'ember';

var firebaseURI = ENV.APP.firebaseURI;
var instance = new Firebase(firebaseURI);

export default Ember.Object.extend({
	instance: instance,
	serverTime: Firebase.ServerValue.TIMESTAMP
});
