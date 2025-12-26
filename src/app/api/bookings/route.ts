
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    // In a real app, validate body with Zod here again.

    const client = await clientPromise;
    const db = client.db();

    const booking = {
        userId: session.user.id,
        userEmail: session.user.email,
        userName: session.user.name,
        serviceId: body.serviceId,
        serviceName: body.serviceName,
        durationType: body.durationType,
        duration: body.duration,
        location: {
            division: body.division,
            district: body.district,
            city: body.city,
            area: body.area,
            address: body.address
        },
        totalCost: body.totalCost,
        status: "Pending",
        createdAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(booking);

    // Mock Email Invoice
    console.log(`[Email Mock] Sending invoice to ${session.user.email} for booking ${result.insertedId} with total $${body.totalCost}`);

    return NextResponse.json({ success: true, bookingId: result.insertedId });
}

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const bookings = await db.collection("bookings")
        .find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .toArray();

    return NextResponse.json(bookings);
}
