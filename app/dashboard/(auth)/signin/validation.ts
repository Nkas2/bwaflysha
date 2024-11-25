import { z } from "zod";

export const validation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
