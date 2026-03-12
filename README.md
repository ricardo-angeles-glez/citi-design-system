# Citibanamex Design System

Una librería de componentes y tokens de diseño profesional para aplicaciones bancarias, inspirada en la marca Citibanamex.

## ✨ Características

- **Tokens de diseño**: Colores, tipografía, espaciado, sombras y animaciones
- **Componentes React**: Button, Input, Card, Badge, Avatar, ProductCard, ListItem, AppHeader, IconWrapper
- **Demo de aplicación bancaria**: App móvil con navegación completa
- **Dashboard de documentación**: Ver componentes en vivo con ejemplos interactivos

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ver storybook
npm run storybook
```

## 📁 Estructura del Proyecto

```
src/
├── components/      # Componentes de la librería
├── pages/          # Páginas de la demo de la app bancaria
├── dashboard/      # Dashboard de documentación
├── tokens/         # Tokens de diseño (colores, tipografía, espaciado)
├── styles/         # Estilos globales y CSS variables
├── data/           # Datos de ejemplo
└── utils/          # Utilidades
```

## 🔧 Componentes

- **Button**: Botones con variantes primary, secondary, ghost, danger, disabled
- **Input**: Campos de texto con labels, errores y placeholders
- **Card**: Tarjetas contenedoras con sombras y bordes
- **Badge**: Etiquetas de estado (nuevo, beneficios, etc.)
- **Avatar**: Avatares de usuario con inicial
- **ProductCard**: Tarjetas de productos bancarios
- **ListItem**: Elementos de lista con iconos y acciones
- **AppHeader**: Header de la app con navegación
- **IconWrapper**: Wrapper para iconos con categorías

## 🎨 Tokens de Diseño

### Colores

```css
--color-primary-500: #B51E1E; /* Citibanamex Red */
--color-primary-600: #8B1717;
--color-neutral-100: #F5F5F5;
--color-neutral-200: #E0E0E0;
--color-neutral-900: #1A1A1A;
--color-success-500: #28A745;
--color-warning-500: #FFC107;
--color-error-500: #DC3545;
```

### Espaciado

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

### Tipografía

```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;
```

## 📦 Instalación

```bash
npm install citi-design-system
```

## 📖 Documentación

Para ver la documentación completa y ejemplos interactivos, ejecuta:

```bash
npm run storybook
```

Esto iniciará Storybook en http://localhost:6006

## 🔨 Desarrollo

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`
4. Accede a la app demo en http://localhost:5173
5. Accede al dashboard de documentación en http://localhost:5174

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📝 Licencia

MIT © Citibanamex Design System Team
