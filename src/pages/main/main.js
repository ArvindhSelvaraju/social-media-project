import { getDocs, collection } from "firebase/firestore";
import { db,auth } from "../../config/firebase";
import { useState , useEffect } from "react";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";

export const Main = () => {
  const [postsList, setPostsList] = useState(null);

  const postsRef = collection(db, "posts");

  const [user] =useAuthState(auth);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {user ? postsList?.map((post) => (
        <Post post={post} getPosts={getPosts} />
      )) : <h1 className="flex items-center justify-center font-bold text-3xl m-10">Login to view posts...</h1>}
      
    </div>
  );
};
