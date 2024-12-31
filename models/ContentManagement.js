const Datastore = require('nedb');

    const ContentManagement = new Datastore();

    ContentManagement.loadDatabase();

    module.exports = ContentManagement;
