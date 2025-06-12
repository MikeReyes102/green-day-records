const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    password: { type: String, required: true }, // Hashed password
    role: { type: String, enum: ["user", "admin"], default: "user" }, // User role (default: user)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Generate a salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare entered password with hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
