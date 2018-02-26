'use strict';
var OFFERNUMBERS = 8;
var MAXROOMS = 5;
var MINROOMS = 1;
var MAXPRICE = 1000000;
var MINPRICE = 1000;
var MAXGUESTS = 3;
var MINY = 150;
var MAXY = 500;
var MINX = 300;
var MAXX = 900;

var avatarNumbersArr = [];
for (var avatarIndex = 1; avatarIndex <= OFFERNUMBERS; avatarIndex++) {
  avatarNumbersArr.push(avatarIndex);
}

var royaltyOffers = [];
for (var i = 0; i < OFFERNUMBERS; i++) {
  var titleValues = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var typeValues = ['flat', 'house', 'bungalo'];
  var checkinValues = ['12:00', '13:00', '14:00'];
  var checkoutValues = ['12:00', '13:00', '14:00'];
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var descriptionValues = '';
  var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var avatarNumber;
  var avatarRand = Math.floor(Math.random() * avatarNumbersArr.length);
  avatarNumber = avatarNumbersArr[avatarRand];
  var titleRand = Math.floor(Math.random() * (titleValues.length));
  var priceValues = Math.floor(Math.random() * (MAXPRICE - MINPRICE + 1) + MINPRICE);
  var typeRand = Math.floor(Math.random() * (typeValues.length));
  var roomsValues = Math.floor(Math.random() * (MAXROOMS - MINROOMS + 1) + MINROOMS);
  var guestsValues = Math.floor(Math.random() * MAXGUESTS + 1);
  var checkinRand = Math.floor(Math.random() * (checkinValues.length));
  var checkoutRand = Math.floor(Math.random() * (checkoutValues.length));
  var featuresRange = featuresArr.length;
  var featuresCount = Math.floor(Math.random() * (featuresArr.length + 1));
  var featuresValues = [];
  for (var j = 0; j < featuresCount; ++j) {
    var featuresRand = Math.floor(Math.random() * (featuresRange - j));
    featuresValues.push(featuresArr[featuresRand]);
    featuresArr.splice(featuresRand, 1);
  }

  var photosCount = photosArr.length - 1;
  var photosValues = [];
  for (var k = 0; k <= photosCount; k++) {
    var photosTemp = Math.floor(Math.random() * (photosArr.length));
    photosValues.push(photosArr[photosTemp]);
    photosArr.splice(photosTemp, 1);
  }
  var yCoord = Math.floor(Math.random() * (MAXY - MINY + 1) + MINY);
  var xCoord = Math.floor(Math.random() * (MAXX - MINX + 1) + MINX);

  var authorObj = {
    avatar: 'img/avatars/user0' + avatarNumber + '.png'
  };

  var offerLocation = {
    x: xCoord,
    y: yCoord
  };

  var offerObj = {
    title: titleValues[titleRand],
    adress: {'x': xCoord, 'y': yCoord},
    type: typeValues[typeRand],
    price: priceValues,
    rooms: roomsValues,
    guests: guestsValues,
    checkin: checkinValues[checkinRand],
    checkout: checkoutValues[checkoutRand],
    features: featuresValues,
    description: descriptionValues,
    photos: photosValues
  };

  var royaltyOffer = {
    author: authorObj,
    offer: offerObj,
    location: offerLocation
  };
  avatarNumbersArr.splice(avatarRand, 1);
  royaltyOffers.push(royaltyOffer);
}

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinImgElem = pinTemplate.querySelector('img');
var mapPinsElem = document.querySelector('.map .map__pins');

/** Константы размеров пина */
var NEEDLE_HEIGHT = 18;
var PIN_OFFSET_X = pinImgElem.getAttribute('width') / 2;
var PIN_OFFSET_Y = parseFloat(pinImgElem.getAttribute('height')) + NEEDLE_HEIGHT;

var createElem = function (pinsData) {
  var pinElem = pinTemplate.cloneNode(true);
  pinElem.querySelector('img').src = pinsData.author.avatar;
  pinElem.style.left = pinsData.location.x - PIN_OFFSET_X + 'px';
  pinElem.style.top = pinsData.location.y - PIN_OFFSET_Y + 'px';
  pinElem.classList.add('map__pin');
  return pinElem;
};

var pinFragment = document.createDocumentFragment();
for (var offerIndex = 0; offerIndex < royaltyOffers.length; offerIndex++) {
  pinFragment.appendChild(createElem(royaltyOffers[offerIndex]));
  mapPinsElem.appendChild(pinFragment);
}
var mapOfferElem = document.querySelector('.map');
var copyElemFromTemplate = function (querySelector) {
  return document.querySelector('template').content.querySelector(querySelector).cloneNode(true);
};

var getFeaturesItemElem = function (feature) {
  var featuresItemElem = copyElemFromTemplate('.popup__features li');
  featuresItemElem.className = '';
  featuresItemElem.classList.add('feature', 'feature--' + feature);
  return featuresItemElem;
};

var getImgItemElem = function (src) {
  var imgItemElem = copyElemFromTemplate('.popup__pictures li');
  var imgElem = imgItemElem.querySelector('img');
  imgElem.width = 80;
  imgElem.height = 80;
  imgElem.src = src;
  imgElem.classList.add('popup__previews');
  imgItemElem.appendChild(imgElem);

  return imgItemElem;
};

var createOfferElem = function (rent) {
  var offerElem = copyElemFromTemplate('article.map__card');
  offerElem.querySelector('h3').textContent = rent.offer.title;
  offerElem.querySelector('p small').textContent = rent.offer.address;
  offerElem.querySelector('.popup__price').textContent = rent.offer.price + '₽/ночь';
  offerElem.querySelector('h4').textContent = rent.offer.type;
  offerElem.querySelector('h4 + p').textContent = rent.offer.rooms + ' комнаты для ' + rent.offer.guests + ' гостей';
  offerElem.querySelector('h4 + p + p').textContent = 'Заезд после ' + rent.offer.checkin + ',' + ' выезд до ' + rent.offer.checkout;
  offerElem.querySelector('.popup__avatar').src = rent.author.avatar;
  offerElem.querySelector('ul + p').textContent = rent.offer.description;
  offerElem.querySelector('.popup__features').innerHTML = '';
  offerElem.querySelector('.popup__features').appendChild(elemCreator(rent.offer.features, getFeaturesItemElem));
  offerElem.querySelector('.popup__pictures').innerHTML = '';
  offerElem.querySelector('.popup__pictures').appendChild(elemCreator(rent.offer.photos, getImgItemElem));
  return offerElem;
};

var elemCreator = function (elemData, creationFunc) {
  var elemFragment = document.createDocumentFragment();
  elemData.forEach(function (elem, index) {
    elemFragment.appendChild(creationFunc(elem, index));
  });
  return elemFragment;
};

var offerFragment = document.createDocumentFragment();
offerFragment.appendChild(createOfferElem(royaltyOffers[0]));
mapOfferElem.appendChild(offerFragment);
