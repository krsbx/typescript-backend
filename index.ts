require('dotenv').config();
import express from 'express';
import db from './src/models';
import root from './src/utils/root';

const app = express();
const PORT = process.env.PORT || 3000;

db.sequelize.sync();
root(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
