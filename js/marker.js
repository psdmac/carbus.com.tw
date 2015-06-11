
var myApp = angular.module('myApp', []);

myApp.directive('mapMarker', ['$timeout', '$http', function($timeout, $http){
  return {
    link: function($scope, iElm, iAttrs, controller) {
      console.log('init...');
      var currentMarker,
          currentPoint;
      $timeout(function() {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
            currentPoint = position;
            currentMarker = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              map: map
            });
          })
          var saveMarker = function() {
            $timeout(function() {
              currentMarker.setMap(map);
            console.log(currentPoint.coords.latitude,currentPoint.coords.longitude,Math.ceil(new Date().getTime()/1000))
              // var data = {
              //   datapoints:[
              //     {
              //       dataChnId: "tracker_wowcar",
              //       timestamp: Math.ceil(new Date().getTime()/1000),
              //       values: {
              //         latitude: currentPoint.coords.latitude,
              //         longitude: currentPoint.coords.longitude,
              //         altitude: 0
              //       }
              //     }
              //   ]
              // };
              // $http.defaults.headers.common['deviceKey'] = '0M0NLM6I0BpRmmPD'  
              // $http.post("https://api.mediatek.com/mcs/v2/devices/DbfLAJgk/datapoints",data)
              // .success(function(data){
              //   console.log(data);
              // })
              // .error(function(data){
              //   console.log(data);  
              // });

              var data = {
                datapoints:
                  [
                    {
                      dataChnId: "tracker_wowcar_id", 
                      timestamp: new Date().getTime(),
                      values: {
                        latitude: currentPoint.coords.latitude, 
                        longitude: currentPoint.coords.longitude, 
                        altitude: 0
                      }
                    }
                  ]
              };
              $http.defaults.headers.common['deviceKey'] = '0M0NLM6I0BpRmmPD'  
              $http.post("https://api.mediatek.com/mcs/v2/devices/DbfLAJgk/datapoints",data)
                .success(function(data){
                  console.log(data);
                })
                .error(function(data){
                  console.log(data);
                });
              saveMarker();
            }, 5000);
          }
          saveMarker();
        }
      }, 0);
    }
  };
}]);
  var map;
  var style;
  var directionsDisplay;
  var directionsService;
  var elevator;
  var geocoder;
  var townArray = [
    '鶯歌區',
    '萬里區',
    '八里區',
    '泰山區',
    '淡水區',
    '瑞芳區',
    '石碇區',
    '石門區',
    '平溪區',
    '貢寮區',
    '坪林區',
    '金山區',
    '三芝區',
    '樹林區',
    '深坑區',
    '三峽區',
    '烏來區',
    '林口區',
    '雙溪區',
    '暖暖區',
    '瑞芳區',
    '新店區',
    '七堵區',
    '安樂區',
    '中山區',
    '信義區',
    '仁愛區',
    '暖暖區',
    '中正區'
  ]
  var coreArray = [
    '中山區',
    '大同區',
    '信義區',
    '大安區',
    '中正區',
    '萬華區',
    '松山區'
  ]
  var shellArray = [
    '內湖區',
    '南港區',
    '士林區',
    '三重區',
    '板橋區',
    '永和區',
    '中和區',
    '蘆洲區',
    '文山區'
  ]
  var tripleArray = [
    '汐止區',
    '北投區',
    '新莊區',
    '五股區',
    '土城區'
  ]

  function initialize() {
    var height = $(window).height();
    $('#calc').height(height);
    directionsService = new google.maps.DirectionsService();
    elevator = new google.maps.ElevationService();

    var styles = 
    [
      {"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]},
      {"featureType":"landscape.man_made","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.4}]},
      {"featureType":"landscape.natural","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.3}]},
      {"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.1}]},
      {"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.1}]},
      {"featureType":"water","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.2}]},      
      {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
          {
            saturation: 0
          },
          {
            hue: '#3E0864'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text',
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "poi.government",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];



    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      center: new google.maps.LatLng(25.0493098, 121.54648),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.data.loadGeoJson('/geo');



    map.data.setStyle(function(feature) {
      var town = feature.getProperty('town');
      var county = feature.getProperty('county');

      // var color = ascii > 91 ? 'red' : 'blue';
      var color;
      if ( $.inArray(town, townArray) >= 0 && county != '臺北市') {
        color = '#37005D';
      } else if ($.inArray(town, coreArray) >= 0 && county == '臺北市') {
        color = '#D35C5E';
      } else if ($.inArray(town, shellArray) >= 0) {
        color = '#CDC21E';
      } else if ($.inArray(town, tripleArray) >= 0) {
        color = '#21ABCD';
      }
      return {
        fillColor: color,
        strokeColor: '#37005D',
        strokeWeight: 0
      };
    });


    map.setOptions({styles: styles});
    // bermudaTriangle.setMap(map);
    directionsDisplay.setMap(map);

  }