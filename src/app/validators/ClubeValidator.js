import * as Yup from 'yup';

const ClubeValidator = Yup.object().shape({
  title: Yup.string()
    .min(3, 'O nome do clube deve ter pelo menos 3 caracteres')
    .required('O nome do clube é obrigatório'),
  address: Yup.string()
    .required('A localidade é obrigatória'),
  phone: Yup.string()
    .required('O telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX'),
  image: Yup.mixed()
    .required('A imagem é obrigatória')
    .test('fileSize', 'A imagem não pode ser maior que 2MB', value => !value || value.size <= 2 * 1024 * 1024), // Limite de 2MB
});

export default ClubeValidator;
