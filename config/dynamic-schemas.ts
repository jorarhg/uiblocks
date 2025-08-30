import { TableSchema } from '@/types/schema'

// Configuración de esquemas dinámicos en TypeScript
export const dynamicSchemas: Record<string, TableSchema> = {
  tasks: {
    name: "tasks",
    description: "Sistema de gestión de tareas dinámico",
    primaryKey: "id",
    fields: [
      {
        key: "id",
        label: "ID",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: false
      },
      {
        key: "title",
        label: "Título",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: true
      },
      {
        key: "status",
        label: "Estado",
        type: "badge",
        sortable: true,
        filterable: true,
        searchable: false,
        options: [
          { value: "backlog", label: "Backlog", color: "default", icon: "circle" },
          { value: "todo", label: "Por Hacer", color: "secondary", icon: "clock" },
          { value: "in_progress", label: "En Progreso", color: "default", icon: "play" },
          { value: "done", label: "Completado", color: "default", icon: "check" },
          { value: "canceled", label: "Cancelado", color: "destructive", icon: "x" }
        ]
      },
      {
        key: "priority",
        label: "Prioridad",
        type: "badge",
        sortable: true,
        filterable: true,
        searchable: false,
        options: [
          { value: "low", label: "Baja", color: "secondary", icon: "arrow-down" },
          { value: "medium", label: "Media", color: "default", icon: "minus" },
          { value: "high", label: "Alta", color: "destructive", icon: "arrow-up" }
        ]
      },
      {
        key: "createdAt",
        label: "Creado",
        type: "date",
        sortable: true,
        filterable: true,
        searchable: false
      },
      {
        key: "updatedAt",
        label: "Actualizado",
        type: "date",
        sortable: true,
        filterable: true,
        searchable: false
      }
    ],
    tableOptions: {
      searchKey: "title",
      searchPlaceholder: "Buscar tareas...",
      defaultFilters: ["status", "priority"],
      enableSorting: true,
      enableFiltering: true,
      enableSearch: true,
      pageSize: 10,
      showToolbar: true
    }
  },

  users: {
    name: "users",
    description: "Sistema de gestión de usuarios",
    primaryKey: "id",
    fields: [
      {
        key: "id",
        label: "ID",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: false
      },
      {
        key: "name",
        label: "Nombre",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: true
      },
      {
        key: "email",
        label: "Email",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: true
      },
      {
        key: "role",
        label: "Rol",
        type: "badge",
        sortable: true,
        filterable: true,
        searchable: false,
        options: [
          { value: "admin", label: "Administrador", color: "destructive", icon: "shield" },
          { value: "user", label: "Usuario", color: "default", icon: "user" },
          { value: "guest", label: "Invitado", color: "secondary", icon: "eye" }
        ]
      },
      {
        key: "status",
        label: "Estado",
        type: "badge",
        sortable: true,
        filterable: true,
        searchable: false,
        options: [
          { value: "active", label: "Activo", color: "default", icon: "check" },
          { value: "inactive", label: "Inactivo", color: "secondary", icon: "pause" },
          { value: "banned", label: "Bloqueado", color: "destructive", icon: "x" }
        ]
      },
      {
        key: "lastLogin",
        label: "Último Acceso",
        type: "date",
        sortable: true,
        filterable: true,
        searchable: false
      },
      {
        key: "createdAt",
        label: "Registrado",
        type: "date",
        sortable: true,
        filterable: true,
        searchable: false
      }
    ],
    tableOptions: {
      searchKey: "name",
      searchPlaceholder: "Buscar usuarios...",
      defaultFilters: ["role", "status"],
      enableSorting: true,
      enableFiltering: true,
      enableSearch: true,
      pageSize: 15,
      showToolbar: true
    }
  },

  products: {
    name: "products",
    description: "Sistema de gestión de productos",
    primaryKey: "id",
    fields: [
      {
        key: "id",
        label: "ID",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: false
      },
      {
        key: "name",
        label: "Producto",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: true
      },
      {
        key: "category",
        label: "Categoría",
        type: "badge",
        sortable: true,
        filterable: true,
        searchable: false,
        options: [
          { value: "electronics", label: "Electrónicos", color: "default", icon: "zap" },
          { value: "clothing", label: "Ropa", color: "secondary", icon: "shirt" },
          { value: "books", label: "Libros", color: "default", icon: "book" },
          { value: "home", label: "Hogar", color: "secondary", icon: "home" }
        ]
      },
      {
        key: "price",
        label: "Precio",
        type: "number",
        sortable: true,
        filterable: true,
        searchable: false
      },
      {
        key: "stock",
        label: "Stock",
        type: "number",
        sortable: true,
        filterable: true,
        searchable: false
      },
      {
        key: "available",
        label: "Disponible",
        type: "boolean",
        sortable: true,
        filterable: true,
        searchable: false
      },
      {
        key: "createdAt",
        label: "Creado",
        type: "date",
        sortable: true,
        filterable: true,
        searchable: false
      }
    ],
    tableOptions: {
      searchKey: "name",
      searchPlaceholder: "Buscar productos...",
      defaultFilters: ["category", "available"],
      enableSorting: true,
      enableFiltering: true,
      enableSearch: true,
      pageSize: 12,
      showToolbar: true
    }
  },

  orders: {
    name: "orders",
    description: "Sistema de gestión de pedidos",
    primaryKey: "id",
    fields: [
      {
        key: "id",
        label: "Pedido",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: true
      },
      {
        key: "customer",
        label: "Cliente",
        type: "string",
        sortable: true,
        filterable: false,
        searchable: true
      },
      {
        key: "status",
        label: "Estado",
        type: "badge",
        sortable: true,
        filterable: true,
        searchable: false,
        options: [
          { value: "pending", label: "Pendiente", color: "secondary", icon: "clock" },
          { value: "processing", label: "Procesando", color: "default", icon: "loader" },
          { value: "shipped", label: "Enviado", color: "default", icon: "truck" },
          { value: "delivered", label: "Entregado", color: "default", icon: "check" },
          { value: "cancelled", label: "Cancelado", color: "destructive", icon: "x" }
        ]
      },
      {
        key: "total",
        label: "Total",
        type: "number",
        sortable: true,
        filterable: true,
        searchable: false
      },
      {
        key: "orderDate",
        label: "Fecha Pedido",
        type: "date",
        sortable: true,
        filterable: true,
        searchable: false
      }
    ],
    tableOptions: {
      searchKey: "customer",
      searchPlaceholder: "Buscar pedidos...",
      defaultFilters: ["status"],
      enableSorting: true,
      enableFiltering: true,
      enableSearch: true,
      pageSize: 10,
      showToolbar: true
    }
  }
}

// Función helper para obtener un esquema por nombre
export function getSchema(name: string): TableSchema | undefined {
  return dynamicSchemas[name]
}

// Función helper para obtener todos los nombres de esquemas disponibles
export function getAvailableSchemas(): string[] {
  return Object.keys(dynamicSchemas)
}

// Configuración por defecto
export const defaultSchemaConfig = {
  version: "2.0",
  defaultPageSize: 10,
  defaultEnableSorting: true,
  defaultEnableFiltering: true,
  defaultEnableSearch: true,
  defaultShowToolbar: true
}
