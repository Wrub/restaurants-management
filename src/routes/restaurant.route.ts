import { RestaurantController } from "@/controllers/restaurant.controller";
import { DIContainer } from "@/utils/diContainer";
import { Router } from "express";

const router = Router();
const diContainer = DIContainer.getInstance();
const restaurantController = new RestaurantController(
  diContainer.restaurantService
);

router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.post("/", restaurantController.createRestaurant);

export default router;
