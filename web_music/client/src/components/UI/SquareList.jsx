import "./SquareList.scss";
import { Link } from "react-router-dom";
import { replaceQueue } from "../../store/reducers/queue.js";
import { useDispatch } from "react-redux";
import { RiPlayCircleFill } from "react-icons/ri";

// Danh sách ca khúc
const squareList = ({ list, type = "song" }) => {
  const dispatch = useDispatch();

  const handlePlaySong = (e, song) => {
    if (type !== 'song') return;
    e.preventDefault();

    dispatch(replaceQueue({ songs: [song], i: 0, id: song.id }));
  }

  
  return (
    <div className="square-list">
      {list.map((el) => (
        <Link
          key={el.id}
          to={
            type === "artist" || type === "playlist" ? `/${type}/${el.id}` : ""
          }
          className={`square-card ${type === "artist" ? 'square-card--artist' : ''}`}
          onClick={(e) => handlePlaySong(e, el)}
        >
          <img src={el.img} alt={el.name}/>
          <div className="square-card__name">{el.name}</div>
          <span>{type}</span>

          {type === "song" && <RiPlayCircleFill className="square-card__btn"/>}
        </Link>
      ))}
    </div>
  );
};

export default squareList;
