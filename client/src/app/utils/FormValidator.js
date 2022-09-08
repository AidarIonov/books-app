export class FormValidator {
  constructor(selector, onSubmit) {
    this.form = document.querySelector(selector);
    this.inputsWithErrors = new Set();
    this.fields = {};

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.hasErrors) {
        onSubmit(this.fields);
      }
    });
  }

  get hasErrors() {
    return this.inputsWithErrors.size > 0;
  }

  register(selector, check) {
    const inputField = this.form.querySelector(selector);
    const errorElement = inputField.nextElementSibling;
    const execute = (hideErrors) => {
      const { pass, errorMessage } = check(inputField.value, inputField);
      errorElement.textContent = hideErrors ? '' : errorMessage;
      hideErrors
        ? inputField.classList.remove('invalid')
        : inputField.classList.add('invalid');
      if (!pass) {
        this.inputsWithErrors.add(inputField);
        delete this.fields[inputField.name];
      } else {
        inputField.classList.remove('invalid');
        this.inputsWithErrors.delete(inputField);
        this.fields[inputField.name] = inputField.value;
      }
    };

    inputField.addEventListener('blur', () => execute());
    this.form.addEventListener('submit', () => execute());
    execute(true);
  }
}

export const validateLength = (value) => {
  if (!value.length) {
    return {
      pass: false,
      errorMessage: 'Field is required*',
    };
  }
  return {
    pass: true,
  };
};

export default FormValidator;
