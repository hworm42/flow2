const Ban = require('../models/Ban');

    const checkRole = (user, requiredRole) => {
      return user.role === requiredRole;
    };

    exports.createBan = (req, res) => {
      const { type, value, reason } = req.body;
      const user = req.user;

      if (checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        const newBan = {
          type,
          value,
          reason,
          createdBy: user._id,
          createdAt: new Date()
        };

        Ban.insert(newBan, (err, newDoc) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).json(newDoc);
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.getBans = (req, res) => {
      const user = req.user;

      if (checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        Ban.find({}, (err, bans) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json(bans);
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.removeBan = (req, res) => {
      const { id } = req.params;
      const user = req.user;

      if (checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        Ban.remove({ _id: id }, {}, (err, numRemoved) => {
          if (err) {
            res.status(500).send(err);
          } else if (numRemoved) {
            res.status(200).send('Ban removed successfully');
          } else {
            res.status(404).send('Ban not found');
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };
