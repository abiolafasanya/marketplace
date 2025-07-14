import { z } from "zod";

export const updateStoreSchema = z.object({
  name: z.string().min(2, "Store name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  banner: z.string().url("Banner must be a valid URL"),
  logo: z.string().url("Logo must be a valid URL"),
  address: z.string()
});

export type UpdateStoreSchema = z.infer<typeof updateStoreSchema>;
