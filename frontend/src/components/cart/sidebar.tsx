
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

export const Cardsidebar=()=>{

    return(
        <Sheet >
            <SheetTrigger className="">
                <Button variant={"link"}>
                    <p>Categories</p>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Dresses</SheetTitle>
                      <SheetTitle>Blousses</SheetTitle>
                        <SheetTitle>Jackets</SheetTitle>
                </SheetHeader>
                
            </SheetContent>
        </Sheet>
    )
}