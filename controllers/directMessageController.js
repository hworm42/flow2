const DirectMessage = require('../models/DirectMessage');

    const checkRole = (user, requiredRole) => {
      return user.role === requiredRole;
    };

    exports.sendMessage = (req, res) => {
      const { senderId, receiverId, content, media } = req.body;
      const user = req.user;

      if (checkRole(user, 'User') || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        const newMessage = {
          senderId,
          receiverId,
          content,
          media,
          sentAt: new Date(),
          read: false
        };

        DirectMessage.insert(newMessage, (err, newDoc) => {
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

    exports.getMessages = (req, res) => {
      const { userId } = req.params;
      const user = req.user;

      if (user._id === userId || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        DirectMessage.find({ $or: [{ senderId: userId }, { receiverId: userId }] }, (err, messages) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json(messages);
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.deleteMessage = (req, res) => {
      const { id } = req.params;
      const user = req.user;

      DirectMessage.findOne({ _id: id }, (err, message) => {
        if (err) {
          res.status(500).send(err);
        } else if (message) {
          if (message.senderId === user._id || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
            DirectMessage.remove({ _id: id }, {}, (err, numRemoved) => {
              if (err) {
                res.status(500).send(err);
              } else if (numRemoved) {
                res.status(200).send('Message deleted successfully');
              } else {
                res.status(404).send('Message not found');
              }
            });
          } else {
            res.status(403).send('Forbidden');
          }
        } else {
          res.status(404).send('Message not found');
        }
      });
    };
