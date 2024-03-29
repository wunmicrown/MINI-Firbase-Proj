import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBqBmUu50PVhfgTItFCYKcFxMYXm81IeM",
    authDomain: "proccesproj.firebaseapp.com",
    projectId: "proccesproj",
    storageBucket: "proccesproj.appspot.com",
    messagingSenderId: "797162819436",
    appId: "1:797162819436:web:827530f2defe98c7242d49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

//   Google Sign In
const gLogin = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            if (user) {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "index.html";
            }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};
window.gLogin = gLogin;

//   Github Login
const gitLogin = () => {
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            let user = result.user
            console.log(user);
            if (user) {
                window.location.href = "dashboard.html"
            } else {
                window.location.href = "index.html"
            }
        })
        .catch((err) => {
            let errorCode = err.code
            let errorMsg = err.message
            console.log(errorCode, errorMsg);
            if (errorCode == "auth/account-exists-with-different-credential") {
                emptyError.style.display = "block"
                emptyError.textContent = "An account already exist with this email address";
                emptyError.style.color = "orange"
                setTimeout(() => {
                    emptyError.style.display = "none"
                }, 3000)
            }
        })
}
window.gitLogin = gitLogin

// Twitter Sign In//
const twitLog = () => {
    signInWithPopup(auth, twitterProvider)
        .then((result) => {
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;
            console.log(token, secret);
            const user = result.user
            console.log(user);
            if (user) {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "index.html";
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            console.log(errorCode, errorMessage, email);
        })
}
window.twitLog = twitLog
// Sign Up page //
const signUp = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let fname = document.getElementById('firstname').value
    let lname = document.getElementById('lastname').value

    if (email != "" && password != "" && fname != "" && lname != "") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user);
                if (email == user.email){
                    emptyError.textContent = " Sign Up Successful!";
                    emptyError.style.color = "lime"
                    setTimeout(() => {
                    }, 3000);
                    window.location.href = "index.html"
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode == "auth/email-already-in-use") {
                    emptyError.textContent = "An account already exist with this email address";
                    emptyError.style.color = "orange"
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
                document.getElementById('firstname').value = ""
                document.getElementById('lastname').value = ""
            })
    } else {
        emptyError.textContent = "Please fill in the empty spaces provided";
        emptyError.style.color = "red"
        setTimeout(() => {
            emptyError.style.display = "none"
        }, 3000)
    }

}
window.signUp = signUp
// Sign In Page
const signIn = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    console.log(email);
    console.log(password);
    if (email != "" && password != "") {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                if (user !== "auth/invalid-login-credentials") {
                    emptyError.textContent = "Successfully logged in!";
                    emptyError.style.color = "lime";
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000);
                
                    window.location.href = "dashboard.html";
                } else {
                    window.location.href = "index.html";
                    emptyError.textContent = "invalid-login-credentials";
                    emptyError.style.color = "red";
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if(errorCode =="auth/invalid-login-credentials") {
                    emptyError.textContent = "invalid-login-credentials";
                    emptyError.style.color = "red";
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                if (errorCode  == "auth/invalid-email") {
                    emptyError.textContent = "Incorrect email or password";
                    emptyError.style.color = "orange";
                    setTimeout(() => {
                        emptyError.style.display = "none"
                    }, 3000)
                }
                
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
            });
    } else {
        emptyError.textContent = "Please fill in the empty spaces provided";
        emptyError.style.color = "red"
        setTimeout(() => {
            emptyError.style.display = "none"
        }, 3000)
    }
}
window.signIn = signIn
