
angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window){
    return {
      set: function(key, value) {
          $window.localStorage[key] = value;
      },
      get: function(key){
          return $window.localStorage[key] || '3000';
      }
    }
}]);

angular.module('ArduinoLed', ['ionic', 'ionic.utils'])

.run(function($ionicPlatform, $localstorage) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $localstorage.set('ip', '192.168.0.100');
  $localstorage.set('port','3000');

  var port = $localstorage.get('port');
  var ip = $localstorage.get('ip');
  var iosocket = io.connect('http://'+ip+':'+port);

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
});

