import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/docs/code-block"

export default function InstallationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Aprende cómo instalar y configurar DataTable UI en tu proyecto React.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
          <p className="text-muted-foreground mb-4">
            Antes de comenzar, asegúrate de tener instalado:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Node.js 18.0 o superior</li>
            <li>React 18.0 o superior</li>
            <li>TypeScript (recomendado)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Instalación</h2>
          <p className="text-muted-foreground mb-4">
            Instala las dependencias necesarias usando tu gestor de paquetes preferido:
          </p>
          
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock
                language="bash"
                code={`npm install @tanstack/react-table lucide-react class-variance-authority clsx tailwind-merge`}
              />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock
                language="bash"
                code={`pnpm add @tanstack/react-table lucide-react class-variance-authority clsx tailwind-merge`}
              />
            </TabsContent>
            <TabsContent value="yarn">
              <CodeBlock
                language="bash"
                code={`yarn add @tanstack/react-table lucide-react class-variance-authority clsx tailwind-merge`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Configuración de Tailwind CSS</h2>
          <p className="text-muted-foreground mb-4">
            Asegúrate de que tu archivo <code>tailwind.config.js</code> incluya la configuración necesaria:
          </p>
          <CodeBlock
            language="javascript"
            code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Variables CSS</h2>
          <p className="text-muted-foreground mb-4">
            Agrega las siguientes variables CSS a tu archivo principal de estilos:
          </p>
          <CodeBlock
            language="css"
            code={`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}`}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Primer uso</h2>
          <p className="text-muted-foreground mb-4">
            Una vez configurado, puedes importar y usar los componentes:
          </p>
          <CodeBlock
            language="tsx"
            code={`import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { data } from "./data"

export default function MyTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}`}
          />
        </div>
      </div>
    </div>
  )
}
