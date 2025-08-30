"use client"

import { DataTable } from "@/components/data-table/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CodeBlock } from "@/components/docs/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para mostrar diferentes formatters
interface Employee {
  id: string
  name: string
  email: string
  avatar: string
  department: string
  salary: number
  performance: number
  joinDate: Date
  status: "active" | "inactive" | "on-leave"
}

const employeeData: Employee[] = [
  {
    id: "EMP-001",
    name: "Alice Johnson",
    email: "alice@company.com",
    avatar: "/placeholder-user.jpg",
    department: "Engineering",
    salary: 75000,
    performance: 92,
    joinDate: new Date("2022-03-15"),
    status: "active"
  },
  {
    id: "EMP-002", 
    name: "Bob Smith",
    email: "bob@company.com",
    avatar: "/placeholder-user.jpg",
    department: "Design",
    salary: 68000,
    performance: 87,
    joinDate: new Date("2021-11-22"),
    status: "active"
  },
  {
    id: "EMP-003",
    name: "Carol Davis",
    email: "carol@company.com", 
    avatar: "/placeholder-user.jpg",
    department: "Marketing",
    salary: 72000,
    performance: 78,
    joinDate: new Date("2023-01-10"),
    status: "on-leave"
  },
  {
    id: "EMP-004",
    name: "David Wilson",
    email: "david@company.com",
    avatar: "/placeholder-user.jpg", 
    department: "Engineering",
    salary: 82000,
    performance: 95,
    joinDate: new Date("2020-08-05"),
    status: "inactive"
  },
]

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>
              {employee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">{employee.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const department = row.getValue("department") as string
      const colors = {
        Engineering: "bg-blue-100 text-blue-800",
        Design: "bg-purple-100 text-purple-800", 
        Marketing: "bg-green-100 text-green-800",
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
          {department}
        </span>
      )
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = row.getValue("salary") as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary)
      
      return <div className="font-mono">{formatted}</div>
    },
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: ({ row }) => {
      const performance = row.getValue("performance") as number
      const getColor = (score: number) => {
        if (score >= 90) return "text-green-600"
        if (score >= 70) return "text-yellow-600"  
        return "text-red-600"
      }
      
      return (
        <div className="w-24">
          <div className="flex items-center space-x-2">
            <Progress value={performance} className="h-2 flex-1" />
            <span className={`text-sm font-medium ${getColor(performance)}`}>
              {performance}%
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      const date = row.getValue("joinDate") as Date
      return (
        <div className="text-sm">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short", 
            day: "numeric"
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variants = {
        active: "default",
        inactive: "secondary", 
        "on-leave": "outline"
      } as const
      
      return (
        <Badge variant={variants[status as keyof typeof variants]}>
          {status.replace("-", " ")}
        </Badge>
      )
    },
  },
]

export default function FormattersExamplePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Custom Formatters</h1>
        <p className="text-xl text-muted-foreground">
          Ejemplos de formateadores personalizados para mostrar diferentes tipos de datos de manera elegante.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Demo</h2>
          <div className="rounded-lg border bg-card p-6">
            <DataTable columns={columns} data={employeeData} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Código</h2>
          <Tabs defaultValue="columns" className="w-full">
            <TabsList>
              <TabsTrigger value="columns">Columnas</TabsTrigger>
              <TabsTrigger value="avatar">Avatar Formatter</TabsTrigger>
              <TabsTrigger value="currency">Currency Formatter</TabsTrigger>
              <TabsTrigger value="progress">Progress Formatter</TabsTrigger>
            </TabsList>
            
            <TabsContent value="columns">
              <CodeBlock
                language="tsx"
                code={`const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>
              {employee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">{employee.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "salary",
    header: "Salary", 
    cell: ({ row }) => {
      const salary = row.getValue("salary") as number
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary)
      return <div className="font-mono">{formatted}</div>
    },
  },
  // ... más columnas
]`}
              />
            </TabsContent>
            
            <TabsContent value="avatar">
              <CodeBlock
                language="tsx"
                code={`// Formatter para mostrar avatar + información del usuario
{
  accessorKey: "name",
  header: "Employee",
  cell: ({ row }) => {
    const employee = row.original
    return (
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>
            {employee.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{employee.name}</div>
          <div className="text-sm text-muted-foreground">{employee.email}</div>
        </div>
      </div>
    )
  },
}`}
              />
            </TabsContent>
            
            <TabsContent value="currency">
              <CodeBlock
                language="tsx"
                code={`// Formatter para valores monetarios
{
  accessorKey: "salary",
  header: "Salary",
  cell: ({ row }) => {
    const salary = row.getValue("salary") as number
    
    // Usar Intl.NumberFormat para formateo correcto
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary)
    
    return (
      <div className="font-mono text-right">
        {formatted}
      </div>
    )
  },
}

// Para otros tipos de números
const formatNumber = (value: number, type: 'currency' | 'percent' | 'decimal') => {
  const formatters = {
    currency: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    percent: new Intl.NumberFormat("en-US", { style: "percent" }),
    decimal: new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })
  }
  return formatters[type].format(value)
}`}
              />
            </TabsContent>
            
            <TabsContent value="progress">
              <CodeBlock
                language="tsx"
                code={`// Formatter para barras de progreso
{
  accessorKey: "performance",
  header: "Performance",
  cell: ({ row }) => {
    const performance = row.getValue("performance") as number
    
    const getColor = (score: number) => {
      if (score >= 90) return "text-green-600"
      if (score >= 70) return "text-yellow-600"  
      return "text-red-600"
    }
    
    const getProgressColor = (score: number) => {
      if (score >= 90) return "bg-green-500"
      if (score >= 70) return "bg-yellow-500"
      return "bg-red-500"
    }
    
    return (
      <div className="w-24">
        <div className="flex items-center space-x-2">
          <Progress 
            value={performance} 
            className="h-2 flex-1" 
            // Opcional: color personalizado
            style={{ 
              '--progress-background': getProgressColor(performance) 
            } as React.CSSProperties}
          />
          <span className={\`text-sm font-medium \${getColor(performance)}\`}>
            {performance}%
          </span>
        </div>
      </div>
    )
  },
}`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tipos de Formatters Incluidos</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                👤 Avatar + Info
              </h3>
              <p className="text-sm text-muted-foreground">
                Combina avatar, nombre y información adicional en una celda.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                💰 Currency
              </h3>
              <p className="text-sm text-muted-foreground">
                Formatea números como moneda con símbolos y separadores apropiados.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                📊 Progress Bar
              </h3>
              <p className="text-sm text-muted-foreground">
                Muestra porcentajes como barras de progreso visuales.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                🏷️ Status Badge
              </h3>
              <p className="text-sm text-muted-foreground">
                Badges coloridos para estados y categorías.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                📅 Date
              </h3>
              <p className="text-sm text-muted-foreground">
                Formatea fechas en diferentes formatos legibles.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                🎨 Department Tag
              </h3>
              <p className="text-sm text-muted-foreground">
                Tags coloridos basados en categorías específicas.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Consejos para Formatters Personalizados</h2>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">🎨 Consistencia Visual</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Mantén un estilo consistente en todos tus formatters para una mejor experiencia de usuario.
              </p>
              <CodeBlock
                language="tsx"
                code={`// Define colores consistentes
const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800", 
  pending: "bg-yellow-100 text-yellow-800",
} as const`}
              />
            </div>
            
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">⚡ Performance</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Para grandes conjuntos de datos, memoiza los formatters complejos.
              </p>
              <CodeBlock
                language="tsx"
                code={`import { useMemo } from "react"

const ExpensiveFormatter = ({ value }: { value: any }) => {
  const formattedValue = useMemo(() => {
    // Operación costosa de formateo
    return complexFormat(value)
  }, [value])
  
  return <div>{formattedValue}</div>
}`}
              />
            </div>
            
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">🌐 Internacionalización</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Usa Intl API para formateo que respete la localización.
              </p>
              <CodeBlock
                language="tsx"
                code={`// Formateo sensible a la localización
const formatCurrency = (value: number, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value)
}

const formatDate = (date: Date, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
