firebase.auth().onAuthStateChanged(user => {
    if(user) {
        console.log(user)
        if(!user.emailVerified) {
            alert("Please, verify your email address first ! ! !");
            window.location = "login.html?#";
        } else {
            document.getElementById('body').className = "showbody"; 
            document.getElementById("displayName").innerHTML = user.displayName;
            document.getElementById("email").innerHTML = user.email;
            if(user.photoURL != null){
                firebase.firestore().collection('Users').doc(user.uid).update({
                    profile: user.photoURL
                });
                document.getElementById("userpic").src = user.photoURL;
            } else {
                document.getElementById("userpic").src = "img/Person.png";
            }
            firebase.firestore().collection('Users').doc(user.uid).get()
            .then((doc) => {
                if(doc.exists){
                    // have uid on User
                } else {
                    firebase.firestore().collection('Users').doc(user.uid).set({
                        email: user.email,
                        mobileNumber: user.phoneNumber,
                        name: user.displayName,
                        profile: user.photoURL,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: user.uid
                    });
                }
            })
            .catch((err) => {
                alert(err.message);
            });
            
        }
    } else {
        window.location = "login.html?#";
    }
});


/* Sign Out */

function SignOut() {
    firebase.auth().signOut()
    .then(function() {
        window.location = "login.html";
    })
    .catch(function(err) {
        alert(err.message);
    });
}