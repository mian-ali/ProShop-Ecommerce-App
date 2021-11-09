
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'ALi Ahmad',
    email: 'ali@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'joshua lazar',
    email: 'josh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users