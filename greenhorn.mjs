import { writeFile } from 'node:fs/promises';
import genGreenhornFeed from './genGreenhornFeed.mjs';

const greenhornJob = async () => {
    const now = new Date().toISOString();

    const url = `https://greenhornfinancefootnote.blogspot.com/search?updated-max=${now}&max-results=20`;
    const feedData = await genGreenhornFeed(url);
    return writeFile('public/greenhorn_atom.xml', feedData);
};

await greenhornJob();
