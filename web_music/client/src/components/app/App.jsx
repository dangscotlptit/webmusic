import './App.scss';
import { useState } from 'react';
import { logoutUser } from '../../store/thunks/user';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

function ProfileDropdown({ data }) {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="relative">
      <div
        className="app__nav__profile"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          crossOrigin="anonymous"
          src={data.img}
          alt=""
          className="app__nav__profile--img"
        />
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-4 w-60 bg-[#282828] rounded-md shadow-lg z-10 cursor-pointer">
          <div className="py-1">
            <a href="/profile" className="block w-full text-left px-4 py-2 text-xl text-white-700 hover:bg-white/10 focus:outline-none">
              Thông tin tài khoản
            </a>
            
           
            <button className="block w-full text-left px-4 py-2 text-xl text-white-700 hover:bg-white/10 focus:outline-none" onClick={logoutHandler}>
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const App = (props) => {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="app">
      <div className="app__nav">
        <div className="app__nav__history">
          <div className="app__nav__history-icon">
            <RiArrowLeftSLine onClick={() => navigate(-1)} />
          </div>
          <div className="app__nav__history-icon">
            <RiArrowRightSLine onClick={() => navigate(1)} />
          </div>
        </div>
        <ProfileDropdown data={data} />
      </div>
      {props.children}
    </div>
  );
};

export default App;
