"use server";
import prisma from "@/lib/prisma";

export type Ticket = {
	idTicket: string;
	type: string;
	place: string;
	dateOuverture?: Date | null;
	dateFermeture?: Date | null;
};

export async function ouvertureUnTicket({
	idTicket,
	type,
	place,
	dateOuverture,
}: Ticket) {
	try {
		await prisma.ticket.create({
			data: {
				idTicket,
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
	whatIsBy: "place" | "type" = "place"
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
		const chartData = result.map((item) => item[whatIsBy]);
		const chartDataCount = result.map((item) => item._count.idTicket);

		return {
			chartData,
			chartDataCount,
		};
	} catch (error) {
		throw new Error("Impossible de récupérer les données pour les chartes");
	}
}
export async function searchTickets({
	idTicket,
	type,
	place,
	dateOuverture,
	dateFermeture,
}: {
	idTicket?: string;
	type?: string;
	place?: string;
	dateOuverture?: Date | null;
	dateFermeture?: Date | null;
}): Promise<Ticket[]> {
	try {
		const tickets = await prisma.ticket.findMany({
			where: {
				idTicket: idTicket ? { contains: idTicket } : undefined,
				type: type ? { contains: type } : undefined,
				place: place ? { contains: place } : undefined,
				dateOuverture: dateOuverture ? { gte: dateOuverture } : undefined,
				dateFermeture: dateFermeture ? { lte: dateFermeture } : undefined,
			},
		});
		return tickets;
	} catch (error) {
		throw new Error("Impossible de rechercher les tickets");
	}
}
