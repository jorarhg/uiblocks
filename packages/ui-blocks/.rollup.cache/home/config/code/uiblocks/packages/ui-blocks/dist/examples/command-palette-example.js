import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty, CommandSeparator } from '../ui/command';
import { Button } from '../ui/button';
/** Ejemplo mínimo de uso del Command palette integrado */
export function CommandPaletteExample() {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(o => !o);
            }
        };
        window.addEventListener('keydown', down);
        return () => window.removeEventListener('keydown', down);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: 'outline', onClick: () => setOpen(true), className: 'gap-2', children: ["\u2318K ", _jsx("span", { className: 'text-xs opacity-70', children: "(o Ctrl+K)" })] }), _jsxs(CommandDialog, { open: open, onOpenChange: setOpen, children: [_jsx(CommandInput, { placeholder: 'Buscar comando...' }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "Sin resultados." }), _jsxs(CommandGroup, { heading: 'Navegaci\u00F3n', children: [_jsx(CommandItem, { onSelect: () => alert('Ir a inicio'), children: "Inicio" }), _jsx(CommandItem, { onSelect: () => alert('Ir a reportes'), children: "Reportes" })] }), _jsx(CommandSeparator, {}), _jsxs(CommandGroup, { heading: 'Acciones', children: [_jsx(CommandItem, { onSelect: () => alert('Crear registro'), children: "Crear registro" }), _jsx(CommandItem, { onSelect: () => alert('Exportar'), children: "Exportar" })] })] })] })] }));
}
//# sourceMappingURL=command-palette-example.js.map