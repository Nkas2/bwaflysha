"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns = [
    {
        accessorKey: "image",
        header: "Image",
    },
    {
        accessorKey: "code",
        header: "Code",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: ({ row }: { row: any }) => {
            const plane = row.original;

            return (
                <div className="inline-flex gap-5 items-center">
                    <Button variant={"secondary"} size={"sm"} asChild>
                        <Link href={`/dashboard/airplanes/edit/${plane.id}`}>
                            <Pencil className="mr-4 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];
