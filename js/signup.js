const signupForm = document.getElementById("signup-form");

const signupMessage = document.getElementById("signup-message");

const signupButton = document.getElementById("signup-button");

const signupContainer = document.getElementById("signup-container");

const verificationScreen = document.getElementById("verification-screen");

const verificationEmail = document.getElementById("verification-email");

const usernameStatus = document.getElementById("username-status");

const passwordStatus = document.getElementById("password-status");

const emailStatus = document.getElementById("email-status");


const displayNameInput = document.getElementById("display-name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");


let usernameAvailable = false;
let passwordValid = false;
let emailValid = false;



function updateButton() {

    signupButton.disabled = !(
        usernameAvailable &&
        passwordValid &&
        emailValid &&
        displayNameInput.value.trim() !== ""
    );

}



usernameInput.addEventListener("input", async () => {

    const username = usernameInput.value.trim();

    usernameAvailable = false;


    if (username.length < 3) {

        usernameStatus.textContent =
            "Username must be at least 3 characters.";

        updateButton();

        return;

    }


    usernameStatus.textContent =
        "Checking username...";


    const { data, error } = await supabaseClient
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();


    if (error) {

        console.error("Username Check Error:", error);

        usernameStatus.textContent =
            "";

        updateButton();

        return;

    }


    if (data) {

        usernameStatus.textContent =
            "✕ Username already taken.";

        usernameAvailable = false;


    } else {

        usernameStatus.textContent =
            "✓ Username available.";

        usernameAvailable = true;

    }


    updateButton();

});



passwordInput.addEventListener("input", () => {

    const password = passwordInput.value;


    if (password.length >= 8) {

        passwordStatus.textContent =
            "✓ Password meets requirements.";

        passwordValid = true;


    } else {

        passwordStatus.textContent =
            "Password must be at least 8 characters.";

        passwordValid = false;

    }


    updateButton();

});



emailInput.addEventListener("input", () => {

    const email = emailInput.value.trim();


    if (email.includes("@") && email.includes(".")) {

        emailStatus.textContent =
            "✓ Email looks valid.";

        emailValid = true;


    } else {

        emailStatus.textContent =
            "Enter a valid email address.";

        emailValid = false;

    }


    updateButton();

});



signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const displayName = displayNameInput.value.trim();

    const username = usernameInput.value.trim();

    const email = emailInput.value.trim();

    const password = passwordInput.value;



    signupMessage.textContent =
        "Creating your Avenmark Account...";


    signupButton.disabled = true;



    try {


        const { error } = await supabaseClient.auth.signUp({

            email,

            password,

            options: {

                emailRedirectTo:
                    "https://avenmark-accounts.vercel.app/verified.html",

                data: {

                    display_name: displayName,

                    username: username

                }

            }

        });



        if (error) {


            console.error("Signup Error:", error);


            if (error.message.includes("already registered")) {

                signupMessage.textContent =
                    "An account with this email already exists.";


            } else {

                signupMessage.textContent =
                    "Unable to create your Avenmark Account. Please try again.";

            }


            signupButton.disabled = false;

            return;

        }



        signupContainer.style.display = "none";


        verificationEmail.textContent = email;


        verificationScreen.style.display = "block";



    } catch (error) {


        console.error("Unexpected Signup Error:", error);


        signupMessage.textContent =
            "Something went wrong. Please try again.";


        signupButton.disabled = false;

    }


});
