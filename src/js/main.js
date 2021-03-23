import ApiService from './apiService';
import utils from './utils';
const { addClass, removeClass, markupCard, resetMarkup, scrollPage } = utils;
import openModal from './modal';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const { alert } = require('@pnotify/core');

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('.search-input');
const btnRef = document.querySelector('#load-more');

const apiService = new ApiService();

formRef.addEventListener('submit', searchImages);
btnRef.addEventListener('click', onBtnClick);
galleryRef.addEventListener('click', openModal);

async function searchImages(event) {
  event.preventDefault();
  resetMarkup(galleryRef);
  apiService.resetPage();

  apiService.query = inputRef.value;
  onNotFound();

  if (apiService.query === '') {
    emptyQuery();
    resetMarkup(galleryRef);
    addClass(btnRef);
    return;
  }

  onSubmit(inputRef.value, galleryRef);
  apiService.incrementPage();
  removeClass(btnRef);
}

async function onSubmit(query, ref) {
  const inputValue = await apiService.fetchImages(query).then(data => {
    markupCard(data.hits, ref);
  });
  return inputValue;
}

function emptyQuery() {
  alert({
    text: 'Please enter query',
    type: 'error',
    delay: 1000,
  });
  console.log('Введи запрос');
}

async function onNotFound() {
  // ПЕРЕПИСАТЬ
  const inputFail = await apiService
    .fetchImages(apiService.query)
    .then(data => {
      return data.total;
    });
  if (inputFail === 0) {
    console.log('Not found :(');
    alert({
      text: 'Not found',
      type: 'error',
      delay: 1000,
    });
    addClass(btnRef);
  }
}

async function onBtnClick() {
  apiService.query = inputRef.value;
  await onSubmit(inputRef.value, galleryRef);
  apiService.incrementPage();
  //540 высота контента на экране
  scrollPage(540);
}
