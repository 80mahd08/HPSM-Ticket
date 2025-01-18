"use client";
import React, { useState } from "react";
import { useMediaStyle } from "fhf-react/parts/custom-hooks.jsx";
import tunisieTelecomLogo from "./../../public/tunisie-telecom.png";
import isetLogo from "./../../public/iset-logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isClicked, useIsClicked] = useState(false);
  const isSmallStyle = useMediaStyle("(max-width: 800px)", { display: "none" });
  const isLargeStyle = useMediaStyle("(min-width: 800px)", { display: "none" });
  const isSmallSmallStyle = useMediaStyle("(max-width: 400px)", {
    display: "none",
  });

  return (
    <header>
      <div className="top-part">
        <Image
          style={isSmallSmallStyle}
          src={tunisieTelecomLogo}
          alt="tunisie telecom logo"
          width={75}
          height={50}
        />
        <p style={{ textAlign: "center" }}>HPSM Ticket</p>
        <Image
          style={isSmallSmallStyle}
          src={isetLogo}
          alt="iset logo"
          width={80}
          height={80}
        />
      </div>
      <nav>
        <ul>
          <li></li>
          <li style={isSmallStyle}>
            <Link href="/">ouvrir</Link>
          </li>
          <li style={isSmallStyle}>
            <Link href="/closeTicket">gestion ticket</Link>
          </li>

          <li style={isSmallStyle}>
            <Link href="/displayNoClose">tableau de bord</Link>
          </li>
          <li style={isSmallStyle}>
            <Link href="/displayChart">graphique</Link>
          </li>
          <li style={isSmallStyle}>
            <Link href={"/ticketSearch"}>recherche</Link>
          </li>
        </ul>
        <div
          onClick={() => {
            useIsClicked((pre) => !pre);
          }}
          style={isLargeStyle}
          className={`menu-icon ${isClicked ? "clicked" : ""}`}
        >
          <span className="span-1"></span>
          <span className="span-2"></span>
          <span className="span-3"></span>
          <div
            className="menu-small"
            style={{
              display: isClicked ? "flex" : "none",
            }}
          >
            {" "}
            <ul>
              <li>
                <Link href="/">ouvrir</Link>
              </li>
              <li>
                <Link href="/closeTicket">gestion ticket</Link>
              </li>
              <li>
                <Link href="/displayNoClose">tableau de bord</Link>
              </li>
              <li>
                <Link href="/displayChart">graphique</Link>
              </li>
              <li>
                <Link href={"/ticketSearch"}>recherche</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
