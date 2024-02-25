const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const db = require('./config/db');
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());
db.connect(process.env.MONGO_DB);
const port = process.env.PORT || 3001;
routes(app);
app.listen(port, () => {
    console.log('server is running!');
});
