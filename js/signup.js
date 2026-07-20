/* ==========================================================
   AVENMARK ACCOUNTS — SIGNUP SYSTEM
========================================================== */


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


        // Create authentication account

        const { data, error } = await supabaseClient.auth.signUp({

            email: email,

            password: password

        });



        if (error) {

            throw error;

        }



        const user = data.user;



        if (!user) {

            throw new Error("Account creation failed.");

        }



        // Create Avenmark profile

        const { error: profileError } = await supabaseClient

            .from("profiles")

            .insert([

                {

                    id: user.id,

                    username: username,

                    display_name: displayName,

                    role: "user"

                }

            ]);



        if (profileError) {

            throw profileError;

        }



        signupMessage.textContent =
            "Account created! Please check your email to verify your account.";



    } catch (error) {


        signupMessage.textContent = error.message;


    }


});
