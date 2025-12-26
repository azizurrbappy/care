
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
    {
        id: "baby-care",
        title: "Baby Care",
        description: "Professional babysitting for your little ones.",
        image: "/images/baby-care.png",
    },
    {
        id: "elderly-care",
        title: "Elderly Service",
        description: "Compassionate support for senior family members.",
        image: "/images/elderly-care.png",
    },
    {
        id: "sick-care",
        title: "Sick People Service",
        description: "Dedicated care for those recovering at home.",
        image: "/images/sick-care.png",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Our Services
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Choose the right care plan for your specific needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Card key={service.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                                <CardDescription>{service.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">
                                    Reliable caregivers verified for safety and expertise.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/service/${service.id}`} className="w-full">
                                    <Button className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
