'use strict';
var OFFERNUMBERS = 8;
var avatarNumber = Math.floor(Math.random() * OFFERNUMBERS + 1);
var authorObj = {
  'avatar': 'img/avatars/user{{x' + avatarNumber + '}}.png'
};

var titleValues = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var titleRand = Math.floor(Math.random() * (titleValues.length));
var adressValues = '{{location.x}}, {{location.y}}';
var MAXPRICE = 1000000;
var MINPRICE = 1000;
var priceValues = Math.floor(Math.random() * (MAXPRICE - MINPRICE + 1) + MINPRICE);
var typeValues = ['flat', 'house', 'bungalo'];
var typeRand = Math.floor(Math.random() * (typeValues.length));
var MAXROOMS = 5;
var MINROOMS = 1;
var roomsValues = Math.floor(Math.random() * (MAXROOMS - MINROOMS + 1) + MINROOMS);
var MAXGUESTS = 3;
var guestsValues = Math.floor(Math.random() * MAXGUESTS + 1);
var checkinValues = ['12:00', '13:00', '14:00'];
var checkinRand = Math.floor(Math.random() * (checkinValues.length));
var checkoutValues = ['12:00', '13:00', '14:00'];
var checkoutRand = Math.floor(Math.random() * (checkoutValues.length));
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var featuresRange = featuresArr.length;
var featuresCount = Math.floor(Math.random() * (featuresArr.length));
var featuresValues = [];
if (featuresCount === 0) {
  featuresValues = 'No ext. features';
} else {
  for (var i = 0; i < featuresCount; ++i) {
    var featuresRand = Math.floor(Math.random() * (featuresRange - i));
    featuresValues += featuresArr[featuresRand] + ', ';
    featuresArr.splice(featuresRand, 1);
  }
}
var descriptionValues = '';
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var photosCount = photosArr.length - 1;
var photosValues = [];
for (i = 0; i <= photosCount; i++) {
  var photosTemp = Math.floor(Math.random() * (photosArr.length));
  photosValues += photosArr[photosTemp] + ' ';
  photosArr.splice(photosTemp, 1);
}

var offerObj = {
  'title': titleValues[titleRand],
  'adress': adressValues,
  'type': typeValues[typeRand],
  'price': priceValues,
  'rooms': roomsValues,
  'guests': guestsValues,
  'checkin': checkinValues[checkinRand],
  'checkout': checkoutValues[checkoutRand],
  'features': featuresValues,
  'description': descriptionValues,
  'photos': photosValues
};

var MINY = 150;
var MAXY = 500;
var MINX = 300;
var MAXX = 900;
var yCoord = Math.floor(Math.random() * (MAXY - MINY + 1) + MINY);
var xCoord = Math.floor(Math.random() * (MAXX - MINX + 1) + MINX);
var offerLocation = {
  'x': xCoord,
  'y': yCoord
};

var royaltyOffer = {
  'author': authorObj,
  'offer': offerObj,
  'location': offerLocation
};
var royaltyOffers = [];
for (i = 0; i <= OFFERNUMBERS; i++) {
  royaltyOffers.push(royaltyOffer);
}
