import axios from "axios";
import cheerio from "cheerio";
import { Feed } from "feed";

export default async function genBookWalkerFeed (url) {
    const resp = await axios.get(
        url,
        {
            headers: {'User-agent': 'feedgen'},
            timeout: 5000,
        }
    )

    if (resp.status != 200) {
        throw new Error(`failed to get the page: ${resp.status}`);
    }

    const $ = cheerio.load(resp.data);

    const books = Array.from($('.bookitem a'), (rawElement) => {
        const item = $(rawElement);
        const img = item.find('img');
        img.attr('src', img.attr('data-src'));

        return {
            content: cheerio.html(item),
            title: item.attr('title'),
            url: item.attr('href'),
        };
    });

    const feed = new Feed({
        author: {'name': 'Feed Generator'},
        title: 'BOOKWALKER 輕小說',
        id: url,
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
