const DirectMessage = require('../models/DirectMessage');

    exports.sendMessage = (req, res) => {
      const { senderId, receiverId, content, media } = req.body;
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
    };

    exports.getMessages = (req, res) => {
      const { userId } = req.params;
      DirectMessage.find({ $or: [{ senderId: userId }, { receiverId: userId }] }, (err, messages) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(messages);
        }
      });
    };

    exports.deleteMessage = (req, res) => {
      const { id } = req.params;
      DirectMessage.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
          res.status(500).send(err);
        } else if (numRemoved) {
          res.status(200).send('Message deleted successfully');
        } else {
          res.status(404).send('Message not found');
        }
      });
    };
