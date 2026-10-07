
let users = [
    {
        name: "Demo User",
        email: "demo@example.com",
        password: "123456"
    }
];


const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");

const signInTab = document.getElementById("signInTab");
const signUpTab = document.getElementById("signUpTab");

const goToSignUp = document.getElementById("goToSignUp");
const goToSignIn = document.getElementById("goToSignIn");

const message = document.getElementById("message");

function showSignIn() {
    signInForm.classList.remove("hidden");
    signUpForm.classList.add("hidden");

    signInTab.classList.add("active");
    signUpTab.classList.remove("active");

    clearMessage();
}

function showSignUp() {
    signUpForm.classList.remove("hidden");
    signInForm.classList.add("hidden");

    signUpTab.classList.add("active");
    signInTab.classList.remove("active");

    clearMessage();
}

signInTab.addEventListener("click", showSignIn);
signUpTab.addEventListener("click", showSignUp);

goToSignUp.addEventListener("click", showSignUp);
goToSignIn.addEventListener("click", showSignIn);

function showMessage(text, type) {
    message.textContent = text;

    message.className = "message";

    if (type === "success") {
        message.classList.add("success");
    } else {
        message.classList.add("error-message");
    }
}

function clearMessage() {
    message.textContent = "";
    message.className = "message";
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });
}

function setError(id, text) {
    document.getElementById(id).textContent = text;
}


signUpForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();
    clearMessage();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let valid = true;

    if (name === "") {
        setError("signupNameError", "Name is required.");
        valid = false;
    } else if (name.length < 2) {
        setError("signupNameError", "Name must contain at least 2 characters.");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        setError("signupEmailError", "Email is required.");
        valid = false;
    } else if (!emailPattern.test(email)) {
        setError("signupEmailError", "Enter a valid email address.");
        valid = false;
    }


    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        setError("signupEmailError", "This email is already registered.");
        valid = false;
    }

    if (password === "") {
        setError("signupPasswordError", "Password is required.");
        valid = false;
    } else if (password.length < 6) {
        setError(
            "signupPasswordError",
            "Password must be at least 6 characters."
        );
        valid = false;
    }


    if (confirmPassword === "") {
        setError(
            "confirmPasswordError",
            "Please confirm your password."
        );
        valid = false;
    } else if (password !== confirmPassword) {
        setError(
            "confirmPasswordError",
            "Passwords do not match."
        );
        valid = false;
    }

    if (!valid) {
        return;
    }


    users.push({
        name: name,
        email: email,
        password: password
    });

    showMessage(
        "Account created successfully! You can now sign in.",
        "success"
    );

    signUpForm.reset();

    setTimeout(() => {
        showSignIn();

        document.getElementById("loginEmail").value = email;
    }, 1200);
});



signInForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();
    clearMessage();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    let valid = true;

    if (email === "") {
        setError("loginEmailError", "Email is required.");
        valid = false;
    }

    if (password === "") {
        setError("loginPasswordError", "Password is required.");
        valid = false;
    }

    if (!valid) {
        return;
    }


    const user = users.find(
        account =>
            account.email === email &&
            account.password === password
    );

    if (user) {

        showMessage(
            `Welcome back, ${user.name}! Sign in successful.`,
            "success"
        );

        signInForm.reset();

    } else {

        showMessage(
            "Invalid email or password. Please try again.",
            "error"
        );
    }
});



document.querySelectorAll(".show-password").forEach(button => {

    button.addEventListener("click", function () {

        const targetId = this.dataset.target;
        const input = document.getElementById(targetId);

        if (input.type === "password") {
            input.type = "text";
            this.textContent = "Hide";
        } else {
            input.type = "password";
            this.textContent = "Show";
        }
    });
});