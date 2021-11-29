import { genBookWalkerFeed } from './genBookWalkerFeed.mjs';

// const url = 'https://www.bookwalker.com.tw/more/fiction/1/3',
const url = 'https://www.bookwalker.com.tw/category/3/28?order=sell_desc';

console.log(genBookWalkerFeed(url));
