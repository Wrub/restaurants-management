import { Restaurant } from "@prisma/client";

export interface RestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(id: number): Promise<Restaurant | null>;
  create(data: ICreateRestaurant): Promise<Restaurant>;
}

export interface ICreateRestaurant {
  name: string;
  address: string;
  capacity: number;
  reservations: number;
  speciality?: string | null;
}
