const localhostAPI = 'https://localhost:7095/api/Email'
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

form.addEventListener("submit", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
        // If it isn't, we display an appropriate error message
        showError();
        return;
    }

    const name = document.getElementById("name");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    let response = await fetch(localhostAPI, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Name: name.value,
            Email: email.value,
            Subject: subject.value,
            Message: message.value
            })
    });

    let data = await response.json();
    alert(JSON.stringify(data))

});

function showError() {
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
