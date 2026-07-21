const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const displayName = document.getElementById("display-name").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    signupMessage.textContent = "Creating your Avenmark Account...";

    const { error } = await supabaseClient.auth.signUp({
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
        signupMessage.textContent = error.message;
        return;
    }

    signupMessage.textContent =
        "Account created! Please check your email to verify your account.";
});
