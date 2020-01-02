import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBwftAFPD8XYU4sVXDyAItVYY2vXrlnUJ4",
    authDomain: "react-app-e5278.firebaseapp.com",
    databaseURL: "https://react-app-e5278.firebaseio.com",
    projectId: "react-app-e5278",
    storageBucket: "react-app-e5278.appspot.com",
    messagingSenderId: "172658392649",
    appId: "1:172658392649:web:8654080d79330e7a4ac998",
    measurementId: "G-HHHKWN9K08"
  };

class firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password); 
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(nome, email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('users').child(uid).set({
            nome: nome
        })   
    }

    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })
    }
}

export default new firebase;


