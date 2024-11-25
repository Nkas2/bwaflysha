import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./column-table";
import { getAirplanes } from "./data";

async function AirplanesPage() {
    const data = await getAirplanes();
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Airplanes</div>
                <Button asChild>
                    <Link href={"/dashboard/airplanes/create"}>
                        <Plus className="w-4 h-4" />
                        Create
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    );
}

export default AirplanesPage;
