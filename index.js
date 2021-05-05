async function main() {
  const customExpress = require('./config/customExpress');
  const conexao = require('./conexao/conexao.js');
  const PORT = process.env.PORT || 5000;
  try {
    await conexao.connect();

    const app = customExpress();

    app.listen(PORT, function () {
      console.log(`servidor rodando na porta ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();