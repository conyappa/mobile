const rules = `
Por cada $10.000 que tengas ahorrados obtendrás un boleto para participar en nuestro sorteo semanal 🎁, que comienza todos los lunes a las 21:00.

Cada día (a la misma hora todos los días) saldrá un nuevo número. ¡Mientras más aciertos tengas por boleto al finalizar el sorteo, más ganas! 🤑
`;

const es = {
  number: {
    format: {
      delimiter: '.',
      separator: ',',
    },
    currency: {
      format: {
        precision: 0,
      },
    },
  },
  session: {
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    signup: 'Regístrate',
    signupSuccess: '¡Registro exitoso!',
  },
  user: {
    email: 'Email',
    firstName: 'Nombres',
    lastName: 'Apellidos',
    fatherLastName: 'Apellido paterno',
    motherLastName: 'Apellido materno',
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
    invalidUserPasswordCombination: 'Combinación email/contraseña inválida.',
    generic: '¡Algo no está funcionando! Por favor, inténtalo de nuevo más tarde.',
  },
  misc: {
    loading: 'Cargando',
    today: 'hoy',
    tomorrow: 'mañana',
    rules,
  },
  screens: {
    tickets: {
      title: 'Boletos',
      ticketCount: 'Tienes %{count} boletos',
      topTickets: 'Estos son tus top %{count}',
      none: 'No tienes boletos',
      error: 'Se produjo un error',
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
    settings: {
      rulesTitle: 'Reglas',
      moreInfoText: 'Toca acá para más información',
      logoutTitle: 'Cerrar sesión',
    },
    prizes: {
      title: 'Premios',
      text: 'Los premios por boleto, dependiendo de la cantidad de aciertos de dicho boleto, son los siguientes:',
      matches: 'Aciertos',
      prize: 'Premio',
      sharedDisclaimer: 'Los premios grandes serán divididos si hay más de un ganador',
    },
  },
  components: {
    ongoingDraw: {
      title: 'Resultados de la semana',
      jackpotTitle: 'Podrías ganar',
      nextResultTime: 'El próximo número saldrá %{day} a las %{time}',
      hoursUnit: 'hrs',
      minutesUnit: 'min',
      secondsUnit: 'sec',
    },
  },
};

export default es;
