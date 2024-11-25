import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const password = bcrypt.hashSync("admin123", 10);
    const user = await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            name: "admin",
            role: "ADMIN",
            password: password,
        },
    });

    console.log(user);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
