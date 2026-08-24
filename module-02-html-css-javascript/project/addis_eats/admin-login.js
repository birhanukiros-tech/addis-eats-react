// =====================================================
// ADMIN LOGIN
// =====================================================

const loginForm = document.querySelector("#admin-login-form");

const usernameInput = document.querySelector("#admin-username");

const passwordInput = document.querySelector("#admin-password");

const loginMessage = document.querySelector("#login-message");


// =====================================================
// LOGIN
// =====================================================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = usernameInput.value.trim();

    const password = passwordInput.value.trim();


    // Demo admin credentials

    if (username === "admin" && password === "1234") {

        // Save login session

        sessionStorage.setItem("adminLoggedIn", "true");

        // Go to dashboard

        window.location.href = "admin-dashboard.html";

    } else {

        loginMessage.textContent =
            "Invalid username or password.";

    }

});