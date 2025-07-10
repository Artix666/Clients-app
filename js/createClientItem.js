import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./createEditClient.js";
import { svgShowMoreLinks, svgSpinner } from "./svg.js";
import { createContactItemByType, formatDate, formatTime } from "./utils.js";

export const createClientItem = (data) => {
  const clientTR = document.createElement('tr');
  const clientIdTd = document.createElement('td');
  const clientId = document.createElement('span');
  const clientFullName = document.createElement('td');
  const clientName = document.createElement('span');
  const clientSurname = document.createElement('span');
  const clientLastName = document.createElement('span');
  const clientCreated = document.createElement('td');
  const createdDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const clientChanged = document.createElement('td');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const clientEdit = document.createElement('button');
  const clientDelete = document.createElement('button');
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);
  const editSpinner = document.createElement('span');
  const deleteSpinner = document.createElement('span');
  const linksContainer = document.createElement('div');
  const showMoreLink = document.createElement('a');
  const showMoreLinkWrapper = document.createElement('span')


  clientTR.classList.add('clients__item');
  clientTR.id = data.id;
  clientIdTd.classList.add('client__id');

  clientFullName.classList.add('clients__full-name');
  clientSurname.classList.add('clients__surname');
  clientLastName.classList.add('clients__lastname');
  clientCreated.classList.add('clients__created');
  createdDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientContacts.classList.add('client__contacts');
  clientActions.classList.add('clients__actions');
  clientSurname.classList.add('clients__surname');
  clientLastName.classList.add('clients__lastname');
  clientChanged.classList.add('clients__changed');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientDelete.classList.add('clients__delete', 'btn-reset');
  clientEdit.classList.add('clients__edit', 'btn-reset');
  editSpinner.classList.add('actions__spinner');
  deleteSpinner.classList.add('actions__spinner');
  showMoreLink.classList.add('show-more-link');
  linksContainer.classList.add('links-container');
  showMoreLinkWrapper.classList.add('show-more-wrapper')



  const maxVisibleLinks = 4;
  let differense = data.contacts.length - maxVisibleLinks;
  let visibleLinksCount = 0;



  showMoreLink.textContent = '+' + differense;
  showMoreLink.style.display = 'none'; // Скрыть кнопку по умолчанию



  for (const contact of data.contacts) {
    createContactItemByType(contact.type, contact.value, linksContainer);
    visibleLinksCount++;
    if (visibleLinksCount > maxVisibleLinks) {
      linksContainer.lastElementChild.style.display = 'none';
    }
  }

  if (visibleLinksCount > maxVisibleLinks) {
    linksContainer.append(showMoreLinkWrapper);
    

    showMoreLink.style.display = 'block'
  }

  showMoreLink.addEventListener('click', () => {
    const links = linksContainer.querySelectorAll('a');
    for (let i = maxVisibleLinks; i < links.length; i++) {
      links[i].style.display = 'block';
    }
    showMoreLinkWrapper.style.display = 'none';
  });

  clientContacts.append(linksContainer);


  const deleteById = () => {

    import('./clientsApi.js').then(({ deleteClientItem }) => {
      const spinner = document.querySelector('.modal__spinner')
      deleteClient.deleteModalButton.addEventListener('click', () => {
        try {
          spinner.style.display = 'block'
          deleteClientItem(data.id);
          setTimeout(() => {
            document.getElementById(data.id).remove();
            deleteClient.deleteModal.remove()
          }, 1000)

        } catch (error) {
          console.log(error);

        } finally {
          setTimeout(() => {
            spinner.style.display = 'none'
          }, 1000)
        }
      })
    })
  }

  clientDelete.addEventListener('click', () => {
    try {
      deleteSpinner.style.display = 'block';
      clientDelete.classList.add('actions-wait')
      setTimeout(() => {
        deleteById();
        document.body.append(deleteClient.deleteModal);
      }, 1000)
    } catch (error) {
      console.log(error);

    } finally {
      setTimeout(() => {
        deleteSpinner.style.display = 'none';
        clientDelete.classList.remove('actions-wait')

      }, 1000)
    }
  })


  clientEdit.addEventListener('click', () => {
    try {
      editSpinner.style.display = 'block';
      clientEdit.classList.add('actions-wait')
      setTimeout(() => {
        document.body.append(editClient.editModal);
      }, 1000)
    } catch (error) {
      console.log(error);

    } finally {
      setTimeout(() => {
        editSpinner.style.display = 'none';
        clientEdit.classList.remove('actions-wait')
      }, 1000)
    }
  })


  clientId.textContent = data.id.substr(7, 6);
  clientName.textContent = data.name;
  clientSurname.textContent = data.surname;
  clientLastName.textContent = data.lastName;
  clientEdit.textContent = 'Изменить';
  clientDelete.textContent = 'Удалить';
  createdDate.textContent = formatDate(data.createdAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  changedTime.textContent = formatTime(data.updatedAt);
  editSpinner.innerHTML = svgSpinner;
  deleteSpinner.innerHTML = svgSpinner;
  showMoreLinkWrapper.innerHTML = svgShowMoreLinks;


  showMoreLinkWrapper.append(showMoreLink)
  clientIdTd.append(clientId)
  clientFullName.append(clientSurname, clientName, clientLastName);
  clientCreated.append(createdDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  clientDelete.prepend(deleteSpinner);
  clientEdit.prepend(editSpinner);
  clientActions.append(clientEdit, clientDelete);

  clientTR.append(
    clientIdTd,
    clientFullName,
    clientCreated,
    clientChanged,
    clientContacts,
    clientActions

  )





  return clientTR
}