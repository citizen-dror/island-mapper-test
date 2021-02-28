const path = require('path');
const express = require('express');
const app = express()
const port = 3000

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Island app listening at http://localhost:${port}`);
})