import {
  ICreateRestaurant,
  RestaurantRepository,
} from "@/interfaces/restaurant.repository";
import prisma from "@/prisma/client";
import { Restaurant } from "@prisma/client";

export class PrismaRestaurantRepository implements RestaurantRepository {
  async findAll(): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany();
  }

  async findById(id: number): Promise<Restaurant | null> {
    return await prisma.restaurant.findUnique({ where: { id } });
  }

  async create(data: ICreateRestaurant) {
    const newRestaurant = await prisma.restaurant.create({
      data,
    });

    return newRestaurant;
  }
}
