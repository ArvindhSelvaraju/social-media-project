import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {addDoc,collection} from "firebase/firestore"
import {db} from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title:yup.string().required("You must add a title."),
        description:yup.string().required("You must add a description."),
    });

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(schema),
    });

    const postsRef = collection(db,"posts");

    const onCreatePost =async (data) => {
        await addDoc(postsRef,{
          ...data,
          username:user?.displayName,
          userId:user?.uid,
        });

        navigate("/");
    };

    return (
      <form className="w-auto h-auto mt-[50px] pt-[30px] pr-[20px] pb-[30px] pl-[20px] bg-[slateblue] rounded-xl" onSubmit={handleSubmit(onCreatePost)}>
        <input className="text-2xl px-2 py-1 my-4 rounded-lg font-semibold" placeholder="Title..." {...register("title")} />
        <p style={{ color: "aliceblue" }}>{errors.title?.message}</p>
        <textarea className="text-xl px-2 py-1 my-4 h-24 w-auto rounded-lg" placeholder="Description..." {...register("description")} />
        <p style={{ color: "aliceblue" }}>{errors.description?.message}</p>
        <input type="submit" className="bg-white cursor-pointer my-4 text-lg p-2 rounded-lg hover:text-xl hover:font-bold" />
      </form>
    );
}