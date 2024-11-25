import React from "react";
import FormCreateAirplanes from "./FormCreateAirplanes";

function CreateAirplanes() {
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Add Airplanes</div>
            </div>
            <FormCreateAirplanes />
        </>
    );
}

export default CreateAirplanes;
