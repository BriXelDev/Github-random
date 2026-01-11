# 🌟 GitHub Random

Una aplicación web moderna que te permite descubrir repositorios aleatorios de GitHub de forma interactiva. Filtra por lenguaje de programación y explora proyectos fascinantes de toda la comunidad.

## 🚀 Demo en Vivo

Accede a la aplicación en: [illustrious-sable-4986de.netlify.app](https://illustrious-sable-4986de.netlify.app)

## ✨ Características

- **Descubrimiento de Repositorios**: Obtén repositorios aleatorios de GitHub con un solo click
- **Filtrado por Lenguaje**: Selecciona entre más de 60 lenguajes de programación diferentes
- **Información Detallada**: Visualiza detalles como:
  - Nombre y descripción del repositorio
  - Cantidad de estrellas (⭐)
  - Cantidad de forks
  - Lenguaje principal del proyecto
  - Enlace directo al repositorio en GitHub
- **Interfaz Intuitiva**: Diseño limpio y responsive para una mejor experiencia de usuario
- **Interfaz Multiidioma**: Soporte para múltiples idiomas

## 🛠️ Tecnologías Utilizadas

- **React 19** - Librería JavaScript para construir interfaces de usuario
- **TypeScript** - Lenguaje tipado para mayor seguridad en el código
- **Vite** - Herramienta de construcción rápida y moderna
- **CSS3** - Estilos y diseño responsive
- **GitHub API** - Para obtener datos de repositorios en tiempo real

## 📦 Instalación

### Requisitos previos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/Github-random.git
   cd Github-random
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 📝 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Verificar linting del código
npm run lint

# Preview de la aplicación construida
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes React reutilizables
│   ├── Header.tsx       # Encabezado de la aplicación
│   ├── Hero.tsx         # Componente principal con interfaz
│   └── styles/          # Estilos CSS de los componentes
├── services/
│   └── githubService.ts # Servicio para conectar con GitHub API
├── App.tsx              # Componente raíz de la aplicación
├── main.tsx             # Punto de entrada de React
├── index.css            # Estilos globales
└── App.css              # Estilos de la aplicación
```

## 🔧 Cómo Usar

1. **Selecciona un lenguaje** (opcional): Usa el selector de lenguajes para filtrar repositorios
2. **Haz click en el botón**: Presiona el botón para obtener un repositorio aleatorio
3. **Explora**: Lee la información y haz click en el enlace para visitar el repositorio en GitHub

## 📡 API Utilizada

Esta aplicación utiliza la [GitHub REST API](https://docs.github.com/es/rest) para:
- Obtener repositorios aleatorios
- Cargar información de los lenguajes disponibles

> **Nota**: GitHub API tiene límites de requests. Para uso intensivo, considera autenticarte con un token.

## 🌐 Despliegue

El proyecto está desplegado en **Netlify** y se actualiza automáticamente desde el repositorio en GitHub.

Para desplegar tu propia versión:

1. Haz fork del repositorio
2. Conecta tu repositorio con Netlify
3. Netlify detectará automáticamente que es un proyecto Vite y configurará el build

## 👨‍💻 Desarrollo

Este proyecto utiliza:
- **ESLint** para mantener la calidad del código
- **TypeScript** para mayor seguridad de tipos

Para contribuir:
1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una idea para mejorar la aplicación, no dudes en abrir un issue o enviar un pull request.

## 📧 Contacto

Si tienes preguntas o sugerencias, puedes contactarme a través de GitHub Issues.

---

**¡Disfruta descubriendo nuevos proyectos!** ⚡
