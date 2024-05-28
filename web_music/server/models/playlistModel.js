const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Tên phải nhiều hơn 3 ký tự'],
      maxLength: [20, 'Tên không quá 20 ký tự'],
      trim: true,
      default: 'Danh sách của bạn',
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, 'Không quá 300 ký tự'],
    },
    img: {
      type: String,
      default:
        'https://ik.imagekit.io/8cs4gpobr/spotify/playlists/default.png?updatedAt=1696157039341',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    songs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Song',
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 30,
        message: 'Bạn không thể thêm hơn 30 ca khúc vào một danh sách',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Playlist = new mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
