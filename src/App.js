import React, { useState, useEffect } from 'react';

// Dati degli aeroporti (abbreviato per leggibilità, ma contiene tutti i dati forniti)
const italianAirports = [
  // AEROPORTI ITALIANI
  { icao: 'LIPA', iata: 'AOI', name: 'Ancona Falconara', country: 'Italy' },
  { icao: 'LIPV', iata: 'AHO', name: 'Alghero Fertilia', country: 'Italy' },
  { icao: 'LIBD', iata: 'BRI', name: 'Bari Karol Wojtyla', country: 'Italy' },
  { icao: 'LIPE', iata: 'BLQ', name: 'Bologna Guglielmo Marconi', country: 'Italy' },
  { icao: 'LIEC', iata: 'BDS', name: 'Brindisi Papola Casale', country: 'Italy' },
  { icao: 'LIEE', iata: 'CAG', name: 'Cagliari Elmas', country: 'Italy' },
  { icao: 'LICC', iata: 'CTA', name: 'Catania Fontanarossa', country: 'Italy' },
  { icao: 'LIRA', iata: 'CIA', name: 'Roma Ciampino', country: 'Italy' },
  { icao: 'LICG', iata: 'CIY', name: 'Comiso Vincenzo Magliocco', country: 'Italy' },
  { icao: 'LIBG', iata: 'CCV', name: 'Crotone Sant\'Anna', country: 'Italy' },
  { icao: 'LIPR', iata: 'CUF', name: 'Cuneo Levaldigi', country: 'Italy' },
  { icao: 'LIRS', iata: 'FLR', name: 'Firenze Peretola', country: 'Italy' },
  { icao: 'LIBN', iata: 'FOG', name: 'Foggia Gino Lisa', country: 'Italy' },
  { icao: 'LIEO', iata: 'GOA', name: 'Genova Cristoforo Colombo', country: 'Italy' },
  { icao: 'LICA', iata: 'SUF', name: 'Lamezia Terme', country: 'Italy' },
  { icao: 'LICD', iata: 'LMP', name: 'Lampedusa', country: 'Italy' },
  { icao: 'LIML', iata: 'LIN', name: 'Milano Linate', country: 'Italy' },
  { icao: 'LIMC', iata: 'MXP', name: 'Milano Malpensa', country: 'Italy' },
  { icao: 'LIRN', iata: 'NAP', name: 'Napoli Capodichino', country: 'Italy' },
  { icao: 'LIRJ', iata: 'OLB', name: 'Olbia Costa Smeralda', country: 'Italy' },
  { icao: 'LICJ', iata: 'PMO', name: 'Palermo Falcone Borsellino', country: 'Italy' },
  { icao: 'LIRP', iata: 'PSR', name: 'Pescara Abruzzo', country: 'Italy' },
  { icao: 'LIRP', iata: 'PSA', name: 'Pisa Galileo Galilei', country: 'Italy' },
  { icao: 'LIQJ', iata: 'QSR', name: 'Salerno Costa d\'Amalfi', country: 'Italy' },
  { icao: 'LICB', iata: 'REG', name: 'Reggio Calabria Tito Minniti', country: 'Italy' },
  { icao: 'LIPB', iata: 'RMI', name: 'Rimini Federico Fellini', country: 'Italy' },
  { icao: 'LIRF', iata: 'FCO', name: 'Roma Fiumicino', country: 'Italy' },
  { icao: 'LILP', iata: 'TRN', name: 'Torino Caselle', country: 'Italy' },
  { icao: 'LIPQ', iata: 'TSF', name: 'Treviso Antonio Canova', country: 'Italy' },
  { icao: 'LIPU', iata: 'TRS', name: 'Trieste Ronchi dei Legionari', country: 'Italy' },
  { icao: 'LIPZ', iata: 'VCE', name: 'Venezia Marco Polo', country: 'Italy' },
  { icao: 'LIPY', iata: 'VRN', name: 'Verona Villafranca', country: 'Italy' },

  // AEROPORTI INTERNAZIONALI EasyJet (Ordinati per Paese e poi Nome)
  // Albania
  { icao: 'LATI', iata: 'TIA', name: 'Tirana', country: 'Albania' },
  // Algeria
  { icao: 'DAAG', iata: 'ALG', name: 'Algiers Houari Boumediene Airport', country: 'Algeria' },
  { icao: 'DABM', iata: 'BJA', name: 'Bejaïa Abane Ramdane Airport', country: 'Algeria' },
  // Austria
  { icao: 'LOWI', iata: 'INN', name: 'Innsbruck Airport', country: 'Austria' },
  { icao: 'LOWS', iata: 'SZG', name: 'Salzburg Airport', country: 'Austria' },
  { icao: 'LOWW', iata: 'VIE', name: 'Vienna International Airport', country: 'Austria' },
  // Belgium
  { icao: 'EBBR', iata: 'BRU', name: 'Brussels Airport', country: 'Belgium' },
  { icao: 'EBCI', iata: 'CRL', name: 'Brussels South Charleroi Airport', country: 'Belgium' },
  { icao: 'EBLG', iata: 'LGG', name: 'Liege Airport', country: 'Belgium' },
  { icao: 'EBOS', iata: 'OST', name: 'Ostend–Bruges International Airport', country: 'Belgium' },
  // Bosnia and Herzegovina
  { icao: 'LQSA', iata: 'SJJ', name: 'Sarajevo International', country: 'Bosnia and Herzegovina' },
  // Bulgaria
  { icao: 'LBBG', iata: 'BOJ', name: 'Burgas Airport', country: 'Bulgaria' },
  { icao: 'LBSF', iata: 'SOF', name: 'Sofia Airport', country: 'Bulgaria' },
  { icao: 'LBBG', iata: 'VAR', name: 'Varna Airport', country: 'Bulgaria' },
  // Cape Verde
  { icao: 'GVAC', iata: 'SID', name: 'Amílcar Cabral International Airport (Sal)', country: 'Cape Verde' },
  // Croatia
  { icao: 'LDDU', iata: 'DBV', name: 'Dubrovnik Airport', country: 'Croatia' },
  { icao: 'LDPL', iata: 'PUY', name: 'Pula Airport', country: 'Croatia' },
  { icao: 'LDSP', iata: 'SPU', name: 'Split Airport', country: 'Croatia' },
  { icao: 'LDZA', iata: 'ZAD', name: 'Zadar Airport', country: 'Croatia' },
  // Cyprus
  { icao: 'LCLK', iata: 'LCA', name: 'Larnaca', country: 'Cyprus' },
  { icao: 'LCPH', iata: 'PFO', name: 'Paphos', country: 'Cyprus' },
  // Czech Republic
  { icao: 'LKPR', iata: 'PRG', name: 'Prague Václav Havel', country: 'Czech Republic' },
  // Denmark
  { icao: 'EKCH', iata: 'CPH', name: 'Copenhagen Kastrup', country: 'Denmark' },
  // Egypt
  { icao: 'HECA', iata: 'CAI', name: 'Cairo International', country: 'Egypt' },
  { icao: 'HEGN', iata: 'HRG', name: 'Hurghada International', country: 'Egypt' },
  { icao: 'HELX', iata: 'LXR', name: 'Luxor International Airport', country: 'Egypt' },
  { icao: 'HEBA', iata: 'RMF', name: 'Marsa Alam International', country: 'Egypt' },
  { icao: 'HESH', iata: 'SSH', name: 'Sharm el-Sheikh International', country: 'Egypt' },
  { icao: 'ETAR', iata: 'SPX', name: 'Sphinx International Airport (Giza)', country: 'Egypt' },
  // Estonia
  { icao: 'EETN', iata: 'TLL', name: 'Tallinn Airport', country: 'Estonia' },
  // Ethiopia
  { icao: 'HAAB', iata: 'ADD', name: 'Addis Ababa Bole International Airport', country: 'Ethiopia' },
  // Finland
  { icao: 'EFHK', iata: 'HEL', name: 'Helsinki Airport', country: 'Finland' },
  { icao: 'EFKT', iata: 'KTT', name: 'Kittilä Airport', country: 'Finland' },
  { icao: 'EFRO', iata: 'RVN', name: 'Rovaniemi Airport', country: 'Finland' },
  // France
  { icao: 'LFBZ', iata: 'BIQ', name: 'Biarritz Pays Basque Airport', country: 'France' },
  { icao: 'LFBD', iata: 'BOD', name: 'Bordeaux-Mérignac', country: 'France' },
  { icao: 'LFLB', iata: 'CMF', name: 'Chambéry Airport', country: 'France' },
  { icao: 'LFPG', iata: 'CDG', name: 'Paris Charles de Gaulle', country: 'France' },
  { icao: 'LFKF', iata: 'FSC', name: 'Figari Sud-Corse Airport', country: 'France' },
  { icao: 'LFLL', iata: 'LYS', name: 'Lyon Saint-Exupéry', country: 'France' },
  { icao: 'LFRS', iata: 'NTE', name: 'Nantes Atlantique Airport', country: 'France' },
  { icao: 'LFMN', iata: 'NCE', name: 'Nice Côte d\'Azur', country: 'France' },
  { icao: 'LFPO', iata: 'ORY', name: 'Paris Orly', country: 'France' },
  { icao: 'LFOB', iata: 'BVA', name: 'Paris Beauvais', country: 'France' },
  { icao: 'LFRB', iata: 'RNS', name: 'Rennes–Saint-Jacques Airport', country: 'France' },
  { icao: 'LFSB', iata: 'MLH', name: 'Mulhouse', country: 'France' }, // EuroAirport Basel Mulhouse Freiburg (French side)
  { icao: 'LFSB', iata: 'SXB', name: 'Strasbourg Airport', country: 'France' },
  { icao: 'LFBT', iata: 'LDE', name: 'Tarbes-Lourdes-Pyrenees', country: 'France' },
  { icao: 'LFBO', iata: 'TLS', name: 'Toulouse–Blagnac Airport', country: 'France' },
  // Georgia
  { icao: 'UGTB', iata: 'TBS', name: 'Tbilisi International Airport', country: 'Georgia' },
  // Germany
  { icao: 'EDDB', iata: 'BER', name: 'Berlin Brandenburg', country: 'Germany' },
  { icao: 'EDDT', iata: 'TXL', name: 'Berlin Tegel (old)', country: 'Germany' },
  { icao: 'EDDL', iata: 'DUS', name: 'Düsseldorf', country: 'Germany' },
  { icao: 'EDDT', iata: 'FDH', name: 'Friedrichshafen Airport', country: 'Germany' },
  { icao: 'EDDT', iata: 'FRA', name: 'Frankfurt Airport', country: 'Germany' },
  { icao: 'EDDH', iata: 'HAM', name: 'Hamburg', country: 'Germany' },
  { icao: 'EDDM', iata: 'MUC', name: 'Munich', country: 'Germany' },
  { icao: 'EDDT', iata: 'STR', name: 'Stuttgart Airport', country: 'Germany' },
  // Gibraltar
  { icao: 'GIBN', iata: 'GIB', name: 'Gibraltar International Airport', country: 'Gibraltar' },
  // Greece
  { icao: 'LGPA', iata: 'GPA', name: 'Araxos Airport (Patras)', country: 'Greece' },
  { icao: 'LGAV', iata: 'ATH', name: 'Athens Eleftherios Venizelos', country: 'Greece' },
  { icao: 'LGRP', iata: 'CHQ', name: 'Chania International Airport', country: 'Greece' },
  { icao: 'LGKF', iata: 'CFU', name: 'Corfu Ioannis Kapodistrias', country: 'Greece' },
  { icao: 'LGIR', iata: 'HER', name: 'Heraklion Nikos Kazantzakis', country: 'Greece' },
  { icao: 'LGLM', iata: 'EFL', name: 'Kefalonia International Airport', country: 'Greece' },
  { icao: 'LGIR', iata: 'KLX', name: 'Kalamata International Airport', country: 'Greece' },
  { icao: 'LGRP', iata: 'KGS', name: 'Kos International', country: 'Greece' },
  { icao: 'LGMK', iata: 'JMK', name: 'Mykonos', country: 'Greece' },
  { icao: 'LGPZ', iata: 'PVK', name: 'Aktion National Airport (Preveza)', country: 'Greece' },
  { icao: 'LGRP', iata: 'RHO', name: 'Rhodes International', country: 'Greece' },
  { icao: 'LGRP', iata: 'JTR', name: 'Santorini (Thira) International', country: 'Greece' },
  { icao: 'LGST', iata: 'JSH', name: 'Sitia', country: 'Greece' },
  { icao: 'LGSA', iata: 'JSI', name: 'Skiathos Alexandros Papadiamantis', country: 'Greece' },
  { icao: 'LGSM', iata: 'SMI', name: 'Samos International Airport', country: 'Greece' },
  { icao: 'LGSK', iata: 'SKG', name: 'Thessaloniki Macedonia', country: 'Greece' },
  { icao: 'LGSZ', iata: 'ZTH', name: 'Zakynthos Dionysios Solomos', country: 'Greece' },
  // Greenland
  { icao: 'BGSF', iata: 'SFJ', name: 'Kangerlussuaq', country: 'Greenland' },
  // Hungary
  { icao: 'LHBP', iata: 'BUD', name: 'Budapest Ferenc Liszt International Airport', country: 'Hungary' },
  // Iceland
  { icao: 'BIKF', iata: 'KEF', name: 'Keflavik International', country: 'Iceland' },
  // Ireland
  { icao: 'EIDW', iata: 'DUB', name: 'Dublin', country: 'Ireland' },
  // Isle of Man
  { icao: 'EGNS', iata: 'IOM', name: 'Isle of Man Airport', country: 'Isle of Man' },
  // Israel
  { icao: 'LLBG', iata: 'TLV', name: 'Ben Gurion Airport (Tel Aviv)', country: 'Israel' },
  // Jersey
  { icao: 'EGHH', iata: 'JER', name: 'Jersey Airport', country: 'Jersey' },
  // Jordan
  { icao: 'OJAQ', iata: 'AQJ', name: 'Aqaba', country: 'Jordan' },
  // Kosovo
  { icao: 'BKPR', iata: 'PRN', name: 'Pristina', country: 'Kosovo' },
  // Lithuania
  { icao: 'EYKA', iata: 'KUN', name: 'Kaunas Airport', country: 'Lithuania' },
  { icao: 'EYVI', iata: 'VNO', name: 'Vilnius Airport', country: 'Lithuania' },
  // Luxembourg
  { icao: 'ELLX', iata: 'LUX', name: 'Luxembourg Airport', country: 'Luxembourg' },
  // Malta
  { icao: 'LMML', iata: 'MLA', name: 'Malta International', country: 'Malta' },
  // Moldova
  { icao: 'LUKK', iata: 'KIV', name: 'Chișinău International Airport', country: 'Moldova' },
  // Morocco
  { icao: 'GMMN', iata: 'AGA', name: 'Agadir Al Massira Airport', country: 'Morocco' },
  { icao: 'GMAD', iata: 'ESU', name: 'Essaouira-Mogador Airport', country: 'Morocco' },
  { icao: 'GMMN', iata: 'RAK', name: 'Marrakech Menara', country: 'Morocco' },
  { icao: 'GMMN', iata: 'RBA', name: 'Rabat–Salé Airport', country: 'Morocco' },
  { icao: 'GMTT', iata: 'TNG', name: 'Tangier Ibn Battouta Airport', country: 'Morocco' },
  // Netherlands
  { icao: 'EHAM', iata: 'AMS', name: 'Amsterdam Schiphol', country: 'Netherlands' },
  // Norway
  { icao: 'ENBR', iata: 'BGO', name: 'Bergen Airport', country: 'Norway' },
  { icao: 'ENEV', iata: 'EVE', name: 'Harstad/Narvik Airport', country: 'Norway' },
  { icao: 'ENGM', iata: 'OSL', name: 'Oslo Gardermoen', country: 'Norway' },
  { icao: 'ENZV', iata: 'TRF', name: 'Sandefjord Airport, Torp', country: 'Norway' },
  { icao: 'ENTC', iata: 'TOS', name: 'Tromsø Airport', country: 'Norway' },
  { icao: 'ENVA', iata: 'TRD', name: 'Trondheim Airport', country: 'Norway' },
  // Poland
  { icao: 'EPKK', iata: 'KRK', name: 'Kraków John Paul II International Airport', country: 'Poland' },
  { icao: 'EPWA', iata: 'WAW', name: 'Warsaw Chopin Airport', country: 'Poland' },
  // Portugal
  { icao: 'LPFR', iata: 'FAO', name: 'Faro Airport', country: 'Portugal' },
  { icao: 'LPPT', iata: 'LIS', name: 'Lisbon Portela', country: 'Portugal' },
  { icao: 'LPMA', iata: 'FNC', name: 'Madeira Airport', country: 'Portugal' },
  { icao: 'LPPR', iata: 'OPO', name: 'Porto', country: 'Portugal' },
  { icao: 'LPPM', iata: 'PDL', name: 'Ponta Delgada João Paulo II Airport', country: 'Portugal' },
  { icao: 'LPPS', iata: 'PXO', name: 'Porto Santo Airport', country: 'Portugal' },
  // Romania
  { icao: 'LROP', iata: 'OTP', name: 'Henri Coandă International Airport', country: 'Romania' },
  // Serbia
  { icao: 'LYBE', iata: 'BEG', name: 'Belgrade Nikola Tesla', country: 'Serbia' },
  // Slovakia
  { icao: 'LSZH', iata: 'ZQE', name: 'Zilina Airport', country: 'Slovakia' }, // Note: ZQE is actually a rail station code, Zilina Airport ICAO is LZZI. Keeping ZQE as per original list, but flagging.
  // Slovenia
  { icao: 'LJLJ', iata: 'LJU', name: 'Ljubljana Jože Pučnik', country: 'Slovenia' },
  // Spain
  { icao: 'LEAL', iata: 'ALC', name: 'Alicante Elche', country: 'Spain' },
  { icao: 'LEAX', iata: 'LEI', name: 'Almería Airport', country: 'Spain' },
  { icao: 'LEBL', iata: 'BCN', name: 'Barcelona El Prat', country: 'Spain' },
  { icao: 'LEGA', iata: 'BIO', name: 'Bilbao Airport', country: 'Spain' },
  { icao: 'LECO', iata: 'LCG', name: 'A Coruña Airport', country: 'Spain' },
  { icao: 'GCFV', iata: 'FUE', name: 'Fuerteventura Airport', country: 'Spain' },
  { icao: 'GCLP', iata: 'LPA', name: 'Gran Canaria Airport', country: 'Spain' },
  { icao: 'LEIB', iata: 'IBZ', name: 'Ibiza Airport', country: 'Spain' },
  { icao: 'LEJR', iata: 'XRY', name: 'Jerez Airport', country: 'Spain' },
  { icao: 'GCRR', iata: 'ACE', name: 'Lanzarote Airport', country: 'Spain' },
  { icao: 'LEMD', iata: 'MAD', name: 'Madrid Barajas', country: 'Spain' },
  { icao: 'LEMG', iata: 'AGP', name: 'Malaga Costa del Sol', country: 'Spain' },
  { icao: 'LEMH', iata: 'MAH', name: 'Menorca Airport', country: 'Spain' },
  { icao: 'LEPA', iata: 'PMI', name: 'Palma de Mallorca', country: 'Spain' },
  { icao: 'LERT', iata: 'RMU', name: 'Region of Murcia International Airport', country: 'Spain' },
  { icao: 'LEST', iata: 'SCQ', name: 'Santiago de Compostela Airport', country: 'Spain' },
  { icao: 'LEZL', iata: 'SVQ', name: 'Seville Airport', country: 'Spain' },
  { icao: 'GCXO', iata: 'TFS', name: 'Tenerife South Airport', country: 'Spain' },
  { icao: 'LEVC', iata: 'VLC', name: 'Valencia Airport', country: 'Spain' },
  // Sweden
  { icao: 'ESSA', iata: 'ARN', name: 'Stockholm Arlanda Airport', country: 'Sweden' },
  { icao: 'ESGG', iata: 'GOT', name: 'Gothenburg Landvetter Airport', country: 'Sweden' },
  // Switzerland
  { icao: 'LFSB', iata: 'BSL', name: 'EuroAirport Basel Mulhouse Freiburg', country: 'Switzerland' }, // Swiss side
  { icao: 'LSZB', iata: 'BRN', name: 'Bern Airport', country: 'Switzerland' },
  { icao: 'LSGG', iata: 'GVA', name: 'Geneva', country: 'Switzerland' },
  { icao: 'LSGS', iata: 'SIR', name: 'Sion Airport', country: 'Switzerland' },
  { icao: 'LSZH', iata: 'ZRH', name: 'Zurich', country: 'Switzerland' },
  // Tunisia
  { icao: 'DTTJ', iata: 'DJE', name: 'Djerba–Zarzis International Airport', country: 'Tunisia' },
  { icao: 'DTNH', iata: 'NBE', name: 'Enfidha–Hammamet International Airport', country: 'Tunisia' },
  //Cabo Verde
  { icao: 'GVAC', iata: 'SID', name: 'Amílcar Cabral', country: 'Cabo Verde' },
  // United Kingdom
  { icao: 'EGPD', iata: 'ABZ', name: 'Aberdeen Airport', country: 'United Kingdom' },
  { icao: 'EGAA', iata: 'BFS', name: 'Belfast International Airport', country: 'United Kingdom' },
  { icao: 'EGBB', iata: 'BHX', name: 'Birmingham Airport', country: 'United Kingdom' },
  { icao: 'EGNT', iata: 'BOH', name: 'Bournemouth Airport', country: 'United Kingdom' },
  { icao: 'EGNX', iata: 'BRS', name: 'Bristol Airport', country: 'United Kingdom' },
  { icao: 'EGFE', iata: 'CWL', name: 'Cardiff Airport', country: 'United Kingdom' },
  { icao: 'EGPH', iata: 'EDI', name: 'Edinburgh Airport', country: 'United Kingdom' },
  { icao: 'EGTE', iata: 'EXT', name: 'Exeter Airport', country: 'United Kingdom' },
  { icao: 'EGPF', iata: 'GLA', name: 'Glasgow Airport', country: 'United Kingdom' },
  { icao: 'EGPK', iata: 'INV', name: 'Inverness Airport', country: 'United Kingdom' },
  { icao: 'EGNV', iata: 'LDY', name: 'City of Derry Airport', country: 'United Kingdom' },
  { icao: 'EGNM', iata: 'LBA', name: 'Leeds Bradford Airport', country: 'United Kingdom' },
  { icao: 'LGB', iata: 'LCY', name: 'London City Airport', country: 'United Kingdom' },
  { icao: 'EGKK', iata: 'LGW', name: 'London Gatwick', country: 'United Kingdom' },
  { icao: 'EGLL', iata: 'LHR', name: 'London Heathrow', country: 'United Kingdom' },
  { icao: 'EGGW', iata: 'LTN', name: 'London Luton', country: 'United Kingdom' },
  { icao: 'EGSS', iata: 'SEN', name: 'London Southend Airport', country: 'United Kingdom' },
  { icao: 'EGSS', iata: 'STN', name: 'London Stansted', country: 'United Kingdom' },
  { icao: 'EGGD', iata: 'LPL', name: 'Liverpool John Lennon Airport', country: 'United Kingdom' },
  { icao: 'EGCB', iata: 'MAN', name: 'Manchester Airport', country: 'United Kingdom' },
  { icao: 'EGNX', iata: 'EMA', name: 'East Midlands Airport', country: 'United Kingdom' },
  { icao: 'EGPN', iata: 'NQY', name: 'Newquay Airport', country: 'United Kingdom' },
  { icao: 'EGNJ', iata: 'NCL', name: 'Newcastle Airport', country: 'United Kingdom' },
  { icao: 'EGHI', iata: 'SOU', name: 'Southampton Airport', country: 'United Kingdom' },
];

const strikeRules = {
  strikeDate: '2025-11-14', // Data di sciopero: 14 Novembre 2025
  guaranteedTimeBands: [
    { start: '13:00', end: '17:00' }
     ],
  //guaranteedTimeBands: [
    //{ start: '07:00', end: '10:00' },
    //{ start: '18:00', end: '21:00' }
 //],
  // Voli protetti ENAC
  //protectedFlights: [
    //{ origin: 'NAP', destination: 'OLB', time: '11:55' },
   // { origin: 'OLB', destination: 'NAP', time: '13:40' },
   // { origin: 'MXP', destination: 'LMP', time: '16:20' },
    //{ origin: 'MXP', destination: 'SSH', time: '15:25' },
   // ],
};

// Componente per l'icona/logo USB
const USBLogo = () => (
  <img src="/logo.svg.png" alt="Logo USB" className="union-logo h-12 w-12" />
);


// Componente principale dell'applicazione
function App() {
  const [dutyType, setDutyType] = useState(null); // 'flight', 'standby', o 'reportStrike'
  const [baseIcao, setBaseIcao] = useState('');
  const [numSectors, setNumSectors] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [scheduledTimes, setScheduledTimes] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [standbyOption, setStandbyOption] = useState(null);

  // Determina se la data odierna rientra nel periodo di attivazione del link
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizza la data odierna a mezzanotte per il confronto

  const strikeDateObj = new Date(strikeRules.strikeDate);
  strikeDateObj.setHours(0, 0, 0, 0); // Normalizza la data di sciopero a mezzanotte

  const sevenDaysAfterStrikeDateObj = new Date(strikeDateObj);
  sevenDaysAfterStrikeDateObj.setDate(strikeDateObj.getDate() + 7);
  sevenDaysAfterStrikeDateObj.setHours(23, 59, 59, 999); // Imposta alla fine del 7° giorno

  const isLinkActive = today >= strikeDateObj && today <= sevenDaysAfterStrikeDateObj;
  const isFlightStandbyActive = today <= strikeDateObj;

  // useEffect per gestire il caricamento dello script Tally.so
  useEffect(() => {
    if (dutyType !== 'reportStrike') return;

    const loadTallyEmbeds = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      }
    };

    const scriptId = 'tally-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.onload = loadTallyEmbeds;
      document.body.appendChild(script);
    } else {
      loadTallyEmbeds();
    }
  }, [dutyType]);

  // Funzione per generare i segmenti di volo
  const generateFlightSegments = (base, num, destInput) => {
    const segments = [];
    if (!base || !num || !destInput) return segments;
    const baseCode = base.toUpperCase();
    const destinations = destInput.toUpperCase().split('-').filter(d => d);
    if (num === 2 && destinations.length === 1) {
      segments.push({ origin: baseCode, destination: destinations[0], type: `settore 1` });
      segments.push({ origin: destinations[0], destination: baseCode, type: `settore 2` });
    } else if (num === 4 && destinations.length === 2) {
      segments.push({ origin: baseCode, destination: destinations[0], type: `settore 1` });
      segments.push({ origin: destinations[0], destination: baseCode, type: `settore 2` });
      segments.push({ origin: baseCode, destination: destinations[1], type: `settore 3` });
      segments.push({ origin: destinations[1], destination: baseCode, type: `settore 4` });
    }
    return segments;
  };
  
  // Aggiorna il numero di campi per l'orario quando cambiano i settori
  useEffect(() => {
    const parsedNumSectors = parseInt(numSectors, 10);
    const segments = generateFlightSegments(baseIcao, parsedNumSectors, destinationInput);
    setScheduledTimes(Array(segments.length).fill(''));
  }, [numSectors, destinationInput, baseIcao]);

  // Funzioni di utilità per gli aeroporti
  const isKnownAirport = (code) => italianAirports.some(ap => ap.icao === code || ap.iata === code);
  const isItalianAirport = (code) => italianAirports.some(ap => (ap.icao === code || ap.iata === code) && ap.country === 'Italy');

  // Logica per calcolare l'eleggibilità allo sciopero
  const calculateStrikeEligibility = () => {
    setResults([]);
    setMessage('');
    const parsedNumSectors = parseInt(numSectors, 10);

    if (!baseIcao || (parsedNumSectors !== 2 && parsedNumSectors !== 4)) {
      setMessage('Per favore, compila la base di appartenenza e inserisci 2 o 4 per il numero di settori.');
      setIsModalOpen(true);
      return;
    }
    if (!isKnownAirport(baseIcao.toUpperCase())) {
      setMessage(`La base "${baseIcao}" non è un codice aeroportuale valido.`);
      setIsModalOpen(true);
      return;
    }
    if (!isItalianAirport(baseIcao.toUpperCase())) {
      setMessage('La base di appartenenza deve essere un aeroporto italiano per aderire allo sciopero.');
      setIsModalOpen(true);
      return;
    }

    const segments = generateFlightSegments(baseIcao, parsedNumSectors, destinationInput);
    if (segments.length === 0) {
      setMessage('Controlla il numero di settori e le destinazioni inserite.');
      setIsModalOpen(true);
      return;
    }
    if (scheduledTimes.some(time => !time)) {
      setMessage('Per favore, inserisci l\'orario di decollo per ogni volo.');
      setIsModalOpen(true);
      return;
    }

    const newResults = [];
    const reasonsPerFlight = [];

    segments.forEach((segment, index) => {
      let eligible = false;
      let currentReasons = [];
      const flightTime = scheduledTimes[index];
      const [flightHours, flightMinutes] = flightTime.split(':').map(Number);
      const flightTimeInMinutes = flightHours * 60 + flightMinutes;

      const isProtected = strikeRules.protectedFlights.some(pf => pf.origin === segment.origin && pf.destination === segment.destination && pf.time === flightTime);
      
      if (isProtected) {
        currentReasons.push('Volo protetto ENAC: deve essere operato.');
      } else if (!isItalianAirport(segment.origin)) {
        currentReasons.push(`Partenza non da territorio nazionale (${segment.origin}).`);
      } else {
        const isInGuaranteedBand = strikeRules.guaranteedTimeBands.some(band => {
          const [startH, startM] = band.start.split(':').map(Number);
          const [endH, endM] = band.end.split(':').map(Number);
          const startTotalM = startH * 60 + startM;
          const endTotalM = endH * 60 + endM;
          return flightTimeInMinutes >= startTotalM && flightTimeInMinutes <= endTotalM;
        });

        if (isInGuaranteedBand) {
          currentReasons.push(`L'orario (${flightTime}) rientra in una fascia garantita.`);
        } else {
          eligible = true;
          currentReasons.push(`L'orario (${flightTime}) è fuori dalle fasce garantite.`);
          if (segment.origin !== baseIcao.toUpperCase()) {
            currentReasons.push("<strong>(SCIOPERABILE FUORI BASE)</strong>");
          }
        }
      }
      reasonsPerFlight.push({ eligible, reasons: currentReasons, isOutOfBase: segment.origin !== baseIcao.toUpperCase() });
    });
    
    if (reasonsPerFlight.length > 1 && reasonsPerFlight[0].eligible && !reasonsPerFlight[1].eligible && reasonsPerFlight[1].isOutOfBase) {
      reasonsPerFlight[1].reasons.push('<br/><span class="text-xs block mt-2"><strong>ATTENZIONE:</strong> Per effettuare questo volo la compagnia deve farvi posizionare su un volo ferry.</span>');
    }

    reasonsPerFlight.forEach((item, index) => {
      newResults.push({
        flight: `Volo ${index + 1}: DA ${segments[index].origin} a ${segments[index].destination}`,
        eligible: item.eligible,
        reason: item.reasons.join(' '),
      });
    });
    // ==================================================================
    // ========= NUOVA REGOLA PER VOLI DI RITORNO INTERNAZIONALI ==========
    // ==================================================================
    for (let i = 0; i < newResults.length; i += 2) {
      const outboundFlight = newResults[i];
      const returnFlight = newResults[i + 1];

      // Controlla se il volo di andata è scioperabile
      if (outboundFlight && outboundFlight.eligible) {
        const outboundSegment = segments[i];
        // Controlla se la destinazione dell'andata non è italiana (volo internazionale)
        if (outboundSegment && !isItalianAirport(outboundSegment.destination)) {
          // Se le condizioni sono vere, modifica il volo di ritorno
          if (returnFlight) {
            returnFlight.eligible = true;
            returnFlight.reason = 'poiche collegato all\'andata scioperabile';
          }
        }
      }
    }
    
    setResults(newResults);
  };
  
  const resetForm = () => {
    setBaseIcao('');
    setNumSectors('');
    setDestinationInput('');
    setScheduledTimes([]);
    setResults([]);
    setMessage('');
    setStandbyOption(null);
  };

  const handleDutyTypeChange = (e) => {
    resetForm();
    setDutyType(e.target.value);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-300 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        
        <header className="text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <USBLogo />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Verifica Eleggibilità Sciopero Aereo
          </h1>
          <p className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
            14 Novembre 2025 (24 ORE, fasce garantite 13:00 - 17:00)
          </p>
        </header>

        <div className="space-y-4">
          <label className="block text-base font-medium text-gray-700">Seleziona il tipo di attività:</label>
          <div className="space-y-3">
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${dutyType === 'volo' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} ${!isFlightStandbyActive ? 'opacity-60 cursor-not-allowed' : ''}`}>
              <input
                type="radio"
                name="dutyType"
                value="volo"
                checked={dutyType === 'volo'}
                onChange={handleDutyTypeChange}
                disabled={!isFlightStandbyActive}
                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Volo</span>
            </label>
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${dutyType === 'home' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} ${!isFlightStandbyActive ? 'opacity-60 cursor-not-allowed' : ''}`}>
              <input
                type="radio"
                name="dutyType"
                value="home"
                checked={dutyType === 'home'}
                onChange={handleDutyTypeChange}
                disabled={!isFlightStandbyActive}
                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-base font-medium text-gray-800">Home Standby / Adty</span>
            </label>
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${dutyType === 'reportStrike' ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} ${!isLinkActive ? 'opacity-60 cursor-not-allowed' : ''}`}>
              <input
                type="radio"
                name="dutyType"
                value="reportStrike"
                checked={dutyType === 'reportStrike'}
                onChange={handleDutyTypeChange}
                disabled={!isLinkActive}
                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-base font-medium text-gray-800">
                Segnala Adesione Sciopero
                <span className="ml-2 text-sm font-medium text-gray-600">(attivo solo dal giorno dello sciopero)</span>
              </span>
            </label>
          </div>
        </div>

        {/* Sezione VOLO */}
        {dutyType === 'volo' && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="baseIcao" className="block text-sm font-medium text-gray-700 mb-1">Base di Appartenenza (ICAO/IATA)</label>
                <input type="text" id="baseIcao" value={baseIcao} onChange={e => setBaseIcao(e.target.value.toUpperCase())} placeholder="Es. MXP" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="numSectors" className="block text-sm font-medium text-gray-700 mb-1">Numero di settori (2 o 4)</label>
                <input type="number" id="numSectors" value={numSectors} onChange={e => setNumSectors(e.target.value)} placeholder="2 o 4" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            </div>
            {numSectors && (
              <div>
                <label htmlFor="destinationInput" className="block text-sm font-medium text-gray-700 mb-1">
                  {parseInt(numSectors, 10) === 2 ? 'Destinazione (es. FCO)' : 'Destinazioni (es. FCO-BRI)'}
                </label>
                <input type="text" id="destinationInput" value={destinationInput} onChange={e => setDestinationInput(e.target.value.toUpperCase())} placeholder={parseInt(numSectors, 10) === 2 ? 'Es. FCO' : 'Es. FCO-BRI'} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            )}
            {generateFlightSegments(baseIcao, parseInt(numSectors, 10), destinationInput).map((segment, index) => (
              <div key={index}>
                <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Orario di decollo schedulato per {segment.origin}-{segment.destination} ({segment.type})</label>
                <input type="time" id={`time-${index}`} value={scheduledTimes[index] || ''} onChange={e => {
                  const newTimes = [...scheduledTimes];
                  newTimes[index] = e.target.value;
                  setScheduledTimes(newTimes);
                }} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
            ))}
            <button onClick={calculateStrikeEligibility} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">Verifica Volo</button>
          </div>
        )}

        {/* Sezione STANDBY */}
        {dutyType === 'home' && (
          <div className="space-y-4 pt-4 border-t">
            <label className="block text-base font-medium text-gray-700">Seleziona la tua situazione:</label>
            <div className="space-y-3">
              <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${standbyOption === 'notPrecettato' ? 'bg-green-50 border-green-500 ring-2 ring-green-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                <input type="radio" name="standbyOption" value="notPrecettato" checked={standbyOption === 'notPrecettato'} onChange={e => setStandbyOption(e.target.value)} className="h-5 w-5 mt-1 text-green-600 border-gray-300 focus:ring-green-500"/>
                <span className="ml-3 text-sm font-medium text-gray-800">Non hai ricevuto la riserva comandata / mail di precettazione.</span>
              </label>
              <label className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${standbyOption === 'precettato' ? 'bg-red-50 border-red-500 ring-2 ring-red-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                <input type="radio" name="standbyOption" value="precettato" checked={standbyOption === 'precettato'} onChange={e => setStandbyOption(e.target.value)} className="h-5 w-5 mt-1 text-red-600 border-gray-300 focus:ring-red-500"/>
                <span className="ml-3 text-sm font-medium text-gray-800">Hai ricevuto la riserva comandata / mail di precettazione.</span>
              </label>
            </div>
            {standbyOption === 'notPrecettato' && (
              <div className="p-4 rounded-lg bg-green-100 text-green-800 border border-green-300">
                <h3 className="font-bold text-lg">SCIOPERABILE</h3>
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>Chiamare Crewing prima dell'inizio dello Standby o dell'ADTY.</li>
                  <li>Verificare la presenza del codice INDA - fare SCREENSHOT.</li>
                  <li>Non rispondere a eventuali chiamate.</li>
                </ul>
              </div>
            )}
            {standbyOption === 'precettato' && (
              <div className="p-4 rounded-lg bg-red-100 text-red-800 border border-red-300">
                <h3 className="font-bold text-lg">NON SCIOPERABILE</h3>
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>Accettare SOLO voli garantiti da ENAC e/o quelli schedulati nelle fasce protette.</li>
                  <li>NON accettare attività differenti.</li>
                </ul>
              </div>
            )}
          </div>
        )}
        
        {/* Sezione ADESIONE */}
        {dutyType === 'reportStrike' && isLinkActive && (
          <div className="pt-4 border-t">
            <iframe
              data-tally-src="https://tally.so/embed/mKboqA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="357"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Adesione Sciopero 26 Settembre 2025"
            ></iframe>
          </div>
        )}

        {/* Risultati Volo */}
        {results.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-xl font-bold text-center">Risultati Verifica Volo</h3>
            {results.map((res, index) => (
              <div key={index} className={`p-4 rounded-lg border ${res.eligible ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <p className="font-bold text-gray-800">{res.flight}</p>
                <p className={`font-semibold ${res.eligible ? 'text-green-700' : 'text-red-700'}`}>
                  Stato: {res.eligible ? 'SCIOPERABILE' : 'NON SCIOPERABILE'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Motivazione: <span dangerouslySetInnerHTML={{ __html: res.reason }} />
                </p>
              </div>
            ))}
          </div>
        )}


        <footer className="pt-6 border-t text-center space-y-4">
          <p className="text-sm text-gray-600">
            In caso di dubbi, necessità o discordanza riscontrata con le modalità di sciopero comunicate, non esitate a contattare i rappresentanti USB.
          </p>
          <p className="text-xs text-gray-400">
            © 2025 scioperousb.netlify.app – Tutti i diritti riservati. Il design, il codice e i contenuti di questa web app sono protetti da copyright. È vietata la riproduzione o diffusione non autorizzata.
          </p>
        </footer>

      </div>

      {/* Modale per i messaggi */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-gray-800">Attenzione</h3>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

