"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "en" | "es";
type Translated = { en: string; es: string };
type MenuCategory = "single" | "combos" | "sides";

type MenuItem = {
  id: string;
  category: MenuCategory;
  name: Translated;
  price: string;
  image: keyof typeof imageDimensions;
  description: Translated;
  ingredients: string[];
};

type Drink = {
  id: string;
  name: Translated;
  price: string;
  image: keyof typeof imageDimensions;
  description: Translated;
};

const phoneHref = "tel:9188730623";
const phoneDisplay = "918-873-0623";
const supportEmail = "taqueriacaliforniatulsa@gmail.com";
const supportEmailHref = `mailto:${supportEmail}`;
const googleMapsUrl =
  "https://www.google.com/maps/place/Taqueria+California/@36.1612821,-95.968302,15z/data=!3m1!4b1!4m6!3m5!1s0x87b6edd81b4b27a5:0x9f60e79051aabf41!8m2!3d36.1612825!4d-95.9580237!16s%2Fg%2F11mvwkzcx1";

const imageDimensions = {
  truck: { width: 1200, height: 800 },
  "pollo-asado": { width: 675, height: 1200 },
  quesabirria: { width: 1200, height: 900 },
  ceviche: { width: 900, height: 1200 },
  "taco-plate": { width: 1200, height: 866 },
  torta: { width: 1162, height: 1200 },
  burrito: { width: 1200, height: 1043 },
  quesadilla: { width: 1158, height: 1200 },
  mulitas: { width: 1200, height: 800 },
  sopes: { width: 675, height: 1200 },
  tostadas: { width: 1200, height: 671 },
  hotdogs: { width: 1133, height: 1200 },
  "torta-jamon": { width: 1200, height: 675 },
  enchiladas: { width: 675, height: 1200 },
  "taco-combo": { width: 1174, height: 1200 },
  "carnitas-combo": { width: 898, height: 1200 },
  "steak-ranchero": { width: 1200, height: 800 },
  "quesabirria-combo": { width: 845, height: 1200 },
  "rice-beans": { width: 900, height: 1200 },
  tamales: { width: 1200, height: 800 },
  horchata: { width: 1200, height: 900 },
  "pineapple-water": { width: 1200, height: 900 },
} as const;

const ingredientLabels: Record<string, Translated> = {
  "Choice of Meat": { en: "Choice of Meat", es: "Elección de Carne" },
  Cilantro: { en: "Cilantro", es: "Cilantro" },
  Onion: { en: "Onion", es: "Cebolla" },
  Lime: { en: "Lime", es: "Limón" },
  "Salsa on the Side": { en: "Salsa on the Side", es: "Salsa al Lado" },
  Lettuce: { en: "Lettuce", es: "Lechuga" },
  Tomato: { en: "Tomato", es: "Tomate" },
  Avocado: { en: "Avocado", es: "Aguacate" },
  "Grilled Jalapeños": { en: "Grilled Jalapeños", es: "Jalapeños Asados" },
  "Grilled Onions": { en: "Grilled Onions", es: "Cebollas Asadas" },
  Rice: { en: "Rice", es: "Arroz" },
  Beans: { en: "Beans", es: "Frijoles" },
  "Refried Beans": { en: "Refried Beans", es: "Frijoles Refritos" },
  Cheese: { en: "Cheese", es: "Queso" },
  Salsa: { en: "Salsa", es: "Salsa" },
  "Sour Cream": { en: "Sour Cream", es: "Crema" },
  "Grilled Jalapeño": { en: "Grilled Jalapeño", es: "Jalapeño Asado" },
  "Pickled Veggies": { en: "Pickled Veggies", es: "Verduras en Vinagre" },
  "Onion & Cilantro": { en: "Onion & Cilantro", es: "Cebolla y Cilantro" },
  "Cotija Cheese": { en: "Cotija Cheese", es: "Queso Cotija" },
  Birria: { en: "Birria", es: "Birria" },
  "Pickled Carrots": { en: "Pickled Carrots", es: "Zanahorias en Vinagre" },
  "Grilled Pepper": { en: "Grilled Pepper", es: "Chile Asado" },
  "6oz Consomé": { en: "6oz Consomé", es: "Consomé de 6oz" },
  Carnitas: { en: "Carnitas", es: "Carnitas" },
  "Fried Onions": { en: "Fried Onions", es: "Cebollas Fritas" },
  Tortillas: { en: "Tortillas", es: "Tortillas" },
  "Grilled Chicken": { en: "Grilled Chicken", es: "Pollo Asado" },
  Ranch: { en: "Ranch", es: "Ranch" },
  "Grilled Steak": { en: "Grilled Steak", es: "Bistec Asado" },
  "Grilled Onion": { en: "Grilled Onion", es: "Cebolla Asada" },
  "3 Hotdogs": { en: "3 Hotdogs", es: "3 Hotdogs" },
  Ceviche: { en: "Ceviche", es: "Ceviche" },
  Ham: { en: "Ham", es: "Jamón" },
  "Muenster Cheese": { en: "Muenster Cheese", es: "Queso Muenster" },
  Tamales: { en: "Tamales", es: "Tamales" },
};

const menuItems: MenuItem[] = [
  {
    id: "1",
    category: "single",
    name: { en: "5 Taco Plate", es: "5 Tacos" },
    price: "$11.99",
    image: "taco-plate",
    description: {
      en: "Street-style tacos on double corn tortillas with your choice of meat, fresh cilantro and onion, plus pickled carrots, grilled pepper, and onions.",
      es: "Tacos al estilo callejero en doble tortilla de maíz con tu elección de carne, cilantro y cebolla, más zanahorias en vinagre, chile y cebolla asada.",
    },
    ingredients: ["Choice of Meat", "Cilantro", "Onion", "Lime", "Salsa on the Side"],
  },
  {
    id: "2",
    category: "single",
    name: { en: "Torta", es: "Torta" },
    price: "$9.99",
    image: "torta",
    description: {
      en: "Mexican sandwich on a toasted telera roll with your choice of meat, lettuce, tomato, avocado, and jalapeños.",
      es: "Sándwich mexicano en pan telera tostado con tu elección de carne, lechuga, tomate, aguacate y jalapeños.",
    },
    ingredients: ["Choice of Meat", "Lettuce", "Tomato", "Avocado", "Grilled Jalapeños", "Grilled Onions"],
  },
  {
    id: "3",
    category: "single",
    name: { en: "Burrito", es: "Burrito" },
    price: "$9.99",
    image: "burrito",
    description: {
      en: "Large flour tortilla filled with your choice of meat, rice, beans, lettuce, cheese, and salsa.",
      es: "Tortilla de harina grande rellena con tu elección de carne, arroz, frijoles, lechuga, queso y salsa.",
    },
    ingredients: ["Choice of Meat", "Rice", "Beans", "Lettuce", "Cheese", "Salsa"],
  },
  {
    id: "4",
    category: "single",
    name: { en: "Quesadilla", es: "Quesadilla" },
    price: "$9.99",
    image: "quesadilla",
    description: {
      en: "Crispy grilled flour tortilla filled with melted cheese and your choice of meat, with lettuce, onion, and sour cream on the side.",
      es: "Tortilla de harina crujiente a la plancha con queso derretido y tu elección de carne, con lechuga, cebolla y crema al lado.",
    },
    ingredients: ["Choice of Meat", "Cheese", "Lettuce", "Sour Cream", "Grilled Jalapeño"],
  },
  {
    id: "5",
    category: "single",
    name: { en: "3 Mulitas", es: "3 Mulitas" },
    price: "$11.99",
    image: "mulitas",
    description: {
      en: "Two griddled corn tortillas filled with your choice of meat, melted cheese, and fresh toppings. Served with pickled vegetables and lime.",
      es: "Dos tortillas de maíz a la plancha rellenas con tu elección de carne, queso derretido y acompañamientos frescos. Servidas con verduras en vinagre y limón.",
    },
    ingredients: ["Choice of Meat", "Cheese", "Lettuce", "Grilled Onions", "Pickled Veggies"],
  },
  {
    id: "6",
    category: "single",
    name: { en: "3 Sopes", es: "3 Sopes" },
    price: "$11.99",
    image: "sopes",
    description: {
      en: "Handmade corn masa fried golden, layered with refried beans and your choice of meat, then topped with lettuce, tomato, onion, cilantro, sour cream, and cotija cheese.",
      es: "Masa de maíz hecha a mano y frita hasta dorar, con frijoles refritos y tu elección de carne, cubierta con lechuga, tomate, cebolla, cilantro, crema y queso cotija.",
    },
    ingredients: ["Choice of Meat", "Refried Beans", "Lettuce", "Tomato", "Onion & Cilantro", "Sour Cream", "Cotija Cheese"],
  },
  {
    id: "7",
    category: "single",
    name: { en: "3 Tostadas", es: "3 Tostadas" },
    price: "$11.99",
    image: "tostadas",
    description: {
      en: "Crispy tostadas topped with your choice of meat, refried beans, onion, cilantro, lettuce, tomato, sour cream, and cotija cheese.",
      es: "Tostadas crujientes con tu elección de carne, frijoles refritos, cebolla, cilantro, lechuga, tomate, crema y queso cotija.",
    },
    ingredients: ["Choice of Meat", "Refried Beans", "Lettuce", "Tomato", "Sour Cream", "Cotija Cheese"],
  },
  {
    id: "13",
    category: "single",
    name: { en: "4 Quesabirria Plate", es: "4 Quesabirrias" },
    price: "$13.99",
    image: "quesabirria",
    description: {
      en: "Four quesabirria tacos with cheese, pickled carrots, lime, grilled onions and pepper, plus a 6oz consomé for dipping.",
      es: "Cuatro tacos de quesabirria con queso, zanahorias en vinagre, limón, cebolla y chile asado, más un consomé de 6oz para mojar.",
    },
    ingredients: ["Birria", "Pickled Carrots", "Lime", "Grilled Onions", "Grilled Pepper", "6oz Consomé"],
  },
  {
    id: "15",
    category: "single",
    name: { en: "3 Hotdogs", es: "3 Hotdogs" },
    price: "$7.99",
    image: "hotdogs",
    description: { en: "Three hotdogs served as a single plate.", es: "Tres hotdogs servidos como plato individual." },
    ingredients: ["3 Hotdogs"],
  },
  {
    id: "16",
    category: "single",
    name: { en: "Ceviche", es: "Ceviche" },
    price: "$8.99",
    image: "ceviche",
    description: { en: "Fresh ceviche served with two tostadas.", es: "Ceviche fresco servido con dos tostadas." },
    ingredients: ["Ceviche"],
  },
  {
    id: "17",
    category: "single",
    name: { en: "Ham Torta", es: "Torta de Jamón" },
    price: "$9.99",
    image: "torta-jamon",
    description: {
      en: "Toasted torta roll with ham, melted Muenster cheese, refried beans, lettuce, tomato, and fresh avocado.",
      es: "Pan de torta tostado con jamón, queso Muenster derretido, frijoles refritos, lechuga, tomate y aguacate fresco.",
    },
    ingredients: ["Ham", "Muenster Cheese", "Refried Beans", "Lettuce", "Tomato", "Avocado"],
  },
  {
    id: "8",
    category: "combos",
    name: { en: "Enchiladas", es: "Enchiladas" },
    price: "$11.99",
    image: "enchiladas",
    description: {
      en: "Rolled corn tortillas with your choice of meat, sauce, lettuce, tomato, sour cream, and cotija cheese. Served with rice and refried beans.",
      es: "Tortillas de maíz enrolladas con tu elección de carne, salsa, lechuga, tomate, crema y queso cotija. Servidas con arroz y frijoles refritos.",
    },
    ingredients: ["Choice of Meat", "Rice", "Refried Beans", "Lettuce", "Tomato", "Sour Cream", "Cotija Cheese"],
  },
  {
    id: "9",
    category: "combos",
    name: { en: "4 Taco Combo", es: "4 Tacos con Arroz y Frijoles" },
    price: "$13.99",
    image: "taco-combo",
    description: {
      en: "Four street-style tacos with your choice of meat, served with rice and refried beans.",
      es: "Cuatro tacos al estilo callejero con tu elección de carne, servidos con arroz y frijoles refritos.",
    },
    ingredients: ["Choice of Meat", "Rice", "Refried Beans", "Cilantro", "Onion", "Salsa on the Side"],
  },
  {
    id: "10",
    category: "combos",
    name: { en: "Carnitas Combo", es: "Carnitas con Arroz y Frijoles" },
    price: "$12.99",
    image: "carnitas-combo",
    description: {
      en: "Slow-cooked carnitas fried with onions, served with rice, refried beans, and warm tortillas.",
      es: "Carnitas cocidas a fuego lento con cebolla, servidas con arroz, frijoles refritos y tortillas calientes.",
    },
    ingredients: ["Carnitas", "Fried Onions", "Rice", "Refried Beans", "Tortillas"],
  },
  {
    id: "11",
    category: "combos",
    name: { en: "Pollo Asado", es: "Pollo Asado" },
    price: "$12.99",
    image: "pollo-asado",
    description: {
      en: "Grilled chicken served with rice, refried beans, and a fresh salad with lettuce, tomato, lime, pickled carrots, grilled pepper, and onion.",
      es: "Pollo asado servido con arroz, frijoles refritos y ensalada con lechuga, tomate, limón, zanahorias en vinagre, chile y cebolla asada.",
    },
    ingredients: ["Grilled Chicken", "Rice", "Refried Beans", "Lettuce", "Ranch", "Tomato", "Lime", "Pickled Carrots", "Grilled Pepper", "Grilled Onion"],
  },
  {
    id: "12",
    category: "combos",
    name: { en: "Steak Ranchero", es: "Bistec Ranchero" },
    price: "$13.99",
    image: "steak-ranchero",
    description: {
      en: "Ranchero-style grilled steak with rice, refried beans, and a salad with lettuce, tomato, lime, pickled carrots, grilled pepper, and onion.",
      es: "Bistec ranchero con arroz, frijoles refritos y ensalada con lechuga, tomate, limón, zanahorias en vinagre, chile y cebolla asada.",
    },
    ingredients: ["Grilled Steak", "Rice", "Refried Beans", "Lettuce", "Ranch", "Tomato", "Lime", "Pickled Carrots", "Grilled Pepper", "Grilled Onion"],
  },
  {
    id: "14",
    category: "combos",
    name: { en: "3 Quesabirria Combo", es: "3 Quesabirrias con Arroz y Frijoles" },
    price: "$13.99",
    image: "quesabirria-combo",
    description: {
      en: "Three quesabirria tacos with cheese, rice, refried beans, pickled carrots, lime, grilled onions and pepper, plus a 6oz consomé.",
      es: "Tres tacos de quesabirria con queso, arroz, frijoles refritos, zanahorias en vinagre, limón, cebolla y chile asado, más un consomé de 6oz.",
    },
    ingredients: ["Birria", "Rice", "Refried Beans", "Pickled Carrots", "Lime", "Grilled Onions", "Grilled Pepper", "6oz Consomé"],
  },
  {
    id: "side-1",
    category: "sides",
    name: { en: "Rice and Beans", es: "Arroz y Frijoles" },
    price: "$2.99",
    image: "rice-beans",
    description: { en: "Seasoned rice and refried beans served as a classic side.", es: "Arroz sazonado y frijoles refritos como acompañamiento clásico." },
    ingredients: ["Rice", "Refried Beans"],
  },
  {
    id: "side-2",
    category: "sides",
    name: { en: "Tamales", es: "Tamales" },
    price: "$2.99 each",
    image: "tamales",
    description: { en: "Traditional tamales, steamed until tender and sold individually.", es: "Tamales tradicionales al vapor, suaves y vendidos individualmente." },
    ingredients: ["Tamales"],
  },
];

const categoryLabels: Record<MenuCategory, Translated> = {
  single: { en: "Single Plates", es: "Platos Individuales" },
  combos: { en: "Combo Plates", es: "Platos Combo" },
  sides: { en: "Sides", es: "Extras" },
};

const drinks: Drink[] = [
  {
    id: "horchata",
    name: { en: "Horchata", es: "Horchata" },
    price: "$3.99",
    image: "horchata",
    description: {
      en: "Creamy rice drink with cinnamon, made fresh every morning and served ice cold.",
      es: "Bebida cremosa de arroz con canela, preparada fresca cada mañana y servida bien fría.",
    },
  },
  {
    id: "pineapple-water",
    name: { en: "Pineapple Water", es: "Agua de Piña" },
    price: "$3.99",
    image: "pineapple-water",
    description: {
      en: "Fresh pineapple blended with water and a touch of sugar. Light, sweet, and refreshing.",
      es: "Piña fresca licuada con agua y un toque de azúcar. Ligera, dulce y refrescante.",
    },
  },
];

const meats = [
  { type: { en: "Beef", es: "Res" }, name: { en: "Grilled Steak", es: "Carne Asada" }, tone: "beef" },
  { type: { en: "Chicken", es: "Pollo" }, name: { en: "Chicken", es: "Pollo" }, tone: "chicken" },
  { type: { en: "Pork", es: "Cerdo" }, name: { en: "Marinated Pork", es: "Pastor" }, tone: "pork" },
  { type: { en: "Pork", es: "Cerdo" }, name: { en: "Slow-Cooked Pork", es: "Carnitas" }, tone: "pork" },
  { type: { en: "Beef", es: "Res" }, name: { en: "Stewed Beef", es: "Birria" }, tone: "beef" },
  { type: { en: "Beef", es: "Res" }, name: { en: "Beef Tongue", es: "Lengua" }, tone: "beef" },
];

function trackConversion(eventName: string, details: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("taqueria:conversion", { detail: { eventName, ...details } }),
  );

  const analyticsWindow = window as typeof window & {
    plausible?: (name: string, options?: { props: Record<string, string> }) => void;
    gtag?: (command: string, name: string, details: Record<string, string>) => void;
  };
  analyticsWindow.plausible?.(eventName, { props: details });
  analyticsWindow.gtag?.("event", eventName, details);
}

function getOpenStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "0";
  const weekday = value("weekday");
  const minutes = (Number(value("hour")) % 24) * 60 + Number(value("minute"));
  const closeMinutes = weekday === "Fri" || weekday === "Sat" ? 23 * 60 : 22 * 60;
  const openingMinutes = 10 * 60 + 30;
  const closeLabel = closeMinutes === 23 * 60 ? "11:00 PM" : "10:00 PM";

  if (minutes >= openingMinutes && minutes < closeMinutes) {
    return {
      isOpen: true,
      en: `Open now · until ${closeLabel}`,
      es: `Abierto ahora · hasta las ${closeLabel}`,
    };
  }
  if (minutes < openingMinutes) {
    return {
      isOpen: false,
      en: "Closed · opens today at 10:30 AM",
      es: "Cerrado · abre hoy a las 10:30 AM",
    };
  }
  return {
    isOpen: false,
    en: "Closed · opens tomorrow at 10:30 AM",
    es: "Cerrado · abre mañana a las 10:30 AM",
  };
}

function ResponsiveImage({
  image,
  alt,
  className,
  sizes,
  priority = false,
  eager = false,
}: {
  image: keyof typeof imageDimensions;
  alt: string;
  className: string;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
}) {
  const dimensions = imageDimensions[image];
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/media/${image}-640.avif 640w, /media/${image}-1200.avif 1200w`}
        sizes={sizes}
      />
      <img
        className={className}
        src={`/media/${image}-1200.jpg`}
        srcSet={`/media/${image}-640.jpg 640w, /media/${image}-1200.jpg 1200w`}
        sizes={sizes}
        width={dimensions.width}
        height={dimensions.height}
        alt={alt}
        loading={priority || eager ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onError={(event) => {
          const failedImage = event.currentTarget;
          failedImage.parentElement?.querySelector("source")?.remove();
          failedImage.srcset = "";
          failedImage.src = `/media/${image}-640.jpg`;
        }}
      />
    </picture>
  );
}

function MenuCard({ item, language }: { item: MenuItem; language: Language }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `menu-item-${item.id}-details`;
  return (
    <article className={`menu-card${expanded ? " is-open" : ""}`}>
      <div className="menu-card-image-wrap">
        {item.id.startsWith("side") ? null : <span className="menu-number">#{item.id}</span>}
        <ResponsiveImage
          image={item.image}
          alt={item.name[language]}
          className="menu-card-image"
          sizes="(max-width: 720px) 88vw, (max-width: 1100px) 44vw, 30vw"
          eager
        />
      </div>
      <button
        className="menu-card-summary"
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => {
          setExpanded((current) => !current);
          if (!expanded) trackConversion("menu_item_open", { item: item.id });
        }}
      >
        <span className="menu-card-name">{item.name[language]}</span>
        <span className="menu-card-price">{item.price}</span>
        <span className="chevron" aria-hidden="true">⌄</span>
      </button>
      <div className="menu-card-details" id={detailsId} hidden={!expanded}>
        <p>{item.description[language]}</p>
        <ul aria-label={language === "en" ? "Included" : "Incluye"}>
          {item.ingredients.map((ingredient, index) => (
            <li className={index === 0 ? "highlight" : ""} key={ingredient}>
              {(ingredientLabels[ingredient] ?? { en: ingredient, es: ingredient })[language]}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function TaqueriaSite() {
  const [language, setLanguage] = useState<Language>("en");
  const [openCategories, setOpenCategories] = useState<Record<MenuCategory, boolean>>({
    single: false,
    combos: false,
    sides: false,
  });
  const [meatsExpanded, setMeatsExpanded] = useState(false);
  const [openStatus, setOpenStatus] = useState(getOpenStatus);
  const popularItems = useMemo(
    () => ["11", "13", "16"].map((id) => menuItems.find((item) => item.id === id)!),
    [],
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const timer = window.setInterval(() => setOpenStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const text = {
    en: {
      menu: "Menu",
      drinks: "Drinks",
      meats: "Meats",
      visit: "Visit",
      eyebrow: "Tulsa food truck · Pickup only",
      headline: "Taqueria California",
      subhead: "Fresh Mexican food made daily in Tulsa, Oklahoma.",
      call: "Call to Order",
      directions: "Get Directions",
      viewMenu: "View Menu",
      popular: "Popular Picks",
      menuIntro: "Start with customer favorites or open a category to see the complete menu.",
      drinksHeading: "Aguas Frescas",
      drinksKicker: "Made fresh daily",
      drinksIntro: "Traditional Mexican aguas frescas, blended fresh in house and served ice cold.",
      meatsIntro: "Choose your favorite protein for tacos, burritos, tortas, quesadillas, plates, and more.",
      location: "Location",
      hours: "Hours",
      pickup: "Pickup only",
      pickupNote: "We do not deliver—call ahead and come see us.",
      mondayThursday: "Mon – Thu",
      fridaySaturday: "Fri – Sat",
      sunday: "Sunday",
      viewGoogle: "View on Google",
      languageLabel: "Cambiar a Español",
    },
    es: {
      menu: "Menú",
      drinks: "Bebidas",
      meats: "Carnes",
      visit: "Visítanos",
      eyebrow: "Food truck en Tulsa · Solo para recoger",
      headline: "Taqueria California",
      subhead: "Comida mexicana fresca, preparada todos los días en Tulsa, Oklahoma.",
      call: "Llama para Ordenar",
      directions: "Cómo Llegar",
      viewMenu: "Ver Menú",
      popular: "Los Favoritos",
      menuIntro: "Empieza con los favoritos o abre una categoría para ver el menú completo.",
      drinksHeading: "Aguas Frescas",
      drinksKicker: "Hechas frescas a diario",
      drinksIntro: "Aguas frescas mexicanas tradicionales, preparadas en casa y servidas bien frías.",
      meatsIntro: "Elige tu carne favorita para tacos, burritos, tortas, quesadillas, platos y más.",
      location: "Ubicación",
      hours: "Horario",
      pickup: "Solo para recoger",
      pickupNote: "No hacemos entregas—llama con anticipación y ven a visitarnos.",
      mondayThursday: "Lun – Jue",
      fridaySaturday: "Vie – Sáb",
      sunday: "Domingo",
      viewGoogle: "Ver en Google",
      languageLabel: "Switch to English",
    },
  }[language];

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="top-nav" aria-label={language === "en" ? "Primary navigation" : "Navegación principal"}>
        <a className="brand-link" href="#top" aria-label="Taqueria California home">
          <img src="/media/logo-128.png" width="40" height="40" alt="" />
        </a>
        <div className="nav-links">
          <a href="#menu">{text.menu}</a>
          <a href="#drinks">{text.drinks}</a>
          <a href="#meats">{text.meats}</a>
          <a href="#visit">{text.visit}</a>
        </div>
        <button
          className="language-toggle"
          type="button"
          aria-label={text.languageLabel}
          onClick={() => setLanguage((current) => (current === "en" ? "es" : "en"))}
        >
          {language === "en" ? "ES" : "EN"}
        </button>
      </nav>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{text.eyebrow}</p>
            <h1 id="hero-title">{text.headline}</h1>
            <p className="hero-subhead">{text.subhead}</p>
            <p className={`open-status ${openStatus.isOpen ? "open" : "closed"}`} aria-live="polite">
              <span aria-hidden="true" /> {openStatus[language]}
            </p>
            <div className="hero-actions">
              <a className="button primary" href={phoneHref} onClick={() => trackConversion("call_click", { location: "hero" })}>
                {text.call}
              </a>
              <a className="button secondary" href="#menu" onClick={() => trackConversion("menu_click", { location: "hero" })}>
                {text.viewMenu}
              </a>
              <a className="text-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("directions_click", { location: "hero" })}>
                {text.directions} →
              </a>
            </div>
          </div>
          <div className="hero-image-wrap">
            <ResponsiveImage image="truck" alt="Taqueria California food truck in Tulsa" className="hero-image" sizes="(max-width: 800px) 92vw, 48vw" priority />
          </div>
        </section>

        <section className="dark-section menu-section" id="menu" aria-labelledby="menu-title">
          <div className="section-heading">
            <p className="section-kicker">{language === "en" ? "Fresh every day" : "Fresco todos los días"}</p>
            <h2 id="menu-title">{text.menu}</h2>
            <p>{text.menuIntro}</p>
          </div>

          <h3 className="popular-heading">{text.popular}</h3>
          <div className="popular-grid">
            {popularItems.map((item) => (
              <article className="popular-card" key={item.id}>
                <div className="popular-image-wrap">
                  <span className="popular-badge">#{item.id} {language === "en" ? "Popular" : "Favorito"}</span>
                  <ResponsiveImage image={item.image} alt={item.name[language]} className="popular-image" sizes="(max-width: 800px) 88vw, 30vw" eager />
                </div>
                <div className="popular-body">
                  <h4>{item.name[language]}</h4>
                  <p>{item.description[language]}</p>
                  <strong>{item.price}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="menu-categories">
            {(Object.keys(categoryLabels) as MenuCategory[]).map((category) => {
              const expanded = openCategories[category];
              const panelId = `menu-category-${category}`;
              return (
                <div className="menu-category" key={category}>
                  <button
                    className="category-toggle"
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpenCategories((current) => ({ ...current, [category]: !current[category] }));
                      if (!expanded) trackConversion("menu_category_open", { category });
                    }}
                  >
                    <span>{categoryLabels[category][language]}</span>
                    <span className="chevron" aria-hidden="true">⌄</span>
                  </button>
                  <div className="menu-grid" id={panelId} hidden={!expanded}>
                    {expanded
                      ? menuItems.filter((item) => item.category === category).map((item) => (
                          <MenuCard item={item} language={language} key={item.id} />
                        ))
                      : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="dark-section drinks-section" id="drinks" aria-labelledby="drinks-title">
          <div className="section-heading">
            <p className="section-kicker">{text.drinksKicker}</p>
            <h2 id="drinks-title">{text.drinksHeading}</h2>
            <p>{text.drinksIntro}</p>
          </div>

          <div className="drinks-grid">
            {drinks.map((drink) => (
              <article className="drink-card" key={drink.id}>
                <div className="drink-image-wrap">
                  <ResponsiveImage
                    image={drink.image}
                    alt={drink.name[language]}
                    className="drink-image"
                    sizes="(max-width: 720px) 88vw, 44vw"
                  />
                </div>
                <div className="drink-body">
                  <h3>{drink.name[language]}</h3>
                  <p>{drink.description[language]}</p>
                  <strong>{drink.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dark-section meats-section" id="meats" aria-labelledby="meats-title">
          <button className="meats-toggle" type="button" aria-expanded={meatsExpanded} aria-controls="meats-list" onClick={() => setMeatsExpanded((current) => !current)}>
            <span>
              <span className="section-kicker">{language === "en" ? "Your choice" : "Tu elección"}</span>
              <strong id="meats-title">{text.meats}</strong>
            </span>
            <span className="chevron" aria-hidden="true">⌄</span>
          </button>
          <p className="meats-intro">{text.meatsIntro}</p>
          <ol className="meats-list" id="meats-list" hidden={!meatsExpanded}>
            {meats.map((meat, index) => (
              <li key={meat.name.es}>
                <span className="meat-index">{String(index + 1).padStart(2, "0")}</span>
                <span className={`meat-type ${meat.tone}`}>{meat.type[language]}</span>
                <strong>{meat.name[language]}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-title">
          <div className="visit-info">
            <div className="section-heading light">
              <p className="section-kicker">Tulsa, Oklahoma</p>
              <h2 id="visit-title">{text.visit}</h2>
            </div>
            <div className="visit-card">
              <h3>{text.location}</h3>
              <p>11 N Lewis Ave<br />Tulsa, OK 74110</p>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("directions_click", { location: "visit" })}>
                {text.viewGoogle} →
              </a>
            </div>
            <div className="visit-card">
              <h3>{text.hours}</h3>
              <p className={`inline-status ${openStatus.isOpen ? "open" : "closed"}`}>{openStatus[language]}</p>
              <table>
                <tbody>
                  <tr><th scope="row">{text.mondayThursday}</th><td>10:30 AM – 10:00 PM</td></tr>
                  <tr><th scope="row">{text.fridaySaturday}</th><td>10:30 AM – 11:00 PM</td></tr>
                  <tr><th scope="row">{text.sunday}</th><td>10:30 AM – 10:00 PM</td></tr>
                </tbody>
              </table>
            </div>
            <div className="visit-card pickup-card">
              <h3>{text.pickup}</h3>
              <p>{text.pickupNote}</p>
              <a href={phoneHref} onClick={() => trackConversion("call_click", { location: "visit" })}>{phoneDisplay}</a>
            </div>
          </div>
          <div className="map-wrap">
            <iframe title="Map to Taqueria California in Tulsa, Oklahoma" src="https://www.google.com/maps?q=11+N+Lewis+Ave,+Tulsa,+OK+74110&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      </main>

      <footer>
        <img src="/media/logo-128.png" width="44" height="44" alt="" />
        <p>© {new Date().getFullYear()} Taqueria California LLC · Tulsa, OK</p>
        <a href={supportEmailHref} onClick={() => trackConversion("email_click", { location: "footer" })}>{supportEmail}</a>
      </footer>

      <div className="mobile-actions" aria-label={language === "en" ? "Quick actions" : "Acciones rápidas"}>
        <a href={phoneHref} onClick={() => trackConversion("call_click", { location: "mobile_bar" })}>{language === "en" ? "Call" : "Llamar"}</a>
        <a href="#menu" onClick={() => trackConversion("menu_click", { location: "mobile_bar" })}>{text.menu}</a>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("directions_click", { location: "mobile_bar" })}>{language === "en" ? "Directions" : "Cómo llegar"}</a>
      </div>
    </div>
  );
}
