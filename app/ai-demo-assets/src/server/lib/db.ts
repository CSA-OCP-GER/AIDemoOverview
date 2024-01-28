import { CosmosClient } from '@azure/cosmos';

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE_ID;
const containerId = process.env.COSMOS_CONTAINER_ID;

const connectionString = `AccountEndpoint=${endpoint};AccountKey=${key};Database=${databaseId}`;

const client = new CosmosClient(connectionString);

export async function getDatabase() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  return database;
}

export async function getContainer() {
  const database = await getDatabase();
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  return container;
}