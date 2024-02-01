import { getContainer } from "./db";
import type { AIDemoAsset } from "../models/aidemoAsset";

// get AIDemoAssets from cosmos db
export async function getAIDemoAssets() {
  const container = await getContainer();

  const querySpec = {
    query: "SELECT * FROM c WHERE c.type = 'aidemoasset'",
  };

  const { resources: assets } = await container.items
    .query<AIDemoAsset>(querySpec) // Use the AIDemoAsset type for the query result
    .fetchAll();

  return assets;
}

export async function getDistinctIndustries() {
  const container = await getContainer();

  // Query to select the industries array and use the ARRAY_CONCAT function to merge them
  const querySpec = {
    query: `
      SELECT VALUE i
      FROM c
      JOIN i IN c.industries
      WHERE c.type = 'aidemoasset'
    `,
  };

  const { resources: industries } = await container.items
    .query<string>(querySpec)
    .fetchAll();

  // Since the above query will return duplicates if the same industry is listed in multiple documents,
  // we use a JavaScript Set to get distinct values.
  const distinctIndustries = [...new Set(industries)];

  return distinctIndustries;
}

// get distinct technologies from cosmos db
export async function getDistinctTechnologies() {
  const container = await getContainer();

  // Query to select the technologies array and use the ARRAY_CONCAT function to merge them
  const querySpec = {
    query: `
      SELECT VALUE t
      FROM c
      JOIN t IN c.technologies
      WHERE c.type = 'aidemoasset'
    `,
  };

  const { resources: technologies } = await container.items
    .query<string>(querySpec)
    .fetchAll();

  // Since the above query will return duplicates if the same technology is listed in multiple documents,
  // we use a JavaScript Set to get distinct values.
  const distinctTechnologies = [...new Set(technologies)];

  return distinctTechnologies;
}

// get distinct kpis from cosmos db
export async function getDistinctKPIs() {
  const container = await getContainer();

  // Query to select the kpis array and use the ARRAY_CONCAT function to merge them
  const querySpec = {
    query: `
      SELECT VALUE k
      FROM c
      JOIN k IN c.kpis
      WHERE c.type = 'aidemoasset'
    `,
  };

  const { resources: kpis } = await container.items
    .query<string>(querySpec)
    .fetchAll();

  // Since the above query will return duplicates if the same kpi is listed in multiple documents,
  // we use a JavaScript Set to get distinct values.
  const distinctKPIs = [...new Set(kpis)];

  return distinctKPIs;
}

// get distinct audiences from cosmos db
export async function getDistinctAudiences() {
  const container = await getContainer();

  // Query to select the audiences array and use the ARRAY_CONCAT function to merge them
  const querySpec = {
    query: `
      SELECT VALUE a
      FROM c
      JOIN a IN c.audience
      WHERE c.type = 'aidemoasset'
    `,
  };

  const { resources: audiences } = await container.items
    .query<string>(querySpec)
    .fetchAll();

  // Since the above query will return duplicates if the same audience is listed in multiple documents,
  // we use a JavaScript Set to get distinct values.
  const distinctAudiences = [...new Set(audiences)];

  return distinctAudiences;
}

// create a new AIDemoAsset in cosmos db
export async function createAIDemoAsset(asset: AIDemoAsset) {
  const container = await getContainer();

  const { resource: createdAsset } = await container.items.create<AIDemoAsset>(
    asset,
  );

  return createdAsset;
}

// update an existing AIDemoAsset in cosmos db
export async function updateAIDemoAsset(id: string, asset: AIDemoAsset) {
  const container = await getContainer();

  const { resource: updatedAsset } = await container.items.upsert<AIDemoAsset>({
    ...asset,
    id,
  });

  return updatedAsset;
}

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  roles?: string[];
};

export async function findOrCreateUser(userProfile: UserProfile) : Promise<UserProfile>  {
  const { id, email, name } = userProfile;
  const container = await getContainer("users");

  const { resources: users } = await container.items
    .query<UserProfile>({
      query: "SELECT * FROM c WHERE c.email = @email",
      parameters: [{ name: "@email", value: email }],
    })
    .fetchAll();

  if (users.length > 0) {
    // User exists
    return users[0]!;
  } else {
    // Create new user
    const { resource: createdUser } = await container.items.create({
      id,
      email,
      name,
    });
    return createdUser!;
  }
}
