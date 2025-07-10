export const validateClientForm = () => {
  const userName = document.getElementById('floatingName');
  const userSurname = document.getElementById('floatingSurname');
  const userLastName = document.getElementById('floatingLastName');
  const unacceptableletter = document.getElementById('unacceptableletter');
  const writeName = document.getElementById('writeName');
  const writeSurname = document.getElementById('writeSurname');
  const writeLastName = document.getElementById('writeLastName');
  const requiredValue = document.getElementById('requiredValue');
  const requiredContacts = document.getElementById('requiredContacts');
  const validateArray = [unacceptableletter, writeName, writeSurname, writeLastName, requiredValue, requiredContacts];

  const regexp = /[^а-яА-ЯёЁ]+$/g;
  const regexpBigLetter = /[^А-Я]+$/g;

  const onInputvalue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-gray)';
      for (const item of validateArray) {
        item.textContent = ''
      }
    })
    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderColor = 'var(--color-gray)';
      for (const item of validateArray) {
        item.textContent = ''
      }
    }
    input.onchange = () => {
      input.style.borderColor = 'var(--color-gray)';
      if (userSurname.value && userName.value && userLastName.value) {
        for (const item of validateArray) {
          item.textContent = ''
        }
      }
    }
  }
  onInputvalue(userName);
  onInputvalue(userSurname);
  onInputvalue(userLastName);


  const checkRequiredName = (input, message, name) => {
    if (!input.value) {
      input.style.borderColor = 'var(--color-red)';
      message.textContent = `Введите ${name} клиента!`;
      return false;
    } else {
      message.textContent = '';
      return true;
    }

  }

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
      input.style.borderColor = 'var(--color-red)';
      unacceptableletter.textContent = `Недопуститмые символы!`;
      return false;
    }
    return true;

  }

  const checkByRegexpBigLetter = (input, regexp) => {
    if (regexp.test(input.value.charAt(0))) {
      input.style.borderColor = 'var(--color-red)';
      unacceptableletter.textContent = `ФИО должно начинаться с большой буквы!`;
      return false;
    }
    return true
  }

  if (!checkRequiredName(userSurname, writeSurname, 'Фамилию')) { return false };
  if (!checkRequiredName(userName, writeName, 'Имя')) { return false };
  if (!checkRequiredName(userLastName, writeLastName, 'Отчество')) { return false };
  if (!checkByRegexp(userName, regexp)) { return false };
  if (!checkByRegexp(userSurname, regexp)) { return false };
  if (!checkByRegexp(userLastName, regexp)) { return false };
  if (!checkByRegexpBigLetter(userName, regexpBigLetter)) { return false };
  if (!checkByRegexpBigLetter(userSurname, regexpBigLetter)) { return false };
  if (!checkByRegexpBigLetter(userLastName, regexpBigLetter)) { return false };

  return true;
}