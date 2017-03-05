# Directory iterator (with stats)

Simple sequential/serial folder iterator with promises

```js
const ls = require('ls-stat');

ls('/path/to/disk').then((files) => {
    // ['folder1', 'folder2', 'file.txt', 'file2.txt'] (stats included)
    var paths = files.filter((file) => file.isDirectory()).map((file) => file.filename);

    console.log(paths); // ['folder1', 'folder2']
});
```

