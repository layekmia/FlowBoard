import { useState } from "react";
import logo from "../assets/logo.svg";
import { IoIosLogOut } from "react-icons/io";
import CreateBoardModal from "./CreateBoardModal";
import { signOut } from "firebase/auth";
import auth from "../config/firebase";
import { toast } from "react-toastify";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Successfully signed out.");
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/network-request-failed":
            toast.error("Network error. Please check your connection.");
            break;
          case "auth/internal-error":
            toast.error("Internal Firebase error.");
            break;
          default:
            toast.error(`Unexpected Firebase auth error: ${error.code}`);
        }
      } else {
        toast.error("An unknown error occurred while signing out:", error);
      }
    }
  };

  return (
    <>
      <nav className=" px-10 flex items-center justify-between bg-[#272727] h-[65px]">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsOpen(true)}
            className="py-2 px-4 text-sm font-bold text-black bg-[#bea4ff] transition-colors hover:bg-[#8572b2]"
          >
            Create board
          </button>
          <button
            onClick={logOut}
            className="text-white flex items-center gap-2 font-semibold py-1 px-2 hover:bg-gray-700 transition-colors"
          >
            <IoIosLogOut /> Logout
          </button>
        </div>
      </nav>
      {isOpen && <CreateBoardModal onClose={onClose} />}
    </>
  );
}
