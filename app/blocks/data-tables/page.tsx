import Link from "next/link"
import { ArrowRight, Code, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const dataTableBlocks = [
  {
    name: "Basic DataTable",
    description: "A simple data table with pagination, sorting, and search functionality",
    href: "/docs/examples/basic",
    tags: ["pagination", "sorting", "search"],
    status: "stable",
    complexity: "beginner"
  },
  {
    name: "Advanced DataTable",
    description: "Full-featured table with filters, row selection, and bulk actions",
    href: "/docs/examples/advanced",
    tags: ["filters", "selection", "actions", "toolbar"],
    status: "stable",
    complexity: "intermediate"
  },
  {
    name: "Dynamic DataTable",
    description: "Schema-driven table that generates columns and filters automatically",
    href: "/docs/examples/dynamic",
    tags: ["dynamic", "schema", "flexible"],
    status: "stable",
    complexity: "advanced"
  }
]

const complexityColors = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  advanced: "bg-red-100 text-red-800 border-red-200"
}

export default function DataTablesPage() {
  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/blocks" className="hover:text-foreground">
            Blocks
          </Link>
          <span>/</span>
          <span>Data & Tables</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Data & Tables
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Production-ready data table components built with TanStack Table. 
          Features sorting, filtering, pagination, and more.
        </p>
      </section>

      <section className="container space-y-6 py-8">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {dataTableBlocks.map((block) => (
            <Card key={block.name} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {block.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {block.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={complexityColors[block.complexity as keyof typeof complexityColors]}
                  >
                    {block.complexity}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 pt-2">
                  {block.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button asChild>
                    <Link href={block.href}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Example
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`${block.href}#code`}>
                      <Code className="mr-2 h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-4xl">
            Need Custom Features?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mx-auto mt-4">
            All table blocks are built with TanStack Table and are fully customizable. 
            Check our documentation for advanced customization examples.
          </p>
          <div className="mt-6 space-x-4">
            <Button asChild>
              <Link href="/docs">
                <ArrowRight className="mr-2 h-4 w-4" />
                View Documentation
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/customization">
                Customization Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
