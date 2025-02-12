import { ICreateRestaurant } from "@/interfaces/restaurant.interface";
import { PrismaRestaurantRepository } from "@/repositories/restaurant.repository";
import { Restaurant } from "@prisma/client";

export class RestaurantService {
  constructor(private restaurantRepository: PrismaRestaurantRepository) {}

  async getAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.findAll();
  }

  async getRestaurantById(id: string) {
    const restaurant = await this.restaurantRepository.findById(Number(id));
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return restaurant;
  }

  async createRestaurant(data: ICreateRestaurant) {
    try {
      // Criação do restaurante com os horários de reserva
      const newRestaurant = await this.restaurantRepository.create({
        data,
      });

      if (!newRestaurant) {
        throw new Error("Could not create a restaurant at service layer");
      }

      return newRestaurant;
    } catch (error: any) {
      throw new Error(`Error creating restaurant: ${error.message}`);
    }
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }

  async updateRestaurant(
    id: number,
    data: Partial<Restaurant>
  ): Promise<Restaurant | null> {
    const updatedRestaurant = await this.restaurantRepository.update(id, data);

    if (!updatedRestaurant) {
      throw new Error(`Could not update the restaurant with id: ${id}`);
    }

    return updatedRestaurant;
  }
}
