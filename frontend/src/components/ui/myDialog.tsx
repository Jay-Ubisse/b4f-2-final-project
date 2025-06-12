import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Card } from "../../components/ui/card";
import { Button } from "./button";

<Dialog >
        <div className="h-full max-h-full text-2xl">
          <DialogTrigger>Cart</DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cart</DialogTitle>
              <DialogDescription>
                <Card className="w-50  ">
                  foto
                </Card>
                Descricao da peca de roupa
                <Button variant="link">Remove</Button>
                <Button>Check out</Button>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </div>
      </Dialog>
