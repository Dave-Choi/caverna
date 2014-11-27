export function initialize(container, application) {
	application.inject('service:firebase-auth', 'firebase', 'service:firebase');
	application.inject('route', 'firebaseAuthService', 'service:firebase-auth');
	application.inject('controller', 'firebaseAuthService', 'service:firebase-auth');
}

export default {
	name: 'firebase-auth-service',
	initialize: initialize
};
