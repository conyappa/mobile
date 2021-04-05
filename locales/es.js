const rules = `
Por cada $5000 que tengas ahorrados obtendrás un boleto para participar en nuestro sorteo semanal 🎁, que comienza todos los Lunes a las 20:00.

Cada día a la misma hora saldrá un nuevo número. ¡Mientras más aciertos tengas por boleto al finalizar el sorteo, más ganas! 🤑
`;

const es = {
  session: {
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    signup: 'Regístrate',
    signupSuccess: '¡Registro exitoso!',
  },
  user: {
    email: 'Email',
    firstName: 'Nombre',
    lastName: 'Apellido',
    rut: 'RUT',
    password: 'Contraseña',
    balance: 'Saldo',
  },
  errorMessage: {
    required: '%{name} no puede estar vacío',
    minLength: '%{name} debe contener %{min} carácteres o más',
    pattern: '%{name} inválido',
    rutValidate: 'RUT inválido',
    api: {
      alreadyExists: '%{name} ya está en uso',
    },
  },
  misc: {
    loading: 'Cargando',
    rules,
  },
  screens: {
    tickets: {
      ticketCount: 'Tienes %{count} boletos',
      topTickets: 'Estos son tus top %{count}',
      none: 'No tienes boletos',
    },
    bank: {
      depositTitle: 'Obtén boletos',
      depositInstructions: 'Deposítanos a la siguiente cuenta, te enviaremos un mail cuando recibamos tu depósito',
      withdrawTitle: 'Retira tu dinero',
      withdrawInstructions: 'Envía tus datos bancarios y monto a retirar al siguiente email',
      name: 'Nombre',
      rut: 'RUT',
      bankName: 'Banco',
      accountType: 'Tipo de cuenta',
      accountNumber: 'Número de cuenta',
      email: 'Correo',
      copy: 'Copiar',
      copied: '¡Copiado!',
    },
    config: {
      rulesTitle: 'Reglas',
      logoutTitle: 'Cerrar sesión',
    },
  },
};

export default es;
