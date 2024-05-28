import { createSlice } from "@reduxjs/toolkit";
import { getSongs, uploadSong } from "../thunks/admin";
import { toast } from "react-toastify";

const adminSlice = createSlice({
  name: "playlist",
  initialState: {
    songs: null,
    isUploading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Thêm ca khúc
      .addCase(getSongs.fulfilled, (state, action) => {
        state.songs = action.payload;
      }) 
      
      // Tải lên ca khúc
      .addCase(uploadSong.pending, (state) => {
        state.isUploading = "uploading";
      })
      .addCase(uploadSong.fulfilled, (state, action) => {
        state.isUploading = "success";

        state.songs = [...state.songs, action.payload];
      })
      .addCase(uploadSong.rejected, (state, action) => {
        state.isUploading = "failed";

        toast.error(action.payload.response.data.message);
      });
  },
});

export default adminSlice.reducer;
