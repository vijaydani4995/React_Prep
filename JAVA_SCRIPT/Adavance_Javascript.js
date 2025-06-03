1. Deep Clone an Object Without Using JSON Methods
Implement a function to deeply clone an object, ensuring it handles nested structures, arrays, and edge cases like null.

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
const clone = deepClone(obj);
console.log(clone);
2. Implement a Custom Promise.all
Create a function that mimics Promise.all, resolving an array of promises.


function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

customPromiseAll([Promise.resolve(1), Promise.resolve(2), Promise.reject('Error')])
  .then(console.log)
  .catch(console.error); // Outputs: "Error"
3. Implement a Throttling Function
Throttling ensures that a function is only called at most once in a specified time period.

function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

const throttledFn = throttle(() => console.log('Throttled!'), 1000);
throttledFn(); // Executes immediately
throttledFn(); // Ignored if called within 1 second
4. Flatten a Nested Array Without flat
Write a function to flatten a deeply nested array.

function flattenArray(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
    []
  );
}

console.log(flattenArray([1, [2, [3, [4, 5]]]])); // [1, 2, 3, 4, 5]
5. Debouncing a Function
Debouncing ensures that a function is only called after a specified delay since the last call.


function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedFn = debounce(() => console.log('Debounced!'), 1000);
debouncedFn(); // Delayed execution
debouncedFn(); // Resets the timer if called again within 1 second
6. Implement a Simple Event Emitter
Build an event emitter to handle subscriptions and event broadcasting.

javascript
Copy code
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }
}

const emitter = new EventEmitter();
const greet = (name) => console.log(`Hello, ${name}`);
emitter.on('greet', greet);
emitter.emit('greet', 'John'); // Hello, John
emitter.off('greet', greet);
emitter.emit('greet', 'John'); // No output
7. Check if Two Objects are Deeply Equal
Write a function to determine if two objects are deeply equal.

javascript
Copy code
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

console.log(deepEqual({ a: 1 }, { a: 1 })); // true
console.log(deepEqual({ a: 1 }, { a: 2 })); // false
8. Recreate the bind Method
Implement a custom version of Function.prototype.bind.

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'John' };
const boundGreet = greet.myBind(person, 'Hello');
console.log(boundGreet('!')); // Hello, John!
9. Lazy Evaluation of Function Chaining
Implement a lazy evaluation where function calls are executed only when a value method is invoked.

javascript
Copy code
class Lazy {
  constructor(value) {
    this.value = value;
    this.operations = [];
  }

  add(num) {
    this.operations.push((val) => val + num);
    return this;
  }

  multiply(num) {
    this.operations.push((val) => val * num);
    return this;
  }

  value() {
    return this.operations.reduce((acc, fn) => fn(acc), this.value);
  }
}

const result = new Lazy(2).add(3).multiply(5).value();
console.log(result); // 25



function createThrottledCounter(limitMs) { //Example for throttle
  let count = 0;
  let lastCalled = 0;

  return function throttledIncrement() {
    const now = Date.now();
    if (now - lastCalled >= limitMs) {
      lastCalled = now;
      count++;
    }
    return count;
  };
}

// Example usage:
const counter = createThrottledCounter(300);

// Simulate rapid calls:
const interval = setInterval(() => {
  console.log("Count:", counter());
}, 100); 

setTimeout(() => clearInterval(interval), 2000); // stop after 2s




function createDebouncedCounter(delay) { //Example for debounce
  let count = 0;
  let timer;

  return function debouncedIncrement() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      count++;
      console.log("Count:", count);
    }, delay);
  };
}

// Example usage:
const counter = createDebouncedCounter(300);

// Rapid calls
const interval = setInterval(() => {
  counter();
}, 100); // Calls every 100ms

setTimeout(() => clearInterval(interval), 2000); // Stops after 2s


REACT THROTTLE/DEBOUNCE COUNTER EXAMPLE

import React, { useState, useCallback } from 'react';
import { throttle, debounce } from 'lodash';

const CounterWithThrottleDebounce = () => {
  const [count, setCount] = useState(0);

  const throttledIncrement = useCallback(
    throttle(() => setCount(c => c + 1), 300),
    []
  );

  const debouncedIncrement = useCallback(
    debounce(() => setCount(c => c + 1), 300),
    []
  );

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={throttledIncrement}>Throttled +</button>
      <button onClick={debouncedIncrement}>Debounced +</button>
    </div>
  );
};

export default CounterWithThrottleDebounce;

| Method       | When it increments                            | Best Use Case                    |
| ------------ | --------------------------------------------- | -------------------------------- |
| **Throttle** | At most once per interval (e.g., every 300ms) | Scrolling, dragging, resize      |
| **Debounce** | Only after a pause of 300ms from last call    | Autocomplete, search, text input |


| Feature             | **Throttle**                                          | **Debounce**                                               |
| ------------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| **Behavior**        | Ensures a function runs **at most once** every X ms.  | Ensures a function runs **only after X ms of inactivity**. |
| **Use Case**        | Regulates frequency of events (e.g., scroll, resize). | Waits for the user to stop typing (e.g., search input).    |
| **Execution**       | Executes **immediately** and then at fixed intervals. | Executes **only once** after the last call.                |
| **Visual Metaphor** | Like a **speed limit** – allows action periodically.  | Like a **delayed bomb** – resets if you touch it again.    |


📌 Example Use Cases
Throttle:

Resize window handler

Scroll position tracking

Mouse movement for animations

Debounce:

Auto-saving form fields

Live search/autocomplete

Button clicks (to prevent double submit)

🧠 One-liner Summary
Throttle limits execution rate, while debounce delays execution until activity stops.