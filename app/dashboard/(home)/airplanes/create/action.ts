"use server";

import { redirect } from "next/navigation";
import { validation } from "./validation";

export interface CreateAirplanes {
    errorTitle: string | null;
    errorDesc: string[] | null;
    payload?: FormData;
}

export async function createAirplanes(
    prevData: unknown,
    formData: FormData
): Promise<CreateAirplanes> {
    const validate = validation.safeParse({
        name: formData.get("name"),
        code: formData.get("code"),
        image: formData.get("image"),
    });

    if (!validate.success) {
        const errorDesc = validate.error.issues.map((i) => i.message);
        return {
            errorTitle: "Error validation",
            errorDesc,
            payload: formData,
        };
    }

    redirect("/dashboard/airplanes");
}
