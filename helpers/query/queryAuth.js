const queryAuth = {
  register: ({ email, password, phone_number }) => {
    return `INSERT INTO users(email, password, 
                              phone_number, role, 
                              created_at) 
            VALUES('${email}', '${password}', '${phone_number}', 'member', 'now()')`;
  },

  login: (email) => {
    return `SELECT id, 
                   email, 
                   password, 
                   role 
            FROM users 
            WHERE email = '${email}'`;
  },
};

module.exports = queryAuth;

// const queryAuth = {
//     register: (request) => {
//       const {username,name,phone_number, email, password } = request;
//       const query = `INSERT into users(username, name, phone_number, email, password, role, created_at) VALUES('${username}','${name}','${phone_number}','${email}', '${password}', 'user', 'now()')`;

//       return query;
//     },

//     login: (request) => {
//       const { email } = request;
//       const getUser = `SELECT id, email, password, role from users where email = '${email}'`;

//       return getUser;
//     },
//   };

//   module.exports = queryAuth;
