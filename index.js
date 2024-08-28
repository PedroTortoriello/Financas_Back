require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const routes = require("./routes/routes");

// Importar e inicializar esquemas (exceto para sessões)
const Card = require('./schemas/cartoes');
const Category = require('./schemas/categorias');
const Transaction = require('./schemas/financas');
const login = require('./schemas/login');
const newUser = require('./schemas/newUser');

// Inicializar esquemas
Card();
Category();
Transaction();
login();
newUser();

const app = express();

// Configuração de CORS
const corsOptions = {
  origin: ['https://financas-front.onrender.com', 'http://localhost:5173'], // Remova a barra final do localhost
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://pedrooofreitas:dGMr8cZ2wDk422tg@pedro.aropozx.mongodb.net/FinançasApp'; // Substitua pelo seu URI do MongoDB

// Configuração de sessão
const sessionStore = MongoStore.create({
  mongoUrl: mongoUrl,
  collectionName: 'sessions',
  stringify: false,
  ttl: 24 * 60 * 60, // 1 dia em segundos
  autoRemove: 'native',
  autoRemoveInterval: 10, // Remover sessões a cada 10 minutos
  touchAfter: 24 * 3600, // Tempo em segundos para salvar sessões inalteradas
});

app.use(session({
  secret: '110221',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 dia
  },
}));

// Conectar ao MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
  process.exit(1); // Encerre o processo em caso de erro de conexão
});

// Configuração das rotas
app.use("/", routes);

// Inicializar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
