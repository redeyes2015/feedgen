import axios from "axios";
import cheerio from "cheerio";
import { Feed } from "feed";

export default async function genGreenhornFeed (url) {
    const resp = await axios.get(
        url,
        {
            headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:139.0) Gecko/20100101 redeyes2015/feedgen'},
            timeout: 15000,
        }
    )

    if (resp.status != 200) {
        throw new Error(`failed to get the page: ${resp.status}`);
    }

    const $ = cheerio.load(resp.data);

    const books = Array.from($('div.post h3.post-title a'), (rawElement) => {
        const item = $(rawElement);

        return {
            content: '',
            title: item.text(),
            url: item.attr('href'),
        };
    });

    const feed = new Feed({
        author: {'name': 'Feed Generator'},
        title: '綠角財經筆記',
        id: 'https://greenhornfinancefootnote.blogspot.com/',
        link: url,
    });

    for (const { content, title, url } of books) {
        feed.addItem({
            title: title,
            id: url,
            link: url,
            content,
            date: new Date(),
        });
    }

    return feed.atom1();
}
