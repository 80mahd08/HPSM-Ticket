"use client";
import React, { useState } from "react";
import { useMediaStyle } from "fhf-react/parts/custom-hooks.jsx";
import tuniTele from "./../../public/tunisie-telecom.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const [isClicked, useIsClicked] = useState(false);
	const isSmallStyle = useMediaStyle("(max-width: 500px)", { display: "none" });
	const isLargeStyle = useMediaStyle("(min-width: 500px)", { display: "none" });

	return (
		<header>
			<nav>
				<ul>
					<li style={isSmallStyle}>
						<Link href="/">open</Link>
					</li>
					<li style={isSmallStyle}>
						<Link href="/closeTicket">Close</Link>
					</li>
					<li>
						<Image src={tuniTele} alt="Description" width={75} height={50} />
					</li>
					<li style={isSmallStyle}>
						<Link href="/displayNoClose">display</Link>
					</li>
					<li style={isSmallStyle}>
						<Link href="displayChart">chart </Link>
					</li>
				</ul>
				<div
					onClick={() => {
						useIsClicked((pre) => !pre);
					}}
					style={isLargeStyle}
					className={`menu-icon ${isClicked ? "clicked" : ""}`}>
					<span className="span-1"></span>
					<span className="span-2"></span>
					<span className="span-3"></span>
				</div>
				<div
					className="menu-small"
					style={{
						display: isClicked ? "block" : "none",
						position: "absolute",
					}}>
					{" "}
					<ul>
						<li>
							<Link href="/">open</Link>
						</li>
						<li>
							<Link href="/closeTicket">Close</Link>
						</li>
						<li>
							<Link href="/displayNoClose">display</Link>
						</li>
						<li>
							<Link href="/displayChart">chart</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
