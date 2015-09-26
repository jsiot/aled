
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

var aled = angular.module('ArduinoLed', ['ionic', 'ionic.utils']);

aled.run(function($ionicPlatform, $localstorage) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  var port = $localstorage.get('port');
  if(!port) {
    $localstorage.set('ip', '192.168.0.100');
  }
  
  var ip = $localstorage.get('ip');
  if(!ip) {
    $localstorage.set('port','3000');
  }

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
  });
})

aled.controller('SettingController', function($scope, $window, $ionicPopup, $timeout, $localstorage){
  $scope.showPopup = function() {
    $scope.data = {};
    $scope.data.ip = $localstorage.get('ip');
    $scope.data.port = $localstorage.get('port');

    var myPopup = $ionicPopup.show({
     template: '<div class="setform"><span>IP Address</span><input type="ip" ng-model="data.ip"><span>Port</span><input type="port" ng-model="data.port"></div>',
     title: 'Settings',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.ip) {
             e.preventDefault();
           } else {
             $localstorage.set('ip', $scope.data.ip);
             if($scope.data.port){
                $localstorage.set('port', $scope.data.port); 
             }
             $window.location.reload(true);
             return $scope.data.ip;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
  };
})