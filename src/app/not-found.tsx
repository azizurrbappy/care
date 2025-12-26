
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <h1 className="text-6xl font-extrabold text-primary">404</h1>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Page Not Found</h2>
            <p className="mt-4 text-lg text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
            <div className="mt-8">
                <Link href="/">
                    <Button size="lg">Return to Home</Button>
                </Link>
            </div>
        </div>
    );
}
