class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity; // Initial capacity
        this.loadFactor = loadFactor;    // Load factor (0.75)
        this.size = 0;                   // Number of elements
        this.map = new Array(this.capacity);
    }

    // Hash function to generate the index for a key
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash) % this.capacity;
    }

    // Resize the map when the load factor is exceeded
    _resize() {
        const oldMap = this.map;
        this.capacity *= 2; // Double the capacity
        this.size = 0;      // Reset the size
        this.map = new Array(this.capacity);

        for (let bucket of oldMap) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value); // Rehash and reinsert elements
                }
            }
        }
    }

    // Method to set a key-value pair
    set(key, value) {
        const index = this._hash(key);

        if (!this.map[index]) {
            this.map[index] = [];
        }

        for (let pair of this.map[index]) {
            if (pair[0] === key) {
                pair[1] = value; // Update value if key already exists
                return;
            }
        }

        this.map[index].push([key, value]);
        this.size++;

        // Resize if load factor is exceeded
        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    // Method to get the value for a given key
    get(key) {
        const index = this._hash(key);
        const bucket = this.map[index];

        if (bucket) {
            for (let [storedKey, storedValue] of bucket) {
                if (storedKey === key) {
                    return storedValue;
                }
            }
        }
        return undefined;
    }

    // Method to delete a key-value pair
    delete(key) {
        const index = this._hash(key);
        const bucket = this.map[index];

        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        }
        return false;
    }

    // Method to check if the key exists in the map
    has(key) {
        return this.get(key) !== undefined;
    }
}

// Example usage
const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Access some elements
console.log(test.get('apple'));      // Output: red
console.log(test.get('banana'));     // Output: yellow
console.log(test.get('lion'));       // Output: golden
console.log(test.get('ice cream'));  // Output: white

// Check for presence of keys
console.log(test.has('dog'));        // Output: true
console.log(test.has('cat'));        // Output: false

// Delete an element
test.delete('grape');
console.log(test.get('grape'));      // Output: undefined
