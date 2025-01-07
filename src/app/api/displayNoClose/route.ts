import { NextResponse } from "next/server";
import { affichetLesTicketNaPasFermet } from "@/action/action";

export async function GET() {
	try {
		const tickets = await affichetLesTicketNaPasFermet();
		return NextResponse.json(tickets);
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
