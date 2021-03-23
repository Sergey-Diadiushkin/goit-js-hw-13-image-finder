import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function openModal(event) {
  const largeImage = event.target.getAttribute('data-source');

  if (event.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(
      `<img src="${largeImage}" width="800" height="600">`,
    );
    instance.show();
  }
}
