const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, './dist/')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/', 'index.html'));
});

const serverPort = process.env.PORT || 8080;
app.listen(serverPort, () => {
    console.log(`🌎 Server listening (port: ${String(serverPort)})...`);
});
