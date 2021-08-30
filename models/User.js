const pg = require("../helpers/connection/connection");
const hash = require("../helpers/hashPassword");
const bcrypt = require('bcrypt')
const isDataEmpty = require('../helpers/checkData')
const formResponse = require("../helpers/formResponse/formResponse");
const getNewBodyfromUser = require("../helpers/newBodyFormUser");
const unlink = require("../helpers/unlinkPhoto");
const { getAll, getByEmail, getById , deleteUserById, updateUser} = require("../helpers/query/queryUser")

const userModel = {
  getUsers: (req) => {
    return new Promise((resolve, reject) => {
      const {
        query: { limit = 100, page = 1 },
      } = req;
      pg.query(getAll(limit, page), (err, result) => {
        const { isEmpty } = isDataEmpty(result);
        if (isEmpty) reject(formResponse("Data Not Found", 404));
        if (err) reject(formResponse("Get all Users failed", 500));
        resolve(formResponse("Get all Users success", 200, result.rows));
      });
    });
  },

  addnewUser : (request) => {
    return new Promise((resolve, reject) => {
      const {
        email,
        password,
        phone_number,
        about,
        name,
        username,
        job,
        is_author,
        role,
      } = request.body;
      const photos = request.file.filename;
      pg.query(getByEmail(email),(error, result) => {
          console.log(error, "ini error di atas tidak error");
          if (!error) {
            if (result.rows.length < 1) {
              bcrypt.genSalt(10, function (saltError, salt) {
                // console.log(saltError, "ini salterror");
                if (!saltError) {
                  bcrypt.hash(password, salt, function (hashingError, hash) {
                    console.log(hashingError, "ini hashingerror");
                    if (!hashingError) {
                      pg.query(
                        `INSERT INTO users(email,password,phone_number,photo_profile,about,name,username,job,is_author,role,created_at)
                VALUES('${email}', '${hash}','${phone_number}','/photo_profile/${photos}','${about}','${name}','${username}','${job}','${is_author}','${role}','now()')`,
                        (err) => {
                          console.log(err, "error bawah");
                          if (!err) {
                            resolve(
                              formResponse(
                                "Add user success",
                                200,
                                result.rows[0]
                              )
                            );
                          } else {
                            reject(formResponse("Add user Failed", 500));
                          }
                        }
                      );
                    } else {
                      reject(formResponse("Add user Failed", 500));
                    }
                  });
                } else {
                  reject(formResponse("Add user Failed", 500));
                }
              });
            } else {
              reject(formResponse("User exist", 400));
            }
          } else {
            reject(formResponse("Add user failed", 500));
          }
        }
      );
    });
  },

  getUserById: (req) => {
    return new Promise((resolve, reject) => {
      const {
        params: { id: id },
      } = req;
      pg.query(getById(id), (err, result) => {
        if (err) reject(formResponse("Get user failed", 500));
        const { isEmpty } = isDataEmpty(result);
        if (isEmpty) reject(formResponse("User not found", 404));
        resolve(formResponse("Get user success", 200, result.rows[0]));
      });
    });
  },

  deleteUserById: (req) => {
    return new Promise((resolve, reject) => {
      const {
        params: { id: id },
      } = req;
      pg.query(getById(id), (error, res) => {
        if (error) reject(formResponse("Delete user failed", 500));
        const { isEmpty } = isDataEmpty(res);
        if (isEmpty) reject(formResponse("User not found", 404));
        pg.query(deleteUserById(id), (err, result) => {
          console.log(err, 'error delet')
          if (err) reject(formResponse("Delete user failed", 500));
          resolve(formResponse("Delete user success", 200, result?.rows[0]));
        });
      });
    });
  },

  patchUserById: (req) => {
    return new Promise((resolve, reject) => {
      const {
        params: { id: id },
      } = req;
      pg.query(getById(id), (error, result) => {
        const { isEmpty } = isDataEmpty(result);
        if (isEmpty) reject(formResponse("user id not found", 404));
        if (error) reject(formResponse("update data failed", 500));
        const {
          email,
          phone_number,
          about,
          name,
          username,
          job,
          is_author,
          role,
          password,
          photo_profile,
          id,
        } = getNewBodyfromUser(req, result);
        if (photo_profile != result.rows[0].photo_profile) {
          unlinkPhoto(result.rows[0].photo_profile);
          pg.query(
            updateUser({
              email,
              phone_number,
              about,
              name,
              username,
              job,
              is_author,
              role,
              password,
              photo_profile,
              id,
            }),
            (err, response) => {
              if (err) reject(formResponse("update data failed", 500));
              resolve(
                formResponse(`update user success`, 200, response.rows[0])
              );
            }
          );
        }
        pg.query(
          updateUser({
            email,
            phone_number,
            about,
            name,
            username,
            job,
            is_author,
            role,
            password,
            photo_profile,
            id,
          }),
          (err, response) => {
            if (err) reject(formResponse("update data failed", 500));
            resolve(formResponse(`update user success`, 200, response.rows[0]));
          }
        );
      });
    });
  },
};
module.exports = userModel;