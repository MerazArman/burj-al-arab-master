import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedUser , setLoggedUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
   
    var provider = new firebase.auth.GoogleAuthProvider();
   const handleGoogleSignIn =()=>{
    
   
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // var token = result.credential.accessToken;
    const {displayName , email} = result.user;
    const signInUser = {name: displayName , email}
        setLoggedUser(signInUser)
        history.replace(from)
        console.log(signInUser)
        // ...
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // ...
      });
   }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}> GOOGLE </button>
        </div>
    );
};

export default Login;