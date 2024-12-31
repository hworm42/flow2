const Datastore = require('nedb');

    const Flow = new Datastore();

    Flow.loadDatabase();

    module.exports = Flow;
