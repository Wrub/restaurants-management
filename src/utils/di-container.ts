// utils/diContainer.ts
import { PrismaRestaurantRepository } from "@/repositories/restaurant.repository";
import { RestaurantService } from "@/services/restaurant.service";

export class DIContainer {
  private static instance: DIContainer;

  private _restaurantRepository = new PrismaRestaurantRepository();
  private _restaurantService = new RestaurantService(
    this._restaurantRepository
  );

  static getInstance(): DIContainer {
    if (!this.instance) {
      this.instance = new DIContainer();
    }
    return this.instance;
  }

  get restaurantService() {
    return this._restaurantService;
  }
}
