49. Group Anagrams

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

function getKey(str){
    return str.split('').sort().join('');
 }
var groupAnagrams = function(strs) {
    let hashMap = new Map()
    for(let s of strs){
      const key = getKey(s)
      if(!hashMap[key]){
          hashMap[key] =[];
      }
      hashMap[key].push(s);

    }
    return Object.values(hashMap)   
};


242. Valid Anagram


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = (s, t) =>{
    return s.split('').sort().join('') === t.split('').sort().join('')
    
};


58. Length of Last Word


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let c=0
    let space=0;
    for (let i =s.length-1;i>=0;i--){
        if(s[i]===" "){
            space++;
        }
        else {
            c++;
        }
        if(s[i]===" "&&c>0&&space>0){
            break;
        }
   
    }
    return c;
};

var isPalindrome = function(s) {
  s =  s.toLowerCase().replace(/[^a-z0-9]/gi,'');
  console.log(s.split('').join(''))
  let rev="";
  for(let i=0;i<s.length;i++){
   rev= s[i]+rev
  }
  if(rev==s) return true;
  
  return false;
};
console.log(isPalindrome("madam wew"))

function checkAnagram(str1,str2){ 
  return str1.split('').sort().join('') === str2.split('').sort().join('') 
}

console.log(checkAnagram("listen","silent"))


Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice.
The relative order of the elements should be kept the same.

var removeDuplicates = function(nums) {
     let c=0 ;
     let num = []
    
    for(let i=0 ; i < nums.length ; i++){
        if(nums[i] !== nums[i+2]){
            num[c] = nums[i];
            c++
        }
    }
    return num;
}}
console.log(removeDuplicates([1,1,1,2,2,2]))


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
     k = k % nums.length;
    if (k > 0) {
        // Use slice to get the last k elements and the rest of the array
        const lastKElements = nums.slice(-k);
        // Use slice to get the elements from 0 to nums.length - k elements and the rest of the array([nums.length-k,last k elements])
        const restOfArray = nums.slice(0, nums.length - k);
        // Concatenate the last k elements with the rest of the array
        nums.splice(0, nums.length, ...lastKElements, ...restOfArray);
    }
    return nums;
};



/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = (n)=> {
let seen = new Set()
    while (n !== 1 && !seen.has(n)) {
        seen.add(n)
        let sum = 0
        while (n > 0) {
            let digit = n % 10
            sum += digit * digit
            n = Math.floor(n / 10)
        }   
        n = sum
    }
    return n === 1
   

};


/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    let i = 0,j =0
    while (i < s.length && j < t.length){
        if(s[i] === t[j]){
            i++;
        }
        j++
    }
    return i === s.length
};


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";

    for (let i = 0; i < strs[0].length; i++) {
        let char = strs[0][i]; // character from first word

        for (let j = 1; j < strs.length; j++) {
            // if i is out of bounds OR characters don't match
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].slice(0, i);
            }
        }
    }

    return strs[0]; // all words match fully
};


console.log(longestCommonPrefix(["flower","flow","floight"]))




Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
     if(strs.length === 0) return " "
     strs.sort((a,b) => b.length - a.length)
     const shortest = strs.pop()
     let i =0
     for(; i < shortest.length; i++) {
        const prefix = shortest.substring(0,i+1);
        if(!strs.every(s => s.startsWith(prefix))) break;
  
     }
     return shortest.substring(0,i)
    
};


Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.



/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
let arrStr = s.split(" ").filter((e) => {
    return e != "";
  });
  console.log(arrStr)
  let rev = arrStr.reverse();

  return rev.join(" ");

};

console.log(reverseWords('Hello Dani'))


Find the Index of the First Occurrence in a String
Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle) 
};



Count the number of vowels in string:

function CountNumberVowels(s){
  let vowels = ['a','e','i','o','u']
  let cnt = 0
  
  s.toLowerCase().split("").forEach((s1) =>{
    vowels.includes(s1) && cnt++;
  })
  return cnt;
}
console.log(CountNumberVowels("My name is Dani"))



Minimum Size Subarray Sum:

Given an array of positive integers nums and a positive integer target, return the minimal length of a 
subarray
 whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

 

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let minLength = Infinity
    let left = 0;
    let curSum = 0;
    for(let right = 0; right < nums.length ; right++){
        curSum+=nums[right]
        while(curSum >=target){
            minLength = Math.min(minLength,right - left + 1 )
            curSum-=nums[left]
            left++;

        }
    }
   return minLength === Infinity ? 0 : minLength;

};


3. Longest Substring Without Repeating Characters

Given a string s, find the length of the longest 
substring without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let CharSet = new Set();
    let left = 0;
    let maxLength = 0;
    for(let right = 0; right < s.length;right++){
       while(CharSet.has(s[right])){
        CharSet.delete(s[left]);
        left++;
       }
       CharSet.add(s[right])
       maxLength = Math.max(maxLength, right - left + 1)
    }

return maxLength;

    
};
console.log(lengthOfLongestSubstring("abcabcbb"))


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
     const stack = [];
    const openBrackets = ['(', '{', '['];
    const closeBrackets = [')', '}', ']'];

    for (let char of s) {
        if (openBrackets.includes(char)) {
            stack.push(char);
        } else {
            if (stack.length === 0) return false;
            const lastOpen = stack.pop();
            if (openBrackets.indexOf(lastOpen) !== closeBrackets.indexOf(char)) return false;
        }
    }

    return stack.length === 0;
};



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
     let current=head;
   let low=head;
   let high=head;
   while(high!==null && high.next!=null){
    low=low.next;
    high = high.next.next;  
    if(low===high){
        return true;
    }
   }
   return false;
};



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let node=new ListNode();
   let result=node;
   let total=0;
   let carry=0;

   while(l1 || l2 || carry){
       total=carry;

    if(l1){
        total += l1.val;
        l1=l1.next
    }

    if(l2){
        total += l2.val;
        l2=l2.next;
    }

    let number=total % 10;
    carry=Math.floor(total / 10)

    node.next=new ListNode(number)
    node=node.next;

   }

   return result.next

};

function findTwoMissingNumbers(nums) {
    const n = nums.length + 2;
    const present = new Set(nums);
    const missing = [];

    for (let i = 1; i <= n; i++) {
        if (!present.has(i)) {
            missing.push(i);
        }
    }

    return missing;
}

var reverseWords = function(s) {
    // Step 1: Trim leading and trailing spaces
    let i = 0, j = s.length - 1;
    while (i <= j && s[i] === ' ') i++;
    while (j >= i && s[j] === ' ') j--;

    // Step 2: Collect words manually(skip extra spaces)
    let word = '';
    let words = [];
    
    while (i <= j) {
        const char = s[i];
        if (char !== ' ') {
            word += char;
        } else if (word.length > 0) {
            words.push(word); // push only non-empty word
            word = '';
        }
        i++;
    }
    // push the last word if any
    if (word.length > 0) {
        words.push(word);
    }

    // Step 3: Reconstruct the sentence by reversing words manually
    let result = '';
    for (let k = words.length - 1; k >= 0; k--) {
        result += words[k];
        if (k > 0) result += ' ';
    }

    return result;
};


var subarraySum = function(nums, k) {
    let count = 0;
    
    for (let i = 0; i < nums.length; i++) {
        let sum = 0; // start of new subarray
        for (let j = i; j < nums.length; j++) {
            sum += nums[j]; // add next element to current subarray sum
            if (sum === k) {
                count++; // found a valid subarray
            }
        }
    }

    return count;
};
console.log(subarraySum([1,1,1],1))

Given an integer array nums, find the subarray with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

function maxSubArray(nums) {
let curSum = nums[0], maxSum = nums[0]
for(let i = 0; i < nums.length -1 ; i++){
    curSum = Math.max(nums[i],curSum + nums[i])
    maxSum = Math.max(maxSum,curSum)
}
return maxSum
}
console.log(maxSubArray([1,2,3,4]))
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))



function isAnagram(s, t) {
  if (s.length !== t.length) return false
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}

console.log(isAnagram("listen", "silent"));



function findDuplicates(nums){
    
    const Count = {}
    const duplicate = new Set()
    for(let ele of nums){
        if(Count[ele]){
            duplicate.add(ele)
        }else{
            Count[ele] = 1
        }
    }
    return Array.from(duplicate)
}

console.log(findDuplicates([1,2,2,3,3,4,5,5,6]))



function myAtoi(s) {
  s = s.trim();
  if (!s) return 0;
  let sign = 1, i = 0, result = 0;

  if (s[0] === '-' || s[0] === '+') {
    sign = s[0] === '-' ? -1 : 1;
    i++;
  }

  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + (s[i].charCodeAt(0) - '0'.charCodeAt(0));
    i++;
  }

  result *= sign;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);
  return Math.min(Math.max(result, INT_MIN), INT_MAX);
}

console.log(myAtoi("42"));             // Output: 42
console.log(myAtoi("   -42"));         // Output: -42
console.log(myAtoi("4193 with words")); // Output: 4193
console.log(myAtoi("words and 987"));  // Output: 0
console.log(myAtoi("-91283472332"));   // Output: -2147483648 (clamped to INT_MIN)
console.log(myAtoi("+123"));  

