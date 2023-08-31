const z = require('zod')

const productSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string'
  }).optional(),
  description: z.string({
    invalid_type_error: 'Description must be a string'
  }).optional(),
  price: z.number().nonnegative().optional(),
  category: z.number().optional(),
  stock: z.number().nonnegative().optional()
})

function validateUpdate (input) {
  return productSchema.safeParse(input)
}

module.exports = { validateUpdate }
