import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

const metadata: Metadata = {
	title: "HPSM Tunisie Télécom",
	description: "HPSM tunisie télécom ",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
