# Arquitectura del Frontend

## Propósito del documento

Este documento describe la arquitectura real del frontend, tal como está implementada en el código. No es una propuesta teórica ni una guía aspiracional: es una radiografía técnica del proyecto para que pueda usarse como contexto completo por personas o por otras IAs que necesiten entender cómo funciona el front, cómo está organizado y cuál es el flujo de ejecución desde el arranque hasta la comunicación con el backend.

El proyecto está orientado a un sistema de logística y viajes. La interfaz gestiona autenticación, viajes, manifiestos, remesas, gastos, vehículos, clientes y un módulo de chat con IA. La estructura general no sigue una arquitectura de “capas puras” tipo Clean Architecture estricta, sino una arquitectura modular por dominio con separación práctica entre presentación, estado, servicios HTTP y utilidades compartidas.

---

## Resumen ejecutivo

La aplicación está construida con React + TypeScript + Vite, usa Tailwind CSS 4 como sistema de estilos, Radix UI y un conjunto de componentes estilo shadcn/ui para la base visual, React Router para navegación, Axios para comunicación HTTP, react-hook-form y Zod en partes donde se requiere validación estructurada, Sonner para notificaciones y Lucide React para iconografía.

La arquitectura se apoya en estos principios:

1. Las páginas son contenedores de composición y coordinación.
2. Los formularios delegan lógica de estado y comunicación a hooks específicos del dominio.
3. Las llamadas a backend pasan por una capa de adapters que abstrae endpoints concretos.
4. La navegación y el layout se resuelven por rutas públicas/privadas con un layout compartido.
5. El estado global es mínimo y se maneja con React local state, context muy acotados y localStorage.

No existe Redux, Zustand ni una capa global de cache centralizada. Eso hace que el proyecto sea simple de seguir, pero también implica que varias decisiones de sesión y autenticación viven en el navegador y no en un store robusto.

---

## Stack tecnológico

### Base

- React 19.
- TypeScript.
- Vite como bundler y servidor de desarrollo.
- React Router DOM 7 para rutas y navegación.

### UI y estilos

- Tailwind CSS 4.
- Tailwind Vite plugin.
- Radix UI para primitives accesibles.
- shadcn/ui como patrón de componentes base en `src/components/ui`.
- Lucide React para iconos.
- Sonner para toasts.

### Datos y validación

- Axios para requests.
- react-hook-form y Zod donde los formularios requieren validación formal.
- Capa propia `RequestHttp` + `AxiosRequest` para estandarizar consumo del backend.

### Utilidades

- `clsx` y `tailwind-merge` para composición de clases.
- Recharts para gráficas.

---

## Punto de entrada y arranque

El flujo de arranque es muy directo:

1. `main.tsx` monta React sobre `#root`.
2. `App.tsx` define el router principal.
3. Se inyecta `Toaster` de Sonner de forma global para notificaciones.
4. Las rutas públicas y privadas se resuelven dentro de `BrowserRouter`.

### Archivo de entrada

`src/main.tsx` importa `App` y la hoja global `index.css`. No hay providers globales adicionales en ese nivel. El render ocurre directamente con `createRoot(...).render(<App />)`.

### Raíz de navegación

`src/App.tsx` es el mapa central de navegación. Declara:

- Rutas públicas: `/login`, `/recuperar`.
- Rutas privadas: envueltas por `PrivateRoute` y `PageLayout`.
- Redirección por defecto: cualquier ruta desconocida va a `/login`.

Eso significa que, por defecto, cualquier intento de entrar a una ruta no registrada termina en la pantalla de login.

---

## Arquitectura de rutas

La aplicación usa una división clásica entre experiencia pública y experiencia privada.

### Rutas públicas

Las páginas públicas viven en `src/pages/public`.

- `/login` -> página de acceso.
- `/recuperar` -> recuperación de contraseña.

Estas rutas no pasan por el layout privado. Son pantallas directas, pensadas para funcionar incluso sin sesión.

### Rutas privadas

Las rutas privadas están anidadas bajo:

- `PrivateRoute`
- `PageLayout`

Esto significa dos cosas:

1. Primero se valida si el usuario está autenticado.
2. Si pasa la validación, se renderiza el layout común y dentro de él la ruta hija mediante `Outlet`.

### Rutas privadas activas

Las rutas que hoy están declaradas incluyen:

- `/menu-principal`
- `/nuevo-viaje`
- `/viaje/:id`
- `/info-cliente`
- `/manifiesto`
- `/tabla-viaje`
- `/vehiculos`
- `/chat-bot`
- `/chat-bot/nuevo`
- `/chat-bot/:chatId`

### Observación técnica importante

La navegación está orientada a módulos de negocio, no a una jerarquía genérica de componentes. El router no expone una estructura “admin / reports / settings” sino entidades funcionales del dominio de logística.

---

## Control de acceso

El acceso privado es simple y está basado en `localStorage`.

### `PrivateRoute`

`src/pages/routes/PrivateRoute.tsx` comprueba:

- `localStorage.getItem("auth") === "true"`

Si la condición se cumple, renderiza los hijos.
Si no, redirige a `/login`.

### Implicación de este enfoque

Esto es una autenticación de interfaz, no un sistema seguro de sesión a nivel cliente-servidor. La app asume que el backend ya validó al usuario y que el frontend solo necesita bloquear navegación visual.

No hay aquí:

- refresh tokens visibles en el front.
- un auth provider global.
- persistencia cifrada.
- validación de permisos con guardas de roles centralizadas.

El control de rol existe, pero es local y de negocio, no un sistema de seguridad completo.

### `useAuth`

`src/hooks/useAuth.ts` encapsula la lectura de sesión:

- parsea `localStorage.user`.
- lee `localStorage.auth`.
- en caso de error de JSON devuelve un fallback seguro.

Ese hook se usa en páginas, menús y formularios para saber:

- quién es el usuario.
- si la sesión existe.
- qué rol tiene.

### Logout

`UserMenu` elimina `auth` y `user` de `localStorage` y navega a `/login`.

---

## Layout global

El layout privado está centralizado en `src/components/layout/PageLayout.tsx`.

### Estructura del layout

`PageLayout` envuelve el contenido privado con `LayoutTitleProvider` y luego renderiza:

- header superior.
- contenido principal.
- botón flotante del chatbot.

### Header

El header contiene:

- título dinámico de la vista.
- menú de usuario.
- botón de modo oscuro.

La composición está hecha en una grilla de tres columnas para dejar el título centrado y los controles alineados a la derecha.

### Cuerpo

El `<main>` del layout centra el contenido y lo limita visualmente para mantener consistencia entre pantallas.

### `Outlet`

La renderización de las rutas hijas depende de `Outlet` de React Router. Eso permite que el mismo frame visual sirva para múltiples pantallas sin repetir header, toggle de tema o menú de usuario.

### Botón del chatbot

`ChatBotButton` está siempre presente en el layout privado y flota en la esquina inferior derecha. Su función es llevar al módulo de chat sin depender del menú principal.

---

## Título dinámico de pantalla

El proyecto usa un contexto específico para el título del layout.

### `LayoutTitleContext`

`src/context/LayoutTitleContext.tsx` expone:

- `title`
- `setTitle`

El layout lee el título desde ese contexto y cada página puede cambiarlo al montarse.

### Cómo se usa

Páginas como `MenuPrincipal`, `NuevoViaje`, `Viaje`, `Vehiculos` o el módulo de chat hacen `setTitle(...)` dentro de un `useEffect` al iniciar.

### Resultado práctico

El título superior del header no está hardcodeado. Es un título de contexto de pantalla, controlado por cada vista según el módulo actual.

---

## Modo oscuro

El tema oscuro está implementado con una clase global y variables CSS.

### `useDarkMode`

`src/context/useDarkMode.ts`:

- lee `localStorage.darkMode`.
- si no existe, respeta `prefers-color-scheme` del sistema.
- agrega o quita la clase `dark` en `document.documentElement`.
- persiste la preferencia en `localStorage`.

### `ThemeToggleButton`

El botón del header alterna el booleano de `useDarkMode` y cambia el icono entre sol y luna.

### CSS y tokens

`src/index.css` define variables CSS para modo claro y oscuro y las conecta con Tailwind mediante `@theme inline`.

Eso hace que el estilo dependa de tokens y no de colores desperdigados por toda la app.

---

## Sistema visual

### Tailwind + variables

El proyecto usa una base de Tailwind muy centrada en variables.

`index.css` define:

- colores de fondo y foreground.
- card, popover, primary, secondary, muted, accent, border, ring.
- una versión equivalente para `.dark`.

### shadcn/ui

La carpeta `src/components/ui` contiene primitivas visuales reutilizables:

- button.
- input.
- select.
- dialog.
- table.
- tabs.
- tooltip.
- scroll-area.
- card.
- avatar.
- badge.
- checkbox.
- switch.
- textarea.
- alert-dialog.

Estas piezas están pensadas como envoltorios estilizados de Radix UI, no como componentes de negocio.

### Alias de imports

`vite.config.ts` configura el alias `@` hacia `src`. El archivo `components.json` también define alias para `components`, `utils`, `ui`, `lib` y `hooks`.

Eso explica por qué el código mezcla imports relativos en algunos archivos y alias en otros: el proyecto soporta ambos estilos.

---

## Organización por capas

La arquitectura real se entiende mejor como estas capas:

### 1. Presentación

Vive en `src/components` y `src/pages`.

Incluye:

- layout.
- formularios.
- tablas.
- modales.
- chat.
- páginas públicas y privadas.

### 2. Estado y lógica de UI

Vive en `src/hooks`.

Aquí se concentra:

- estado de formularios.
- efectos de carga.
- paginación.
- envío de datos.
- composición de payloads.
- selección de registros.
- control de loading y errores.

### 3. Servicios y acceso a API

Vive en `src/services`.

Aquí está la interacción con backend a través de:

- `http/ApiRemote.ts`
- `http/HttpRequest.ts`
- `http/routes.types.ts`
- `adapters/*.adapter.ts`

### 4. Infraestructura y utilidades

Vive en:

- `src/context`
- `src/lib`
- `src/mocks`
- `src/utils`

---

## Capa HTTP

La capa HTTP es una de las partes más importantes del proyecto porque abstrae la URL concreta de cada endpoint.

### `routes.types.ts`

`src/services/http/routes.types.ts` centraliza el catálogo de endpoints del backend.

El objeto `routes` agrupa rutas por dominio:

- usuarios.
- clientes.
- gastos.
- lugares.
- manifiestos.
- viajes.
- roles.
- gastoxviaje.
- auth.
- chats.
- mensajes.
- ia.
- vehiculos.
- remesas.
- mercanciaPeligrosa.
- seguros.

Cada grupo expone operaciones como `getAll`, `getById`, `create`, `update`, `delete` o variantes más específicas.

### `RequestHttp`

`src/services/http/HttpRequest.ts` resuelve la petición final a partir de:

- `base`.
- `entry`.
- `method`.
- `data`.
- parámetros opcionales.

Su comportamiento técnico es el siguiente:

1. Toma el template de ruta desde `routes[base][entry]`.
2. Reemplaza placeholders como `{id}` o `{id_chat}` con parámetros reales.
3. Los parámetros que no se usan en el path pasan a querystring.
4. Llama a `AxiosRequest` con la URL final.

Eso le da al proyecto una capa tipo “router de endpoints” muy controlada.

### `AxiosRequest`

`src/services/http/ApiRemote.ts` crea una instancia Axios con:

- `BASE_URL` como baseURL.
- timeout de 90000 ms.
- header `Content-Type: application/json` por defecto.

También define un interceptor de respuesta que:

- deja pasar la respuesta normal.
- captura errores.
- devuelve `error.response?.data` o un mensaje genérico.

### Manejo de FormData

Si el payload es `FormData`, no se fuerza `Content-Type: application/json`. Eso permite subir archivos o formularios mixtos sin romper el request.

### Conclusión de esta capa

En vez de construir fetch/axios en cada componente, el proyecto usa una capa consistente que reduce repetición y mantiene los endpoints centralizados.

---

## Capa de adapters

Los adapters son la traducción entre el lenguaje del frontend y el contrato del backend.

### Función principal

Cada adapter expone funciones como:

- `loginUser`
- `createCliente`
- `getChatsByUsuario`
- `createChat`
- `updateChat`
- `deleteChat`
- `getPaginatedViajesByUsuario`
- `createNewViaje`
- `getViajeById`
- `updateViaje`
- `getManifiestoById`
- `updateManifiesto`
- `getRemesasByViaje`
- `updateRemesa`
- `iaInteligente`

### Qué hacen realmente

Los adapters no contienen UI ni lógica de presentación. Su trabajo es:

1. Recibir argumentos de dominio.
2. Llamar a `RequestHttp`.
3. Devolver la respuesta tipada o semitipificada.

### Ventaja

Si cambia la ruta del backend, el ajuste ocurre en `routes.types.ts` y/o en el adapter correspondiente, no repartido por todos los componentes.

---

## Patrón de página

El proyecto usa un patrón de “página contenedora + componentes de dominio + hooks”.

### Responsabilidad de las páginas

Las páginas de `src/pages/private` no son vistas monolíticas. Suelen:

- establecer el título del layout.
- leer sesión o rol.
- componer formularios o tablas.
- decidir qué submódulos mostrar.
- coordinar navegación y guardado.

### Ejemplos

#### `MenuPrincipal`

Es el punto de entrada funcional del módulo privado.

- cambia el título del layout.
- detecta si el usuario tiene rol `Contador`.
- si es contador, permite seleccionar un conductor y ver sus viajes.
- si no, muestra los viajes del usuario actual.
- ofrece acceso a gestión de vehículos.

#### `NuevoViaje`

Es una pantalla de composición de formularios.

- presenta tres secciones: detalles del viaje, manifiesto y remesa.
- no monta un wizard formal, sino botones que alternan visibilidad.
- recolecta los `body` de cada formulario en estados separados.
- al final, combina esos objetos en uno solo para crear el viaje en backend.

#### `Viaje`

Es la vista de detalle y edición de un viaje existente.

- carga datos del viaje por ID.
- carga manifiesto y remesa asociados.
- permite alternar entre detalles, manifiesto, gastos y remesa.
- guarda cambios parciales por entidad.
- aplica restricciones por rol: si el usuario es contador, parte de la edición se bloquea.

#### `Vehiculos`

- cambia el título del layout.
- obtiene el usuario desde localStorage.
- muestra tablas de vehículos propios y, si existe, del contador asociado.
- mantiene preparado un modal de visualización de vehículo.

#### Chat

El chat se divide entre lista de chats y ventana de conversación, con navegación por `chatId`.

---

## Patrón de formularios

La mayor parte de formularios siguen un patrón de doble capa:

1. El componente visual renderiza inputs, selects, textareas y botones.
2. El hook del formulario administra estado, cambio de campos, inicialización y envío.

### Características del patrón

- El formulario visual suele ser delgado.
- El hook contiene `useState`, `useEffect` y handlers.
- El formulario emite su estado al padre mediante `onChange` cuando el padre necesita componer un payload mayor.
- El rol puede alterar la edición, por ejemplo deshabilitando campos para `Contador`.

### `useClienteForm` / `ClienteForm`

`ClienteForm` solo dibuja inputs de nombre, NIT y teléfono.

`useClienteForm`:

- inicializa el objeto `cliente` usando `user.id_usuario`.
- controla `handleChange`.
- en `handleSubmit` llama `createCliente`.
- notifica al padre si se creó correctamente.

### `useRemesaForm` / `RemesaForm`

Aquí el patrón es más sofisticado:

- existe un estado fuerte con `RemesaFormData`.
- `initialData` se carga una sola vez.
- `onChange` se emite en cada modificación.
- `setField` permite cambiar selects y switches que no usan eventos HTML estándar.
- si `mercancia_peligrosa` es true, aparecen campos adicionales.

### `DetallesViajeForm`

Es uno de los formularios más completos.

- consume `useDetallesViajeForm`.
- obtiene listas de clientes y lugares.
- permite crear cliente nuevo desde un modal.
- sincroniza datos iniciales al editar.
- transforma fechas al formato `YYYY-MM-DD` para inputs tipo date.
- bloquea edición según rol.

### Recolección de body en formularios compuestos

En pantallas como `NuevoViaje` o `Viaje`, los formularios hijos no se envían por separado necesariamente. En su lugar, cada uno notifica el estado al padre y el padre arma el payload final.

Ese patrón es importante porque el viaje final no es una sola entidad plana desde la perspectiva del front, sino una composición de varias entidades relacionadas.

---

## Patrón de tablas

Las tablas también separan presentación y datos.

### `TablaViajes`

La tabla de viajes:

- recibe `idUsuario`.
- usa `useViajesTable` para traer datos paginados.
- navega a `/nuevo-viaje` o al detalle `/viaje/:id`.
- muestra paginación simple anterior/siguiente.
- marca visualmente el estado activo/inactivo del viaje.

### `useViajesTable`

El hook:

- mantiene `viajes`, `errorMsg`, `page`, `totalPages`.
- usa `useEffect` para recargar cuando cambia `page` o `idUsuario`.
- evita actualizar estado si el componente ya se desmontó mediante `isMounted`.

### Otras tablas

El proyecto tiene otras tablas para:

- conductores.
- detalle de viaje.
- gastos.
- vehículos.

Estas tablas suelen combinarse con cards, buttons, scroll areas y modales.

---

## Patrón de chat

El chat no es un simple “mensajero”, sino un módulo con listado, edición y conversación con IA.

### Estructura del chat

- `ChatListPage` muestra los chats de usuario.
- `ChatPage` muestra una conversación concreta o una nueva.
- `ChatBotButton` da acceso rápido desde el layout.
- `useChatListPage` administra listado, edición y eliminación.
- `useChatWindow` / `useChat` administran conversación, entrada y envío.

### Lista de chats

`useChatListPage`:

- obtiene el usuario actual.
- cambia el título del layout.
- carga chats por usuario.
- permite editar nombre.
- permite eliminar chat con confirmación.
- usa toasts para feedback.

### Ventana de chat

La conversación:

- carga mensajes previos si existe `chatId`.
- si no existe, crea un mensaje de bienvenida inicial.
- cuando el usuario envía texto, agrega el mensaje al estado local de inmediato.
- luego llama a `iaInteligente` con `user.id_usuario`, la pregunta y el `chatId` actual.
- si la IA crea un nuevo chat, el hook actualiza `chatId` internamente.

### Modelo de mensajes

La vista no parece renderizar directamente el formato del backend. En cambio, mapea mensajes backend a una lista de objetos front con forma:

- `id`
- `from`
- `text`

Eso simplifica el render del chat y desacopla el diseño de la estructura exacta de la API.

### Observación funcional

Este módulo depende bastante del backend para persistencia y de la capa IA para generar respuestas. El frontend solo orquesta el flujo visual y el estado temporal.

---

## Modelo de negocio visible en el front

A partir del código se identifica un dominio bastante claro:

- un usuario autenticado opera el sistema.
- un usuario puede tener rol de `Contador` o un rol operativo.
- el sistema maneja viajes que tienen cliente, origen, destino, fechas, manifiesto y remesa.
- los viajes pueden tener gastos asociados.
- también existen vehículos y seguros asociados al flujo de transporte.
- el chat sirve como herramienta de asistencia o interacción inteligente.

### Reglas de negocio visibles

1. El rol `Contador` cambia permisos y visualización.
2. El usuario actual se toma desde localStorage.
3. El viaje se construye a partir de varias piezas de formulario.
4. Algunas entidades se editan de forma parcial y luego se consolidan con un botón de guardar.
5. La interfaz prioriza operaciones por usuario, por viaje y por rol.

---

## Manejo de estado

### Qué tipo de estado usa el proyecto

La mayoría del estado está distribuido así:

- `useState` para formularios, modales, paginación y selección.
- `useEffect` para cargar datos y sincronizar props con estado local.
- `useContext` solo para título del layout.
- `localStorage` para auth, user y dark mode.

### Qué no usa

- No se observa un store global tipo Redux.
- No se observa un cache global tipo React Query.
- No se observa un event bus central.

### Consecuencia

Es una arquitectura fácil de seguir, pero cada módulo se responsabiliza de sus propios fetches y sincronización. Eso reduce complejidad inicial, aunque aumenta el riesgo de duplicar patrones si el proyecto crece mucho.

---

## Manejo de errores y feedback

El proyecto mezcla varias estrategias de feedback:

- `toast` / `toast.success` / `toast.error` / `toast.warning` con Sonner.
- `alert(...)` en algunos flujos concretos.
- mensajes visibles en la UI para estados de error en tablas.
- `console.error(...)` para trazas técnicas.

### Capa HTTP

El interceptor de Axios ya normaliza parcialmente errores del backend, de modo que varios hooks reciben un objeto de error más cercano a la respuesta del servidor que a un error Axios puro.

### Importante

No todo el proyecto maneja errores con el mismo nivel de formalidad. Hay pantallas más maduras y otras con manejo más directo o provisional.

---

## Convenciones de código observables

### Alias de import

El proyecto usa `@/` para apuntar a `src` en muchos archivos.

### Componentes delgados

Cuando el patrón está bien aplicado, el componente visual solo pinta la UI y el hook controla estado y side effects.

### Nombres en español

Una parte importante del dominio está nombrada en español:

- `viajes`
- `manifiesto`
- `remesa`
- `vehiculos`
- `gastos`
- `clientes`
- `recuperar`
- `menu-principal`

Eso hace que el código sea coherente con el negocio real, aunque mezcla inglés en APIs, librerías y algunas partes de infraestructura.

### Uso de `localStorage`

Las claves más visibles son:

- `auth`
- `user`
- `darkMode`

### Estado y props

En formularios complejos se suele pasar `onChange` hacia arriba para que la pantalla contenedora acumule partes de un payload.

---

## Estructura de carpetas por intención

### `src/pages/public`

Pantallas accesibles sin sesión.

### `src/pages/private`

Pantallas principales de negocio detrás de autenticación.

### `src/pages/routes`

Guardas o componentes de control de navegación.

### `src/components/layout`

Header, layout principal, control de título, tema y menú de usuario.

### `src/components/forms`

Formularios de entidades del dominio.

### `src/components/tables`

Tablas de consulta y navegación por registros.

### `src/components/modals`

Diálogos reutilizables y acciones secundarias.

### `src/components/chat`

UI del módulo de chat.

### `src/hooks`

Lógica de estado y comunicación del front.

### `src/services`

Capa de acceso al backend.

### `src/context`

Contextos pequeños y puntuales.

### `src/components/ui`

Biblioteca base de UI reutilizable.

---

## Relación entre UI y backend

El frontend no parece tener una capa de dominio desacoplada del todo. Más bien funciona así:

1. La UI captura datos.
2. El hook transforma y prepara el estado.
3. El adapter traduce a endpoint.
4. La capa HTTP ejecuta la petición.
5. El backend responde con una estructura que la UI consume directamente o adapta mínimamente.

Esto es suficiente para una aplicación de negocio de tamaño pequeño o medio y facilita desarrollo rápido.

### Ventaja

Es fácil seguir el flujo sin saltar entre demasiadas capas.

### Riesgo

Si el backend cambia mucho, el contrato puede propagarse a varios hooks y formularios si no se mantiene el adapter como única frontera real.

---

## Limitaciones técnicas visibles

Estas limitaciones no son errores necesariamente, pero sí rasgos importantes de la arquitectura actual:

1. La autenticación está basada en `localStorage` y no en una sesión robusta visible en el front.
2. No hay un estado global unificado para todo el dominio.
3. No hay cache central de peticiones.
4. Hay mezcla de imports relativos y alias.
5. Hay carpetas heredadas o duplicadas como `forms copy`, que sugieren evolución incremental del proyecto.
6. Parte del manejo de errores sigue siendo manual y heterogéneo.
7. Algunos flujos usan `alert` además de toasts.

---

## Lectura práctica de la arquitectura

Si tuviera que describir este front en una sola frase técnica, diría que es una SPA modular en React, organizada por features de negocio, con layout compartido, control de acceso local, hooks por dominio y una capa de adapters que centraliza el consumo del backend.

No es una app de composición puramente declarativa ni una app con arquitectura hexagonal estricta. Es una aplicación pragmática, construida para operar rápido sobre un dominio concreto.

---

## Flujo técnico completo de uso

### Inicio de sesión

1. El usuario entra a `/login`.
2. La pantalla de login valida credenciales mediante el adapter de auth.
3. El backend responde.
4. La app guarda `auth` y `user` en localStorage.
5. La navegación pasa a rutas privadas.

### Navegación privada

1. `PrivateRoute` verifica `auth`.
2. Si existe sesión, se renderiza `PageLayout`.
3. `PageLayout` muestra header, título, menú, tema y botón de chat.
4. `Outlet` renderiza la página hija.

### Consulta de datos

1. La página monta un hook de dominio.
2. El hook llama al adapter correspondiente.
3. El adapter usa `RequestHttp`.
4. `RequestHttp` resuelve el endpoint final desde `routes.types.ts`.
5. `AxiosRequest` ejecuta la llamada.
6. La respuesta se mapea al estado local.

### Guardado de formularios

1. El usuario modifica campos.
2. El hook actualiza el estado.
3. El formulario puede emitir `onChange` al padre.
4. La pantalla padre arma el payload final.
5. Se llama al adapter `create` o `update`.
6. Se muestra feedback y se navega o recarga datos según el caso.

### Cierre de sesión

1. El usuario usa `UserMenu`.
2. El menú elimina `auth` y `user`.
3. La app navega a `/login`.

---

## Qué conviene saber para extender el proyecto

Si alguien va a agregar una nueva pantalla o entidad, el patrón más consistente sería:

1. Definir endpoint en `routes.types.ts`.
2. Crear o ampliar un adapter en `src/services/adapters`.
3. Crear el hook de estado y side effects en `src/hooks`.
4. Construir el componente visual en `src/components` o la página en `src/pages`.
5. Conectar título de layout si es una vista privada.
6. Usar `PageLayout` y `PageContent` cuando aplique.
7. Mantener la sesión y el rol leyendo `useAuth`.

Ese flujo encaja con la arquitectura que ya existe y evita romper la lógica de navegación o el acceso a datos.

---

## Conclusión

Este frontend está estructurado con una arquitectura modular, centrada en el dominio de negocio y en la composición de pantallas. La navegación se resuelve con React Router, el layout compartido aporta identidad visual y control común, la sesión se gestiona con localStorage, y la comunicación con backend pasa por una capa de HTTP y adapters que mantienen el código relativamente ordenado.

La fortaleza principal del proyecto es la claridad de su patrón repetido: página -> hook -> adapter -> HTTP. La debilidad principal es que parte del estado crítico sigue siendo local y ad hoc, por lo que el sistema depende bastante de disciplina de implementación para no fragmentarse con el crecimiento.

Si este documento se usa como contexto para otra IA, debería bastar para entender qué módulo vive dónde, cómo se conecta todo, cuál es el flujo de datos y qué supuestos arquitectónicos tiene el front.