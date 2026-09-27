const authForm = document.getElementById("authForm");
const loginButton = document.getElementById("loginButton");
const authMessage = document.getElementById("authMessage");


authForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;


    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });


    if (error) {

        authMessage.textContent = error.message;

        return;
    }


    authMessage.textContent =
        "Account created! Check your email if confirmation is required.";

});


loginButton.addEventListener("click", async function() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;


    if (!email || !password) {

        authMessage.textContent =
            "Enter your email and password first.";

        return;
    }


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (error) {

        authMessage.textContent = error.message;

        return;
    }


    authMessage.textContent =
        "Login successful! 🎉";

});