"use client";
import "./style.css";
import { CSSProperties, useEffect, useState } from "react";
import { Ticket } from "@prisma/client";

export default function DisplayNoClose() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log(tickets);

  const details: { [key: string]: string } = {
    "Problème de réseau": "Problème avec la connexion fibre optique.",
    "Défaillance matérielle": "Panne matérielle sur le réseau 5G.",
    "Bug logiciel": "Bug logiciel dans le système FixBox.",
    "Panne de courant": "Coupure de courant affectant les services VDSL.",
    "Incident de sécurité":
      "Incident de sécurité impactant les connexions ADSL.",
    "Problème de connexion": "Problèmes de connexion lente signalés.",
    "Problème de signal":
      "Signal faible causant des problèmes de connectivité.",
    "Problème de facturation":
      "Erreur de facturation détectée sur les comptes clients.",
    "Problème de service":
      "Interruption de service affectant les utilisateurs.",
    "Problème de configuration":
      "Configuration incorrecte causant des problèmes de service.",
  };
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
      <h1>tableau de bord</h1>
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
              {ticket.commentaire && (
                <p>
                  <strong>Commentaire:</strong> {ticket.commentaire}
                </p>
              )}
              <p>
                <strong>pending:</strong> {ticket.pending ? "oui" : "non"}
              </p>
              <p>
                <strong>Date Ouverture:</strong>{" "}
                {ticket.dateOuverture
                  ? new Date(ticket.dateOuverture).toLocaleString()
                  : "N/A"}
              </p>

              <p
                className="more-display"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <button>
                  plus<div style={divDetailsStyles}>{details[ticket.type]}</div>
                </button>
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

const divDetailsStyles: CSSProperties = {
  padding: "20px",
};
