const { faker } = require('@faker-js/faker');

const { executeQuery } = require('./pg_connection');
const { hashPassword } = require('./password-tools');

/* EXECUTION PARAMS */
const NUM_USERS = 10;
const NUM_PETS = 20;

/* SEED USERS */
function generateNewUser() {
  const user = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const { salt, hash } = hashPassword(user.password);
  return {
    ...user,
    password_hash: hash,
    password_salt: salt,
  };
}
async function seedUsers(numUsers=10) {
  const users = faker.helpers.multiple(generateNewUser, { count: numUsers });
  const query = `
    INSERT INTO users (
      id, email, password_hash, password_salt
    ) VALUES ${users.map(user => `(
      '${user.id}', '${user.email}', '${user.password_hash}', '${user.password_salt}'
    )`).join(', ') + ';'};
  `;
  try {
    await executeQuery(query);
    console.log(`${users.length} users inserted into DB successfully!`);
    return users;
  } catch (error) {
    console.error('error inserting users: ', error);
    throw new Error(`Error inserting users: ${error}`);
  }
}

/* SEED PETS */
const PET_TYPES = ['dog', 'cat', 'fish', 'bird', 'snake'];

function generateNewPet(users) {
  let petType;
  const rand = Math.random();
  if (rand < 0.5) {
    petType = PET_TYPES[0];
  }
  else if (rand > 0.5 && rand <= 0.9) {
    petType = PET_TYPES[1];
  }
  else if (rand > 0.9 && rand <= 0.94) {
    petType = PET_TYPES[2];
  }
  else if (rand > 0.94 && rand <= 0.98) {
    petType = PET_TYPES[3];
  }
  else if (rand > 0.98) {
    petType = PET_TYPES[4];
  }
  
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    type: petType,
    birth_date: faker.date.past(),
    owner_id: faker.helpers.arrayElement(users).id,
    description: `a very cute ${petType}!`,
  };
}

async function seedPets(users, numPets=20) {
  const pets = faker.helpers.multiple(
    () => generateNewPet(users),
    { count: numPets }
  );
  const query = `
    INSERT INTO pets (
      id, pet_name, pet_type, pet_description, birth_date, owner_id
    ) VALUES ${pets.map(pet => `(
      '${
        pet.id
      }', '${
        pet.name
      }', '${
        pet.type
      }', '${
        pet.description
      }', '${
        pet.birth_date
      }', '${
        pet.owner_id
      }'
    )`).join(', ') + ';'};
  `;
  try {
    await executeQuery(query);
    console.log(`${pets.length} pets inserted into DB successfully!`);
    return pets;
  } catch (error) {
    console.error('error inserting pets: ', error);
    throw new Error(`Error inserting pets: ${error}`);
  }
}

/* execute code */
async function runSeed(numUsers, numPets) {
  const users = await seedUsers(numUsers);
  await seedPets(users, numPets);
}

runSeed(NUM_USERS, NUM_PETS).then(() => {
  console.log('DB seeded successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('error seeding DB: ', error);
  process.exit(1);
});
