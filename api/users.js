const express = require("express");
const app = express.Router();
const Home = require("../models/homes");
const User = require("../models/users");
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: process.env.api_key, domain: process.env.DOMAIN });
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var validation = require("../service/service.js");

exports.registerHome = (req, res) => {
  const home = new Home();

  const emailValidation = validation.emailValidationService(req.body.email);
  const homeNameValidation = validation.nameValidationService(req.body.name);
  const userNameValidation = validation.nameValidationService(
    req.body.username
  );

  if (
    req.body.name !== null &&
    req.body.name !== undefined &&
    req.body.name !== ""
  ) {
    if (validation.nameValidationService(req.body.name)) {
      if (
        req.body.address !== null &&
        req.body.address !== undefined &&
        req.body.address !== ""
      ) {
        if (
          req.body.email !== null &&
          req.body.email !== undefined &&
          req.body.email !== ""
        ) {
          if (validation.emailValidationService(req.body.email)) {
            home.name = req.body.name;
            home.address = req.body.address;
            home.email = req.body.email;

            home
              .save()
              .then((home) => {
                console.log("user rgistered");
                res.send("user registered");
              })
              .catch((err) => {
                res.status(400).send("err");
              });
          } else {
            console.log("format");
          }
        } else {
          console.log("no email");
        }
      } else {
        console.log("no adress");
      }
    } else {
      console.log("home name format");
    }
  } else {
    console.log("no name");
  }
};

exports.registerUser = (req, res) => {
  const user = new User();
  const home = new Home();

  var val = Math.floor(1000 + Math.random() * 9000);

  if (
    req.body.name !== null &&
    req.body.name !== undefined &&
    req.body.name !== ""
  ) {
    if (
      req.body.username !== null &&
      req.body.username !== undefined &&
      req.body.username !== ""
    ) {
      if (validation.nameValidationService(req.body.username)) {
        if (
          req.body.email !== null &&
          req.body.email !== undefined &&
          req.body.email !== ""
        ) {
          if (validation.emailValidationService(req.body.email)) {
            if (
              req.body.password !== null &&
              req.body.password !== undefined &&
              req.body.password !== ""
            ) {
              if (req.body.password.length >= 8) {
                if (req.body.phone.length == 11) {
                  user.name = req.body.name;
                  user.username = req.body.username;
                  user.email = req.body.email;
                  user.password = req.body.password;
                  user.phone = req.body.phone;
                  user.code = val;
                  user
                    .save()
                    .then((result) => {
                      Home.findOneAndUpdate(
                        { email: req.body.email },
                        { $push: { users: result._id } },
                        (err, next) => {
                          if (err) {
                            console.log("err:", err);
                          } else {
                            console.log("next:", next);
                            if (next !== null) {
                              User.findOneAndUpdate(
                                { _id: result._id },
                                { role: "homeAdmin" },
                                { useFindAndModify: false },
                                () => {}
                              );
                            }
                          }
                        }
                      );
                      Home.findOneAndUpdate(
                        { _id: result.homeId },
                        { $push: { users: result._id } },
                        (err, isMatch) => {
                          if (err) {
                            console.log(err);
                          } else {
                            User.findOneAndUpdate(
                              { _id: result._id },
                              { role: "homeMember" },
                              () => {}
                            );
                          }
                        }
                      );
                      bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(result.password, salt, function (
                          err,
                          hash
                        ) {
                          User.findOneAndUpdate(
                            { _id: result._id },
                            { password: hash },
                            { useFindAndModify: false },
                            function (err, resultt) {
                              if (err) {
                                console.log(err);
                              } else {
                                res.send("User regisyered");

                                // const data = {
                                //   from: "Homifye@gmail.com",
                                //   to: req.body.email,
                                //   subject: "User Verification",
                                //   text:
                                //     "http://localhost:3001/verify?id=" +
                                //     result._id +
                                //     "&code=" +
                                //     result.code,
                                // };
                                // mg.messages().send(data, function (
                                //   error,
                                //   body
                                // ) {
                                //   if (error) {
                                //     console.log(error);
                                //   }
                                //   console.log(body);
                                // });
                              }
                            }
                          );
                        });
                      });
                    })
                    .catch((err) => {
                      res.send("err");
                      console.log(err);
                    });
                } else {
                  console.log("phone must be 11");
                }
              } else {
                console.log("password must b 8");
              }
            } else {
              console.log("no password");
            }
          } else {
            console.log("email format");
          }
        } else {
          console.log("no email");
        }
      } else {
        console.log("username name format");
      }
    } else {
      console.log("no username");
    }
  } else {
    console.log("no name");
  }
};

exports.verifyUser = (req, res) => {
  console.log(req.params.id);
  console.log(req.params.code);

  User.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result !== null) {
        if (result.isVerified !== true) {
          if (result.code == req.params.code) {
            User.updateOne(
              { _id: result._id },
              { $set: { isVerified: true } },
              (err, isMatch) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("verification done");
                }
              }
            );
          } else {
            console.log("code not match");
            res.status(400).send("code not match");
          }
        } else {
          console.log("user alread varefied");
          res.status(400).send("user alread varefied");
        }
      } else {
        console.status(400).log("no user");
      }
    }
  });
};

exports.homeLogin = (req, res) => {
  if (
    req.body.name !== null &&
    req.body.name !== undefined &&
    req.body.name !== ""
  ) {
    if (validation.nameValidationService(req.body.name)) {
      Home.findOne({ name: req.body.name }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result !== null) {
            if (req.body.name == result.name) {
              //redirect
              console.log("home found redirecting");
              res.send(result);
            }
          } else {
            console.log("home not found");
          }
        }
      });
    } else {
      console.log("home name format");
    }
  } else {
    console.log("no home name");
  }
};

exports.userLogin = (req, res) => {
  if (
    req.body.username !== null &&
    req.body.username !== undefined &&
    req.body.username !== ""
  ) {
    if (validation.nameValidationService(req.body.username)) {
      if (
        req.body.password !== null &&
        req.body.password !== undefined &&
        req.body.password !== ""
      ) {
        const password = req.body.password;
        if (req.body.password.length >= 8) {
          User.findOne({ username: req.body.username }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (req.body.username == result.username) {
                console.log(req.body.password);
                console.log(result.password);
                bcrypt.compare(password, result.password, (err, isValid) => {
                  if (isValid) {
                    var token = jwt.sign(
                      { user: result },
                      process.env.JWT_SECRET,
                      {
                        expiresIn: 1000000,
                      }
                    );
                    res.status(200).send({
                      success: true,
                      user: result,
                      token: "JWT " + token,
                    });
                  } else {
                    console.log("wrong pass");
                  }
                });
              } else {
                console.log("user name not found");
              }
            }
          });
        } else {
          console.log("password must b 8");
        }
      } else {
        console.log("no password");
      }
    } else {
      console.log("username name format");
    }
  } else {
    console.log("no username");
  }
};
