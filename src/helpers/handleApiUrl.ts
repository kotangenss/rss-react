import { Result } from '../interfaces/searchInput';

export default function handleApiUrl(apiUrl: string): Promise<Result> {
  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  });
}
