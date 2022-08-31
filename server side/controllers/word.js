

const Word = require('../models/TestData.json').wordList

exports.getWords = (req, res) => {

  const result = []; // 1 word from each pos type [1 adjective, 1 adverb, 1 noun, 1 verb].


  const adverb = Word.filter(i=>i.pos=='adverb');
  const adverbItem = adverb[Math.floor(Math.random()*adverb.length)]
  result.push(adverbItem);

  const verb = Word.filter(i=>i.pos=='verb');
  const verbItem = verb[Math.floor(Math.random()*verb.length)]
  result.push(verbItem);

  const noun = Word.filter(i=>i.pos=='noun');
  const nounItem = noun[Math.floor(Math.random()*noun.length)]
  result.push(nounItem);

  const adjective = Word.filter(i=>i.pos=='adjective');
  const adjectiveItem = adjective[Math.floor(Math.random()*adjective.length)]
  result.push(adjectiveItem);

  // 6 words any type 
  const wordFillterd = Word.filter(i=>i.id!=adverbItem.id&&i.id!=verbItem.id&&i.id!=nounItem.id&&i.id!=adjectiveItem.id)
  const shuffled = wordFillterd.sort(() => 0.5 - Math.random()).slice(0, 6);
  // all 10 words 
  const resArr=[...result,...shuffled]

  res.status(200).send({ words: resArr});
};
