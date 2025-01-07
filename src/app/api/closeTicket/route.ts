import { NextResponse } from "next/server";
import { fermetureUnTicket } from "@/action/action";

export async function PUT(request: Request) {
	try {
		const { idTicket, dateFermeture } = await request.json();
		await fermetureUnTicket({
			idTicket,
			dateFermeture: new Date(dateFermeture),
		});
		return NextResponse.json({ message: "Ticket closed successfully" });
	} catch (error) {
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
