import z from "zod";

export const addListingSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  location: z.string().min(2),
  images: z.array(z.string()).optional(),
  category: z.enum(["house", "product", "service"]),
  metadata: z.object({
    bedrooms: z.coerce.number().optional(),
    bathrooms: z.coerce.number().optional(),
    type: z.string().optional(),

    productType: z.string().optional(),
    condition: z.string().optional(),

    serviceType: z.string().optional(),
    availability: z.string().optional(),
  }),
});

export type AddListing = z.infer<typeof addListingSchema>


