"use client";
import "./style.css";
import { useEffect, useState } from "react";

type Ticket = {
	idTicket: string;
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
		<div className="display-no-close-container">
			<h1>Tickets Not Closed</h1>
			{error && <p className="error">{error}</p>}
			{tickets.length > 0 ? (
				<ul>
					{tickets.map((ticket) => (
						<li key={ticket.idTicket}>
							<p>
								<strong>ID Ticket:</strong> {ticket.idTicket}
							</p>
							<p>
								<strong>Type:</strong> {ticket.type}
							</p>
							<p>
								<strong>Place:</strong> {ticket.place}
							</p>
							<p>
								<strong>Date Ouverture:</strong>{" "}
								{ticket.dateOuverture
									? new Date(ticket.dateOuverture).toLocaleString()
									: "N/A"}
							</p>
						</li>
					))}
				</ul>
			) : (
				<p className="no-tickets">No tickets found</p>
			)}
		</div>
	);
}
