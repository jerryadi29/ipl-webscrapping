const request=require('request');
const cheerio=require('cheerio');

const url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard';

function cb(error,response,html){
    if(error){
        console.log('error');
    }else{
        console.log('response code :',response && response.statusCode);
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
           wTeamName=$(teamsArr[i]).find('.ds-inline-flex.ds-items-start.ds-leading-none').text()
        }

    }
    // console.log(wTeamName);


    //teams detail fetching
    let teamsDetail=$('div.ds-rounded-lg.ds-mt-2');

    for(let i=0;i<teamsDetail.length;++i){
        let checkWinnerName=$(teamsDetail[i]).find('.ds-text-title-xs.ds-font-bold.ds-capitalize');
        let wTable;
        let wTableBowlers;
        let bowlerName;
        let hwtBowlerName='';
        let hwt=0;

        if(checkWinnerName.text().toLowerCase()==wTeamName.toLowerCase()){

            wTable=$(teamsDetail[i]).find('.ds-p-0');
            let wtbody=$(wTable).find('.ds-w-full.ds-table.ds-table-md.ds-table-auto tbody')
            wTableBowlers=$(wtbody[1]);
            let tr=$(wTableBowlers).find('tr');


            

            for(let j=0;j<tr.length;++j){
                   
                let td=$(tr[j]).find('td');
                bowlerName=$(td[0]);

                if($(tr[j]).find('.ds-text-tight-s.ds-font-regular').text().length >20){
                    continue;
                };
                let wt=$(td[4]);

                if(hwt<=wt.text()){
                    hwtBowlerName=bowlerName.text();
                    hwt=wt.text(); 
                }   

                     

            }

              console.log(`highest wicket taker is ${hwtBowlerName} and wicket : ${hwt}`);
                 
            
        }

      

       
    }


   
}




request(url,cb);

