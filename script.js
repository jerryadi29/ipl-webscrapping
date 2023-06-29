// let fs=require('fs');
// const { buffer } = require('stream/consumers');

// fs.readFile('sample3.txt',cb);

// function cb(err,data){

//     if(err){
//         console.log('eroor');
//         return;
//     }
//     // console.log(data);
//     let parseData=Buffer.from(data);
//     console.log(parseData.toString());

// }
const cheerio =require('cheerio');

const request = require('request');
request('https://www.imdb.com/',cb);

function cb(error,response,body){
    console.error(error);
    console.log('statuscode :' ,response && response.statusCode);
    let sel=cheerio.load(body);
    let arr=sel('ipc-poster-card__title ipc-poster-card__title--clamp-2 ');
    console.log(arr);
}

