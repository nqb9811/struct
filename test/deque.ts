import { Deque } from '../src/deque';
import assert from 'node:assert';

function shouldHaveEmptyState() {
    const d = new Deque<string>();
    assert(d.len() === 0, 'New deque should be empty');
    assert(d.popFront() === undefined, 'popFront on empty deque returns undefined');
    assert(d.popBack() === undefined, 'popBack on empty deque returns undefined');
    assert(d.peekFront() === undefined, 'peekFront on empty deque returns undefined');
    assert(d.peekBack() === undefined, 'peekBack on empty deque returns undefined');
}

function shouldPushBackAndPopFront() {
    const d = new Deque<string>();
    d.pushBack('a');
    d.pushBack('b');
    d.pushBack('c');

    assert(d.len() === 3, 'Length should be 3 after pushBack');
    assert(d.popFront() === 'a', 'popFront should return first item');
    assert(d.popFront() === 'b', 'popFront should return second item');
    assert(d.len() === 1, 'Length should be 1 after two pops');
}

function shouldPushFrontAndPopFront() {
    const d = new Deque<string>();
    d.pushFront('a');
    d.pushFront('b');
    d.pushFront('c');

    assert(d.len() === 3, 'Length should be 3 after pushFront');
    assert(d.popFront() === 'c', 'popFront should return newest front item');
    assert(d.popFront() === 'b', 'popFront should return next item');
    assert(d.len() === 1, 'Length should be 1 after two pops');
}

function shouldPushFrontAndPopBack() {
    const d = new Deque<string>();
    d.pushFront('a');
    d.pushFront('b');
    d.pushFront('c');

    assert(d.popBack() === 'a', 'popBack should remove last item');
    assert(d.popBack() === 'b', 'popBack should remove next');
    assert(d.popBack() === 'c', 'Final popBack');
    assert(d.len() === 0, 'Deque should be empty');
}

function shouldPushBackAndPopBack() {
    const d = new Deque<string>();
    d.pushBack('x');
    d.pushBack('y');
    d.pushBack('z');

    assert(d.popBack() === 'z', 'popBack should return last item');
    assert(d.popBack() === 'y', 'popBack should return previous item');
    assert(d.len() === 1, 'Length should be 1 after two popBack');
}

function shouldPeekCorrectly() {
    const d = new Deque<string>();
    d.pushBack('a');
    d.pushBack('b');
    d.pushBack('c');

    assert(d.peekFront() === 'a', 'peekFront should return first item');
    assert(d.peekBack() === 'c', 'peekBack should return last item');
    assert(d.len() === 3, 'Length should not change after peeks');
}

function shouldClearItems() {
    const d = new Deque<string>();
    d.pushBack('a');
    d.pushBack('b');
    d.pushBack('c');

    assert(d.len() === 3, 'Length should be 3 after pushes');
    d.clear();
    assert(d.len() === 0, 'Length should be 0 after clear');
    assert(d.peekFront() === undefined, 'peekFront after clear');
    assert(d.peekBack() === undefined, 'peekBack after clear');
}

function shouldRemoveItem() {
    const d = new Deque<string>();
    d.pushBack('a');
    d.pushBack('b');
    d.pushBack('c');
    d.pushBack('d');

    d.remove('c');

    assert.deepStrictEqual(d.toArray(), ['a', 'b', 'd'], 'remove should delete the value');
    assert(d.len() === 3, 'Length should decrement on remove');
}

function shouldReturnArrayOfItems() {
    const d = new Deque<string>();
    d.pushBack('a');
    d.pushBack('b');
    d.pushBack('c');

    const arr = d.toArray();
    assert.deepStrictEqual(arr, ['a', 'b', 'c'], 'toArray should return all items in order');
}

(function main() {
    shouldHaveEmptyState();
    shouldPushBackAndPopFront();
    shouldPushFrontAndPopFront();
    shouldPushFrontAndPopBack();
    shouldPushBackAndPopBack();
    shouldPeekCorrectly();
    shouldClearItems();
    shouldRemoveItem();
    shouldReturnArrayOfItems();
    console.log('✅ All Deque tests passed!');
})();
