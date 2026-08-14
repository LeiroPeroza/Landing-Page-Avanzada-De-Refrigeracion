# Servicios Peroza — Landing Page

Landing page profesional para un negocio real de refrigeración y climatización en Barquisimeto, Venezuela. Incluye una calculadora de presupuesto interactiva construida en JavaScript.

**Sitio en producción:** [serviciosperoza.netlify.app](https://serviciosperoza.netlify.app)

## Motivación

Este proyecto nació como continuación de una landing page estática, con el objetivo de aplicar JavaScript a un negocio real (servicio técnico de refrigeración) y de aprender el proceso completo de llevar un sitio a producción: SEO básico, analítica y deploy en Netlify.

## Funcionalidades

- **Landing page completa**: hero, servicios, sección de garantía/certificación, footer con datos de contacto.
- **Calculadora de presupuesto interactiva**: el usuario indica cuántos equipos necesita atender, elige el tipo y el servicio para cada uno, y obtiene un estimado de costo total al instante.
- **Integración directa con WhatsApp**: tanto el botón de contacto general como el resultado de la calculadora generan un mensaje pre-armado hacia WhatsApp Business, agilizando el primer contacto con el cliente.
- **SEO básico implementado**: meta tags, Open Graph y Twitter Cards para que el sitio se vea bien al compartirse en redes y mensajería.
- **Google Analytics integrado**: seguimiento de visitas y comportamiento de usuarios en el sitio, para entender cómo llega y navega la gente antes de contactar por WhatsApp.
- **Diseño responsive** con tipografía de Google Fonts (Montserrat) e iconografía de Font Awesome.

## Tecnologías

- HTML5 semántico
- CSS3
- JavaScript (vanilla, separado en capa de lógica y capa de interfaz)
- Font Awesome (iconos)
- Google Fonts
- Google Analytics
- Deploy en [Netlify](https://www.netlify.com/)

## Estructura del proyecto

```
├── index.html
├── styles/
│   └── style.css
├── resources/
│   └── (logo, diploma, imágenes de garantía)
└── js/
    └── script.js       # Lógica de precios + manejo de UI de la calculadora
```

## Sobre la arquitectura de la calculadora

El archivo `script.js` separa explícitamente dos responsabilidades:

- **`LogicaPrecios`**: funciones puras de cálculo (precios de servicios, obtención del costo más alto), sin ninguna dependencia del DOM.
- **`ui`**: todo el manejo de la interfaz (renderizado de formularios dinámicos, captura de datos, generación del reporte final).

Esta separación facilita entender, mantener y en el futuro testear la lógica de negocio de forma aislada.

## Cómo probarlo

No requiere instalación. Se puede abrir `index.html` directamente en el navegador, o visitar la versión ya desplegada en Netlify.

## Limitaciones conocidas

- La calculadora captura el **tipo de equipo** (aire acondicionado, nevera, vitrina, cuarto frío), pero actualmente el precio solo depende del **servicio** elegido, no del tipo de equipo — pendiente definir si el tipo debe influir en el costo.
- El renderizado de los formularios dinámicos usa `innerHTML` de forma poco eficiente dentro de un loop.
- Los eventos de los botones generados dinámicamente usan `onclick` inline en vez de `addEventListener`.
- No hay validación si el usuario cambia la cantidad de equipos después de haber generado los formularios, sin volver a presionar "Estimar".

## Qué aprendí

- Separar lógica de negocio de la manipulación del DOM en capas independientes.
- Implementar SEO básico (meta tags, Open Graph, Twitter Cards) y verificar cómo se ve un sitio al compartirse.
- Generar enlaces dinámicos a WhatsApp con `encodeURIComponent` para evitar romper la URL con espacios o símbolos.
- Configurar Google Analytics para medir tráfico real de un sitio en producción.
- Proceso de deploy de un sitio estático en Netlify.

---

Proyecto personal para un negocio real — Estudiante de Ingeniería Informática.
