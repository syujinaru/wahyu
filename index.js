'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const PLAY_MUROTTAL_ACTION = 'play_murottal';
const PLAY_MUROTTAL_SURAH_ACTION = 'play_murottal_surah';

exports.alqolamWebhook = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function playMurottal (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('Baik. Surah apa yang ingin Anda baca dan dengarkan?')
      .addSuggestions([
        'Surah Alfatihah', 
        'Surah Yasin', 
        'Surah Al Waqiah', 
        'Surah Al-Mulk', 
        'Surah Ar-Rahman', 
        'Al-Maidah'])
    );
  }

  function playMurottalSurah (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('<speak>' +
      'Terima kasih. Selamat mendengarkan surah Yasin dari Qori Mishary Ibnu Rashid Al Afas. ' +
      '<audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
      '</speak>')
      .addSimpleResponse('Apakah Anda ingin mendengarkan Al-Qur’an dengan qori lain?')
      .addSuggestions([
        'Mishari Ibnu Rashid Al Afasy', 
        'Abdurrahman As Sudays',
        'Sa’ad Al Ghomidi',
        'As Suraim',
        'Tidak mau'])
    );
  }

  function playMurottalQori (app) {
    app.ask(app.buildRichResponse()
      .addSimpleResponse('<speak>' +
      'Terima kasih. Selamat mendengarkan surah Yasin dari Qori Mishary Ibnu Rashid Al Afas. ' +
      '<audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
      '</speak>')
      .addSimpleResponse('Apakah Anda ingin mendengarkan Al-Qur’an dengan qori lain?')
      .addSuggestions([
        'Mishari Ibnu Rashid Al Afasy', 
        'Abdurrahman As Sudays',
        'Sa’ad Al Ghomidi',
        'As Suraim',
        'Tidak mau'])
    );
  }

  let actionMap = new Map();
  actionMap.set(PLAY_MUROTTAL_ACTION, playMurottal);
  actionMap.set(PLAY_MUROTTAL_SURAH_ACTION, playMurottalSurah);
  app.handleRequest(actionMap);
});
