
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    durationType: z.enum(["hourly", "daily"]),
    duration: z.coerce.number().min(1, "Duration must be at least 1"),
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
});

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const service = services.find((s) => s.id === id);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            durationType: "hourly",
            duration: 1,
            division: "",
            district: "",
            city: "",
            area: "",
            address: "",
        },
    });

    const durationType = form.watch("durationType");
    const duration = form.watch("duration");

    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (!service) return;
        const rate = durationType === "hourly" ? service.hourlyRate : service.dailyRate;
        setTotalCost(rate * duration);
    }, [durationType, duration, service]);

    if (!service) return <div>Service not found</div>;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!service) return; // Fix specific issue where service might be undefined
        if (!session) {
            toast.error("Please login to book a service");
            router.push("/login"); // Middleware should handle this but check client side too
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serviceId: service.id,
                    serviceName: service.title, // Store snapshot
                    ...values,
                    totalCost,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create booking");
            }

            toast.success("Booking confirmed successfully!");
            router.push("/my-bookings");
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Book {service.title}</CardTitle>
                    <CardDescription>Fill in the details to schedule your care service.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="durationType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="hourly">Hourly (${service.hourlyRate}/hr)</SelectItem>
                                                    <SelectItem value="daily">Daily (${service.dailyRate}/day)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration ({durationType === 'hourly' ? 'Hours' : 'Days'})</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Simplification: using text inputs for location parts for now as requested by user broadly but implementation-wise lists are big */}
                                <FormField
                                    control={form.control}
                                    name="division"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Division</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Dhaka" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>District</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Dhaka" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City/Thana</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Gulshan" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="area"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Area</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Sector 1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Detailed Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="House #123, Road #4..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="rounded-lg bg-gray-100 p-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total Cost:</span>
                                    <span>${totalCost}</span>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? "Confirming Booking..." : "Confirm Booking"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
