import React from "react";
import { app } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { signIn } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

export default function OAuth({ text }) {
    const dispatch = useDispatch();
    const auth = getAuth(app);

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle);
            const res = await fetch(`${baseUrl}/auth/google`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                dispatch(signIn(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type='button' className='outline-none' color='primary' onClick={handleGoogleClick} >
            <span className='mx-2'>{text} </span>
            <FaGoogle />
        </Button>
    );
}
