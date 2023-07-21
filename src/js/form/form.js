import { db, collection, addDoc } from '../firebase.js';

const $stepsArr = document.querySelectorAll('.step');
const $form = document.querySelector('.form');

const $fieldsetArr = $form.querySelectorAll('.fieldset');
const $navigationBtns = $form.querySelector('.navigation-buttons');
const $continueBtn = $navigationBtns.querySelector('#continue');
const $backBtn = $navigationBtns.querySelector('#back');
let currentPage = 0;

function getDate() {
  const date = new Date();

  const currentDay = String(date.getDate()).padStart(2, '0');

  const currentMonth = String(date.getMonth() + 1).padStart(2, '0');

  const currentYear = date.getFullYear();

  const currentDate = {
    brPattern: `${currentDay}/${currentMonth}/${currentYear}`,
    id: parseInt(`${currentYear}${currentMonth}${currentDay}`),
  };

  return currentDate;
}

function toggleBackBtn() {
  $navigationBtns.classList.toggle('one-button');
  const isHidden = $backBtn.getAttribute('aria-hidden') === 'true';
  $backBtn.setAttribute('aria-hidden', (!isHidden).toString());
}

function changePage(incrementVal) {
  $stepsArr[currentPage]?.classList.toggle('disabled');
  $fieldsetArr[currentPage]?.setAttribute('aria-hidden', 'true');
  currentPage += incrementVal;
  $fieldsetArr[currentPage]?.setAttribute('aria-hidden', 'false');
  $stepsArr[currentPage]?.classList.remove('disabled');
  $stepsArr[currentPage]?.classList.remove('active');
}

function checkAnswers(fieldset) {
  const $inputsArr = Array.from(fieldset.querySelectorAll('input, textarea'));

  return $inputsArr.every((field) => field.reportValidity());
}

async function submit() {
  const formData = new FormData($form);
  const formProps = Object.fromEntries(formData);

  const currentDate = getDate();
  formProps.Data = currentDate.brPattern;
  formProps.id = currentDate.id;

  $form.setAttribute('loading', '');
  try {
    const docRef = await addDoc(collection(db, 'respostas'), formProps);
    $form.setAttribute('success', '');
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    $form.setAttribute('error', '');
    console.error('Error adding document: ', e);
  } finally {
    $form.removeAttribute('loading', '');
  }
}

$backBtn.addEventListener('click', (e) => {
  e.preventDefault();
  changePage(-1);
  currentPage === 0 ? toggleBackBtn() : null;
});

$continueBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (checkAnswers($fieldsetArr[currentPage]) === false) return;
  $stepsArr[currentPage].classList.add('active');
  currentPage === 0 ? toggleBackBtn() : null;
  changePage(1);
  currentPage === $fieldsetArr.length ? await submit() : null;
});
