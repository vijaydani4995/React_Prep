// function pairedSum(arr,target){
//   const seen = new Set();
//   for(let num of arr){
//     let compliment = target - num;
//     if(seen.has(compliment)){
//       return [compliment,num]
//     }
//     seen.add(num)
//   }
// }

// console.log(pairedSum([2,4,5,5,1],10))

// function firstRepeatingElement(arr){
//   const seen = new Set();
  
//   for (let ele of arr) {
//     if (seen.has(ele)) {
//       return ele;  // Return the first repeating element
//     }
    
//     seen.add(ele);
//   }
  
//   return null;  //
  
// }

// console.log(firstRepeatingElement([2,3,4,5,2]))



// function firstNonRepeatingElement(arr){
  
//   for(let i =0; i < arr.length -1; i++){
//     if(arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])){
//       return arr[i]
//     }
//   }
  
//   return null;
  
// }
// console.log(firstNonRepeatingElement([2, 3, 4, 2, 3, 5]))



// function removeDuplicate(arr){
  
//   const unique =[];
//   arr.forEach(item =>{
//     if(!unique.includes(item)){
//       unique.push(item)
//     }
    
//   }
// )
//   return unique;
// }

// console.log(removeDuplicate(["ss","ss"]))





// function UnionArray(arr1,arr2){
//   return [...new Set([...arr1,...arr2])]
// }

// console.log(UnionArray([2,3,4],[1,5,6]))



// function reverseString(arr){
//   let reverse =[];
//   for(let i = arr.length -1; i >= 0; i--){
//   reverse.push(arr[i])
//   }
//   return reverse.join('');
  
// }

// console.log(reverseString("Anjali"))


// function intersection(arr1,arr2){
//   return arr1.filter((value) => arr2.includes(value))
  
// }

// console.log(intersection([2,3,1],[2,3,1,5]))



// function findKthLargest(arr,k) {
//   arr.sort((a,b) => b - a)
//   return arr[k-1]
// }

// console.log(findKthLargest([2,3,4,5,6],2))



// function removeFalseValue(arr){
//   return arr.filter(Boolean)
// }

// console.log(removeFalseValue([true,false,'',undefined]))


// function factorial(n){
//   return n === 0? 1: n * factorial(n-1)
// }

// console.log(factorial(7))

// function evenNumber(num){
//   return num.filter(num => num % 2 === 0)
// }

// console.log(evenNumber([2,3,4,6,12]))


//Hoisting 
 
// meth()
// function meth(){
//   console.log("Hello")
// }


// console.log('A'<'a') //ascii values of A is less than a;

// let a=b=c=1;
// console.log(a === b === c)  //result :false

// let a=b=c=10
// console.log(a>b>c)  //false



// console.log([]!==[]) //true

// console.log(typeof(Nan)) //undefined


// console.log('A'-'B') //NaN

// console.log(typeof(NaN)) //number

// console.log(typeof([])) //Object

// const P = new Promise((res,rej) =>{
//   let x =y ="Geeks";
//   if(x == y){
//     res()
//   }else{
//     rej()
//   }
// })

// P.then(() =>{
//   console.log("Matched")
// })
// .catch(() =>{
//   console.log("Not Matched")
// })


// console.log(2+"3"+3+3+6) //23336

// console.log( 2*"2") //4

// console.log(2-"*2") //NaN
// let a =b=1
// console.log( a&& b)

// const Person ={
//   name:"Anjali",
//   age:23
// }
// console.log(Object.values(Person))

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function demo() {
//   console.log('Sleeping...');
//   await sleep(2000);
//   console.log('Awake now!');
// }
// demo()


// console.log("Hello...")
// setTimeout(() =>{
//   console.log("Hello111")
// },0)
// console.log("helllll")  //result:Hello...,helllll,Hello111



// setTimeout(() => console.log('1'), 0);
// Promise.resolve().then(() => console.log('2'));
// console.log('3'); result:3,2,1

// "use strict"
// function foo(){
//   x =10;
//   console.log(x)
// }
// foo()



// foo() -> this will prints "calling foo"
// var foo = 20; -> when function is replaced with 20 values till that it was undefined,

// function foo(){
//   console.log("calling foo")
// }
// foo() -> After calling this it will foo us not a function because it is replaced with 20 value.


// function outer(){
//   function inner(){
//     console.log(x)
//   }
//   const x=5
//   return inner;
// }

// const inner = outer()
// inner()


// console.log((1 && 2) || 0 || 3);

// console.log(null && undefined);

// console.log(0 || (1 && 2) || 3);

// console.log(null || (2 && 3) || 4);  2,null,2,3



// var array = [1, 2, 3, 4, 5];
// console.log(array.length);

// array.length = 3;

// console.log(array.length);
// console.log(array);

// delete array[0];

// console.log(array);
// console.log(array[0]);
// console.log(array.length);

let a = [1]
let b = [2]
console.log(a+b) output: 12


let a = 5
let b = a++
console.log(a,b) output:// 6,5

let c = 5
let d = ++c output:// 6,6

console.log(c,d)

// console.log(1 && 12)


//Deleting any element in array

// function DeleteElement(arr){
//   return  arr.slice(3)
// }

// console.log(DeleteElement([2,3,14,5,6]))


//below are examples for call,Apply,and bind
function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Bob' };

greet.apply(person, ['Hi', '.']);



function greet1(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person1 = { name: 'Bob' };

greet1.call(person1, "Hi", ".");


function greet2(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person2 = { name: 'Bob' };


const greet3 =greet2.bind(person2,"Hi");
greet3("!")


console.log("Hello")

setTimeout(() =>{
console.log("Hello setTimeout 1000 milli seconds")
},1000)

setTimeout(() =>{
console.log("Hello setTimeout 500 milli seconds")
},500)

setTimeout(() =>{
console.log("Hello setTimeout 0 milli seconds")
},0)

const P = new Promise((resolve,reject) =>{
let x ="Promise",y ="Promise"
if(x === y){
resolve("success maching")
}
else{
reject("failed matching")
}


})

P.then((data) =>{
console.log("Success data:",data)
})
.catch((data) =>{
console.log("Failed data:",data)
})

console.log("hello...........")

setInterval(() => {
console.log("SetInterval")
},10000)


function Fetch(){
A =16;
console.log(A)
}

let A;
Fetch()   OutPut:// 16 ,A is not declared within function,But before calling Fetch function,

let A is declared that's why output is 16.


[1,2,3,4,5].forEach((ele) =>{
	console.log(ele);
	return ;

})

When ever we use break instead of return,It will throw error,Syntax error:

Array.prototype.forEach = 
function(callback){
	for(let x of this){
		callback(x)  <->   break
	}
}





