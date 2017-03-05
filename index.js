var q = require('q');
var fs = require('fs');
var path = require('path');

module.exports = function(basepath) {
  var d = q.defer();

  return q.nfcall(fs.readdir, basepath).then((files) => {
    var stats = [];

    return files
      .map((filename) => path.join(basepath, filename))
      .reduce((memo, filename) => {
        return memo.then((value) => {
          stats = stats.concat([value]);

          return q.nfcall(fs.lstat, filename);
        });
      }, q(false))
      .then((lastStat) => {
        return q(
          stats.filter((item) => item ? true : false)
          .concat([lastStat])
          .map((value, index) => {
            value.filename = files[index];
            return value;
          })
        );
      });
  });
};
