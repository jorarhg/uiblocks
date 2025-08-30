import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
export declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
export declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
