
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

export const Cardsidebar=()=>{

    return(
        <Sheet>
            <SheetTrigger>
                <Button variant={"link"}>
                    <p>Category</p>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Category</SheetTitle>
                </SheetHeader>
                ...
            </SheetContent>
        </Sheet>
    )
}