const User = require('../models/User');
    const UserManagement = require('../models/UserManagement');

    const checkRole = (user, requiredRole) => {
      return user.role === requiredRole;
    };

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
        isPrivate: false,
        role: 'User'
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
      const user = req.user;

      if (user._id === id || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
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
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.getUser = (req, res) => {
      const { id } = req.params;
      const user = req.user;

      if (checkRole(user, 'User') || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        User.findOne({ _id: id }, (err, user) => {
          if (err) {
            res.status(500).send(err);
          } else if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).send('User not found');
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.deleteUser = (req, res) => {
      const { id } = req.params;
      const user = req.user;

      if (checkRole(user, 'Superadmin')) {
        User.remove({ _id: id }, {}, (err, numRemoved) => {
          if (err) {
            res.status(500).send(err);
          } else if (numRemoved) {
            res.status(200).send('User deleted successfully');
          } else {
            res.status(404).send('User not found');
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.assignRole = (req, res) => {
      const { userId, role } = req.body;
      const user = req.user;

      if (checkRole(user, 'Superadmin')) {
        UserManagement.update({ _id: userId }, { $set: { role } }, {}, (err, numReplaced) => {
          if (err) {
            res.status(500).send(err);
          } else if (numReplaced) {
            UserManagement.findOne({ _id: userId }, (err, user) => {
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
      } else {
        res.status(403).send('Forbidden');
      }
    };
