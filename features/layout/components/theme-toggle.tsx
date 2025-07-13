'use client'
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {

    const { theme, setTheme } = useTheme();

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch
                checked={theme === "dark"}
                onCheckedChange={handleThemeToggle}
            />
            <Moon className="h-4 w-4" />
        </div>
    );
}

export default ThemeToggle;