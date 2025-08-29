import { writeFile } from 'node:fs/promises';
import genBookWalkerFeed from './genBookWalkerFeed.mjs';
import genGreenhornFeed from './genGreenhornFeed.mjs';

const bookWalkerJob = async () => {
    // const url = 'https://www.bookwalker.com.tw/more/fiction/1/3',
    // const url = 'https://www.bookwalker.com.tw/category/3/28?order=sell_desc';
    const url = 'https://www.bookwalker.com.tw/search?order=sell_desc&m=3&s=28';
    const feedData = await genBookWalkerFeed(url);
    return writeFile('public/bookwalker_atom.xml', feedData);
};

const greenhornJob = async () => {
    const now = new Date().toISOString();

    const url = `https://greenhornfinancefootnote.blogspot.com/search?updated-max=${now}&max-results=20`;
    const feedData = await genGreenhornFeed(url);
    return writeFile('public/greenhorn_atom.xml', feedData);
};

await Promise.all([
    bookWalkerJob(),
    // greenhornJob(),
]);



