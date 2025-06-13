/* eslint-disable @typescript-eslint/no-require-imports */
import { z } from 'zod';
// I'm sorry for this line
const getAddressSchema = require('lib-address/zod');

export const orderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: getAddressSchema.getAddressSchema(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      'Invalid phone number format',
    ),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  isSubscribingToNewsletter: z.boolean().optional(),
});
const errorKeyMap: Record<string, string> = {
  'address.zip': 'postalCode',
  'address.city': 'city',
  'address.country': 'country',
  'address.addressLine1': 'address',
};

function mapErrorKeys(errors: Record<string, string>) {
  const mapped: Record<string, string> = {};
  for (const key in errors) {
    const mappedKey = errorKeyMap[key] || key;
    mapped[mappedKey] = errors[key];
  }
  return mapped;
}
export function validateCreateOrder(data: unknown): Record<string, string> {
  try {
    const result = orderSchema.safeParse(data);

    if (result.success) {
      return null;
    }
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.');
      errors[key] = issue.message;
    }
    return mapErrorKeys(errors);
  } catch (error) {
    return { error: (error as Error).message };
  }
}
