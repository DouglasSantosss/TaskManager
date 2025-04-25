const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./server/routes/user');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
