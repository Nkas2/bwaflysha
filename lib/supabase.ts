import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}.png`;

    const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`public/airplanes/${fileName}`, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        console.log(error);

        return error;
    }
};
