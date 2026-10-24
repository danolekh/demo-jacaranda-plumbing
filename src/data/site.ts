// Everything the site says lives here, so a new client is mostly a new copy of this file.
// Jacaranda Plumbing & Gas is a made-up business for a demo. The phone number is an
// ACMA number reserved for fiction, and the licence and ABN are placeholders.

export const business = {
  name: "Jacaranda Plumbing & Gas",
  short: "Jacaranda",
  base: "Ashgrove",
  city: "Brisbane",
  region: "QLD",
  phone: "0491 570 156",
  phoneHref: "tel:+61491570156",
  hours: "Open 24/7, including public holidays",
  officeHours: "7am to 5pm, Monday to Friday",
  callbackPromise: "We ring back within the hour, 7am to 7pm.",
  licence: "QBCC Licence 0000000",
  abn: "ABN 00 000 000 000",
  url: "https://jacaranda-plumbing.danolekh.com",
  // Set a Google Tag Manager container ID and the dataLayer events below reach GA4 and Google Ads.
  gtmId: null as string | null,
};

export type ServiceSlug = "hot-water-systems" | "blocked-drains" | "gas-fitting" | "emergency-plumber";

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** The line used in the big list on the home page. */
  listName: string;
  /** Short value shown at the right end of the list row. */
  note: string;
  title: string;
  description: string;
  /** The page title as people search it. */
  h1: string;
  /** The plain-spoken line that opens the page's first section. */
  hook: string;
  /** The one word cropped across the first screen. */
  word: string;
  /** One sentence under the h1 on the first screen. */
  short: string;
  lead: string;
  statement: string;
  jobs: { name: string; value: string }[];
  photo: PhotoKey;
  photoAlt: string;
  photoCaption: string;
  faq: string[];
}

export type PhotoKey = "jacaranda" | "queenslander" | "drainMachine" | "copperTorch" | "lagPoster";

export const services: Service[] = [
  {
    slug: "hot-water-systems",
    name: "Hot water systems",
    listName: "Hot water systems",
    note: "Most swapped same day",
    title: "Hot water systems Brisbane | Repairs and replacements | Jacaranda Plumbing & Gas",
    description:
      "No hot water? We repair and replace electric, gas, solar and heat pump hot water systems across Brisbane's north and west, most on the same day.",
    h1: "Hot water systems, Brisbane",
    hook: "No hot water? Sorted today.",
    word: "water",
    short: "Electric, gas, solar and heat pump systems. Most like-for-like swaps are done the same day.",
    lead: "We repair and replace electric, gas, solar and heat pump hot water systems across Brisbane's north and west. Most like-for-like swaps are done the same day.",
    statement:
      "If your system is over ten years old and the tank is leaking, it's time for a new one. If it's younger, it's often a thermostat, an element or a valve, and we carry those in the van.",
    jobs: [
      { name: "Electric storage, 250 litres, like-for-like", value: "Same day" },
      { name: "Gas continuous flow, Rinnai and Rheem", value: "Same day" },
      { name: "Heat pump, supply and install", value: "2 to 3 days" },
      { name: "Solar boosting and valve repairs", value: "Same day" },
      { name: "Thermostats, elements and relief valves", value: "On the van" },
      { name: "Tempering valve checks", value: "On the van" },
    ],
    photo: "lagPoster",
    photoAlt: "A 1940s British poster showing a woman wrapping a hot water tank, with the words Lag to keep heat in",
    photoCaption: "Lagging pipes and tanks, a wartime poster from Britain's Ministry of Fuel and Power.",
    faq: ["repair-or-replace", "brands", "fixed-price", "how-fast"],
  },
  {
    slug: "blocked-drains",
    name: "Blocked drains",
    listName: "Blocked drains",
    note: "Camera and jetter",
    title: "Blocked drains Brisbane | CCTV camera and jet clearing | Jacaranda Plumbing & Gas",
    description:
      "Blocked sewer or stormwater drain? We find the cause with a drain camera, clear it with a high-pressure jetter and show you the footage. Brisbane north and west.",
    h1: "Blocked drains, Brisbane",
    hook: "Blocked drain? We find out why.",
    word: "drains",
    short: "Camera first, then a high-pressure jetter, and the footage sent to your phone.",
    lead: "We put a camera down the line, clear it with a high-pressure jetter and show you the footage, so you know whether it will come back.",
    statement:
      "In older suburbs like Ashgrove, Paddington and Red Hill, most blockages we clear are tree roots in clay sewer pipes. Jacarandas, figs and umbrella trees all find the joints.",
    jobs: [
      { name: "Sewer blockages, toilet and shower", value: "Same day" },
      { name: "Kitchen sink and grease build-up", value: "Same day" },
      { name: "Tree roots in clay pipes", value: "Camera first" },
      { name: "Stormwater and downpipe blockages", value: "Storm season" },
      { name: "CCTV drain camera inspection", value: "Footage emailed" },
      { name: "Pipe relining and repairs", value: "Quoted on site" },
    ],
    photo: "drainMachine",
    photoAlt: "A plumber feeding a drain cleaning machine cable into a sewer access point",
    photoCaption: "Clearing a sewer line with a drain machine.",
    faq: ["roots", "fixed-price", "how-fast", "call-out"],
  },
  {
    slug: "gas-fitting",
    name: "Gas fitting",
    listName: "Gas fitting",
    note: "Mains and bottled",
    title: "Gas fitter Brisbane | Cooktops, hot water, leaks | Jacaranda Plumbing & Gas",
    description:
      "Licensed gasfitters for Brisbane homes: cooktop and oven connections, gas hot water, BBQ points, leak detection and compliance certificates.",
    h1: "Gas fitting, Brisbane",
    hook: "Gas work, done safely.",
    word: "gas",
    short: "Cooktops, gas hot water, BBQ points and leaks, with a compliance certificate on every job.",
    lead: "Cooktops, ovens, gas hot water, BBQ points and heaters, on mains gas or bottled LPG. Every job finishes with a compliance certificate.",
    statement:
      "Smell gas? Turn it off at the meter or the bottle, open the windows, don't touch a switch, and call us from outside. We come out at any hour for a gas leak.",
    jobs: [
      { name: "Cooktop and oven connections", value: "Next day" },
      { name: "Gas hot water installs", value: "Same day" },
      { name: "BBQ and outdoor heater bayonets", value: "Next day" },
      { name: "Gas leak detection and repair", value: "24/7" },
      { name: "LPG bottle changeover setups", value: "Next day" },
      { name: "Compliance certificates", value: "Every job" },
    ],
    photo: "copperTorch",
    photoAlt: "A blue torch flame soldering a joint on a copper pipe",
    photoCaption: "Soldering a copper joint.",
    faq: ["gas-licence", "fixed-price", "after-hours", "call-out"],
  },
  {
    slug: "emergency-plumber",
    name: "24/7 emergencies",
    listName: "24/7 emergencies",
    note: "Day or night",
    title: "Emergency plumber Brisbane 24/7 | Jacaranda Plumbing & Gas",
    description:
      "Burst pipe, overflowing toilet, gas leak or no water at 2am? Jacaranda Plumbing & Gas answers 24/7 across Brisbane's north and west.",
    h1: "Emergency plumber, Brisbane",
    hook: "Burst pipe at 2am? Call now.",
    word: "2am",
    short: "A real plumber answers day and night, and is usually at your door within the hour.",
    lead: "A real plumber answers day and night, tells you how to stop the water, and is usually at your door within the hour.",
    statement:
      "While you wait, turn the water off at the meter, usually near the front boundary by the footpath. If water is near power points, switch off the power at the board too.",
    jobs: [
      { name: "Burst and leaking pipes", value: "Within the hour" },
      { name: "Overflowing toilets and sewer", value: "Within the hour" },
      { name: "Gas leaks", value: "Within the hour" },
      { name: "No water or no hot water", value: "Tonight" },
      { name: "Storm water coming inside", value: "Tonight" },
      { name: "Leaking taps and showers", value: "Next morning" },
    ],
    photo: "queenslander",
    photoAlt: "A white two-storey Queenslander house with verandas and a picket fence in Brisbane",
    photoCaption: "A Queenslander in Brisbane.",
    faq: ["after-hours", "call-out", "how-fast", "pay"],
  },
];

/** The big list on the home page: the four service pages plus two jobs that go straight to a call. */
export const serviceList = [
  ...services.map((s) => ({ name: s.listName, note: s.note, href: `/${s.slug}/` })),
  { name: "Leaks and burst pipes", note: "Within the hour", href: "/emergency-plumber/" },
  { name: "Toilets, taps and showers", note: "Same day", href: "#enquire" },
];

export interface Suburb {
  name: string;
  minutes: number;
}

/** Drive times from the Ashgrove base, rounded. Grouped the way locals describe Brisbane. */
export const suburbGroups: { name: string; suburbs: Suburb[] }[] = [
  {
    name: "West",
    suburbs: [
      { name: "Ashgrove", minutes: 5 },
      { name: "Bardon", minutes: 8 },
      { name: "Red Hill", minutes: 8 },
      { name: "The Gap", minutes: 10 },
      { name: "Paddington", minutes: 10 },
      { name: "Toowong", minutes: 15 },
      { name: "Auchenflower", minutes: 15 },
      { name: "Milton", minutes: 15 },
    ],
  },
  {
    name: "North",
    suburbs: [
      { name: "Enoggera", minutes: 8 },
      { name: "Newmarket", minutes: 8 },
      { name: "Wilston", minutes: 10 },
      { name: "Grange", minutes: 10 },
      { name: "Alderley", minutes: 10 },
      { name: "Gaythorne", minutes: 10 },
      { name: "Mitchelton", minutes: 12 },
      { name: "Keperra", minutes: 15 },
      { name: "Everton Park", minutes: 15 },
      { name: "Lutwyche", minutes: 15 },
      { name: "Windsor", minutes: 15 },
      { name: "Stafford", minutes: 15 },
    ],
  },
  {
    name: "Inner city",
    suburbs: [
      { name: "Kelvin Grove", minutes: 10 },
      { name: "Herston", minutes: 15 },
      { name: "Petrie Terrace", minutes: 15 },
      { name: "Spring Hill", minutes: 18 },
      { name: "Brisbane City", minutes: 20 },
    ],
  },
];

export const steps = [
  {
    line: "First you call, day or night.",
    text: "A plumber answers, not a call centre. Tell us what's happening and we'll tell you how to stop the water while you wait.",
  },
  {
    line: "Then we agree the price.",
    text: "We look at the job and give you a fixed price before any work starts. If you'd rather not go ahead, you only pay the call-out.",
  },
  {
    line: "We fix it properly.",
    text: "Licensed plumbers and gasfitters, parts carried in the van, and a compliance certificate wherever the job needs one.",
  },
  {
    line: "We leave it cleaner.",
    text: "Drop sheets down, shoe covers on, old parts taken away, and photos of the finished work sent to your phone.",
  },
];

export interface Price {
  job: string;
  includes: string;
  when: string;
  price: string;
  service?: ServiceSlug;
}

export const prices: Price[] = [
  { job: "Call-out and first 30 minutes", includes: "Diagnosis, fixed quote, small repairs", when: "7am to 5pm weekdays", price: "$129" },
  { job: "After-hours call-out", includes: "Nights, weekends and public holidays", when: "24/7", price: "$249", service: "emergency-plumber" },
  { job: "Blocked drain clear", includes: "Camera check and jet clean, one access point", when: "Same day", price: "from $290", service: "blocked-drains" },
  { job: "CCTV drain inspection", includes: "Camera report with footage emailed to you", when: "Same day", price: "from $250", service: "blocked-drains" },
  { job: "Electric hot water, 250 litres", includes: "Supply, install, old tank taken away", when: "Usually same day", price: "from $1,690", service: "hot-water-systems" },
  { job: "Gas continuous flow hot water", includes: "Supply and install, like-for-like", when: "Usually same day", price: "from $1,950", service: "hot-water-systems" },
  { job: "Heat pump hot water", includes: "Supply, install and rebate paperwork", when: "2 to 3 days", price: "from $3,900", service: "hot-water-systems" },
  { job: "Gas cooktop connection", includes: "Connection, leak test, compliance certificate", when: "Next day", price: "from $220", service: "gas-fitting" },
  { job: "Leaking tap repair", includes: "Washers or cartridge, per tap", when: "Same day", price: "from $95" },
];

export const faqs: Record<string, { q: string; a: string }> = {
  "call-out": {
    q: "Do you charge a call-out fee?",
    a: "Yes, $129 on weekdays and $249 after hours. It covers the trip, finding the problem and the first 30 minutes, and small jobs are often finished inside it.",
  },
  "fixed-price": {
    q: "Will I know the price before you start?",
    a: "Always. We give you a fixed price once we've seen the job, and that's what you pay, even if it takes us longer than we thought.",
  },
  "how-fast": {
    q: "How fast can you get here?",
    a: "Most homes in our area are 5 to 20 minutes from our Ashgrove base. Emergencies come first, and most other jobs are booked the same day or the next morning.",
  },
  "after-hours": {
    q: "Do you really come out at night?",
    a: "Yes. The phone is answered 24/7, including public holidays, and a licensed plumber is on call every night.",
  },
  brands: {
    q: "Which hot water brands do you work on?",
    a: "Rheem, Rinnai, Dux, Thermann, Stiebel Eltron and most others, whether it's electric, gas, solar or a heat pump.",
  },
  "repair-or-replace": {
    q: "Should I repair or replace my hot water system?",
    a: "If the tank itself is leaking, it needs replacing. If the system is under ten years old and it's a thermostat, element or valve, a repair usually makes sense, and we'll tell you which.",
  },
  roots: {
    q: "How do I know if it's tree roots?",
    a: "Gurgling toilets, slow drains after rain and a wet patch on the lawn are the usual signs. Our camera shows it for certain, and you get the footage.",
  },
  "gas-licence": {
    q: "Are you licensed for gas work?",
    a: "Yes. Every gas job is done by a licensed gasfitter and ends with a compliance certificate for your records.",
  },
  pay: {
    q: "How do I pay?",
    a: "By card on the spot, by bank transfer, or on invoice if you're a property manager or landlord.",
  },
  landlords: {
    q: "Do you work for landlords and property managers?",
    a: "Yes. We arrange access with tenants, send photos of the work and invoice the agency directly.",
  },
  clean: {
    q: "Will you make a mess?",
    a: "No. Drop sheets go down, shoe covers go on, and old parts leave with us. You get photos of the finished job.",
  },
  outside: {
    q: "My suburb isn't on your list. Can you still come?",
    a: "Usually, yes. If you're within about 30 minutes of Ashgrove, give us a ring and we'll tell you straight away.",
  },
};

export const homeFaq = [
  "call-out",
  "fixed-price",
  "how-fast",
  "after-hours",
  "repair-or-replace",
  "roots",
  "gas-licence",
  "brands",
  "clean",
  "landlords",
  "pay",
  "outside",
];

export const enquiryServices = [
  "Hot water",
  "Blocked drain",
  "Gas fitting",
  "Leak or burst pipe",
  "Toilet, tap or shower",
  "Something else",
];
