//game.gtimg.cn/images/yxzj/img201606/itemimg/'+ ele.item_id +'.jpg

const download = require('image-downloader')
const item = require('./assets/data/items.json')

var allPicArr = []

item.forEach(ele => {
    allPicArr.push({
        url: 'http://game.gtimg.cn/images/yxzj/img201606/itemimg/'+ ele.item_id +'.jpg',
        dest: './assets/img/item/itemImg-' + ele.item_id + '.jpg',
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