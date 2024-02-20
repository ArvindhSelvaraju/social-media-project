import { auth, provider } from "../config/firebase";
import { signInWithPopup } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/');
    }

    return(
        <div className="mt-10 w-full h-auto flex-row justify-center">
            <h1 className="text-2xl font-bold mb-7">Sign In With Google To Continue...</h1>
            <button className="text-xl font-bold bg-slate-400 py-1.5 px-3 text-medium rounded-full hover:bg-[slateblue] hover:text-white" onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    );
}