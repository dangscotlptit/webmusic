import "./Playlist.scss";
import { IoPlayCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import List from "../../UI/List";
import { replaceQueue } from "../../../store/reducers/queue";

// Danh sách ca khúc hiển thị những ca khúc mà người dùng yêu thích 
const Playlist = () => {
  const likedSongs = useSelector((state) => state.user.data.likedSongs);
  const dispatch = useDispatch();

  const replaceQueueHandler = (songs) => {
    dispatch(replaceQueue({ songs }));
  };

  return (
    <>
      {likedSongs ? (
        <div className="playlist likedSongs">
          <div className="playlist__header">
            <div>
              <h1 className="playlist__name">Ca khúc yêu thích</h1>
              <div className="playlist__user">
                <span>Bạn có {likedSongs.length} ca khúc</span>
              </div>
            </div>
          </div>

          <div className="playlist__nav">
            <IoPlayCircle onClick={() => replaceQueueHandler(likedSongs)} />
          </div>

          <div className="playlist__songs">
            <List list={likedSongs} />
          </div>
        </div>
      ) : (
        <div>Đang tải</div>
      )}
    </>
  );
};

export default Playlist;
