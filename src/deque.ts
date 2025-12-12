/** Optimized double-ended queue (Deque) using circular buffer. */
export class Deque<T = any> {
    private items: T[] = new Array(8);   // initial capacity
    private head = 0;                    // index of first element
    private tail = 0;                    // index after last element
    private count = 0;                   // number of elements

    /** Number of items in deque */
    public len() {
        return this.count;
    }

    /** Grow circular buffer */
    private grow() {
        const old = this.items;
        const cap = old.length;
        const newCap = cap << 1;
        const arr = new Array<T>(newCap);

        const head = this.head;
        const count = this.count;

        for (let i = 0; i < count; i++) {
            arr[i] = old[(head + i) % cap];
        }

        this.items = arr;
        this.head = 0;
        this.tail = count;
    }

    /** Add to back (push) */
    public pushBack(item: T) {
        if (this.count === this.items.length) {
            this.grow();
        }
        this.items[this.tail] = item;
        this.tail = (this.tail + 1) % this.items.length;
        this.count++;
    }

    /** Add to front */
    public pushFront(item: T) {
        if (this.count === this.items.length) {
            this.grow();
        }
        this.head = (this.head - 1 + this.items.length) % this.items.length;
        this.items[this.head] = item;
        this.count++;
    }

    /** Remove and return front */
    public popFront() {
        if (!this.count) {
            return undefined;
        }
        const items = this.items;
        const head = this.head;

        const item = items[head];
        this.head = (head + 1) % items.length;
        this.count--;
        return item;
    }

    /** Remove and return back */
    public popBack() {
        if (!this.count) {
            return undefined;
        }
        const items = this.items;
        this.tail = (this.tail - 1 + items.length) % items.length;
        this.count--;
        return items[this.tail];
    }

    /** Peek at front */
    public peekFront() {
        if (!this.count) return undefined;
        return this.items[this.head];
    }

    /** Peek at back */
    public peekBack() {
        if (!this.count) return undefined;
        return this.items[(this.tail - 1 + this.items.length) % this.items.length];
    }

    /** Clear deque */
    public clear() {
        this.items = new Array(8);
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }

    /** Remove a specific item (first match) */
    public remove(item: T) {
        if (!this.count) return;

        const items = this.items;
        const capacity = items.length;
        const count = this.count;
        const head = this.head;

        for (let i = 0; i < count; i++) {
            const idx = (head + i) % capacity;
            if (items[idx] === item) {
                // Shift everything after idx backward by 1 step
                for (let j = i; j < count - 1; j++) {
                    const from = (head + j + 1) % capacity;
                    const to = (head + j) % capacity;
                    items[to] = items[from];
                }
                this.tail = (this.tail - 1 + capacity) % capacity;
                this.count--;
                return;
            }
        }
    }

    /** Export items in correct order */
    public toArray(): T[] {
        const arr = new Array<T>(this.count);
        const items = this.items;
        const cap = items.length;
        const head = this.head;
        const count = this.count;

        for (let i = 0; i < count; i++) {
            arr[i] = items[(head + i) % cap];
        }
        return arr;
    }
}
