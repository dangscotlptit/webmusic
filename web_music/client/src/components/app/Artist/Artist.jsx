import "./Artist.scss";
import badgeImg from "./../../../img/verify.png";
import List from "../../UI/List";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../../../store/thunks/artist";
import { replaceQueue } from "../../../store/reducers/queue";
import { followArtist, unfollowArtist } from "../../../store/thunks/user";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../UI/Loading";
import {RiPlayCircleFill} from "react-icons/ri";

// Danh sách nghệ sĩ
const Artist = () => {
  const { artist } = useSelector((state) => state.artist);
  const { followedArtists } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getArtist(id));
  }, [id]);

  const userFollowedArtist = (id) => {
    let res = followedArtists.find((obj) => obj.id === id);

    return !!res;
  };

  // Chức năng theo dõi nghệ sĩ
  const followArtistHandler = () => {
    dispatch(followArtist(artist.id));
  };
  // Chức năng hủy theo dõi nghệ sĩ
  const unfollowArtistHandler = () => {
    dispatch(unfollowArtist(artist.id));
  };

  const replaceQueueHandler = (songs) => {
    if (songs.length > 0) dispatch(replaceQueue({ songs }));
  };

  return (
    <>
      {artist ? (
        <div className="artist">
          <div className="artist__header">
            <span className="artist__badge">
              <img src={badgeImg} alt="Ảnh chứng nhận" /> Nghệ sĩ được xác minh
            </span>
            <h1 className="artist__name">{artist.name}</h1>
            <p>
              {artist.songs.reduce((acc, song) => acc + song.plays, 0)}{" "}
              người nghe hằng tháng
            </p>
          </div>

          <div className="artist__nav">
            <RiPlayCircleFill onClick={() => replaceQueueHandler(artist.songs)} />
            {!userFollowedArtist(artist.id) ? (
              <button onClick={followArtistHandler}>Theo dõi</button>
            ) : (
              <button onClick={unfollowArtistHandler}>Đang theo dõi</button>
            )}
          </div>

          <div className="artist__songs">
            <div>
              <h2 className="h2">Phổ biến</h2>
              <List list={artist.songs} />
            </div>
            {/* <div>
              <h2 className="h2">Ca khúc yêu thích</h2>
            </div> */}
          </div>
        </div>
      ) : (
        <Loading fullHeight={true} />
      )}
    </>
  );
};

export default Artist;
