document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message")

        try {
            const credentials = btoa(username + ":" + password);
            const response = await fetch("https://01.kood.tech/api/auth/signin", {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + credentials,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                //console.log("response:", response);
                const jwt = await response.json();
                //console.log('JWT received in login response:', jwt);
            
                if (jwt) {
                    localStorage.setItem('jwt', jwt);
                    //console.log('JWT stored in localStorage:', localStorage.getItem('jwt'));
                    window.location.href = 'profile.html';
                } else {
                    console.error('JWT is undefined.');
                }
            } else {
                errorMessage.style.display = 'block';
                console.error("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
