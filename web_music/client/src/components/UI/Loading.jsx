import "./Loading.scss";
import loadingSvg from "./../../img/loading.svg";
import { Link } from "react-router-dom";

const Loading = ({ main = false, fullHeight = false }) => {
  return (
    <div className={`loading ${fullHeight && "full-height"}`}>
      <img src={loadingSvg} alt="Loading spinner" />
      {main && (
        <>
          <p>
            Bạn chưa có tài khoản,&nbsp;
            <Link to="signup">Đăng ký tại đây</Link>
          </p>
          
        </>
      )}
    </div>
  );
};

export default Loading;
