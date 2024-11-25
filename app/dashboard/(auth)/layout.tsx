import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function LayoutSignin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const result = await getUser();
    if (result?.session && result?.user?.role === "ADMIN") {
        redirect("/dashboard");
    }
    return <>{children}</>;
}

export default LayoutSignin;
