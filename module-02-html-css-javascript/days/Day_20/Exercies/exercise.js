// exercise ---- USD -----ETB

async function getEtbRate() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return data.rates.ETB;
  } catch (err) {
    console.error("Rate failed:", err);
  }
}

getEtbRate().then(rate => {
  console.log("1 USD =", rate, "ETB");
});

// Exercise 2 Rewrite . then

async function getPost() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.error("Could not load post:", err);
  }
}

getPost();

// Exercsie 3 wrong url

// 1. Deliberately wrong URL
async function testWrongUrl() {
  try {
    const res = await fetch(
      "https://this-url-does-not-exist-example.com/data"
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Catch block ran:", err.message);
  }
}


// 2. Real URL that returns 404
async function test404() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/999999"
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("404 error:", err.message);
  }
}

testWrongUrl();
test404();

//Exercise 4 promise.all

async function getPosts() {
  try {
    // Get the list
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const posts = await res.json();

    // Take the first two posts
    const firstTwo = posts.slice(0, 2);

    // Fetch both details at the same time
    const details = await Promise.all(
      firstTwo.map(async post => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
    );

    console.log(details);
  } catch (err) {
    console.error("Could not load posts:", err);
  }
}

getPosts();

// Exercise 5 Loading / success/ Error

const output = document.querySelector("#output");
const button = document.querySelector("#load-btn");

async function loadPost() {
  // Loading state
  output.textContent = "Loading…";

  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const post = await res.json();

    // Success state
    output.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
  } catch (err) {
    // Error state
    output.textContent = "Could not load the data. Please try again.";
    console.error(err);
  }
}

button.addEventListener("click", loadPost);