const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function(){
      return this.role ==='user';
    },
  },
  email: {
    type: String,
    required: function(){
      return this.role === 'user';
    },
    unique: true, 
  },
  phone: {
    type: String,
    required: function(){
      return this.role === 'user';
    },
  },
  username: {
    type: String,
    required:function(){
      return this.role === 'admin';
    }, 
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: function(){
      return this.role === 'admin';
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);