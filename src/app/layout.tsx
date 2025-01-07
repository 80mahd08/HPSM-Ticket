// app/layout.js
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link"; // Import the Link component
import "fhf/dist/normalize.css";

export const metadata: Metadata = {
	title: "Ticket HPSM",
	description: "site web pour la gestion des tickets HPSM",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<header>
					<nav>
						<ul>
							<li>
								<Link href="/">open</Link>
							</li>
							<li>
								<Link href="/closeTicket">Close</Link>{" "}
							</li>
							<li>
								<Link href="/displayNoClose">display</Link>
							</li>
							<li>
								<Link href="displayChart">chart </Link>
							</li>
						</ul>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}
