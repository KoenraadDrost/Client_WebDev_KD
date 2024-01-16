import { reCAPTCHA_siteKey } from '../../restricted/apikey.js';

const localhostAPI = 'https://localhost:7095/api/Email';
const localhostOrigin = 'http://127.0.0.1:5500/';

const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", (event) => {
    // Each time the user types something, we check if the
    // form fields are valid.

    if (email.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
    } else {
        // If there is still an error, show the correct error
        showError();
    }
});

const name = document.getElementById("name");
const nameError = document.querySelector("#name + span.error");

name.addEventListener("input", (event) =>{
    if(name.validity.valid){
        nameError.textContent = "";
        nameError.className = "error";
    } else {
        showError();
    }
});

const subject = document.getElementById("subject");
const subjectError = document.querySelector("#subject + span.error");

subject.addEventListener("input", (event) =>{
    if(subject.validity.valid){
        subjectError.textContent = "";
        subjectError.className = "error";
    } else {
        showError();
    }
});

const message = document.getElementById("message");
const messageError = document.querySelector("#message + span.error");

message.addEventListener("input", (event) =>{
    if(message.validity.valid){
        messageError.textContent = "";
        messageError.className = "error";
    } else {
        showError();
    }
});

// Showing user input errors
function showError() {
    if(!email.validity.valid) showEmailError();

    if(!name.validity.valid) showNameError();

    if(!subject.validity.valid) showSubjectError();

    if(!message.validity.valid) showMessageError();
}

function showEmailError() {
    if (email.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        emailError.textContent = "You need to enter an e-mail address.";
    } else if (email.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = "Entered value needs to be an e-mail address.";
    } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `E-mail should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    // Set the styling appropriately
    emailError.className = "error active";
}

function showNameError() {
    if (name.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        nameError.textContent = "Please enter your name or innitials";
    } else if (name.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        nameError.textContent = `Name should be at least ${name.minLength} characters.`;
    }

    // Set the styling appropriately to show error message to user.
    nameError.className = "error active";
}

function showSubjectError() {
    if (subject.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        subjectError.textContent = "Please enter a subject";
    } else if (subject.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        subjectError.textContent = `Subject should be at least ${subject.minLength} characters.`;
    }

    // Set the styling appropriately to show error message to user.
    subjectError.className = "error active";
}

function showMessageError() {
    if (message.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        messageError.textContent = "Please enter a message";
    } else if (message.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        messageError.textContent = `Message should be at least ${message.minLength} characters.`;
    } else if (message.validity.tooLong) {
        // If the data is too long
        // display the following error message.
        messageError.textContent = `Please keep your message brief and to a maximum of ${message.maxLength} characters.`
    }

    // Set the styling appropriately to show error message to user.
    messageError.className = "error active";
}

form.addEventListener("submit", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    // If all fields are valid, we let the form submission move to reCaptcha
    if (!email.validity.valid || !name.validity.valid || !subject.validity.valid || !message.validity.valid) {
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
            Name: name.value,
            Email: email.value,
            Subject: subject.value,
            Message: message.value
            })
    });

    let data = await response.json();
    alert(JSON.stringify(data));
}