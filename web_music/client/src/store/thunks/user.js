import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Đăng nhập
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/login", {
        email,
        password,
      });

      toast.success("Đăng nhập thành công");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  },
);

// Đăng ký
export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      toast.success("Chào mừng bạn !");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Đăng nhập
export const isLoggedIn = createAsyncThunk(
  "user/isLoggedIn",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users/isLoggedIn");

      toast.success("Chào mừng bạn trở lại");

      return { data: res.data.data.user, auth: true };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Cập nhật tài khoản
export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const res = await axios.patch("/users/updateMe", data);

    toast.success("Dữ liệu được cập nhật ");
    return res.data.data;
  } catch (err) {
    throw err;
  }
});

//Quên mật khẩu
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data) => {
    try {
      await axios.post("users/forgotPassword", data);

      toast.success("Email được gửi");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
);

// Thay đổi mật khẩu
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/resetPassword/${data.id}`, data);

      toast.success("Thay đổi mật khẩu");

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Cập nhật mật khẩu
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data) => {
    try {
      await axios.patch("/users/updatePassword", data);

      toast.success("Cập nhật mật khẩu");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
);

// Đăng xuất
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const res = await axios.get("users/logout");
    await toast.success(res.data.message);
  } catch (err) {
    console.log(err);
  }
});

// Yêu thích ca khúc
export const likeSong = createAsyncThunk("song/likeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/add", {
      song: id,
    });

    toast.success("Ca khúc được thêm vào Ca khúc yêu thích");

    return res.data.songs;
  } catch (err) {
    throw err;
  }
});

// Bỏ yêu thích ca khúc
export const dislikeSong = createAsyncThunk("song/dislikeSong", async (id) => {
  try {
    const res = await axios.post("/users/likes/remove", {
      song: id,
    });

    toast.success("Ca khúc được loại bỏ khỏi Ca khúc yêu thích");

    return res.data.songs;
  } catch (err) {
    throw err;
  }
});

// Theo dõi nghệ sĩ
export const followArtist = createAsyncThunk(
  "user/followArtist",
  async (id) => {
    try {
      const res = await axios.post(`/users/follow/${id}`);

      toast.success("Theo dõi nghệ sĩ");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

// Hủy theo dõi nghệ sĩ
export const unfollowArtist = createAsyncThunk(
  "user/unfollowArtist",
  async (id) => {
    try {
      const res = await axios.post(`/users/unfollow/${id}`);

      toast.success("Hủy theo dõi nghệ sĩ");

      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
);

// Trở thành nghệ sĩ
export const becomeArtist = createAsyncThunk("user/becomeArtist", async () => {
  try {
    await axios.patch("/users/becomeArtist");

    toast.success("Bạn đã trở thành nghệ sĩ");
  } catch (err) {
    throw err;
  }
});

// Nhận danh sách để hiển thị
export const getAllPlaylists = createAsyncThunk(
  "user/getAllPlaylists",
  async () => {
    try {
      const res = await axios.get("/playlists");

      return res.data.data.playlists;
    } catch (err) {
      throw err;
    }
  },
);

// Tạo danh sách
export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async () => {
    try {
      const res = await axios.post("/playlists");

      toast.success("Danh sách được thêm vào");

      return res.data.data.user.playlists;
    } catch (err) {
      throw err;
    }
  },
);
//Xóa danh sách
export const deletePlaylist = createAsyncThunk(
  "user/deletePlaylist",
  async (id) => {
    try {
      const res = await axios.delete(`/playlists/${id}`);

      toast.success("Danh sách bị loại bỏ");
      return res.data.data.playlists;
    } catch (err) {
      throw err;
    }
  },
);
