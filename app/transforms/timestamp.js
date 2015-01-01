import DS from 'ember-data';

export default DS.DateTransform.extend({
  serialize: function(date) {
    if(date === this.firebase.get("serverTime")){
    	return date;
    }
    return this._super(date);
  }
});
