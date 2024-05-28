const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Bắt buộc'],
      trim: true,
      unique: true,
      minLength: [3, 'Tên ca khúc ít nhất 3 ký tự'],
      maxLength: [30, 'Tên ca khúc nhiều nhất 30 ký tự'],
    },
    artist: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Ca khúc thuộc về nghệ sĩ'],
    },
    song: {
      type: String,
      required: [true, 'Tên ca khúc'],
    },
    img: {
      type: String,
      required: [true, 'Hình ảnh'],
    },
    plays: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Song = new mongoose.model('Song', songSchema);

module.exports = Song;
