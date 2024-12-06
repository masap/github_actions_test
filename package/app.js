const express = require('express');
const Redis = require('ioredis');

const app = express();
const port = 80;
const dbServiceName = 'sr-bundle-db-service'
const redis = new Redis({
  host: dbServiceName,
  port: 6379
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/tar+gzip');

  var key = req.query.key
  if (key === undefined) {
    res.setHeader('Content-Disposition', 'attachment; filename=empty.tar.gz');
    res.setHeader('Content-Length', 0);
    res.end();
    return
  }

  redis.get('filename-sr-collector--' + key).then((fileName) => {
    redis.getBuffer('sr-collector--' + key).then((buf) => {
      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-Length', buf.length);
      res.end(buf);
    })
  })
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
