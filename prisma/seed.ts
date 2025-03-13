import { PrismaClient, Prisma, $Enums } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    id: "user-uuid-1",
    mobile: "1234567890",
    fullName: "Alice Johnson",
    email: "alice@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "female",
    address: "123 Main St, City, Country",
    birth: "1995-07-21T00:00:00Z",
    heightFt: 5,
    heightIn: 7,
    weight: 65,
  },
  {
    id: "user-uuid-2",
    mobile: "9876543210",
    fullName: "Bob Williams",
    email: "bob@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "male",
    address: "456 Another St, City, Country",
    birth: "1990-11-15T00:00:00Z",
    heightFt: 6,
    heightIn: 0,
    weight: 75,
  },
  {
    id: "user-uuid-3",
    mobile: "1112223333",
    fullName: "Charlie Brown",
    email: "charlie@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "male",
    address: "789 Maple St, City, Country",
    birth: "1985-05-10T00:00:00Z",
    heightFt: 5,
    heightIn: 9,
    weight: 80,
  },
  {
    id: "user-uuid-4",
    mobile: "4445556666",
    fullName: "Daisy Clark",
    email: "daisy@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "female",
    address: "567 Oak St, City, Country",
    birth: "1998-12-02T00:00:00Z",
    heightFt: 5,
    heightIn: 5,
    weight: 60,
  },
  {
    id: "user-uuid-5",
    mobile: "7778889999",
    fullName: "Ethan Adams",
    email: "ethan@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "male",
    address: "890 Pine St, City, Country",
    birth: "1992-08-22T00:00:00Z",
    heightFt: 6,
    heightIn: 2,
    weight: 85,
  },
  {
    id: "user-uuid-6",
    mobile: "9998887777",
    fullName: "Fiona Green",
    email: "fiona@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "female",
    address: "345 Cedar St, City, Country",
    birth: "1994-03-14T00:00:00Z",
    heightFt: 5,
    heightIn: 8,
    weight: 68,
  },
  {
    id: "user-uuid-7",
    mobile: "6667778888",
    fullName: "George Harrison",
    email: "george@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "male",
    address: "234 Birch St, City, Country",
    birth: "1987-09-18T00:00:00Z",
    heightFt: 6,
    heightIn: 1,
    weight: 78,
  },
  {
    id: "user-uuid-8",
    mobile: "5554443333",
    fullName: "Hannah Lee",
    email: "hannah@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "female",
    address: "456 Walnut St, City, Country",
    birth: "2000-07-25T00:00:00Z",
    heightFt: 5,
    heightIn: 6,
    weight: 58,
  },
  {
    id: "user-uuid-9",
    mobile: "2223334444",
    fullName: "Isaac Newton",
    email: "isaac@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "male",
    address: "678 Willow St, City, Country",
    birth: "1996-04-05T00:00:00Z",
    heightFt: 5,
    heightIn: 11,
    weight: 70,
  },
  {
    id: "user-uuid-10",
    mobile: "1110009999",
    fullName: "Jessica Parker",
    email: "jessica@example.com",
    image:
      "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png",
    gender: "female",
    address: "789 Redwood St, City, Country",
    birth: "1989-01-30T00:00:00Z",
    heightFt: 5,
    heightIn: 4,
    weight: 55,
  },
];

const marathons = [
  {
    id: "m-uuid-1",
    title: "February 5k Challenge Run",
    description:
      "A program designed to push your limits, build endurance, and celebrate your strength!",
    about:
      "A program designed to push your limits, build endurance, and celebrate your strength! Whether this program offers personalized training plans, progress tracking, and a vibrant community to keep you motivated every step of the way.",
    imagePath: "e9c961ab-d837-4d27-8d92-ceb1dfdfd083-1741854397870.png",
    type: "virtual" as $Enums.MarathonType,
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-02-01T00:00:00Z",
    distanceKm: 5,
  },
  {
    id: "m-uuid-2",
    title: "February 10 km Challenge Run",
    description:
      "A program designed to push your limits, build endurance, and celebrate your strength!",
    about:
      "A program designed to push your limits, build endurance, and celebrate your strength! Whether this program offers personalized training plans, progress tracking, and a vibrant community to keep you motivated every step of the way.",
    imagePath: "e9c961ab-d837-4d27-8d92-ceb1dfdfd083-1741854397870.png",
    type: "onsite" as $Enums.MarathonType,
    location: "Uttara, Dhaka",
    distanceKm: 10,
    startDate: "2025-03-05T00:00:00Z",
    endDate: "2025-03-05T00:00:00Z",
  },
];

const marathonUser = [
  {
    id: "mu-uuid-1",
    userId: "user-uuid-1",
    marathonId: "m-uuid-1",
    distanceKm: 5,
    durationMs: 900000,
  },
  {
    id: "mu-uuid-2",
    userId: "user-uuid-2",
    marathonId: "m-uuid-1",
    distanceKm: 5,
    durationMs: 950000,
  },
  {
    id: "mu-uuid-3",
    userId: "user-uuid-3",
    marathonId: "m-uuid-1",
    distanceKm: 4.5,
    durationMs: 800000,
  },
  {
    id: "mu-uuid-4",
    userId: "user-uuid-4",
    marathonId: "m-uuid-1",
    distanceKm: 3.5,
    durationMs: 700000,
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const a of users) {
    const user = await prisma.users.create({
      data: a,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const a of marathons) {
    const marathon = await prisma.marathon.create({
      data: a,
    });
    console.log(`Created marathon with id: ${marathon.id}`);
  }

  for (const a of marathonUser) {
    const marathon = await prisma.marathonUser.create({
      data: a,
    });
    console.log(`Created marathon user with id: ${marathon.id}`);
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
