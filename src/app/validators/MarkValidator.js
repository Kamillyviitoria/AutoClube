import * as Yup from 'yup';

const MarketplaceValidator = Yup.object().shape({
  title: Yup.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome não pode ter mais de 100 caracteres')
    .required('O nome do marketplace é obrigatório'),

    price: Yup.number()
    .typeError('Preço deve ser um número válido')
    .min(0, 'O preço deve ser maior ou igual a 0')
    .required('O preço é obrigatório'),

  address: Yup.string()
    .min(3, 'A localidade deve ter pelo menos 3 caracteres')
    .required('A localidade é obrigatória'),

  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX')
    .required('O telefone é obrigatório'),

  description: Yup.string()
    .max(500, 'A descrição não pode ter mais de 500 caracteres')
    .required('A descrição é obrigatória'),

  category: Yup.string()
    .oneOf(['carro', 'moto', 'outros'], 'Categoria inválida')
    .required('A categoria é obrigatória'),

    performance: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0, 'A performance deve ser no mínimo 0')
    .max(10, 'A performance deve ser no máximo 10')
    .required('A performance é obrigatória'),
  
  desempenho: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0, 'O desempenho deve ser no mínimo 0')
    .max(10, 'O desempenho deve ser no máximo 10')
    .required('O desempenho é obrigatório'),
  
  consumo: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0, 'O consumo deve ser no mínimo 0')
    .max(10, 'O consumo deve ser no máximo 10')
    .required('O consumo é obrigatório'),
  
  seguranca: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0, 'A segurança deve ser no mínimo 0')
    .max(10, 'A segurança deve ser no máximo 10')
    .required('A segurança é obrigatória'),
  
  conforto: Yup.number()
    .transform(value => (isNaN(value) ? undefined : value))
    .min(0, 'O conforto deve ser no mínimo 0')
    .max(10, 'O conforto deve ser no máximo 10')
    .required('O conforto é obrigatório'),
});

export default MarketplaceValidator;
