// app/layout.js
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link"; // Import the Link component

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
								<Link href="/">Home</Link>
							</li>
							<li>
								<Link href="/closeTicket">Close Ticket</Link>{" "}
							</li>
							<li>
								<Link href="/displayNoClose">display no close</Link>
							</li>
							<li>
								<Link href="displayChart">display chart</Link>
							</li>
						</ul>
					</nav>
				</header>
				{children}
			</body>
		</html>
	);
}
