import {
  ICreateRestaurant,
  RestaurantRepository,
} from "@/interfaces/restaurant.repository";
import prisma from "@/prisma/client";
import { Prisma, Restaurant } from "@prisma/client";

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

  async delete(id: number): Promise<void> {
    try {
      await prisma.restaurant.delete({ where: { id } });
    } catch (error) {
      // TODO: Após criar o error handler, implementar aqui como 404, not found
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error(
            `Could not delete restaurant, restaurant with ID ${id} not found.`
          );
        }
      }
      throw error;
    }
  }

  // TODO: Fazer implementação na aplicação
  async update(
    id: number,
    data: Partial<ICreateRestaurant>
  ): Promise<Restaurant | null> {
    return await prisma.restaurant.update({
      where: { id },
      data,
    });
  }
}
