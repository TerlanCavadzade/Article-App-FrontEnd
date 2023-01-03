
import { useEffect } from "react";
import AuthForm from "../components/Auth/AuthForm";
import { titleChangeHandler } from "../utilities/titleChange";

const AuthPage = () => {
  useEffect(()=>{
    titleChangeHandler("Authontication - Name")
    
  },[])
  return (
      <AuthForm />
  );
};

export default AuthPage;
