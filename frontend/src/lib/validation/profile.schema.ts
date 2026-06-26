import { z } from "zod";

export const ProfileSchema = z.object({
  user_name: z.string().min(2),
  phone_number: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .refine((val) => !/^0+$/.test(val), "Phone number cannot consist of all zeroes"),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional()
});

export type ProfileInput = z.infer<typeof ProfileSchema>;
