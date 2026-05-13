import { z } from 'zod';

const RawShowSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string().optional().nullable(),
  genres: z.array(z.string()).optional().nullable(),
  rating: z
    .object({
      average: z.number().nullable(),
    })
    .optional()
    .nullable(),
});

type RawShow = z.infer<typeof RawShowSchema>;

export interface RestShowRecord {
  id: string;
  name: string;
  language: string | null | undefined;
  genreName: string | null | undefined;
  ratingAverage: number | null | undefined;
  genres: string[];
}

const toRecord = (show: RawShow): RestShowRecord => ({
  id: String(show.id),
  name: show.name,
  language: show.language,
  genreName: show.genres?.[0],
  ratingAverage: show.rating?.average,
  genres: show.genres ?? [],
});

const parseOne = (body: unknown): RestShowRecord => toRecord(RawShowSchema.parse(body));

export interface TvMazeApiContract {
  getShowById(id: string): Promise<RestShowRecord | null>;
}

export class UpstreamServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpstreamServiceError';
  }
}

export class TvMazeApi implements TvMazeApiContract {
  constructor(private readonly baseUrl: string) {}

  async getShowById(id: string): Promise<RestShowRecord | null> {
    const url = `${this.baseUrl.replace(/\/$/, '')}/shows/${encodeURIComponent(id)}`;
    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new UpstreamServiceError(`TVmaze request failed with status ${response.status}`);
    }

    try {
      const body: unknown = await response.json();
      return parseOne(body);
    } catch {
      throw new UpstreamServiceError('TVmaze returned an unexpected payload.');
    }
  }
}
