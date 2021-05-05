const Bd = require('../models/operacoesBd');
const geraPlanilha = require('../models/geraPlanilha');

module.exports = function (app) {

  app.get('/', async function (req, res) {
    let jsonArr = await Bd.le(req.query);
    const wb = await geraPlanilha(jsonArr);
    await wb.write('Banco de Talentos.xlsx', res);
  });

  app.post('/', function (req, res) {
    console.log(req.body);
    try {
      const dados = req.body;
      Bd.adiciona(dados);
    } catch (e) {
      console.log(e);
    }
    res.send('voce está realizando um POST');
  });
}
