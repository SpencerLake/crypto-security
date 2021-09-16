const bcrypt = require("bcryptjs");

const users = [];

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        let validated = bcrypt.compareSync(password, users[i].passHash);
        if (validated) {
          let userObj = { ...users[i] };
          delete userObj.passHash;
          res.status(200).send(userObj);
          console.log(userObj);
          return;
        }
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passHash = bcrypt.hashSync(password, salt);
    let user = {
      username,
      email,
      firstName,
      lastName,
      passHash,
    };
    // console.log('Registering User')
    // console.log(req.body)
    users.push(user);
    res.status(200).send(req.body);

    console.log(passHash);
    console.log(users);
  },
};
