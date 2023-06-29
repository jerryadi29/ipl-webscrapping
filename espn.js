const request = require("request");
const cheerio=require('cheerio');

// let url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary'


// function cb(error,response,data){
//     if(error){
//         console.log('error');
//     }
//     else{
//         console.log('response :',response && response.statusCode);
//         let sel=cheerio.load(data);
//         let arr=sel('div .ci-html-content.ds-py-2.ds-px-3');
//         for (let i=0;i<arr.length;++i){
//             console.log('line :' ,`${i}` ,sel(arr[i]).text());
//         }
//     }

// }

// request(url,cb);

///higesht wicket taker



let url2='https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/match-impact-player';


function cb2(err,res,html){
    if(err){
        console.log('error');
    }
    else{
        resolve(res,html);
    }
}
//.ds-w-full.ds-table.ds-table-xs.ds-table-auto
function resolve(res,data){

    console.log('response ',res && res.statusCode );
    let $=cheerio.load(data);
    let arr=$('.ds-p-0 ');
    let ele;

    const maxRuns=new Array();


    ele =$(arr[1]).html();
     let tableFound= $(ele).hasClass('ds-mb-4');
     if(tableFound){
        let table=ele;
        let tableRow= $(ele).find('.ds-w-full.ds-table.ds-table-md.ds-table-auto > tbody >tr');


        for(let i=0;i<tableRow.length;++i){
            let td=$(tableRow[i]).find('.ds-w-0.ds-whitespace-nowrap.ds-min-w-max');
            let player=$(tableRow[i]).find('.ds-min-w-max.ds-text-left').text()
            let runs=$(td[2]).text().split('(')[0];
            
            if(runs!=='-'){
                maxRuns.push({player,runs});
                console.log($(player).text())
            }
        
        }

     }

    
   
   
}

request(url2,cb2);


