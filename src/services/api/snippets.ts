import RestClient from '../../shared/rest';

export const getSnippets = () => RestClient.get('/snippets/');

