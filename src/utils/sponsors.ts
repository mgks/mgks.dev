// This runs at BUILD TIME only.
export async function getSponsors() {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("⚠️ No GITHUB_TOKEN found. Sponsors will not be fetched.");
    return [];
  }

  const query = `
    query {
      viewer {
        sponsorshipsAsMaintainer(first: 100) {
          nodes {
            sponsorEntity {
              ... on User {
                login
                avatarUrl
                url
                name
              }
              ... on Organization {
                login
                avatarUrl
                url
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error("GitHub API Error:", json.errors);
      return [];
    }

    return json.data.viewer.sponsorshipsAsMaintainer.nodes.map((node: any) => node.sponsorEntity);
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return [];
  }
}