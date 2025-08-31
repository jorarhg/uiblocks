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
        { title: "Introduction", href: "/docs" },
        { title: "Installation", href: "/docs/installation" },
        { title: "Quick Start", href: "/docs/quick-start" },
        { title: "Architecture", href: "/docs/architecture", disabled: true },
        { title: "Contributing", href: "/docs/contributing", disabled: true },
      ],
    },
    {
      title: "UI Components",
      items: [
        { title: 'Button', href: '/docs/components/button' },
        { title: 'Input', href: '/docs/components/input' },
        { title: 'Select', href: '/docs/components/select' },
  { title: 'Checkbox', href: '/docs/components/checkbox' },
  { title: 'Radio Group', href: '/docs/components/radio-group' },
  { title: 'Switch', href: '/docs/components/switch' },
  { title: 'Badge', href: '/docs/components/badge' },
  { title: 'Card', href: '/docs/components/card' },
  { title: 'Tabs', href: '/docs/components/tabs' },
  { title: 'Dialog', href: '/docs/components/dialog' },
  { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
  { title: 'Tooltip', href: '/docs/components/tooltip' },
      ],
    },
  ],
}
