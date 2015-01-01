import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('seat', 'Seat', {
  // Specify the other units that are required for this test.
  needs: ["model:player", "model:game"]
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
