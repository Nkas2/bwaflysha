import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenText, PlaneIcon, Ticket, User } from "lucide-react";
import ButtonLogout from "./ButtonLogout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const geistSans = localFont({
    src: "./../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Login",
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const result = await getUser();
    if (!result?.session || result?.user?.role === "CUSTOMER") {
        redirect("/dashboard/signin");
    }
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <section>
                    <nav className="border-b border-muted p-5">
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-bold text-primary">
                                Dashboard
                            </span>
                        </div>
                    </nav>

                    <section className="flex flex-row gap-5 items-start flex-nowrap">
                        <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
                            <div className="space-y-2">
                                <Button
                                    asChild
                                    className="w-full justify-start"
                                    variant={"ghost"}
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <div className="uppercase text-xs font-bold">
                                    Master Data
                                </div>
                                <Button
                                    asChild
                                    className="w-full justify-start"
                                    variant={"ghost"}
                                >
                                    <Link href="/dashboard/airplanes">
                                        <PlaneIcon className="mr-2 w-4 h-4" />
                                        Airplanes
                                    </Link>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    asChild
                                    className="w-full justify-start"
                                    variant={"ghost"}
                                >
                                    <Link href="/dashboard/flights">
                                        <BookOpenText className="mr-2 w-4 h-4" />
                                        Flights
                                    </Link>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    asChild
                                    className="w-full justify-start"
                                    variant={"ghost"}
                                >
                                    <Link href="/dashboard/tickets">
                                        <Ticket className="mr-2 w-4 h-4" />
                                        Tickets
                                    </Link>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    asChild
                                    className="w-full justify-start"
                                    variant={"ghost"}
                                >
                                    <Link href="/dashboard/users">
                                        <User className="mr-2 w-4 h-4" />
                                        Users
                                    </Link>
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <ButtonLogout />
                            </div>
                        </section>
                        <section className="grow mr-5 mt-5 h-[87vh] overflow-y-auto">
                            {children}
                        </section>
                    </section>
                </section>
            </body>
        </html>
    );
}
