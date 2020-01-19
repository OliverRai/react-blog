import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


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

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    //Referenciando a database para acessar em outros locais
    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout(){
    return app.auth().signOut();
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })

  }

  isInitialized(){
      return new Promise(resolve =>{
          app.auth().onAuthStateChanged(resolve);
      })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);

  }

}

export default new Firebase();