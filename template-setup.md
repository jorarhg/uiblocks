# Template Boilerplate para DataTable Dinámico

## Estructura del Template
```
create-datatable-app/
├── template/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── components/
│   │   ├── data-table/
│   │   ├── dynamic-datatable-factory/
│   │   └── ui/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── examples/
├── scripts/
│   └── setup.js
└── README.md
```

## CLI Setup Script
```javascript
#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function setupDataTableProject(projectName) {
  // 1. Crear directorio
  fs.mkdirSync(projectName)
  
  // 2. Copiar template
  copyTemplate('./template', `./${projectName}`)
  
  // 3. Instalar dependencias
  console.log('Installing dependencies...')
  execSync(`cd ${projectName} && npm install`)
  
  // 4. Setup inicial
  console.log('Setting up DataTable system...')
  setupTailwindConfig(projectName)
  setupExamples(projectName)
}

// Uso: npx create-datatable-app my-project
```

## Package.json del Template
```json
{
  "name": "datatable-project",
  "dependencies": {
    "@tanstack/react-table": "latest",
    "lucide-react": "^0.511.0",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.5"
  }
}
```
