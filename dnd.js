function character(userID, dName, dClass, dRace) {

    const fs = require('fs');
    let data = {
      characterName: dName,
      characterClass: dClass,
      characterRace: dRace,
      characterTraits:[],
      characterStats:{
        Strength: Math.floor(Math.random()*15)+1,
        Dexterity: Math.floor(Math.random()*15)+1,
        Intelligence: Math.floor(Math.random()*15)+1,
        Wisdom: Math.floor(Math.random()*15)+1,
        Charisma: Math.floor(Math.random()*15)+1
      }
    }

    fs.writeFileSync(`./characters/${userID}.json`, JSON.stringify(data, null, 2));
};


module.exports=character;

