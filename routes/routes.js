const express = require("express");
const router = express.Router();
bodyParser = require('body-parser');
const authenticateToken = require('../authenticate/authenticateToken')

const autenticacao = require('./autenticacao')
const novoUsuario = require('./newUser')
const rotasSimples = require('./rotasSimples')
const authorizedUsers = require('./authorizedUser')
const Pagamentos = require ('./pagamento')

router.use(bodyParser.json());

router.route('/pags2').all(authenticateToken, Pagamentos)
router.route('/autenticacao').post(autenticacao)
router.route('/novoUsuario').post(authenticateToken, novoUsuario)
router.route('/pesquisar').post(authenticateToken, novoUsuario)


router.route('/clientes').all(authenticateToken, rotasSimples)
router.route('/empresas').all(authenticateToken, rotasSimples)
router.route('/fornecedores').all(authenticateToken, rotasSimples)
router.route('/eventos').all(authenticateToken, rotasSimples)
router.route('/servicos').all(authenticateToken, rotasSimples)
router.route('/tipo_evento').all(authenticateToken, rotasSimples)
router.route('/dadosCadastrais').all(authenticateToken, rotasSimples)
router.route('/questionario').all(authenticateToken, rotasSimples)
router.route('/robo').all(authenticateToken, rotasSimples)
router.route('/dadosCadastraisParticipantes').all(authenticateToken, rotasSimples)
router.route('/pesquisarClientes').all(authenticateToken, rotasSimples)
router.route('/pesquisarEmpresas').all(authenticateToken, rotasSimples)
router.route('/pesquisarFornecedores').all(authenticateToken, rotasSimples)
router.route('/pesquisarEventos').all(authenticateToken, rotasSimples)
router.route('/pesquisarServicos').all(authenticateToken, rotasSimples)
router.route('/pesquisarTipo_evento').all(authenticateToken, rotasSimples)
router.route('/pesquisarDadosCadastrais').all(authenticateToken, rotasSimples)
router.route('/pesquisarQuestionario').all(authenticateToken, rotasSimples)
router.route('/pesquisarGestaoParticipantes').all(authenticateToken,rotasSimples)
router.route('/pesquisarRobo').all(authenticateToken, rotasSimples)
router.route('/pesquisarDadosCadastraisParticipantes').all(authenticateToken, rotasSimples)
router.route('/login').all(authenticateToken, rotasSimples)
router.route('/pesquisarLogin').all(authenticateToken, rotasSimples)

router.route('/gestaoatv').all(authenticateToken, gestaoatv)
router.route('/authorizedUsers').all(authenticateToken, authorizedUsers)


router.use(express.json())

module.exports = router;


// const fileCsv = require("../Importacao/csvImp");
// const envMsg = require('../whatsapp/sendMsg') 
// const receivedMsg = require('../whatsapp/receivedMsg')
/**
* Rota para whats - teste
*/

/*router.post(`/whatsMensagem`, async function (req, res) {
  try{    
    retorno = await envMsg(req.body.destino, req.body.mensagem);
    res.status(retorno.status).json(retorno.data).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
})*/
