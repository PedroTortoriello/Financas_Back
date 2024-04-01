const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require('cors');

const mongoSchemaFinanças = require("./schema/pagamento");

require("dotenv").config();  

mongoSchemaFinanças();

app.use(express.static('src'));

// Configuração do CORS para permitir solicitações de http://localhost:5173 e https://pagamentos-d518b6d6df2c.herokuapp.com
app.use(cors({
  origin: ['http://localhost:5173', 'https://pagamento-4220a111d481.herokuapp.com/']
}));

app.use(express.json());

process.env.MONGODB_URI = "mongodb+srv://pedrooofreitas:JqzMfX9bhJrcWsyz@pedro.aropozx.mongodb.net/?retryWrites=true&w=majority&appName=Pedro";

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.error('Erro de conexão com o MongoDB:', err);
});

mongoose.connection.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

// routes
app.use("/", routes);

// Server
const porta = 3000
app.listen(process.env.PORT || porta, () => {
  console.log("Servidor rodando na porta: " + (process.env.PORT || porta));
});
