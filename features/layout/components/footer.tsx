import Link from "next/link";

const LayoutFooter = () => {
    return (
        <footer className="bg-primary text-muted-foreground p-4 text-sm">
            <p className="text-center">
                &copy; {new Date().getFullYear()} Budget Calculator
            </p>
            <p className="text-center">
                Made with ❤️ by <Link href="https://horagutierrez.vercel.app" className="underline" target="_blank">Horacio Gutierrez</Link>
            </p>
        </footer>
    );
}

export default LayoutFooter;