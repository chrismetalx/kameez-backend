const express = require('express');
const { PORT } = require('./config.js');
const routerAuth = require('./routes/auth.route.js');
const routerProducts = require('./routes/product.route.js');
const routerUsers = require('./routes/user.route.js');
const authenticateToken = require('./middleware/authenticateToken.js');

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.status(200).send('I am online.');
});

app.use('/api', routerAuth);
app.use('/api', routerUsers);

app.use(authenticateToken);
app.use('/api', routerProducts);

app.listen(PORT, () => {
  console.log(`Esuchando en puerto ${PORT}`);
});