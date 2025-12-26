
"use client";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight text-primary">Care.xyz</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href="/#services" className="transition-colors hover:text-foreground/80 text-foreground/60">Services</Link>
                        <Link href="/#about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-2">
                    <nav className="flex items-center gap-2">
                        {session ? (
                            <>
                                <Link href="/my-bookings">
                                    <Button variant="ghost">My Bookings</Button>
                                </Link>
                                <Button onClick={async () => {
                                    await signOut();
                                    router.push("/");
                                }}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
