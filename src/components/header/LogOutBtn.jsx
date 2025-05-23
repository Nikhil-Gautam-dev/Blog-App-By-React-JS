import React from "react";
import { useDispatch } from "react-redux";
import Authentication from "../appwrite/auth";
import { logout } from "../../store/AuthSlice";
import { toast } from "react-toastify";

function LogOutBtn() {
  const dispatch = useDispatch();
  const logOutHandeler = () => {
    Authentication.logout().then(() => {
      dispatch(logout()); // yha slice ka bole to redux ka logout function call kiya gya h
      toast.success("You logout successfully");
      window.location = "/";
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logOutHandeler}
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
