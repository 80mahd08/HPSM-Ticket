"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function DisplayChart() {
	const [whatIsBy, setWhatIsBy] = useState<"place" | "domaine" | "type">(
		"domaine"
	);
	const [chartData, setChartData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/displayChart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ whatIsBy }),
			});
			const data = await response.json();
			if (response.ok) {
				setChartData(data);
				setError(null);
			} else {
				setError(data.error);
			}
		} catch (error) {
			setError("An error occurred while fetching the chart data");
		}
	};

	return (
		<div>
			<h1>Display Chart</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Select Category:
						<select
							value={whatIsBy}
							onChange={(e) =>
								setWhatIsBy(e.target.value as "place" | "domaine" | "type")
							}>
							<option value="place">Place</option>
							<option value="domaine">Domaine</option>
							<option value="type">Type</option>
						</select>
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{chartData && (
				<div>
					<Bar
						data={chartData}
						options={{
							responsive: true,
							plugins: {
								legend: {
									position: "top",
								},
								title: {
									display: true,
									text: `Number of Tickets by ${whatIsBy}`,
								},
							},
						}}
					/>
				</div>
			)}
		</div>
	);
}
