import { NextResponse } from "next/server";
import { searchTickets } from "@/action/action";

export async function POST(request: Request) {
	try {
		const { type, place, dateOuverture, dateFermeture } = await request.json();

		const tickets = await searchTickets({
			type,
			place,
			dateOuverture: dateOuverture ? new Date(dateOuverture) : null,
			dateFermeture: dateFermeture ? new Date(dateFermeture) : null,
		});
		return NextResponse.json(tickets);
	} catch (error) {
		console.error("Error:", error);
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
