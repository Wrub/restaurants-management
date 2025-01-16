import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  reservations: z.coerce.number().min(0, "Reservations cannot be negative"),
  speciality: z.string().optional(),
});
