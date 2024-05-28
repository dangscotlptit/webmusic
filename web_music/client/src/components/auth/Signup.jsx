import "./Auth.scss";
import logo from "../../img/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { signupUser } from "../../store/thunks/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import isValidEmail from "./isValidEmail";
import Button from "../UI/Button";
import Input from "../UI/Input";

// Chức năng đăng ký
const Signup = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //Đăng ký
  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm)
      return toast.warn("Mật khẩu không chính xác");
    else if (!isValidEmail(email)) {
      return toast.warn("Email không phù hợp");
    }

    dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleSignup}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo"/>
            <Link to="/login" className="auth__form-link">
              Đăng nhập
            </Link>
            <Input
              name="name"
              placeholder="Tên"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type={email}
              name="email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Xác nhận mật khẩu"
              required={true}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button type="submit">
              {user.loading ? "Đang tải" : "Đăng ký"}
            </Button>
          </form>

          
        </div>
      ) : (
        <Navigate to={"/"}/>
      )}
    </>
  );
};

export default Signup;
