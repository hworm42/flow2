const Datastore = require('nedb');

    const Notification = new Datastore();

    Notification.loadDatabase();

    module.exports = Notification;
