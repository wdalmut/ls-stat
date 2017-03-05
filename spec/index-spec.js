var mock = require('mock-fs');
var ls = require('../');

describe("List", () => {
  beforeEach(() => {
    mock({
      "/path": {
        "hello": {
          "file": "OK"
        },
        "file": "test",
        "another": "test",
        "folder": {
        },
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it("should list", function(done) {
    ls('/path').then((stats) => {
      expect(stats.map((file) => file.filename)).toEqual(["another","file", "folder", "hello"]);
      done();
    }).fail((err) => {
      fail(err);
      done();
    });
  });

  it("should use stats", function(done) {
    ls('/path').then((stats) => {
      expect(stats.filter((stat) => stat.isDirectory()).map((file) => file.filename))
        .toEqual(["folder", "hello"]);
      done();
    }).fail((err) => {
      fail(err);
      done();
    });
  });
});
