
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Booking {
    _id: string;
    serviceName: string;
    totalCost: number;
    status: string;
    duration: number;
    durationType: string;
    createdAt: string;
    location: {
        city: string;
        area: string;
    };
}

export default function BookingList({ bookings }: { bookings: Booking[] }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    async function cancelBooking(id: string) {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        setLoadingId(id);
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: "PATCH" });
            if (!res.ok) throw new Error("Failed to cancel");
            toast.success("Booking cancelled");
            router.refresh();
        } catch (e) {
            toast.error("Failed to cancel");
        } finally {
            setLoadingId(null);
        }
    }

    if (bookings.length === 0) {
        return <div className="text-center py-10 text-gray-500">No bookings found.</div>;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map(booking => (
                <Card key={booking._id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>{booking.serviceName}</CardTitle>
                            <Badge variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Pending' ? 'secondary' : 'destructive'}>
                                {booking.status}
                            </Badge>
                        </div>
                        <CardDescription>
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-2">
                        <p><strong>Duration:</strong> {booking.duration} {booking.durationType}(s)</p>
                        <p><strong>Cost:</strong> ${booking.totalCost}</p>
                        <p><strong>Location:</strong> {booking.location.city}, {booking.location.area}</p>

                        <div className="pt-4 mt-auto">
                            {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    disabled={loadingId === booking._id}
                                    onClick={() => cancelBooking(booking._id)}
                                >
                                    {loadingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                                </Button>
                            )}
                            {booking.status === 'Cancelled' && (
                                <Button variant="outline" className="w-full" disabled>Cancelled</Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
