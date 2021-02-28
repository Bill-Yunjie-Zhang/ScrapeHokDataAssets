const download = require('image-downloader')
const herolist = require('./assets/data/heros.json')

var allPicArr = []

herolist.forEach(ele => {
    allPicArr.push({
        url: 'http://game.gtimg.cn/images/yxzj/img201606/heroimg/' + ele.ename + '/'+ ele.ename + '.jpg',
        dest: './assets/img/heroThumbnail/' + 'heroImg-' + ele.ename + '-thumbnail.jpg',
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