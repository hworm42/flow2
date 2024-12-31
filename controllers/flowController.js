const Flow = require('../models/Flow');

    const checkRole = (user, requiredRole) => {
      return user.role === requiredRole;
    };

    exports.createFlow = (req, res) => {
      const { userId, content, media, hashtags, mentions, location } = req.body;
      const user = req.user;

      if (checkRole(user, 'User') || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
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
      } else {
        res.status(403).send('Forbidden');
      }
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
      const user = req.user;

      Flow.findOne({ _id: id }, (err, flow) => {
        if (err) {
          res.status(500).send(err);
        } else if (flow) {
          if (flow.userId === user._id || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
            Flow.remove({ _id: id }, {}, (err, numRemoved) => {
              if (err) {
                res.status(500).send(err);
              } else if (numRemoved) {
                res.status(200).send('Flow deleted successfully');
              } else {
                res.status(404).send('Flow not found');
              }
            });
          } else {
            res.status(403).send('Forbidden');
          }
        } else {
          res.status(404).send('Flow not found');
        }
      });
    };

    exports.updateFlow = (req, res) => {
      const { id } = req.params;
      const updateData = req.body;
      const user = req.user;

      Flow.findOne({ _id: id }, (err, flow) => {
        if (err) {
          res.status(500).send(err);
        } else if (flow) {
          if (flow.userId === user._id || checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
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
          } else {
            res.status(403).send('Forbidden');
          }
        } else {
          res.status(404).send('Flow not found');
        }
      });
    };
