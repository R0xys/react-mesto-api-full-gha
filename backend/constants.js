const devKey = 'imposible-key';
const productionKey = process.env.JWT_SECRET;
const nodeEnv = process.env.NODE_ENV;
const { PORT = 3000 } = process.env;

module.exports = {
  devKey,
  productionKey,
  nodeEnv,
  PORT,
};
