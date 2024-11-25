import { Button } from "@/components/ui/button";
import { LogOut } from "./logout-action";

function ButtonLogout() {
    return (
        <form action={LogOut}>
            <Button className="w-full justify-start" variant={"destructive"}>
                Logout
            </Button>
        </form>
    );
}

export default ButtonLogout;
