"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

type Country = {
  name: string;
  code: string;
  subdivisions: string[];
};

/* ===============================================================
   INTERNATIONAL LOCATION DATA
   =============================================================== */

const COUNTRIES: Country[] = [
  {
    name: "Nigeria",
    code: "NG",
    subdivisions: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
      "Federal Capital Territory",
    ],
  },

  {
    name: "Ghana",
    code: "GH",
    subdivisions: [
      "Ahafo",
      "Ashanti",
      "Bono",
      "Bono East",
      "Central",
      "Eastern",
      "Greater Accra",
      "North East",
      "Northern",
      "Oti",
      "Savannah",
      "Upper East",
      "Upper West",
      "Volta",
      "Western",
      "Western North",
    ],
  },

  {
    name: "Kenya",
    code: "KE",
    subdivisions: [
      "Baringo",
      "Bomet",
      "Bungoma",
      "Busia",
      "Elgeyo-Marakwet",
      "Embu",
      "Garissa",
      "Homa Bay",
      "Isiolo",
      "Kajiado",
      "Kakamega",
      "Kericho",
      "Kiambu",
      "Kilifi",
      "Kirinyaga",
      "Kisii",
      "Kisumu",
      "Kitui",
      "Kwale",
      "Laikipia",
      "Lamu",
      "Machakos",
      "Makueni",
      "Mandera",
      "Marsabit",
      "Meru",
      "Migori",
      "Mombasa",
      "Murang'a",
      "Nairobi",
      "Nakuru",
      "Nandi",
      "Narok",
      "Nyamira",
      "Nyandarua",
      "Nyeri",
      "Samburu",
      "Siaya",
      "Taita-Taveta",
      "Tana River",
      "Tharaka-Nithi",
      "Trans Nzoia",
      "Turkana",
      "Uasin Gishu",
      "Vihiga",
      "Wajir",
      "West Pokot",
    ],
  },

  {
    name: "South Africa",
    code: "ZA",
    subdivisions: [
      "Eastern Cape",
      "Free State",
      "Gauteng",
      "KwaZulu-Natal",
      "Limpopo",
      "Mpumalanga",
      "Northern Cape",
      "North West",
      "Western Cape",
    ],
  },

  {
    name: "Egypt",
    code: "EG",
    subdivisions: [
      "Cairo",
      "Alexandria",
      "Giza",
      "Qalyubia",
      "Port Said",
      "Suez",
      "Luxor",
      "Aswan",
      "Red Sea",
      "Dakahlia",
      "Gharbia",
      "Sharqia",
      "Faiyum",
      "Minya",
      "Assiut",
      "Sohag",
      "Qena",
      "Beheira",
    ],
  },

  {
    name: "Rwanda",
    code: "RW",
    subdivisions: [
      "Kigali",
      "Eastern Province",
      "Northern Province",
      "Southern Province",
      "Western Province",
    ],
  },

  {
    name: "Tanzania",
    code: "TZ",
    subdivisions: [
      "Arusha",
      "Dar es Salaam",
      "Dodoma",
      "Mwanza",
      "Zanzibar",
      "Mbeya",
      "Morogoro",
      "Tanga",
    ],
  },

  {
    name: "Uganda",
    code: "UG",
    subdivisions: [
      "Central Region",
      "Eastern Region",
      "Northern Region",
      "Western Region",
      "Kampala",
    ],
  },

  {
    name: "Morocco",
    code: "MA",
    subdivisions: [
      "Casablanca-Settat",
      "Rabat-Salé-Kénitra",
      "Marrakesh-Safi",
      "Fès-Meknès",
      "Tangier-Tetouan-Al Hoceima",
      "Souss-Massa",
      "Oriental",
      "Béni Mellal-Khénifra",
      "Drâa-Tafilalet",
      "Guelmim-Oued Noun",
      "Laâyoune-Sakia El Hamra",
      "Dakhla-Oued Ed-Dahab",
    ],
  },

  {
    name: "Ethiopia",
    code: "ET",
    subdivisions: [
      "Addis Ababa",
      "Afar",
      "Amhara",
      "Benishangul-Gumuz",
      "Dire Dawa",
      "Gambela",
      "Harari",
      "Oromia",
      "Sidama",
      "Somali",
      "SNNPR",
      "Tigray",
    ],
  },

  {
    name: "Senegal",
    code: "SN",
    subdivisions: [
      "Dakar",
      "Diourbel",
      "Fatick",
      "Kaffrine",
      "Kaolack",
      "Kédougou",
      "Kolda",
      "Louga",
      "Matam",
      "Saint-Louis",
      "Sédhiou",
      "Tambacounda",
      "Thiès",
      "Ziguinchor",
    ],
  },

  {
    name: "Côte d'Ivoire",
    code: "CI",
    subdivisions: [
      "Abidjan",
      "Yamoussoukro",
      "Bas-Sassandra",
      "Comoé",
      "Denguélé",
      "Gôh-Djiboua",
      "Lacs",
      "Lagunes",
      "Montagnes",
      "Sassandra-Marahoué",
      "Savanes",
      "Vallée du Bandama",
      "Woroba",
      "Zanzan",
    ],
  },

  {
    name: "United Kingdom",
    code: "GB",
    subdivisions: [
      "England",
      "Scotland",
      "Wales",
      "Northern Ireland",
    ],
  },

  {
    name: "United States",
    code: "US",
    subdivisions: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
      "District of Columbia",
    ],
  },

  {
    name: "Canada",
    code: "CA",
    subdivisions: [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Nova Scotia",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Northwest Territories",
      "Nunavut",
      "Yukon",
    ],
  },

  {
    name: "Mexico",
    code: "MX",
    subdivisions: [
      "Aguascalientes",
      "Baja California",
      "Baja California Sur",
      "Campeche",
      "Chiapas",
      "Chihuahua",
      "Coahuila",
      "Colima",
      "Durango",
      "Guanajuato",
      "Guerrero",
      "Hidalgo",
      "Jalisco",
      "Mexico City",
      "Mexico State",
      "Michoacán",
      "Morelos",
      "Nayarit",
      "Nuevo León",
      "Oaxaca",
      "Puebla",
      "Querétaro",
      "Quintana Roo",
      "San Luis Potosí",
      "Sinaloa",
      "Sonora",
      "Tabasco",
      "Tamaulipas",
      "Tlaxcala",
      "Veracruz",
      "Yucatán",
      "Zacatecas",
    ],
  },

  {
    name: "Brazil",
    code: "BR",
    subdivisions: [
      "Acre",
      "Alagoas",
      "Amapá",
      "Amazonas",
      "Bahia",
      "Ceará",
      "Distrito Federal",
      "Espírito Santo",
      "Goiás",
      "Maranhão",
      "Mato Grosso",
      "Mato Grosso do Sul",
      "Minas Gerais",
      "Pará",
      "Paraíba",
      "Paraná",
      "Pernambuco",
      "Piauí",
      "Rio de Janeiro",
      "Rio Grande do Norte",
      "Rio Grande do Sul",
      "Rondônia",
      "Roraima",
      "Santa Catarina",
      "São Paulo",
      "Sergipe",
      "Tocantins",
    ],
  },

  {
    name: "Argentina",
    code: "AR",
    subdivisions: [
      "Buenos Aires",
      "Catamarca",
      "Chaco",
      "Chubut",
      "Córdoba",
      "Corrientes",
      "Entre Ríos",
      "Formosa",
      "Jujuy",
      "La Pampa",
      "La Rioja",
      "Mendoza",
      "Misiones",
      "Neuquén",
      "Río Negro",
      "Salta",
      "San Juan",
      "San Luis",
      "Santa Cruz",
      "Santa Fe",
      "Santiago del Estero",
      "Tierra del Fuego",
      "Tucumán",
    ],
  },

  {
    name: "France",
    code: "FR",
    subdivisions: [
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Brittany",
      "Centre-Val de Loire",
      "Corsica",
      "Grand Est",
      "Hauts-de-France",
      "Île-de-France",
      "Normandy",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Pays de la Loire",
      "Provence-Alpes-Côte d'Azur",
    ],
  },

  {
    name: "Germany",
    code: "DE",
    subdivisions: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],
  },

  {
    name: "Italy",
    code: "IT",
    subdivisions: [
      "Abruzzo",
      "Aosta Valley",
      "Apulia",
      "Basilicata",
      "Calabria",
      "Campania",
      "Emilia-Romagna",
      "Friuli-Venezia Giulia",
      "Lazio",
      "Liguria",
      "Lombardy",
      "Marche",
      "Molise",
      "Piedmont",
      "Sardinia",
      "Sicily",
      "Tuscany",
      "Trentino-Alto Adige",
      "Umbria",
      "Veneto",
    ],
  },

  {
    name: "Spain",
    code: "ES",
    subdivisions: [
      "Andalusia",
      "Aragon",
      "Asturias",
      "Balearic Islands",
      "Basque Country",
      "Canary Islands",
      "Cantabria",
      "Castile and León",
      "Castilla-La Mancha",
      "Catalonia",
      "Extremadura",
      "Galicia",
      "La Rioja",
      "Madrid",
      "Murcia",
      "Navarre",
      "Valencian Community",
    ],
  },

  {
    name: "Netherlands",
    code: "NL",
    subdivisions: [
      "Drenthe",
      "Flevoland",
      "Friesland",
      "Gelderland",
      "Groningen",
      "Limburg",
      "North Brabant",
      "North Holland",
      "Overijssel",
      "South Holland",
      "Utrecht",
      "Zeeland",
    ],
  },

  {
    name: "Belgium",
    code: "BE",
    subdivisions: [
      "Brussels-Capital",
      "Flemish Brabant",
      "Walloon Brabant",
      "Antwerp",
      "East Flanders",
      "West Flanders",
      "Hainaut",
      "Liège",
      "Luxembourg",
      "Namur",
      "Limburg",
    ],
  },

  {
    name: "Switzerland",
    code: "CH",
    subdivisions: [
      "Aargau",
      "Appenzell Ausserrhoden",
      "Appenzell Innerrhoden",
      "Basel-Landschaft",
      "Basel-Stadt",
      "Bern",
      "Fribourg",
      "Geneva",
      "Glarus",
      "Graubünden",
      "Jura",
      "Lucerne",
      "Neuchâtel",
      "Nidwalden",
      "Obwalden",
      "Schaffhausen",
      "Schwyz",
      "Solothurn",
      "St. Gallen",
      "Thurgau",
      "Ticino",
      "Uri",
      "Valais",
      "Vaud",
      "Zug",
      "Zürich",
    ],
  },

  {
    name: "Portugal",
    code: "PT",
    subdivisions: [
      "Aveiro",
      "Beja",
      "Braga",
      "Bragança",
      "Castelo Branco",
      "Coimbra",
      "Évora",
      "Faro",
      "Guarda",
      "Leiria",
      "Lisbon",
      "Portalegre",
      "Porto",
      "Santarém",
      "Setúbal",
      "Viana do Castelo",
      "Vila Real",
      "Viseu",
      "Madeira",
      "Azores",
    ],
  },

  {
    name: "Ireland",
    code: "IE",
    subdivisions: [
      "Carlow",
      "Cavan",
      "Clare",
      "Cork",
      "Donegal",
      "Dublin",
      "Galway",
      "Kerry",
      "Kildare",
      "Kilkenny",
      "Laois",
      "Leitrim",
      "Limerick",
      "Longford",
      "Louth",
      "Mayo",
      "Meath",
      "Monaghan",
      "Offaly",
      "Roscommon",
      "Sligo",
      "Tipperary",
      "Waterford",
      "Westmeath",
      "Wexford",
      "Wicklow",
    ],
  },

  {
    name: "Australia",
    code: "AU",
    subdivisions: [
      "New South Wales",
      "Queensland",
      "South Australia",
      "Tasmania",
      "Victoria",
      "Western Australia",
      "Australian Capital Territory",
      "Northern Territory",
    ],
  },

  {
    name: "New Zealand",
    code: "NZ",
    subdivisions: [
      "Auckland",
      "Bay of Plenty",
      "Canterbury",
      "Gisborne",
      "Hawke's Bay",
      "Manawatū-Whanganui",
      "Marlborough",
      "Nelson",
      "Northland",
      "Otago",
      "Southland",
      "Taranaki",
      "Tasman",
      "Waikato",
      "Wellington",
      "West Coast",
    ],
  },

  {
    name: "United Arab Emirates",
    code: "AE",
    subdivisions: [
      "Abu Dhabi",
      "Ajman",
      "Dubai",
      "Fujairah",
      "Ras Al Khaimah",
      "Sharjah",
      "Umm Al Quwain",
    ],
  },

  {
    name: "Saudi Arabia",
    code: "SA",
    subdivisions: [
      "Riyadh",
      "Makkah",
      "Madinah",
      "Eastern Province",
      "Asir",
      "Tabuk",
      "Hail",
      "Northern Borders",
      "Jazan",
      "Najran",
      "Al Bahah",
      "Al Jawf",
      "Qassim",
    ],
  },

  {
    name: "Qatar",
    code: "QA",
    subdivisions: [
      "Doha",
      "Al Rayyan",
      "Al Wakrah",
      "Al Khor",
      "Umm Salal",
      "Al Daayen",
      "Al Shamal",
      "Al Shahaniya",
    ],
  },

  {
    name: "Kuwait",
    code: "KW",
    subdivisions: [
      "Al Asimah",
      "Hawalli",
      "Farwaniya",
      "Mubarak Al-Kabeer",
      "Ahmadi",
      "Jahra",
    ],
  },

  {
    name: "India",
    code: "IN",
    subdivisions: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
    ],
  },

  {
    name: "Pakistan",
    code: "PK",
    subdivisions: [
      "Balochistan",
      "Khyber Pakhtunkhwa",
      "Punjab",
      "Sindh",
      "Islamabad Capital Territory",
      "Gilgit-Baltistan",
      "Azad Jammu and Kashmir",
    ],
  },

  {
    name: "Bangladesh",
    code: "BD",
    subdivisions: [
      "Barisal",
      "Chattogram",
      "Dhaka",
      "Khulna",
      "Mymensingh",
      "Rajshahi",
      "Rangpur",
      "Sylhet",
    ],
  },

  {
    name: "Singapore",
    code: "SG",
    subdivisions: [
      "Central Region",
      "North Region",
      "North-East Region",
      "East Region",
      "West Region",
    ],
  },

  {
    name: "Malaysia",
    code: "MY",
    subdivisions: [
      "Johor",
      "Kedah",
      "Kelantan",
      "Malacca",
      "Negeri Sembilan",
      "Pahang",
      "Penang",
      "Perak",
      "Perlis",
      "Sabah",
      "Sarawak",
      "Selangor",
      "Terengganu",
      "Kuala Lumpur",
      "Labuan",
      "Putrajaya",
    ],
  },

  {
    name: "Indonesia",
    code: "ID",
    subdivisions: [
      "Aceh",
      "Bali",
      "Banten",
      "Bengkulu",
      "Central Java",
      "Central Kalimantan",
      "Central Sulawesi",
      "East Java",
      "East Kalimantan",
      "East Nusa Tenggara",
      "Gorontalo",
      "Jakarta",
      "Jambi",
      "Lampung",
      "Maluku",
      "North Kalimantan",
      "North Maluku",
      "North Sulawesi",
      "North Sumatra",
      "Papua",
      "Riau",
      "Riau Islands",
      "South Kalimantan",
      "South Sulawesi",
      "Southeast Sulawesi",
      "South Sumatra",
      "West Java",
      "West Kalimantan",
      "West Nusa Tenggara",
      "West Papua",
      "West Sulawesi",
      "West Sumatra",
      "Yogyakarta",
    ],
  },

  {
    name: "Japan",
    code: "JP",
    subdivisions: [
      "Hokkaido",
      "Aomori",
      "Iwate",
      "Miyagi",
      "Akita",
      "Yamagata",
      "Fukushima",
      "Ibaraki",
      "Tochigi",
      "Gunma",
      "Saitama",
      "Chiba",
      "Tokyo",
      "Kanagawa",
      "Niigata",
      "Toyama",
      "Ishikawa",
      "Fukui",
      "Yamanashi",
      "Nagano",
      "Gifu",
      "Shizuoka",
      "Aichi",
      "Mie",
      "Shiga",
      "Kyoto",
      "Osaka",
      "Hyogo",
      "Nara",
      "Wakayama",
      "Tottori",
      "Shimane",
      "Okayama",
      "Hiroshima",
      "Yamaguchi",
      "Tokushima",
      "Kagawa",
      "Ehime",
      "Kochi",
      "Fukuoka",
      "Saga",
      "Nagasaki",
      "Kumamoto",
      "Oita",
      "Miyazaki",
      "Kagoshima",
      "Okinawa",
    ],
  },

  {
    name: "South Korea",
    code: "KR",
    subdivisions: [
      "Seoul",
      "Busan",
      "Daegu",
      "Incheon",
      "Gwangju",
      "Daejeon",
      "Ulsan",
      "Sejong",
      "Gyeonggi",
      "Gangwon",
      "North Chungcheong",
      "South Chungcheong",
      "North Jeolla",
      "South Jeolla",
      "North Gyeongsang",
      "South Gyeongsang",
      "Jeju",
    ],
  },

  {
    name: "China",
    code: "CN",
    subdivisions: [
      "Beijing",
      "Shanghai",
      "Tianjin",
      "Chongqing",
      "Guangdong",
      "Jiangsu",
      "Zhejiang",
      "Sichuan",
      "Hubei",
      "Hunan",
      "Fujian",
      "Shandong",
      "Henan",
      "Hebei",
      "Anhui",
      "Jiangxi",
      "Liaoning",
      "Yunnan",
      "Guangxi",
      "Shanxi",
      "Shaanxi",
      "Gansu",
      "Inner Mongolia",
      "Xinjiang",
      "Tibet",
      "Qinghai",
      "Ningxia",
      "Jilin",
      "Heilongjiang",
      "Hainan",
      "Hong Kong",
      "Macau",
    ],
  },

  {
    name: "Thailand",
    code: "TH",
    subdivisions: [
      "Bangkok",
      "Chiang Mai",
      "Chiang Rai",
      "Chon Buri",
      "Phuket",
      "Krabi",
      "Khon Kaen",
      "Nakhon Ratchasima",
      "Nonthaburi",
      "Pathum Thani",
      "Pattaya",
      "Surat Thani",
    ],
  },

  {
    name: "Philippines",
    code: "PH",
    subdivisions: [
      "Metro Manila",
      "Cebu",
      "Davao",
      "Ilocos Region",
      "Cagayan Valley",
      "Central Luzon",
      "CALABARZON",
      "MIMAROPA",
      "Bicol Region",
      "Western Visayas",
      "Central Visayas",
      "Eastern Visayas",
      "Zamboanga Peninsula",
      "Northern Mindanao",
      "Davao Region",
      "SOCCSKSARGEN",
      "Caraga",
      "Bangsamoro",
      "Cordillera Administrative Region",
    ],
  },

  {
    name: "Turkey",
    code: "TR",
    subdivisions: [
      "Istanbul",
      "Ankara",
      "Izmir",
      "Bursa",
      "Antalya",
      "Adana",
      "Konya",
      "Gaziantep",
      "Mersin",
      "Diyarbakir",
      "Kayseri",
      "Eskisehir",
      "Samsun",
      "Trabzon",
    ],
  },

  {
    name: "Israel",
    code: "IL",
    subdivisions: [
      "Central District",
      "Haifa District",
      "Jerusalem District",
      "Northern District",
      "Southern District",
      "Tel Aviv District",
    ],
  },

  {
    name: "Greece",
    code: "GR",
    subdivisions: [
      "Attica",
      "Central Greece",
      "Central Macedonia",
      "Crete",
      "Eastern Macedonia and Thrace",
      "Epirus",
      "Ionian Islands",
      "North Aegean",
      "Peloponnese",
      "South Aegean",
      "Thessaly",
      "Western Greece",
      "Western Macedonia",
    ],
  },

  {
    name: "Austria",
    code: "AT",
    subdivisions: [
      "Burgenland",
      "Carinthia",
      "Lower Austria",
      "Upper Austria",
      "Salzburg",
      "Styria",
      "Tyrol",
      "Vorarlberg",
      "Vienna",
    ],
  },

  {
    name: "Sweden",
    code: "SE",
    subdivisions: [
      "Stockholm",
      "Västra Götaland",
      "Skåne",
      "Uppsala",
      "Östergötland",
      "Jönköping",
      "Halland",
      "Örebro",
      "Dalarna",
      "Gävleborg",
      "Värmland",
      "Västerbotten",
      "Norrbotten",
    ],
  },

  {
    name: "Norway",
    code: "NO",
    subdivisions: [
      "Oslo",
      "Rogaland",
      "Vestland",
      "Møre og Romsdal",
      "Trøndelag",
      "Nordland",
      "Troms og Finnmark",
      "Innlandet",
      "Vestfold og Telemark",
      "Agder",
      "Viken",
    ],
  },

  {
    name: "Denmark",
    code: "DK",
    subdivisions: [
      "Capital Region",
      "Central Denmark",
      "North Denmark",
      "Region Zealand",
      "Region of Southern Denmark",
    ],
  },

  {
    name: "Finland",
    code: "FI",
    subdivisions: [
      "Uusimaa",
      "Southwest Finland",
      "Satakunta",
      "Kanta-Häme",
      "Pirkanmaa",
      "Päijät-Häme",
      "Kymenlaakso",
      "South Karelia",
      "South Savo",
      "North Savo",
      "North Karelia",
      "Central Finland",
      "South Ostrobothnia",
      "Ostrobothnia",
      "Central Ostrobothnia",
      "North Ostrobothnia",
      "Kainuu",
      "Lapland",
      "Åland",
    ],
  },

  {
    name: "Poland",
    code: "PL",
    subdivisions: [
      "Lower Silesian",
      "Kuyavian-Pomeranian",
      "Lublin",
      "Lubusz",
      "Łódź",
      "Lesser Poland",
      "Masovian",
      "Opole",
      "Podlaskie",
      "Pomeranian",
      "Silesian",
      "Subcarpathian",
      "Świętokrzyskie",
      "Warmian-Masurian",
      "Greater Poland",
      "West Pomeranian",
    ],
  },

  {
    name: "Czech Republic",
    code: "CZ",
    subdivisions: [
      "Prague",
      "Central Bohemian",
      "South Bohemian",
      "Plzeň",
      "Karlovy Vary",
      "Ústí nad Labem",
      "Liberec",
      "Hradec Králové",
      "Pardubice",
      "Vysočina",
      "South Moravian",
      "Olomouc",
      "Zlín",
      "Moravian-Silesian",
    ],
  },

  {
    name: "Romania",
    code: "RO",
    subdivisions: [
      "Bucharest",
      "Alba",
      "Arad",
      "Argeș",
      "Bacău",
      "Bihor",
      "Brașov",
      "Cluj",
      "Constanța",
      "Dolj",
      "Iași",
      "Maramureș",
      "Mureș",
      "Prahova",
      "Sibiu",
      "Suceava",
      "Timiș",
    ],
  },

  {
    name: "Hungary",
    code: "HU",
    subdivisions: [
      "Budapest",
      "Baranya",
      "Bács-Kiskun",
      "Békés",
      "Borsod-Abaúj-Zemplén",
      "Csongrád-Csanád",
      "Fejér",
      "Győr-Moson-Sopron",
      "Hajdú-Bihar",
      "Heves",
      "Jász-Nagykun-Szolnok",
      "Komárom-Esztergom",
      "Nógrád",
      "Pest",
      "Somogy",
      "Szabolcs-Szatmár-Bereg",
      "Tolna",
      "Vas",
      "Veszprém",
      "Zala",
    ],
  },

  {
    name: "Ukraine",
    code: "UA",
    subdivisions: [
      "Kyiv",
      "Vinnytsia",
      "Volyn",
      "Dnipropetrovsk",
      "Donetsk",
      "Zhytomyr",
      "Zakarpattia",
      "Zaporizhzhia",
      "Ivano-Frankivsk",
      "Kirovohrad",
      "Lviv",
      "Mykolaiv",
      "Odesa",
      "Poltava",
      "Rivne",
      "Sumy",
      "Ternopil",
      "Kharkiv",
      "Kherson",
      "Khmelnytskyi",
      "Cherkasy",
      "Chernivtsi",
      "Chernihiv",
    ],
  },

  {
    name: "Russia",
    code: "RU",
    subdivisions: [
      "Moscow",
      "Saint Petersburg",
      "Moscow Oblast",
      "Krasnodar Krai",
      "Sverdlovsk Oblast",
      "Rostov Oblast",
      "Tatarstan",
      "Bashkortostan",
      "Nizhny Novgorod Oblast",
      "Samara Oblast",
      "Novosibirsk Oblast",
      "Chelyabinsk Oblast",
      "Krasnoyarsk Krai",
      "Perm Krai",
      "Voronezh Oblast",
    ],
  },
];

/* ===============================================================
   HELPERS
   =============================================================== */

function findCountryFromStoredValue(
  value: string
): Country | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  /*
   * Current event format:
   *
   * "Lagos, Nigeria"
   * "Kigali, Rwanda"
   * "Greater Accra, Ghana"
   */
  const matchingCountry = COUNTRIES.find((item) =>
    trimmed.endsWith(`, ${item.name}`)
  );

  if (matchingCountry) {
    return matchingCountry;
  }

  /*
   * Fallback for older events that may have only stored
   * the region/state name.
   */
  return COUNTRIES.find((item) =>
    item.subdivisions.includes(trimmed)
  );
}

function extractSubdivision(
  value: string,
  country: Country
): string {
  const suffix = `, ${country.name}`;

  if (value.endsWith(suffix)) {
    return value
      .slice(0, -suffix.length)
      .trim();
  }

  return value.trim();
}

function getRegionLabel(country: Country | undefined) {
  if (!country) {
    return "Region";
  }

  switch (country.code) {
    case "GB":
    case "AU":
    case "NZ":
      return "Region";

    case "CA":
      return "Province / Territory";

    case "US":
    case "NG":
    case "GH":
    case "KE":
    case "ZA":
      return "State / Province";

    default:
      return "State / Province / Region";
  }
}

/* ===============================================================
   COMPONENT
   =============================================================== */

export default function StateSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (state: string) => void;
}) {
  const [country, setCountry] = useState("");
  const [subdivision, setSubdivision] = useState("");

  const selectedCountry = useMemo(
    () =>
      COUNTRIES.find(
        (item) => item.code === country
      ),
    [country]
  );

  /*
   * Synchronize the selector with the value stored
   * by ExploreClient.
   *
   * Example:
   *
   * value = "Lagos, Nigeria"
   *
   * becomes:
   *
   * country = "NG"
   * subdivision = "Lagos"
   */
  useEffect(() => {
    if (!value) {
      setCountry("");
      setSubdivision("");
      return;
    }

    const matchedCountry =
      findCountryFromStoredValue(value);

    if (!matchedCountry) {
      setCountry("");
      setSubdivision(value);
      return;
    }

    const matchedSubdivision =
      extractSubdivision(
        value,
        matchedCountry
      );

    setCountry(matchedCountry.code);
    setSubdivision(matchedSubdivision);
  }, [value]);

  /*
   * Country changes.
   *
   * We intentionally clear the region because a
   * region from the previous country cannot be reused.
   */
  function handleCountryChange(
    code: string
  ) {
    setCountry(code);
    setSubdivision("");

    onChange("");
  }

  /*
   * Region/state changes.
   *
   * IMPORTANT:
   *
   * EventForm stores:
   *
   * "Lagos, Nigeria"
   *
   * Therefore Explore must also filter using:
   *
   * "Lagos, Nigeria"
   */
  function handleSubdivisionChange(
    nextSubdivision: string
  ) {
    setSubdivision(nextSubdivision);

    if (!nextSubdivision) {
      onChange("");
      return;
    }

    if (!selectedCountry) {
      onChange(nextSubdivision);
      return;
    }

    onChange(
      `${nextSubdivision}, ${selectedCountry.name}`
    );
  }

  const regionLabel =
    getRegionLabel(selectedCountry);

  return (
    <div className="w-full">
      <div
        className="
          flex
          w-full
          items-center
          overflow-hidden
          rounded-[14px]
          border
          border-black/[0.08]
          bg-white
          shadow-[0_8px_25px_rgba(0,0,0,0.04)]
          transition-all
          duration-200
          hover:border-black/[0.13]
          focus-within:border-[#7C3AED]/30
          focus-within:shadow-[0_10px_30px_rgba(124,58,237,0.08)]
        "
      >
        {/* =====================================================
            LOCATION ICON
        ===================================================== */}

        <div
          className="
            ml-3.5
            flex
            h-6
            w-6
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#7C3AED]/[0.07]
          "
        >
          <MapPin
            size={12}
            strokeWidth={2}
            className="text-[#7C3AED]"
          />
        </div>

        {/* =====================================================
            COUNTRY
        ===================================================== */}

        <div className="relative min-w-0 flex-1">
          <select
            value={country}
            onChange={(e) =>
              handleCountryChange(
                e.target.value
              )
            }
            aria-label="Filter events by country"
            className="
              h-11
              w-full
              min-w-0
              cursor-pointer
              appearance-none
              bg-transparent
              pl-3
              pr-8
              text-[11px]
              font-medium
              text-[#111014]
              outline-none
            "
          >
            <option value="">
              All countries
            </option>

            {COUNTRIES.map((item) => (
              <option
                key={item.code}
                value={item.code}
              >
                {item.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={12}
            className="
              pointer-events-none
              absolute
              right-2.5
              top-1/2
              -translate-y-1/2
              text-black/30
            "
          />
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className="h-5 w-px shrink-0 bg-black/[0.08]" />

        {/* =====================================================
            REGION / STATE
        ===================================================== */}

        <div className="relative min-w-0 flex-1">
          <select
            value={subdivision}
            onChange={(e) =>
              handleSubdivisionChange(
                e.target.value
              )
            }
            disabled={!selectedCountry}
            aria-label={`Filter events by ${regionLabel.toLowerCase()}`}
            className="
              h-11
              w-full
              min-w-0
              cursor-pointer
              appearance-none
              bg-transparent
              pl-3
              pr-8
              text-[11px]
              font-medium
              text-[#111014]
              outline-none
              disabled:cursor-not-allowed
              disabled:text-black/25
            "
          >
            <option value="">
              {selectedCountry
                ? `All ${regionLabel.toLowerCase()}s`
                : "Select country"}
            </option>

            {selectedCountry?.subdivisions.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <ChevronDown
            size={12}
            className="
              pointer-events-none
              absolute
              right-2.5
              top-1/2
              -translate-y-1/2
              text-black/30
            "
          />
        </div>
      </div>
    </div>
  );
}