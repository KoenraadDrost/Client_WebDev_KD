import { reCAPTCHA_siteKey } from '../../restricted/apikey.js';

const localhostAPI = 'https://localhost:7095/api/Login';
const localhostOrigin = 'http://127.0.0.1:5500/';

const form = document.querySelector("form");
const username = document.getElementById("usernamefield");
const usernameError = document.querySelector("#usernamefield + span.error");

username.addEventListener("input", (event) => {
    // Each time the user types something, we check if the
    // form fields are valid.

    if (username.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        usernameError.textContent = ""; // Reset the content of the message
        usernameError.className = "error"; // Reset the visual state of the message
    } else {
        // If there is still an error, show the correct error
        showError();
    }
});

const password = document.getElementById("passwordfield");
const passwordError = document.querySelector("#passwordfield + span.error");

password.addEventListener("input", (event) =>{
    if(password.validity.valid){
        passwordError.textContent = "";
        passwordError.className = "error";
    } else {
        showError();
    }
});

// Showing user input errors
function showError() {
    if(!username.validity.valid) showUsernameError();

    if(!password.validity.valid) showPasswordError();
}

function showUsernameError() {
    if (username.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        usernameError.textContent = "You need to enter your e-mail address or username.";
    } else if (username.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        usernameError.textContent = "Entered value needs to be an e-mail address or username.";
    } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        usernameError.textContent = `E-mail or username should be at least ${username.minLength} characters; you entered ${email.value.length}.`;
    }

    // Set the styling appropriately
    usernameError.className = "error active";
}

function showPasswordError() {
    if (password.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        passwordError.textContent = "Please enter your password";
    } else if (password.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        passwordError.textContent = `Password too short.`;
    }

    // Set the styling appropriately to show error message to user.
    passwordError.className = "error active";
}

form.addEventListener("submit", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    // If all fields are valid, we let the form submission move to reCaptcha
    if (!username.validity.valid || !password.validity.valid) {
        // If they aren't, we display an appropriate error message
        showError();
        return;
    }

    //Current work in pgrogress, Recaptcha:
    grecaptcha.ready(function() { // Wait for the recaptcha to be ready
        grecaptcha
            .execute(reCAPTCHA_siteKey, {
                action: "contact"
            }) // Execute the recaptcha
            .then(function(token){
                
                let recaptchaResponse = document.getElementById("recaptchaResponse");
                recaptchaResponse.value = token; // Set the recaptcha response

                asyncSend();
            })
    });

});

async function asyncSend() {
    const recaptchaResponse = document.getElementById("recaptchaResponse");

    let response = await fetch(localhostAPI, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Verification: recaptchaResponse.value,
            Username: username.value,
            Password: password.value,
            })
    });

    let data = await response.json();
    alert(JSON.stringify(data));
}