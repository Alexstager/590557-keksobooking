<script language="JavaScript" type="text/javascript">
var OFFERNUMBERS = 8;
var avatarNumber = Math.floor(Math.random() * OFFERNUMBERS + 1);
var author = {
	'avatar': 'img/avatars/user{{x' + avatarNumber + '}}.png'
};

var title = ['Большая уютная квартира',
 						 'Маленькая неуютная квартира',
 						 'Огромный прекрасный дворец',
   					 'Маленький ужасный дворец',
    				 'Красивый гостевой домик',
     				 'Некрасивый негостеприимный домик',
      			 'Уютное бунгало далеко от моря',
 						 'Неуютное бунгало по колено в воде']
var titleRand = Math.floor(Math.random() * (title.length));
var adress = '{{location.x}}, {{location.y}}'
var MAXPRICE = 1000000;
var MINPRICE = 1000;
var price = Math.floor(Math.random() * (MAXPRICE - MINPRICE + 1) + MINPRICE);
var type = ['flat', 'house', 'bungalo']
var typeRand = Math.floor(Math.random() * (type.length));
var MAXROOMS = 5;
var MINROOMS = 1;
var rooms = Math.floor(Math.random() * (MAXROOMS - MINROOMS + 1) + MINROOMS);
var MAXGUESTS = 3;
var guests = Math.floor(Math.random() * MAXGUESTS + 1)
var checkin = ['12:00', '13:00', '14:00']
var checkinRand = Math.floor(Math.random() * (checkin.length));
var checkout = ['12:00', '13:00', '14:00']
var checkoutRand = Math.floor(Math.random() * (checkout.length));
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var featuresRange = featuresArr.length;
var featuresCount = Math.floor(Math.random() * (featuresArr.length));
var features = [];
if (featuresCount == 0) {
  features = 'No ext. features';
}
else {
for (let i = 0; i < featuresCount; ++i) {
  var featuresRand = Math.floor(Math.random() * (featuresRange - i));
    features += featuresArr[featuresRand] + ', ';
    featuresArr.splice(featuresRand, 1);
};

};
var description = ''
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
 						'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
 						'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var photosCount = photosArr.length-1
var photos = []
for (let i = 0; i <= photosCount; i++) {
    let r = Math.floor(Math.random() * (photosArr.length));
    photos += photosArr[r] + ' ';
    photosArr.splice(r, 1);
};   

var offer = {
  'title': title[titleRand],
  'type': type[typeRand],
  'rooms': rooms,
  'guests': guests,
  'checkin': checkin[checkinRand],
  'checkout': checkout[checkoutRand],
  'features': features,
  'description': '',
  'photos': photos
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
  'author': author,
  'offer': offer,
  'location': offerLocation
}
var royaltyOffers = []
for (i = 0; i <= OFFERNUMBERS; i++){
royaltyOffers.push(royaltyOffer)
}
console.log(royaltyOffers);