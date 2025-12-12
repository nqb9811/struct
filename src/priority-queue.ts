/** Priority queue data structure based on binary min heap (lower value means higher priority). */
export class PriorityQueue<T = any> {
    private items: T[] = [];

    constructor(private compare: (a: T, b: T) => number) { }

    /** Get number of items in queue. */
    public len() {
        return this.items.length;
    }

    /** Add new item to queue. */
    public push(item: T) {
        this.items.push(item);
        this.siftUp(this.items.length - 1);
    }

    /** Get the most prioritized item and remove it from queue. */
    public pop() {
        const items = this.items;
        if (!items.length) {
            return undefined;
        }
        const top = items[0];
        const last = items.pop()!;
        if (items.length) {
            this.siftDown(0, last);
        }
        return top;
    }

    /** Get the most prioritized item but do not remove it from queue. */
    public peek() {
        if (!this.items.length) {
            return undefined;
        }
        return this.items[0];
    }

    /** Clear all items in queue. */
    public clear() {
        this.items = [];
    }

    /** Remove an item if present in queue. */
    public remove(item: T) {
        const items = this.items;
        const length = items.length;
        for (let i = 0; i < length; i++) {
            const it = items[i];
            if (it === item) {
                const last = items.pop()!;
                if (it !== last) {
                    items[i] = last;
                    this.siftDown(i, last);
                    this.siftUp(i);
                }
                return;
            }
        }
    }

    /** Return all queued items in an array. */
    public toArray() {
        return this.items;
    }

    /** Maintain heap property after adding new item. */
    private siftUp(index: number) {
        const items = this.items;
        const item = items[index];
        const compare = this.compare;
        while (index > 0) {
            const parent = (index - 1) >> 1;
            if (compare(item, items[parent]) >= 0) {
                break;
            }
            items[index] = items[parent];
            index = parent;
        }
        items[index] = item;
    }

    /** Maintain heap property after removing an item. */
    private siftDown(index: number, item: T) {
        const items = this.items;
        const length = items.length;
        const compare = this.compare;
        while (true) {
            const left = (index << 1) + 1;
            const right = left + 1;
            let smallest = index;
            if (left < length && compare(items[left], item) < 0) {
                smallest = left;
                if (right < length && compare(items[right], item) < 0) {
                    smallest = right;
                }
            } else if (right < length && compare(items[right], item) < 0) {
                smallest = right;
            }
            if (smallest === index) {
                break;
            }
            items[index] = items[smallest];
            index = smallest;
        }
        items[index] = item;
    }
}
