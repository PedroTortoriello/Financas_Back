const express = require("express");
const router = express.Router();
bodyParser = require("body-parser");
const authenticateToken = require("../authenticate/authenticateToken");
const autenticacao = require("./autenticacao");
const pagamentos = require("./pagamentos");
const cartao = require("./cartao");
const categorias = require("./categorias");
const authorizedUsers = require("./authorizedUser");
const novoUsuario = require("./newUser");


router.use(bodyParser.json());

router.route("/autenticacao").post(autenticacao);
router.route("/financas").post(authenticateToken, pagamentos);
router.route("/financas").get(authenticateToken, pagamentos);
router.route("/category").get(authenticateToken, categorias);
router.route("/autenticacao").post(authenticateToken, cartao);
router.route("/newUsers").post(novoUsuario);


router.use(express.json());

module.exports = router;

