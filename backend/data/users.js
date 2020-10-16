import bcrypt from 'bcryptjs'

const users = [{
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234567890', 15),
    isAdmin: true
}, {
    name: 'Jane Doe',
    email: 'jane_doe@example.com',
    password: bcrypt.hashSync('abcdefg', 15)
}, {
    name: 'John Doe',
    email: 'john_doe@example.com',
    password: bcrypt.hashSync('zxcvbnm', 15)
}]

export default users