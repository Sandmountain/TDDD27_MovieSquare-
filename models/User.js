const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "facebook", "google"]
  },
  local: {
    name: String,
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  facebook: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  google: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") {
      return next();
    }

    const password = this.local.password;

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(this.local.password, salt);

    // Save hashed password instead of the plain text.
    this.local.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(checkPassword) {
  try {
    return await bcrypt.compare(checkPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = User = mongoose.model("user", userSchema);
