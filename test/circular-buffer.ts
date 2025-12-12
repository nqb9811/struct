import { CircularBuffer } from '../src/circular-buffer';
import assert from 'node:assert';

function shouldHaveEmptyState() {
    const buf = new CircularBuffer<string>(3);
    assert(buf.isEmpty(), 'New buffer should be empty');
    assert(!buf.isFull(), 'New buffer should not be full');
    assert(buf.size() === 3, 'Buffer size should be as defined');
    assert(buf.len() === 0, 'Should have no item');
    assert(buf.pop() === undefined, 'Pop on empty buffer should return undefined');
    assert(buf.peek() === undefined, 'Peek on empty buffer should return undefined');
}

function shouldPushItems() {
    const buf = new CircularBuffer<string>(3);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(!buf.isEmpty(), 'Should not be empty after 3 pushs');
    assert(buf.isFull(), 'Should be full after 3 pushs');
    assert(buf.size() === 3, 'Size should be fixed as defined');
    assert(buf.len() === 3, 'Should have 3 items after pushes');
    try {
        buf.push('d');
        assert(false, 'Should throw when pushing into full buffer');
    } catch (error: any) {
        assert(/full/.test(error?.message), 'Should throw full buffer error');
    }
}

function shouldPopItems() {
    const buf = new CircularBuffer<string>(3);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(buf.pop() === 'a', '1st pop should return a');
    assert(buf.pop() === 'b', '2nd pop should return b');
    assert(!buf.isEmpty(), 'Should not be empty after 2 pops');
    assert(!buf.isFull(), 'Should not be full after 2 pops');
    assert(buf.size() === 3, 'Size should be fixed as defined');
    assert(buf.len() === 1, 'Should have 1 item after 2 pops');
}

function shouldPeekItems() {
    const buf = new CircularBuffer<string>(3);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(buf.peek() === 'a', '1st peek should return a');
    assert(buf.peek() === 'a', '1st peek should still return a');
    assert(buf.size() === 3, 'Size should be fixed as defined');
    assert(buf.len() === 3, 'Should still have 3 items after peeks');
}

function shouldClearItems() {
    const buf = new CircularBuffer<string>(3);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(!buf.isEmpty(), 'Should not be empty after 3 pushs');
    assert(buf.size() === 3, 'Size should be fixed as defined');
    assert(buf.len() === 3, 'Should have 3 items after pushes');
    buf.clear();
    assert(buf.isEmpty(), 'Should be empty after clear');
    assert(buf.size() === 3, 'Size should be fixed as defined');
    assert(buf.peek() === undefined, 'Peek should return undefined after clear');
    assert(buf.len() === 0, 'Should have no item after clear');
}

function shouldResize() {
    const buf = new CircularBuffer<string>(3);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(buf.isFull(), 'Should be full after 3 pushs');
    assert(buf.len() === 3, 'Should have 3 items after pushes');
    buf.resize(5);
    assert(!buf.isFull(), 'Should not be full after resize');
    assert(buf.len() === 3, 'Should still have 3 items after resize');
    buf.push('d');
    buf.push('e');
    assert(buf.isFull(), 'Should be full after 2 other pushs');
    assert(buf.len() === 5, 'Should have 5 items after 2 other pushes');
}

function shouldRemoveItem() {
    const buf = new CircularBuffer<string>(5);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(buf.toArray().join(',') === 'a,b,c', 'Initial array should be correct');
    assert(buf.len() === 3, 'Initial length should be 3');
    buf.remove('b');
    assert(buf.len() === 2, 'Length should decrease after removal');
    assert(buf.toArray().join(',') === 'a,c', 'Should remove the matching item');
    buf.remove('x');
    assert(buf.toArray().join(',') === 'a,c', 'Removing non-existing item should change nothing');
    assert(buf.len() === 2, 'Length unchanged when removing non-existing item');
    buf.remove('a');
    assert(buf.toArray().join(',') === 'c', 'Should remove head item correctly');
    buf.remove('c');
    assert(buf.isEmpty(), 'Buffer should be empty after removing all items');
}

function shouldReturnArrayOfItems() {
    const buf = new CircularBuffer<string>(4);
    buf.push('a');
    buf.push('b');
    buf.push('c');
    assert(buf.toArray().join(',') === 'a,b,c', 'toArray should return items in order');
    buf.pop();
    buf.push('d');
    buf.push('e');
    assert(buf.toArray().join(',') === 'b,c,d,e', 'toArray should handle wrap-around properly');
}

(function main() {
    shouldHaveEmptyState();
    shouldPushItems();
    shouldPopItems();
    shouldPeekItems();
    shouldClearItems();
    shouldResize();
    shouldRemoveItem();
    shouldReturnArrayOfItems();
    console.log('✅ All CircularBuffer tests passed!');
})();
