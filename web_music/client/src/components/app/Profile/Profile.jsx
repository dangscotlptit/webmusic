import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  updateUser,
  becomeArtist,
  logoutUser,
} from "../../../store/thunks/user";
import { useRef } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import {RiLogoutBoxLine} from "react-icons/ri";

// Hiển thị thông tin người dùng
const Profile = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const formInfoRef = useRef();
  const formPassRef = useRef();

  const formInfoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formInfoRef.current);

    dispatch(updateUser(formData));
  };

  const formPassHandler = (e) => {
    e.preventDefault();

    const data = {
      currentPassword: e.target[0].value,
      password: e.target[1].value,
      passwordConfirm: e.target[2].value,
    };

    dispatch(updatePassword(data));
  };

  const becomeArtistHandler = () => {
    dispatch(becomeArtist());
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {user.name ? (
        <div className="profile">
          <div className="profile__header">
            <div className="profile__photo">
              <img src={user.img} alt="Hình nền" />
            </div>
            <div className="profile__info">
              <span>Thông tin</span>
              <h1 className="profile__name">{user.name}</h1>
              <span>{user.followedArtists.length} Đang theo dõi</span>
            </div>
          </div>
          <div className="profile__body">
            <div className="profile__form">
              <h2>Cập nhật thông tin</h2>
              <form ref={formInfoRef} onSubmit={formInfoHandler}>
                <label htmlFor="name">Tên </label>
                <Input
                  type="text"
                  name="name"
                  minLength="3"
                  maxLength="24"
                  placeholder={user.name}
                />
                <label htmlFor="email">Email</label>
                <Input type="text" name="email" placeholder={user.email} />
                <label htmlFor="photo">Hình ảnh</label>
                <Input type="file" name="photo" accept="image/*" />
                <Button type="submit">Cập nhật</Button>
              </form>
              <h2>Cập nhật mật khẩu</h2>
              <form ref={formPassRef} onSubmit={formPassHandler}>
                <label htmlFor="oldPassword">Mật khẩu cũ</label>
                <Input
                  type="password"
                  name="oldPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="newPassword">Mật khẩu mới</label>
                <Input
                  type="password"
                  name="newPassword"
                  minLength="8"
                  maxLength="16"
                />
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  minLength="8"
                  maxLength="16"
                />
                <Button type="submit">Cập nhật</Button>
              </form>
              {user.role === "user" && (
                <p
                  onClick={becomeArtistHandler}
                  style={{ color: "#22c55e", cursor: "pointer" }}
                >
                  Trở thành nghệ sĩ
                </p>
              )}
              <p
                onClick={logoutHandler}
                style={{ color: "#ef4444", cursor: "pointer" }}
              >
                <RiLogoutBoxLine /> Đăng xuất
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>Bạn chưa đăng nhập ư!!</div>
      )}
    </>
  );
};

export default Profile;
