
import { getContainer } from './db';
import type { AIDemoAsset } from '../models/aidemoasset';


// get AIDemoAssets from cosmos db
export async function getAIDemoAssets() {
    const container = await getContainer();

    const querySpec = {
        query: "SELECT * FROM c WHERE c.type = 'aidemoasset'"
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
    `
  };

  const { resources: industries } = await container.items
    .query<string>(querySpec)
    .fetchAll();

  // Since the above query will return duplicates if the same industry is listed in multiple documents,
  // we use a JavaScript Set to get distinct values.
  const distinctIndustries = [...new Set(industries)];

  return distinctIndustries;
}
