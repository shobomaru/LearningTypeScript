// Test code (Mocha)

import * as assert from 'assert';
import { Message } from './message';

// TDD
suite('mocha test', function() {
	test('message set/get', function() {
		var msg = new Message('Hello, world!');
		assert.equal(msg.getMessage(), 'Hello, world!');
	});
});
