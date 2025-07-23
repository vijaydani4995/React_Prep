
Below are the solutions to the array and data structure-based coding questions in JavaScript:

1. Reverse an Array

function reverseArray(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}

// Example:
console.log(reverseArray([1, 2, 3, 4])); // [4, 3, 2, 1]
2. Find the Maximum Product of Two Elements

function maxProduct(arr) {
  let max1 = Math.max(...arr);
  arr.splice(arr.indexOf(max1), 1); 
  let max2 = Math.max(...arr);
  return max1 * max2;
}

// Example:
console.log(maxProduct([1, 10, 2, 6, 5])); // 60
3. Remove Duplicates from an Array

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Example:
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
4. Find Intersection of Two Arrays

function arrayIntersection(arr1, arr2){
  return arr1.filter(value => arr2.includes(value));
}

console.log(arrayIntersection([1, 2, 2, 3], [2, 2, 3, 4])); // [2, 2, 3]
5. Find the Union of Two Arrays

function arrayUnion(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

// Example:
console.log(arrayUnion([1, 2, 3], [2, 3, 4])); // [1, 2, 3, 4]
6. Find the First Non-Repeating Element

function firstNonRepeating(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
      return arr[i];
    }
  }
  return null;
}


console.log(firstNonRepeating([2, 3, 4, 2, 3, 5])); // 4
7. Move Zeros to the End

function moveZerosToEnd(arr) {
  let nonZeros = arr.filter(num => num !== 0);
  let zeros = arr.filter(num => num === 0);
  return [...nonZeros, ...zeros];
}

// Example:
console.log(moveZerosToEnd([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
8. Rotate an Array

function rotateArray(arr, k) {
  k = k % arr.length;
  return arr.slice(-k).concat(arr.slice(0, -k));
}

// Example:
console.log(rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]
9. Find the Pair with Given Sum
js
Copy code
function findPairWithSum(arr, target) {
  let seen = new Set();
  for (let num of arr) {
    let complement = target - num;
    if (seen.has(complement)) {
      return [complement, num];
    }
    seen.add(num);
  }
  return null;
}

// Example:
console.log(findPairWithSum([2, 7, 11, 15], 9)); // [2, 7]
10. Merge Two Sorted Arrays

function mergeSortedArrays(arr1, arr2) {
  let merged = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  return merged.concat(arr1.slice(i)).concat(arr2.slice(j));
}

// Example:
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
11. Find the Largest Element in an Array

function findLargest(arr) {
  return Math.max(...arr);
}

// Example:
console.log(findLargest([10, 20, 30, 40])); // 40
12. Flatten a Nested Array

function flattenArray(arr) {
  let flatArr = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flatArr = flatArr.concat(flattenArray(item))
    } else {
      flatArr.push(item);
    }
  })
  return flatArr;
}
// Example:
console.log(flattenArray([1, [2, [3, 4], 5], [6, 7], 8])); // [1, 2, 3, 4, 5, 6, 7, 8]
13. Find the Maximum Sum of a Subarray (Kadane's Algorithm)

function maxSubArraySum(arr) {
  let maxSum = arr[0];
  let currentSum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currentSum = Math.max(arr[i], currentSum + arr[i])
    maxSum = Math.max(maxSum, currentSum)
  }
  return maxSum;
}

// Example:
console.log(maxSubArraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
14. Count Occurrences of Elements in an Array

function countOccurrences(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
}

// Example:
console.log(countOccurrences([1, 2, 2, 3, 3, 3, 4])); // {1: 1, 2: 2, 3: 3, 4: 1}
15. Check if an Array is a Subarray of Another

function isSubarray(arr1, arr2) {
  return arr1.join().includes(arr2.join());
}

// Example:
console.log(isSubarray([1, 2, 3, 4], [2, 3])); // true
16. Find Missing Number in an Array

function findMissingNumber(arr, n) {
  let totalSum = (n * (n + 1)) / 2;
  let arrSum = arr.reduce((sum, num) => sum + num, 0);
  return totalSum - arrSum;
}

// Example:
console.log(findMissingNumber([1, 2, 4, 5], 5)); // 3
17. Find Longest Consecutive Sequence in an Array

function longestConsecutive(arr) {
  let set = new Set(arr);
  let maxLength = 0;

  for (let num of arr) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (set.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }
      maxLength = Math.max(maxLength, currentStreak);
    }
  }
  return maxLength;
}

// Example:
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
18. Merge Overlapping Intervals

function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  
  let result = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    let lastInterval = result[result.length - 1];
    let currentInterval = intervals[i];
    
    if (lastInterval[1] >= currentInterval[0]) {
      lastInterval[1] = Math.max(lastInterval[1], currentInterval[1]);
    } else {
      result.push(currentInterval);
    }
  }
  return result;
}

// Example:
console.log(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]])); // [[1, 6], [8, 10], [15, 18]]
19. Find the Most Frequent Element in an Array

function mostFrequentElement(arr) {
  let map = new Map();
  let maxFreq = 0;
  let maxElement = null

  for (let num of arr) {
    let freq = map.get(num) || 0;
    map.set(num, freq + 1);

    if (map.get(num) > maxFreq) {
      maxFreq = map.get(num);
      maxElement = num;
    }
  }
  return maxElement;
}

// Example:
console.log(mostFrequentElement([1, 3, 3, 3, 2, 2])); // 3

20. Check if Two Arrays are Equal

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

// Example:
console.log(arraysEqual([1, 2, 3], [1, 2, 3])); // true


21. Find Longest Palindromic Subsequence in an Array

function longestPalindromicSubsequence(arr) {
  let longest = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j <= arr.length; j++) {
      let subArray = arr.slice(i, j);
      if (subArray.join('') === subArray.reverse().join('') && subArray.length > longest.length) {
        longest = subArray;
      }
    }
  }
  return longest;
}

// Example:
console.log(longestPalindromicSubsequence([1, 2, 3, 2, 1])); // [1, 2, 3, 2, 1]
22. Find Kth Largest Element in an Array
js
Copy code
function findKthLargest(arr, k) {
  arr.sort((a, b) => b - a);
  return arr[k - 1];
}

// Example:
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5

23.FindPair with target sum,and Display there indices:
function findPairSum(arr, target) {
  let valueMap = new Map(); // Store the element and its index
  
  for (let i = 0; i < arr.length; i++) {
    let ele = arr[i];
    let compliment = target - ele;
    
    if (valueMap.has(compliment)) {
      return [valueMap.get(compliment), i]; // Return the indices
    }
    
    valueMap.set(ele, i); // Store the element and its index
  }
  
  return null;
}

console.log(findPairSum([2, 5, 7, 9, 10], 7)); // Output: [0, 1]


24. Majority Element 

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than n / 2 times. You may assume that the majority element always
 exists in the array.
 
 
 function majorityElement(nums){
    nums.sort()
    let result = nums[Math.floor(nums.length/2)]
    return result;
    
};

console.log(majorityElement([3,2,3]) // 3
Input: nums = [2,2,1,1,1,2,2]
Output: 2


function isPrime(num){
  if(num <= 1) return false;
  for(let i = 2; i <= Math.sqrt(num); i++){
    if(num % i === 0) return false;
  }
  return true;
}
console.log(isPrime(8))


function findMissingNumber(arr, n) {
    const expectedSum = (n * (n + 1)) / 2
    const actualSum = arr.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}
console.log(findMissingNumber([1, 2, 4, 5, 6], 6)); // Output: 3

function secondLargest(arr) {
  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] !== largest) {
      secondLargest = arr[i];
    }
  }
  return secondLargest;
}
console.log(secondLargest([2, 5, 1, 9, 6, 5])); // Output: 6



function Removeduplicate(arr){
  arr.sort((a,b) => a - b)
  for(let i = 0; i < arr.length ; i++){
    if(arr[i] === arr[i+1]){
      arr.splice(i+1,1)
      i--;
    }
  }
  return arr;
}

console.log(Removeduplicate([2,2,1,1,4,5,4,5,4]))



function SortArray(arr){
    for(let i =0; i < arr.length - 1;i++){
        for(let j = 0; j < arr.length - i - 1;j++){
            if(arr[j] > arr[j+1]){
                temp = arr[j]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr;
}
console.log(SortArray([3,2,5,6,1,9,4]))


function selfProduct(nums){
    let res = []
    let start = 1
    for(let i =0; i < nums.length; i++){
        res.push(start)
        start = start * nums[i]
    }
    let start2 = 1
    for(let i = nums.length - 1; i >= 0; i--){
        res[i] = start2 * res[i]
        start2 = start2 * nums[i]
    }
    return res;
}
console.log(product([1,2,3,4]))

function firstNonRepeatingChar(str) {
    let charCount = {};
    for (let char of str) charCount[char] = (charCount[char] || 0) + 1;
    for (let char of str) if (charCount[char] === 1) return char;
    return null;
}

console.log(firstNonRepeatingChar("aabbccde")); // "d"

function permutations(str) {
    if (str.length <= 1) return [str];
    let result = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let remainingPerms = permutations(str.slice(0, i) + str.slice(i + 1));
        for (let perm of remainingPerms) result.push(char + perm);
    }
    return result;
}
console.log(permutations("abcd"));


function longestCommonPrefix(strs) {
    if (!strs.length) return "";
    let prefix = strs[0];
    for (let str of strs) {
        while (!str.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
    }
    return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"])) // "fl"


function longestUniqueSubstring(str) {
    let set = new Set(), max = 0, left = 0;
    for (let right = 0; right < str.length; right++) {
        while (set.has(str[right])) set.delete(str[left++]);
        set.add(str[right]);
        max = Math.max(max, right - left + 1);
    }
    return max;
}

console.log(longestUniqueSubstring("abcabcbb")); // 3



function compressString(str) {
    let result = "", count = 1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) count++;
        else {
            result += str[i] + count;
            count = 1;
        }
    }
    return result;
}

console.log(compressString("aaabbc")); // "a3b2c1"


function mostFrequentChar(str) {
    // Create an empty object to store character counts
    let charCount = {};

    // Count how many times each character appears
    for (let char of str) {
        if (charCount[char]) {
            charCount[char]++;
        } else {
            charCount[char] = 1;
        }
    }

    // Variables to track the most frequent character and its count
    let mostFrequent = '';
    let maxCount = 0;

    // Loop through the object to find the character with the highest count
    for (let char in charCount) {
        if (charCount[char] > maxCount) {
            mostFrequent = char;
            maxCount = charCount[char];
        }
    }

    // Return the most frequent character
    return mostFrequent;
}

console.log(mostFrequentChar("apple")); // Output: 'p'



function findPairs(arr, target) {
    let pairs = [], set = new Set();
    for (let num of arr) {
        let complement = target - num;
        if (set.has(complement)) pairs.push([complement, num]);
        set.add(num);
    }
    return pairs;
}

console.log(findPairs([1, 2, 3, 4, 5, 6], 7)); // [[3,4],[2,5],[1,6]]

let arr = [
    { name: "vijay", age: 23 },
    { name: "Ajya", age: 24 },
    { name: "vijay", age: 23 }
];

const uniqueMap = new Map()

arr.forEach(obj => {
    const key = `${obj.name}-${obj.age}`;
    if (!uniqueMap.has(key)) {
        uniqueMap.set(key, obj);
    }
});

const uniqueArray = Array.from(uniqueMap.values());
console.log(uniqueArray);


let arr = [
    { name: "vijay", age: 23 },
    { name: "Ajya", age: 24 },
    { name: "vijay", age: 23 }
];

const countMap = new Map();

arr.forEach(obj => {
    const key = `${obj.name}-${obj.age}`;
    if (!countMap.has(key)) {
        countMap.set(key, { count: 1, obj });
    } else {
        countMap.get(key).count++;
    }
});

const duplicates = [];

countMap.forEach(({ count, obj }) => {
    if (count > 1) {
        duplicates.push(obj);
    }
});

console.log(duplicates);







const arr = [
    {group : "ClassA", div :"HR"},
    {group : "ClassB" ,div :"CS"},
    {group : "ClassC ",div :"HR"},
    {group : "ClassD" ,div :"CS"}
]

const grouped = arr.reduce((acc,cur) => {
    if(!acc[cur.div]){
        acc[cur.div] = []
    }
    acc[cur.div].push(cur)
    return acc
},{})
console.log(grouped)



const input = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  },
  f: 4
};

function FlattenObject(obj, parentKey = "",result = {}){
    
    for(let key in obj){
        const fullKey = parentKey ? `${parentKey}.${key}` : key
        if(typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null){
            FlattenObject(obj[key],fullKey,result)
        }else{
            result[fullKey] = obj[key]
        }
    }
    return result
    
}
console.log(FlattenObject(input))


Identify the duplicaticate elements and unique elements in array


let arr = [1, 2, 3, 2, 4, 1, 5];

const countMap = new Map();
const duplicates = [];
const uniques = [];

// Count frequency
arr.forEach(num => {
    countMap.set(num, (countMap.get(num) || 0) + 1);
});

// Separate duplicates and uniques
arr.forEach(num => {
    if (countMap.get(num) > 1) {
        if (!duplicates.includes(num)) {
            duplicates.push(num);
        }
    } else {
        uniques.push(num);
    }
});

console.log("Original array with only unique values:", uniques);
console.log("Repeated elements moved to new array:", duplicates);





