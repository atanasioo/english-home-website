var config = {};
const host = window.location.host;
const firstPath = window.location.href.split("/")[3];

if (
  localStorage.getItem("site-local-name") === "english-home" ||
  ((host === "www.englishhome.com.lb" || host === "englishhome.com.lb") &&
    firstPath !== "store_one" &&
    firstPath !== "store_two")
) {
  config = {
    "short-name": "englishHome",
    "seo-title": "englishHome | Online Shopping in Lebanon",
    "seo-title-base": " | englishHome",
    "seo-description":
      "English Home, which brings a fresh life energy to your interiors and creates designs intertwined with modernism, continues to offer original products with its collections that strengthen your decoration, functional, comfortable and make your life easier. English Home, which continues to follow modern design lines in home textile products; It creates a unique equation in the fields of kitchen, bathroom, living room, decoration, baby & child, clothing, personal care & cosmetics and brings together exclusive products that help you create style easily.",
    email: {
      it: "it@ishtari.com",
    },
    numbers: ["76400008"],
    supportNumber: "76 400 008",
    countryCode: "+961",
    "fb-meta": "12345678",
    appId: "130719880936639",
    showMenu: true,
    showMenu2: true,
    showCart: true,
    showTopBrand: true,
    showVisaCard: true,
    send_email: "info@ishtari.com",
    zone: "118",
    "initial-zone": { id: "3969", name: "Beirut بيروت" },
    appleStore: "https://apps.apple.com/lb/app/english-home-lb/id6445799712",
    googlePlay:
      "https://play.google.com/store/search?q=english+home+lebanon&c=apps",

    "admin-product-url":
      "http://www.englishhome.com.lb/control/admin/index.php?route=catalog/product/update&product_id=",
    "site-url": "https://www.englishhome.com.lb",
    "admin-products-url":
      "http://www.englishhome.com.lb/control/admin/index.php?route=catalog/product_one&token=",
    "admin-orders-url":
      "http://www.englishhome.com.lb/control/admin/index.php?route=sale/order_one&token=",
    "admin-update-product":
      "http://www.englishhome.com.lb/control/admin/index.php?route=catalog/product/update&product_id=",
    facebook: "https://www.facebook.com/EnglishHomeLebanon/",
    instagram: "https://instagram.com/englishhome.lb?igshid=YmMyMTA2M2Y=",
    tiktok: "https://www.tiktok.com/@englishhomelb?lang=en",
    youtube: "https://www.youtube.com/channel/UCZ9aa_BjFF2oWVEtC4f6PDA",
    twitter: "https://twitter.com/ishtari",
    linkedin: "https://www.linkedin.com/company/ishtari",
    termCondition: false,
    loginRequired: false,
  };
} else if (
  localStorage.getItem("site-local-name") === "english-home-store_one" ||
  ((host === "www.englishhome.com.lb" || host === "englishhome.com.lb") &&
    firstPath === "store_one")
) {
  config = {
    "short-name": "englishHome",
    "seo-title": "englishHome | Online Shopping in Lebanon",
    "seo-title-base": " | englishHome",
    "seo-description":
      "English Home, which brings a fresh life energy to your interiors and creates designs intertwined with modernism, continues to offer original products with its collections that strengthen your decoration, functional, comfortable and make your life easier. English Home, which continues to follow modern design lines in home textile products; It creates a unique equation in the fields of kitchen, bathroom, living room, decoration, baby & child, clothing, personal care & cosmetics and brings together exclusive products that help you create style easily.",
    email: {
      it: "it@ishtari.com",
    },
    numbers: ["76400008"],
    supportNumber: "76 400 008",
    countryCode: "+961",
    "fb-meta": "12345678",
    appId: "130719880936639",
    showMenu: true,
    showMenu2: true,
    showCart: true,
    showTopBrand: true,
    showVisaCard: true,
    send_email: "info@ishtari.com",
    zone: "118",
    "initial-zone": { id: "3969", name: "Beirut بيروت" },
    appleStore: "https://apps.apple.com/lb/app/english-home-lb/id6445799712",
    googlePlay:
      "https://play.google.com/store/search?q=english+home+lebanon&c=apps",

    "admin-product-url":
      "http://www.englishhome.com.lb/store_one/control/admin/index.php?route=catalog/product/update&product_id=",
    "site-url": "https://www.englishhome.com.lb/store_one",
    "admin-products-url":
      "http://www.englishhome.com.lb/store_one/control/admin/index.php?route=catalog/product_one&token=",
    "admin-orders-url":
      "http://www.englishhome.com.lb/store_one/control/admin/index.php?route=sale/order_one&token=",
    "admin-update-product":
      "http://www.englishhome.com.lb/store_one/control/admin/index.php?route=catalog/product/update&product_id=",
    facebook: "https://www.facebook.com/EnglishHomeLebanon/",
    instagram: "https://instagram.com/englishhome.lb?igshid=YmMyMTA2M2Y=",
    tiktok: "https://www.tiktok.com/@englishhomelb?lang=en",
    youtube: "https://www.youtube.com/channel/UCZ9aa_BjFF2oWVEtC4f6PDA",
    twitter: "https://twitter.com/ishtari",
    linkedin: "https://www.linkedin.com/company/ishtari",
    termCondition: false,
    loginRequired: false,
  };
} else if (
  localStorage.getItem("site-local-name") === "english-home-store_two" ||
  ((host === "www.englishhome.com.lb" || host === "englishhome.com.lb") &&
    firstPath === "store_two")
) {
  config = {
    "short-name": "englishHome",
    "seo-title": "englishHome | Online Shopping in Lebanon",
    "seo-title-base": " | englishHome",
    "seo-description":
      "English Home, which brings a fresh life energy to your interiors and creates designs intertwined with modernism, continues to offer original products with its collections that strengthen your decoration, functional, comfortable and make your life easier. English Home, which continues to follow modern design lines in home textile products; It creates a unique equation in the fields of kitchen, bathroom, living room, decoration, baby & child, clothing, personal care & cosmetics and brings together exclusive products that help you create style easily.",
    email: {
      it: "it@ishtari.com",
    },
    numbers: ["76400008"],
    supportNumber: "76 400 008",
    countryCode: "+961",
    "fb-meta": "12345678",
    appId: "130719880936639",
    showMenu: true,
    showMenu2: true,
    showCart: true,
    showTopBrand: true,
    showVisaCard: true,
    send_email: "info@ishtari.com",
    zone: "118",
    "initial-zone": { id: "3969", name: "Beirut بيروت" },
    appleStore: "https://apps.apple.com/lb/app/english-home-lb/id6445799712",
    googlePlay:
      "https://play.google.com/store/search?q=english+home+lebanon&c=apps",

    "admin-product-url":
      "http://www.englishhome.com.lb/store_two/control/admin/index.php?route=catalog/product/update&product_id=",
    "site-url": "https://www.englishhome.com.lb/store_two",
    "admin-products-url":
      "http://www.englishhome.com.lb/store_two/control/admin/index.php?route=catalog/product_one&token=",
    "admin-orders-url":
      "http://www.englishhome.com.lb/store_two/control/admin/index.php?route=sale/order_one&token=",
    "admin-update-product":
      "http://www.englishhome.com.lb/store_two/control/admin/index.php?route=catalog/product/update&product_id=",
    facebook: "https://www.facebook.com/EnglishHomeLebanon/",
    instagram: "https://instagram.com/englishhome.lb?igshid=YmMyMTA2M2Y=",
    tiktok: "https://www.tiktok.com/@englishhomelb?lang=en",
    youtube: "https://www.youtube.com/channel/UCZ9aa_BjFF2oWVEtC4f6PDA",
    twitter: "https://twitter.com/ishtari",
    linkedin: "https://www.linkedin.com/company/ishtari",
    termCondition: false,
    loginRequired: false,
  };
}

window.config = config;
