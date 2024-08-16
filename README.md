# Images App

**Images App** es una aplicación para ver y gestionar imágenes. Permite a los usuarios visualizar todas las imágenes, filtrarlas por favoritas y navegar a través de un catálogo de imágenes. La aplicación está construida con React, TypeScript y Tailwind CSS, y está configurada para manejar la autenticación y el almacenamiento local.

## Lógica de Login

El inicio de sesión se realiza contra un servicio local con la siguiente lógica:

- **Usuarios válidos**:
  - Nombres de usuario en minúsculas sin números ni caracteres especiales.
  - Contraseña con formato `123<Usuario>`, donde `<Usuario>` es el nombre de usuario con la primera letra en mayúscula.

### Ejemplos - Casos de Prueba

| Usuario   | Contraseña   | Resultado |
|-----------|--------------|-----------|
| franco    | 123Franco    | ✅        |
| 123franco | 12345Franco  | ❌        |
| franco    | 123Jorge     | ❌        |
| Franco    | 123franco    | ❌        |
| franco    | 123Fra       | ❌        |

### Explicación

- **Usuario válido**: `franco` (en minúsculas, sin números ni caracteres especiales).
- **Contraseña válida**: `123Franco` (empieza con `123` seguido del nombre de usuario con la primera letra en mayúscula).

Los casos de prueba validan si el usuario y la contraseña cumplen con los requisitos especificados.

## Características

- **Visualización de imágenes**: Muestra imágenes en una cuadrícula con soporte para carga infinita.
- **Gestión de favoritos**: Permite a los usuarios marcar imágenes como favoritas y verlas en una vista separada.
- **Menú de navegación**: Acceso rápido a diferentes secciones de la aplicación.
- **Autenticación**: Manejo básico de autenticación con redirección a la página de inicio de sesión.
- **Confirmación de eliminación**: Confirmación antes de eliminar una imagen de favoritos en el detalle de la imagen.

## Tecnologías

## Tecnologías

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: API para manejar imágenes y autenticación (si aplica)
- **Almacenamiento**:
  - `localStorage` para mantener el estado de autenticación y favoritos
  - `IndexedDB` para guardar imágenes en memoria local
- **Gestión de estado**: Zustand para manejo de estado global


## Instalación

Para configurar y ejecutar la aplicación localmente, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/images-app.git
   cd images-app
   npm install
   npm start
# Librerías

La aplicación utiliza las siguientes librerías:

- **@radix-ui/react-dialog**: Componentes para crear diálogos accesibles.
- **@radix-ui/react-icons**: Conjunto de iconos accesibles.
- **@radix-ui/react-toast**: Componentes para mostrar notificaciones.
- **@tanstack/react-query**: Gestión de datos asincrónicos y cache en React.
- **@testing-library/jest-dom**: Extensiones para las aserciones en pruebas con Jest.
- **@testing-library/react**: Herramientas para pruebas de componentes React.
- **@testing-library/user-event**: Simulación de eventos del usuario en pruebas.
- **@types/jest**: Tipos TypeScript para Jest.
- **@types/node**: Tipos TypeScript para Node.js.
- **@types/react**: Tipos TypeScript para React.
- **@types/react-dom**: Tipos TypeScript para React DOM.
- **@types/react-lazy-load-image-component**: Tipos TypeScript para react-lazy-load-image-component.
- **autoprefixer**: Añade prefijos de CSS automáticamente para compatibilidad con navegadores.
- **axios**: Cliente HTTP para hacer solicitudes.
- **postcss**: Herramienta para procesar CSS.
- **react**: Biblioteca principal para construir interfaces de usuario.
- **react-dom**: Paquete para interactuar con el DOM.
- **react-lazy-load-image-component**: Componentes para cargar imágenes de forma perezosa.
- **react-router-dom**: Enrutamiento en aplicaciones React.
- **react-scripts**: Scripts para ejecutar aplicaciones creadas con Create React App.
- **tailwindcss**: Framework CSS para diseño utilitario.
- **typescript**: Superset de JavaScript que añade tipos estáticos.
- **web-vitals**: Métricas para medir el rendimiento de la web.
- **zustand**: Gestor de estado ligero y fácil de usar para React.

## DevDependencies

- **@types/react-lazyload**: Tipos TypeScript para react-lazyload.
- **eslint**: Herramienta para encontrar y arreglar problemas en el código.
- **eslint-config-airbnb-typescript**: Configuración de ESLint basada en Airbnb con soporte para TypeScript.
- **eslint-config-prettier**: Configuración de ESLint para desactivar reglas que podrían entrar en conflicto con Prettier.
- **eslint-import-resolver-typescript**: Resuelve módulos en TypeScript para ESLint.
- **eslint-plugin-import**: Plugin de ESLint para asegurarse de que las importaciones estén bien organizadas.
- **eslint-plugin-prettier**: Plugin de ESLint para integrar Prettier.
- **eslint-plugin-react**: Plugin de ESLint para reglas específicas de React.
- **eslint-plugin-react-hooks**: Plugin de ESLint para reglas de Hooks en React.
- **prettier**: Herramienta para formatear el código.

## Arquitectura
images-app/
├── public/
│   └── index.html                  # Archivo HTML principal
├── src/
│   ├── components/                 # Componentes React reutilizables
│   │   ├── Header.tsx              # Componente Header
│   │   ├── ImageCard.tsx           # Componente ImageCard
│   │   ├── Loader.tsx              # Componente Loader
│   │   ├── Menu.tsx                # Componente Menu
│   │   ├── Skeleton.tsx            # Componente Skeleton
│   │   └── ConfirmDialog.tsx       # Componente ConfirmDialog
│   ├── pages/                      # Páginas principales de la aplicación
│   │   ├── Home.tsx                # Página Home
│   │   ├── ImageDetail.jsx         # Página ImageDetail
│   │   └── Login.tsx               # Página Login
│   ├── services/                   # Servicios para la lógica de negocio y datos
│   │   ├── imageService.ts         # Servicio para la gestión de imágenes
│   │   └── indexedDB.ts            # Servicio para guardar imágenes en memoria local
│   ├── stores/                     # Almacenes de estado global (Zustand)
│   │   ├── favorites.ts            # Almacén para los favoritos
│   │   └── login.ts                # Almacén para el estado de login
│   ├── types/                      # Tipos TypeScript
│   │   └── image.ts                # Tipos para las imágenes
│   ├── App.tsx                     # Componente principal de la aplicación
│   ├── index.tsx                   # Punto de entrada de React
│   ├── tsconfig.json               # Configuración de TypeScript
│   ├── .eslintrc.js                # Configuración de ESLint
│   ├── .prettierrc.js              # Configuración de Prettier
├── .gitignore                      # Archivos y carpetas a ignorar en Git
├── package.json                    # Dependencias y scripts del proyecto
└── README.md                       # Documentación del proyecto
## Uso

- **Inicio de sesión**: Redirige a la página de inicio de sesión.
- **Navegación**: Usa el menú para navegar entre las imágenes y ver los favoritos.
- **Favoritos**: Puedes marcar imágenes como favoritas y verlas en la sección correspondiente.
- **Carga de Imágenes**: La aplicación carga imágenes de forma infinita al hacer scroll.
- **Eliminar Favoritos**: Se requiere confirmación antes de eliminar una imagen de favoritos en el detalle de la imagen.

## Mejoras a Realizar

### Variable de Entorno
Agrega un archivo `.env` en la raíz del proyecto para definir URLs de API y otras configuraciones necesarias.

### Ajustes de Estilos para Móviles
Mejorar la visualización en dispositivos móviles con ajustes en Tailwind CSS y posibles ajustes en los estilos específicos.

### Header
Agregar un logo o texto 'Nombre app' que recargue la página al inicio.

### Diálogo en Detalle de Imagen
Agregar funcionalidad al diálogo de confirmación para eliminar favoritos cuando se está en el detalle de la imagen.

### Rendimiento

#### Carga de Imágenes
Implementar técnicas de carga diferida y optimización de imágenes para mejorar el tiempo de carga.

#### Llamadas a la API
Evaluar el uso de técnicas de cacheo y optimización de llamadas a la API para reducir el número de solicitudes y mejorar el rendimiento general.
