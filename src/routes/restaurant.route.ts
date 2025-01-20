import { RestaurantController } from "@/controllers/restaurant.controller";
import { DIContainer } from "@/utils/di-container";
import { Router } from "express";

const router = Router();
const diContainer = DIContainer.getInstance();
const restaurantController = new RestaurantController(
  diContainer.restaurantService
);

router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.post("/", restaurantController.createRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);
router.put("/:id", restaurantController.updateRestaurant);

export default router;
