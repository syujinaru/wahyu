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

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/audio", function(req, res) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "qolam":
      speech =
          '<speak> Assalamualaikum! Selamat datang di Al-Qolam! <break time="3s"/> <audio src="https://klinikkita.net/001_Al_Faatihah.ogg">tidak bisa mengkoneksikan audio</audio> Kami siap menemani Anda untuk belajar, membaca dan mendengarkan Al-Qur’an.</speak>';
     break;
    case "qolam2":
      speech =
        '<speak>Apa yang ingin Anda baca dan dengarkan?. <p> [Surah Al-Fatiha] </p><p> [Surah Ya Sin] </speak>';
      break;
    case "Murottal Al-Quran":
      speech =
        '<speak>Baik. Surah apa yang ingin Anda baca dan dengarkan?, [Surah Alfatihah] [Surah Yasin] [Surah Al Waqiah] [Surah Al-Mulk] [Surah Ar-Rahman] [Al-Maidah].</speak>';
      break;
    case "Surah Yasin":
      speech =
          '<speak> Terima kasih. Selamat mendengarkan surah Yasin dari Qori Mishary Ibnu Rashid Al Afasy. <break time="3s"/> <audio src="https://klinikkita.net/001_Al_Faatihah.ogg">tidak bisa mengkoneksikan audio</audio> Apakah Anda ingin mendengarkan Al-Qur’an dengan qori lain? </speak>';
     break;
    case "Abdurrahman As Sudays":
      speech =
       '<speak> Baik, Selamat mendengarkan qori pilihan Anda, Untuk pilihan lebih lengkap silakan download Aplikasi Al-Qolam! <break time="3s"/> <audio src="https://klinikkita.net/001_Al_Faatihah.ogg">tidak bisa mengkoneksikan audio</audio> Apakah Anda mau mendengarkan surah favorit Anda yang lain?[Surah Alfatihah] [Surah Yasin] [Surah Al Waqiah] [Surah Al-Mulk] [Surah Ar-Rahman] [Al-Maidah] [Tidak mau].
</speak>';
      break;
    case "Tidak mau":
      speech =
        '<speak>Baiklah. Terima kasih. Sampai ketemu lagi</speak>';
      break;
    //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "Ya":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
    // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
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
