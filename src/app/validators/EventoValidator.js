import * as Yup from 'yup';

const eventValidator = Yup.object().shape({
  title: Yup.string()
    .required('Nome do evento é obrigatório.')
    .min(3, 'O nome do evento deve ter pelo menos 3 caracteres.')
    .max(100, 'O nome do evento deve ter no máximo 100 caracteres.'),
  date: Yup.date()
    .required('Data do evento é obrigatória.')
    .min(new Date(), 'A data não pode ser no passado.'),
  time: Yup.string().required('Hora do evento é obrigatória.'),
  location: Yup.string()
    .required('Local do evento é obrigatório.')
    .min(3, 'O local deve ter pelo menos 3 caracteres.')
    .max(200, 'O local deve ter no máximo 200 caracteres.'),
  description: Yup.string()
    .required('Descrição do evento é obrigatória.')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.')
    .max(500, 'A descrição deve ter no máximo 500 caracteres.'),
  image: Yup.mixed().required('Imagem do evento é obrigatória.'),
});

export default eventValidator;
