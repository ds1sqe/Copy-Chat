class __DequeNode {
  data: any;
  prev: __DequeNode | null;
  next: __DequeNode | null;
  constructor(data: any, prev: __DequeNode | null, next: __DequeNode | null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
    return this;
  }
}

class Deque {
  head: __DequeNode | null;
  tail: __DequeNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return this;
  }

  size() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }

  last() {
    return this.tail;
  }

  first() {
    return this.head;
  }

  traverse(fn: Function) {
    for (let node = this.head; node != null; node = node.next) {
      fn(node);
    }
  }
  traverseInverse(fn: Function) {
    for (let node = this.tail; node != null; node = node.prev) {
      fn(node);
    }
  }

  append(data: any) {
    const node = new __DequeNode(data, null, null);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
  }
  insert(data: any) {
    const node = new __DequeNode(data, null, null);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.tail = node;
    }
    this.length++;
  }
  shift() {
    if (this.head === null) {
      return null;
    }

    const data = this.head.data;

    this.head.prev = null;
    this.head = this.head.next;
    this.length--;

    return data;
  }
  pop() {
    if (!this.head || !this.tail) {
      return null;
    } else {
      const data = this.tail.data;
      const nextTail = this.tail?.prev;

      if (nextTail) {
        nextTail.next = null;
        this.tail = nextTail;
      }

      this.length--;

      return data;
    }
  }
}
