export const validateClientContact = (contactType, contactInput) => {
  const writeValue = document.getElementById('writeName');
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.|_]+$/g;
  const onlyFacebook = /[^a-zA-Z|@|.|_]+$/g;
  const onlyVk = /[^a-zA-Z|@|.|_]+$/g;
  const onlyOther = /[^a-zA-Z|@|.|_]+$/g;
  

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-gray)';
      writeValue.textContent = ''
    })
    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderColor = 'var(--color-gray)';
      writeValue.textContent = ''
    }
  }
  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderColor = 'var(--color-gray)'
  }

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage('Заполните все поля контактов', writeValue, contactInput);
    return false;
  };

  switch (contactType.innerHTML) {
    case 'Телефон':
      if (onlyNumbers.test(contactInput.value)) {
        showErrorMessage('Допустимы только цифры!', writeValue, contactInput)
        return false
      } else if (contactInput.value.length !== 11) {
        showErrorMessage('Номер должен состоять из 11 цифр!', writeValue, contactInput)
        return false
      }
      return true;
    case 'Email':
      if (onlyEmail.test(contactInput.value)) {
        showErrorMessage('Неверный формат Email!', writeValue, contactInput)
        return false
      }
      case 'Facebook':
      if (onlyFacebook.test(contactInput.value)) {
        showErrorMessage('Неверный формат Facebook!', writeValue, contactInput)
        return false
      }
      case 'Vk':
      if (onlyVk.test(contactInput.value)) {
        showErrorMessage('Неверный формат Vk!', writeValue, contactInput)
        return false
      }
      case 'Другое':
      if (onlyOther.test(contactInput.value)) {
        showErrorMessage('Неверный формат поля Другое!', writeValue, contactInput)
        return false
      }

      return true;
    default:
      return true;
  }
}