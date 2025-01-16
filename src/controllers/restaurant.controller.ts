import { createRestaurantSchema } from "@/schemas/restaurant.schema";
import { RestaurantService } from "@/services/restaurant.service";
import { Request, Response } from "express";
import { ZodError } from "zod";

// TODO: Criar e inserir um global error handler

export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  getAllRestaurants = async (req: Request, res: Response) => {
    const restaurants = await this.restaurantService.getAll();
    res.json(restaurants);
  };

  getRestaurantById = async (req: Request, res: Response) => {
    try {
      const restaurant = await this.restaurantService.getRestaurantById(
        req.params.id
      );
      res.json(restaurant);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  createRestaurant = async (req: Request, res: Response) => {
    try {
      const parsedData = createRestaurantSchema.parse(req.body);

      const newRestaurant = await this.restaurantService.createRestaurant(
        parsedData
      );

      res.status(201).json(newRestaurant);
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  };
}
