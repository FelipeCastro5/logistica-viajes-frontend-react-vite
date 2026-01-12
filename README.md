# 🧠 Sistema de Gestión de Viajes con Asistente IA

Este proyecto es una aplicación **React + TypeScript** construida con **Vite** que permite gestionar viajes, gastos, clientes y manifiestos. Además, integra un **chatbot con inteligencia artificial** para facilitar la interacción y resolver preguntas relacionadas con los datos o el sistema.

---

## 🚀 Características Principales

- **Gestión de Viajes**: Crear, editar, y visualizar detalles de viajes.
- **Administración de Gastos**: Registro de gastos por viaje, tipo y fecha.
- **Clientes y Manifiestos**: Formularios intuitivos para administrar clientes y manifiestos.
- **Dashboard de Gráficas**: Visualización de datos financieros con múltiples gráficas.
- **ChatBot IA**: Chat conversacional para consultar información del sistema.
- **Autenticación y Rutas Protegidas**: Inicio de sesión, recuperación de contraseña y rutas privadas.
- **Interfaz moderna**: Basada en componentes reutilizables (`ui`) y diseño responsive.
- **Scroll inteligente**: Áreas con scroll independiente para mejores UX en tablas y chats.

---

## 📁 Estructura del Proyecto

```text
├── App.tsx # Configuración de rutas y layout principal
├── main.tsx # Punto de entrada
├── index.css # Estilos globales
│
├── assets/ # Recursos estáticos
│
├── components/ # Componentes reutilizables organizados por dominio
│ ├── chat/ # UI y lógica del chatbot IA
│ ├── forms/ # Formularios principales
│ ├── graphics/ # Gráficas (ChartJS o Recharts)
│ ├── layout/ # Layout y barra de navegación
│ ├── modals/ # Modales reutilizables
│ ├── tables/ # Tablas de datos con scroll
│ └── ui/ # Componentes base reutilizables (botones, inputs, cards, etc.)
│
├── context/ # Context API (ej: tema oscuro, título de página)
│
├── hooks/ # Hooks personalizados (formularios, tablas, chatbot, etc.)
│
├── lib/ # Funciones auxiliares generales
│
├── pages/ # Vistas de alto nivel
│ ├── public/ # Login, recuperación de contraseña
│ ├── private/ # Menú, viajes, dashboard
│ └── routes/ # Lógica de rutas privadas
│
└── services/ # Lógica de conexión API
  ├── adapters/ # Lógica de negocio conectada a servicios externos
  └── http/ # Abstracción de llamadas HTTP

```

---

## 🧠 Inteligencia Artificial

El chatbot está integrado con una API que:

- Genera respuestas en lenguaje natural.
- Devuelve un título para el primer mensaje de cada conversación nueva.
- Permite guardar y recuperar el historial de mensajes por `chatId`.

---

## 📊 Gráficas

Componentes gráficos especializados muestran:

- Gastos por tipo.
- Gastos por viaje.
- Comparativas de ingresos vs egresos.

---

## 📦 Dependencias Principales

- React + TypeScript + Vite
- React Router DOM
- Tailwind CSS
- Shadcn/ui
- Axios
- Zod / React Hook Form (según necesidades de validación)
- Chart.js / Recharts (para gráficas)

---

## 🛡️ Seguridad

- Autenticación basada en tokens.
- Rutas privadas protegidas.
- Hook `useAuth` para manejo global del usuario autenticado.

---

## 🧪 Testing & Escalabilidad

- Arquitectura modular basada en hooks y componentes reutilizables.
- Separación clara entre lógica (hooks/adapters) y presentación (components).
- Lista para escalar y mantener.

---

## 📋 Por hacer

- ✅ Integración de IA
- ✅ Scroll inteligente en tablas y chat
- ⬜ Tests unitarios con Vitest
- ⬜ Soporte multilenguaje
- ⬜ Control de permisos por rol

---

## 👨‍💻 Autor

Desarrollado con por Daniel Felipe Castro Lizarazo.

---
