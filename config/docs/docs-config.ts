export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  items?: NavItem[]
}

export interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Blocks",
      href: "/blocks",
    },
    {
      title: "Components",
  href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
        {
          title: "Quick Start",
          href: "/docs/quick-start",
        },
        {
          title: "Architecture",
          href: "/docs/architecture",
        },
        {
          title: "Contributing",
          href: "/docs/contributing",
        },
      ],
    },
    {
      title: "Data & Tables",
      items: [
        {
          title: "Overview",
          href: "/blocks/data-tables",
        },
        {
          title: "Basic DataTable",
          href: "/blocks/data-tables/basic-datatable",
        },
        {
          title: "Advanced DataTable",
          href: "/blocks/data-tables/advanced-datatable",
        },
        {
          title: "Dynamic Filters",
          href: "/blocks/data-tables/dynamic-filters",
        },
        {
          title: "Custom Formatters",
          href: "/blocks/data-tables/formatters",
        },
      ],
    },
    {
      title: "Forms & Inputs",
      items: [
        {
          title: "Overview",
          href: "/blocks/forms",
          disabled: true,
        },
        {
          title: "Smart Forms",
          href: "/blocks/forms/smart-forms",
          disabled: true,
        },
        {
          title: "Validation System",
          href: "/blocks/forms/validation",
          disabled: true,
        },
      ],
    },
    {
      title: "Navigation",
      items: [
        {
          title: "Overview",
          href: "/blocks/navigation",
          disabled: true,
        },
        {
          title: "Sidebar",
          href: "/blocks/navigation/sidebar",
          disabled: true,
        },
        {
          title: "Breadcrumbs",
          href: "/blocks/navigation/breadcrumbs",
          disabled: true,
        },
      ],
    },
    {
      title: "Layout",
      items: [
        {
          title: "Overview",
          href: "/blocks/layout",
          disabled: true,
        },
        {
          title: "Dashboard",
          href: "/blocks/layout/dashboard",
          disabled: true,
        },
        {
          title: "Grid Systems",
          href: "/blocks/layout/grid",
          disabled: true,
        },
      ],
    },
  ],
}
