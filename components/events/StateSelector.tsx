"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";

type Country = {
  name: string;
  code: string;
  subdivisions: string[];
};

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
    name: "Ghana",
    code: "GH",
    subdivisions: [
      "Ashanti",
      "Brong-Ahafo",
      "Central",
      "Eastern",
      "Greater Accra",
      "Northern",
      "Upper East",
      "Upper West",
      "Volta",
      "Western",
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
];

export default function StateSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (state: string) => void;
}) {
  const [country, setCountry] = useState("");
  const [subdivision, setSubdivision] = useState(value || "");

  const selectedCountry = useMemo(
    () => COUNTRIES.find((item) => item.code === country),
    [country]
  );

  useEffect(() => {
    if (value && value !== subdivision) {
      setSubdivision(value);
    }
  }, [value, subdivision]);

  const handleCountryChange = (code: string) => {
    setCountry(code);
    setSubdivision("");
    onChange("");
  };

  const handleSubdivisionChange = (state: string) => {
    setSubdivision(state);

    if (!state) {
      onChange("");
      return;
    }

    onChange(
      selectedCountry
        ? `${selectedCountry.name} — ${state}`
        : state
    );
  };

  return (
    <div className="group relative w-full sm:w-auto">
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute -inset-1
          rounded-[17px]
          bg-[#7C3AED]/10
          opacity-0
          blur-lg
          transition-opacity duration-300
          group-focus-within:opacity-100
        "
      />

      {/* Controls */}
      <div
        className="
          relative
          flex h-11 w-full
          items-center
          rounded-[14px]
          border border-black/[0.08]
          bg-white
          shadow-[0_8px_25px_rgba(0,0,0,0.04)]
          transition-all duration-200
          group-hover:border-black/[0.13]
          group-focus-within:border-[#7C3AED]/30
          group-focus-within:shadow-[0_10px_30px_rgba(124,58,237,0.08)]
          sm:w-auto
        "
      >
        {/* Location icon */}
        <div
          className="
            pointer-events-none
            ml-3.5
            flex h-6 w-6 shrink-0
            items-center justify-center
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

        {/* Country */}
        <div className="relative h-full">
          <select
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            aria-label="Filter events by country"
            className="
              relative z-10
              h-full
              w-[135px]
              cursor-pointer
              appearance-none
              bg-transparent
              px-2.5
              pr-8
              text-[11px]
              font-medium
              text-[#111014]
              outline-none
            "
          >
            <option value="">All countries</option>

            {COUNTRIES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={12}
            className="
              pointer-events-none
              absolute right-2
              top-1/2
              z-20
              -translate-y-1/2
              text-black/30
            "
          />
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-black/[0.08]" />

        {/* State / Province / Region */}
        <div className="relative h-full">
          <select
            value={subdivision}
            onChange={(e) =>
              handleSubdivisionChange(e.target.value)
            }
            disabled={!selectedCountry}
            aria-label="Filter events by state, province or region"
            className="
              relative z-10
              h-full
              w-[150px]
              cursor-pointer
              appearance-none
              bg-transparent
              px-2.5
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
                ? "All regions"
                : "Select country"}
            </option>

            {selectedCountry?.subdivisions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={12}
            className="
              pointer-events-none
              absolute right-2
              top-1/2
              z-20
              -translate-y-1/2
              text-black/30
            "
          />
        </div>
      </div>
    </div>
  );
}