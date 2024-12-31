const Datastore = require('nedb');

    const RoleManagement = new Datastore();

    RoleManagement.loadDatabase();

    module.exports = RoleManagement;
