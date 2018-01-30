"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function list () {
  const app = new ActionsSdkApp({request, response});
  app.askWithList('Alright! Here are a few things you can learn. Which sounds interesting?',
    // Build a list
    app.buildList('Things to learn about')
      // Add the first item to the list
      .addItems(app.buildOptionItem('MATH_AND_PRIME',
        ['math', 'math and prime', 'prime numbers', 'prime'])
        .setTitle('Math & prime numbers')
        .setDescription('42 is an abundant number because the sum of its ' +
        'proper divisors 54 is greater…')
        .setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
      // Add the second item to the list
      .addItems(app.buildOptionItem('EGYPT',
        ['religion', 'egpyt', 'ancient egyptian'])
        .setTitle('Ancient Egyptian religion')
        .setDescription('42 gods who ruled on the fate of the dead in the ' +
        'afterworld. Throughout the under…')
        .setImage('http://example.com/egypt', 'Egypt')
      )
      // Add third item to the list
      .addItems(app.buildOptionItem('RECIPES',
        ['recipes', 'recipe', '42 recipes'])
        .setTitle('42 recipes with 42 ingredients')
        .setDescription('Here\'s a beautifully simple recipe that\'s full ' +
        'of flavor! All you need is some ginger and…')
        .setImage('http://example.com/recipe', 'Recipe')
      )
  );
});

restService.post("/audio", function(req, res, app) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "qolam":
      speech =
          '<speak> Assalamualaikum! Selamat datang di Al-Qolam! <break time="3s"/> <audio src="https://klinikkita.net/001_Al_Faatihah.ogg">tidak bisa mengkoneksikan audio</audio> Kami siap menemani Anda untuk belajar, membaca dan mendengarkan Al-Qur’an. Apa yang ingin Anda baca dan dengarkan? [Murottal Al-Quran] [Murottal dan Terjemahan] [Do’a-do’a] [Ayat-Ayat Tematik] [Tafsir Al-Quran]</speak>';
        app.ask(' [Murottal Al-Quran] ');
      break;
      break;
    case "Murottal Al-Quran":
      speech =
        '<speak>Baik. Surah apa yang ingin Anda baca dan dengarkan?, [Surah Alfatihah] [Surah Yasin] [Surah Al Waqiah] [Surah Al-Mulk] [Surah Ar-Rahman] [Al-Maidah].</speak>';
      break;
    case "yasin":
      speech =
          '<speak> Terima kasih. Selamat mendengarkan surah Yasin dari Qori Mishary Ibnu Rashid Al Afasy. <break time="3s"/> <audio src="https://klinikkita.net/001_Al_Faatihah.ogg">tidak bisa mengkoneksikan audio</audio> Apakah Anda ingin mendengarkan Al-Qur’an dengan qori lain? [Mishari Ibnu Rashid Al Afasy] [Abdurrahman As Sudays] [Sa’ad Al Ghomidi] [ As Suraim] [Tidak mau] </speak>';
     break;
    case "Sudays":
      speech =
       '<speak>Selamat mendengarkan qori pilihan Anda, Untuk pilihan lebih lengkap silakan download Aplikasi Al-Qolam!<img src="http://alqolam.com/wp-content/uploads/2015/04/alqolamlogo.png">not connected image</img><break time="3s"/> <audio src="https://klinikkita.net/001_Al_Faatihah.ogg">tidak bisa mengkoneksikan audio</audio> Apakah Anda mau mendengarkan surah favorit Anda yang lain?[Surah Alfatihah] [Surah Yasin] [Surah Al Waqiah] [Surah Al-Mulk] [Surah Ar-Rahman] [Al-Maidah] [Tidak mau]</speak>';
     break;
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

restService.post("/slack-test", function(req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
