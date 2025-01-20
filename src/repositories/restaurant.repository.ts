import {
  ICreateRestaurant,
  RestaurantRepository,
} from "@/interfaces/restaurant.interface";
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
    const bookingSlots = this.generateHourlyBookingSlots("09:00", "18:00").map(
      (slot) => ({
        time: slot.time,
        isReserved: slot.isReserved,
      })
    );

    const newRestaurant = await prisma.restaurant.create({
      data: {
        ...data,
        bookingSlots: {
          create: bookingSlots,
        },
      },
      include: {
        bookingSlots: true,
      },
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

  private generateHourlyBookingSlots(
    startTime: string,
    endTime: string
  ): { time: Date; isReserved: boolean }[] {
    const slots: { time: Date; isReserved: boolean }[] = [];

    const start = new Date();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    const [endHour, endMinute] = endTime.split(":").map(Number);
    end.setHours(endHour, endMinute, 0, 0);

    while (start < end) {
      slots.push({
        time: new Date(start),
        isReserved: false,
      });

      start.setHours(start.getHours() + 1);
    }

    return slots;
  }
}
