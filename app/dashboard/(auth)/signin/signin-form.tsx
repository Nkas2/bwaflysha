"use client";

import { Input } from "@/components/ui/input";
import React, { useActionState } from "react";
import { signIn, SigninResult } from "./signin-action";
import { Button } from "@/components/ui/button";

const initialState: SigninResult = {
    errorTitle: null,
    errorDesc: [],
};

function SignInForm() {
    const [state, actionSignIn] = useActionState(signIn, initialState);

    return (
        <div className="w-full h-screen">
            <div className="flex flex-1 flex-col min-h-screen justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-full">
                    <h2 className="text-center mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action={actionSignIn} className="space-y-6">
                        <Input
                            type="email"
                            placeholder="example@gmail.com"
                            name="email"
                            required
                            defaultValue={
                                (state.payload?.get("email") || "") as string
                            }
                        />
                        <Input
                            type="password"
                            placeholder="********"
                            name="password"
                            required
                            defaultValue={
                                (state.payload?.get("password") || "") as string
                            }
                        />

                        <Button variant="default" className="w-full">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
