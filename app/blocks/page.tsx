import Link from "next/link"
import { ArrowRight, Database, FormInput, Menu, LayoutGrid } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blockCategories = [
  {
    title: "Data & Tables",
    description: "Advanced data tables with filtering, sorting, and customization",
    icon: Database,
    href: "/blocks/data-tables",
    status: "available",
    count: 3,
    blocks: [
      {
        name: "Basic DataTable",
        description: "Simple data table with basic features",
        status: "available"
      },
      {
        name: "Advanced DataTable",
        description: "Full-featured table with filters and actions",
        status: "available"
      },
      {
        name: "Dynamic DataTable",
        description: "Schema-driven dynamic table generation",
        status: "available"
      }
    ]
  },
  {
    title: "Forms",
    description: "Form components and layouts for data input",
    icon: FormInput,
    href: "/blocks/forms",
    status: "coming-soon",
    count: 0,
    blocks: []
  },
  {
    title: "Navigation",
    description: "Navigation menus, breadcrumbs, and page headers",
    icon: Menu,
    href: "/blocks/navigation",
    status: "coming-soon",
    count: 0,
    blocks: []
  },
  {
    title: "Layout",
    description: "Page layouts, grids, and container components",
    icon: LayoutGrid,
    href: "/blocks/layout",
    status: "coming-soon",
    count: 0,
    blocks: []
  }
]

export default function BlocksPage() {
  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          UI Blocks Collection
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Explore our growing collection of production-ready UI blocks. Copy, paste, and customize to build your applications faster.
        </p>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-2">
          {blockCategories.map((category) => {
            const IconComponent = category.icon
            const isAvailable = category.status === "available"
            
            return (
              <Card key={category.title} className={`relative ${!isAvailable ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-6 w-6" />
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {category.status === "available" && (
                        <Badge variant="default">{category.count} blocks</Badge>
                      )}
                      {category.status === "coming-soon" && (
                        <Badge variant="secondary">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isAvailable ? (
                    <div className="space-y-3">
                      {category.blocks.map((block) => (
                        <div key={block.name} className="rounded-lg border p-3">
                          <div className="font-medium text-sm">{block.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {block.description}
                          </div>
                        </div>
                      ))}
                      <Button asChild className="w-full mt-4">
                        <Link href={category.href}>
                          View All Blocks
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground mb-4">
                        New blocks coming soon to this category
                      </p>
                      <Button variant="outline" disabled>
                        Coming Soon
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-4xl">
            More Blocks Coming Soon
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mx-auto mt-4">
            We're constantly adding new UI blocks to help you build better applications. 
            Each block is carefully crafted, fully accessible, and production-ready.
          </p>
        </div>
      </section>
    </div>
  )
}
