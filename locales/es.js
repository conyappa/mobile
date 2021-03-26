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
  },
};

export default es;
