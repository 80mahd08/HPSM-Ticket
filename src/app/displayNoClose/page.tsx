"use client";

import { useEffect, useState } from "react";

type Ticket = {
	idTicket: string;
	domaine: string;
	type: string;
	place: string;
	dateOuverture?: Date | null;
	dateFermeture?: Date | null;
};

export default function DisplayNoClose() {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const response = await fetch("/api/displayNoClose");
				const data = await response.json();
				if (response.ok) {
					setTickets(data);
				} else {
					setError(data.error);
				}
			} catch (error) {
				setError("An error occurred while fetching the tickets");
			}
		};

		fetchTickets();
	}, []);

	return (
		<div>
			<h1>Tickets Not Closed</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{tickets.length > 0 ? (
				<ul>
					{tickets.map((ticket) => (
						<li key={ticket.idTicket}>
							<p>ID Ticket: {ticket.idTicket}</p>
							<p>Domaine: {ticket.domaine}</p>
							<p>Type: {ticket.type}</p>
							<p>Place: {ticket.place}</p>
							<p>Date Ouverture: {ticket.dateOuverture?.toString()}</p>
						</li>
					))}
				</ul>
			) : (
				<p>No tickets found</p>
			)}
		</div>
	);
}
