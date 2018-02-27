'use strict';
var OFFERNUMBERS = 8;
var MAXROOMS = 5;
var MINROOMS = 1;
var MAXPRICE = 1000000;
var MINPRICE = 1000;
var MAXGUESTS = 3;
var PHOTOSNUMBERS = 3;
var MINY = 150;
var MAXY = 500;
var MINX = 300;
var MAXX = 900;
var titleValues = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeValues = ['flat', 'house', 'bungalo'];
var checkinValues = ['12:00', '13:00', '14:00'];
var checkoutValues = ['12:00', '13:00', '14:00'];
var avatarNumbersArr = [];
for (var i = 1; i <= OFFERNUMBERS; i++) {
  avatarNumbersArr.push(i);
}

var royaltyOffers = [];
for (i = 0; i < OFFERNUMBERS; i++) {
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var descriptionValues = '';
  var photosArr = [];
  for (var j = 1; j <= PHOTOSNUMBERS; j++) {
    var photoItem = 'http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg';
    photosArr.push(photoItem);
  }
  var avatarRand = Math.floor(Math.random() * avatarNumbersArr.length);
  var avatarNumber = avatarNumbersArr[avatarRand];
  avatarNumbersArr.splice(avatarRand, 1);
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
  for (j = 0; j < featuresCount; j++) {
    var featuresRand = Math.floor(Math.random() * (featuresRange - j));
    featuresValues.push(featuresArr[featuresRand]);
    featuresArr.splice(featuresRand, 1);
  }
  var photosCount = photosArr.length;
  var photosValues = [];
  for (j = 0; j < photosCount; j++) {
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
  featuresItemElem.className = 'feature feature--' + feature;
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
	var offer = rent.offer;
  var offerElem = copyElemFromTemplate('article.map__card');
  offerElem.querySelector('.offerTitle').textContent = offer.title;
  offerElem.querySelector('.offerAdress').textContent = offer.address;
  offerElem.querySelector('.popup__price').textContent = offer.price + '₽/ночь';
  offerElem.querySelector('.offerType').textContent = rent.offer.type;
  offerElem.querySelector('.rooms').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  offerElem.querySelector('.checkin').textContent = 'Заезд после ' + offer.checkin + ',' + ' выезд до ' + offer.checkout;
  offerElem.querySelector('.popup__avatar').src = rent.author.avatar;
  offerElem.querySelector('.popup__features').innerHTML = '';
  offerElem.querySelector('.popup__features').appendChild(elemCreator(offer.features, getFeaturesItemElem));
  offerElem.querySelector('.popup__pictures').innerHTML = '';
  offerElem.querySelector('.popup__pictures').appendChild(elemCreator(offer.photos, getImgItemElem));
  return offerElem;
};

var elemCreator = function (elemData, creationFunc) {
  var elemFragment = document.createDocumentFragment();
  elemData.forEach(function (elem, index) {
    elemFragment.appendChild(creationFunc(elem, index));
  });
  return elemFragment;
};

mapOfferElem.appendChild(createOfferElem(royaltyOffers[0]));
