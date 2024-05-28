import "./Admin.scss";
import "./../UI/Modal.scss";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSong,
  getSongs,
  updateSong,
  uploadSong,
} from "../../store/thunks/admin";
import List from "../UI/List";
import { IoCloseCircle } from "react-icons/io5";
import Loading from "../UI/Loading";
import Button from "../UI/Button";
import ModalWrapper from "../UI/ModalWrapper";
import Input from "../UI/Input";

// Chức năng của nghệ sĩ có thể tải ca khúc mới hoặc chỉnh sửa ca khúc được tải lên của mình
const Admin = () => {
  const [song, setSong] = useState({});
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { songs, isUploading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const formRef = useRef();
  const editFormRef = useRef();

  useEffect(() => {
    dispatch(getSongs());
  }, []);

  // Chức năng tải ca khúc mới
  const handleOpenModal = () => setUploadModalOpen(true);
  const handleCloseModal = () => setUploadModalOpen(false);
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    dispatch(uploadSong({ data: formData }));
  };

  // Chức năng cập nhật ca khúc được tải
  const handleOpenEditModal = (id) => {
    const song = songs.find((song) => song.id === id);
    setSong(song);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);
  const editFormSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(editFormRef.current);
    dispatch(updateSong({ data: formData, id: song.id }));
    setEditModalOpen(false);
  };

  // Chức năng xóa ca khúc
  const deleteSongHandler = (id) => {
    dispatch(deleteSong(id));
    setEditModalOpen(false);
  };

  // Nếu ca khúc được tải thành công hoặc người dùng nhấn vào nút thoát thì form sẽ đóng
  const uploadModal = () => {
    
    if (isUploading === "idle" || isUploading === "uploading")
      return (
        <ModalWrapper
          heading="Tải ca khúc"
          open={uploadModalOpen}
          handleClose={handleCloseModal}
        >
          <form ref={formRef} onSubmit={formSubmitHandler}>
            <label htmlFor="img">Hình ảnh</label>
            <Input id="img" type="file" name="img" placeholder="Img" />

            <label htmlFor="song">Ca khúc</label>
            <Input type="file" name="song" id="song" />

            <label htmlFor="name">Tên ca khúc</label>
            <Input type="text" name="name" id="name" placeholder="Tên" />

            <Button type="submit" color="white" fullWidth={true}>
              {isUploading === "idle" && "Tải nhạc"}
              {isUploading === "uploading" && "Đang tải"}
            </Button>
          </form>
        </ModalWrapper>
      );
  };

  const editModal = () => {
    return (
      <ModalWrapper
        heading="Tải ca khúc"
        open={editModalOpen}
        handleClose={handleCloseEditModal}
      >
        <form ref={editFormRef} onSubmit={editFormSubmitHandler}>
          <img src={song.img} alt="Ca khúc" />
          <Input type="file" name="img" placeholder="Hình ảnh" />

          <label htmlFor="name">Tên ca khúc</label>
          <Input id="name" type="text" name="name" placeholder={song.name} />

          <Button type="submit" color="white" fullWidth={true}>
            Cập nhật ca khúc
          </Button>
          <Button
            color="red"
            fullWidth={true}
            onClick={(e) => {
              e.preventDefault();
              deleteSongHandler(song.id);
            }}
          >
            Xóa ca khúc
          </Button>
        </form>
      </ModalWrapper>
    );
  };

  return (
    <>
      {songs ? (
        <div className="admin">
          <div className="admin__header ">
            <div className="admin__card ">
              <span>{songs.length}</span> Ca khúc
            </div>
            <div className="admin__card ">
              <span>{songs.reduce((acc, song) => acc + song.plays, 0)}</span>
              Lượt nghe
            </div>
            <div className="admin__card" onClick={handleOpenModal}>
              <span className="font-bold text-white text-6xl">+</span> Tải ca khúc mới
            </div>
          </div>
          <div className="admin__list">
            <List list={songs} admin={true} handler={handleOpenEditModal} />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {uploadModal()}
      {editModal()}

      {song && editModalOpen && "bad" === "good" && (
        <div className="modal modal--admin">
          <div className="modal__header">
            <h2>Tải ca khúc mới</h2>
            <div className="modal__close">
              <IoCloseCircle onClick={handleCloseEditModal} />
            </div>
          </div>
          <form
            ref={editFormRef}
            className="modal__form"
            onSubmit={editFormSubmitHandler}
          >
            <img src={song.img} alt="Ca khúc" />
            <input type="file" name="img" id="img" placeholder="Hình ảnh" />
            <label htmlFor="name">Tên ca khúc</label>
            <input type="text" name="name" id="name" placeholder={song.name} />

            <Button type="submit" color="white" fullWidth={true}>
              Cập nhật ca khúc
            </Button>
            <Button
              color="red"
              fullWidth={true}
              onClick={(e) => {
                e.preventDefault();
                deleteSongHandler(song.id);
              }}
            >
              Xóa ca khúc
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;
