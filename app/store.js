import DS from 'ember-data';

export default DS.Store.extend({
	findOrCreate: function(type, properties){
		/*
			Returns a promise that resolves to a record with the
			requested properties.id, or a newly created record if none exists.
		*/

		var store = this;
		var id = properties.id;

		return store.find(type, properties.id)
		.catch(function(){
			var record = store.recordForId(type, id);

			record.loadedData();
			record.setProperties(properties);

			return record.save();
		});
	}
});
