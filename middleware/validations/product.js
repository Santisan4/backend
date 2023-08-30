const z = require('zod')

const productSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string'
  }),
  price: z.number({
    required_error: 'Price is required'
  }).nonnegative(),
  image: z.string()
})

function validateProduct (input) {
  return productSchema.safeParse(input)
}

module.exports = { validateProduct }
