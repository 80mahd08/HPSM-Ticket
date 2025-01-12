"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
	const [idTicket, setIdTicket] = useState("");
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
					type,
					place,
					dateOuverture: dateOuverture ? new Date(dateOuverture) : null,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				Swal.fire({
					title: "Success!",
					text: "Ticket opened successfully",
					icon: "success",
					confirmButtonText: "OK",
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: data.error || "An error occurred while opening the ticket",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: "An error occurred while opening the ticket",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<div className="home">
			<h1>Home</h1>
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
					<label>Type:</label>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
						required>
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
						<option value="Problème de service">Interruption de service</option>
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
						}}
						required>
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
						required
					/>
				</div>
				<button type="submit">Open Ticket</button>
			</form>
		</div>
	);
}
