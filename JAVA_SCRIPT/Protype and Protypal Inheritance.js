Prototype and Prototypal Inheritance in JavaScript
What is a Prototype?
A prototype in JavaScript is an object from which other objects inherit properties and methods. Every JavaScript object has a 
hidden, internal property called [[Prototype]], which can be accessed using Object.getPrototypeOf(obj) or the __proto__ property (not recommended).

When you try to access a property or method on an object, the JavaScript engine first looks for it on the object itself.
If it's not found, it searches the object's prototype chain until it either finds the property/method or reaches the end of 
 the chain (where [[Prototype]] is null).

Prototypal Inheritance
Prototypal inheritance is a feature in JavaScript that allows objects to inherit properties and methods from other objects. It provides a way to create new objects using an existing object as a blueprint.

Example of Prototype and Prototypal Inheritance
1. Prototype Example

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding a method to the prototype
Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Creating an instance
const person1 = new Person('Alice', 25);

// Accessing the prototype method
person1.greet(); // Output: Hello, my name is Alice and I am 25 years old.

// Checking the prototype
console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
In this example:

The greet method is added to the Person.prototype.
person1 can access greet because it is inherited from the prototype.
2. Prototypal Inheritance Example
javascript
Copy code
const animal = {
    eats: true,
    walk() {
        console.log('Animal is walking');
    }
};

// Create a new object that inherits from `animal`
const dog = Object.create(animal);

// Adding a property specific to `dog`
dog.barks = true;

// Accessing inherited properties and methods
console.log(dog.eats); // true (inherited from `animal`)
dog.walk(); // Output: Animal is walking

// Using a property defined on `dog`
console.log(dog.barks); // true
In this example:

The dog object inherits from the animal object using Object.create(animal).
The dog object has its own property barks but can still access animal's properties and methods.
Key Points
Prototype Chain: When accessing a property, JavaScript looks up the prototype chain until it finds the property or reaches null.
Inheritance Methods:
Using constructors with prototype.
Using Object.create(parentObj) for direct inheritance.
Benefits:
Code reusability: Methods and properties can be shared across objects.
Dynamic: Prototypes can be updated, and changes will reflect in all instances.
Modern Approach: Classes
With ES6, class syntax provides a cleaner way to use prototypes and inheritance:

javascript
Copy code
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); 
        this.grade = grade;
    }

    study() {
        console.log(`${this.name} is studying in grade ${this.grade}.`);
    }
}

// Usage
const student1 = new Student('Bob', 20, '10th');
student1.greet(); // Output: Hello, my name is Bob and I am 20 years old.
student1.study(); // Output: Bob is studying in grade 10th.