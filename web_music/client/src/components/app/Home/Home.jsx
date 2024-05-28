import "./Home.scss";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SquareList from "../../UI/SquareList";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.js";
// Trang chủ hiển thị danh sách ca khúc phổ biến và mới phát hành
const Home = () => {
  const { id, followedArtists, likedPlaylists } = useSelector(
    (state) => state.user.data,
  );
  const [topSongs, setTopSongs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  // Lấy dữ liệu từ database hiển thị danh sách
  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(`/songs?sort=-plays&limit=5`);
      const res2 = await axios.get(`/songs?sort=-createdAt&limit=5`);

      setTopSongs(res.data.data.songs);
      setNewReleases(res2.data.data.songs);
    };

    fetcher();
  }, []);

  return (
    id && (
      <>
        <div className="home__img" />
        <div className="home">
          <h1 className="h1" onClick={() => toast.success("Cảm ơn bạn đã theo dõi")}>
            Xin chào, bạn có muốn thử một vài ca khúc !?
          </h1>

          <h2 className="h2">Được yêu thích</h2>
          <SquareList list={topSongs} type={"song"} />

          <h2 className="h2">Mới phát hành</h2>
          <SquareList list={newReleases} type={"song"} />

          {followedArtists.length > 0 && (
            <>
              <h2 className="h2">Nghệ sĩ yêu thích</h2>
              <SquareList
                list={followedArtists.slice(0, 5)}
                type='artist'
              />
            </>
          )}

          {likedPlaylists.length > 0 && (
            <>
              <h2 className="h2">Danh sách yêu thích</h2>
              <SquareList list={likedPlaylists.slice(0, 5)} type='playlist' />
            </>
          )}
        </div>
      </>
    )
  );
};

export default Home;
