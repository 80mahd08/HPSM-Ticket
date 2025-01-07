import { NextResponse } from "next/server";
import { ouvertureUnTicket } from "@/action/action";

export async function POST(request: Request) {
	try {
		const { idTicket, domaine, type, place, dateOuverture } =
			await request.json();
		await ouvertureUnTicket({ idTicket, domaine, type, place, dateOuverture });
		return NextResponse.json({ message: "Ticket opened successfully" });
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
