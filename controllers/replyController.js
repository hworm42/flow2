const Reply = require('../models/Reply');

    exports.createReply = (req, res) => {
      const { flowId, userId, content, media, mentions } = req.body;
      const newReply = {
        flowId,
        userId,
        content,
        media,
        mentions,
        createdAt: new Date(),
        likes: 0
      };

      Reply.insert(newReply, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    };

    exports.getReplies = (req, res) => {
      const { flowId } = req.params;
      Reply.find({ flowId }, (err, replies) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(replies);
        }
      });
    };
