import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { toast } from "react-toastify";

// Nhận danh sách để hiển thị
export const getPlaylist = createAsyncThunk(
  "playlist/getPlaylist",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/playlists/${id}`);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
// Cập nhật danh sách
export const updatePlaylist = createAsyncThunk(
  "playlist/editPlaylist",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/playlists/${id}`, data);

      toast.success("Danh sách được cập nhật");

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Yêu thích danh sách
export const likePlaylist = createAsyncThunk(
  "playlist/likePlaylist",
  async (id) => {
    try {
      const res = await axios.post(`/playlists/likes/add`, {
        playlist: id,
      });

      toast.success("Được lưu vào thư viện");

      return res.data.playlists;
    } catch (err) {
      console.log(err);
    }
  },
);

// Bỏ yêu thích
export const dislikePlaylist = createAsyncThunk(
  "playlist/dislikePlaylist",
  async (id) => {
    try {
      const res = await axios.post(`/playlists/likes/remove`, {
        playlist: id,
      });

      toast.success("Loại bỏ khỏi thư viện");

      return res.data.playlists;
    } catch (err) {
      console.log(err);
    }
  },
);
