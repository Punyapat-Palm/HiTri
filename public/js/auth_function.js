function SignUp() { 
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmpassword").value;


    if(username){
        // pass next step
    } else {
        alert("Enter your username.");
    }
    if(password != confirmpassword) {
        document.getElementById("cfpaswo").style.border = "2px solid #ff646cf5";
        alert("Password didn't match try again.");
    } else {
        document.getElementById("cfpaswo").style.border = "0px solid #ff646cf5";
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            var user = firebase.auth().currentUser;
            user.updateProfile({ displayName: username });
            user.sendEmailVerification()
            .then(function() {
                alert('A Verification Email has been sent to your email already!!');
            })
            .catch(function(err) {
                alert(err.message);
            });
        })
        .catch(function(err) {
            alert(err.message);
        });
    }
}

/* Sign Up */

function Login() {
    const email = document.getElementById("email1").value;
    const password = document.getElementById("password1").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
        window.location = "index.html";
    })
    .catch(function(err) {
        alert(err.message);
    });
}

function rspass() {
    let email = prompt("Enter your email for reset");

    if(email){
        firebase.auth().sendPasswordResetEmail(email)
            .then(function() {
                alert("A email for reset password was sent to " + email);
            })
            .catch(err => {
                alert(err.message);
        });
    } else {
        alert("Please enter your email ! ! !");
    }
}

function gole() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(googleProvider)
    .then(() => {
        window.location = "index.html";
    })
    .catch(err => {
        alert(err.message);
    });
}

function lgfb() {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(facebookProvider)
    .then(() => {
        window.location = "index.html";
    })
    .catch(err => {
        alert(err.message);
    })
}
