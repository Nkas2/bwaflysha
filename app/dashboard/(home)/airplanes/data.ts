"use server";

import prisma from "@/lib/prisma";

export async function getAirplanes() {
    try {
        return await prisma.airplane.findMany({});
    } catch (error) {
        console.log("failed get airplanes data, error", error);
        return [];
    }
}
