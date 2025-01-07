import { NextResponse } from "next/server";
import { afficherLesChartParDemande } from "@/action/action";

export async function POST(request: Request) {
	try {
		const { whatIsBy } = await request.json();
		const chartData = await afficherLesChartParDemande(whatIsBy);

		// Format the data for Chart.js
		const formattedData = {
			labels: chartData.chartDomaine,
			datasets: [
				{
					label: `Number of Tickets by ${whatIsBy}`,
					data: chartData.chartDomaineCount,
					backgroundColor: "rgba(75, 192, 192, 0.2)",
					borderColor: "rgba(75, 192, 192, 1)",
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
