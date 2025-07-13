import { ThemeToggle } from "@/features/layout/components";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

const LayoutHeader = () => {
    return (
        <header className="flex items-center justify-between p-4 fixed top-0 left-0 right-0 z-50 bg-primary/50 text-white backdrop-blur-sm">
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