"use server";

import { redirect } from "next/navigation";
import { validation } from "./validation";
import prisma from "@/lib/prisma";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcrypt");

export interface SigninResult {
    errorTitle: string | null;
    errorDesc: string[] | null;
    payload?: FormData;
}

export async function signIn(
    prevData: unknown,
    formData: FormData
): Promise<SigninResult> {
    const validate = validation.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validate.success) {
        const errorDesc = validate.error.issues.map((i) => i.message);
        return {
            errorTitle: "Error validation",
            errorDesc,
            payload: formData,
        };
    }

    const user = await prisma.user.findFirst({
        where: {
            email: validate.data.email,
        },
    });

    if (!user) {
        return {
            errorTitle: "Error",
            errorDesc: ["Wrong email or password"],
            payload: formData,
        };
    }

    const validatePassword = await bcrypt.compare(
        validate.data.password,
        user.password
    );

    if (!validatePassword) {
        return {
            errorTitle: "Error",
            errorDesc: ["Wrong email or password"],
            payload: formData,
        };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return redirect("/dashboard");
}
