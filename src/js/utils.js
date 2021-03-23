import cardTmpl from '../templates/card-tmpl.hbs';

function addClass(tag) {
  setTimeout(() => {
    tag.classList.add('is-hidden');
  }, 0);
}
function removeClass(tag) {
  tag.classList.remove('is-hidden');
}
function scrollPage(number) {
  window.scrollBy({
    top: number,
    behavior: 'smooth',
  });
}

function markupCard(value, ref) {
  const card = cardTmpl(value);
  ref.insertAdjacentHTML('beforeend', card);
}
function resetMarkup(element) {
  element.textContent = '';
}

export default {
  addClass,
  removeClass,
  markupCard,
  resetMarkup,
  scrollPage,
};
