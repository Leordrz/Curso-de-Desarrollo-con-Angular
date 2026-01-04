# Curso de Desarrollo en Angular

Repositorio de ejercicios y prácticas realizados durante la cursada del Curso de Desarrollo en Angular.
El contenido se organiza por unidades, reflejando el avance progresivo en el uso del framework.

## Estructura del repositorio

```text
/
├── clase-1/
│   └── mi-primera-app-angular/
├── clase-2/
├── clase-3/
├── clase-4/
│   └── chat-tp/
└── README.md
```

## Ejecución de un proyecto

```bash
git clone https://github.com/Leordrz/Curso-de-Desarrollo-con-Angular
cd clase-1
npm install
ng serve
```

Abrir en el navegador:
http://localhost:4200/

## Tecnologías

Angular · TypeScript · HTML · CSS · Node.js

## Capturas
U1 - Conociendo Angular
![alt text](/Capturas/Clase1.png)

U3 - Angular Intermedio
![alt text](/Capturas/Clase3.png)

U4 - TP Integrador
![alt text](/Capturas/Clase4.jpg)

## Estructura del proyecto (resumen)

* src/main.ts: bootstrap de la app (Angular 17).
* src/app/app.routes.ts: definición de rutas (router).
* src/app/services/chat.service.ts: Backend simulado en memoria para chats y mensajes.
* src/app/models/*: interfaces/modelos (Chat, Message).
* src/app/pages/chat-list/*: pantalla lista de chats + buscador.
* src/app/pages/chat-detail/*: pantalla detalle del chat + envío de mensajes + autoscroll.
* src/app/pages/new-chat/*: pantalla alta de nuevo contacto.
* src/app/pipes/*: pipes propios.

## Rutas disponibles
* /chats → lista de chats
* /chats/:id → detalle del chat seleccionado
* /nuevo → formulario de alta de contacto

## Cómo probar

1. Lista y navegación
    * Entrar a chats
    * Click en distintos contactos → cambia el chat y muestra mensajes correspondientes.

2. Buscador
    * Escribir un nombre (ej: “Elmo”) → se filtra la lista.
    * Borrar → vuelve la lista completa.

3. Nuevo contacto
    * Ir a /nuevo
    * Probar validación: vacío o < 3 caracteres → muestra error.
    * Crear contacto → aparece en la lista.
    * Mensajes + respuesta automática
    * En /chats/:id, enviar un mensaje.

4. UX
    * Autoscroll: al enviar y al llegar respuesta, la conversación baja al final.
    * Estilos modernos aplicados en todo el proyecto.

## Autor

Leonel Rodríguez  
Curso de Desarrollo en Angular

## Fuentes

https://angular.dev/tutorials/learn-angular  
https://angular.dev/tools/cli
