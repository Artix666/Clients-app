import { svgSpinner } from "./svg.js";

export const deleteClientModal = () => {
  const deleteModalContent = document.createElement('div');
  const modalClose = document.createElement('button');
  const deleteModalTitle = document.createElement('h2');
  const deleteModalText = document.createElement('p');
  const deleteModal = document.createElement('div');
  const deleteModalButton = document.createElement('button');
  const deleteModalBack = document.createElement('button');
  const saveSpinner = document.createElement('span');


  deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
  deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
  deleteModalText.classList.add('delete-modal__text');
  deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
  deleteModalButton.classList.add('delete-modal__button', 'btn-reset', 'site-btn');
  modalClose.classList.add('modal__close', 'btn-reset');
  deleteModalBack.classList.add('modal__back-btn', 'btn-reset')
  saveSpinner.classList.add('modal__spinner')

  deleteModalTitle.textContent = 'Удалить клиента';
  deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteModalButton.textContent = 'Удалить';
  deleteModalBack.textContent = 'Отмена';
  saveSpinner.innerHTML = svgSpinner;

  deleteModalContent.append(modalClose, deleteModalTitle, deleteModalText, deleteModalButton, deleteModalBack)
  deleteModalButton.prepend(saveSpinner)
  deleteModal.append(deleteModalContent);

  document.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
      deleteModal.remove()
    }
  })

  modalClose.addEventListener('click', (e) => {
    if (e.target === modalClose) {
      deleteModal.remove()
    }
  })



  deleteModalBack.addEventListener('click', () => {
    deleteModal.remove()
  })

  return {
    deleteModal,
    deleteModalContent,
    deleteModalButton
  }
}