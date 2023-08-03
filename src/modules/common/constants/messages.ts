export const prefixError = 'Ops!';

export const messagesValidations = {
  notBlank: (field: string) =>
    `${prefixError} O campo ${field} não pode ficar em branco`,

  email: (field = 'email') => `${prefixError} O campo ${field} está inválido`,

  minLength: (field: string) =>
    `${prefixError} O campo ${field} deve ter no mínimo $constraint1 caracteres`,

  maxLength: (field: string) =>
    `${prefixError} O campo ${field} deve ter no máximo $constraint1 caracteres`,

  uuid: (field: string) => `${prefixError} O campo ${field} está inválido`,

  minDate: (field: string) =>
    `${prefixError} O campo ${field} deve ser maior que o informado`,

  maxDate: (field: string) =>
    `${prefixError} O campo ${field} deve ser menor que o informado`,

  date: (field: string) =>
    `${prefixError} O campo ${field} deve ser uma data válida`,

  cep: (field = 'CEP') => `${prefixError} O campo ${field} está inválido`,

  string: (field: string) =>
    `${prefixError} O campo ${field} deve ser uma string`,

  uf: (field = 'UF') =>
    `${prefixError} O campo ${field} deve ser uma UF válida`,

  object: (field: string) =>
    `${prefixError} O campo ${field} deve ser um objeto`,

  cnpj: (field = 'CNPJ') => `${prefixError} O campo ${field} está inválido`,

  cpf: (field = 'CPF') => `${prefixError} O campo ${field} está inválido`,

  url: (field: string) => `${prefixError} O campo ${field} está inválido`,

  phoneNumber: (field = 'telefone celular') =>
    `${prefixError} O campo ${field} está inválido`,

  gender: (field = 'genero') => `${prefixError} O campo ${field} está inválido`,

  enum: (field: string) => `${prefixError} O campo ${field} está inválido`,

  boolean: (field: string) =>
    `${prefixError} O campo ${field} deve ser um booleano`,
};

export const messagesHttpStatus = {
  INTERNAL_SERVER_ERROR: `${prefixError} Erro interno do servidor`,
  UNAUTHORIZED: `${prefixError} Você não está autenticado`,
  FORBIDDEN: `${prefixError} Você não tem permissão para acessar este recurso`,
  NOT_FOUND: `${prefixError} Recurso não encontrado`,
  BAD_REQUEST: `${prefixError} Requisição inválida`,
  TOO_MANY_REQUESTS: `${prefixError} Você atingiu o limite de requisições`,
  CONFLICT: `${prefixError} Já existe um registro com os dados informados`,
};
