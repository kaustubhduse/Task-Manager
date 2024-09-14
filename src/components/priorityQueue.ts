
class PriorityQueue<T> {
    private heap: { element: T; priority: number }[] = [];
  
    private swap(i: number, j: number) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    private heapifyUp(index: number) {
      let parent = Math.floor((index - 1) / 2);
      while (index > 0 && this.heap[index].priority < this.heap[parent].priority) {
        this.swap(index, parent);
        index = parent;
        parent = Math.floor((index - 1) / 2);
      }
    }
  
    private heapifyDown(index: number) {
      const length = this.heap.length;
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
  
      if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
        smallest = left;
      }
  
      if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
        smallest = right;
      }
  
      if (smallest !== index) {
        this.swap(index, smallest);
        this.heapifyDown(smallest);
      }
    }
  
    public enqueue(element: T, priority: number) {
      this.heap.push({ element, priority });
      this.heapifyUp(this.heap.length - 1);
    }
  
    public dequeue(): T | undefined {
      if (this.heap.length === 0) return undefined;
      const root = this.heap[0].element;
      const end = this.heap.pop();
      if (this.heap.length > 0 && end) {
        this.heap[0] = end;
        this.heapifyDown(0);
      }
      return root;
    }
  
    public size(): number {
      return this.heap.length;
    }
  }
  
  export default PriorityQueue;
  