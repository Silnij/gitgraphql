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
                console.log("response:", response);
                const data = await response.json();
                console.log('Login Response Data:', data);
                const jwt = data.token;
                console.log("data.token:", data.token)
                console.log('JWT received in login response:', jwt);
            
                if (jwt) {
                    localStorage.setItem('jwt', jwt);
                    console.log('JWT stored in localStorage:', localStorage.getItem('jwt'));
                    window.location.href = 'profile.html';
                } else {
                    console.error('JWT is undefined in the response data.');
                }
            } else {
                console.error("Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});
