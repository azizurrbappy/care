
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import clientPromise from "@/lib/db";
import BookingList from "@/components/bookings/BookingList";

export default async function MyBookingsPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        // Should be handled by middleware, but fallback
        return <div>Please log in to view bookings.</div>;
    }

    const client = await clientPromise;
    const db = client.db();
    const bookings = await db.collection("bookings")
        .find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .toArray();

    const serializedBookings = bookings.map(b => ({
        ...b,
        _id: b._id.toString(),
        createdAt: b.createdAt.toString(),
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
            <BookingList bookings={serializedBookings as any} />
        </div>
    );
}
