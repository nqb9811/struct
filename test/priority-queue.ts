import { PriorityQueue } from '../src/priority-queue';
import assert from 'node:assert';

function shouldHaveEmptyState() {
    type Item = { priority: number; value: string; };
    const pq = new PriorityQueue<Item>((a, b) => a.priority - b.priority);
    assert(pq.len() === 0, 'New queue should be empty');
    assert(pq.pop() === undefined, 'Pop on empty queue should return undefined');
    assert(pq.peek() === undefined, 'Peek on empty queue should return undefined');
}

function shouldPushAndPopBasedOnPriority() {
    type Item = { priority: number; value: string; };
    const pq = new PriorityQueue<Item>((a, b) => a.priority - b.priority);
    pq.push({ priority: 5, value: 'a' });
    pq.push({ priority: 2, value: 'b' });
    pq.push({ priority: 8, value: 'c' });
    pq.push({ priority: 1, value: 'd' });
    let size = pq.len();
    assert(size === 4, 'Length should be 4 after pushes');
    const popped: string[] = [];
    let item: Item | undefined = undefined;
    while (item = pq.pop()) {
        popped.push(item.value);
        assert(pq.len() === size - 1, 'Length should be decreased after each pop');
        size--;
    }
    assert(popped.join(',') === 'd,b,a,c', 'Should pop in ascending priority order (1,2,5,8)');
    assert(pq.pop() === undefined, 'Pop on empty queue should return undefined');
}

function shouldPeekItems() {
    type Item = { priority: number; value: string; };
    const pq = new PriorityQueue<Item>((a, b) => a.priority - b.priority);
    pq.push({ priority: 5, value: 'a' });
    pq.push({ priority: 2, value: 'b' });
    assert(pq.len() === 2, 'Length should be 2 after pushes');
    assert(pq.peek()?.value === 'b', '1st peek should return b');
    assert(pq.peek()?.value === 'b', '1st peek should still return b');
    assert(pq.len() === 2, 'Length should not change on peeks');
}

function shouldClearItems() {
    type Item = { priority: number; value: string; };
    const pq = new PriorityQueue<Item>((a, b) => a.priority - b.priority);
    pq.push({ priority: 5, value: 'a' });
    pq.push({ priority: 2, value: 'b' });
    assert(pq.len() === 2, 'Length should be 2 after pushes');
    pq.clear();
    assert(pq.len() === 0, 'Length should be 0 after clear');
    assert(pq.peek() === undefined, 'Peek should return undefined after clear');
}

function shouldRemoveItem() {
    type Item = { priority: number; value: string; };
    const pq = new PriorityQueue<Item>((a, b) => a.priority - b.priority);
    const a = { priority: 5, value: 'a' };
    const b = { priority: 2, value: 'b' };
    const c = { priority: 8, value: 'c' };
    const d = { priority: 3, value: 'd' };
    pq.push(a);
    pq.push(b);
    pq.push(c);
    pq.push(d);
    assert(pq.len() === 4, 'Length should be 4 before removal');
    pq.remove(d);
    assert(pq.len() === 3, 'Length should be 3 after removal');
    const values: string[] = [];
    let item: Item | undefined;
    while ((item = pq.pop())) {
        values.push(item.value);
    }
    assert(
        values.join(',') === 'b,a,c',
        'Remaining items should pop in correct priority order'
    );
}

function shouldReturnArrayOfItems() {
    type Item = { priority: number; value: string; };
    const pq = new PriorityQueue<Item>((a, b) => a.priority - b.priority);
    pq.push({ priority: 10, value: 'x' });
    pq.push({ priority: 1, value: 'y' });
    pq.push({ priority: 7, value: 'z' });
    const arr = pq.toArray();
    assert(Array.isArray(arr), 'toArray() must return array');
    assert(
        arr.map(i => i.value).join(',') === 'y,x,z',
        'toArray() must return heap order, not sorted order'
    );
    assert(pq.len() === 3, 'Queue length unchanged after toArray()');
    assert(pq.peek()?.value === 'y', 'Top element must remain unchanged');
}

(function main() {
    shouldHaveEmptyState();
    shouldPushAndPopBasedOnPriority();
    shouldPeekItems();
    shouldClearItems();
    shouldRemoveItem();
    shouldReturnArrayOfItems();
    console.log('✅ All PriorityQueue tests passed!');
})();
