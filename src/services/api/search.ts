import RestClient from '../../shared/rest';

export const searchSnippets = (q: string) => RestClient.get(`/search/?q=${q}`);
