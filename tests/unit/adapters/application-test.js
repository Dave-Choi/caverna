import {
  moduleFor,
  test
} from 'ember-qunit';

var FirebaseMock = {
	ref: function(){}
};

moduleFor('adapter:application', 'ApplicationAdapter', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(){
	// debugger;
  var adapter = this.subject({
    firebase: FirebaseMock
  });
  ok(adapter);
});
