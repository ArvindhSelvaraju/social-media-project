import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";

export const Post = (props) => {
  const { post, getPosts } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  useEffect(() => {
    const getLikes = async () => {
      const data = await getDocs(likesDoc);
      setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
    };
    getLikes();
  }, [likesDoc]);

  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: user.uid,
        postId: post.id,
      });
      setLikes((prev) => [...prev, { userId: user?.uid }]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev.filter((like) => like.id === likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const deletePost = async (post) => {
    const postDoc = doc(db, "posts", post.id);
    await deleteDoc(postDoc);
    if (hasUserLiked) {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
    }
    getPosts();
  };

  return (
    <div className="post">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p className="userName">@{post.username}</p>
        <div className="flex flex-row gap-5 items-center">
          {user.uid === post.userId && (
            <button
              className=" text-2xl hover:text-gray-500"
              onClick={() => deletePost(post)}
            >
              <MdDelete />
            </button>
          )}
          <div className="flex items-center gap-1">
            <button
              className="button"
              onClick={hasUserLiked ? removeLike : addLike}
            >
              {hasUserLiked ? <FcDislike/> : <FcLike />
              }
            </button>
            {likes && <label>{likes?.length}</label>}
          </div>
        </div>
      </div>
    </div>
  );
};
