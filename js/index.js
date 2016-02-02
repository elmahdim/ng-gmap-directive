 /*
  * Google Map Directive Angularjs
  * -----------
  * @restrict  'E' = element, 'A' = attribute
  * @usage     <google-map class="gmap" id="gmap" zipcode="{{obj.zipcode}}"></google-map>
  * @version   1.0
  * @author    @_elmahdim
  * @authorUrl http://elmahdim.com/
  * @mapStyle  Vallgatan https://snazzymaps.com/style/32070/vallgatan
  * @credit    Vallgatan @joel
  */

 (function(angular) {
   'use strict';
   angular.module('gMapp', [])
     .controller('Controller', ['$scope', function($scope) {
       $scope.defaultZip = 11216; // Brooklyn Zip Code
       $scope.setZip = function() {
         $scope.defaultZip = $scope.inputZip;
       };
     }])
     .directive('googleMap', googleMap);

   function googleMap() {
     var directive = {
       restrict: 'EA',
       replace: true,
       template: '<div />',
       scope: {
         zipcode: '@',
         hasSkin: '@'
       },
       link: gmapFunc
     };
     return directive;

     function gmapFunc(scope, element, attrs) {
       var geocoder,
         map;

       function initialize() {
         geocoder = new google.maps.Geocoder();
         var latlng = new google.maps.LatLng(-34.397, 150.644),
           mapOptions = {
             zoom: 10,
             zoomControl: false,
             scrollwheel: false,
             scaleControl: true,
             mapTypeControl: false,
             disableDefaultUI: true,
             center: latlng,
             mapTypeId: google.maps.MapTypeId.ROADMAP
           },
           mapStyles = [{
             "featureType": "administrative",
             "elementType": "labels.text.fill",
             "stylers": [{
               "color": "#444444"
             }]
           }, {
             "featureType": "landscape",
             "elementType": "all",
             "stylers": [{
               "color": "#f2f2f2"
             }]
           }, {
             "featureType": "poi",
             "elementType": "all",
             "stylers": [{
               "visibility": "off"
             }]
           }, {
             "featureType": "road",
             "elementType": "all",
             "stylers": [{
               "saturation": -100
             }, {
               "lightness": 45
             }]
           }, {
             "featureType": "road.highway",
             "elementType": "all",
             "stylers": [{
               "visibility": "simplified"
             }]
           }, {
             "featureType": "road.arterial",
             "elementType": "labels.icon",
             "stylers": [{
               "visibility": "off"
             }]
           }, {
             "featureType": "transit",
             "elementType": "all",
             "stylers": [{
               "visibility": "off"
             }]
           }, {
             "featureType": "water",
             "elementType": "all",
             "stylers": [{
               "color": "#00cb9b"
             }, {
               "visibility": "on"
             }]
           }];
         map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

         if (typeof attrs.hasSkin === 'undefined' || attrs.hasSkin === null) {
           return false;
         }
         map.setOptions({
           styles: mapStyles
         });
       }

       function codeAddress(address) {
         initialize();
         geocoder.geocode({
           'address': address
         }, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
             map.setCenter(results[0].geometry.location);
             var marker = new google.maps.Marker({
               map: map,
               position: results[0].geometry.location
             });
           } else {
             console.log('Geocode was not successful for the following reason: ' + status);
           }
         });
       }
       attrs.$observe('zipcode', function(value) {
         if (value) {
           codeAddress(value);
         }
       });
     }
   }
 })(window.angular);