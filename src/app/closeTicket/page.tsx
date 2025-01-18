"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function CloseTicket() {
  const [idTicket, setIdTicket] = useState<number | undefined>();
  const [pending, setPending] = useState<boolean>(false);
  const [dateFermeture, setDateFermeture] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idTicket) {
      Swal.fire({
        title: "Error!",
        text: "ID Ticket is required",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (pending && dateFermeture) {
      Swal.fire({
        title: "Error!",
        text: "Do not set both date fermeture and pending",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload: any = { idTicket };
    if (pending) {
      payload.pending = pending;
    } else if (dateFermeture) {
      payload.dateFermeture = new Date(dateFermeture);
    }

    try {
      const response = await fetch("/api/closeTicket", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: pending
            ? "Pending updated successfully"
            : "Ticket closed successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.error || "An error occurred while closing the ticket",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while closing the ticket",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <h1>Gestion Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idTicket">ID Ticket:</label>
          <input
            type="text"
            id="idTicket"
            value={idTicket ?? ""}
            onChange={(e) => setIdTicket(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="pending">Is Pending:</label>
          <input
            type="checkbox"
            id="pending"
            checked={pending}
            onChange={(e) => setPending(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="dateFermeture">Date Fermeture:</label>
          <input
            type="datetime-local"
            id="dateFermeture"
            value={dateFermeture}
            onChange={(e) => setDateFermeture(e.target.value)}
            disabled={pending}
          />
        </div>
        <button type="submit">Gestion Ticket</button>
      </form>
    </div>
  );
}
