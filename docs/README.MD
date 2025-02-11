# Funciones
## Paneles - Boards
## Projectos - Proyects / Asignaturas
## Tareas - Tasks

# Arquitectura de archivos
```
ToDoNest/
├── public/                   # Recursos públicos (estáticos)
│   ├── index.html            # Página principal de la aplicación
|   ├── meet.html             # Página de reuniones (meet) 
│   ├── css/
│   │   ├── styles.css        # Estilos principales
│   │   └── meeting.css       # Estilos específicos para reuniones
│   ├── js/
│   │   ├── main.js           # Funciones principales
│   │   ├── meetings.js       # Lógica de WebRTC y reuniones
│   │   └── firebase.js       # Configuración de Firebase
│   ├── images/               # Carpeta para imágenes
│   │   └── logo.png
│   └── assets/               # Otros recursos como fuentes -- de momento nada
│       └── fonts/
│           └── custom-font.woff
├── src/
│   ├── app.js                # Servidor principal de Node.js
│   ├── routes/
         routes.js : T3
│   │   ├── meetings.js       # Rutas para reuniones
|   |   ├── board.js          # Rutas para tablones
|   |   ├── porjects.js           # Rutas para proyectos
│   │   └── tasks.js              # Rutas para tareas
│   ├── controllers/
│   │   ├── meetingsController.js  # Lógica de reuniones
|   |   ├── boardController.js     # Lógica de tablones
|   |   ├── porjectController.js  # Lógica de proyectos
│   │   └── tasksController.js     # Lógica de tareas
│   ├── utils/
│   │   ├── sfu.js            # Configuración de la SFU (mediasoup)
│   │   └── turn.js           # Configuración del servidor TURN
│   └── config/
│       └── firebaseConfig.js # Configuración de Firebase
├── database/
│   └── db.sqlite             # Base de datos local (si aplica) -- de momento no
├── docs/
│   ├── README.md             # Instrucciones de instalación y uso
│   ├── architecture.md       # Explicación de la arquitectura
│   └── api.md                # Referencia de las APIs
├── node_modules/
├── .env                      # --Este de momento nada de nada
├── .gitignore
├── package.json
└── package-lock.json
```

---
Autor: Jorge Levia Galán

```[latex]
\frac
```
