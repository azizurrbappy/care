
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Mother of two",
        content: "Found an amazing babysitter within hours. The service is a lifesaver!",
        initials: "SA",
    },
    {
        name: "Rahim Chowdhury",
        role: "Son",
        content: "The elderly care service for my father has been exceptional. Highly recommended.",
        initials: "RC",
    },
    {
        name: "Lisa Wong",
        role: "Patient",
        content: "Recovering from surgery was easier with the help I found here. Very professional.",
        initials: "LW",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-white">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">"{testimonial.content}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
