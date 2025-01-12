import { NextResponse } from "next/server";
import { afficherLesChartParDemande } from "@/action/action";

export async function POST(request: Request) {
	try {
		const { whatIsBy } = await request.json();
		const chartFinal = await afficherLesChartParDemande(whatIsBy);

		// Format the data for Chart.js
		const formattedData = {
			labels: chartFinal.chartData,
			datasets: [
				{
					label: `Number of Tickets by ${whatIsBy}`,
					data: chartFinal.chartDataCount,
					backgroundColor: "rgb(187, 134, 252)",
					borderColor: "rgb(224, 224, 224)",
					borderWidth: 1,
				},
			],
		};

		return NextResponse.json(formattedData);
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
