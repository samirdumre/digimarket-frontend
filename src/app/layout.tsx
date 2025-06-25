import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import Footer from "@/components/common/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "DigiMarket",
    description: "An online marketplace for digital (products)",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
        shortcut: "/logo.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={geistSans.variable}>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
            style={{
                fontFamily:
                    "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
            }}
        >
        {children}
        <Toaster/>
        {/*<Footer/>*/}
        </body>
        </html>
    );
}
