const download = require('image-downloader')
const herolist = require('./assets/data/heros.json')

var allPicArr = []

herolist.forEach(ele => {
    let heroSkins = []

    if ("skin_name" in ele) {
        heroSkins = ele.skin_name.split("|")
    }

    for (ii = 0; ii < heroSkins.length; ii ++) {
        var dumTencent = ii + 1
        allPicArr.push({
            url: 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/' + ele.ename + '/'+ ele.ename + '-bigskin-' + dumTencent + '.jpg',
            dest: './assets/img/heroFull/' + 'heroImg-' + ele.ename + '-bigskin-' + ii + '.jpg',
        })
    }
})

console.log(allPicArr.length)

allPicArr.forEach(ele => {
    download.image(ele)
        .then(({ filename }) => {
            console.log('Saved to', filename)  // saved to /path/to/dest/photo.jpg
        })
        .catch((err) => {
          console.error(err)
          console.log(ele)
        })
})

// options = {
//   url: 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/' + 137 + '/'+ 137 + '-bigskin-' + 2 +'.jpg',
//   dest: './assets/img/heroFull/' + 137 + 'skin' + 2 + '.jpg',      
// }

// download.image(options)
//   .then(({ filename }) => {
//     console.log('Saved to', filename)  // saved to /path/to/dest/photo.jpg
//   })
//   .catch((err) => console.error(err))