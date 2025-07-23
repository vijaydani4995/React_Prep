A polyfill is a way to implement functionality that may not be natively available in a particular environment (usually for older browsers) so that you can use modern features or methods in environments that don't support them.

Here are a few simple examples of polyfills for some common JavaScript functions:

1. Polyfill for Array.prototype.map
The .map() method creates a new array populated with the results of calling a provided function on every element in the array.

Here's a polyfill for Array.prototype.map:



Array.prototype.myMap = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }
    return temp;
};
const nums = [1, 2, 3, 4];
const multiplyThree = nums.myMap((num, i, arr) => {
    return num * 3;
});
console.log(multiplyThree)

2. Polyfill for Array.prototype.filter
The .filter() method creates a new array with all elements that pass the test implemented by the provided function.

Here’s a polyfill for Array.prototype.filter:


Array.prototype.myFilter = function (cb) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) temp.push(this[i]);
    }
    return temp;
};

3.Polyfill for reduce
Array.prototype.myReduce = function (cb, initialValue) {
    var accumulator = initialValue;

    for (let i = 0; i < this.length; i++) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }

    return accumulator;
};

const nums = [1, 2, 3, 4];
const sum = nums.myReduce((acc, curr, i, arr) => {
    return acc + curr;
}, 0);

console.log(sum);

3. Polyfill for Object.assign
The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.

Here’s a polyfill for Object.assign:


if (!Object.assign) {
  Object.assign = function(target, ...sources) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const to = Object(target);

    sources.forEach(source => {
      if (source != null) {
        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key];
          }
        }
      }
    });

    return to;
  };
}
4. Polyfill for String.prototype.includes
The .includes() method determines whether one string may be found within another string, returning true or false.

Here's a polyfill for String.prototype.includes:


if (!String.prototype.includes) {
  String.prototype.includes = function(search, start = 0) {
    if (typeof search !== 'string') {
      throw new TypeError('Search should be a string');
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
5. Polyfill for Number.isNaN
The Number.isNaN() method determines whether the value is NaN and its type is Number.

Here’s a polyfill for Number.isNaN:


if (!Number.isNaN) {
  Number.isNaN = function(value) {
    return value !== value; // NaN is the only value that is not equal to itself
  };
}
6. Polyfill for Object.entries
The Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs.

Here's a polyfill for Object.entries:


if (!Object.entries) {
  Object.entries = function(obj) {
    const ownProps = Object.keys(obj);
    const resArray = [];

    for (let i = 0; i < ownProps.length; i++) {
      resArray.push([ownProps[i], obj[ownProps[i]]]);
    }

    return resArray;
  };
}
Explanation of Common Concepts in Polyfills:
Checking for existence: In each polyfill, we first check if the method is already defined (e.g., if (!Array.prototype.map)). This ensures that the polyfill is only applied when the method doesn't exist.

Shims and fallbacks: Polyfills work as shims or fallbacks for functionality that isn’t natively supported, so older browsers (like Internet Explorer) can still execute modern JavaScript code without errors.

Compatibility: Polyfills help maintain compatibility with older JavaScript environments, making sure your code runs across different browsers or JavaScript engines.

These are just a few examples of common polyfills. They can be useful when you need to support older environments or when working in environments that lack certain modern JavaScript features.



function MyPromise(executor) {
    let onResolve, onReject, isFulfilled = false, isRejected = false, value;

    this.then = function (callback) {
        onResolve = callback;
        if (isFulfilled) {
            onResolve(value);
        }
        return this;
    };

    this.catch = function (callback) {
        onReject = callback;
        if (isRejected) {
            onReject(value);
        }
        return this;
    };

    function resolve(val) {
        isFulfilled = true;
        value = val;
        if (onResolve) {
            onResolve(val);
        }
    }

    function reject(val) {
        isRejected = true;
        value = val;
        if (onReject) {
            onReject(val);
        }
    }

    executor(resolve, reject);
}

const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise Resolved!");
        // reject("Promise Rejected!"); // Uncomment to test rejection
    }, 1000);
});

promise
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });



function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p) // In case it's not a real promise
        .then(result => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(err => reject(err));
    });

    if (promises.length === 0) {
      resolve([]); // Handle empty input
    }
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

promiseAll([p1, p2, p3])
  .then(results => console.log(results)) // [1, 2, 3]
  .catch(err => console.error(err));


