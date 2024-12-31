const Flow = require('../models/Flow');

    exports.createFlow = (req, res) => {
      const { userId, content, media, hashtags, mentions, location } = req.body;
      const newFlow = {
        userId,
        content,
        media,
        hashtags,
        mentions,
        location,
        createdAt: new Date(),
        likes: 0,
        retweets: 0,
        replies: [],
        isPinned: false,
        isReply: false
      };

      Flow.insert(newFlow, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    };

    exports.getFlow = (req, res) => {
      const { id } = req.params;
      Flow.findOne({ _id: id }, (err, flow) => {
        if (err) {
          res.status(500).send(err);
        } else if (flow) {
          res.status(200).json(flow);
        } else {
          res.status(404).send('Flow not found');
        }
      });
    };

    exports.getUserFlows = (req, res) => {
      const { userId } = req.params;
      Flow.find({ userId }, (err, flows) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(flows);
        }
      });
    };

    exports.deleteFlow = (req, res) => {
      const { id } = req.params;
      Flow.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
          res.status(500).send(err);
        } else if (numRemoved) {
          res.status(200).send('Flow deleted successfully');
        } else {
          res.status(404).send('Flow not found');
        }
      });
    };

    exports.updateFlow = (req, res) => {
      const { id } = req.params;
      const updateData = req.body;
      Flow.update({ _id: id }, { $set: updateData }, {}, (err, numReplaced) => {
        if (err) {
          res.status(500).send(err);
        } else if (numReplaced) {
          Flow.findOne({ _id: id }, (err, flow) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json(flow);
            }
          });
        } else {
          res.status(404).send('Flow not found');
        }
      });
    };
