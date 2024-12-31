const FlowReport = require('../models/FlowReport');

    const checkRole = (user, requiredRole) => {
      return user.role === requiredRole;
    };

    exports.getReports = (req, res) => {
      const user = req.user;

      if (checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        FlowReport.find({}, (err, reports) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json(reports);
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };

    exports.reviewReport = (req, res) => {
      const { id } = req.params;
      const { status, reviewedBy } = req.body;
      const user = req.user;

      if (checkRole(user, 'Moderator') || checkRole(user, 'Admin') || checkRole(user, 'Superadmin')) {
        FlowReport.update({ _id: id }, { $set: { status, reviewedBy, reviewedAt: new Date() } }, {}, (err, numReplaced) => {
          if (err) {
            res.status(500).send(err);
          } else if (numReplaced) {
            FlowReport.findOne({ _id: id }, (err, report) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).json(report);
              }
            });
          } else {
            res.status(404).send('Report not found');
          }
        });
      } else {
        res.status(403).send('Forbidden');
      }
    };
