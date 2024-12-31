const express = require('express');
    const User = require('./models/User');
    const Flow = require('./models/Flow');
    const Reply = require('./models/Reply');
    const DirectMessage = require('./models/DirectMessage');
    const Notification = require('./models/Notification');
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.get('/api/users', (req, res) => {
      User.find({}, (err, docs) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(docs);
        }
      });
    });

    app.post('/api/users', (req, res) => {
      const user = req.body;
      User.insert(user, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    });

    app.get('/api/flows', (req, res) => {
      Flow.find({}, (err, docs) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(docs);
        }
      });
    });

    app.post('/api/flows', (req, res) => {
      const flow = req.body;
      Flow.insert(flow, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    });

    app.get('/api/replies', (req, res) => {
      Reply.find({}, (err, docs) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(docs);
        }
      });
    });

    app.post('/api/replies', (req, res) => {
      const reply = req.body;
      Reply.insert(reply, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    });

    app.get('/api/direct-messages', (req, res) => {
      DirectMessage.find({}, (err, docs) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(docs);
        }
      });
    });

    app.post('/api/direct-messages', (req, res) => {
      const directMessage = req.body;
      DirectMessage.insert(directMessage, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    });

    app.get('/api/notifications', (req, res) => {
      Notification.find({}, (err, docs) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(docs);
        }
      });
    });

    app.post('/api/notifications', (req, res) => {
      const notification = req.body;
      Notification.insert(notification, (err, newDoc) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json(newDoc);
        }
      });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
