var async = require('async');
module.exports = function(app) {
  //data sources
  var ds = app.dataSources.default;
  //create all models
  async.parallel({
    reviewers: async.apply(createEmployees)
  }, function(err, results) {
    if (err) throw err;
	console.log('> models created sucessfully');
  });
  
  //create reviewers
  function createEmployees(cb) {
    ds.automigrate('employee', function(err) {
      if (err) return cb(err);
      var employee = app.models.employee;
      employee.create([
        {name: 'David', 'mobile': '12345678'},
        {name: 'Lisa', 'mobile': '87654321'}
      ], cb);
    });
  }
};