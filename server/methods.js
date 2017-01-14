import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import cheerio from 'cheerio';

Meteor.methods({
    // State data
    returnPlaceholder () {
      return  {
        author:"Дженнифер Уорф",
        title:"Вызовите акушерку. Подлинная история Ист-Энда 1950-х годов",
        description:"\n Книга «Вызовите акушерку» — это воспоминания Дженнифер Уорф о ее жизни и работе в Лондоне 1950-х годов.",
        link:"/book/1001917796-vyzovite-akusherku-podlinnaya-istoriya-istenda-1950h-godov-dzhennifer-uorf",
        img:"https://i.livelib.ru/boocover/1001917796/140/3aee/Dzhennifer_Uorf_%E2%80%94_Vyzovite_akusherku._Podlinnaya_istoriya_IstEnda_1950h_godov.jpg",
        rating:"4.608",
        publisher: 'Kolibri',
        year: '2016',
        isbn: '978-00-00',
        }
    },
    //TODO: Split this method to couple
    findByISBN (isbn) {
        check(isbn, String);

        // URL for searing
        const url = `https://www.livelib.ru/find/${isbn}`;

        // GET request
        const result = HTTP.get(url,{});
        // Parse result by css selector
        $ = cheerio.load(result.content);
        // Find block with book in result. The block has class 'biglist'
        const bookWasFound = $('.biglist').text();

        if (bookWasFound.length < 1) {
            return {
                error: 'Book was not found'
            }
        }

        // Parse string details_info to array by spaces
        const details_info = $('.book-details-info').text().split(/\s+/);
        // Find indexes for information about Publisher, Year of publication and ISBN
        const pub_index = details_info.indexOf('Издательство:') + 1;
        const year_index = details_info.indexOf('г.') - 1;
        const isbn_index = details_info.indexOf('ISBN:') + 1;

        // Create & return object with parsed information
        return {
            author: $('.block-book-author').text(),
            title: $('.block-book-title').text(),
            description: $('.book-description').text(),
            link: $('.event-book-title').attr('href'),
            img: $('.boocover > img').attr('src'),
            rating: $('.rating-book > span > span').text(),
            publisher: details_info[pub_index],
            year: details_info[year_index],
            isbn: details_info[isbn_index],
        };
    },
    // Parse ready HTML content to Object
    parseToObject (htmlMarkup) {
        check(htmlMarkup, String);
    }
});