export type RepoLanguages = Record<string, number>;

export async function fetchRepoLanguages(
  repository: string,
  githubToken: string | undefined
): Promise<RepoLanguages | undefined> {
  try {
    const author = repository.split("/")[3];
    const slug = repository.split("/")[4];

    const headers = {
      Accept: "application/vnd.github.v3+json",
    } as Record<string, string>;

    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${author}/${slug}/languages`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RepoLanguages = await response.json();

    /* Ordenamos los lenguajes por el número de bytes y tomamos los 5 primeros */
    const sortedLanguages = Object.entries(data)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .reduce((acc, [language, bytes]) => {
        acc[language] = bytes as number;
        return acc;
      }, {} as Record<string, number>);

    return sortedLanguages;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
