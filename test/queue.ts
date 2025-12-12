import { Queue } from '../src/queue';
import assert from 'node:assert';

function shouldHaveEmptyState() {
    const q = new Queue<string>();
    assert(q.len() === 0, 'New queue should be empty');
    assert(q.pop() === undefined, 'Pop on empty queue should return undefined');
    assert(q.peek() === undefined, 'Peek on empty queue should return undefined');
}

function shouldPushItems() {
    const q = new Queue<string>();
    q.push('a');
    q.push('b');
    q.push('c');
    assert(q.len() === 3, 'Length should be 3 after pushes');
}

function shouldPopItems() {
    const q = new Queue<string>();
    q.push('a');
    q.push('b');
    q.push('c');
    assert(q.len() === 3, 'Length should be 3 after pushes');
    assert(q.pop() === 'a', '1st pop should return a');
    assert(q.pop() === 'b', '2nd pop should return b');
    assert(q.len() === 1, 'Length should be 1 after two pops');
}

function shouldPeekItems() {
    const q = new Queue<string>();
    q.push('a');
    q.push('b');
    q.push('c');
    assert(q.len() === 3, 'Length should be 3 after pushes');
    assert(q.peek() === 'a', '1st peek should return a');
    assert(q.peek() === 'a', '1st peek should still return a');
    assert(q.len() === 3, 'Length should still be 3 after two peeks');
}

function shouldClearItems() {
    const q = new Queue<string>();
    q.push('a');
    q.push('b');
    q.push('c');
    assert(q.len() === 3, 'Length should be 3 after pushes');
    q.clear();
    assert(q.len() === 0, 'Length should still be 0 after clear');
    assert(q.peek() === undefined, 'Peek should return undefined after clear');
}

function shouldRemoveItem() {
    const q = new Queue<string>();
    q.push('a');
    q.push('b');
    q.push('c');
    q.push('d');
    q.remove('c');
    assert(q.len() === 3, 'Length should be 3 after removing one item');
    assert(q.peek() === 'a', 'Peek should still return first item');
    assert(q.pop() === 'a', 'Pop should return a');
    assert(q.pop() === 'b', 'Pop should return b');
    assert(q.pop() === 'd', 'Pop should return d');
    assert(q.pop() === undefined, 'Queue should now be empty');
}

function shouldReturnArrayOfItems() {
    const q = new Queue<number>();
    q.push(1);
    q.push(2);
    q.push(3);
    const arr = q.toArray();
    assert(Array.isArray(arr), 'toArray() should return an array');
    assert(arr.length === 3, 'Array length should be 3');
    assert(arr[0] === 1 && arr[1] === 2 && arr[2] === 3, 'Array should contain items in correct order');
    assert(q.len() === 3, 'Queue length should remain 3 after toArray()');
    assert(q.peek() === 1, 'Peek should still return first item');
}

(function main() {
    shouldHaveEmptyState();
    shouldPushItems();
    shouldPopItems();
    shouldPeekItems();
    shouldClearItems();
    shouldRemoveItem();
    shouldReturnArrayOfItems();
    console.log('✅ All Queue tests passed!');
})();
