const Datastore = require('nedb');

    const FlowReport = new Datastore();

    FlowReport.loadDatabase();

    module.exports = FlowReport;
