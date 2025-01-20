import { z } from "zod";
import { restaurantSchema } from "./restaurant.schema";

export const bookingSlotsSchema = z.object({
  id: z.number().int(),
  time: z.date(),
  isReserved: z.boolean(),
  restaurantId: z.number().int(),
});

// Adiciona referencia tardia ao restaurante
bookingSlotsSchema.extend({
  restaurant: z.lazy(() => restaurantSchema),
});
