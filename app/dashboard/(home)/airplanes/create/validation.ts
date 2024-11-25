import { z } from "zod";

const accept_image_type = ["image/jpeg", "image/jpg", "image/png"];

const max_size = 2000000;

export const validation = z.object({
    code: z
        .string({ required_error: "Code is required" })
        .regex(/^[A-Z]{3}-[0-9]{3}$/, "Format Code must XXX-111"),
    name: z
        .string({ required_error: "Name is required" })
        .min(4, "Name must more than 4 character"),
    image: z
        .any()
        .refine(
            (file: File) => accept_image_type.includes(file.type),
            "invalid image format"
        )
        .refine((file: File) => file.size <= max_size, "max size image is 2MB"),
});
