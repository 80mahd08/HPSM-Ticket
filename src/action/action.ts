"use server";
import prisma from "@/lib/prisma";

type Ticket = {
  idTicket: number;
  type: string;
  place: string;
  pending: boolean | null;
  commentaire: string | null;
  dateOuverture: Date | null;
  dateFermeture: Date | null;
};

export async function ouvertureUnTicket({
  type,
  place,
  dateOuverture,
  commentaire,
}: {
  type: string;
  place: string;
  pending: boolean | null;
  commentaire: string | null;
  dateOuverture: Date | null;
}) {
  try {
    await prisma.ticket.create({
      data: {
        type,
        place,
        commentaire,
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
  pending,
}: {
  idTicket: number;
  dateFermeture?: Date;
  pending?: boolean;
}) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { idTicket },
    });
    if (!ticket) {
      throw new Error("Ticket non trouvé");
    }
    if (pending) {
      await prisma.ticket.update({
        where: { idTicket },
        data: {
          pending,
        },
      });
    } else {
      await prisma.ticket.update({
        where: { idTicket },
        data: {
          dateFermeture,
        },
      });
    }
  } catch (error) {
    throw new Error("Impossible de fermer (pending) le ticket");
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
  type,
  place,
  dateOuverture,
  dateFermeture,
}: {
  type?: string;
  place?: string;
  dateOuverture?: Date | null;
  dateFermeture?: Date | null;
}): Promise<Ticket[]> {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
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
