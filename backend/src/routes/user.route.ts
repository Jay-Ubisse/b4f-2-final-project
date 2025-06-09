import { Router } from "express";
import { patchOrders } from "@controllers/orders.controller";

//Orders routes

Router.patch("/:id", patchOrders);

export default Router;
