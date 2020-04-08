import  "./config";
import "firebase/auth";
import * as firebase from "firebase";

const auth = firebase.auth();

export const singUp = user => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(() => resolve(true))
            .catch(error => reject(error));
    });
};

export const authenticateUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject();
            }
        });
    });
};

export const sendEmailVerification = () => {
    auth.currentUser.sendEmailVerification().then(function() {
        console.log('email sent');
    }).catch(function(error) {
        console.error(error);
    });
};
