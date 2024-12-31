const Datastore = require('nedb');

    const UserManagement = new Datastore();

    UserManagement.loadDatabase();

    module.exports = UserManagement;
