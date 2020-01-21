const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('post.csv');

writeStream.write(`img,title,link,date,price \n`);

request('https://auto.ria.com/car/volkswagen/', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        // console.log(html);
        const $ = cheerio.load(html);

        // const text = $('.blue');
        // console.log(text);
        // console.log(text.html());
        // console.log(text.text());

        // const text = $('.address');
        // // console.log(text);
        // // console.log(text.html());
        // // console.log(text.text());
        // console.log(text.find('span').text());
        // console.log(text.children('span').text());

        // const text = $('.content');
        // console.log(text);
        // console.log(text.html());
        // console.log(text.text());
        // console.log(text.children('div').text());
        // console.log(text.children('div').next().text());
        // console.log(text.children('div').parent().text());

        // $('.content .address').each((i, el) => {
        //     const item = $(el).text();
        //
        //     console.log(item);
        // });

        $('.content-bar').each((i, el) => {
            const img = $(el)
                .find('img')
                .attr('src');
            const title = $(el)
                .find('.content .address')
                .text();
            const link = $(el)
                .find('a.address')
                .attr('href');
            const date = $(el)
                .find('.icon-time-grey')
                .next()
                .text();
            const price = $(el)
                .find('.bold.green.size22')
                .text();

                // .replace(/,/, ''); // .replace(/\s\s+/g, '');

            console.log(img, title, link, date, price);

            writeStream.write(`${img}, ${title}, ${link}, ${date}, ${price} \n`);
        });

        console.log('Scraping Done...');
    }
});