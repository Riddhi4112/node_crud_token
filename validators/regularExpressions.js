const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const contactRegex= /^[6-9][0-9]{9}$/;

module.exports = {
  passwordRegex,
  contactRegex
};