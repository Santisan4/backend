const z = require('zod')

const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  email: z.string().email({ message: 'Email is not valid' }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(8, { message: 'Password must be at least 8 characters long' })
})

function validateUser (input) {
  return userSchema.safeParse(input)
}

module.exports = { validateUser }
