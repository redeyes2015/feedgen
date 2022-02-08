import genBookWalkerFeed from './genBookWalkerFeed.mjs';

// const url = 'https://www.bookwalker.com.tw/more/fiction/1/3',
// const url = 'https://www.bookwalker.com.tw/category/3/28?order=sell_desc';
const url = 'https://www.bookwalker.com.tw/search?order=sell_desc&m=3&s=28';

console.log(await genBookWalkerFeed(url));
