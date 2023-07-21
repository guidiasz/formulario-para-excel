import { db, collection, getDocs } from '../firebase.js';
import { subtractMonth, arrayToXlsx, download } from './utilities.js';

const $downloadBtn = document.querySelector('#download');
const $form = document.querySelector('.form');

function getFilter() {
  const formData = new FormData($form);
  const formProps = Object.fromEntries(formData);
  const filter = {};
  filter.time = subtractMonth(formProps.month);
  delete formProps.month;
  filter.roles = Object.values(formProps);
  return filter;
}

async function getAnswers() {
  const querySnapshot = await getDocs(collection(db, 'respostas'));
  const answers = [];
  querySnapshot.forEach((doc) => {
    answers.push(doc.data());
  });
  return answers;
}

function filterAnswers(answers, filter) {
  const filteredArr = answers.filter((answer) => {
    let shouldAdd = true;
    if (answer.id < filter.time) shouldAdd = false;
    if (!filter.roles.includes(answer.Cargo)) shouldAdd = false;
    return shouldAdd;
  });
  return filteredArr;
}

$downloadBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const filter = getFilter();

  const answers = await getAnswers();

  const filteredAnswers = filterAnswers(answers, filter);
  const workbook = arrayToXlsx(filteredAnswers);
  download(workbook);
});
