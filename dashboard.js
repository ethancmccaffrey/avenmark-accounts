/* ==========================================================
   AVENMARK ACCOUNTS — DASHBOARD SYSTEM
========================================================== */


const welcomeMessage = document.getElementById("welcome-message");

const displayNameElement = document.getElementById("display-name");
const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const roleElement = document.getElementById("role");
const createdAtElement = document.getElementById("created-at");

const permissionsStatus = document.getElementById("permissions-status");

const signOutButton = document.getElementById("signout-button");



async function loadDashboard() {


    const {
        data: {
            session
        }

    } = await supabaseClient.auth.getSession();



    if (!session) {

        window.location.href = "login.html";

        return;

    }



    const user = session.user;



    emailElement.textContent = user.email;



    // Load profile information

    const {
        data: profile,
        error: profileError

    } = await supabaseClient

        .from("profiles")

        .select("*")

        .eq("id", user.id)

        .single();



    if (profileError) {

        console.error(profileError);

        return;

    }



    welcomeMessage.textContent =
        `Welcome, ${profile.display_name}.`;



    displayNameElement.textContent =
        profile.display_name || "Not set";


    usernameElement.textContent =
        profile.username || "Not set";


    roleElement.textContent =
        profile.role || "user";


    createdAtElement.textContent =
        new Date(profile.created_at)
        .toLocaleDateString();



    // Load permissions

    const {
        data: permissions,
        error: permissionError

    } = await supabaseClient

        .from("permissions")

        .select("*")

        .eq("user_id", user.id)

        .single();



    if (permissionError) {

        permissionsStatus.textContent =
            "No permissions found.";

        return;

    }



    if (permissions.developer_lounge_access) {


        permissionsStatus.textContent =
            "Developer Lounge Access Enabled";


    } else {


        permissionsStatus.textContent =
            "Developer Lounge Access Not Granted";


    }


}



signOutButton.addEventListener("click", async () => {


    await supabaseClient.auth.signOut();


    window.location.href = "login.html";


});



loadDashboard();
