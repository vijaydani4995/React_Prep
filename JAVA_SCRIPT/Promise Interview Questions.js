How do you create a Promise in JavaScript?
A Promise is created using new Promise((resolve, reject) => { ... }). The resolve function is called when the operation completes successfully,
while reject is called when the operation fails.

const fetchData = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Data fetched successfully");
    } else {
        reject("Error fetching data");
    }
});

What is then() and catch() in Promises?
.then(): Called when the promise is fulfilled. It takes a callback function that runs on fulfillment.
.catch(): Called if the promise is rejected, allowing for error handling.


Example with .then() and .catch():

fetchData
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });



What is Promise.all() and How Does it Work?
Promise.all() accepts an array of promises and returns a single promise that resolves when all promises resolve. If any promise is rejected,
 Promise.all() is rejected.

Example:

Promise.all([fetchData1, fetchData2, fetchData3])
    .then((results) => {
        console.log("All data fetched:", results);
    })
    .catch((error) => {
        console.error("One of the promises failed:", error);
    });



What is Promise.race() and When Would You Use It?
Promise.race() returns the result of the first settled promise, whether fulfilled or rejected. It’s useful when only the fastest result is needed.

Example:

Promise.race([fetchData1, fetchData2, fetchData3])
    .then((result) => {
        console.log("First promise to settle:", result);
    })
    .catch((error) => {
        console.error("First promise to reject:", error);
    });
What is Promise.allSettled() and How Does it Differ from Promise.all()?
Promise.allSettled() waits for all promises to settle and returns an array of results for each promise, regardless of whether they are fulfilled or rejected.
This differs from Promise.all(), which stops at the first rejection.


What is Promise.allSettled() and How Does it Differ from Promise.all()?
Promise.allSettled() waits for all promises to settle and returns an array of results for each promise, regardless of whether they are fulfilled or rejected. This differs from Promise.all(), which stops at the first rejection.

Example:

Promise.allSettled([fetchData1, fetchData2, fetchData3])
    .then((results) => {
        results.forEach(result => console.log(result.status));
    });
How Does Promise.finally() Work?
.finally() executes a callback after the promise settles (fulfilled or rejected), which is useful for cleanup actions.

Example:

fetchData
    .then((data) => console.log(data))
    .catch((error) => console.error(error))
    .finally(() => console.log("Cleanup actions"));
What is the Role of async/await with Promises?
async/await is syntactic sugar over promises, making asynchronous code look synchronous. An async function returns a promise, and await pauses the function execution until the promise is resolved or rejected.




How Can You Implement a Custom Promise Retry Mechanism?
A retry mechanism can be useful for network requests that might temporarily fail. Here’s an example with a retry limit.

Example:

function fetchWithRetry(fn, retries = 3) {
    return fn().catch((error) => {
        if (retries <= 0) {
            throw error;
        }
        return fetchWithRetry(fn, retries - 1);
    });
}
















To handle a situation where multiple APIs need to be called in a sequence, you can use chained promises. In this case, after a successful login,
you want to call the Dashboard and Graph APIs. Here’s how you can set up promises to manage this flow:

const loginAPI = new Promise((resolve, reject) => {
  fetch("http://10.112.115.200:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Add any required login data here, e.g., username and password
      username: "yourUsername",
      password: "yourPassword",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      resolve("Login successful: " + JSON.stringify(data));
    })
    .catch((error) => {
      reject("Login failed: " + error.message);
    });
});
const dashboardAPI = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Dashboard data fetched");
  }, 1000);
});

const graphAPI = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Graph data fetched");
  }, 1000);
});

// Function to handle the API flow
const fetchDataAfterLogin = () => {
  loginAPI
    .then((loginResponse) => {
      console.log(loginResponse);
      // Only call Dashboard and Graph APIs after successful login
      return Promise.all([dashboardAPI, graphAPI]);
    })
    .then((responses) => {
      console.log(responses[0]); // Dashboard data fetched
      console.log(responses[1]); // Graph data fetched
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Invoke the function
fetchDataAfterLogin();


After converting it Async and Await form.

// Define the loginAPI function with async/await
const loginAPI = async () => {
  try {
    const response = await fetch("http://10.112.115.200:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Add any required login data here, e.g., username and password
        username: "yourUsername",
        password: "yourPassword",
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data; // Return the login data if needed in later functions

  } catch (error) {
    console.error("Login failed:", error.message);
    throw error; // Re-throw the error so it can be caught in fetchDataAfterLogin
  }
};

// Define the dashboardAPI and graphAPI functions as async functions
const dashboardAPI = async () => {
  // Simulating an API call to fetch dashboard data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Dashboard data fetched");
    }, 1000);
  });
};

const graphAPI = async () => {
  // Simulating an API call to fetch graph data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Graph data fetched");
    }, 1000);
  });
};

// Function to handle the API flow with async/await
const fetchDataAfterLogin = async () => {
  try {
    // Wait for login to complete
    await loginAPI();
    
    // After login, fetch dashboard and graph data concurrently
    const [dashboardData, graphData] = await Promise.all([dashboardAPI(), graphAPI()]);
    
    console.log(dashboardData); // Dashboard data fetched
    console.log(graphData); // Graph data fetched

  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Invoke the function
fetchDataAfterLogin();

