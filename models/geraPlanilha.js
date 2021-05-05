const xl = require('excel4node');

module.exports =
  function geraPlanilha(jsonArr) {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Banco de Talentos');
    const cabecalho = [
      'Nome',
      'Email',
      'Celular',
      'Linkedin',
      'Vaga de Interesse',
      'Área de Interesse',
      'Empresa do Grupo Cientec',
      'Quais são seus planos profissionais e metas a curto, médio e longo prazo?',
      'Fale sobre suas experiências',
      'O que te motiva?',
      'Expectativa Salarial',
      'Por que você quer fazer parte do nosso time?',
      'Currículo',
      'Portfólio'
    ];
    const estiloCabecalho = wb.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#5B9BD5',
        fgColor: '#5B9BD5',
      },
      font: {
        color: '#FFFFFF',
        bold: true,
      }
    });

    let cabecalhoIndex = 1;
    cabecalho.forEach(function (cabecalhoItem) {
      ws.column(cabecalhoIndex).setWidth(20);
      ws.cell(1, cabecalhoIndex++)
        .string(cabecalhoItem)
        .style(estiloCabecalho);

    });
    let linhaIndex = 2;
    jsonArr.forEach(item => {
      let colunaIndex = 1;
      Object.keys(item).forEach(function (colunaNome) {
        ws.cell(linhaIndex, colunaIndex++)
          .string(item[colunaNome])
      });
      linhaIndex++;
    });
    return wb;
  }
