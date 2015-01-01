import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr("string"),
	createdAt: DS.attr("timestamp"),
	seats: DS.hasMany("seat", { async: true })
});
