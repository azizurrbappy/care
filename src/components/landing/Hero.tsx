
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/banner.png"
                    alt="Caregiving Banner"
                    fill
                    className="object-cover brightness-50" // Darken for text readability
                    priority
                />
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    Compassionate Care for Your Loved Ones
                </h1>
                <p className="mt-6 max-w-2xl text-xl text-gray-200">
                    Reliable and trusted care services for children, elderly, and family members.
                    Making caregiving easy, secure, and accessible for everyone.
                </p>
                <div className="mt-10 flex gap-4">
                    <Link href="#services">
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Find Care
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="outline" size="lg" className="bg-transparent text-white hover:bg-white/10 hover:text-white border-white">
                            Join as Caregiver
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
