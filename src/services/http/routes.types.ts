// src/http/routes.types.ts
export const routes = {
  usuarios: {
    getAll: "/usuarios/getAll",
    getById: "/usuarios/getById/{id}",
    create: "/usuarios/create",
    update: "/usuarios/update",
    delete: "/usuarios/delete/{id}"
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
    delete: "/manifiestos/delete/{id}"
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
    delete: "/gastoxviaje/delete/{id}",
    getByViaje: "/gastoxviaje/getGastosByViaje"
  },
  auth: {
    login: "/Auth/login",
    updatePassword: "/Auth/update-password"
  }
} as const
