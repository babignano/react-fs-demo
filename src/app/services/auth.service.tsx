import app from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import config from '../firebase';

export const AuthContext = React.createContext(null);

export class Auth {
    auth: app.auth.Auth;

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password).then()

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    getUser = () => this.auth.currentUser;
}
