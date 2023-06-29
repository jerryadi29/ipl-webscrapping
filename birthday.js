const request=require('request');
const cheerio=require('cheerio');

const url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard';

function cb(error,response,html){
    if(error){
        console.log('error');
    }else{
        console.log('response code :',response && response.statusCode);
        // console.log(html)
        resolve(html);
    }
}

function resolve(data){
    const $=cheerio.load(data);
    let teamsArr=$('.ds-w-full  .ci-team-score.ds-flex.ds-justify-between.ds-items-center.ds-text-typo.ds-mb-2');
  
    let wTeamName;

    for(let i=0;i<teamsArr.length;++i){
        let hasTeam=$(teamsArr[i]).hasClass('ds-opacity-50');
        // console.log(hasTeam);
        if(!hasTeam){
           wTeamName=$(teamsArr[i]).find('.ds-inline-flex.ds-items-start.ds-leading-none').text();
        }

    }
    // console.log(wTeamName);


    //teams detail fetching
    let teamsDetail=$('div.ds-rounded-lg.ds-mt-2');

    for(let i=0;i<teamsDetail.length;++i){
        let checkWinnerName=$(teamsDetail[i]).find('.ds-text-title-xs.ds-font-bold.ds-capitalize');
        let wTable;
        let wTableBattesMan;
        let battesManNAme;
        let fullLink;
       
        if(checkWinnerName.text().toLowerCase()==wTeamName.toLowerCase()){

            wTable=$(teamsDetail[i]).find('.ds-p-0');
            let wtbody=$(wTable).find('.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table')
            wTableBattesMan=$(wtbody).find('tbody');
            let tr=$(wTableBattesMan).find('tr');
                
                for(let j=0;j<4;++j){
                    battesManNAme=$(tr[j]).find('a').text() ? $(tr[j]).find('a').text()  : null;
                    let  battesManNAmeDetail=$(tr[j]).find('a') ? $(tr[j]).find('a') : null;
                    let href=battesManNAmeDetail.attr('href');
                    if(battesManNAme!==null){
                       
                         fullLink = "https://www.espncricinfo.com" + href;
                         getBirthday(fullLink);
                    }
                   
                }
               
                     
        }

      

       
    }


   
}

function getBirthday(fullLink){
    request(fullLink,cb);

    function cb(err,res,html){
        if(err){
            console.log('error in players link');
        }
        else{
            console.log('done')
            getBirthdayDetail(html);
        }
    }
    
}

function getBirthdayDetail(link){
    let $=cheerio.load(link);
    let div=$('.ds-p-4');

            let res=$(div).find('div span.ds-text-title-s.ds-font-bold.ds-text-typo');
            let dates=$(res[1]).text().split(',');
      
            console.log(`${$(res[0]).text()} is born at ${dates[0]},${dates[1]}`)
    
    
}




request(url,cb);

