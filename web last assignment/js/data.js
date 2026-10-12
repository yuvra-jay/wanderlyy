/**
 * Wanderly - Travel Application Data Store
 * Authentic tour packages, destinations, itineraries, and configurations
 */

const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 90.0, format: (amount) => `₹${Math.round(amount * 90.0).toLocaleString('en-IN')}` },
  EUR: { code: 'EUR', symbol: '€', rate: 1.0, format: (amount) => `€${Math.round(amount).toLocaleString()}` },
  GBP: { code: 'GBP', symbol: '£', rate: 0.86, format: (amount) => `£${Math.round(amount * 0.86).toLocaleString()}` }
};

const DESTINATIONS_DATA = [
  {
    id: 'agra',
    name: 'Agra & the Taj Mahal',
    badge: 'Iconic',
    tagline: 'Mughal Marvels & Living History',
    description: 'Explore the Taj Mahal, Agra Fort, and the remarkable legacy of the Mughal Empire.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    tourCount: 2,
    popularStyle: 'Cultural & Heritage Tours'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    badge: 'Royal India',
    tagline: 'Desert Forts & Colorful Cities',
    description: 'Discover Jaipur palaces, Jodhpur blue lanes, desert landscapes, and lakeside Udaipur.',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
    tourCount: 2,
    popularStyle: 'Heritage & Desert Journeys'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    badge: 'Nature Escape',
    tagline: 'Backwaters, Tea Hills & Coast',
    description: 'Cruise quiet backwaters, wander Munnar tea gardens, and unwind along the Malabar Coast.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tourCount: 2,
    popularStyle: 'Backwater & Wellness Retreats'
  },
  {
    id: 'goa',
    name: 'Goa',
    badge: 'Coastal Favorite',
    tagline: 'Sunlit Shores & Portuguese Heritage',
    description: 'Pair palm-lined beaches with colorful markets, historic churches, and Goan cuisine.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tourCount: 2,
    popularStyle: 'Coastal & Culture Stays'
  },
  {
    id: 'himalayas',
    name: 'The Indian Himalayas',
    badge: 'Mountain Escape',
    tagline: 'High Peaks & Himalayan Valleys',
    description: 'Take in dramatic mountain scenery, pine forests, and the culture of Himalayan towns.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tourCount: 2,
    popularStyle: 'Mountain & Nature Adventures'
  },
  {
    id: 'iceland',
    name: 'Iceland',
    badge: 'Popular',
    tagline: 'Land of Fire and Ice',
    description: 'Glacier lagoons, dancing auroras, thermal springs, and cascading waterfalls.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    tourCount: 14,
    popularStyle: 'Self-Drive & Guided Groups'
  },
  {
    id: 'norway',
    name: 'Norway',
    badge: 'Must Visit',
    tagline: 'Fjords & Arctic Lights',
    description: 'UNESCO fjords, historic wooden fishing villages, coastal voyages, and Tromsø.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    tourCount: 12,
    popularStyle: 'Train & Coastal Cruise'
  },
  {
    id: 'scotland',
    name: 'Scotland',
    badge: 'Classic',
    tagline: 'Highlands, Castles & Lochs',
    description: 'Rugged Isle of Skye, ancient clans, misty glens, and warm Scottish hospitality.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    tourCount: 9,
    popularStyle: 'Self-Drive & Escorted'
  },
  {
    id: 'scandinavia',
    name: 'Scandinavia',
    badge: 'Multi-Country',
    tagline: 'Norway, Sweden & Denmark',
    description: 'Cosmopolitan design capitals, scenic railways, archipelago sailing, and heritage.',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80',
    tourCount: 8,
    popularStyle: 'Scenic Rail & Guided Groups'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    badge: 'Scenic',
    tagline: 'Emerald Coast & Legends',
    description: 'Wild Atlantic Way, towering Cliffs of Moher, lively pubs, and Celtic castles.',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80',
    tourCount: 7,
    popularStyle: 'Self-Drive & Private Tours'
  },
  {
    id: 'alps',
    name: 'The Alps & Switzerland',
    badge: 'Scenic Rail',
    tagline: 'Fairytale Peaks & Glaciers',
    description: 'Iconic Glacier Express, towering Matterhorn, crystal lakes, and alpine chalets.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    tourCount: 6,
    popularStyle: 'Scenic Mountain Trains'
  },
  {
    id: 'lapland',
    name: 'Lapland',
    badge: 'Winter Wonderland',
    tagline: 'Glass Igloos & Aurora Nights',
    description: 'Reindeer sledding, starry aurora domes, snowy forests, and husky safaris.',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    tourCount: 5,
    popularStyle: 'Winter Aurora Escapes'
  },
  {
    id: 'italy',
    name: 'Italy & Lake Como',
    badge: 'Romantic',
    tagline: 'La Dolce Vita & Alpine Lakes',
    description: 'Renaissance art, tranquil northern lakes, vineyard hills, and coastal grandeur.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    tourCount: 5,
    popularStyle: 'Boutique Self-Drive'
  }
];

const TOUR_TYPES_DATA = [
  {
    id: 'self-drive',
    name: 'Self-Drive Packages',
    tagline: 'Freedom to explore at your own pace',
    description: 'Quality rental cars, custom GPS routes, pre-booked handpicked hotels, and 24/7 roadside assistance.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    perk: 'Rental car & GPS included'
  },
  {
    id: 'small-group',
    name: 'Guided Small Groups',
    tagline: 'Expert local guides & kindred travelers',
    description: 'Max 16 travelers per group. Gain exclusive local access, authentic storytelling, and stress-free transport.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    perk: 'Max 16 guests with local guide'
  },
  {
    id: 'train-cruise',
    name: 'Scenic Trains & Cruises',
    tagline: 'Unwind as iconic landscapes glide past',
    description: 'World-famous Flåm Railway, Glacier Express, and Norwegian coastal express ferries through dramatic fjords.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    perk: 'Panoramic class rail passes'
  },
  {
    id: 'private',
    name: 'Privately Guided Luxury',
    tagline: 'Bespoke journeys crafted for you',
    description: 'Your own private luxury vehicle, dedicated personal guide, flexible scheduling, and 5-star hand-picked stays.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    perk: '100% tailor-made luxury'
  }
];

const TOURS_DATA = [
  {
    id: 'nv-1004',
    title: 'Northern Lights Circle Tour',
    subTitle: "Iceland's Famous Ring Road & Ice Caves",
    destination: 'iceland',
    destinationName: 'Iceland',
    countryTag: 'Iceland',
    type: 'small-group',
    typeName: 'Guided Small Group',
    durationDays: 8,
    durationNights: 7,
    season: 'winter',
    seasonMonths: 'Sep – Mar',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.9,
    reviewCount: 312,
    priceEUR: 3606,
    originalPriceEUR: 3871,
    discountBadge: 'Save up to ₹50,000',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Travel the full circle of Iceland on this expertly guided small group tour. Hunt the northern lights in remote winter skies, walk behind frozen waterfalls, explore luminous blue crystal ice caves, and marvel at floating icebergs on Jökulsárlón Glacier Lagoon.',
    highlights: [
      'Complete journey around Iceland’s scenic Ring Road (Route 1)',
      'Multiple night aurora hunts away from light pollution',
      'Natural blue ice cave exploration in Vatnajökull glacier',
      'Jökulsárlón glacier lagoon & Diamond Beach icebergs',
      'Golden Circle: Gullfoss, Geysir, and Þingvellir National Park',
      'Max group size of 16 guests in premium heated mini-coach'
    ],
    included: [
      '7 nights accommodation in comfort-level countryside hotels with private bath',
      'Daily Scandinavian buffet breakfast',
      'Guided travel in modern mini-coach with professional English-speaking guide',
      'Guided glacier ice cave expedition with certified mountaineer & gear',
      'Northern lights briefing and dedicated nightly aurora scouting',
      'All national park entrance fees and taxes',
      '24/7 emergency support from Wanderly Reykjavík office'
    ],
    notIncluded: [
      'International flights to/from Keflavík Airport (KEF)',
      'Lunches and dinners not specified in itinerary',
      'Optional excursion admissions (Blue Lagoon, snowmobile)',
      'Personal travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Iceland & The Capital City',
        description: 'Arrive at Keflavík International Airport. Enjoy a scenic private transfer into Reykjavík, the northernmost capital. Check into your boutique hotel, explore the colorful harbor, and meet your guide in the evening for a welcome drink.',
        meals: 'Welcome drink',
        hotel: 'Center Hotels Plaza, Reykjavík'
      },
      {
        day: 2,
        title: 'The Golden Circle & Geothermal Wonders',
        description: 'Set out on the legendary Golden Circle route. Stand where Eurasian and North American tectonic plates diverge at Þingvellir National Park. See the boiling Strokkur geyser erupt 30 meters high and feel the mist of the thundering Gullfoss double waterfall.',
        meals: 'Breakfast included',
        hotel: 'Hotel South Coast, Selfoss'
      },
      {
        day: 3,
        title: 'South Coast Waterfalls & Reynisfjara Black Sands',
        description: 'Journey along the striking south shoreline. Walk behind the veil of Seljalandsfoss waterfall and marvel at Skógafoss. In the afternoon, visit Reynisfjara black sand beach with its dramatic basalt columns and towering sea stacks.',
        meals: 'Breakfast included',
        hotel: 'Hotel Kría, Vík'
      },
      {
        day: 4,
        title: 'Vatnajökull Blue Ice Cave & Diamond Beach',
        description: 'A highlight day! Board a specialized superjeep to enter a sparkling natural blue crystal ice cave beneath Europe’s largest glacier. Later, photograph crystalline icebergs washing onto the volcanic black sand of Diamond Beach.',
        meals: 'Breakfast included',
        hotel: 'Fosshótel Glacier Lagoon, Skaftafell'
      },
      {
        day: 5,
        title: 'The Dramatic East Fjords',
        description: 'Drive along narrow coastal roads carving through rugged mountains and quaint fishing villages in the East Fjords. Stop by French-heritage Seyðisfjörður with its famous rainbow-painted street.',
        meals: 'Breakfast included',
        hotel: 'Hótel Eyvindará, Egilsstaðir'
      },
      {
        day: 6,
        title: 'Lake Mývatn & Dimmuborgir Volcanic Fields',
        description: 'Explore the otherworldly volcanic landscapes of Lake Mývatn. Walk through the lava pillars of Dimmuborgir and watch steaming solfataras at Námaskarð geothermal area. Evening aurora hunt overlooking snow-draped volcanic peaks.',
        meals: 'Breakfast included',
        hotel: 'Fosshótel Mývatn, Mývatn'
      },
      {
        day: 7,
        title: 'Godafoss Waterfall & Historic Akureyri',
        description: 'Visit the majestic Goðafoss ("Waterfall of the Gods"). Stop in Akureyri, the northern capital, before scenic travel through horse valleys back towards western Iceland and Reykjavík.',
        meals: 'Breakfast included',
        hotel: 'Center Hotels Plaza, Reykjavík'
      },
      {
        day: 8,
        title: 'Blue Lagoon Geothermal Soak & Departure',
        description: 'Cap off your Icelandic adventure with relaxing soak in the mineral-rich milky blue waters of the Blue Lagoon. Transfer to Keflavík Airport for your onward flight with memories of a lifetime.',
        meals: 'Breakfast included',
        hotel: 'Departure day'
      }
    ],
    availableAddOns: [
      { id: 'blue-lagoon-comfort', name: 'Blue Lagoon Comfort Pass', priceEUR: 95, description: 'Silica mud mask, towel use, and first drink of your choice at in-water bar' },
      { id: 'glacier-snowmobile', name: 'Glacier Snowmobile Safari (1h)', priceEUR: 195, description: 'High-octane ride across the open icecap on Langjökull' },
      { id: 'aurora-superjeep', name: 'Nighttime Superjeep Aurora Hunt', priceEUR: 140, description: 'Specialized 4x4 into wilderness tracks with hot chocolate and photo guidance' }
    ]
  },
  {
    id: 'nv-176',
    title: 'Iceland Full Circle in 10 Days',
    subTitle: 'The Classic Self-Drive Expedition',
    destination: 'iceland',
    destinationName: 'Iceland',
    countryTag: 'Iceland',
    type: 'self-drive',
    typeName: 'Self-Drive',
    durationDays: 10,
    durationNights: 9,
    season: 'summer',
    seasonMonths: 'May – Sep',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.9,
    reviewCount: 428,
    priceEUR: 1991,
    originalPriceEUR: 2258,
    discountBadge: 'Save up to ₹50,000',
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520769945061-0a448c4471dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Embrace total freedom behind the wheel on this iconic 10-day Ring Road self-drive tour. Includes modern 4WD vehicle with collision damage waiver, pre-programmed GPS navigation, handpicked comfort countryside stays, and our custom travel app.',
    highlights: [
      'Full circumnavigation of Iceland on Route 1 at your own pace',
      'Rental 4x4 SUV with unlimited mileage and zero-deductible insurance',
      'South Coast waterfalls, Black Sand Beach, and Jökulsárlón ice lagoon',
      'Whale watching capital Húsavík & thermal Lake Mývatn',
      'Snæfellsnes Peninsula: Mount Kirkjufell and seal colonies',
      'Personalized digital itinerary and 24/7 local emergency roadside care'
    ],
    included: [
      '9 nights in handpicked hotels/country guesthouses with private bathroom',
      'Daily breakfast buffet',
      'Rental car (Category: 4WD SUV) for 9 days with unlimited mileage',
      'Premium CDW insurance, theft protection, and gravel protection',
      'In-car Wi-Fi hotspot and GPS navigation system',
      'Wanderly travel booklet, road map, and personalized digital guidebook'
    ],
    notIncluded: [
      'Fuel costs',
      'Airport transfer on arrival (rental car pickup at airport available)',
      'Optional excursions (whale watching, geothermal baths)'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Pick up Rental Car', description: 'Arrive at KEF airport, collect your 4x4 SUV, and drive through the volcanic Reykjanes UNESCO Geopark to Reykjavík.', meals: 'Breakfast next morning', hotel: 'Skuggi Hotel, Reykjavík' },
      { day: 2, title: 'The Iconic Golden Circle', description: 'Drive to Þingvellir National Park, Geysir geothermal field, and Gullfoss waterfall.', meals: 'Breakfast included', hotel: 'Hotel Selfoss' },
      { day: 3, title: 'Waterfalls & South Coast Vistas', description: 'Explore Seljalandsfoss, Skógafoss, and the roaring surf of Reynisfjara beach.', meals: 'Breakfast included', hotel: 'Hotel Vík í Mýrdal' },
      { day: 4, title: 'Glaciers & Iceberg Lagoons', description: 'Hike near Skaftafell glacier tongues and take an amphibian boat tour across Jökulsárlón lagoon.', meals: 'Breakfast included', hotel: 'Fosshótel Glacier Lagoon' },
      { day: 5, title: 'Scenic East Fjords', description: 'Wind along coastal cliffs, past dramatic sea stacks and peaceful fishing harbors.', meals: 'Breakfast included', hotel: 'Hótel Hérað, Egilsstaðir' },
      { day: 6, title: 'Mývatn & Dettifoss', description: 'Witness Dettifoss, the most powerful waterfall in Europe, and soak in Mývatn Nature Baths.', meals: 'Breakfast included', hotel: 'Hótel Laxá, Mývatn' },
      { day: 7, title: 'Whale Watching in Húsavík & Akureyri', description: 'Join an eco-friendly electric boat whale watching tour in Skjálfandi Bay before driving to Akureyri.', meals: 'Breakfast included', hotel: 'Hotel Kea, Akureyri' },
      { day: 8, title: 'Skagafjörður & North-West Valleys', description: 'Travel through horse-breeding heartlands, turf church sites, and crater fields.', meals: 'Breakfast included', hotel: 'Hótel Laugarbakki' },
      { day: 9, title: 'Borgarfjörður & Return to Reykjavík', description: 'Visit Deildartunguhver hot spring and Hraunfossar lava waterfalls before returning to Reykjavík.', meals: 'Breakfast included', hotel: 'Skuggi Hotel, Reykjavík' },
      { day: 10, title: 'Departure from Keflavík', description: 'Drop off rental vehicle at the airport and fly home.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'husavik-whale', name: 'Húsavík Carbon-Neutral Whale Watching', priceEUR: 85, description: 'Silent electric boat excursion with 98% whale sighting rate' },
      { id: 'myvatn-baths', name: 'Mývatn Nature Baths Geothermal Entry', priceEUR: 55, description: 'Relaxing soak in mineral-rich lagoon in North Iceland' },
      { id: 'jokulsarlon-boat', name: 'Zodiac Boat Tour on Jökulsárlón Lagoon', priceEUR: 78, description: 'Speed up close to calving icebergs with certified guide' }
    ]
  },
  {
    id: 'nv-1490',
    title: 'Fjord Tour & Northern Lights in 1 Week',
    subTitle: 'Norway in a Nutshell, Flåm Railway & Tromsø',
    destination: 'norway',
    destinationName: 'Norway',
    countryTag: 'Norway',
    type: 'train-cruise',
    typeName: 'Train & Cruise',
    durationDays: 7,
    durationNights: 6,
    season: 'winter',
    seasonMonths: 'Oct – Mar',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.8,
    reviewCount: 219,
    priceEUR: 2523,
    originalPriceEUR: 2696,
    discountBadge: 'Save up to ₹33,000',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Experience Norway’s greatest winter highlights without driving. Ride the world-renowned Flåm Railway down to the icy UNESCO Nærøyfjord, wander Bergen’s UNESCO Bryggen wharf, and fly above the Arctic Circle to Tromsø for world-class aurora hunting.',
    highlights: [
      'Scenic train ride on the Bergen Railway over high mountain passes',
      'Steep descent on the world-famous Flåm Railway',
      'Eco-friendly electric boat fjord cruise through UNESCO Nærøyfjord',
      '2 nights in Tromsø, the "Capital of the Arctic"',
      'Dedicated Tromsø Northern Lights wilderness chase excursion included',
      'UNESCO-listed Bryggen wharf in historic Bergen'
    ],
    included: [
      '6 nights in premium 4-star city center and fjord-side hotels',
      'Daily buffet breakfast',
      'Norway in a Nutshell ticket package (Bergen Line train, Flåm Railway, fjord cruise, connecting coach)',
      'Domestic flight from Bergen to Tromsø (including checked baggage)',
      'Guided Tromsø Northern Lights Chase excursion with warm drinks & thermal suits',
      '24/7 dedicated support from Wanderly Scandinavia team'
    ],
    notIncluded: [
      'International flights to Oslo / from Tromsø',
      'Optional husky safari or reindeer feeding',
      'Lunches and evening meals'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Oslo, Norway’s Capital', description: 'Arrive in Oslo. Discover the modern harbor, Opera House, and Vigeland Sculpture Park.', meals: 'Breakfast next morning', hotel: 'Thon Hotel Opera, Oslo' },
      { day: 2, title: 'Bergen Railway to Flåm Fjord Village', description: 'Board the train across the Hardangervidda plateau, switch to Flåm Railway, and arrive in picturesque Flåm.', meals: 'Breakfast included', hotel: 'Flåmsbrygga Hotel, Flåm' },
      { day: 3, title: 'Nærøyfjord Cruise & Historic Bergen', description: 'Cruise through the narrow, snow-capped Nærøyfjord on an eco electric catamaran. Coach and train to Bergen.', meals: 'Breakfast included', hotel: 'Thon Hotel Rosenkrantz, Bergen' },
      { day: 4, title: 'Explore Bergen & Fly North to Tromsø', description: 'Browse the Fish Market and colorful Bryggen wooden quarter. Afternoon flight to Arctic Tromsø.', meals: 'Breakfast included', hotel: 'Clarion Hotel The Edge, Tromsø' },
      { day: 5, title: 'Arctic Tromsø & Northern Lights Safari', description: 'Visit the Arctic Cathedral and Polaria museum. Evening excursion by minibus chasing clear skies for aurora.', meals: 'Breakfast & snacks', hotel: 'Clarion Hotel The Edge, Tromsø' },
      { day: 6, title: 'Tromsø Cable Car & Reindeer Culture', description: 'Take the Fjellheisen cable car for panoramic views over Tromsø island. Optional Sámi reindeer encounter.', meals: 'Breakfast included', hotel: 'Clarion Hotel The Edge, Tromsø' },
      { day: 7, title: 'Departure from Tromsø', description: 'Depart Tromsø Airport for your return flight.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'tromso-husky', name: 'Husky Dog Sledding in Tromsø Wilderness', priceEUR: 190, description: 'Drive your own team of Alaskan huskies through snow-covered valleys' },
      { id: 'sami-reindeer', name: 'Sámi Reindeer Sledding & Storytelling', priceEUR: 165, description: 'Feed gentle reindeer, enjoy traditional soup, and listen to joik singing in a lavvu' },
      { id: 'fjellheisen-pass', name: 'Tromsø Fjellheisen Cable Car Return Ticket', priceEUR: 38, description: 'Breathtaking 421m viewpoint over Tromsø and surrounding fjords' }
    ]
  },
  {
    id: 'nv-698',
    title: 'Northern Lights by Train & Cruise',
    subTitle: 'Tromsø, Flåm & The Hurtigruten Coastal Voyage',
    destination: 'norway',
    destinationName: 'Norway',
    countryTag: 'Norway',
    type: 'train-cruise',
    typeName: 'Train & Cruise',
    durationDays: 10,
    durationNights: 9,
    season: 'winter',
    seasonMonths: 'Oct – Mar',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.8,
    reviewCount: 164,
    priceEUR: 3860,
    originalPriceEUR: 4123,
    discountBadge: 'Save up to ₹50,000',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'The ultimate Norwegian voyage! Combines the famed Norway in a Nutshell rail route from Oslo to Bergen with an overnight voyage aboard the historic Hurtigruten coastal express ship along Norway’s jagged coastline to the Arctic capital of Tromsø.',
    highlights: [
      'Overnight coastal cruise on Hurtigruten or Havila ship with sea-view cabin',
      'Scenic rail journey across Hardangervidda on the Bergen Railway',
      'Flåm Railway and Aurlandsfjord cruise',
      'Lofoten Islands coastal passage under Arctic winter skies',
      'Tromsø aurora hunt and cable car panoramic viewpoint'
    ],
    included: [
      '7 nights hotel accommodation and 2 nights onboard coastal ship in outside cabin',
      'Daily breakfast buffet and dinners onboard ship',
      'Complete rail and fjord tickets package',
      'Aurora hunting safari in Tromsø with professional guide'
    ],
    notIncluded: ['International flights', 'Beverages onboard ship', 'Optional winter activities'],
    itinerary: [
      { day: 1, title: 'Arrival in Oslo', description: 'Explore Oslo city highlights.', meals: 'Breakfast next day', hotel: 'Thon Hotel Opera' },
      { day: 2, title: 'Scenic Train to Flåm', description: 'Cross alpine heights on Bergen Line and drop down into Flåm valley.', meals: 'Breakfast included', hotel: 'Flåmsbrygga Hotel' },
      { day: 3, title: 'Fjord Cruise & Bergen', description: 'Sail Nærøyfjord and travel onwards to charming Bergen.', meals: 'Breakfast included', hotel: 'Thon Hotel Rosenkrantz' },
      { day: 4, title: 'Embark Hurtigruten Coastal Ship', description: 'Board the coastal express ship in the evening and set sail northward.', meals: 'Breakfast & Dinner', hotel: 'Hurtigruten Outside Cabin' },
      { day: 5, title: 'Coastal Voyage - Ålesund & Geiranger', description: 'Pass Art Nouveau Ålesund and dramatic headlands while watching for auroras.', meals: 'Breakfast, Lunch, Dinner', hotel: 'Hurtigruten Cabin' },
      { day: 6, title: 'Crossing the Arctic Circle', description: 'Cross into Arctic waters; celebrate with traditional maritime ceremony.', meals: 'Breakfast, Lunch, Dinner', hotel: 'Hurtigruten Cabin' },
      { day: 7, title: 'Arrive in Tromsø', description: 'Disembark in Tromsø, the Paris of the North. Check into harbor hotel.', meals: 'Breakfast included', hotel: 'Clarion Hotel The Edge' },
      { day: 8, title: 'Tromsø Winter Safari', description: 'Explore Tromsø by day; join aurora guide by night in open wilderness.', meals: 'Breakfast included', hotel: 'Clarion Hotel The Edge' },
      { day: 9, title: 'Arctic Wonders of Tromsø', description: 'Visit Polar Museum and take the cable car for sunset views.', meals: 'Breakfast included', hotel: 'Clarion Hotel The Edge' },
      { day: 10, title: 'Farewell Norway', description: 'Transfer to Tromsø airport for departure.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'snowmobile-lyngen', name: 'Lyngen Alps Snowmobile Safari', priceEUR: 215, description: 'Trail riding beneath towering 1,800m peaks' },
      { id: 'whale-safari-tromso', name: 'Silent Whale Watching Catamaran', priceEUR: 160, description: 'Spot orcas and humpbacks feeding in Arctic fjords' }
    ]
  },
  {
    id: 'nv-1055',
    title: 'Highlights of Scandinavia',
    subTitle: 'Sweden, Denmark & Norway Small Group Tour',
    destination: 'scandinavia',
    destinationName: 'Scandinavia',
    countryTag: 'Sweden, Norway & Denmark',
    type: 'small-group',
    typeName: 'Guided Small Group',
    durationDays: 10,
    durationNights: 9,
    season: 'summer',
    seasonMonths: 'May – Oct',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Moderate (Level 2)',
    rating: 4.9,
    reviewCount: 187,
    priceEUR: 5188,
    originalPriceEUR: 5538,
    discountBadge: 'Save up to ₹66,000',
    badge: 'Multi-Country Top Seller',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Discover the Scandinavian capitals and majestic Norwegian fjords on this premier small group tour. Journey from royal Stockholm across Sweden by high-speed rail, sail on an overnight cruise to fairytale Copenhagen, and continue through Oslo and the fjords to Bergen.',
    highlights: [
      'Three iconic capitals: Stockholm, Copenhagen, and Oslo',
      'Overnight Baltic Sea cruise in sea-view cabin with Scandinavian buffet dinner',
      'Ride the high-speed X2000 train across Swedish pastoral heartland',
      'Flåm Railway & Nærøyfjord UNESCO cruise in Norway',
      'Maximum 16 guests with dedicated professional tour leader throughout'
    ],
    included: [
      '8 nights in superior 4-star boutique hotels',
      '1 night onboard DFDS overnight cruise (Copenhagen to Oslo) with sea-view cabin',
      'Daily breakfast, 1 welcome dinner in Stockholm, 1 buffet dinner onboard ship, and 1 farewell dinner in Bergen',
      'All rail tickets, domestic ferry crossings, and guided walking tours in each capital',
      'Luggage porterage and 24/7 dedicated assistance'
    ],
    notIncluded: ['International flights into Stockholm (ARN) / out of Bergen (BGO)', 'Lunches and beverages'],
    itinerary: [
      { day: 1, title: 'Welcome to Stockholm, Sweden', description: 'Arrive in Stockholm. Guided evening walk through Gamla Stan (Old Town) and welcome dinner.', meals: 'Dinner included', hotel: 'Hotel Rival, Stockholm' },
      { day: 2, title: 'Royal Palaces & Vasa Museum', description: 'Visit the 17th-century salvaged Vasa warship and tour Stockholm’s Royal Palace.', meals: 'Breakfast included', hotel: 'Hotel Rival, Stockholm' },
      { day: 3, title: 'High-Speed Rail to Copenhagen', description: 'Ride the modern X2000 high-speed train south to Copenhagen, Denmark.', meals: 'Breakfast included', hotel: 'Villa Copenhagen' },
      { day: 4, title: 'Fairytale Copenhagen & Nyhavn', description: 'Explore colorful Nyhavn harbor, Christiansborg Palace, and Tivoli Gardens.', meals: 'Breakfast included', hotel: 'Villa Copenhagen' },
      { day: 5, title: 'Overnight Cruise to Oslo', description: 'Morning leisure in Copenhagen. Board the mini-cruise ship for scenic sailing to Norway.', meals: 'Breakfast & Dinner', hotel: 'DFDS Sea View Cabin' },
      { day: 6, title: 'Oslo Fjord Arrival & Vigeland Park', description: 'Sail into Oslofjord in the morning. Visit Vigeland Sculpture Park and Munch Museum.', meals: 'Breakfast included', hotel: 'Clarion Hotel The Hub, Oslo' },
      { day: 7, title: 'Across Norway by Rail to Flåm', description: 'Board the Bergen Line train across snowfields, switch to Flåm Railway to the fjord.', meals: 'Breakfast included', hotel: 'Flåmsbrygga Hotel' },
      { day: 8, title: 'Fjord Cruise & Arrival in Bergen', description: 'Sail the calm waters of Nærøyfjord and transfer into historic Bergen.', meals: 'Breakfast included', hotel: 'Havnekontoret Hotel, Bergen' },
      { day: 9, title: 'Bergen’s Hanseatic Wharf & Farewell', description: 'Ascend Mount Fløyen funicular for sweeping city views. Farewell dinner in evening.', meals: 'Breakfast & Dinner', hotel: 'Havnekontoret Hotel, Bergen' },
      { day: 10, title: 'Departure from Bergen', description: 'Transfer to Bergen Flesland Airport for your return journey.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'stockholm-archipelago', name: 'Private Wooden Boat Archipelago Cruise', priceEUR: 130, description: 'Sail through Stockholm’s 30,000 pristine granite islands' },
      { id: 'copenhagen-culinary', name: 'Nordic Culinary Tasting Walking Tour', priceEUR: 110, description: 'Sample artisanal smørrebrød, Danish pastries, and aquavit' }
    ]
  },
  {
    id: 'nv-446',
    title: 'The Grand Tour of Scotland',
    subTitle: 'Highlands, Isle of Skye, Loch Ness & Castles',
    destination: 'scotland',
    destinationName: 'Scotland',
    countryTag: 'Scotland',
    type: 'self-drive',
    typeName: 'Self-Drive',
    durationDays: 10,
    durationNights: 9,
    season: 'summer',
    seasonMonths: 'Apr – Oct',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.9,
    reviewCount: 356,
    priceEUR: 2450,
    originalPriceEUR: 2750,
    discountBadge: 'Save up to ₹41,500',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'From Edinburgh’s cobblestone Royal Mile to the mystical Old Man of Storr on the Isle of Skye, this self-drive journey captures everything magical about Scotland. Stay in historic manor hotels, explore romantic ruins, and savor fine single-malt whiskies.',
    highlights: [
      'Isle of Skye exploration: Quiraing, Fairy Pools, and Neist Point',
      'Iconic castles: Edinburgh Castle, Stirling Castle, and Eilean Donan',
      'Loch Ness and Urquhart Castle ruins',
      'Scenic driving through cinematic Glencoe valley',
      'Speyside single-malt whisky distillery tasting included'
    ],
    included: [
      '9 nights in handpicked heritage hotels, inns, and country estates',
      'Scottish full cooked breakfast daily',
      'Rental car for 9 days with unlimited mileage and damage waivers',
      'Admission ticket to Edinburgh Castle and historic whisky distillery tour',
      'Detailed personalized roadbook and 24/7 UK helpline support'
    ],
    notIncluded: ['Fuel', 'Lunches and dinners', 'Ferry tickets not pre-arranged'],
    itinerary: [
      { day: 1, title: 'Arrival in Edinburgh', description: 'Arrive in Scotland’s regal capital and stroll along the Royal Mile.', meals: 'Breakfast next day', hotel: 'Apex Waterloo Place, Edinburgh' },
      { day: 2, title: 'Edinburgh Castle & Royal Mile', description: 'Tour Edinburgh Castle and the Georgian New Town.', meals: 'Breakfast included', hotel: 'Apex Waterloo Place, Edinburgh' },
      { day: 3, title: 'Stirling Castle & Glencoe to Fort William', description: 'Pick up car. Stop at Stirling Castle and drive through haunting Glencoe.', meals: 'Breakfast included', hotel: 'Inverlochy Castle or similar' },
      { day: 4, title: 'Over the Sea to Skye & Eilean Donan', description: 'Photograph world-famous Eilean Donan Castle before crossing the bridge to Skye.', meals: 'Breakfast included', hotel: 'Cuillin Hills Hotel, Portree' },
      { day: 5, title: 'The Mystical Isle of Skye', description: 'Visit the Quiraing, Kilt Rock, and the Fairy Pools crystal streams.', meals: 'Breakfast included', hotel: 'Cuillin Hills Hotel, Portree' },
      { day: 6, title: 'Loch Ness to Inverness', description: 'Take the ferry to Mallaig, drive past Loch Ness, and visit Urquhart Castle.', meals: 'Breakfast included', hotel: 'Kingsmills Hotel, Inverness' },
      { day: 7, title: 'Speyside Whisky Trail & Cairngorms', description: 'Tour a traditional copper pot distillery and cross Cairngorms National Park.', meals: 'Breakfast included', hotel: 'The Fife Arms, Braemar' },
      { day: 8, title: 'Royal Deeside & Balmoral Castle', description: 'Pass Balmoral Castle estate and the rolling fertile hills of Perthshire.', meals: 'Breakfast included', hotel: 'Dunkeld House Hotel' },
      { day: 9, title: 'St Andrews to Edinburgh', description: 'Visit the home of golf in St Andrews and cross Forth Bridge back to Edinburgh.', meals: 'Breakfast included', hotel: 'Apex Waterloo Place, Edinburgh' },
      { day: 10, title: 'Departure from Edinburgh', description: 'Drop off car at Edinburgh Airport and board your departure flight.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'jacobite-steam', name: 'Jacobite Steam Train ("Hogwarts Express") Return', priceEUR: 90, description: 'Ride the iconic steam train across the Glenfinnan Viaduct' },
      { id: 'skye-private-guide', name: 'Half-Day Private Isle of Skye Local Ranger Walk', priceEUR: 160, description: 'Hike secret viewpoints with an expert Highland naturalist' }
    ]
  },
  {
    id: 'nv-387',
    title: 'All of Ireland - Wild Atlantic Way',
    subTitle: 'Cliffs of Moher, Ring of Kerry, Connemara & Dublin',
    destination: 'ireland',
    destinationName: 'Ireland',
    countryTag: 'Ireland',
    type: 'self-drive',
    typeName: 'Self-Drive',
    durationDays: 11,
    durationNights: 10,
    season: 'summer',
    seasonMonths: 'Apr – Oct',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.9,
    reviewCount: 295,
    priceEUR: 2640,
    originalPriceEUR: 2920,
    discountBadge: 'Save up to ₹41,500',
    badge: 'Scenic Masterpiece',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Travel the full circle of the Emerald Isle. Take in the dramatic Cliffs of Moher soaring 700 feet above the Atlantic, drive the scenic Ring of Kerry, soak in traditional music sessions in Doolin and Galway, and explore historic Dublin.',
    highlights: [
      'The breathtaking Cliffs of Moher and the Burren lunar limestone',
      'Complete drive around the stunning Iveragh Peninsula (Ring of Kerry)',
      'Wild Connemara national park and Kylemore Abbey',
      'Lively traditional Irish music in Galway and Killarney',
      'Dublin highlights: Trinity College, Book of Kells, and Temple Bar'
    ],
    included: [
      '10 nights in premier Irish country houses, manor hotels, and boutique inns',
      'Full Irish breakfast daily',
      'Rental car with automatic transmission and comprehensive insurance',
      'Fast-track admission to the Cliffs of Moher and Kylemore Abbey'
    ],
    notIncluded: ['Flights', 'Fuel', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrive in Dublin', description: 'Arrive in Dublin. Pick up car or explore on foot.', meals: 'Breakfast next day', hotel: 'Brooks Hotel, Dublin' },
      { day: 2, title: 'Medieval Kilkenny & Rock of Cashel', description: 'Drive south to Kilkenny Castle and the striking Rock of Cashel ruins.', meals: 'Breakfast included', hotel: 'Pembroke Hotel, Kilkenny' },
      { day: 3, title: 'Kinsale & Blarney Castle to Killarney', description: 'Kiss the Blarney Stone and sample seafood in Kinsale.', meals: 'Breakfast included', hotel: 'Killarney Park Hotel' },
      { day: 4, title: 'The Spectacular Ring of Kerry', description: 'Drive along dramatic ocean cliffs, peat bogs, and sandy beaches.', meals: 'Breakfast included', hotel: 'Killarney Park Hotel' },
      { day: 5, title: 'Dingle Peninsula & Slea Head', description: 'Rugged Gaelic-speaking peninsula with emerald views and dolphin-filled bays.', meals: 'Breakfast included', hotel: 'Dingle Benners Hotel' },
      { day: 6, title: 'Cliffs of Moher & The Burren', description: 'Cross Shannon ferry; gaze over the majestic 214m Cliffs of Moher.', meals: 'Breakfast included', hotel: 'Gregans Castle Hotel' },
      { day: 7, title: 'Bohemian Galway & Aran Islands View', description: 'Explore buskers on Quay Street and colorful Spanish Arch.', meals: 'Breakfast included', hotel: 'The Galmont, Galway' },
      { day: 8, title: 'Wild Connemara & Kylemore Abbey', description: 'Visit romantic Kylemore Abbey reflected in still dark waters.', meals: 'Breakfast included', hotel: 'Abbeyglen Castle Hotel' },
      { day: 9, title: 'Donegal or Sligo Yeats Country', description: 'Travel through dramatic Benbulben flat-topped mountain scenery.', meals: 'Breakfast included', hotel: 'Lough Eske Castle' },
      { day: 10, title: 'Return across Midlands to Dublin', description: 'Cross back to Dublin for a farewell dinner and pint of Guinness.', meals: 'Breakfast included', hotel: 'Brooks Hotel, Dublin' },
      { day: 11, title: 'Departure from Dublin', description: 'Drop off car at Dublin Airport and fly home.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'aran-islands-ferry', name: 'Aran Islands (Inis Mór) Day Ferry & Bike Rental', priceEUR: 65, description: 'Cycle past ancient Celtic stone forts on remote Atlantic island' },
      { id: 'guinness-storehouse', name: 'Guinness Storehouse Gravity Bar Experience', priceEUR: 32, description: 'Pour your own pint with 360-degree views over Dublin' }
    ]
  },
  {
    id: 'nv-544',
    title: 'Scenic Switzerland by Train',
    subTitle: 'The Glacier Express, Matterhorn & Lake Geneva',
    destination: 'alps',
    destinationName: 'The Alps',
    countryTag: 'Switzerland',
    type: 'train-cruise',
    typeName: 'Scenic Mountain Trains',
    durationDays: 8,
    durationNights: 7,
    season: 'summer',
    seasonMonths: 'May – Oct',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 5.0,
    reviewCount: 142,
    priceEUR: 3490,
    originalPriceEUR: 3750,
    discountBadge: 'Save up to ₹37,000',
    badge: 'Panoramic Class',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Traverse Switzerland’s alpine wonderland aboard the world’s most luxurious scenic railways. Ride the Glacier Express through 91 tunnels and across 291 bridges, gaze up at the iconic Matterhorn in car-free Zermatt, and glide along Lake Geneva.',
    highlights: [
      'Full day on the Glacier Express in panoramic glass-roof carriage',
      'Car-free alpine paradise Zermatt with Gornergrat Matterhorn rail ascent',
      'St. Moritz glamorous lakeside resort',
      'Interlaken and Jungfraujoch "Top of Europe" high-altitude railway',
      'Swiss Travel Pass First Class included throughout'
    ],
    included: [
      '7 nights in 4-star alpine chalet and luxury lakeside hotels',
      'Swiss Travel Pass First Class for all trains, lake steamers, and city buses',
      'Glacier Express seat reservation with 3-course gourmet lunch served at seat',
      'Gornergrat Cogwheel Railway ticket to 3,089m Matterhorn viewpoint'
    ],
    notIncluded: ['International flights into Zurich (ZRH) / out of Geneva (GVA)', 'Dinners'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Transfer to Lucerne', description: 'Train along Lake Zurich to Lucerne. Walk the historic wooden Chapel Bridge.', meals: 'Breakfast next day', hotel: 'Hotel Schweizerhof Lucerne' },
      { day: 2, title: 'Mount Pilatus & Golden Pass to Interlaken', description: 'Ascend Pilatus and board the GoldenPass panoramic train through lush meadows.', meals: 'Breakfast included', hotel: 'Victoria-Jungfrau Grand Hotel' },
      { day: 3, title: 'Jungfraujoch "Top of Europe"', description: 'Ride the Eiger Express cable car and cogwheel railway into the Sphinx observatory at 3,454m.', meals: 'Breakfast included', hotel: 'Victoria-Jungfrau Grand Hotel' },
      { day: 4, title: 'Zermatt & The Majestic Matterhorn', description: 'Travel through the alpine Lötschberg tunnel to car-free Zermatt at the foot of the Matterhorn.', meals: 'Breakfast included', hotel: 'Hotel Zermatterhof' },
      { day: 5, title: 'Gornergrat Cogwheel Railway', description: 'Climb by open-air cogwheel train to Gornergrat ridge facing 29 four-thousand-meter peaks.', meals: 'Breakfast included', hotel: 'Hotel Zermatterhof' },
      { day: 6, title: 'The Famed Glacier Express to St. Moritz', description: 'An 8-hour unforgettable journey through deep gorges, alpine meadows, and over Landwasser Viaduct.', meals: 'Breakfast & Lunch', hotel: 'Badrutt’s Palace Hotel or similar' },
      { day: 7, title: 'St. Moritz to Zurich or Geneva', description: 'Scenic train through UNESCO Albula line back to Zurich or west to Lake Geneva.', meals: 'Breakfast included', hotel: 'Hotel Glockenhof, Zurich' },
      { day: 8, title: 'Departure from Switzerland', description: 'Transfer to Zurich or Geneva airport for your flight home.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'excellence-class', name: 'Glacier Express "Excellence Class" Luxury Upgrade', priceEUR: 420, description: 'Guaranteed window seat, 5-course culinary feast, and exclusive Glacier bar' },
      { id: 'lake-lucerne-yacht', name: 'Private Sunset Cruise on Lake Lucerne', priceEUR: 180, description: 'Panoramic 2-hour cruise on vintage luxury vessel' }
    ]
  },
  {
    id: 'nv-411',
    title: 'Lapland Glass Igloo Aurora Escape',
    subTitle: 'Husky Safaris, Reindeer Sleds & Arctic Starlight',
    destination: 'lapland',
    destinationName: 'Lapland',
    countryTag: 'Finland',
    type: 'small-group',
    typeName: 'Winter Aurora Escapes',
    durationDays: 6,
    durationNights: 5,
    season: 'winter',
    seasonMonths: 'Nov – Mar',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Moderate (Level 2)',
    rating: 4.9,
    reviewCount: 210,
    priceEUR: 3150,
    originalPriceEUR: 3450,
    discountBadge: 'Save up to ₹33,000',
    badge: 'Bucket List Stays',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Fall asleep watching the northern lights dance directly above your bed through a heated thermal glass roof. Experience the ultimate Finnish Lapland winter adventure with husky dog sledding through snowbound taiga, traditional Sámi reindeer safaris, and Finnish saunas.',
    highlights: [
      '2 nights in a luxury thermal glass igloo with private sauna',
      'Thrilling self-driven husky team safari through taiga forests',
      'Reindeer sleigh ride under starlit northern skies',
      'Snowmobile expedition into untouched Arctic fell wilderness',
      'Traditional Finnish wood-heated sauna and ice-dipping experience'
    ],
    included: [
      '3 nights in superior wilderness log cabin + 2 nights in thermal glass igloo',
      'Half board (Daily breakfast and three-course wilderness dinners)',
      'High-quality thermal snowsuits, winter boots, and wool gloves for the entire stay',
      'All guided excursions listed with certified Arctic wilderness guides'
    ],
    notIncluded: ['International flights to/from Rovaniemi or Ivalo', 'Lunches and alcoholic drinks'],
    itinerary: [
      { day: 1, title: 'Arrival in Arctic Lapland', description: 'Fly into Rovaniemi or Ivalo. Private transfer to your wilderness lodge. Enjoy a traditional 3-course Lappish dinner.', meals: 'Dinner included', hotel: 'Wilderness Lodge Log Cabin' },
      { day: 2, title: 'Husky Safari & Forest Trails', description: 'Learn to mush your own team of energetic huskies across frozen lakes and snow-laden pine forests.', meals: 'Breakfast & Dinner', hotel: 'Wilderness Lodge Log Cabin' },
      { day: 3, title: 'Snowmobile Expedition & Ice Fishing', description: 'Ride snowmobiles into the high fells, drill through lake ice, and try your hand at traditional ice fishing.', meals: 'Breakfast & Dinner', hotel: 'Wilderness Lodge Log Cabin' },
      { day: 4, title: 'Reindeer Farm & Check into Glass Igloo', description: 'Meet local Sámi reindeer herders. In the afternoon, check into your glass igloo with 360-degree night sky views.', meals: 'Breakfast & Dinner', hotel: 'Kakslauttanen Glass Igloo' },
      { day: 5, title: 'Aurora Hunting in the Wilderness', description: 'Snowshoe walk through silent Arctic nature and gaze up at shimmering green auroras from your glass dome bed.', meals: 'Breakfast & Dinner', hotel: 'Kakslauttanen Glass Igloo' },
      { day: 6, title: 'Departure from Lapland', description: 'Morning breakfast, transfer to airport, and farewell to the magical Arctic.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'ice-hotel-visit', name: 'LumiLinna SnowCastle & Ice Restaurant Visit', priceEUR: 95, description: 'Marvel at ice sculptures and sip hot berry punch from glasses carved of pure ice' },
      { id: 'santa-secret-cabin', name: 'Private Visit to Santa Claus Secret Forest Hut', priceEUR: 150, description: 'Magical personal audience with Santa Claus deep in the woods with elf guides' }
    ]
  },
  {
    id: 'india-agra',
    title: 'Taj Mahal & Agra Heritage Escape',
    subTitle: 'Mughal Architecture, Marble Craft & Old Agra',
    destination: 'agra',
    destinationName: 'Agra & the Taj Mahal',
    countryTag: 'India',
    type: 'small-group',
    typeName: 'Guided Small Group',
    durationDays: 4,
    durationNights: 3,
    season: 'winter',
    seasonMonths: 'Oct – Apr',
    paceLevel: 'Relaxed (Level 1)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.9,
    reviewCount: 86,
    priceEUR: 990,
    badge: 'Heritage Favorite',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Discover Agra at an unhurried pace, from the Taj Mahal at sunrise to the red sandstone halls of Agra Fort. Meet local artisans and explore the city’s Mughal-era heritage with a knowledgeable guide.',
    highlights: [
      'Sunrise visit to the Taj Mahal with a local historian',
      'Explore the palaces and courtyards of Agra Fort',
      'See the refined marble inlay craft of local artisans',
      'Small-group walks through historic Agra'
    ],
    included: [
      'Three nights in a handpicked Agra hotel with breakfast',
      'Private airport or rail-station transfers in Agra',
      'Local English-speaking guide for scheduled sightseeing',
      'Monument admissions listed in the itinerary'
    ],
    notIncluded: ['Flights or rail travel to Agra', 'Lunches and dinners', 'Personal expenses and travel insurance'],
    itinerary: [
      { day: 1, title: 'Arrive in Agra', description: 'Settle into your hotel and meet your local host for an orientation walk through the old city.', meals: 'Breakfast included', hotel: 'Agra heritage hotel' },
      { day: 2, title: 'Taj Mahal at Sunrise', description: 'Visit the Taj Mahal in the soft morning light, then explore Agra Fort and its Mughal palaces.', meals: 'Breakfast included', hotel: 'Agra heritage hotel' },
      { day: 3, title: 'Gardens & Marble Craft', description: 'Visit Mehtab Bagh for views across the Yamuna and meet artisans who continue Agra’s marble inlay tradition.', meals: 'Breakfast included', hotel: 'Agra heritage hotel' },
      { day: 4, title: 'Departure from Agra', description: 'Enjoy breakfast before your transfer to the railway station or airport.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'agra-cooking-class', name: 'Agra Home-Style Cooking Experience', priceEUR: 55, description: 'Prepare regional dishes with a local family and share a relaxed meal.' }
    ]
  },
  {
    id: 'india-rajasthan',
    title: 'Royal Rajasthan: Jaipur, Jodhpur & Udaipur',
    subTitle: 'Palaces, Desert Forts & Lakeside Stays',
    destination: 'rajasthan',
    destinationName: 'Rajasthan',
    countryTag: 'India',
    type: 'private',
    typeName: 'Privately Guided Journey',
    durationDays: 8,
    durationNights: 7,
    season: 'winter',
    seasonMonths: 'Oct – Mar',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.9,
    reviewCount: 74,
    priceEUR: 1850,
    badge: 'Royal Route',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Travel across Rajasthan with a private driver, connecting Jaipur’s rose-colored streets with Jodhpur’s hilltop fort and Udaipur’s peaceful lakes. Stay in characterful hotels and explore each city with local guides.',
    highlights: [
      'Visit Jaipur’s Amber Fort, City Palace, and historic bazaars',
      'Explore Mehrangarh Fort above Jodhpur’s blue old town',
      'Take a guided walk through Udaipur’s lakeside quarter',
      'Private overland transfers between all three cities'
    ],
    included: [
      'Seven nights in handpicked heritage and boutique hotels',
      'Daily breakfast',
      'Private air-conditioned vehicle and driver throughout',
      'Local English-speaking guides at major sights'
    ],
    notIncluded: ['Flights to and from India', 'Lunches and dinners', 'Monument admissions unless noted'],
    itinerary: [
      { day: 1, title: 'Welcome to Jaipur', description: 'Arrive in Jaipur and meet your driver for a transfer to your hotel. Enjoy an easy evening in the Pink City.', meals: 'Breakfast included', hotel: 'Jaipur heritage hotel' },
      { day: 2, title: 'Jaipur Forts & Palaces', description: 'Visit Amber Fort, the City Palace, and Jantar Mantar, with time to explore Jaipur’s lively bazaars.', meals: 'Breakfast included', hotel: 'Jaipur heritage hotel' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'Drive west through Rajasthan’s changing countryside and arrive in Jodhpur by afternoon.', meals: 'Breakfast included', hotel: 'Jodhpur boutique hotel' },
      { day: 4, title: 'Mehrangarh & the Blue City', description: 'Explore Mehrangarh Fort and walk the blue lanes of the old city with a local guide.', meals: 'Breakfast included', hotel: 'Jodhpur boutique hotel' },
      { day: 5, title: 'Jodhpur to Udaipur', description: 'Travel south, pausing at the remarkable carved temples of Ranakpur before reaching Udaipur.', meals: 'Breakfast included', hotel: 'Udaipur lakeside hotel' },
      { day: 6, title: 'Udaipur by the Lakes', description: 'Visit the City Palace and old town, then enjoy a boat ride on Lake Pichola.', meals: 'Breakfast included', hotel: 'Udaipur lakeside hotel' },
      { day: 7, title: 'A Day at Your Pace', description: 'Choose a relaxed day by the lake or add an optional cooking or craft experience.', meals: 'Breakfast included', hotel: 'Udaipur lakeside hotel' },
      { day: 8, title: 'Departure from Udaipur', description: 'Transfer to Udaipur airport for your onward journey.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'udaipur-boat-ride', name: 'Private Sunset Boat on Lake Pichola', priceEUR: 45, description: 'Enjoy evening views of Udaipur’s palaces from the water.' }
    ]
  },
  {
    id: 'india-kerala',
    title: 'Kerala Backwaters & Tea Country',
    subTitle: 'Munnar Hills, Kochi Heritage & Alleppey by Water',
    destination: 'kerala',
    destinationName: 'Kerala',
    countryTag: 'India',
    type: 'private',
    typeName: 'Privately Guided Journey',
    durationDays: 7,
    durationNights: 6,
    season: 'winter',
    seasonMonths: 'Oct – Mar',
    paceLevel: 'Relaxed (Level 1)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.8,
    reviewCount: 63,
    priceEUR: 1450,
    badge: 'Slow Travel',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Follow Kerala’s green landscapes from the heritage lanes of Kochi to Munnar’s tea-covered hills and the quiet waterways near Alleppey. Travel privately with time for local food, village visits, and a night aboard a traditional houseboat.',
    highlights: [
      'Explore Fort Kochi’s layered coastal history',
      'Walk through Munnar tea gardens and mountain viewpoints',
      'Spend a night cruising Kerala’s backwaters by houseboat',
      'Travel with a private driver between each region'
    ],
    included: [
      'Six nights in boutique hotels and a private houseboat',
      'Daily breakfast and houseboat lunch and dinner',
      'Private air-conditioned vehicle with driver',
      'Guided Fort Kochi walk and Munnar tea experience'
    ],
    notIncluded: ['Flights to and from Kochi', 'Meals not listed', 'Personal expenses and travel insurance'],
    itinerary: [
      { day: 1, title: 'Arrive in Kochi', description: 'Meet your driver at Kochi airport and settle into your hotel near Fort Kochi.', meals: 'Breakfast included', hotel: 'Fort Kochi boutique hotel' },
      { day: 2, title: 'Fort Kochi & the Waterfront', description: 'Walk through Fort Kochi’s historic streets, visit local markets, and see the waterfront fishing nets.', meals: 'Breakfast included', hotel: 'Fort Kochi boutique hotel' },
      { day: 3, title: 'Into the Tea Hills', description: 'Drive inland to Munnar through cardamom country and mountain scenery.', meals: 'Breakfast included', hotel: 'Munnar tea-country stay' },
      { day: 4, title: 'Munnar Tea Country', description: 'Visit a tea estate and enjoy an easy guided walk among the rolling plantations.', meals: 'Breakfast included', hotel: 'Munnar tea-country stay' },
      { day: 5, title: 'Munnar to Alleppey', description: 'Descend to the coast and board your traditional houseboat for a gentle backwater cruise.', meals: 'Breakfast included', hotel: 'Alleppey houseboat' },
      { day: 6, title: 'Backwater Villages', description: 'Cruise narrow canals and pass village life before returning to shore for your final night.', meals: 'Breakfast, lunch & dinner', hotel: 'Alleppey lakeside hotel' },
      { day: 7, title: 'Departure from Kochi', description: 'Transfer to Kochi airport for your onward flight.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'kerala-cooking', name: 'Kerala Home Cooking Session', priceEUR: 40, description: 'Learn to prepare a few regional dishes with a local cook.' }
    ]
  },
  {
    id: 'india-goa',
    title: 'Goa Coast & Culture Retreat',
    subTitle: 'Old Goa, Coastal Villages & Time by the Sea',
    destination: 'goa',
    destinationName: 'Goa',
    countryTag: 'India',
    type: 'private',
    typeName: 'Privately Guided Stay',
    durationDays: 5,
    durationNights: 4,
    season: 'winter',
    seasonMonths: 'Nov – Feb',
    paceLevel: 'Leisurely (Level 1)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.7,
    reviewCount: 52,
    priceEUR: 890,
    badge: 'Coastal Escape',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Balance quiet beach time with Goa’s distinctive Portuguese-era architecture, spice-rich cuisine, and village markets. Stay in a relaxed coastal base and explore at your own pace with a local host.',
    highlights: [
      'Discover the churches and heritage quarter of Old Goa',
      'Visit a local spice garden and learn about regional ingredients',
      'Explore North or South Goa’s beaches with a private driver',
      'Enjoy an unhurried coastal stay with flexible free time'
    ],
    included: [
      'Four nights in a handpicked coastal hotel with breakfast',
      'Airport transfers and one full-day private guided excursion',
      'Old Goa heritage walk with a local guide',
      'Spice garden visit and tasting'
    ],
    notIncluded: ['Flights to and from Goa', 'Lunches and dinners', 'Optional activities and beach equipment'],
    itinerary: [
      { day: 1, title: 'Arrive on the Goan Coast', description: 'Transfer to your hotel and enjoy a relaxed first evening by the sea.', meals: 'Breakfast included', hotel: 'Goa coastal hotel' },
      { day: 2, title: 'Old Goa & Panaji', description: 'Explore Old Goa’s historic churches, then stroll through Panaji’s colorful Latin Quarter.', meals: 'Breakfast included', hotel: 'Goa coastal hotel' },
      { day: 3, title: 'Spice Garden & Village Life', description: 'Visit a spice garden and discover inland villages and local Goan flavors.', meals: 'Breakfast included', hotel: 'Goa coastal hotel' },
      { day: 4, title: 'A Day by the Sea', description: 'Spend the day at your preferred beach or add a boat trip along the coast.', meals: 'Breakfast included', hotel: 'Goa coastal hotel' },
      { day: 5, title: 'Departure from Goa', description: 'Transfer to Goa airport for your onward journey.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'goa-sunset-cruise', name: 'Mandovi River Sunset Cruise', priceEUR: 35, description: 'See the riverfront at golden hour on a relaxed evening cruise.' }
    ]
  },
  {
    id: 'india-himalayas',
    title: 'Himalayan Valleys of Himachal',
    subTitle: 'Shimla, Mountain Roads & Manali',
    destination: 'himalayas',
    destinationName: 'The Indian Himalayas',
    countryTag: 'India',
    type: 'small-group',
    typeName: 'Guided Small Group',
    durationDays: 7,
    durationNights: 6,
    season: 'summer',
    seasonMonths: 'Apr – Jun',
    paceLevel: 'Active (Level 2)',
    activityLevel: 'Moderate (Level 2)',
    rating: 4.8,
    reviewCount: 47,
    priceEUR: 1650,
    badge: 'Mountain Journey',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: 'Journey from Shimla’s colonial-era ridge into the mountain landscapes of Himachal Pradesh. Travel with a local guide, visit highland villages, and enjoy scenic walks with time to acclimatize and take in the views.',
    highlights: [
      'Walk Shimla’s historic ridge and lively bazaar',
      'Follow mountain roads through Kullu Valley',
      'Explore Manali’s old town and riverside paths',
      'Take a guided nature walk with Himalayan viewpoints'
    ],
    included: [
      'Six nights in locally owned mountain hotels',
      'Daily breakfast',
      'Small-group transport between Shimla and Manali',
      'Local guide for scheduled walks and visits'
    ],
    notIncluded: ['Flights or rail travel to Shimla', 'Lunches and dinners', 'Optional adventure activities'],
    itinerary: [
      { day: 1, title: 'Arrive in Shimla', description: 'Meet your local host and settle in before a gentle orientation walk along the ridge.', meals: 'Breakfast included', hotel: 'Shimla hillside hotel' },
      { day: 2, title: 'Shimla Heritage Walk', description: 'Discover the town’s architecture, forest paths, and lively bazaar with a local guide.', meals: 'Breakfast included', hotel: 'Shimla hillside hotel' },
      { day: 3, title: 'Across the Mountain Valleys', description: 'Travel north through changing landscapes, stopping at viewpoints and small towns along the way.', meals: 'Breakfast included', hotel: 'Kullu Valley guesthouse' },
      { day: 4, title: 'Kullu Valley & Local Life', description: 'Visit riverside villages and learn about local crafts and mountain traditions.', meals: 'Breakfast included', hotel: 'Kullu Valley guesthouse' },
      { day: 5, title: 'Continue to Manali', description: 'Follow the Beas River to Manali and spend the afternoon exploring the old town.', meals: 'Breakfast included', hotel: 'Manali mountain hotel' },
      { day: 6, title: 'Manali Nature Walk', description: 'Enjoy a guided walk through cedar forest and open valley viewpoints, adjusted to the group’s pace.', meals: 'Breakfast included', hotel: 'Manali mountain hotel' },
      { day: 7, title: 'Departure from Manali', description: 'After breakfast, continue your onward journey from Manali.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [
      { id: 'manali-village-walk', name: 'Private Old Manali Village Walk', priceEUR: 30, description: 'Explore traditional lanes and local cafés with a private guide.' }
    ]
  },
  {
    id: 'india-agra-fatehpur',
    title: 'Agra & Fatehpur Sikri Heritage Trail',
    subTitle: 'Taj Mahal, Mughal Capitals & Yamuna Gardens',
    destination: 'agra',
    destinationName: 'Agra & the Taj Mahal',
    countryTag: 'India',
    type: 'private',
    typeName: 'Privately Guided Journey',
    durationDays: 5,
    durationNights: 4,
    season: 'winter',
    seasonMonths: 'Oct – Apr',
    paceLevel: 'Relaxed (Level 1)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.8,
    reviewCount: 41,
    priceEUR: 1190,
    badge: 'Culture & Heritage',
    image: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=1200&q=80'],
    summary: 'Go beyond Agra’s best-known monument with a private journey through Mughal architecture, riverside gardens, and the former imperial city of Fatehpur Sikri.',
    highlights: ['Return to the Taj Mahal at a quieter hour', 'Explore Fatehpur Sikri with a local guide', 'Visit Itimad-ud-Daulah and Mehtab Bagh', 'Enjoy private transfers and flexible touring'],
    included: ['Four nights in an Agra hotel with breakfast', 'Private car and driver for scheduled touring', 'Local guide in Agra and Fatehpur Sikri', 'Monument admissions listed in the itinerary'],
    notIncluded: ['Travel to and from Agra', 'Lunches and dinners', 'Personal expenses and travel insurance'],
    itinerary: [
      { day: 1, title: 'Welcome to Agra', description: 'Arrive and settle in before an easy orientation walk through the old city.', meals: 'Breakfast included', hotel: 'Agra boutique hotel' },
      { day: 2, title: 'The Taj Mahal & Mehtab Bagh', description: 'Visit the Taj Mahal with a guide, then see its riverside setting from Mehtab Bagh.', meals: 'Breakfast included', hotel: 'Agra boutique hotel' },
      { day: 3, title: 'Agra Fort & Itimad-ud-Daulah', description: 'Explore Agra Fort and the intricate marble tomb known as the Baby Taj.', meals: 'Breakfast included', hotel: 'Agra boutique hotel' },
      { day: 4, title: 'Fatehpur Sikri', description: 'Take a day trip to the red sandstone palaces and courtyards of Fatehpur Sikri.', meals: 'Breakfast included', hotel: 'Agra boutique hotel' },
      { day: 5, title: 'Departure from Agra', description: 'Enjoy breakfast before your private transfer to the station or airport.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [{ id: 'agra-photo-walk', name: 'Sunrise Photography Walk', priceEUR: 35, description: 'Visit a quiet viewpoint with a local photography guide.' }]
  },
  {
    id: 'india-rajasthan-desert',
    title: 'Rajasthan Desert Forts & Jaisalmer',
    subTitle: 'Bikaner, Desert Country & the Golden City',
    destination: 'rajasthan',
    destinationName: 'Rajasthan',
    countryTag: 'India',
    type: 'private',
    typeName: 'Privately Guided Journey',
    durationDays: 7,
    durationNights: 6,
    season: 'winter',
    seasonMonths: 'Oct – Mar',
    paceLevel: 'Classic (Level 2)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.8,
    reviewCount: 39,
    priceEUR: 1590,
    badge: 'Desert Discovery',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80'],
    summary: 'Head west through Rajasthan’s desert landscapes, from Bikaner’s ornate fort to Jaisalmer’s golden sandstone lanes. Meet local craftspeople and spend an evening under the open desert sky.',
    highlights: ['Explore Junagarh Fort in Bikaner', 'Walk the living lanes of Jaisalmer Fort', 'Visit desert villages with a local guide', 'Optional sunset outing among the Sam sand dunes'],
    included: ['Six nights in heritage hotels and a desert camp', 'Daily breakfast and one camp dinner', 'Private air-conditioned vehicle and driver', 'Local guides for scheduled heritage visits'],
    notIncluded: ['Flights or rail travel to Rajasthan', 'Most lunches and dinners', 'Optional camel or jeep activities'],
    itinerary: [
      { day: 1, title: 'Arrive in Bikaner', description: 'Meet your driver and settle into a restored haveli in the old city.', meals: 'Breakfast included', hotel: 'Bikaner heritage hotel' },
      { day: 2, title: 'Bikaner Fort & Old Town', description: 'Tour Junagarh Fort and explore the city’s historic markets with a local guide.', meals: 'Breakfast included', hotel: 'Bikaner heritage hotel' },
      { day: 3, title: 'Across the Thar to Jaisalmer', description: 'Travel west through desert country, stopping at villages along the route.', meals: 'Breakfast included', hotel: 'Jaisalmer haveli' },
      { day: 4, title: 'Jaisalmer Fort & Havelis', description: 'Explore the fort’s narrow lanes and intricately carved merchant houses.', meals: 'Breakfast included', hotel: 'Jaisalmer haveli' },
      { day: 5, title: 'Desert Villages & Dunes', description: 'Visit nearby desert settlements and enjoy sunset in the dunes.', meals: 'Breakfast & dinner', hotel: 'Thar Desert camp' },
      { day: 6, title: 'Return to Jaisalmer', description: 'Return to the city for an afternoon at leisure and a final evening in the old quarter.', meals: 'Breakfast included', hotel: 'Jaisalmer haveli' },
      { day: 7, title: 'Departure from Jaisalmer', description: 'Transfer to the railway station or airport for your onward journey.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [{ id: 'jaisalmer-dune-dinner', name: 'Private Dune Dinner', priceEUR: 65, description: 'Enjoy a private dinner setup in the dunes with local musicians.' }]
  },
  {
    id: 'india-kerala-wildlife',
    title: 'Kerala Wildlife & Spice Route',
    subTitle: 'Periyar Forest, Spice Gardens & the Western Ghats',
    destination: 'kerala',
    destinationName: 'Kerala',
    countryTag: 'India',
    type: 'small-group',
    typeName: 'Guided Small Group',
    durationDays: 6,
    durationNights: 5,
    season: 'winter',
    seasonMonths: 'Oct – Mar',
    paceLevel: 'Active (Level 2)',
    activityLevel: 'Moderate (Level 2)',
    rating: 4.8,
    reviewCount: 36,
    priceEUR: 1280,
    badge: 'Wild Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80'],
    summary: 'Explore Kerala’s spice-growing highlands and forest landscapes on a small-group trip based around Thekkady and Periyar. Guided walks and relaxed estate visits offer a closer look at the region’s rich biodiversity.',
    highlights: ['Walk through cardamom and pepper plantations', 'Join a guided nature walk in Periyar Tiger Reserve', 'Learn about local spices and plantation life', 'Enjoy mountain scenery in the Western Ghats'],
    included: ['Five nights in locally owned stays with breakfast', 'Small-group transfers between Kochi and Thekkady', 'Naturalist-led Periyar walk and plantation visit', 'All activities specified in the itinerary'],
    notIncluded: ['Flights to and from Kochi', 'Lunches and dinners', 'Park activities not listed in the itinerary'],
    itinerary: [
      { day: 1, title: 'Arrive in Kochi', description: 'Meet the group and transfer to a hotel near Fort Kochi.', meals: 'Breakfast included', hotel: 'Fort Kochi guesthouse' },
      { day: 2, title: 'Journey to Thekkady', description: 'Drive through the foothills into spice country and settle into your forest-side stay.', meals: 'Breakfast included', hotel: 'Thekkady plantation stay' },
      { day: 3, title: 'Spice Gardens & Local Flavors', description: 'Visit a working spice garden and learn how cardamom, pepper, and cloves are grown.', meals: 'Breakfast included', hotel: 'Thekkady plantation stay' },
      { day: 4, title: 'Periyar Nature Walk', description: 'Explore forest trails with a trained local naturalist, looking for birds and wildlife signs.', meals: 'Breakfast included', hotel: 'Thekkady plantation stay' },
      { day: 5, title: 'Village Paths & Mountain Views', description: 'Take a gentle guided walk through nearby villages and rolling highland landscapes.', meals: 'Breakfast included', hotel: 'Thekkady plantation stay' },
      { day: 6, title: 'Return to Kochi', description: 'Transfer back to Kochi after breakfast for your onward travel.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [{ id: 'periyar-boat', name: 'Periyar Lake Boat Ride', priceEUR: 25, description: 'Take a public boat ride on the reservoir with views of the surrounding forest.' }]
  },
  {
    id: 'india-goa-south',
    title: 'South Goa Quiet Coast & Heritage',
    subTitle: 'Old Goa, Chandor Homes & Quiet Beaches',
    destination: 'goa',
    destinationName: 'Goa',
    countryTag: 'India',
    type: 'private',
    typeName: 'Privately Guided Stay',
    durationDays: 6,
    durationNights: 5,
    season: 'winter',
    seasonMonths: 'Nov – Feb',
    paceLevel: 'Leisurely (Level 1)',
    activityLevel: 'Easy (Level 1)',
    rating: 4.8,
    reviewCount: 34,
    priceEUR: 1120,
    badge: 'Slow Coast',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80'],
    summary: 'Stay along South Goa’s calmer shoreline and spend time discovering the region’s layered heritage. This relaxed private trip pairs beach days with Old Goa, village homes, and local food.',
    highlights: ['Visit Old Goa’s UNESCO-listed churches', 'Discover heritage homes and village life in Chandor', 'Spend unstructured time at South Goa beaches', 'Enjoy a guided tasting of Goan specialties'],
    included: ['Five nights in a coastal boutique hotel with breakfast', 'Private transfers and one full-day guided tour', 'Old Goa and Chandor heritage visits', 'Goan food tasting with a local host'],
    notIncluded: ['Flights to and from Goa', 'Lunches and dinners', 'Optional water sports and boat trips'],
    itinerary: [
      { day: 1, title: 'Arrive in South Goa', description: 'Transfer to your coastal hotel and take the rest of the day to settle in.', meals: 'Breakfast included', hotel: 'South Goa boutique hotel' },
      { day: 2, title: 'Old Goa Churches', description: 'Visit Old Goa with a guide and learn about the region’s Portuguese-era history.', meals: 'Breakfast included', hotel: 'South Goa boutique hotel' },
      { day: 3, title: 'Chandor Heritage Homes', description: 'Explore Chandor’s historic homes and village lanes with a local host.', meals: 'Breakfast included', hotel: 'South Goa boutique hotel' },
      { day: 4, title: 'Coastal Day at Your Pace', description: 'Enjoy a free day on the beach or choose an optional boat outing.', meals: 'Breakfast included', hotel: 'South Goa boutique hotel' },
      { day: 5, title: 'Goan Food & Local Markets', description: 'Visit a local market and enjoy a guided tasting of regional Goan dishes.', meals: 'Breakfast included', hotel: 'South Goa boutique hotel' },
      { day: 6, title: 'Departure from Goa', description: 'Private transfer to the airport for your onward journey.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [{ id: 'south-goa-kayak', name: 'Guided Mangrove Kayak', priceEUR: 40, description: 'Paddle calm inland waterways with a local nature guide.' }]
  },
  {
    id: 'india-himalayas-ladakh',
    title: 'Ladakh Monasteries & Indus Valley',
    subTitle: 'Leh, High Passes & Himalayan Buddhist Heritage',
    destination: 'himalayas',
    destinationName: 'The Indian Himalayas',
    countryTag: 'India',
    type: 'small-group',
    typeName: 'Guided Small Group',
    durationDays: 8,
    durationNights: 7,
    season: 'summer',
    seasonMonths: 'Jun – Sep',
    paceLevel: 'Active (Level 2)',
    activityLevel: 'Moderate (Level 2)',
    rating: 4.9,
    reviewCount: 31,
    priceEUR: 1980,
    badge: 'High-Altitude Journey',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'],
    summary: 'Allow time to acclimatize in Leh before exploring Ladakh’s Indus Valley monasteries, traditional villages, and high-desert scenery. Travel with an experienced local guide and keep a gentle pace at altitude.',
    highlights: ['Acclimatize in Leh with a guided old-town walk', 'Visit Thiksey and Hemis monasteries', 'Explore Indus Valley villages and landscapes', 'Take a day trip to the high-altitude Pangong Lake'],
    included: ['Seven nights in locally run hotels and guesthouses', 'Daily breakfast and selected group dinners', 'Small-group transport and local guide', 'Monastery visits listed in the itinerary'],
    notIncluded: ['Flights to and from Leh', 'Lunches and most dinners', 'Travel insurance and personal altitude medication'],
    itinerary: [
      { day: 1, title: 'Arrive in Leh', description: 'Transfer to your hotel and rest to begin acclimatizing at high altitude.', meals: 'Dinner included', hotel: 'Leh guesthouse' },
      { day: 2, title: 'Easy Day in Leh', description: 'Keep the pace gentle with an optional short walk through Leh’s old town.', meals: 'Breakfast included', hotel: 'Leh guesthouse' },
      { day: 3, title: 'Leh Palace & Shanti Stupa', description: 'Visit local landmarks with plenty of time for breaks and gradual acclimatization.', meals: 'Breakfast included', hotel: 'Leh guesthouse' },
      { day: 4, title: 'Indus Valley Monasteries', description: 'Explore Thiksey Monastery and nearby villages with a local guide.', meals: 'Breakfast included', hotel: 'Leh guesthouse' },
      { day: 5, title: 'Hemis & the Valley', description: 'Visit Hemis Monastery and learn about Ladakhi Buddhist traditions.', meals: 'Breakfast included', hotel: 'Leh guesthouse' },
      { day: 6, title: 'Pangong Lake', description: 'Travel over a high pass to the changing blue waters of Pangong Lake and return to Leh.', meals: 'Breakfast & dinner', hotel: 'Leh guesthouse' },
      { day: 7, title: 'A Day in Leh', description: 'Enjoy free time for rest, markets, or a short optional excursion.', meals: 'Breakfast included', hotel: 'Leh guesthouse' },
      { day: 8, title: 'Departure from Leh', description: 'Transfer to Leh airport for your onward flight.', meals: 'Breakfast included', hotel: 'Departure day' }
    ],
    availableAddOns: [{ id: 'leh-cooking', name: 'Ladakhi Home Cooking Visit', priceEUR: 35, description: 'Share a home-cooked meal and learn about Ladakhi ingredients and traditions.' }]
  }
];

const TESTIMONIALS_DATA = [
  {
    id: 3,
    name: 'Emma Richardson',
    location: 'London, UK',
    trip: 'The Grand Tour of Scotland',
    date: 'June 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    comment: 'The self-drive itinerary was brilliant. The roads mapped out for the Isle of Skye took us to hidden viewpoints we never would have discovered on our own. Booking with confidence cancellation guarantee made booking a year early easy.'
  },
  {
    id: 4,
    name: 'Robert & Anja Weber',
    location: 'Munich, Germany',
    trip: 'Lapland Glass Igloo Aurora Escape',
    date: 'December 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Sleeping under the stars in a heated glass igloo while the northern lights rippled overhead is something we will tell our grandchildren about. The husky safari was extraordinary. 10/10 service!'
  },
  {
    id: 5,
    name: 'Ananya Sharma',
    location: 'Mumbai, India',
    trip: 'Taj Mahal & Agra Heritage Escape',
    date: 'February 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'The sunrise visit to the Taj Mahal was unforgettable. Our guide brought Agra’s history to life, and the whole trip felt thoughtful and easy to enjoy.'
  },
  {
    id: 6,
    name: 'Arjun & Meera Nair',
    location: 'Bengaluru, India',
    trip: 'Kerala Backwaters & Tea Country',
    date: 'January 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    comment: 'We loved the contrast between Munnar’s tea hills and the peaceful backwaters. The local experiences and well-paced itinerary made it a wonderful Kerala holiday.'
  },
  {
    id: 7,
    name: 'Priya & Karan Mehta',
    location: 'Pune, India',
    trip: 'Royal Rajasthan: Jaipur, Jodhpur & Udaipur',
    date: 'March 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'The forts, local guides, and lakeside evenings made Rajasthan a trip we will always remember.'
  },
  {
    id: 8,
    name: 'Riya Kapoor',
    location: 'Delhi, India',
    trip: 'Agra & Fatehpur Sikri Heritage Trail',
    date: 'April 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    comment: 'Fatehpur Sikri was fascinating, and our guide made every stop easy to appreciate.'
  },
  {
    id: 9,
    name: 'Dev Patel',
    location: 'Ahmedabad, India',
    trip: 'Rajasthan Desert Forts & Jaisalmer',
    date: 'February 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'Jaisalmer at sunset was incredible, and the desert stay was comfortable and well organized.'
  },
  {
    id: 10,
    name: 'Isha Menon',
    location: 'Chennai, India',
    trip: 'Kerala Wildlife & Spice Route',
    date: 'January 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    comment: 'The spice garden visit and forest walk were lovely highlights of our Kerala getaway.'
  },
  {
    id: 11,
    name: 'Aarav Shah',
    location: 'Surat, India',
    trip: 'South Goa Quiet Coast & Heritage',
    date: 'December 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'A relaxing mix of quiet beaches, heritage walks, and delicious local food.'
  },
  {
    id: 12,
    name: 'Nisha Rao',
    location: 'Hyderabad, India',
    trip: 'Himalayan Valleys of Himachal',
    date: 'June 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'The mountain scenery was beautiful, and the itinerary gave us time to enjoy it at an easy pace.'
  },
  {
    id: 13,
    name: 'Kabir Singh',
    location: 'Chandigarh, India',
    trip: 'Ladakh Monasteries & Indus Valley',
    date: 'July 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'The monastery visits and thoughtful acclimatization made this a memorable Ladakh journey.'
  },
  {
    id: 14,
    name: 'Sana Iyer',
    location: 'Kochi, India',
    trip: 'Kerala Backwaters & Tea Country',
    date: 'February 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    comment: 'Our houseboat night was peaceful, and Munnar’s tea country was a refreshing change of pace.'
  },
  {
    id: 15,
    name: 'Vikram Joshi',
    location: 'Jaipur, India',
    trip: 'Taj Mahal & Agra Heritage Escape',
    date: 'May 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'The sunrise visit and stories behind the architecture made Agra feel truly special.'
  },
  {
    id: 16,
    name: 'Tara Desai',
    location: 'Indore, India',
    trip: 'Goa Coast & Culture Retreat',
    date: 'November 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    comment: 'We enjoyed the heritage visits just as much as the slow afternoons by the coast.'
  }
];

const FAQS_DATA = [
  {
    question: 'When is the best time to see the Northern Lights?',
    answer: 'The aurora borealis is visible from late September through early April when night skies are dark across Northern Europe (Iceland, Norway, Northern Sweden, and Finnish Lapland). For the strongest chances, we recommend traveling between October and March away from urban light pollution.'
  },
  {
    question: 'What is included in a Wanderly self-drive package?',
    answer: 'Our self-drive tours include your rental vehicle with unlimited mileage, comprehensive CDW and theft protection insurances, pre-booked handpicked hotels with private bathrooms and daily breakfast, personalized road books with custom GPS routes, and 24/7 emergency support.'
  },
  {
    question: 'Can I customize any tour package or add extra nights?',
    answer: 'Yes! All Wanderly itineraries can be tailored. You can add extra days in departure cities, upgrade vehicle categories or hotel tiers (Standard, Comfort, Superior), and include optional excursions like whale watching, ice caves, or thermal spas directly in our booking engine.'
  },
  {
    question: 'How does Wanderly’s Book With Confidence guarantee work?',
    answer: 'Our Book With Confidence cancellation protection allows you to plan your trip with complete flexibility. If you need to cancel or postpone your journey up to 30 days before departure for qualifying reasons, you receive a full refund or travel credit with zero cancellation fees.'
  },
  {
    question: 'Are flights included in the tour packages?',
    answer: 'International flights to and from our destinations are not included, allowing you to choose the airlines, departure airports, and frequent flyer programs that suit you best. However, any domestic flights specified within an itinerary (e.g., Bergen to Tromsø) are fully included.'
  },
  {
    question: 'What is the group size on Guided Small Group tours?',
    answer: 'We limit our escorted small groups to a maximum of 16 travelers (and often fewer, averaging 12–14). This ensures an intimate, authentic experience, nimble travel in heated mini-coaches, and direct personal attention from your dedicated local guide.'
  }
];
