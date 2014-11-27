import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
	firebase: function(){
		return this.firebaseService.instance;
	}.property()
});
