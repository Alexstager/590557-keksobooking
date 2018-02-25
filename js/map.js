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
 for (var avatarIndex = 1; avatarIndex <= OFFERNUMBERS; avatarIndex++){
 	avatarNumbersArr.push(avatarIndex);
 }

var royaltyOffers = [];
for (var i = 0; i <= OFFERNUMBERS; i++) {
var titleValues = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeValues = ['flat', 'house', 'bungalo'];
var checkinValues = ['12:00', '13:00', '14:00'];
var checkoutValues = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptionValues = '';
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var avatarNumber = [];
for (var avatarRandIndex = 0; avatarRandIndex < avatarNumbersArr.length; avatarRandIndex++){
	var avatarRand = Math.floor(Math.random() * avatarNumbersArr.length)
	avatarNumber = avatarNumbersArr[avatarRand];


} 
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
  photosValues += photosArr[photosTemp] + ' ';
  photosArr.splice(photosTemp, 1);
}
var yCoord = Math.floor(Math.random() * (MAXY - MINY + 1) + MINY);
var xCoord = Math.floor(Math.random() * (MAXX - MINX + 1) + MINX);


var authorObj = {
  'avatar': 'img/avatars/user0' + avatarNumber + '.png'
};

var offerLocation = {
  'x': xCoord,
  'y': yCoord
};

var offerObj = {
  'title': titleValues[titleRand],
  'adress': {'x': xCoord, 'y': yCoord},
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


var royaltyOffer = {
  'author': authorObj,
  'offer': offerObj,
  'location': offerLocation
};
	avatarNumbersArr.splice(avatarRand, 1)
  royaltyOffers.push(royaltyOffer);
}


  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinImgElem = pinTemplate.querySelector('img');
  var mapPinsElem = document.querySelector('.map .map__pins');


  /** Константы размеров пина */
  var NEEDLE_HEIGHT = 18;
  var PIN_OFFSET_X = pinImgElem.getAttribute('width') / 2;
  var PIN_OFFSET_Y = parseFloat(pinImgElem.getAttribute('height')) + NEEDLE_HEIGHT;



  var createElem = function (royaltyOffers) {
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.querySelector('img').src = royaltyOffers.author.avatar;
console.log(royaltyOffers.author.avatar + ' vivod');
    pinElem.style.left = royaltyOffers.location.x - PIN_OFFSET_X + 'px';
    pinElem.style.top = royaltyOffers.location.y - PIN_OFFSET_Y + 'px';
    pinElem.classList.add('map__pin');


    return pinElem;
  };

var pinFragment = document.createDocumentFragment();
for (var offerIndex = 0; offerIndex < royaltyOffers.length-1; offerIndex++) {
		pinFragment.appendChild(createElem(royaltyOffers[offerIndex]));
		console.log(royaltyOffers[offerIndex]);
		mapPinsElem.appendChild(pinFragment);
}
	var mapOfferElem = document.querySelector('.map')
  var copyElemFromTemplate = function (querySelector) {
    return document.querySelector('template').content.querySelector(querySelector).cloneNode(true);
  };

   var createOfferElem = function(royaltyOffers) { 
    var offerElem = copyElemFromTemplate('article.map__card');

    offerElem.querySelector('h3').textContent = royaltyOffers.offer.title;
    offerElem.querySelector('p small').textContent = royaltyOffers.offer.address;
    offerElem.querySelector('.popup__price').textContent = royaltyOffers.offer.price + '₽/ночь';
    offerElem.querySelector('h4').textContent = royaltyOffers.offer.type;
    offerElem.querySelector('h4 + p').textContent = royaltyOffers.offer.rooms + ' комнаты для ' + royaltyOffers.offer.guests + ' гостей';
    offerElem.querySelector('h4 + p + p').textContent = 'Заезд после ' + royaltyOffers.offer.checkin + ',' + ' выезд до ' + royaltyOffers.offer.checkout;
    offerElem.querySelector('.popup__avatar').src = royaltyOffers.author.avatar;
    offerElem.querySelector('ul + p').textContent = royaltyOffers.offer.description;
		offerElem.querySelector('.popup__features li').className = '';
    offerElem.querySelector('.popup__features li').classList.add('feature', 'feature--' + royaltyOffers.offer.features);

  return offerElem
}

var offerFragment = document.createDocumentFragment();
for (var offerFragmentIndex = 0; offerFragmentIndex < royaltyOffers.length-1; offerFragmentIndex++) {
		offerFragment.appendChild(createOfferElem(royaltyOffers[offerFragmentIndex]));
		console.log(royaltyOffers[offerIndex]);
		mapOfferElem.appendChild(offerFragment, mapOfferElem);
		console.log(royaltyOffers[offerFragmentIndex])
}