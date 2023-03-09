import { useContext,useState,useEffect } from "react";
import AuthContext from "./AuthContext";
import * as React from 'react';

import { useNavigate, Navigate } from "react-router-dom";
//import signOut from './handles/handlesubmit';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, setDoc, doc  } from "firebase/firestore";
//import Signout from "./handles/Signout";
import {firestore} from './firebase';

  
const logout = () => {
    const auth = getAuth();

    signOut(auth);
    return <Navigate replace to="/" />;
  };
  

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


const [doctor, setDoctor] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [city, setCity] = useState("");

const addDoctor = async (e) => {
  e.preventDefault();  
  const auth = getAuth();
  try {
      const docRef = await setDoc(doc(firestore, "Doctors",auth.currentUser.uid), {
        firstname: firstname,   
        lastname: lastname, 
        city: city,  
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

// useEffect(() => {

//   addDoctor();

// }, [])

const updateDoctor = async (e) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(collection(firestore, "Doctors"), {
          firstName: firstName,   
          lastName: lastName, 
          city: city,  
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return (
    <>
      <h1>Vos données</h1>


        <form className="signupForm" onSubmit={addDoctor}>
          <input
            type="name"
            name="firstname"
            value={firstname}
            placeholder="Prénom"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="name"
            name="lastname"
            value={lastname}
            placeholder="Nom"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="name"
            name="city"
            value={city}
            placeholder="Ville"
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Valider</button>
        </form>



 <button onClick={logout}>Se déconnecter</button>
    </>
  );
};

export default Profile;