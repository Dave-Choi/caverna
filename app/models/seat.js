import DS from 'ember-data';

export default DS.Model.extend({
	color: DS.attr("string"),
	player: DS.belongsTo("player"),
	game: DS.belongsTo("game")
});
