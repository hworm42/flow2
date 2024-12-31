const Datastore = require('nedb');

    const SystemNotifications = new Datastore();

    SystemNotifications.loadDatabase();

    module.exports = SystemNotifications;
