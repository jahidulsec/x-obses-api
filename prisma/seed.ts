import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    id: "user-uuid-1",
    mobile: "1234567890",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Female",
    address: "123 Main St, City, Country",
    birth: "1995-07-21T00:00:00Z",
    heightFt: 5,
    heightIn: 7,
    weight: 65,
    createdAt: "2024-03-13T13:00:00Z",
    updatedAt: "2024-03-13T13:00:00Z",
  },
  {
    id: "user-uuid-2",
    mobile: "9876543210",
    fullName: "Bob Williams",
    email: "bob@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Male",
    address: "456 Another St, City, Country",
    birth: "1990-11-15T00:00:00Z",
    heightFt: 6,
    heightIn: 0,
    weight: 75,
    createdAt: "2024-03-13T13:15:00Z",
    updatedAt: "2024-03-13T13:15:00Z",
  },
  {
    id: "user-uuid-3",
    mobile: "1112223333",
    fullName: "Charlie Brown",
    email: "charlie@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Male",
    address: "789 Maple St, City, Country",
    birth: "1985-05-10T00:00:00Z",
    heightFt: 5,
    heightIn: 9,
    weight: 80,
    createdAt: "2024-03-13T13:30:00Z",
    updatedAt: "2024-03-13T13:30:00Z",
  },
  {
    id: "user-uuid-4",
    mobile: "4445556666",
    fullName: "Daisy Clark",
    email: "daisy@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Female",
    address: "567 Oak St, City, Country",
    birth: "1998-12-02T00:00:00Z",
    heightFt: 5,
    heightIn: 5,
    weight: 60,
    createdAt: "2024-03-13T13:45:00Z",
    updatedAt: "2024-03-13T13:45:00Z",
  },
  {
    id: "user-uuid-5",
    mobile: "7778889999",
    fullName: "Ethan Adams",
    email: "ethan@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Male",
    address: "890 Pine St, City, Country",
    birth: "1992-08-22T00:00:00Z",
    heightFt: 6,
    heightIn: 2,
    weight: 85,
    createdAt: "2024-03-13T14:00:00Z",
    updatedAt: "2024-03-13T14:00:00Z",
  },
  {
    id: "user-uuid-6",
    mobile: "9998887777",
    fullName: "Fiona Green",
    email: "fiona@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Female",
    address: "345 Cedar St, City, Country",
    birth: "1994-03-14T00:00:00Z",
    heightFt: 5,
    heightIn: 8,
    weight: 68,
    createdAt: "2024-03-13T14:15:00Z",
    updatedAt: "2024-03-13T14:15:00Z",
  },
  {
    id: "user-uuid-7",
    mobile: "6667778888",
    fullName: "George Harrison",
    email: "george@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Male",
    address: "234 Birch St, City, Country",
    birth: "1987-09-18T00:00:00Z",
    heightFt: 6,
    heightIn: 1,
    weight: 78,
    createdAt: "2024-03-13T14:30:00Z",
    updatedAt: "2024-03-13T14:30:00Z",
  },
  {
    id: "user-uuid-8",
    mobile: "5554443333",
    fullName: "Hannah Lee",
    email: "hannah@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Female",
    address: "456 Walnut St, City, Country",
    birth: "2000-07-25T00:00:00Z",
    heightFt: 5,
    heightIn: 6,
    weight: 58,
    createdAt: "2024-03-13T14:45:00Z",
    updatedAt: "2024-03-13T14:45:00Z",
  },
  {
    id: "user-uuid-9",
    mobile: "2223334444",
    fullName: "Isaac Newton",
    email: "isaac@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Male",
    address: "678 Willow St, City, Country",
    birth: "1996-04-05T00:00:00Z",
    heightFt: 5,
    heightIn: 11,
    weight: 70,
    createdAt: "2024-03-13T15:00:00Z",
    updatedAt: "2024-03-13T15:00:00Z",
  },
  {
    id: "user-uuid-10",
    mobile: "1110009999",
    fullName: "Jessica Parker",
    email: "jessica@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "Female",
    address: "789 Redwood St, City, Country",
    birth: "1989-01-30T00:00:00Z",
    heightFt: 5,
    heightIn: 4,
    weight: 55,
    createdAt: "2024-03-13T15:15:00Z",
    updatedAt: "2024-03-13T15:15:00Z",
  },
];


async function main() {
  console.log(`Start seeding ...`);

  for (const a of users) {
    const driver = await prisma.users.create({
      data: a,
    });
    console.log(`Created driver with id: ${driver.id}`);
  }

  console.log(`Seeding finished.`);
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
