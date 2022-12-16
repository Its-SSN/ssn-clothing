import { signInWithGooglePopup , createUserFromAuth} from "../../utils/firebase/firebase.utils";

const SignIn = ()=>{
    const logGuestUser = async()=>{
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        createUserFromAuth(user);
    }
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGuestUser}>Sign In</button>
        </div>
    )
}

export default SignIn;