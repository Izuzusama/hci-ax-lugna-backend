'use strict';

module.exports = function(app) {
  //var tables = ["CheckHistory","DownloadHistory","DownloadSource","SourceKeyword"];
  var tables = ['WebUser', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'feeling_log', 'friend', 'notification'];
  for (var i = tables.length - 1; i >= 0; i--) {
      var tableName = tables[i];
      console.log("Auto Update table: " + tableName);
      app.dataSources.mysqldb.autoupdate(tableName, function(err) {
          if (err) throw err;
      });
  }
  
};
