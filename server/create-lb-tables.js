var server = require('./server');
var ds = server.dataSources.mysqldb;
var lbTables = ['WebUser', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'feeling_log', 'friend'];
ds.automigrate(lbTables, function (er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
