import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc,getDocs,query,where,limit,setDoc,addDoc,updateDoc,deleteField} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "meli-clon-2022.firebaseapp.com",
    projectId: "meli-clon-2022",
    storageBucket: "meli-clon-2022.appspot.com",
    messagingSenderId: process.env.FIREBASE_MSG_ID,
    appId: process.env.FIREBASE_APP_ID
};


export const initializeFirebaseService = () => {
    const app = initializeApp(firebaseConfig);
    return app;
}

export const getUser = async (id) => {
    let result = null;
    const db = getFirestore();
    const user = doc(db, 'users', id);

    await getDoc(user)
        .then(res => result = {id:res.id,...res.data()})
        .catch(err => console.log("error in service - getUser"))

    return result;
}

export const comparePasswords = async (id,password) =>{
    let validPassword = false;

    const db = getFirestore();
    const user = doc(db, 'users', id);

    await getDoc(user)
        .then(res => {
            //console.log({id:res.id,...res.data()});
            validPassword = bcrypt.compareSync(password,res.data().password)
            validPassword && localStorage.setItem("uid",res.id)
        })
        .catch(err => console.log("error in service - comparePasswords"))
    return validPassword;
}

export const getUsers = () =>{
    const db = getFirestore();
    const users = collection(db,'users');

    getDocs(users)
        .then(res => {
            res.docs.map((doc)=> (
                console.log({id:doc.id, ...doc.data()})
            ))
        })
        .catch(err => console.log("error in service - getUsers"))
}
 
export const getSpecificUserByEmail = async (email = "stivendiazh@gmail.com") =>{
    let result = false;

    const db = getFirestore();
    const queryResult = query(
        collection(db,'users'),
        where("email","==",email)
        //limit(1)
    );

    await getDocs(queryResult)
        .then((res )=> {
            res.size === 0 ? 
                console.log("this user doesn't exist") 
                :
                res.docs.map((doc)=> (
                    result = ({id:doc.id, ...doc.data()})
                ))
        })
        .catch(err => console.log("error in service - getUsers"))

    return result
}

export const insertNewUser = async ({email,password,username,phone = null}) =>{
    let result = null
    bcrypt.hash(password, 13, (err, hash)=> {
        password = hash;
    });
    const db = getFirestore();
    await getSpecificUserByEmail(email)
        .then(res => result = res)
        .catch(err => console.log("err executing getSpecificUserByEmail"))

    !result &&
        await addDoc(collection(db, "users"), {
            email,
            password,
            username,
            phone
        })
            .then(res => localStorage.setItem("uid",res.id))
            .catch(err => console.log("err inserting new user!"))
}

export const updateCart = (docId,cart = [],quantitySelected = []) =>{
    const db = getFirestore()
    updateDoc(doc(db, "users", docId),{
        cart:cart === [] ? deleteField() : cart,
        quantitySelected: quantitySelected === [] ? deleteField() : quantitySelected
    })
}