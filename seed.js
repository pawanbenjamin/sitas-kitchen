const db = require("./src/server/db");
const { Achar, User } = require("./src/server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const achars = [
    {
      name: "Momo ko achar",
      price: 299,
      description: "Oh this one's a yummy one",
      spiceLevel: 3,
      stockQty: 100,
    },
    {
      name: "Kakro ko achar",
      price: 999,
      description: "Oh this is a fresh one",
      spiceLevel: 1,
      stockQty: 100,
      imageUrl:
        "https://3.bp.blogspot.com/-zMegiqCCQl4/VLyaoD-8rrI/AAAAAAAACVs/1jHDNUlSBhg/s1600/ANB_5640.JPG",
    },
  ];

  const users = [
    {
      username: "sitaKhati",
      firstName: "Sita",
      lastName: "Khati",
      email: "sitakbenjamin@gmail.com",
      isAdmin: true,
      password: "sitaskitchen",
    },
    {
      username: "pawan",
      firstName: "Pawan",
      lastName: "Benjamin",
      email: "pawanbenjamin@gmail.com",
      isAdmin: true,
      password: "sitaskitchen",
    },
  ];

  await Promise.all(achars.map((achar) => Achar.create(achar)));
  await Promise.all(users.map((user) => User.create(user)));

  



  console.log(`seeded ${achars.length} achars`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`closing the connection`);
    await db.close();
    console.log(`it closed`);
  }
}

runSeed();
