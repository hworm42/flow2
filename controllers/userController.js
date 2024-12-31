const User = require('../models/User');

    exports.registerUser = (req, res) => {
      const { username, password, bio, email, location, website, birthdate, profilePicture, coverPhoto } = req.body;
      const newUser = {
        username,
        password,
        bio,
        email,
        location,
        website,
        birthdate,
        profilePicture,
        coverPhoto,
        joined: new Date(),
        followers: [],
        following: [],
        verified: false,
        status: '',
        isPrivate: false
      };

      User.insert(newUser, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    };

    exports.loginUser = (req, res) => {
      const { username, password } = req.body;
      User.findOne({ username, password }, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else if (user) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    };

    exports.updateUser = (req, res) => {
      const { id } = req.params;
      const updateData = req.body;
      User.update({ _id: id }, { $set: updateData }, {}, (err, numReplaced) => {
        if (err) {
          res.status(500).send(err);
        } else if (numReplaced) {
          User.findOne({ _id: id }, (err, user) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json(user);
            }
          });
        } else {
          res.status(404).send('User not found');
        }
      });
    };

    exports.getUser = (req, res) => {
      const { id } = req.params;
      User.findOne({ _id: id }, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send('User not found');
        }
      });
    };

    exports.deleteUser = (req, res) => {
      const { id } = req.params;
      User.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
          res.status(500).send(err);
        } else if (numRemoved) {
          res.status(200).send('User deleted successfully');
        } else {
          res.status(404).send('User not found');
        }
      });
    };
