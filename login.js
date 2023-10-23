document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            // Make a POST request to obtain a JWT
            const response = await fetch("https://01.kood.tech/api/auth/signin", {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(username + ":" + password),
                },
            });

            if (response.ok) {
                const data = await response.json();
                const jwt = data.token;
                console.log("Login successfull")

                // Store the JWT securely (e.g., in a cookie or local storage)
                // Redirect the user to the profile page or perform other actions
            } else {
                // Handle invalid credentials and display an error message
                console.error("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
