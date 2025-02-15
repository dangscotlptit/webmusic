import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import isValidEmail from "./isValidEmail";
import { toast } from "react-toastify";
import Button from "../UI/Button";
import Input from "../UI/Input";
import axios from "../../api/axios.js";

//Chức năng quên mật khẩu
const Forgot = () => {
  const {auth} = useSelector((state) => state.user.data);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidEmail(email)) {
      return toast.warn("Email không phù hợp");
    }

    try {
      await axios.post("users/forgotPassword", { email });
      toast.success("Email được gửi");
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {!auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleFormSubmit}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Input
              type="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" isLoading={loading}>Gửi lại mã</Button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Forgot;
