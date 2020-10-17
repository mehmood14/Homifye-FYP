module.exports = {
  emailValidationService: (email) => {
    const e = /\S+@\S+\.\S+/;
    return e.test(email);
  },
  nameValidationService: (name) => {
    const e = /^[a-zA-Z]{2,}\d*$/i;
    return e.test(name);
  },
};
