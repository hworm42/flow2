const Notification = require('../models/Notification');
    const SystemNotifications = require('../models/SystemNotifications');

    const checkRole = (user, requiredRole) => {
      return user.role === requiredRole;
    };

    exports.createNotification = (req, res) => {
      const { userId, type, sourceId, content } = req.body;
      const user = req.user;

      if (checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        const newNotification = {
          userId,
          type,
          sourceId,
          content,
          createdAt: new Date(),
          read: false
        };

        Notification.insert(newNotification, (err, newDoc) => {
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

    exports.getNotifications = (req, res) => {
      const { userId } = req.params;
      const user = req.user;

      if (user._id === userId || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        SystemNotifications.find({ userId }, (err, notifications) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json(notifications);
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.readNotification = (req, res) => {
      const { id } = req.params;
      const user = req.user;

      SystemNotifications.findOne({ _id: id }, (err, notification) => {
        if (err) {
          res.status(500).send(err);
        } else if (notification) {
          if (notification.userId === user._id || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
            SystemNotifications.update({ _id: id }, { $set: { read: true } }, {}, (err, numReplaced) => {
              if (err) {
                res.status(500).send(err);
              } else if (numReplaced) {
                SystemNotifications.findOne({ _id: id }, (err, notification) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(200).json(notification);
                  }
                });
              } else {
                res.status(404).send('Notification not found');
              }
            });
          } else {
            res.status(403).send('Forbidden');
          }
        } else {
          res.status(404).send('Notification not found');
        }
      });
    };
