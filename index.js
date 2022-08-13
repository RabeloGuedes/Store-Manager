const app = require('./app');
require('dotenv').config();
const productsRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
