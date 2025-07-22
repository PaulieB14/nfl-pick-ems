// Simple ENS resolution using public API
const ensCache = new Map<string, string>();

export async function resolveENS(address: string): Promise<string> {
  // If it's already cached, return the cached value
  if (ensCache.has(address)) {
    return ensCache.get(address)!;
  }

  try {
    // Use public ENS API to resolve the address
    const response = await fetch(`https://api.ensideas.com/ens/resolve/${address}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.name) {
        ensCache.set(address, data.name);
        return data.name;
      }
    }
  } catch (error) {
    console.warn(`Failed to resolve ENS for ${address}:`, error);
  }

  // Fallback to shortened address
  const shortened = `${address.slice(0, 6)}...${address.slice(-4)}`;
  ensCache.set(address, shortened);
  return shortened;
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Batch resolve multiple addresses
export async function resolveMultipleENS(addresses: string[]): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 3;
  for (let i = 0; i < addresses.length; i += batchSize) {
    const batch = addresses.slice(i, i + batchSize);
    const promises = batch.map(async (address) => {
      const resolved = await resolveENS(address);
      return { address, resolved };
    });
    
    const batchResults = await Promise.all(promises);
    batchResults.forEach(({ address, resolved }) => {
      results.set(address, resolved);
    });
    
    // Small delay between batches
    if (i + batchSize < addresses.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  return results;
}
