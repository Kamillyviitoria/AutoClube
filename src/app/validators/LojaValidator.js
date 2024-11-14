export const formatCep = (cep) => {
    cep = cep.replace(/\D/g, '');
    if (cep.length <= 5) {
        return cep;
    }
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
};

export const formatPhone = (phone) => {
    phone = phone.replace(/\D/g, '');
    if (phone.length <= 2) {
        return `(${phone}`;
    }
    if (phone.length <= 6) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
    }
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
};


export const validateRequiredFields = (dados) => {
    const requiredFields = ['title', 'cep', 'address', 'phone', 'services','image'];
    for (let field of requiredFields) {
        if (!dados[field]) {
            return `O campo ${field} é obrigatório.`;
        }
    }
    return null;
};

export const validateCep = (cep) => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(cep)) {
        return "CEP inválido. Deve ter 8 dígitos, com ou sem o hífen.";
    }
    return null;
};

export const validatePhone = (phone) => {
    const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        return "Telefone inválido. Use o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.";
    }
    return null;
};
