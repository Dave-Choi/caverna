import FirebaseService from "../services/firebase";

export function initialize(container, application) {
	application.register("service:firebase", FirebaseService);
	application.inject('route', 'firebase', 'service:firebase');
	application.inject('adapter', 'firebaseService', 'service:firebase');
	application.inject('controller', 'firebase', 'service:firebase');
	application.inject('transform', 'firebase', 'service:firebase');
}

export default {
	name: 'firebase-service',
	initialize: initialize
};
