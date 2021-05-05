const conexao = require('../conexao/conexao.js');

class Bd {
  async adiciona(dadosDoCandidato) {
    const result = await conexao.db('cientec').collection('processo_seletivo').insertOne(dadosDoCandidato);
    console.log(result);
  }

  async le(requisicoes) {
    let filtro;
    if (requisicoes.areaDeInteresse.constructor === Array) {
      filtro =
      {
        'areaDeInteresse': { "$in": requisicoes.areaDeInteresse },
      }
      console.log(filtro);
    }
    else {
      filtro =
      {
        'areaDeInteresse': requisicoes.areaDeInteresse,
      }
    }
    const camposOmitidos = { projection: { _id: 0 } };
    const cursor = await conexao.db('cientec').collection('processo_seletivo').find(filtro, camposOmitidos);
    const results = await cursor.toArray();
    return results;
  }
}


module.exports = new Bd;
