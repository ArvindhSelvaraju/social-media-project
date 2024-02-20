import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="mr-14">
        <Link className="text-white underline text-2xl m-4" to="/">
          Home
        </Link>
        {user ? (
          <Link className="text-white underline text-2xl m-4" to="/createpost">
            Create Post
          </Link>
        ) : (
          <Link className="text-white underline text-2xl m-4" to="/login">
            Login
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center mr-10">
        {user && (
          <>
            <p className="text-white mr-3 text-xl">{user?.displayName}</p>
            <img className="h-10 w-10 rounded-full mr-5"
              src={user?.photoURL}
              width="30px"
              height="30px"
              alt="profile"
            />
            <button className="text-white font-medium text-xl py-1.5 px-1.5 hover:bg-white hover:text-black hover:rounded-lg hover:text-2xl" onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
