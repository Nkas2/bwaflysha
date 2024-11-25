"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FormCreateAirplanes() {
    return (
        <form action="" className="w-[40%] space-y-4 ps-1">
            <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                    placeholder="Airplane Code"
                    name="code"
                    id="code"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    placeholder="Airplane Name"
                    name="name"
                    id="name"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                    type="file"
                    placeholder="Upload Image"
                    name="image"
                    id="image"
                    required
                />
            </div>
            <Button className="w-full">Submit</Button>
        </form>
    );
}

export default FormCreateAirplanes;
