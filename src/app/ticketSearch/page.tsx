"use client";

import { Ticket } from "@prisma/client";
import { useState } from "react";

export default function TicketSearch() {
	const [type, setType] = useState("");
	const [place, setPlace] = useState("");
	const [dateOuverture, setDateOuverture] = useState("");
	const [dateFermeture, setDateFermeture] = useState("");

	const [results, setResults] = useState<Ticket[]>([]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/ticketSearch", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type,
					place,
					dateOuverture: dateOuverture
						? new Date(dateOuverture).toISOString()
						: null,
					dateFermeture: dateFermeture
						? new Date(dateFermeture).toISOString()
						: null,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				setResults(data);
			} else {
				alert(data.error || "An error occurred while searching for tickets");
			}
		} catch (error) {
			console.error("Search error:", error);
			alert("An error occurred while searching for tickets");
		}
	};
	const formatDateTime = (dateTimeStr: string): string => {
		return new Date(dateTimeStr).toLocaleString();
	};

	return (
		<>
			<div className="container">
				<h1>recherche</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Type:</label>
						<select value={type} onChange={(e) => setType(e.target.value)}>
							<option value="">Tout problème</option>
							<option value="Problème de réseau">Fibre optique</option>
							<option value="Défaillance matérielle">Réseau 5G</option>
							<option value="Bug logiciel">FixBox</option>
							<option value="Panne de courant">VDSL</option>
							<option value="Incident de sécurité">ADSL</option>
							<option value="Problème de connexion">Connexion lente</option>
							<option value="Problème de signal">Signal faible</option>
							<option value="Problème de facturation">
								Erreur de facturation
							</option>
							<option value="Problème de service">
								Interruption de service
							</option>
							<option value="Problème de configuration">
								Configuration incorrecte
							</option>
						</select>
					</div>
					<div>
						<label>Place:</label>
						<select
							value={place}
							onChange={(e) => {
								setPlace(e.target.value);
							}}>
							<option value="">Toute région</option>
							<option value="Sidi Ahmed Zarroug">Sidi Ahmed Zarroug</option>
							<option value="Cité sourour">Cité sourour</option>
							<option value="lala">lala</option>
							<option value="Ras El Kef">Ras El Kef</option>
							<option value="Cité Ennour">Cité Ennour</option>
							<option value="Ksar">Ksar</option>
							<option value="Métlaoui">Métlaoui</option>
							<option value="Redeyef">Redeyef</option>
							<option value="Moularès">Moularès</option>
							<option value="El Guettar">El Guettar</option>
							<option value="Sened">Sened</option>
							<option value="Sidi Aich">Sidi Aich</option>
							<option value="Gafsa Nord">Gafsa Nord</option>
							<option value="Gafsa Sud">Gafsa Sud</option>
							<option value="Gafsa Ville">Gafsa Ville</option>
							<option value="Belkhir">Belkhir</option>
							<option value="Mdhilla">Mdhilla</option>
							<option value="Sidi Boubaker">Sidi Boubaker</option>
							<option value="Zannouch">Zannouch</option>
						</select>
					</div>
					<div>
						<label>Date Ouverture:</label>
						<input
							type="datetime-local"
							value={dateOuverture}
							onChange={(e) => setDateOuverture(e.target.value)}
						/>
					</div>
					<div>
						<label>Date Fermeture:</label>
						<input
							type="datetime-local"
							value={dateFermeture}
							onChange={(e) => setDateFermeture(e.target.value)}
						/>
					</div>
					<button type="submit">search Ticket</button>
				</form>

				<div
					className="card"
					id="resultsCard"
					style={{ display: results.length > 0 ? "block" : "none" }}>
					<div className="card-header">
						<h2 className="card-title" style={{ textAlign: "center" }}>
							Search Results
						</h2>
					</div>
					<div className="card-content">
						<div id="searchResults">
							{results.length === 0 ? (
								<div className="no-results">
									No tickets found matching your criteria
								</div>
							) : (
								<table
									style={{ margin: "0 auto" }}
									className="results-table"
									border={1}>
									<thead>
										<tr>
											<th>ID Ticket</th>
											<th>Region</th>
											<th>Problem</th>
											<th>Opening Time</th>
											<th>Closing Time</th>
										</tr>
									</thead>
									<tbody>
										{results.map((ticket, index) => (
											<tr key={index}>
												<td>{ticket.idTicket}</td>
												<td>{ticket.place}</td>
												<td>{ticket.type}</td>
												<td>
													{ticket.dateOuverture
														? formatDateTime(ticket.dateOuverture.toString())
														: "N/A"}
												</td>
												<td>
													{ticket.dateFermeture
														? formatDateTime(ticket.dateFermeture.toString())
														: "N/A"}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
