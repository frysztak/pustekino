export type Movie = {
  id: number;

  multikinoId: number;

  title_pl: string;

  title_eng: string;

  currently_shown: boolean;

  poster_url: string;

  description_pl: string;

  genres: string[];

  runtime: number;

  hero_url_desktop: string;

  hero_url_mobile: string;

  preview_image_urls: string[];
};
