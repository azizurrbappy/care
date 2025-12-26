
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ServicePageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
    const { id } = await params;
    const service = services.find((s) => s.id === id);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.title} - Care.xyz`,
        description: service.description,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { id } = await params;
    const service = services.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{service.title}</h1>
                    <p className="mt-4 text-xl text-gray-600">{service.description}</p>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-xl font-semibold">Key Features:</h3>
                        <ul className="grid gap-2 sm:grid-cols-2">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8">
                        <div className="mb-6 flex gap-8">
                            <div>
                                <span className="block text-sm text-gray-500">Hourly Rate</span>
                                <span className="text-2xl font-bold">${service.hourlyRate}</span>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500">Daily Rate</span>
                                <span className="text-2xl font-bold">${service.dailyRate}</span>
                            </div>
                        </div>
                        <Link href={`/booking/${service.id}`}>
                            <Button size="lg" className="w-full sm:w-auto">
                                Book This Service
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
