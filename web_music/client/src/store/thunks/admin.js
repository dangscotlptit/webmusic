import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { toast } from "react-toastify";

// Nhận danh sách ca khúc để hiển thị
export const getSongs = createAsyncThunk(
  "admin/getSongs",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/songs?personal=true`);

      return res.data.data.songs;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Tải lên ca khúc
export const uploadSong = createAsyncThunk(
  "admin/uploadSong",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/songs`, data);

      toast.success("Ca khúc được tải");

      return res.data.data.song;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//Cập nhật ca khúc
export const updateSong = createAsyncThunk(
  "admin/updateSong",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/songs/${id}`, data);

      toast.success("Ca khúc được cập nhật");

      return res.data.data.song;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

//Xóa ca khúc
export const deleteSong = createAsyncThunk("user/deleteSong", async (id) => {
  try {
    await axios.delete(`/songs/${id}`);

    toast.success("Ca khúc được xóa");
  } catch (err) {
    throw err;
  }
});
