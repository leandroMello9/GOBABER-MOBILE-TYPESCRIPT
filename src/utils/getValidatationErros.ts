import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}
export default function getValidationsErros(erro: ValidationError): Erros {
  const validateErros: Erros = {};
  erro.inner.forEach((error) => {
    validateErros[error.path] = error.message;
  });
  return validateErros;
}
