// src/http/routes.types.ts
export const routes = {
  viajes: {
    getAll: "/viajes/getAll",
    getById: "/viajes/getById/{id}",
    create: "/viajes/create",
    update: "/viajes/update",
    delete: "/viajes/delete/{id}",
    getPaginatedByUsuario: "/viajes/paginatedByUsuario"
  },
  clientes: {
    getAll: "/clientes"
  },
  manifiestos: {
    getAll: "/manifiestos"
  },
  gastos: {
    getAll: "/gastos/getAll",
    getById: "/gastos/getById/{id}",
    create: "/gastos/create",
    update: "/gastos/update",
    delete: "/gastos/delete/{id}"
  },
  auth: {
    login: "/Auth/login",
    updatePassword: "/Auth/update-password"
  }
} as const
