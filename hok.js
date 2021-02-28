const herolist = require('./herolist.json')
const skills = require('./skills.json')

// getHeroObj(ename): receives ename of a hero and returns the obj of the hero
const getHeroObj = (ename) => {
    const heroObj = herolist.find(hero => hero.ename === ename)
    if (heroObj) {
        return heroObj
    } else {
        console.log("hero does not exists")
    }
}

// getTypes(ename): receives ename of a hero and returns an array of it's type
const getTypes = (ename) => {
    const types = ["战士", "法师", "坦克", "刺客", "射手"]
    const heroObj = getHeroObj(ename) || {}

    let heroTypes = []
    if ("hero_type" in heroObj) {
        heroTypes.push(types[heroObj.hero_type - 1])
    }

    if ("hero_type2" in heroObj) {
        heroTypes.push(types[heroObj.hero_type2 - 1])
    }

    return heroTypes
}

// getHeroSkinPicsById(ename, skinId)： receives ename of a hero and the id of it's skin and returns an array of the skin pics
const getHeroSkinPicsById = (ename, skinId) => (ename <= 0) ? "" : ['http://game.gtimg.cn/images/yxzj/img201606/heroimg/' + ename + '/'+ ename + '-myskin-' + skinId +'.jpg', 'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/' + ename + '/'+ ename + '-bigskin-' + skinId + '.jpg']

// getSkins(ename): receives ename of a hero and returns all it's skins (an collection including skinName and skinImage)
const getSkins = (ename) => {
    const heroObj = getHeroObj(ename) || {}
    let heroSkins = []

    if ("skin_name" in heroObj) {
        heroSkins = heroObj.skin_name.split("|")
    }

    for (ii = 0; ii < heroSkins.length; ii ++) {
        heroSkins[ii] = {
            skinName: heroSkins[ii],
            skinImage: getHeroSkinPicsById(ename, ii)
        }
    }

    return heroSkins
}

// console.log(getSkins(141))

const getEquipById = (equipid) => {
    if (equipid < 1) {
        return '';
    }
    return 'https://game.gtimg.cn/images/yxzj/img201606/itemimg/'+ equipid +'.jpg'
}