const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', orderRoutes.routes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`App is running on url http://localhost:${PORT}`)
);
