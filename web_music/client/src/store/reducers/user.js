import { createSlice } from "@reduxjs/toolkit";
import {
  dislikeSong,
  followArtist,
  isLoggedIn,
  likeSong,
  loginUser,
  resetPassword,
  signupUser,
  unfollowArtist,
  becomeArtist,
  updateUser,
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  logoutUser,
} from "../thunks/user";
import { dislikePlaylist, likePlaylist } from "../thunks/playlist";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    auth: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder // Đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.auth = false;

        toast.error(action.payload.response.data.message);
      })

      // Đăng ký
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload.response.data.message);
      })

      // Đã đăng nhập chưa
      .addCase(isLoggedIn.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.auth = true;
      })
      .addCase(isLoggedIn.rejected, (state, action) => {
        state.auth = false;

        toast.error(action.payload.response.data.message);
      })

      // Cập nhật tài khoản
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data.name = action.payload.user.name;
        state.data.img = action.payload.user.img;
      })

      // Thay đổi mật khẩu
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.data = action.payload.data.user;
        state.auth = true;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload.response.data.message);
      })

      // Đăng xuất
      .addCase(logoutUser.fulfilled, (state) => {
        state.auth = false;
      })

      // Thích ca khúc
      .addCase(likeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })

      // Bỏ thích ca khúc
      .addCase(dislikeSong.fulfilled, (state, action) => {
        state.data.likedSongs = action.payload;
      })

      // Theo dõi nghệ sĩ
      .addCase(followArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      })

      // Bỏ theo dõi nghệ sĩ
      .addCase(unfollowArtist.fulfilled, (state, action) => {
        state.data.followedArtists = action.payload;
      })

      // Trở thành nghệ sĩ
      .addCase(becomeArtist.fulfilled, (state) => {
        state.data.role = "artist";
      })

      // Nhận dữ liệu danh sách
      .addCase(getAllPlaylists.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      })

      // Tạo danh sách
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      })

      // Xóa danh sách
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.data.playlists = action.payload;
      })

      // Thích danh sách
      .addCase(likePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      })

      // Bỏ thích danh sách
      .addCase(dislikePlaylist.fulfilled, (state, action) => {
        state.data.likedPlaylists = action.payload;
      });
  },
});

export default userSlice.reducer;
