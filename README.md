# 🛒 Tienda Online - E-commerce React

> **Tienda online moderna con React, Firebase y gestión de carrito en tiempo real. Sistema completo de compras con control de stock, checkout y música ambiente.**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.1.0-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

## ✨ Características Principales

### 🎯 Funcionalidades Core
- **Catálogo de Productos**: Navegación por categorías (Ropa, Calzado, Electrónica, Hogar)
- **Carrito Inteligente**: Persistencia en localStorage con sincronización en tiempo real
- **Control de Stock**: Gestión automática de inventario conectada a Firebase
- **Sistema de Checkout**: Proceso de compra completo con validación de formularios
- **Responsive Design**: Optimizado para dispositivos móviles y desktop

### 🎵 Características Especiales
- **Música Ambiente**: Reproductor con más de 50 pistas temáticas de Deltarune
- **Interfaz Moderna**: Diseño oscuro con gradientes y efectos visuales
- **Navegación Fluida**: React Router con manejo de rutas dinámicas
- **Experiencia de Usuario**: Animaciones y transiciones suaves

## 🚀 Demo

🔗 **[Ver Demo en Vivo](https://tiendaonline-delarosa.vercel.app)**

## 📱 Capturas de Pantalla

<details>
<summary>Ver capturas</summary>

| Página Principal | Carrito de Compras |
|:---------------:|:------------------:|
| ![Home](https://res.cloudinary.com/dw2auacau/image/upload/v1756161077/home.png) | ![Cart](https://res.cloudinary.com/dw2auacau/image/upload/v1756161118/cart.png) |

| Detalle de Producto | Checkout |
|:------------------:|:--------:|
| ![Detail](https://res.cloudinary.com/dw2auacau/image/upload/v1756161141/detail.png) | ![Checkout](https://res.cloudinary.com/dw2auacau/image/upload/v1756161168/checkout.png) |

</details>

## 🛠️ Tecnologías

### Frontend
- **React 19.1.0** - Framework principal
- **React Router 7.7.1** - Navegación SPA
- **Vite 7.0.0** - Build tool y dev server
- **CSS3** - Estilos modernos con gradientes y animaciones

### Backend & Base de Datos
- **Firebase Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Hosting** - Desplegado en la nube

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Vercel** - Deployment y CI/CD
- **Git** - Control de versiones

## ⚡ Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/nicholas-delarosa/CreaTuLanding-DelaRosa.git
cd tienda-online

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de Firebase

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_KEY=tu_firebase_api_key
VITE_API_AUTH=tu_firebase_auth_domain
VITE_API_PROJECT=tu_firebase_project_id
VITE_API_STORAGE=tu_firebase_storage_bucket
VITE_API_MESSAGING=tu_firebase_messaging_sender_id
VITE_API_APP=tu_firebase_app_id
```

### Configuración de Firebase
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Configura las reglas de seguridad
4. Importa los productos iniciales (ver `src/data/products.js`)

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── common/           # Componentes reutilizables
│   │   ├── CartWidget.jsx
│   │   ├── MusicPlayer.jsx
│   │   └── ProductCard.jsx
│   ├── layout/           # Layout y navegación
│   │   └── NavBar.jsx
│   └── pages/            # Páginas principales
│       ├── ItemListContainer/
│       ├── carrito/
│       ├── checkout/
│       └── ...
├── context/              # Context API para estado global
│   └── CartContext.jsx
├── data/                 # Datos iniciales
│   └── products.js
└── firebaseConfig.js     # Configuración de Firebase
```

## 🎯 Funcionalidades Detalladas

### 🛒 Sistema de Carrito
- **Persistencia**: Los productos se mantienen en localStorage
- **Stock en Tiempo Real**: Actualización automática del inventario
- **Agrupación Inteligente**: Los productos duplicados se agrupan automáticamente
- **Cálculo Dinámico**: Total actualizado en tiempo real

### 📦 Gestión de Productos
- **Filtrado por Categorías**: Navegación intuitiva por tipo de producto
- **Búsqueda Dinámica**: Encuentra productos por nombre
- **Control de Stock**: Prevención de sobre-venta
- **Imágenes Optimizadas**: Carga rápida con Cloudinary

### 💳 Proceso de Checkout
- **Validación de Formularios**: Campos obligatorios con feedback
- **Generación de Órdenes**: ID único para cada compra
- **Confirmación por Email**: Notificación automática (próximamente)
- **Historia de Pedidos**: Tracking de órdenes (próximamente)

## 🎵 Sistema de Audio

El reproductor incluye una biblioteca de más de 50 pistas de la banda sonora de Deltarune, creando una experiencia de compra única y envolvente.

```javascript
// Reproducir música aleatoria
const playRandomSong = () => {
    const randomSong = getRandomSong();
    audioRef.current.src = randomSong;
    audioRef.current.play();
};
```

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Calidad de código
npm run lint         # Ejecutar ESLint
```

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Firebase Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login y deploy
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] **Autenticación de usuarios** (Firebase Auth)
- [ ] **Sistema de reviews** y calificaciones
- [ ] **Filtros avanzados** (precio, marca, rating)
- [ ] **Lista de deseos** y favoritos
- [ ] **Notificaciones push** para ofertas
- [ ] **Dashboard administrativo** para gestión
- [ ] **Integración de pagos** (Stripe/PayPal)
- [ ] **Sistema de cupones** y descuentos

## 🐛 Reportar Issues

Si encuentras algún bug o tienes sugerencias, por favor crea un [issue](https://github.com/nicholas-delarosa/CreaTuLanding-DelaRosa/issues).

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [Nicholas De la Rosa](https://github.com/nicholas-delarosa)
- Email: nicholasandresdelarosarivera@hotmail.com

---

<div align="center">

**¿Te gustó el proyecto? ¡Dale una ⭐!**

*Hecho con ❤️ y React*

</div>
