// TODO: add more categories
class CATEGORIES {
  static catEnumInfo = {
    ELECTRONICS: {
      name: "Електроніка",
      sub_categories: {
        SMARTPHONES_AND_TABLETS: "Смартфони та планшети",
        LAPTOPS_AND_COMPUTERS: "Ноутбуки та комп'ютери",
        TVS_AND_MULTIMEDIA: "Телевізори та мультимедіа",
        PHOTO_AND_VIDEO: "Фото- та відеотехніка",
        AUDIO_AND_HOME_THEATER: "Аудіо- та домашні кінотеатри",
        HOME_APPLIANCES: "Побутова техніка",
        ACCESSORIES_AND_COMPONENTS: "Аксесуари та комплектуючі",
      },
    },
    CLOTHING_AND_SHOES: {
      name: "Одяг та взуття",
      sub_categories: {
        WOMEN_CLOTHING: "Жіночий одяг",
        MEN_CLOTHING: "Чоловічий одяг",
        KIDS_CLOTHING: "Дитячий одяг",
        WOMEN_SHOES: "Жіноче взуття",
        MEN_SHOES: "Чоловіче взуття",
        KIDS_SHOES: "Дитяче взуття",
        ACCESSORIES: "Аксесуари",
      },
    },
    HOME_AND_GARDEN: {
      name: "Дім та сад",
      sub_categories: {
        FURNITURE: "Меблі",
        HOME_DECOR: "Декор для дому",
        KITCHEN_AND_DINING: "Кухня та столова",
        BED_AND_BATH: "Ліжко та ванна",
        GARDEN_AND_OUTDOOR: "Сад і вулиця",
        HOME_IMPROVEMENT: "Покращення дому",
      },
    },
    BEAUTY_AND_HEALTH: {
      name: "Краса та здоров'я",
      sub_categories: {
        MAKEUP: "Макіяж",
        SKINCARE: "Догляд за шкірою",
        HAIRCARE: "Догляд за волоссям",
        PERFUMES: "Парфуми",
        PERSONAL_CARE: "Особистий догляд",
      },
    },
    PETS: {
      name: "Товари для домашніх тварин",
      sub_categories: {
        PET_FOOD_AND_TREATS: "Корм та лакомства",
        PET_CARE_ACCESSORIES: "Аксесуари для догляду",
        AQUARIUMS_AND_TERRARIUMS: "Акваріуми та тераріуми",
        PET_TOYS: "Іграшки для тварин",
      },
    },
    AUTOMOTIVE: {
      name: "Автомобілі",
      sub_categories: {
        PARTS: "Запчастини",
        CAR_ACCESSORIES: "Автоаксесуари",
        MOTORCYCLE_ACCESSORIES: "Мотоаксесуари",
        OILS_AND_CHEMICALS: "Мастила та автохімія",
      },
    },
  };

  static getCategoriesArr() {
    return Object.values(this.catEnumInfo).reduce(
      (arr, cur) => arr.concat(cur.name, ...Object.values(cur.sub_categories)),
      []
    );
  }

  static #getSubCategoryArr() {
    return Object.values(this.catEnumInfo).reduce(
      (arr, cur) => arr.concat(...Object.values(cur.sub_categories)),
      []
    );
  }

  static isSubCategory(cat) {
    const subCategories = this.#getSubCategoryArr();
    return subCategories.includes(cat);
  }

  static getParentCategory(cat) {
    for (const [key, value] of Object.entries(CATEGORIES.catEnumInfo)) {
      const subCategories = Object.values(this.catEnumInfo[key].sub_categories);
      if (subCategories.includes(cat)) return value.name;
    }

    throw new Error(`${cat} is not a subcategory`);
  }
}

// define enum properties
for (const [key, value] of Object.entries(CATEGORIES.catEnumInfo)) {
  Object.defineProperty(CATEGORIES, key, {
    get() {
      return value.name;
    },
  });

  for (const [subKey, subValue] of Object.entries(value.sub_categories)) {
    Object.defineProperty(CATEGORIES, subKey, {
      get() {
        return subValue;
      },
    });
  }
}

export { CATEGORIES };
