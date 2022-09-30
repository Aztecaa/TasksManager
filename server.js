const dotenv = require('dotenv');
const { app } = require('./app');

const { database } = require('./Utils/database.util');

const { initModels } = require('./Models/initModel');

dotenv.config();

const startServer = async () => {
  try {
    await database.authenticate();

    initModels();

    await database.sync();

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log('Express app is running');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
