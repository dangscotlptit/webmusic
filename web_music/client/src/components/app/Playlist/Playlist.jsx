import "./Playlist.scss";
import "./../../UI/Modal.scss";

import {
  IoCloseCircle,
  IoHeart,
  IoHeartOutline,
  IoPlayCircle,
} from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import {
  getPlaylist,
  likePlaylist,
  dislikePlaylist,
  updatePlaylist,
} from "../../../store/thunks/playlist";
import { useDispatch, useSelector } from "react-redux";
import List from "../../UI/List";
import { useNavigate, useParams } from "react-router-dom";
import { replaceQueue } from "../../../store/reducers/queue";
import { deletePlaylist, getAllPlaylists } from "../../../store/thunks/user";
import Loading from "../../UI/Loading";
import Button from "../../UI/Button";
import {RiEditCircleLine} from "react-icons/ri";

// Danh sách ca khúc mà người dùng đưa vào danh sách của mình, có thêm chức năng xóa playlist 
const Playlist = () => {
  const [modal, setModal] = useState(false);

  const userId = useSelector((state) => state.user.data.id);
  const { playlist } = useSelector((state) => state.playlist);
  const likedPlaylists = useSelector((state) => state.user.data.likedPlaylists);
  const dispatch = useDispatch();

  const formRef = useRef();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlaylist(id));
  }, [id]);

  const replaceQueueHandler = (songs) => {
    if (songs.length > 0) dispatch(replaceQueue({ songs }));
  };

  const openModalHandler = () => {
    if (playlist.user.id === userId) setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    await dispatch(updatePlaylist({ data: formData, id: playlist.id }));
    await dispatch(getAllPlaylists());
    setModal(false);
  };

  const deletePlaylistHandler = (id) => {
    dispatch(deletePlaylist(id));
    navigate("/");
  };

  // Chức năng theo dõi hoặc bỏ theo dõi danh sách trên dữ liệu
  const likePlaylistHandler = (id) => dispatch(likePlaylist(id));

  const dislikePlaylistHandler = (id) => dispatch(dislikePlaylist(id));

  const userLikedPlaylist = (id) => {
    let pl = likedPlaylists.find((obj) => obj.id === id);

    return !!pl;
  };

  return (
    <>
    {/* Hiển thị thông tin danh sách */}
      {userId && playlist ? (
        <div className="playlist">
          <div className="playlist__header">
            <div className="playlist__img">
              <img src={playlist.img} alt="Danh sách" />
            </div>
            <div>
              <p>Danh sách</p>
              <h1 className="playlist__name">{playlist.name}</h1>
              {playlist.description && (
                <p className="playlist__des">{playlist.description}</p>
              )}
              <div className="playlist__user">
                <img
                  className="playlist__user-img"
                  src={playlist.user.img}
                  alt="user"
                />
                <span className="playlist__user-name">
                  {playlist.user.name}
                </span>
                <span className="playlist__user-songs">
                  {playlist.songs.length} ca khúc
                </span>
              </div>
            </div>
          </div>
          
          {/* Khởi chạy danh sách */}
          <div className="playlist__nav">
            <IoPlayCircle onClick={() => replaceQueueHandler(playlist.songs)} />
            {/* Chức năng liên quan đến danh sách ca khúc */}
            {playlist.user.id !== userId &&
              (userLikedPlaylist(playlist.id) ? (
                <IoHeart
                  className="heart heart--active"
                  onClick={() => dislikePlaylistHandler(playlist.id)}
                />
              ) : (
                <IoHeartOutline
                  className="heart"
                  onClick={() => likePlaylistHandler(playlist.id)}
                />
              ))}
            {/* Chức năng chỉnh sửa thông tin danh sách ca khúc, người dùng có thể chỉnh sửa thông tin, một modal hiển thị */}
            {playlist.user.id === userId && (
              <RiEditCircleLine
                onClick={openModalHandler}
                style={{
                  fontSize: "3.2rem",
                  color: "#fff",
                }}
              />
            )}
          </div>

          <div className="playlist__songs">
            <List list={playlist.songs} onPlaylist={true} pId={playlist.id} />
          </div>
        </div>
      ) : (
        <Loading fullHeight={true} />
      )}

      {modal && (
        <div className="modal modal--playlist">
          <div className="modal__header">
            <h2>Chỉnh sửa thông tin</h2>
            <div className="modal__close">
              <IoCloseCircle onClick={closeModalHandler} />
            </div>
          </div>
          <form
            className="modal__form"
            ref={formRef}
            onSubmit={formSubmitHandler}
          >
            <div className="modal__img">
              <img src={playlist.img} alt="Danh sách" />
              <input type="file" name="img" />
            </div>
            <div>
              <input type="text" name="name" placeholder={playlist.name} />
              <textarea
                name="description"
                cols="30"
                placeholder="Thay đổi thông tin"
              ></textarea>
              <Button type="submit" color="white" fullWidth={true}>
                Lưu
              </Button>
              <Button
                color="red"
                fullWidth={true}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("123");
                  deletePlaylistHandler(playlist.id);
                }}
              >
                Xóa
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Playlist;
