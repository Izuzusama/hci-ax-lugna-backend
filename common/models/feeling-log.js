'use strict';

module.exports = function(Feelinglog) {
  Feelinglog.getSummary = function(startDate, endDate, cb){
    if(startDate === undefined){
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    }
    if(endDate === undefined){
      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
    }
    Feelinglog.find({ where: { createdAt: { between: [new Date(startDate), new Date(endDate)] } } }, function(err, feelingLogs) {
      var feelings = []
      feelingLogs.forEach(fl => {
        var dt = new Date(fl.createdAt.getTime() + 8 * 60 * 60000);
        dt = new Date(dt.setHours(0,0,0,0));
        var dtObjSelect = undefined;
        for (let i = 0; i < feelings.length; i++) {
          const dtObj = feelings[i];
          if(dtObj.date.getTime() == dt.getTime()){
            dtObjSelect = dtObj;
            break;
          }
        }
        if(dtObjSelect === undefined){
          dtObjSelect = {
            date: dt,
            avgMood: 0,
            avgSuger: 0,
            avgSleep: 0,
            avgCoffee: 0,
            total: 0
          };
          feelings.push(dtObjSelect);
        }
        dtObjSelect.avgMood += fl.mood;
        dtObjSelect.avgSuger += fl.suger;
        dtObjSelect.avgSleep += fl.sleep;
        dtObjSelect.avgCoffee += fl.coffee;
        dtObjSelect.total += 1;
      });
      // Avg
      feelings.forEach(f => {
        f.avgMood = f.avgMood / f.total;
        f.avgSuger = f.avgSuger / f.total;
        f.avgSleep = f.avgSleep / f.total;
        f.avgCoffee = f.avgCoffee / f.total;
      });
      cb(null, feelings);
    });
  }

  Feelinglog.remoteMethod('getSummary', {
    http: {verb: "get"},
    accepts: [{arg: 'startDate', type: 'date'}, {arg: 'endDate', type: 'date'}],
    returns: {type: 'Array', root: true}
    // returns: [
    //   {arg: 'date', type: "date"},
    //   {arg: 'avgMood', type: "number"},
    //   {arg: 'avgSuger', type: "number"},
    //   {arg: 'avgSleep', type: "number"},
    //   {arg: 'avgCoffee', type: "number"},
    // ]
  })
};
