"use client";

import { useState } from "react";

export default function CloseTicket() {
	const [idTicket, setIdTicket] = useState("");
	const [dateFermeture, setDateFermeture] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/closeTicket", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idTicket,
					dateFermeture: dateFermeture ? new Date(dateFermeture) : null,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				alert("Ticket closed successfully");
			} else {
				alert(data.error);
			}
		} catch (error) {
			alert("An error occurred while closing the ticket");
		}
	};

	return (
		<div>
			<h1>Close Ticket</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>ID Ticket:</label>
					<input
						type="text"
						value={idTicket}
						onChange={(e) => setIdTicket(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Date Fermeture:</label>
					<input
						type="date"
						value={dateFermeture}
						onChange={(e) => setDateFermeture(e.target.value)}
					/>
				</div>
				<button type="submit">Close Ticket</button>
			</form>
		</div>
	);
}
