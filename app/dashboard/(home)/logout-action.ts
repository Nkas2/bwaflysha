"use server";

import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOut() {
    const result = await getUser();

    if (result?.session) {
        await lucia.invalidateSession(result.session.id);

        const sessionCookie = lucia.createBlankSessionCookie();

        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        return redirect("/dashboard/signin");
    }
}
