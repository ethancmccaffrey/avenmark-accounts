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

        // Check username availability
        const { data: usernameCheck, error: usernameError } = await supabaseClient
            .from("profiles")
            .select("username")
            .eq("username", username)
            .maybeSingle();

        if (usernameError) {
            console.error("Username Check Error:", usernameError);
        }

        if (usernameCheck) {
            signupMessage.textContent =
                "That username is already taken. Please choose another.";
            return;
        }


        // Create authentication account
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
            console.error("Signup Error:", error);

            if (error.message.includes("Password")) {
                signupMessage.textContent = error.message;
            } 
            else if (error.message.includes("already registered")) {
                signupMessage.textContent =
                    "An account with this email already exists.";
            } 
            else {
                signupMessage.textContent =
                    "Unable to create your account. Please try again.";
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
