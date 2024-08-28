require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const routes = require("./routes/routes");

// Importar esquemas
const Card = require('./schemas/cartoes');
const Category = require('./schemas/categorias');
const Transaction = require('./schemas/financas');
const login = require('./schemas/login');
const Session = require('./schemas/sessions');
const newUser = require('./schemas/newUser');

// Inicializar esquemas
Card();
Category();
Transaction();
login();
Session();
newUser();

const app = express();

// Configuração de CORS
const corsOptions = {
  origin: 'https://financas-front.onrender.com', // Remova a barra final
  credentials: true,
};
app.use(cors());


app.use(express.json());

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://pedrooofreitas:dGMr8cZ2wDk422tg@pedro.aropozx.mongodb.net/FinançasApp'; // Substitua pelo seu URI do MongoDB

// Configuração de sessão
const sessionStore = MongoStore.create({
  mongoUrl: mongoUrl, // Use a variável mongoUrl que já tem um fallback
  collectionName: 'sessions',
  stringify: false, // Adicione esta linha para evitar a stringificação da sessão antes de salvar
});

app.use(session({
  secret: '110221', 
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false, // Usar true se estiver em produção com HTTPS
    maxAge: 24 * 60 * 60 * 1000 // Expiração do cookie em 1 dia
  }
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
