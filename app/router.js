import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function(){
	this.resource("games", function(){
		this.route("new");
		this.resource("game", { path: "games/:game_id" });
	});
});

export default Router;
