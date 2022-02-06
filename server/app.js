const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(helmet());

const port = process.env.PORT || 4000;

const routes = require('./routes');

app.use('/api',routes);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/test', (req, res) => {
    res.json({ message: "Hello from Server!" });
});

app.listen(port, () => {
    console.log('Server now listening at localhost:' + port);
});