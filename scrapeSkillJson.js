var herolist = require("./assets/data/heros.json");
var skillList = require("./assets/data/skills.json");

var https = require("https");
var iconv = require("iconv-lite");
const cheerio = require("cherio");
var url = require("url");

var fs = require("fs");

var data = {};
data.table = [];

// var skillList = [];
herolist.forEach(function (ele) {
  var ename = ele.ename;
  var skillObj = {
    ename: ename,
    skills: [],
  };

  var html = "";
  var getURL = url.parse(
    "https://pvp.qq.com/web201605/herodetail/" + ename + ".shtml"
  );

  var req = https
    .get(getURL, function (res) {
      res.setEncoding("binary");
      res
        .on("data", function (data) {
          html += data;
        })
        .on("end", function () {
          var buf = Buffer.from(html, "binary");
          var txt = iconv.decode(buf, "GBK");
          var $ = cheerio.load(txt, { decodeEntities: false });

          var skills = [];
          $(".skill-name")
            .find("b")
            .each(function (jj, elem) {
              var skillName = $(this).text();
              var skill = {
                skillName: skillName,
                skillDetail: [],
                skillDescription: "",
              };
              skills.push(skill);
            });
          $(".skill-name").each(function (jj) {
            $(this)
              .find("span")
              .each(function (kk, elem) {
                skills[jj].skillDetail.push($(this).text());
              });
          });
          $(".skill-desc").each(function (jj, elem) {
            skills[jj].skillDescription = $(this).text();
          });
          if (skills[4].skillName === "") {
            skills.splice(skills.length - 1, 1);
          }
          skillObj.skills = skills;
          data.table.push(skillObj);
          //   skillList.push(skillObj)
          html = "";
          //   console.log(skillObj)
        });
    })
    .on("error", function (err) {
      console.log("http get error:", err);
    });
    console.log(req)
});

setTimeout(function () {
  console.log(data.table.length);
  //   var dataJson = JSON.stringify(data.table);
  //   console.log(dataJson)
  fs.writeFile("./skill.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("complete");
  });
}, 15000);