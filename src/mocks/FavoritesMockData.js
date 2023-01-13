export const favoritesMock = [
  { id: '52977',
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' },
  // { id: '53060',
  //   type: 'comida',
  //   area: 'Croatian',
  //   category: 'Side',
  //   alcoholicOrNot: '',
  //   name: 'Burek',
  //   image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg' },
  // { id: '53026',
  //   type: 'comida',
  //   area: 'Egyptian',
  //   category: 'Vegetarian',
  //   alcoholicOrNot: '',
  //   name: 'Tamiya',
  //   image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg' },
  // { id: '15997',
  //   type: 'bebida',
  //   area: '',
  //   category: 'Ordinary Drink',
  //   alcoholicOrNot: 'Optional alcohol',
  //   name: 'GG',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' },
  { id: '17222',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg' },
  { id: '12736',
    type: 'bebida',
    area: '',
    category: 'Cocoa',
    alcoholicOrNot: 'Non alcoholic',
    name: 'Drinking Chocolate',
    image: 'https://www.thecocktaildb.com/images/media/drink/u6jrdf1487603173.jpg' },
];

export const favoritesMockFoodOnly = favoritesMock
  .filter((item) => item.type === 'comida');

export const foodQuantity = favoritesMockFoodOnly.length;

export const favoritesMockDrinksOnly = favoritesMock
  .filter((item) => item.type === 'bebida');

export const drinksQuantity = favoritesMockDrinksOnly.length;
