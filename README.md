# Proyecto de Vida Galáctico 🌌

## Descripción General
Aplicación web interactiva y totalmente funcional para la visualización y gestión de proyectos de vida personales, con un diseño temático galáctico inspirador. Construida únicamente con HTML5, CSS3 y JavaScript vanilla (sin frameworks externos).

## Estado Actual
✅ **COMPLETADO Y MEJORADO** - Aplicación totalmente funcional con mejoras de UI/UX y audio

## Tecnologías Utilizadas
- **HTML5**: Estructura semántica y Canvas API
- **CSS3**: Animaciones avanzadas, gradientes, transformaciones 3D, Grid/Flexbox
- **JavaScript ES6+**: Lógica de aplicación vanilla, LocalStorage, Web Audio API
- **Sin dependencias externas**: Código 100% nativo

## Últimas Mejoras (Oct 2025)

### v1.2.0 - Modales y Header Refinado
- 🎨 **Header rediseñado**: Más compacto, ordenado y espacioso
  - Icono reducido a 50px con mejor proporción
  - Espaciado optimizado entre elementos
  - Botones de navegación centrados
  - Toggle de tema más compacto (60x30px)
  - Mejor organización visual en móviles
- 🪟 **Modales personalizados**: Reemplazo completo de prompt() y confirm()
  - Diseño galáctico consistente con la aplicación
  - Animaciones suaves de entrada (fadeIn + slideUp)
  - Soporte para inputs, textareas y confirmaciones
  - Cierre con tecla ESC y clic fuera del modal
  - Modo claro/oscuro integrado
  - Enter para confirmar en inputs

### v1.1.0
- ✨ **Header inicial mejorado**: Icono grande con efecto de brillo y tagline
- 🌓 **Modo oscuro/claro**: Toggle animado con persistencia
- 🎵 **Sonidos mejorados**: Web Audio API con múltiples osciladores
  - Espacio: 4 capas sinusoidales con modulación
  - Lluvia: Gotas procedurales con filtros
  - Océano: 3 capas con LFO
- 🗑️ **Botón de eliminar mejorado**: Animación de rotación
- 🎨 **Tarjetas de visión mejoradas**: Mejor diseño

## Características Implementadas

### 🎬 Creador de Película Mental
- Formulario completo para crear metas visuales con:
  - Título, categoría, descripción detallada
  - Emoción asociada al logro
  - Fecha límite
  - URL de imagen inspiracional
  - Pasos de acción desglosados
- Visualización tipo storyboard animado
- Sistema de categorías (carrera, salud, relaciones, finanzas, educación, personal, creatividad, espiritualidad)

### 🤖 Chatbot Motivacional
- Coach virtual interactivo con IA simulada
- Preguntas reflexivas guiadas
- Sistema de insights que captura respuestas del usuario
- Historial de conversaciones persistente
- Respuestas contextuales basadas en palabras clave

### 📔 Diario Digital Interactivo
- Creación de entradas con título, estado de ánimo y contenido
- Sistema de búsqueda en tiempo real
- Timeline galáctica animada mostrando progreso
- 8 estados de ánimo diferentes con emojis
- Visualización cronológica de últimas entradas

### 🎨 Tablero de Visión Estelar
- Tarjetas interactivas para organizar sueños
- Colores galácticos aleatorios para cada tarjeta
- Sistema de agregar/eliminar tarjetas
- Diseño tipo Pinterest responsivo

### 📊 Rastreador de Hábitos
- Creación de hábitos personalizados con iconos
- Calendario visual de últimos 30 días
- Sistema de marcado de días completados
- Cálculo automático de rachas
- 10 iconos predefinidos para diferentes tipos de hábitos

### 🎯 Rueda de la Vida Cósmica
- Evaluación interactiva de 8 áreas de vida
- Gráfico radial dibujado en Canvas
- Sliders para calificar cada área (0-10)
- Visualización gráfica en tiempo real
- Áreas: Carrera, Finanzas, Salud, Relaciones, Desarrollo Personal, Diversión, Espiritualidad, Contribución Social

### 🧘 Meditación Cósmica
- Temporizador configurable (3, 5, 10, 15, 20 minutos)
- Guía de respiración visual animada
- Música ambiente generada con Web Audio API
- 4 sonidos ambientales: Silencio, Espacio, Lluvia, Océano
- Control de volumen
- Estadísticas de sesiones y minutos totales meditados

### 🏆 Sistema de Logros
- 12 logros desbloqueables
- Barra de progreso visual
- Notificaciones al desbloquear logros
- Logros: Primer Paso, Visionario, Cronista, Escritor Dedicado, Constructor de Hábitos, Guerrero Semanal, Meditador Novato, Maestro Zen, Autoconocimiento, Conversador, Creador de Visión, Archivista

### ✨ Funcionalidades Adicionales
- **Generador de afirmaciones positivas**: 10 afirmaciones rotativas
- **Sistema de racha de días**: Seguimiento de días activos consecutivos
- **Estadísticas globales**: Panel principal con métricas clave
- **Exportación de datos**: Backup completo en formato JSON
- **Almacenamiento local**: Persistencia automática con localStorage
- **Notificaciones**: Sistema de alertas visuales animadas

## Diseño y Animaciones

### Paleta de Colores Galáctica
- **Fondo principal**: Gradiente de púrpuras profundos (#0a0118, #2d1b69, #1a0a3e)
- **Acentos**: Azul nebulosa (#4a5fd9, #00d4ff)
- **Resaltados**: Rosa estelar (#ff1cf7, #ff6ec7)
- **Dorado cósmico**: #ffd700
- **Verde aurora**: #00ff88
- **Textos**: Blanco estelar y púrpura claro

### Animaciones Implementadas
1. **Estrellas parpadeantes**: Canvas con 200 estrellas animadas
2. **Partículas flotantes**: 30 partículas con movimiento aleatorio
3. **Efectos de hover**: Transformaciones y resplandores
4. **Gradientes animados**: Rotación de colores en títulos
5. **Transiciones suaves**: Fade-in, slide-in en todas las secciones
6. **Círculo de respiración**: Animación de escala para meditación
7. **Barras de progreso**: Transiciones animadas
8. **Efectos de nebulosa**: Fondos con blur y transparencias

## Estructura de Archivos
```
.
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos galácticos y animaciones
├── app.js             # Lógica JavaScript vanilla
└── replit.md          # Documentación del proyecto
```

## Datos Almacenados (LocalStorage)
- `galaxyLifeProject`: Objeto completo con todos los datos del usuario
- `galaxyAchievements`: Lista de logros con estado de desbloqueo

### Estructura de Datos
```javascript
{
  goals: [],              // Metas creadas
  diaryEntries: [],       // Entradas de diario
  chatHistory: [],        // Historial de conversaciones
  visionCards: [],        // Tarjetas del tablero
  habits: [],             // Hábitos rastreados
  lifeWheel: {},         // Evaluaciones de la rueda
  achievements: [],       // IDs de logros desbloqueados
  meditationStats: {},   // Estadísticas de meditación
  currentStreak: 0,      // Racha actual de días
  lastActiveDate: null   // Última fecha activa
}
```

## Responsividad
- Diseño adaptable para dispositivos móviles
- Breakpoint principal: 768px
- Grids flexibles que se ajustan automáticamente
- Navegación optimizada para pantallas pequeñas

## Características Técnicas
- **No requiere instalación**: Funciona directamente en el navegador
- **Peso ligero**: Sin dependencias externas
- **Rápida carga**: Archivos estáticos optimizados
- **Compatible**: Funciona en todos los navegadores modernos
- **Offline-ready**: Funcionalidad completa sin conexión después de la carga inicial

## Cómo Usar

### Para el Desarrollador
1. El servidor HTTP de Python sirve los archivos estáticos en el puerto 5000
2. Los archivos se cargan en orden: HTML → CSS → JS
3. El archivo `app.js` inicializa todas las funcionalidades al cargar la página

### Para el Usuario
1. **Página de Inicio**: Vista general con estadísticas y acciones rápidas
2. **Navegar**: Usar los botones en la barra superior para cambiar de sección
3. **Crear contenido**: Formularios intuitivos en cada sección
4. **Interactuar**: Todos los elementos son clicables y responsivos
5. **Exportar**: Guardar copia de seguridad de todos los datos

## Mejoras Futuras Sugeridas
- [x] Modo oscuro/claro con transición día/noche ✅
- [x] Mejorar header y diseño ✅
- [x] Sonidos ambientales mejorados ✅
- [ ] Recordatorios con notificaciones del navegador
- [ ] Compartir metas vía URLs generadas
- [ ] Gráficos de progreso con animaciones 3D CSS
- [ ] Sincronización en la nube (opcional)
- [ ] PWA para instalación en móvil
- [ ] Temas de color personalizables
- [ ] Importación de datos desde JSON

## Notas de Desarrollo
- La aplicación usa únicamente tecnologías web nativas
- No requiere compilación ni build steps
- Todos los datos se guardan automáticamente en localStorage
- Las animaciones están optimizadas para rendimiento
- El código está organizado en un objeto principal `app` para evitar conflictos globales

## Servidor Web
- **Comando**: `python3 -m http.server 5000`
- **Puerto**: 5000
- **Tipo**: Servidor HTTP simple de Python
- **Output**: WebView (iframe para el usuario)

---

## Cambios Recientes

### v1.2.0 (Oct 22, 2025)
- Sistema de modales personalizados reemplazando alert/prompt/confirm nativos
- Header completamente refinado con mejor espaciado y proporciones
- Modales con animaciones fluidas y diseño consistente
- Soporte para inputs, textareas y diálogos de confirmación
- Notificaciones de éxito al completar acciones
- Mejoras de responsividad en navegación móvil
- Función de modal con descripción en tablero de visión

### v1.1.0 (Oct 21, 2025)
- Agregado modo claro/oscuro con toggle animado
- Header completamente rediseñado con icono brillante y tagline
- Sistema de audio mejorado con Web Audio API avanzado
- Botones de eliminar con mejores animaciones y feedback visual
- Correcciones de CSS para mejor compatibilidad en modo claro
- Persistencia del tema seleccionado en localStorage

### v1.0.0 (Oct 21, 2025)
- Lanzamiento inicial con todas las funcionalidades base

---

**Última actualización**: 22 de octubre de 2025
**Versión**: 1.2.0
**Estado**: Producción
