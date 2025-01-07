"use server";
import prisma from "@/lib/prisma";

export type Ticket = {
	idTicket: string;
	domaine: string;
	type: string;
	place: string;
	dateOuverture?: Date | null;
	dateFermeture?: Date | null;
};

export async function ouvertureUnTicket({
	idTicket,
	domaine,
	type,
	place,
	dateOuverture,
}: Ticket) {
	try {
		await prisma.ticket.create({
			data: {
				idTicket,
				domaine,
				type,
				place,
				dateOuverture,
			},
		});
	} catch (error) {
		throw new Error("Impossible d'ouvrir le ticket");
	}
}

export async function fermetureUnTicket({
	idTicket,
	dateFermeture,
}: {
	idTicket: string;
	dateFermeture: Date;
}) {
	try {
		const ticket = await prisma.ticket.findUnique({
			where: { idTicket },
		});
		if (!ticket) {
			throw new Error("Ticket non trouvé");
		}
		await prisma.ticket.update({
			where: { idTicket },
			data: {
				dateFermeture,
			},
		});
	} catch (error) {
		throw new Error("Impossible de fermer le ticket");
	}
}

export async function affichetLesTicketNaPasFermet(): Promise<Ticket[]> {
	try {
		const tickets = await prisma.ticket.findMany({
			where: {
				dateFermeture: null,
			},
		});
		return tickets;
	} catch (error) {
		throw new Error("Impossible de récupérer les tickets non fermés");
	}
}

export async function afficherLesChartParDemande(
	whatIsBy: "place" | "domaine" | "type" = "domaine"
) {
	try {
		// Group tickets by 'whatIsBy' and count the number of tickets in each group
		const result = await prisma.ticket.groupBy({
			by: [whatIsBy],
			_count: {
				idTicket: true, // Counts the number of tickets, assuming 'idTicket' is a unique field
			},
		});

		// Extract 'whatIsBy' and their counts
		const chartDomaine = result.map((item) => item[whatIsBy]);
		const chartDomaineCount = result.map((item) => item._count.idTicket);

		return {
			chartDomaine,
			chartDomaineCount,
		};
	} catch (error) {
		throw new Error("Impossible de récupérer les données pour les chartes");
	}
}
// ...existing code...
