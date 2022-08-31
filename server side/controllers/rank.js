

const Rank = require('../models/TestData.json').scoresList

exports.getRank = (req, res) => {
    
    if(!req.body.score){
        res.status(400).send('score is requird');
    }
    if(req.body.score>100||req.body.score<0){
        res.status(400).send('score is must between 0 and 100');
    }
    let count = 0 ;

    Rank.forEach(element => {
        if(element<req.body.score){
            ++count
        }
    });

    const result = parseFloat(((count / Rank.length) * 100).toFixed(2)) ;


  res.status(200).send({ rank: result});
};
