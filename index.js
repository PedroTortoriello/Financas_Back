const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

// Configuração de CORS
const corsOptions = {
  origin: 'https://financas-front.onrender.com',
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI;

const sessionStore = MongoStore.create({
  mongoUrl: mongoUrl,
  collectionName: 'sessions',
  stringify: false,
  ttl: 24 * 60 * 60, // 1 dia em segundos
  autoRemove: 'native',
  autoRemoveInterval: 1, // Remover sessões a cada 1 minuto
  touchAfter: 24 * 3600, // Tempo em segundos para salvar sessões inalteradas
});

if (process.env.NODE_ENV === 'production') {
  // Configurações específicas para produção
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: true, // Apenas se estiver usando HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    },
  }));
} else {
  // Configurações para desenvolvimento
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: false, // Defina como false em desenvolvimento se não usar HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    },
  }));
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});

const port = process.env.PORT_DEBUG || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
