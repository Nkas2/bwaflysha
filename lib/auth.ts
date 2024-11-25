import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@/lib/prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

import { Lucia } from "lucia";
import { RoleUser } from "@prisma/client";
import { cache } from "react";
import { cookies } from "next/headers";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            name: attributes.name,
            email: attributes.email,
            role: attributes.role,
            passport: attributes.passport,
        };
    },
});

export const getUser = cache(async () => {
    const sessionId =
        (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return null;
    }
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    } catch {
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return {
        user: user,
        session: session,
    };
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    name: string;
    email: string;
    role: RoleUser;
    passport: string | null;
}
