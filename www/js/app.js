// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  var iosocket = io.connect('http://192.168.0.100:3000');

      $('#led').on('change', function(){
        if ($(this).is(":checked")) {
           console.log('ON');
           $('#statusArea').removeClass('statusAreaOff').addClass('statusAreaOn');
           $('#lampStatus').removeClass('ledColorOff').addClass('ledColorOn');
           iosocket.emit('button', {lampstatus: "1"});    
        } else {
           console.log('OFF');
           $('#statusArea').removeClass('statusAreaOn').addClass('statusAreaOff');
           $('#lampStatus').removeClass('ledColorOn').addClass('ledColorOff');
           iosocket.emit('button', {lampstatus: "0"});
        }
    })


})
