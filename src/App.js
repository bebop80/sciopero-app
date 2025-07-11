import React, { useState, useEffect } from 'react';

// Dati degli aeroporti serviti da EasyJet (incluse le destinazioni internazionali)
const italianAirports = [
  // AEROPORTI ITALIANI
  { icao: 'LIMC', iata: 'MXP', name: 'Milano Malpensa', country: 'Italy' },
  { icao: 'LIRF', iata: 'FCO', name: 'Roma Fiumicino', country: 'Italy' },
  { icao: 'LICJ', iata: 'PMO', name: 'Palermo Falcone Borsellino', country: 'Italy' },
  { icao: 'LIBD', iata: 'BRI', name: 'Bari Karol Wojtyla', country: 'Italy' },
  { icao: 'LICC', iata: 'CTA', name: 'Catania Fontanarossa', country: 'Italy' },
  { icao: 'LIPE', iata: 'BLQ', name: 'Bologna Guglielmo Marconi', country: 'Italy' },
  { icao: 'LIRN', iata: 'NAP', name: 'Napoli Capodichino', country: 'Italy' },
  { icao: 'LIPZ', iata: 'VCE', name: 'Venezia Marco Polo', country: 'Italy' },
  { icao: 'LIRA', iata: 'CIA', name: 'Roma Ciampino', country: 'Italy' },
  { icao: 'LIML', iata: 'LIN', name: 'Milano Linate', country: 'Italy' },
  { icao: 'LIRJ', iata: 'OLB', name: 'Olbia Costa Smeralda', country: 'Italy' },
  { icao: 'LIEE', iata: 'CAG', name: 'Cagliari Elmas', country: 'Italy' },
  { icao: 'LICD', iata: 'LMP', name: 'Lampedusa', country: 'Italy' },
  { icao: 'LIRP', iata: 'PSA', name: 'Pisa Galileo Galilei', country: 'Italy' },
  { icao: 'LIPY', iata: 'VRN', name: 'Verona Villafranca', country: 'Italy' },
  { icao: 'LIEC', iata: 'BDS', name: 'Brindisi Papola Casale', country: 'Italy' },
  { icao: 'LICA', iata: 'SUF', name: 'Lamezia Terme', country: 'Italy' },
  { icao: 'LIRP', iata: 'PSR', name: 'Pescara Abruzzo', country: 'Italy' },
  { icao: 'LIPB', iata: 'RMI', name: 'Rimini Federico Fellini', country: 'Italy' },
  { icao: 'LIRS', iata: 'FLR', name: 'Firenze Peretola', country: 'Italy' },
  { icao: 'LILP', iata: 'TRN', name: 'Torino Caselle', country: 'Italy' },
  { icao: 'LIBN', iata: 'FOG', name: 'Foggia Gino Lisa', country: 'Italy' },
  { icao: 'LIBG', iata: 'CCV', name: 'Crotone Sant\'Anna', country: 'Italy' },
  { icao: 'LICB', iata: 'REG', name: 'Reggio Calabria Tito Minniti', country: 'Italy' },
  { icao: 'LIPQ', iata: 'TSF', name: 'Treviso Antonio Canova', country: 'Italy' },
  { icao: 'LIPV', iata: 'AHO', name: 'Alghero Fertilia', country: 'Italy' },
  { icao: 'LIPR', iata: 'CUF', name: 'Cuneo Levaldigi', country: 'Italy' },
  { icao: 'LIQJ', iata: 'QSR', name: 'Salerno Costa d\'Amalfi', country: 'Italy' },
  { icao: 'LICG', iata: 'CIY', name: 'Comiso Vincenzo Magliocco', country: 'Italy' },
  { icao: 'LIEO', iata: 'GOA', name: 'Genova Cristoforo Colombo', country: 'Italy' },
  { icao: 'LIPA', iata: 'AOI', name: 'Ancona Falconara', country: 'Italy' },
  { icao: 'LIPU', iata: 'TRS', name: 'Trieste Ronchi dei Legionari', country: 'Italy' },

  // AEROPORTI INTERNAZIONALI EasyJet
  { icao: 'EGLL', iata: 'LHR', name: 'London Heathrow', country: 'United Kingdom' },
  { icao: 'EGKK', iata: 'LGW', name: 'London Gatwick', country: 'United Kingdom' },
  { icao: 'EGGW', iata: 'LTN', name: 'London Luton', country: 'United Kingdom' },
  { icao: 'EGSS', iata: 'STN', name: 'London Stansted', country: 'United Kingdom' },
  { icao: 'LFPG', iata: 'CDG', name: 'Paris Charles de Gaulle', country: 'France' },
  { icao: 'LFPO', iata: 'ORY', name: 'Paris Orly', country: 'France' },
  { icao: 'EHAM', iata: 'AMS', name: 'Amsterdam Schiphol', country: 'Netherlands' },
  { icao: 'LSGG', iata: 'GVA', name: 'Geneva', country: 'Switzerland' },
  { icao: 'LSZH', iata: 'ZRH', name: 'Zurich', country: 'Switzerland' },
  { icao: 'EDDB', iata: 'BER', name: 'Berlin Brandenburg', country: 'Germany' },
  { icao: 'EDDH', iata: 'HAM', name: 'Hamburg', country: 'Germany' },
  { icao: 'EDDM', iata: 'MUC', name: 'Munich', country: 'Germany' },
  { icao: 'EDDL', iata: 'DUS', name: 'Düsseldorf', country: 'Germany' },
  { icao: 'LEBL', iata: 'BCN', name: 'Barcelona El Prat', country: 'Spain' },
  { icao: 'LEMD', iata: 'MAD', name: 'Madrid Barajas', country: 'Spain' },
  { icao: 'LEPA', iata: 'PMI', name: 'Palma de Mallorca', country: 'Spain' },
  { icao: 'LEMG', iata: 'AGP', name: 'Malaga Costa del Sol', country: 'Spain' },
  { icao: 'LEAL', iata: 'ALC', name: 'Alicante Elche', country: 'Spain' },
  { icao: 'LPPT', iata: 'LIS', name: 'Lisbon Portela', country: 'Portugal' },
  { icao: 'LPPR', iata: 'OPO', name: 'Porto', country: 'Portugal' },
  { icao: 'LGAV', iata: 'ATH', name: 'Athens Eleftherios Venizelos', country: 'Greece' },
  { icao: 'LGIR', iata: 'HER', name: 'Heraklion Nikos Kazantzakis', country: 'Greece' },
  { icao: 'LGRP', iata: 'RHO', name: 'Rhodes International', country: 'Greece' },
  { icao: 'LGMK', iata: 'JMK', name: 'Mykonos', country: 'Greece' },
  { icao: 'LGSK', iata: 'SKG', name: 'Thessaloniki Macedonia', country: 'Greece' },
  { icao: 'LCLK', iata: 'LCA', name: 'Larnaca', country: 'Cyprus' },
  { icao: 'LCPH', iata: 'PFO', name: 'Paphos', country: 'Cyprus' },
  { icao: 'LKPR', iata: 'PRG', name: 'Prague Václav Havel', country: 'Czech Republic' },
  { icao: 'EKCH', iata: 'CPH', name: 'Copenhagen Kastrup', country: 'Denmark' },
  { icao: 'EIDW', iata: 'DUB', name: 'Dublin', country: 'Ireland' },
  { icao: 'LFLL', iata: 'LYS', name: 'Lyon Saint-Exupéry', country: 'France' },
  { icao: 'LFBD', iata: 'BOD', name: 'Bordeaux-Mérignac', country: 'France' },
  { icao: 'LFMN', iata: 'NCE', name: 'Nice Côte d\'Azur', country: 'France' },
  { icao: 'LFPO', iata: 'ORY', name: 'Paris Orly', country: 'France' },
  { icao: 'GMMN', iata: 'RAK', name: 'Marrakech Menara', country: 'Morocco' },
  { icao: 'HECA', iata: 'CAI', name: 'Cairo International', country: 'Egypt' },
  { icao: 'HESH', iata: 'SSH', name: 'Sharm el-Sheikh International', country: 'Egypt' },
  { icao: 'HEGN', iata: 'HRG', name: 'Hurghada International', country: 'Egypt' },
  { icao: 'HEBA', iata: 'RMF', name: 'Marsa Alam International', country: 'Egypt' },
  { icao: 'BGSF', iata: 'SFJ', name: 'Kangerlussuaq', country: 'Greenland' },
  { icao: 'BIKF', iata: 'KEF', name: 'Keflavik International', country: 'Iceland' },
  { icao: 'LFSB', iata: 'BSL', name: 'EuroAirport Basel Mulhouse Freiburg', country: 'Switzerland' },
  { icao: 'EDDT', iata: 'TXL', name: 'Berlin Tegel (old)', country: 'Germany' }, // Incluso per compatibilità con dati storici
  { icao: 'LGRP', iata: 'PVK', name: 'Preveza-Lefkada Aktion', country: 'Greece' },
  { icao: 'LGSM', iata: 'JSI', name: 'Skiathos Alexandros Papadiamantis', country: 'Greece' },
  { icao: 'LGSZ', iata: 'ZTH', name: 'Zakynthos Dionysios Solomos', country: 'Greece' },
  { icao: 'LYBE', iata: 'BEG', name: 'Belgrade Nikola Tesla', country: 'Serbia' },
  { icao: 'LJLJ', iata: 'LJU', name: 'Ljubljana Jože Pučnik', country: 'Slovenia' },
  { icao: 'LQSA', iata: 'SJJ', name: 'Sarajevo International', country: 'Bosnia and Herzegovina' },
  { icao: 'LMML', iata: 'MLA', name: 'Malta International', country: 'Malta' },
  { icao: 'EBLG', iata: 'LGG', name: 'Liege Airport', country: 'Belgium' },
  { icao: 'EBBR', iata: 'BRU', name: 'Brussels Airport', country: 'Belgium' },
  { icao: 'LGRP', iata: 'KGS', name: 'Kos International', country: 'Greece' },
  { icao: 'LGMK', iata: 'AXM', name: 'Araxos Airport (Patras)', country: 'Greece' },
  { icao: 'LGKF', iata: 'CFU', name: 'Corfu Ioannis Kapodistrias', country: 'Greece' },
  { icao: 'LGSK', iata: 'SKG', name: 'Thessaloniki Macedonia', country: 'Greece' },
  { icao: 'LGRP', iata: 'JTR', name: 'Santorini (Thira) International', country: 'Greece' },
  { icao: 'LFRB', iata: 'RNS', name: 'Rennes–Saint-Jacques Airport', country: 'France' },
  { icao: 'LFRS', iata: 'NTE', name: 'Nantes Atlantique Airport', country: 'France' },
  { icao: 'LFSB', iata: 'SXB', name: 'Strasbourg Airport', country: 'France' },
  { icao: 'LFBO', iata: 'TLS', name: 'Toulouse–Blagnac Airport', country: 'France' },
  { icao: 'GMMN', iata: 'AGA', name: 'Agadir Al Massira Airport', country: 'Morocco' },
  { icao: 'GMAD', iata: 'ESU', name: 'Essaouira-Mogador Airport', country: 'Morocco' },
  { icao: 'GMTT', iata: 'TNG', name: 'Tangier Ibn Battouta Airport', country: 'Morocco' },
  { icao: 'ESSA', iata: 'ARN', name: 'Stockholm Arlanda Airport', country: 'Sweden' },
  { icao: 'ESGG', iata: 'GOT', name: 'Gothenburg Landvetter Airport', country: 'Sweden' },
  { icao: 'ENZV', iata: 'TRF', name: 'Sandefjord Airport, Torp', country: 'Norway' },
  { icao: 'ENVA', iata: 'TRD', name: 'Trondheim Airport', country: 'Norway' },
  { icao: 'ENBR', iata: 'BGO', name: 'Bergen Airport', country: 'Norway' },
  { icao: 'EFHK', iata: 'HEL', name: 'Helsinki Airport', country: 'Finland' },
  { icao: 'EFKT', iata: 'KTT', name: 'Kittilä Airport', country: 'Finland' },
  { icao: 'EFRO', iata: 'RVN', name: 'Rovaniemi Airport', country: 'Finland' },
  { icao: 'LROP', iata: 'OTP', name: 'Henri Coandă International Airport', country: 'Romania' },
  { icao: 'UGTB', iata: 'TBS', name: 'Tbilisi International Airport', country: 'Georgia' },
  { icao: 'EYKA', iata: 'KUN', name: 'Kaunas Airport', country: 'Lithuania' },
  { icao: 'EYVI', iata: 'VNO', name: 'Vilnius Airport', country: 'Lithuania' },
  { icao: 'EPKK', iata: 'KRK', name: 'Kraków John Paul II International Airport', country: 'Poland' },
  { icao: 'EPWA', iata: 'WAW', name: 'Warsaw Chopin Airport', country: 'Poland' },
  { icao: 'LUKK', iata: 'KIV', name: 'Chișinău International Airport', country: 'Moldova' },
  { icao: 'EBCI', iata: 'CRL', name: 'Brussels South Charleroi Airport', country: 'Belgium' },
  { icao: 'EGNM', iata: 'LBA', name: 'Leeds Bradford Airport', country: 'United Kingdom' },
  { icao: 'EGPF', iata: 'GLA', name: 'Glasgow Airport', country: 'United Kingdom' },
  { icao: 'EGPH', iata: 'EDI', name: 'Edinburgh Airport', country: 'United Kingdom' },
  { icao: 'EGAA', iata: 'BFS', name: 'Belfast International Airport', country: 'United Kingdom' },
  { icao: 'EGBB', iata: 'BHX', name: 'Birmingham Airport', country: 'United Kingdom' },
  { icao: 'EGNX', iata: 'EMA', name: 'East Midlands Airport', country: 'United Kingdom' },
  { icao: 'EGCB', iata: 'MAN', name: 'Manchester Airport', country: 'United Kingdom' },
  { icao: 'EGNJ', iata: 'NCL', name: 'Newcastle Airport', country: 'United Kingdom' },
  { icao: 'EGPD', iata: 'ABZ', name: 'Aberdeen Airport', country: 'United Kingdom' },
  { icao: 'EGSS', iata: 'SEN', name: 'London Southend Airport', country: 'United Kingdom' },
  { icao: 'EGFE', iata: 'CWL', name: 'Cardiff Airport', country: 'United Kingdom' },
  { icao: 'EGNT', iata: 'BOH', name: 'Bournemouth Airport', country: 'United Kingdom' },
  { icao: 'EGPK', iata: 'INV', name: 'Inverness Airport', country: 'United Kingdom' },
  { icao: 'EGPN', iata: 'NQY', name: 'Newquay Airport', country: 'United Kingdom' },
  { icao: 'EGHI', iata: 'SOU', name: 'Southampton Airport', country: 'United Kingdom' },
  { icao: 'EGNX', iata: 'BRS', name: 'Bristol Airport', country: 'United Kingdom' },
  { icao: 'EGGD', iata: 'LPL', name: 'Liverpool John Lennon Airport', country: 'United Kingdom' },
  { icao: 'EGNV', iata: 'LDY', name: 'City of Derry Airport', country: 'United Kingdom' },
  { icao: 'EGHH', iata: 'JER', name: 'Jersey Airport', country: 'Jersey' },
  { icao: 'EGNS', iata: 'IOM', name: 'Isle of Man Airport', country: 'Isle of Man' },
  { icao: 'LPFR', iata: 'FAO', name: 'Faro Airport', country: 'Portugal' },
  { icao: 'LPMA', iata: 'FNC', name: 'Madeira Airport', country: 'Portugal' },
  { icao: 'GCFV', iata: 'FUE', name: 'Fuerteventura Airport', country: 'Spain' },
  { icao: 'GCLP', iata: 'LPA', name: 'Gran Canaria Airport', country: 'Spain' },
  { icao: 'GCRR', iata: 'ACE', name: 'Lanzarote Airport', country: 'Spain' },
  { icao: 'GCXO', iata: 'TFS', name: 'Tenerife South Airport', country: 'Spain' },
  { icao: 'LEIB', iata: 'IBZ', name: 'Ibiza Airport', country: 'Spain' },
  { icao: 'LEST', iata: 'SCQ', name: 'Santiago de Compostela Airport', country: 'Spain' },
  { icao: 'LERT', iata: 'RMU', name: 'Region of Murcia International Airport', country: 'Spain' },
  { icao: 'LEVC', iata: 'VLC', name: 'Valencia Airport', country: 'Spain' },
  { icao: 'LEJR', iata: 'XRY', name: 'Jerez Airport', country: 'Spain' },
  { icao: 'GIBN', iata: 'GIB', name: 'Gibraltar International Airport', country: 'Gibraltar' },
  { icao: 'DTTJ', iata: 'DJE', name: 'Djerba–Zarzis International Airport', country: 'Tunisia' },
  { icao: 'DTNH', iata: 'NBE', name: 'Enfidha–Hammamet International Airport', country: 'Tunisia' },
  { icao: 'HAAB', iata: 'ADD', name: 'Addis Ababa Bole International Airport', country: 'Ethiopia' },
  { icao: 'DAAG', iata: 'ALG', name: 'Algiers Houari Boumediene Airport', country: 'Algeria' },
  { icao: 'DABM', iata: 'BJA', name: 'Bejaïa Abane Ramdane Airport', country: 'Algeria' },
  { icao: 'EGTE', iata: 'EXT', name: 'Exeter Airport', country: 'United Kingdom' },
  { icao: 'LFLB', iata: 'CMF', name: 'Chambéry Airport', 'country': 'France' },
  { icao: 'LSGS', iata: 'SIR', name: 'Sion Airport', country: 'Switzerland' },
  { icao: 'EBOS', iata: 'OST', name: 'Ostend–Bruges International Airport', country: 'Belgium' },
  { icao: 'LFSB', iata: 'MLH', name: 'Mulhouse', country: 'France' },
  { icao: 'LSZB', iata: 'BRN', name: 'Bern Airport', country: 'Switzerland' },
  { icao: 'LOWI', iata: 'INN', name: 'Innsbruck Airport', country: 'Austria' },
  { icao: 'LOWS', iata: 'SZG', name: 'Salzburg Airport', country: 'Austria' },
  { icao: 'LOWW', iata: 'VIE', name: 'Vienna International Airport', country: 'Austria' },
  { icao: 'LBBG', iata: 'BOJ', name: 'Burgas Airport', country: 'Bulgaria' },
  { icao: 'LBSF', iata: 'SOF', name: 'Sofia Airport', country: 'Bulgaria' },
  { icao: 'GVAC', iata: 'SID', name: 'Amílcar Cabral International Airport (Sal)', country: 'Cape Verde' },
  { icao: 'LDDU', iata: 'DBV', name: 'Dubrovnik Airport', country: 'Croatia' },
  { icao: 'LDPL', iata: 'PUY', name: 'Pula Airport', country: 'Croatia' },
  { icao: 'LDSP', iata: 'SPU', name: 'Split Airport', country: 'Croatia' },
  { icao: 'LDZA', iata: 'ZAD', name: 'Zadar Airport', country: 'Croatia' },
  { icao: 'LEMH', iata: 'MAH', name: 'Menorca Airport', country: 'Spain' },
  { icao: 'HECA', iata: 'LXHR', name: 'Luxor International Airport', country: 'Egypt' },
  { icao: 'ETAR', iata: 'SPX', name: 'Sphinx International Airport (Giza)', country: 'Egypt' },
  { icao: 'EDDT', iata: 'FRA', name: 'Frankfurt Airport', country: 'Germany' },
  { icao: 'EDDT', iata: 'FDH', name: 'Friedrichshafen Airport', country: 'Germany' },
  { icao: 'EDDT', iata: 'STR', name: 'Stuttgart Airport', country: 'Germany' },
  { icao: 'LGB', iata: 'LCY', name: 'London City Airport', country: 'United Kingdom' },
  { icao: 'LGRP', iata: 'CHQ', name: 'Chania International Airport', country: 'Greece' },
  { icao: 'LGIR', iata: 'KLX', name: 'Kalamata International Airport', country: 'Greece' },
  { icao: 'LGLM', iata: 'EFL', name: 'Kefalonia International Airport', country: 'Greece' },
  { icao: 'LGPZ', iata: 'PVK', name: 'Aktion National Airport (Preveza)', country: 'Greece' },
  { icao: 'LGSA', iata: 'JSI', name: 'Skiathos International Airport', country: 'Greece' },
  { icao: 'LGSZ', iata: 'ZTH', name: 'Zakynthos International Airport', country: 'Greece' },
  { icao: 'LHBP', iata: 'BUD', name: 'Budapest Ferenc Liszt International Airport', country: 'Hungary' },
  { icao: 'LLBG', iata: 'TLV', name: 'Ben Gurion Airport (Tel Aviv)', country: 'Israel' },
  { icao: 'LPPM', iata: 'PDL', name: 'Ponta Delgada João Paulo II Airport', country: 'Portugal' },
  { icao: 'LPPS', iata: 'PXO', name: 'Porto Santo Airport', country: 'Portugal' },
  { icao: 'LSZH', iata: 'ZQE', name: 'Zilina Airport', country: 'Slovakia' },
  { icao: 'LEAX', iata: 'LEI', name: 'Almería Airport', country: 'Spain' },
  { icao: 'LEGA', iata: 'BIO', name: 'Bilbao Airport', country: 'Spain' },
  { icao: 'LEJR', iata: 'XRY', name: 'Jerez Airport', country: 'Spain' },
  { icao: 'GMMN', iata: 'RBA', name: 'Rabat–Salé Airport', country: 'Morocco' },
  { icao: 'LBBG', iata: 'VAR', name: 'Varna Airport', country: 'Bulgaria' },
  { icao: 'EETN', iata: 'TLL', name: 'Tallinn Airport', country: 'Estonia' },
  // Nuovi aeroporti aggiunti dalle liste fornite:
  { icao: 'LECO', iata: 'LCG', name: 'A Coruña Airport', country: 'Spain' },
  { icao: 'LEZL', iata: 'SVQ', name: 'Seville Airport', country: 'Spain' },
  { icao: 'ENEV', iata: 'EVE', name: 'Harstad/Narvik Airport', country: 'Norway' },
  { icao: 'ENTC', iata: 'TOS', name: 'Tromsø Airport', country: 'Norway' },
  { icao: 'LGSM', iata: 'SMI', name: 'Samos International Airport', country: 'Greece' },
  { icao: 'LGPA', iata: 'GPA', name: 'Araxos Airport', country: 'Greece' },
  { icao: 'HELX', iata: 'LXR', name: 'Luxor International Airport', country: 'Egypt' },
  { icao: 'LFBZ', iata: 'BIQ', name: 'Biarritz Pays Basque Airport', country: 'France' },
  { icao: 'LFKF', iata: 'FSC', name: 'Figari Sud-Corse Airport', country: 'France' },
  { icao: 'ELLX', iata: 'LUX', name: 'Luxembourg Airport', country: 'Luxembourg' },
];

// Regole di sciopero aggiornate
const strikeRules = {
  strikeDate: '2025-07-11', // Data di sciopero: 10 Luglio 2025
  guaranteedTimeBands: [
    { start: '07:00', end: '10:00' },
    { start: '18:00', end: '21:00' }
  ],
  guaranteedFlights: [
    // La nuova regola indica che i voli da/per PMO non sono scioperabili, quindi li aggiungiamo qui
    // Nota: I codici ICAO e IATA sono trattati in modo interscambiabile nella funzione isKnownAirport
    // e per confronto con la lista `italianAirports`. Qui usiamo 'PMO' come IATA per chiarezza.
    { origin: 'LICJ', destination: 'ANY' }, // Voli in partenza da Palermo (ICAO: LICJ)
    { origin: 'ANY', destination: 'LICJ' }, // Voli in arrivo a Palermo (ICAO: LICJ)
    { origin: 'PMO', destination: 'ANY' }, // Voli in partenza da Palermo (IATA: PMO)
    { origin: 'ANY', destination: 'PMO' }, // Voli in arrivo a Palermo (IATA: PMO)
  ],
  affectedAirports: [], // rimane vuoto, si applica a tutto il territorio nazionale
  // Nuova regola per Palermo: "TUTTI i voli da/per PMO DEVONO essere operati da ogni base."
  // Questo non si traduce direttamente in una regola di "non scioperabilità" generale
  // ma piuttosto una condizione operativa che l'app, per ora, non valida.
  // La gestione della "totale esclusione dei voli in partenza ed in arrivo all'aeroporto di Palermo"
  // è già coperta dall'aggiunta a guaranteedFlights.
  
  // Voli protetti ENAC (precedentemente aggiunti)
  protectedFlights: [
    { origin: 'MXP', destination: 'CAG', time: '22:50' },
    { origin: 'MXP', destination: 'LMP', time: '13:10' },
    { origin: 'LMP', destination: 'MXP', time: '16:00' },
    { origin: 'CAG', destination: 'NAP', time: '11:40' },
    { origin: 'MXP', destination: 'SPX', time: '17:00' },
  ],
};

// Componente principale dell'applicazione
function App() {
  const [dutyType, setDutyType] = useState(null); // 'flight', 'standby' or 'reportStrike'
  const [baseIcao, setBaseIcao] = useState('');
  const [numSectors, setNumSectors] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [scheduledTimes, setScheduledTimes] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [standbyOption, setStandbyOption] = useState(null); // 'notPrecettato' or 'precettato'

  // Determina se la data odierna corrisponde alla data dello sciopero
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // I mesi sono 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  const currentFormattedDate = `${year}-${month}-${day}`;
  const isStrikeDay = currentFormattedDate === strikeRules.strikeDate;

  // Funzione per generare i segmenti di volo in base a baseIcao, numSectors, destinationInput
  const generateFlightSegments = (base, num, destInput) => {
    const segments = [];
    const baseCode = base.toUpperCase();
    const destinations = destInput.toUpperCase().split('-').filter(d => d);
    let sectorNum = 1;
    if (num === 2 && destinations.length === 1) {
      segments.push({ origin: baseCode, destination: destinations[0], type: `settore ${sectorNum++}` });
      segments.push({ origin: destinations[0], destination: baseCode, type: `settore ${sectorNum++}` });
    } else if (num === 4 && destinations.length === 2) {
      segments.push({ origin: baseCode, destination: destinations[0], type: `settore ${sectorNum++}` });
      segments.push({ origin: destinations[0], destination: baseCode, type: `settore ${sectorNum++}` });
      segments.push({ origin: baseCode, destination: destinations[1], type: `settore ${sectorNum++}` });
      segments.push({ origin: destinations[1], destination: baseCode, type: `settore ${sectorNum++}` });
    }
    return segments;
  };

  // Effetto per gestire la dimensione dell'array scheduledTimes e resettarlo quando cambiano numSectors o destinationInput
  useEffect(() => {
    const parsedNumSectors = parseInt(numSectors);
    const currentFlightSegments = generateFlightSegments(baseIcao, parsedNumSectors, destinationInput);
    const requiredTimesCount = currentFlightSegments.length;

    setScheduledTimes(prevTimes => {
      if (prevTimes.length !== requiredTimesCount) {
        return Array(requiredTimesCount).fill('');
      }
      return prevTimes.slice(0, requiredTimesCount);
    });
  }, [numSectors, destinationInput, baseIcao]);

  // Funzione per verificare se un codice aeroporto è riconosciuto (ICAO o IATA nella lista)
  const isKnownAirport = (code) => {
    const normalizedCode = code.toLowerCase();
    return italianAirports.some(airport =>
      airport.icao.toLowerCase() === normalizedCode ||
      (airport.iata && airport.iata.toLowerCase() === normalizedCode)
    );
  };

  // Funzione per verificare se un aeroporto è italiano (controlla sia ICAO che IATA)
  const isItalianAirport = (code) => {
    const normalizedCode = code.toLowerCase();
    return italianAirports.some(airport =>
      (airport.icao.toLowerCase() === normalizedCode ||
      (airport.iata && airport.iata.toLowerCase() === normalizedCode)) &&
      airport.country === 'Italy'
    );
  };

  // Funzione per calcolare l'eleggibilità allo sciopero (per i voli)
  const calculateStrikeEligibility = () => {
    setResults([]);
    setMessage('');
    const parsedNumSectors = parseInt(numSectors);

    if (!baseIcao || (parsedNumSectors !== 2 && parsedNumSectors !== 4)) {
      setMessage('Per favore, compila la base di appartenenza e inserisci 2 o 4 per il numero di settori.');
      setIsModalOpen(true);
      return;
    }

    // Validazione iniziale della base di appartenenza
    if (!isKnownAirport(baseIcao)) {
      setMessage(`Il codice della base di appartenenza "${baseIcao}" non è riconosciuto. Per favore, inserisci un codice ICAO/IATA valido.`);
      setIsModalOpen(true);
      return;
    }
    if (!isItalianAirport(baseIcao)) {
      setMessage('La base di appartenenza deve essere un aeroporto italiano per aderire allo sciopero.');
      setIsModalOpen(true);
      return;
    }

    const currentFlightSegments = generateFlightSegments(baseIcao, parsedNumSectors, destinationInput);
    if (currentFlightSegments.length === 0) {
      setMessage('Impossibile generare i segmenti di volo. Controlla il numero di settori e il formato delle destinazioni.');
      setIsModalOpen(true);
      return;
    }

    // Validazione dei codici di destinazione inseriti
    let allDestinationsKnown = true;
    if (parsedNumSectors === 2) {
      if (!isKnownAirport(destinationInput)) {
        setMessage(`Il codice di destinazione "${destinationInput}" non è riconosciuto. Per favor, inserisci un codice ICAO/IATA valido.`);
        setIsModalOpen(true);
        allDestinationsKnown = false;
      }
    } else if (parsedNumSectors === 4) {
      const destinations = destinationInput.split('-').map(d => d.trim()).filter(d => d);
      if (destinations.length !== 2) {
        setMessage('Per 4 settori, inserisci esattamente due sigle ICAO/IATA separate da un trattino (es. PMO-BRI).');
        setIsModalOpen(true);
        allDestinationsKnown = false;
      } else {
        if (!isKnownAirport(destinations[0]) || !isKnownAirport(destinations[1])) {
          setMessage(`Uno o più codici di destinazione inseriti (${destinations.join('-')}) non sono riconosciuti. Per favore, inserisci codici ICAO/IATA validi.`);
          setIsModalOpen(true);
          allDestinationsKnown = false;
        }
      }
    }
    if (!allDestinationsKnown) {
      return;
    }

    // Controlla se tutti gli orari schedulati sono stati compilati
    const areAllTimesFilled = scheduledTimes.every(time => time !== '');
    if (!areAllTimesFilled) {
        setMessage('Per favor, inserisci l\'orario di decollo per ogni volo schedulato.');
        setIsModalOpen(true);
        return;
    }

    const reasonsPerFlight = [];

    currentFlightSegments.forEach((segment, index) => {
        let eligible = false;
        let currentReasons = []; // Inizializza come array
        const flightDateTime = new Date(`${strikeRules.strikeDate}T${scheduledTimes[index]}`);
        const currentFlightDate = flightDateTime.toISOString().slice(0, 10);
        const flightTimeHours = flightDateTime.getHours();
        const flightTimeMinutes = flightDateTime.getMinutes();
        const flightTimeInMinutes = flightTimeHours * 60 + flightTimeMinutes;

        const isOriginPMO = segment.origin.toUpperCase() === 'PMO' || segment.origin.toUpperCase() === 'LICJ';
        const isDestinationPMO = segment.destination.toUpperCase() === 'PMO' || segment.destination.toUpperCase() === 'LICJ';

        // Check if the current flight is a protected flight by ENAC (Highest priority)
        const isProtectedFlight = strikeRules.protectedFlights.some(
          (pf) =>
            (pf.origin.toUpperCase() === segment.origin.toUpperCase() || pf.origin.toUpperCase() === italianAirports.find(a => a.iata === pf.origin.toUpperCase())?.icao.toUpperCase()) &&
            (pf.destination.toUpperCase() === segment.destination.toUpperCase() || pf.destination.toUpperCase() === italianAirports.find(a => a.iata === pf.destination.toUpperCase())?.icao.toUpperCase()) &&
            pf.time === scheduledTimes[index]
        );

        if (isProtectedFlight) {
          currentReasons.push('Volo protetto ENAC: deve essere operato.');
          eligible = false;
        } else if (!isItalianAirport(segment.origin)) {
            // Check if origin is Italian (if not, not scioperabile)
            currentReasons.push(`L'aeroporto di partenza (${segment.origin}) non è italiano. Sciopero valido solo dal territorio nazionale.`);
            eligible = false;
        } else if (currentFlightDate !== strikeRules.strikeDate) {
            // Check if flight is on the strike date
            currentReasons.push(`La data del volo (${currentFlightDate}) non rientra nel giorno di sciopero (${strikeRules.strikeDate}).`);
            eligible = false;
        } else if (isOriginPMO || isDestinationPMO) {
            // Check if PMO flight
            currentReasons.push('Volo non scioperabile: esclusi i voli in partenza e in arrivo all\'aeroporto di Palermo (PMO).');
            eligible = false;
        } else {
            // Normal time band check
            let isInProtectedBand = false;
            let protectedBandInfo = '';
            strikeRules.guaranteedTimeBands.forEach(band => {
                const [bandStartHour, bandStartMinute] = band.start.split(':').map(Number);
                const [bandEndHour, bandEndMinute] = band.end.split(':').map(Number);

                const bandStartTimeInMinutes = bandStartHour * 60 + bandStartMinute;
                const bandEndTimeInMinutes = bandEndHour * 60 + bandEndMinute; 

                if (flightTimeInMinutes >= bandStartTimeInMinutes && flightTimeInMinutes <= bandEndTimeInMinutes) {
                    isInProtectedBand = true;
                    protectedBandInfo = `(${band.start}-${band.end})`;
                }
            });

            if (isInProtectedBand) {
                currentReasons.push(`Volo non scioperabile: l'orario di decollo schedulato (${scheduledTimes[index]}) rientra in una fascia oraria garantita ${protectedBandInfo}.`);
                eligible = false;
            } else {
                eligible = true;
                const allGuaranteedBands = strikeRules.guaranteedTimeBands.map(band => `${band.start}-${band.end}`).join(' e ');
                currentReasons.push(`Volo scioperabile: l'orario di decollo schedulato (${scheduledTimes[index]}) è fuori dalle fasce orarie garantite (${allGuaranteedBands}).`);

                // La postilla "SCIOPERABILE FUORI BASE" verrà aggiunta in un ciclo successivo se applicabile
                // e non sovrascritta dalla nuova regola di ritorno internazionale.
            }
        }
        reasonsPerFlight.push({ eligible: eligible, reasons: currentReasons, isOutOfBase: (segment.origin.toUpperCase() !== baseIcao.toUpperCase()) });
    });

    // --- NUOVA REGOLA: Eleggibilità dei voli di ritorno da voli internazionali scioperabili ---
    if (parsedNumSectors === 2) {
        const outboundSegment = currentFlightSegments[0];
        const returnSegment = currentFlightSegments[1];
        const outboundResult = reasonsPerFlight[0];
        const returnResult = reasonsPerFlight[1];

        // Verifica se il volo di andata è scioperabile e la sua destinazione non è italiana (internazionale)
        const isOutboundInternationalAndEligible =
            outboundResult.eligible && !isItalianAirport(outboundSegment.destination);

        // Verifica se il volo di ritorno NON è un volo protetto ENAC (la protezione ENAC ha priorità assoluta)
        const isReturnFlightActuallyProtectedENAC = strikeRules.protectedFlights.some(
            (pf) =>
                (pf.origin.toUpperCase() === returnSegment.origin.toUpperCase() ||
                 (italianAirports.find(a => a.iata === pf.origin.toUpperCase()) && italianAirports.find(a => a.iata === pf.origin.toUpperCase()).icao.toUpperCase() === returnSegment.origin.toUpperCase())) &&
                (pf.destination.toUpperCase() === returnSegment.destination.toUpperCase() ||
                 (italianAirports.find(a => a.iata === pf.destination.toUpperCase()) && italianAirports.find(a => a.iata === pf.destination.toUpperCase()).icao.toUpperCase() === returnSegment.destination.toUpperCase())) &&
                pf.time === scheduledTimes[1]
        );

        if (isOutboundInternationalAndEligible && !isReturnFlightActuallyProtectedENAC) {
            returnResult.eligible = true;
            // Imposta le ragioni direttamente con la motivazione richiesta, senza postilla ferry qui
            returnResult.reasons = [
                'conseguentemente al volo scioperabile di andata.'
            ];
        }
    } else if (parsedNumSectors === 4) {
        // Prima coppia di segmenti (0 e 1)
        const outboundSegment1 = currentFlightSegments[0];
        const returnSegment1 = currentFlightSegments[1];
        const outboundResult1 = reasonsPerFlight[0];
        const returnResult1 = reasonsPerFlight[1];

        const isOutbound1InternationalAndEligible =
            outboundResult1.eligible && !isItalianAirport(outboundSegment1.destination);

        const isReturn1FlightActuallyProtectedENAC = strikeRules.protectedFlights.some(
            (pf) =>
                (pf.origin.toUpperCase() === returnSegment1.origin.toUpperCase() ||
                 (italianAirports.find(a => a.iata === pf.origin.toUpperCase()) && italianAirports.find(a => a.iata === pf.origin.toUpperCase()).icao.toUpperCase() === returnSegment1.origin.toUpperCase())) &&
                (pf.destination.toUpperCase() === returnSegment1.destination.toUpperCase() ||
                 (italianAirports.find(a => a.iata === pf.destination.toUpperCase()) && italianAirports.find(a => a.iata === pf.destination.toUpperCase()).icao.toUpperCase() === returnSegment1.destination.toUpperCase())) &&
                pf.time === scheduledTimes[1]
        );

        if (isOutbound1InternationalAndEligible && !isReturn1FlightActuallyProtectedENAC) {
            returnResult1.eligible = true;
            returnResult1.reasons = [
                'conseguentemente al volo scioperabile di andata.'
            ];
        }

        // Seconda coppia di segmenti (2 e 3)
        const outboundSegment2 = currentFlightSegments[2];
        const returnSegment2 = currentFlightSegments[3];
        const outboundResult2 = reasonsPerFlight[2];
        const returnResult2 = reasonsPerFlight[3];

        const isOutbound2InternationalAndEligible =
            outboundResult2.eligible && !isItalianAirport(outboundSegment2.destination);

        const isReturn2FlightActuallyProtectedENAC = strikeRules.protectedFlights.some(
            (pf) =>
                (pf.origin.toUpperCase() === returnSegment2.origin.toUpperCase() ||
                 (italianAirports.find(a => a.iata === pf.origin.toUpperCase()) && italianAirports.find(a => a.iata === pf.origin.toUpperCase()).icao.toUpperCase() === returnSegment2.origin.toUpperCase())) &&
                (pf.destination.toUpperCase() === returnSegment2.destination.toUpperCase() ||
                 (italianAirports.find(a => a.iata === pf.destination.toUpperCase()) && italianAirports.find(a => a.iata === pf.destination.toUpperCase()).icao.toUpperCase() === returnSegment2.destination.toUpperCase())) &&
                pf.time === scheduledTimes[3]
        );

        if (isOutbound2InternationalAndEligible && !isReturn2FlightActuallyProtectedENAC) {
            returnResult2.eligible = true;
            returnResult2.reasons = [
                'conseguentemente al volo scioperabile di andata.'
            ];
        }
    }

    // Postilla per "Scioperabile fuori base" (applicata dopo la nuova regola)
    for (let i = 0; i < reasonsPerFlight.length; i++) { // Corrected: changed '=' to '<'
        const item = reasonsPerFlight[i];
        // Verifica se la ragione contiene la dicitura del volo di ritorno internazionale scioperabile
        const isInternationalReturnOverride = item.reasons.some(reason => reason.includes('conseguentemente al volo scioperabile di andata.'));

        // Aggiungi la postilla "Scioperabile fuori base" SOLO se non è un volo di ritorno internazionale gestito dalla nuova regola
        if (item.eligible && item.isOutOfBase && !isInternationalReturnOverride) {
            item.reasons.push('<br/><span style="font-size: 0.75em; display: block; margin-top: 0.5em;">');
            item.reasons.push('<strong>ATTENZIONE:</strong> In caso di sciopero da fuori sede, si ritornerà a disposizione dell\'Azienda al termine dello sciopero. L’azienda dovrà provvedere al riposizionamento del lavoratore al termine dello sciopero. Se l’azienda si rifiutasse di riposizionare i lavoratori nella propria base di armamento e ciò dovesse comportare l’impossibilità di effettuare il turno del giorno dopo, il lavoratore non potrà subire alcuna azione disciplinare ma anzi l’azienda sarà passibile di sanzione.');
            item.reasons.push('</span>');
        }
    }

    // Postilla per voli ferry (generale, non per i casi di ritorno internazionale scioperabile)
    for (let i = 1; i < reasonsPerFlight.length; i++) {
        const previousFlightResult = reasonsPerFlight[i - 1];
        const currentFlightResult = reasonsPerFlight[i];

        const currentFlightReasonText = currentFlightResult.reasons.join(' ');
        
        const isCurrentFlightNonEligibleForFerryPostilla = 
            (!currentFlightResult.eligible && currentFlightReasonText.includes('fascia oraria garantita')) ||
            (!currentFlightResult.eligible && currentFlightReasonText.includes('non è italiano')) ||
            (!currentFlightResult.eligible && currentFlightReasonText.includes('Volo protetto ENAC')); 

        // Assicurati che questa postilla non venga aggiunta ai voli di ritorno internazionali che sono già stati gestiti
        const isInternationalReturnOverride = currentFlightResult.reasons.some(reason => reason.includes('conseguentemente al volo scioperabile di andata.'));

        if (previousFlightResult.eligible && isCurrentFlightNonEligibleForFerryPostilla && currentFlightResult.isOutOfBase && !isInternationalReturnOverride) {
            currentFlightResult.reasons.push('<br/><span style="font-size: 0.75em; display: block; margin-top: 0.5em;">');
            currentFlightResult.reasons.push('<strong>ATTENZIONE:</strong> Per effettuare questo volo la compagnia deve farvi posizionare su un volo ferry operato non da voi ma da un equipaggio di riserva non scioperante.');
            currentFlightResult.reasons.push('</span>'); 
        }
    }


    // Popola i risultati finali unendo le ragioni in stringhe
    const newResults = reasonsPerFlight.map((item, index) => ({
      flight: `Volo ${index + 1}: da ${currentFlightSegments[index].origin} a ${currentFlightSegments[index].destination} (${currentFlightSegments[index].type}) schedulato alle ${scheduledTimes[index]}`,
      eligible: item.eligible,
      reason: item.reasons.join(' '),
    }));

    setResults(newResults);
  };

  const handleDestinationInputChange = (e) => {
    setDestinationInput(e.target.value.trim()); // Aggiunto .trim()
  };

  // Funzione per resettare gli stati quando si cambia tipo di duty
  const resetForm = () => {
    setBaseIcao('');
    setNumSectors('');
    setDestinationInput('');
    setScheduledTimes([]);
    setResults([]);
    setMessage('');
    setStandbyOption(null);
  };

  const strikeDurationText = `10 Luglio 2025 (24 ORE, fasce garantite 07:00-10:00 e 18:00-21:00)`;


  return (
    <div className="app-container">
      {/* Stili CSS integrati direttamente nel componente */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Generale */
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden; /* Previene lo scroll orizzontale */
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box; /* Assicura che padding e border siano inclusi nella larghezza */
        }
        *, *::before, *::after {
            box-sizing: inherit;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #4F46E5, #93C5FD);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          width: 100%; /* Assicura che occupi la larghezza completa */
        }

        .main-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 1rem;
          /* Ombreggiature migliorate */
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
          width: 100%;
          /* Occupa tutta la larghezza disponibile */
          max-width: 48rem;
          /* Limite massimo per desktop */
          border: 1px solid #e5e7eb;
        }

        .main-title {
          font-size: 2.25rem;
          font-weight: 800; /* Più audace come nell'immagine */
          color: #111827;
          margin-bottom: 2rem;
          text-align: center;
          letter-spacing: -0.025em;
          line-height: 1.2;
          word-wrap: break-word; /* Forza il testo a capo se troppo lungo */
          display: flex; /* Permette all'immagine e al testo di stare sulla stessa riga */
          align-items: center; /* Allinea verticalmente al centro */
          justify-content: center; /* Centra il contenuto */
          gap: 0.75rem; /* Spazio tra logo e testo */
          flex-wrap: wrap; /* Permette al contenuto di andare a capo su schermi piccoli */
        }

        .union-logo {
            width: 3rem; /* Dimensione del logo */
            height: 3rem; /* Rende il logo quadrato */
            border-radius: 0.5rem; /* Bordi arrotondati */
            object-fit: contain; /* Assicura che l'immagine sia contenuta senza distorsioni */
            margin-right: 0.5rem; /* Spazio a destra del logo */
        }

        .main-title-text-container {
          display: flex;
          flex-direction: column;
          align-items: center; /* Centra il testo all'interno del suo contenitore */
        }

        .main-title-date {
          color: #2563eb;
          font-size: 1.5rem;
          display: block;
          margin-top: 0.5rem;
          font-weight: 600; /* Leggermente più spesso */
        }

        .main-disclaimer {
            font-size: 0.85em;
            color: #4B5563;
            display: block;
            margin-top: 0.5rem;
            text-align: center; /* Centra il testo */
        }

        .form-sections-container > *:not(:last-child) {
            margin-bottom: 1.5rem;
        }
        .form-sections-container .main-button {
            margin-top: 1.5rem;
        }

        .input-group {
          /* Nessun margine qui, gestito dal contenitore genitore */
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }

        .input-field {
          display: block;
          width: 100%; /* Fondamentale per la responsività */
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease-in-out;
          box-sizing: border-box; /* Cruciale per includere padding nel width */
        }

        .input-field:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }

        .section-card {
          border: 1px solid #e5e7eb;
          padding: 1.25rem;
          border-radius: 0.5rem;
          background-color: #f9fafb;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          /* Il margin-top è gestito da .form-sections-container */
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 1rem;
          word-wrap: break-word; /* Assicura che il titolo vada a capo */
        }

        .section-content-space > div:not(:last-child) {
          margin-bottom: 0.75rem;
        }
        
        .main-button {
          width: 100%;
          background-color: #4F46E5;
          color: #ffffff;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          /* Ombreggiature migliorate per i bottoni */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease-in-out;
          transform: scale(1);
          letter-spacing: 0.025em;
          border: none;
          cursor: pointer;
        }

        .main-button:hover {
          background-color: #4338CA;
          transform: scale(1.02);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 3px rgba(0, 0, 0, 0.12); /* Ombra più pronunciata al hover */
        }

        .main-button:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5);
        }

        .results-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          text-align: center;
        }

        .result-item {
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          margin-bottom: 1rem;
        }

        .result-item.eligible {
          background-color: #F0FDF4;
          border: 1px solid #6EE7B7;
        }

        .result-item.not-eligible {
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
        }

        .result-flight {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1F2937;
          word-wrap: break-word; /* Assicura che il testo vada a capo */
        }

        .result-status {
          font-size: 1rem;
          font-weight: 700;
        }

        .result-status.eligible-text {
          color: #047857;
        }

        .result-status.not-eligible-text {
          color: #B91C1C;
        }

        .result-reason {
          font-size: 0.875rem;
          color: #4B5563;
          word-wrap: break-word; /* Assicura che il testo vada a capo */
        }

        /* Stili della Modale */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(75, 85, 99, 0.5);
          overflow-y: auto;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal-content {
          position: relative;
          padding: 1.25rem;
          border: 1px solid #d1d5db;
          width: 100%; /* Responsività per la modale */
          max-width: 24rem;
          /* Limite massimo per la modale */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border-radius: 0.375rem;
          background-color: #ffffff;
          text-align: center;
          box-sizing: border-box; /* Cruciale per includere padding nel width */
        }

        .modal-title {
          font-size: 1.125rem;
          line-height: 1.5rem;
          font-weight: 500;
          color: #111827;
          margin-bottom: 1rem;
        }

        .modal-message {
          font-size: 0.875rem;
          color: #6B7280;
          margin-bottom: 1.5rem;
        }

        .modal-button {
          margin-top: 0.75rem;
          width: 100%;
          display: inline-flex;
          justify-content: center;
          border-radius: 0.375rem;
          border: 1px solid transparent;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          padding: 0.5rem 1rem;
          background-color: #2563EB;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.15s ease-in-out;
          cursor: pointer;
        }

        .modal-button:hover {
          background-color: #1D4ED8;
        }

        .modal-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5), 0 0 0 2px rgba(59, 130, 246, 0.5);
        }

        /* Stili per i radio button personalizzati */
        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .radio-option {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            background-color: #f9fafb;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }

        .radio-option:hover {
            background-color: #edf2f7;
            border-color: #a0aec0;
        }

        .radio-option.selected {
            border-color: #4F46E5;
            background-color: #EEF2FF;
            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
        }

        .radio-option input[type="radio"] {
            margin-right: 0.75rem;
            /* Nasconde il radio button nativo */
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 2px solid #9ca3af;
            border-radius: 50%;
            width: 1.25rem;
            height: 1.25rem;
            outline: none;
            cursor: pointer;
            position: relative;
            flex-shrink: 0; /* Impedisce al radio di restringersi */
        }

        .radio-option input[type="radio"]:checked {
            border-color: #4F46E5;
            background-color: #4F46E5;
        }

        .radio-option input[type="radio"]:checked::before {
            content: '';
            display: block;
            width: 0.5rem;
            height: 0.5rem;
            background-color: #ffffff;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .radio-option-label {
            font-size: 1rem;
            color: #1F2937;
            font-weight: 500;
            flex-grow: 1; /* Permette al testo di occupare lo spazio rimanente */
        }

        /* Stili per i risultati Home Standby / Adty */
        .standby-result-box {
            padding: 1.5rem;
            border-radius: 0.75rem;
            margin-top: 1.5rem;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .standby-result-box.green {
            background-color: #D1FAE5; /* green-100 */
            border: 2px solid #34D399; /* green-400 */
            color: #065F46; /* green-800 */
        }

        .standby-result-box.red {
            background-color: #FEE2E2; /* red-100 */
            border: 2px solid #EF4444; /* red-400 */
            color: #991B1B; /* red-800 */
        }

        .standby-result-box h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
        }

        .standby-result-box p {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 0.5rem;
        }

        .standby-result-box strong {
            font-weight: 700;
        }

        /* Media queries per la responsività */
        @media (max-width: 768px) {
          .main-card {
            padding: 1rem;
            /* Riduci il padding su schermi piccoli */
          }
          .main-title {
            font-size: 1.75rem;
            /* Riduci la dimensione del titolo su mobile */
          }
          .main-title-date {
            font-size: 1.125rem;
          }
          .union-logo {
            width: 2.5rem;
            height: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .main-card {
            padding: 0.75rem;
            /* Ancora meno padding su schermi molto piccoli */
          }
          .main-title {
            font-size: 1.5rem;
          }
          .main-title-date {
            font-size: 1rem;
          }
          .union-logo {
            width: 2rem;
            height: 2rem;
          }
        }

        .contact-disclaimer {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e5e7eb;
            font-size: 0.875rem;
            color: #4B5563;
            text-align: center;
            line-height: 1.5;
        }

        .copyright-text {
            margin-top: 1rem;
            font-size: 0.75rem; /* Caratteri più piccoli */
            color: #6B7280; /* Colore grigio chiaro */
            text-align: center;
            padding-top: 0.75rem;
            border-top: 1px solid #e5e7eb; /* Linea sottile sopra il copyright */
        }
        .tally-link {
            display: block;
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.875rem;
            color: #2563eb; /* Un colore blu per il link */
            text-decoration: none; /* Nessuna sottolineatura di default */
            font-weight: 500;
            transition: color 0.2s ease-in-out;
        }

        .tally-link:hover {
            color: #1D4ED8; /* Un blu più scuro al passaggio del mouse */
            text-decoration: underline; /* Sottolineatura al passaggio del mouse */
        }

        .disabled-option {
          opacity: 0.6;
          cursor: not-allowed;
          background-color: #e9ecef; /* Sfondo più chiaro per disabilitato */
        }

        .disabled-option:hover {
          background-color: #e9ecef; /* Previene l'effetto hover quando disabilitato */
          border-color: #d1d5db; /* Mantiene il colore del bordo originale quando disabilitato */
        }

        .disabled-option input[type="radio"] {
          cursor: not-allowed;
        }
        `}
      </style>

      <div className="app-container">
        <div className="main-card">
          <h1 className="main-title">
            {/* Il logo del sindacato, caricato dalla cartella public */}
            <img
              src="/favicon.ico" // Percorso corretto per il file nella cartella public
              alt="Logo Sindacato"
              className="union-logo"
            />
            <div className="main-title-text-container">
              Verifica Eleggibilità Sciopero Aereo
              <span className="main-title-date">{strikeDurationText}</span>
              <span className="main-disclaimer">esclusi dallo sciopero tutti i voli da / per PMO</span>
            </div>
          </h1>

          {/* Scelta iniziale: Volo o Home Standby / Adty */}
          <div className="form-sections-container">
            <div className="input-group">
              <label className="input-label">Seleziona il tipo di attività:</label>
              <div className="radio-group">
                <label className={`radio-option ${dutyType === 'flight' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="dutyType"
                    value="flight"
                    checked={dutyType === 'flight'}
                    onChange={(e) => { setDutyType(e.target.value); resetForm(); }}
                  />
                  Volo
                </label>
                <label className={`radio-option ${dutyType === 'standby' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="dutyType"
                    value="standby"
                    checked={dutyType === 'standby'}
                    onChange={(e) => { setDutyType(e.target.value); resetForm(); }}
                  />
                  Home Standby / Adty
                </label>
                <label className={`radio-option ${dutyType === 'reportStrike' ? 'selected' : ''} ${!isStrikeDay ? 'disabled-option' : ''}`}>
                  <input
                    type="radio"
                    name="dutyType"
                    value="reportStrike"
                    checked={dutyType === 'reportStrike'}
                    onChange={(e) => { setDutyType(e.target.value); resetForm(); }}
                    disabled={!isStrikeDay}
                  />
                  Segnala Adesione Sciopero
                </label>
              </div>
            </div>

            {/* Sezione per i voli (visibile solo se dutyType è 'flight') */}
            {dutyType === 'flight' && (
              <>
                <div className="input-group">
                  <label htmlFor="baseIcao" className="input-label">
                    Base di Appartenenza (Codice ICAO/IATA es. LIMC o MXP)
                  </label>
                  <input
                    type="text"
                    id="baseIcao"
                    className="input-field"
                    value={baseIcao}
                    onChange={(e) => setBaseIcao(e.target.value.trim().toUpperCase())}
                    placeholder="Es. LIMC o MXP"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="numSectors" className="input-label">
                    Quanti settori prevede il tuo duty? (2 o 4)
                  </label>
                  <input
                    type="number"
                    id="numSectors"
                    className="input-field"
                    value={numSectors}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNumSectors(value === '' ? '' : Math.max(0, parseInt(value)));
                    }}
                    min="0"
                    placeholder="Es. 2 o 4"
                  />
                </div>

                {/* Campo per le destinazioni */}
                { (parseInt(numSectors) === 2 || parseInt(numSectors) === 4) && (
                  <div className="section-card">
                    <h3 className="section-title">Destinazione/i del Duty</h3>
                    <div className="section-content-space">
                      <div>
                        <label htmlFor="destinationInput" className="input-label">
                          {parseInt(numSectors) === 2 ?
                            'Inserisci la sigla ICAO/IATA della destinazione (es. PMO):' :
                            'Inserisci le sigle ICAO/IATA delle due destinazioni (es. PMO-BRI):'
                          }
                        </label>
                        <input
                          type="text"
                          id="destinationInput"
                          className="input-field"
                          value={destinationInput}
                          onChange={handleDestinationInputChange}
                          placeholder={parseInt(numSectors) === 2 ? "Es. LICJ o PMO" : "Es. LICJ-LIBD o PMO-BRI"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Campi dinamici per gli orari di decollo per ogni segmento di volo */}
                { (parseInt(numSectors) === 2 || parseInt(numSectors) === 4) &&
                  destinationInput && baseIcao && generateFlightSegments(baseIcao, parseInt(numSectors), destinationInput).length > 0 && (
                  <div className="section-card">
                    <h3 className="section-title">Orari di Decollo Schedulati</h3>
                    <div className="section-content-space">
                      {generateFlightSegments(baseIcao, parseInt(numSectors), destinationInput).map((segment, index) => (
                        <div key={index}>
                          <label htmlFor={`scheduledTime-${index}`} className="input-label">
                            Orario di decollo schedulato per {segment.origin}-{segment.destination} ({segment.type})
                          </label>
                          <input
                            type="time"
                            id={`scheduledTime-${index}`}
                            className="input-field"
                            value={scheduledTimes[index] || ''}
                            onChange={(e) => {
                              const newTimes = [...scheduledTimes];
                              newTimes[index] = e.target.value;
                              setScheduledTimes(newTimes);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={calculateStrikeEligibility}
                  className="main-button"
                >
                  Verifica Sciopero
                </button>
              </>
            )}

            {/* Sezione per Home Standby / Adty (visibile solo se dutyType è 'standby') */}
            {dutyType === 'standby' && (
              <>
                <div className="input-group">
                  <label className="input-label">Seleziona la tua situazione:</label>
                  <div className="radio-group">
                    <label className={`radio-option ${standbyOption === 'notPrecettato' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="standbyOption"
                        value="notPrecettato"
                        checked={standbyOption === 'notPrecettato'}
                        onChange={(e) => setStandbyOption(e.target.value)}
                      />
                      Non hai ricevuto la riserva comandata / Non hai ricevuto mail di precettazione della riserva / il tuo ID number non è stato precettato
                    </label>
                    <label className={`radio-option ${standbyOption === 'precettato' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="standbyOption"
                        value="precettato"
                        checked={standbyOption === 'precettato'}
                        onChange={(e) => setStandbyOption(e.target.value)}
                      />
                      Hai ricevuto la riserva comandata / Hai ricevuto mail di precettazione della riserva / il tuo ID number è stato precettato
                    </label>
                  </div>
                </div>

                {standbyOption === 'notPrecettato' && (
                  <div className="standby-result-box green">
                    <h3>SCIOPERABILE</h3>
                    <p>PROCEDERE COME SEGUE:</p>
                    <ul>
                      <li>- Chiamare Crewing prima dell'inizio dello Standby</li>
                      <li>- Verificare dopo la telefonata la presenza del codice INDA per l'intero giorno</li>
                      <li>- Non rispondere ad eventuali chiamate da parte di Crewing</li>
                    </ul>
                  </div>
                )}

                {standbyOption === 'precettato' && (
                  <div className="standby-result-box red">
                    <h3>NON SCIOPERABILE</h3>
                    <p>SEGUIRE LE SEGUENTI INDICAZIONI:</p>
                    <ul>
                      <li>- accettare SOLO voli garantiti da Enac e nella fascia protetta 7:00 - 10:00 / 18:00 - 21:00</li>
                      <li>- NON accettare attività differenti da quelle del punto sopra</li>
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Sezione per Segnala Adesione Sciopero (visibile solo se dutyType è 'reportStrike' e isStrikeDay è true) */}
            {dutyType === 'reportStrike' && isStrikeDay && (
              <div className="section-card">
                {/* Testo cliccabile diretto */}
                <a
                  href="https://tally.so/r/nGEgro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tally-link"
                >
                  Clicca QUI per segnalare la tua adesione allo sciopero
                </a>
              </div>
            )}

          </div>

          {/* Risultati (solo per i voli) */}
          {dutyType === 'flight' && results.length > 0 && (
            <div className="results-section">
              <h2 className="results-title">Risultati Verifica</h2>
              <div className="section-content-space">
                {results.map((res, index) => (
                  <div
                    key={index}
                    className={`result-item ${
                      res.eligible ? 'eligible' : 'not-eligible'
                    }`}
                  >
                    <p className="result-flight">
                      {res.flight}
                    </p>
                    <p className={`result-status ${res.eligible ? 'eligible-text' : 'not-eligible-text'}`}>
                      Stato: <span className="font-bold">{res.eligible ? 'SCIOPERABILE' : 'NON SCIOPERABILE'}</span>
                    </p>
                    <p className="result-reason">
                      Motivazione: <span dangerouslySetInnerHTML={{ __html: res.reason }} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modale per i messaggi */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3 className="modal-title">Attenzione!</h3>
                <p className="modal-message">{message}</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="modal-button"
                >
                  Chiudi
                </button>
              </div>
            </div>
          )}

          {/* Nuova dicitura a fine pagina */}
          <div className="contact-disclaimer">
            In caso di dubbi, necessità o discordanza riscontrata con le modalità di sciopero comunicate, non esitate a contattare i rappresentanti USB.
          </div>

          {/* Protezione dei diritti d'autore */}
          <div className="copyright-text">
            © 2025 scioperousb.netlify.app – Tutti i diritti riservati. Il design, il codice e i contenuti di questa web app sono protetti da copyright. È vietata la riproduzione o diffusione non autorizzata, anche parziale, senza esplicita autorizzazione.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
