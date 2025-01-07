"use client";

import { useState } from "react";

export default function Home() {
	const [idTicket, setIdTicket] = useState("");
	const [domaine, setDomaine] = useState("");
	const [type, setType] = useState("");
	const [place, setPlace] = useState("");
	const [dateOuverture, setDateOuverture] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/openTicket", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idTicket,
					domaine,
					type,
					place,
					dateOuverture: dateOuverture ? new Date(dateOuverture) : null,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				alert("Ticket opened successfully");
			} else {
				alert(data.error);
			}
		} catch (error) {
			alert("An error occurred while opening the ticket");
		}
	};

	return (
		<div>
			<h1>Home</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						ID Ticket:
						<input
							type="text"
							value={idTicket}
							onChange={(e) => setIdTicket(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Domaine:
						<input
							type="text"
							value={domaine}
							onChange={(e) => setDomaine(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Type:
						<input
							type="text"
							value={type}
							onChange={(e) => setType(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Place:
						<input
							type="text"
							value={place}
							onChange={(e) => setPlace(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Date Ouverture:
						<input
							type="datetime-local"
							value={dateOuverture}
							onChange={(e) => setDateOuverture(e.target.value)}
						/>
					</label>
				</div>
				<button type="submit">Open Ticket</button>
			</form>
		</div>
	);
}
