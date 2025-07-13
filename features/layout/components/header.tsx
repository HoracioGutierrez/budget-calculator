import { ThemeToggle } from "@/features/layout/components";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

const LayoutHeader = () => {
    return (
        <header className="flex items-center justify-between p-4">
            <Link href="/">
                <h1 className="flex items-center gap-2 text-2xl font-bold">
                    <ClipboardList />
                    Budget Calculator
                </h1>
            </Link>
            <ThemeToggle />
        </header>
    );
}

export default LayoutHeader;