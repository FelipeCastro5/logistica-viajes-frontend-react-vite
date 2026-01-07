// src/http/routes.types.ts
export const routes = {
  usuarios: {
    getAll: "/usuarios/getAll",
    getById: "/usuarios/getById/{id}",
    create: "/usuarios/create",
    update: "/usuarios/update",
    delete: "/usuarios/delete/{id}",
    getConductoresByFilter: "/usuarios/getConductoresByFilter"
  },
  clientes: {
    getAll: "/clientes/getAll",
    getById: "/clientes/getById/{id}",
    create: "/clientes/create",
    update: "/clientes/update",
    delete: "/clientes/delete/{id}",
    getClientesByUsuario: "/clientes/getClientesByUsuario"
  },
  gastos: {
    getAll: "/gastos/getAll",
    getById: "/gastos/getById/{id}",
    create: "/gastos/create",
    update: "/gastos/update",
    delete: "/gastos/delete/{id}"
  },
  lugares: {
    getAll: "/lugares/getAll",
    getById: "/lugares/getById/{id}",
    create: "/lugares/create",
    update: "/lugares/update",
    delete: "/lugares/delete/{id}"
  },
  manifiestos: {
    getAll: "/manifiestos/getAll",
    getById: "/manifiestos/getById",
    create: "/manifiestos/create",
    update: "/manifiestos/update",
    delete: "/manifiestos/delete/{id}",
    updateTotalGastos: "/manifiestos/updateTotalGastos" // ✅ Correcto
  },
  viajes: {
    getAll: "/viajes/getAll",
    getById: "/viajes/getById",
    create: "/viajes/create",
    update: "/viajes/update",
    delete: "/viajes/delete/{id}",
    getPaginatedByUsuario: "/viajes/paginatedByUsuario",
    createNewViaje: "/viajes/createNewViaje"
  },
  roles: {
    getAll: "/roles/getAll",
    getById: "/roles/getById/{id}",
    create: "/roles/create",
    update: "/roles/update",
    delete: "/roles/delete/{id}"
  },
  gastoxviaje: {
    getAll: "/gastoxviaje/getAll",
    getById: "/gastoxviaje/getById/{id}",
    create: "/gastoxviaje/create",
    update: "/gastoxviaje/update",
    delete: "/gastoxviaje/delete",
    getByViaje: "/gastoxviaje/getGastosByViaje"
  },
  auth: {
    login: "/Auth/login",
    updatePassword: "/Auth/update-password"
  },
  chats: {
    getByUsuario: "/chats/getByUsuario",
    create: "/chats/create",
    update: "/chats/update",
    delete: "/chats/delete"
  },
  mensajes: {
    getAll: "/mensajes/getAll",
    getByChat: "/mensajes/getByChat"
  },
  ia: {
    conversacionSimple: "/ia/conversacion-simple",
    generarSQL: "/ia/generar-sql",
    mixto: "/ia/mixto",
    inteligente: "/ia/inteligente"
  },
  vehiculos: {
    getAll: "/vehiculos/getAll",
    getByUsuario: "/vehiculos/getByUsuario",
    getById: "/vehiculos/getById",
    create: "/vehiculos/create",
    update: "/vehiculos/update",
    delete: "/vehiculos/delete"
  }, remesas: {
    getAll: "/remesas/getAll",
    getById: "/remesas/getById",
    getByViaje: "/remesas/getByViaje",
    create: "/remesas/create",
    update: "/remesas/update",
    delete: "/remesas/delete"
  },
  mercanciaPeligrosa: {
    getAll: "/mercancia-peligrosa/getAll",
    getById: "/mercancia-peligrosa/getById",
    getByRemesa: "/mercancia-peligrosa/getByRemesa",
    create: "/mercancia-peligrosa/create",
    update: "/mercancia-peligrosa/update",
    delete: "/mercancia-peligrosa/delete"
  },

} as const
