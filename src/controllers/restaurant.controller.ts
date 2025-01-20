import {
  createRestaurantSchema,
  restaurantSchema,
} from "@/schemas/restaurant.schema";
import { RestaurantService } from "@/services/restaurant.service";
import { Request, Response } from "express";
import { z, ZodError } from "zod";

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
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

  deleteRestaurant = async (req: Request, res: Response) => {
    try {
      const deleteRestaurantSchema = z.coerce.number();
      const parsedId = deleteRestaurantSchema.parse(req.params.id);

      await this.restaurantService.deleteRestaurant(parsedId);

      res.sendStatus(200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: `Internal Server Error, ${error}` });
      }
    }
  };

  updateRestaurant = async (req: Request, res: Response) => {
    try {
      const updateRestaurantSchema = z.object({
        id: z.coerce.number(),
        data: restaurantSchema.partial(),
      });

      const { id, data } = updateRestaurantSchema.parse({
        id: req.params.id,
        data: req.body.data,
      });

      const updatedRestaurant = await this.restaurantService.updateRestaurant(
        id,
        data
      );

      res.status(200).json(updatedRestaurant);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: `Internal Server Error, ${error}` });
      }
    }
  };
}
