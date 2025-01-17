import { ICreateRestaurant } from "@/interfaces/restaurant.repository";
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
    const newRestaurant = await this.restaurantRepository.create(data);

    if (!newRestaurant) {
      throw new Error("Could not create a restaurant at service layer");
    }

    return newRestaurant;
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }
}
