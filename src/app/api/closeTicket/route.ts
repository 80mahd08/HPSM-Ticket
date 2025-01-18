import { NextResponse } from "next/server";
import { fermetureUnTicket } from "@/action/action";

export async function PUT(request: Request) {
  try {
    const { idTicket, dateFermeture, pending } = await request.json();

    await fermetureUnTicket({
      idTicket,
      dateFermeture,
      pending,
    });
    return NextResponse.json({ message: "Ticket closed successfully" });
  } catch (error) {
    console.error("Error:", error); // Add this line
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
