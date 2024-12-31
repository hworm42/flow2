const express = require('express');
    const userController = require('./controllers/userController');
    const flowController = require('./controllers/flowController');
    const replyController = require('./controllers/replyController');
    const directMessageController = require('./controllers/directMessageController');
    const notificationController = require('./controllers/notificationController');
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.post('/register', userController.registerUser);
    app.post('/login', userController.loginUser);
    app.put('/user/:id', userController.updateUser);
    app.get('/user/:id', userController.getUser);
    app.delete('/user/:id', userController.deleteUser);
    app.post('/user/assign-role', userController.assignRole);

    app.post('/flow', flowController.createFlow);
    app.get('/flow/:id', flowController.getFlow);
    app.get('/flows/:userId', flowController.getUserFlows);
    app.delete('/flow/:id', flowController.deleteFlow);
    app.put('/flow/:id', flowController.updateFlow);

    app.post('/reply', replyController.createReply);
    app.get('/replies/:flowId', replyController.getReplies);

    app.post('/message', directMessageController.sendMessage);
    app.get('/messages/:userId', directMessageController.getMessages);
    app.delete('/message/:id', directMessageController.deleteMessage);

    app.post('/notification', notificationController.createNotification);
    app.get('/notifications/:userId', notificationController.getNotifications);
    app.put('/notification/:id', notificationController.readNotification);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
