/* ==========================================================
   AVENMARK ACCOUNTS — LOGIN SYSTEM
========================================================== */


const loginForm = document.getElementById("login-form");

const loginMessage = document.getElementById("login-message");



loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();



    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;



    loginMessage.textContent = "Signing in...";



    try {


        const { data, error } = await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });



        if (error) {

            throw error;

        }



        if (!data.user) {

            throw new Error("Login failed.");

        }



        loginMessage.textContent = "Welcome back.";



        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 800);



    } catch (error) {


        loginMessage.textContent = error.message;


    }


});
