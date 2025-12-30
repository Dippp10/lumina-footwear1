
export interface GithubFile {
  path: string;
  content: string;
}

/**
 * Encodes a string to Base64, supporting UTF-8 characters properly.
 */
function toBase64(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}

export async function syncToGithub(token: string, repoName: string, files: GithubFile[]) {
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Get user details to get the username
    const userResponse = await fetch('https://api.github.com/user', { headers });
    if (!userResponse.ok) throw new Error('Invalid GitHub Token');
    const userData = await userResponse.json();
    const username = userData.login;

    // 2. Create the repository
    const createRepoResponse = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: repoName,
        private: false,
        description: 'LUMINA Shoe Brand Website - Generated with AI',
        auto_init: true
      }),
    });

    if (!createRepoResponse.ok && createRepoResponse.status !== 422) { // 422 if repo already exists
      throw new Error('Failed to create repository');
    }

    // 3. Upload files
    for (const file of files) {
      // Get file SHA if it exists (for updates)
      const fileUrl = `https://api.github.com/repos/${username}/${repoName}/contents/${file.path}`;
      const existingFileResponse = await fetch(fileUrl, { headers });
      let sha;
      if (existingFileResponse.ok) {
        const existingData = await existingFileResponse.json();
        sha = existingData.sha;
      }

      const uploadResponse = await fetch(fileUrl, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `Sync ${file.path} from LUMINA App`,
          content: toBase64(file.content),
          sha: sha
        }),
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        console.error(`Failed to upload ${file.path}`, errorData);
      }
    }

    return `https://github.com/${username}/${repoName}`;
  } catch (error: any) {
    throw new Error(error.message || 'Github Sync Failed');
  }
}
