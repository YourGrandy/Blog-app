import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {name: "Bob", email: "bob@gmail.com", password: "123456789"},
            {name: "Hellen", email: "hellen@gmail.com", password: "987654321"},
        ],
    })

    await prisma.post.create({
        data: {
            title: "UFO",
            content: "Alliens are planning to land on our planet really soon!",
            author: {connect: {email: "hellen@gmail.com"}}
        }
    })
}

main()
.then(() => console.log("DB seeded"))
.catch((error) => console.error(error))
.finally(async () => {await prisma.$disconnect()})