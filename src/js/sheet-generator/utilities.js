import { utils, write } from 'https://unpkg.com/xlsx@0.18.5/xlsx.mjs';

export function subtractMonth(month) {
  month = parseInt(month);
  if (month === -1) return 19700101;

  let dateObj = new Date();

  dateObj.setMonth(dateObj.getMonth() - month);

  let updatedDateStr = parseInt(dateObj.toISOString().split('T')[0].replaceAll('-', ''));

  return updatedDateStr;
}

export function arrayToXlsx(answers) {
  const headers = ['Nome', 'Email', 'Whatsapp', 'Cargo', 'Experiencia', 'Portfolio', 'Data'];

  // reordena as respostas de acordo com a ordem dos cabeçalhos
  const reorderedAnswers = answers.map((answer) =>
    headers.reduce((obj, key) => ({ ...obj, [key]: answer[key] }), {}),
  );

  const worksheet = utils.json_to_sheet(reorderedAnswers);
  worksheet['!cols'] = [
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 27 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
  const wbout = write(workbook, wopts);
  return wbout;
}

export function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export function download(wbout) {
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Planilha.xlsx';
  link.click();
}
