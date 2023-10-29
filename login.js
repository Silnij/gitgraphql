document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

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
                const data = await response.json();
                const jwt = data.token;
                console.log("Login successful");
                console.log('JWT received in login response:', jwt);
                localStorage.setItem("jwt", jwt);
                window.location.href = "profile.html";

            } else {
                console.error("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
