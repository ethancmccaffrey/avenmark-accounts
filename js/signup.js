const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const displayName = document.getElementById("display-name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    signupMessage.textContent = "Creating your Avenmark Account...";

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: displayName,
                    username: username
                }
            }
        });

        if (error) {
            console.error("Signup Error:", error);

            const errorText = JSON.stringify(error);

            if (
                errorText.includes("username") ||
                errorText.includes("profiles") ||
                errorText.includes("duplicate")
            ) {
                signupMessage.textContent =
                    "That username is already taken. Please choose another.";
            } 
            else if (error.message) {
                signupMessage.textContent = error.message;
            } 
            else {
                signupMessage.textContent =
                    "Something went wrong creating your account.";
            }

            return;
        }

        signupMessage.textContent =
            "Account created! Please check your email to verify your account.";

    } catch (error) {
        console.error("Unexpected Signup Error:", error);

        signupMessage.textContent =
            "Something went wrong. Please try again.";
    }
});
