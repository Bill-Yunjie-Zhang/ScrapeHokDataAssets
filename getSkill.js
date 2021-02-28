const download = require('image-downloader')
const skillList = require('./assets/data/skills.json')

var allPicArr = []

skillList.forEach(ele => {
    let heroSkill = []
    for (ii = 0; ii < ele.skills.length; ii ++) {
        allPicArr.push({
            url: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + ele.ename + '/'+ ele.ename + ii + '0.png',
            dest: './assets/img/heroSkill/' + 'heroImg-' + ele.ename + '-skill-' + ii + '.jpg',
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