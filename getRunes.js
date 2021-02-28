//game.gtimg.cn/images/yxzj/img201606/mingwen/1514.png

const download = require('image-downloader')
const runes = require('./assets/data/runes.json')

var allPicArr = []

runes.forEach(ele => {
    allPicArr.push({
        url: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/' + ele.ming_id + '.png',
        dest: './assets/img/rune/runeImg-' + ele.ming_id + '.png',
    })
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