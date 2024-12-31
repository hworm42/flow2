const Notification = require('../models/Notification');

    exports.createNotification = (req, res) => {
      const { userId, type, sourceId, content } = req.body;
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
    };

    exports.getNotifications = (req, res) => {
      const { userId } = req.params;
      Notification.find({ userId }, (err, notifications) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(notifications);
        }
      });
    };

    exports.readNotification = (req, res) => {
      const { id } = req.params;
      Notification.update({ _id: id }, { $set: { read: true } }, {}, (err, numReplaced) => {
        if (err) {
          res.status(500).send(err);
        } else if (numReplaced) {
          Notification.findOne({ _id: id }, (err, notification) => {
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
    };
