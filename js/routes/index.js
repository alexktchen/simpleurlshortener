var express = require('express');
var router = express.Router();

const { Client } = require('pg')

const connectionString = 'postgresql://alex:pwd0123456789@database:5432/mydb'
//const connectionString = 'postgresql://alex:pwd0123456789@localhost:54320/mydb'

const client = new Client({
  connectionString: connectionString,
})
client.connect(err => {
  if (err) {
    console.log(err);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  const query = `
        CREATE TABLE short_urls (id serial PRIMARY KEY, url VARCHAR(500), urlCode VARCHAR(500), createDate TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW());
    `;

  client
    .query(query)
    .then(() => {
      console.log('Table created successfully!');
    })
    .catch(err => console.log(err))
    .then(() => {
      console.log('Finished execution');
    });
}

router.post('/', async function(req, res, next)  {

  if (isEmpty(req.body)) {
    res
      .status(400)
      .json({ success: false, msg: "Data missing!", data: req.body });
  }
  let host = req.headers.host;
  let shortUrl = req.body.url;
  let data = await saveurl(shortUrl);
  return res.json({ url: host + '/' + data});
});

router.get('/:id', async function (req, res) {
  const urlCode = req.params.id;

  const query = `SELECT * FROM short_urls WHERE urlCode = '${urlCode}';`;
  let data = await client.query(query);

  if (data.rows.length < 1) {
    res
      .status(400)
      .json({ success: false, msg: "can't find url" });
  } else {
    let createDate = data.rows[0].createdate.getTime();
    var timeInMs = Date.now();

    var diff = (timeInMs - createDate) / 1000;
    if (diff > 60) {
      await deleteData(urlCode);
      res
        .status(400)
        .json({ success: false, msg: "url expired" });
    } else {
      let url = data.rows[0].url;
      res.redirect(301, url);
    }
  }
});


async function deleteData(code) {
  const query = `DELETE FROM short_urls WHERE urlCode = '${code}';`;
  await client.query(query);
}

function isEmpty(obj) {
  if (obj == null) return true;
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

async function saveurl(url) {
  if (url.indexOf('http') == -1) {
    url = 'http://' + url;
  }

  let randomStr = generateRandomString();
  const query = `INSERT INTO short_urls (url, urlCode) VALUES ('${url}', '${randomStr}');`;
  await client.query(query);
  return randomStr;
}

function generateRandomString() {
  var length = 6,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}


module.exports = router;
