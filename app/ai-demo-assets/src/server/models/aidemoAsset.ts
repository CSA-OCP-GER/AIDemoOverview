export type AIDemoAsset = {
    id: string;
    name: string;
    description: string;
    image: string | null; // Assuming that 'Image' could be a link or null if not provided
    technologies: string[]; // Array of technologies
    industries: string[]; // Array of industries
    reference: string | null; // Assuming that 'Reference' could be a link or null if not provided
    kpis: string[]; // Array of KPIs
    audience: string[]; // Array of audiences
    material: string | null; // Assuming that 'Material' could be a description or null if not provided
    link: string; // URL to the resource
    type: string;
    isPublished: boolean;
  };
  