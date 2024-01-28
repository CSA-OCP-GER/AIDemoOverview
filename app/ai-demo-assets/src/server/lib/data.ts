
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