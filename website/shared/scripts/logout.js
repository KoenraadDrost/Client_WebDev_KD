import { reCAPTCHA_siteKey } from '../../restricted/apikey.js';

const localhostAPI = 'https://localhost:7095/api/Logout';
const localhostOrigin = 'http://127.0.0.1:5500/';

const element = document.getElementById("logoutButton");

alert(element);

element.addEventListener("click", async (event) => {
    
    // TODO: Check if user is logged in before attmepting logout.
    let isLoggedIn = true;

    if(isLoggedIn){
        asyncSend();
    }

    //TODO: Send user back to last pagethey visited, or redirect to Home if page requires active login.
});

async function asyncSend() {
    const recaptchaResponse = document.getElementById("recaptchaResponse");

    // TODO: Change to required POST data for logout. Do I eed a session token?
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
    let obj = JSON.parse(data);


    alert(JSON.stringify(data));
}