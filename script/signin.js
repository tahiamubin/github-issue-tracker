console.log("file connected");

function signIn () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === 'admin' && password === 'admin123'){
        
        alert("Sing In successful");
        window.location.assign("/home.html");
    }
    else{
        alert ("Sign in failed");
    }
}
signIn ();

