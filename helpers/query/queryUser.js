const queryUser = {
  getAll: (limit, page) => {
    return `SELECT id,email,phone_number, photo_profile, about, name ,username, job, total_post, total_visitor, total_comment, is_author, role
            FROM 
            users
            LIMIT ${limit} 
            OFFSET ${(page - 1) * limit}`;
  },

  getById: (id) => {
    return `SELECT * 
                FROM users 
                WHERE id = ${id}`;
  },
  
  deleteUserById: (id) => {
    return `DELETE 
                FROM users 
                WHERE id = ${id} 
                RETURNING *`;
  },

  getUserByEmail: (email) => {
    return `SELECT * 
                FROM users 
                WHERE email='${email}'`;
  },

  getByEmail: (email) => {
    return `SELECT * 
            FROM users
            WHERE email='${email}'`;
  },
  // addNewUser: (request) => {
  //   const {
  //     email = null,
  //     password = null,
  //     phone_number = null,
  //     photo_profile = null,
  //     about = null,
  //     name = null,
  //     username = null,
  //     job = null,
  //     role = "member",
  //     is_author = null,
  //   } = request;
  //   // const get = `select id from user where email = '${request.email}' or phone_number = '${request.phone_number}'`;
  //   const add = `insert into user(email, password, phone_number, photo_profile, about, name, username, job, role, created_at)
  //   values('${email}', '${password}', '${phone_number}', '${photo_profile}', '${about}', '${name}', '${username}', '${job}','${role}', '${is_author}','now()') returning id`;

  //   return { get, add };
  // },

  updateUser: ({
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
  }) => {
    return `UPDATE users SET email = '${email}', 
                                 password = '${password}', 
                                 phone_number = '${phone_number}', 
                                 photo_profile = '${photo_profile}', 
                                 about = '${about}', 
                                 name = '${name}', 
                                 job = '${job}', 
                                 is_author = ${is_author}, 
                                 role = '${role}', 
                                 updated_at = 'NOW()', 
                                 username = '${username}' 
                WHERE id = ${id}
                RETURNING *`;
  },
};

module.exports = queryUser;

// const queryUser = {
//     getAll:(req)=>{
//         const {limit = 10, page = 1} =req
//         const query = `SELECT * FROM PUBLIC.user LIMIT '${limit}' OFFSET '${
//             (page - 1) * limit}'`

//         return query
//     },

//     getUserById: (request) => {
//         const id = request
//         const getUserbyid = `SELECT id,photo_profile,username,name,email,phone_number,job,about,status,role FROM user WHERE id=${id}`
//         return getUserbyid
//     },

//     addnewuser:(request)=>{
//         const {username} =request
//         const addnewuser =`SELECT * FROM user WHERE username='${username}'`

//         return addnewuser
//     },

//     deleteUserById: (request) => {
//         const  id  = request
//         const deleteUserById = `DELETE FROM user WHERE id=${id}`

//         return deleteUserById
//     },

//     searchUsername: (request) => {
//         const { username, limit = 10, page = 1 } = request;
//         return `SELECT * FROM users WHERE LOWER(username) LIKE '%${username.toLowerCase()}%' ORDER BY username LIMIT ${limit} OFFSET ${
//           (page - 1) * limit
//         }`;
//       }

// }

// module.exports =queryUser
