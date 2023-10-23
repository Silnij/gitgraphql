document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            // Create a Base64-encoded token
            const credentials = btoa(username + ":" + password);

            // Make a POST request to obtain a JWT
            const response = await fetch("https://01.kood.tech/api/auth/signin", {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + credentials,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const jwt = data.token;
                console.log("Login successful");

                // Store the JWT securely
                localStorage.setItem("jwt", jwt);

            } else {
                // Handle invalid credentials and display an error message
                console.error("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
