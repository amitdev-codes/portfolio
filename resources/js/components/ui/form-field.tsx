// components/ui/form-field.tsx
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";
import React from "react";

type FormFieldProps = {
    name: string;
    value: string | number | boolean;
    onChange: (name: string, value: string | number | boolean) => void;  // ✅ Correct signature
    error?: string;
    placeholder?: string;
    required?: boolean;
    type?: "text" | "number" | "email" | "password" | "tel" | "switch";  // ✅ Added "tel"
    className?: string;
    icon?: LucideIcon;
};

export const FormField: React.FC<FormFieldProps> = ({
                                                        name,
                                                        value,
                                                        onChange,
                                                        error,
                                                        placeholder = `Enter ${name.replace(/_/g, " ")}`,
                                                        required = false,
                                                        type = "text",
                                                        className,
                                                        icon: Icon,
                                                    }) => {
    const labelText = name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = type === "number"
            ? (parseFloat(e.target.value) || 0)
            : e.target.value;
        onChange(name, val);  // ✅ Calls parent onChange correctly
    };

    const handleSwitchChange = (checked: boolean) => {
        onChange(name, checked);
    };

    const inputClassName = cn(
        "w-full",
        error && "border-destructive",
        className
    );

    const isSwitch = type === "switch";

    return (
        <div className="space-y-1.5">
            <Label className="text-xs font-medium">
                {labelText}
                {required && (
                    <span className="text-destructive"> *</span>
                )}
            </Label>

            {isSwitch ? (
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={!!value}
                        onCheckedChange={handleSwitchChange}
                        className={cn(error && "data-[state=checked]:bg-destructive")}
                    />
                </div>
            ) : (
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    )}
                    <Input
                        type={type}
                        value={value as string}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={cn(
                            Icon && "pl-10",
                            inputClassName
                        )}
                        step={type === "number" ? "0.000001" : undefined}  // ✅ Better precision for lat/lng
                        min={type === "number" ? "-90" : undefined}  // ✅ Latitude range
                        max={type === "number" ? "90" : undefined}   // ✅ Latitude range
                    />
                </div>
            )}

            {error && (
                <p className="text-xs text-destructive">{error}</p>
            )}
        </div>
    );
};
