import React, { useState, useEffect } from 'react';

// Dati mock degli aeroporti italiani per la verifica (simula un database o API)
// Include sia i codici ICAO che IATA
// Mock data for Italian airports for verification (simulates a database or API)
// Includes both ICAO and IATA codes
const italianAirports = [
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
  { icao: 'HESH', iata: 'SSH', name: 'Sharm el-Sheikh International', country: 'Egypt' }, // Aggiunto Sharm el-Sheikh (Egitto)
  { icao: 'LIEE', iata: 'CAG', name: 'Cagliari Elmas', country: 'Italy' },
  { icao: 'LICD', iata: 'LMP', name: 'Lampedusa', country: 'Italy' },
  // Aggiungi altri aeroporti se necessario (sia italiani che esteri che l'app deve riconoscere)
];

// Regole di sciopero aggiornate basate sul testo del PDF
// Updated strike rules based on the PDF text
const strikeRules = {
  strikeDate: '2025-07-10', // Data di sciopero: 10 Luglio 2025
  guaranteedTimeBands: [
    { start: '07:00', end: '10:00' },
    { start: '18:00', end: '21:00' }
  ],
  guaranteedFlights: [
    { origin: 'NAP', destination: 'OLB' },
    { origin: 'OLB', destination: 'NAP' },
    { origin: 'NAP', destination: 'SSH' },
    { origin: 'MXP', destination: 'CAG' },
    { origin: 'CAG', destination: 'MXP' },
    { origin: 'MXP', destination: 'LMP' },
  ],
  // affectedAirports rimane vuoto, si applica a tutto il territorio nazionale
  affectedAirports: [],
};

// Componente principale dell'applicazione
// Main application component
function App() {
  const [baseIcao, setBaseIcao] = useState('');
  const [numSectors, setNumSectors] = useState('');
  const [destinationInput, setDestinationInput] = useState(''); // Holds 'PMO' or 'PMO-BRI'
  const [scheduledTimes, setScheduledTimes] = useState([]); // Array of times for each flight segment
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for message modal

  // Function to generate flight segments based on baseIcao, numSectors, destinationInput
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

  // Effect to manage scheduledTimes array size and reset when numSectors or destinationInput changes
  // Effetto per gestire la dimensione dell'array scheduledTimes e resettarlo quando cambiano numSectors o destinationInput
  useEffect(() => {
    const parsedNumSectors = parseInt(numSectors);
    const currentFlightSegments = generateFlightSegments(baseIcao, parsedNumSectors, destinationInput);
    const requiredTimesCount = currentFlightSegments.length;

    setScheduledTimes(prevTimes => {
      // If the number of required times changes, reset or resize the array
      if (prevTimes.length !== requiredTimesCount) {
        return Array(requiredTimesCount).fill('');
      }
      // Otherwise, keep existing times up to the new length
      return prevTimes.slice(0, requiredTimesCount);
    });
  }, [numSectors, destinationInput, baseIcao]); // Dependencies: numSectors, destinationInput, baseIcao

  // Funzione per verificare se un codice aeroporto è riconosciuto (ICAO o IATA nella lista)
  // Function to check if an airport code is recognized (ICAO or IATA in the list)
  const isKnownAirport = (code) => {
    const normalizedCode = code.toLowerCase();
    return italianAirports.some(airport =>
      airport.icao.toLowerCase() === normalizedCode ||
      (airport.iata && airport.iata.toLowerCase() === normalizedCode)
    );
  };

  // Funzione per verificare se un aeroporto è italiano (controlla sia ICAO che IATA)
  // Function to check if an airport is Italian (checks both ICAO and IATA)
  const isItalianAirport = (code) => {
    const normalizedCode = code.toLowerCase();
    return italianAirports.some(airport =>
      (airport.icao.toLowerCase() === normalizedCode ||
      (airport.iata && airport.iata.toLowerCase() === normalizedCode)) &&
      airport.country === 'Italy'
    );
  };

  // Funzione per calcolare l'eleggibilità allo sciopero
  // Function to calculate strike eligibility
  const calculateStrikeEligibility = () => {
    setResults([]); // Reset dei risultati
    setMessage(''); // Reset del messaggio

    const parsedNumSectors = parseInt(numSectors);

    if (!baseIcao || (parsedNumSectors !== 2 && parsedNumSectors !== 4)) {
      setMessage('Per favore, compila la base di appartenenza e inserisci 2 o 4 per il numero di settori.');
      setIsModalOpen(true);
      return;
    }

    // Validazione iniziale della base di appartenenza
    // Initial validation of home base
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
    // Validation of entered destination codes
    let allDestinationsKnown = true;
    if (parsedNumSectors === 2) {
      if (!isKnownAirport(destinationInput)) {
        setMessage(`Il codice di destinazione "${destinationInput}" non è riconosciuto. Per favore, inserisci un codice ICAO/IATA valido.`);
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

    // Check if all scheduled times are filled
    // Controlla se tutti gli orari schedulati sono stati compilati
    const areAllTimesFilled = scheduledTimes.every(time => time !== '');
    if (!areAllTimesFilled) {
        setMessage('Per favore, inserisci l\'orario di decollo per ogni volo schedulato.');
        setIsModalOpen(true);
        return;
    }


    const newResults = [];
    let flightCounter = 0;

    // Process each generated flight segment with its specific scheduled time
    // Elabora ogni segmento di volo generato con il suo orario schedulato specifico
    currentFlightSegments.forEach((segment, index) => {
        flightCounter++;
        let eligible = false;
        let reason = [];
        const flightDateTime = new Date(`${strikeRules.strikeDate}T${scheduledTimes[index]}`);
        const currentFlightDate = flightDateTime.toISOString().slice(0, 10); // Get 'YYYY-MM-DD'

        // 0. Check if the flight is one of the specifically guaranteed flights
        const isSpecificallyGuaranteed = strikeRules.guaranteedFlights.some(gf =>
          gf.origin.toUpperCase() === segment.origin.toUpperCase() &&
          gf.destination.toUpperCase() === segment.destination.toUpperCase()
        );

        if (isSpecificallyGuaranteed) {
          reason.push('Volo garantito da ENAC, non scioperabile.');
          eligible = false;
        } else {
          // 1. Lo sciopero deve partire dal territorio italiano
          // 1. The strike must start from Italian territory
          if (!isItalianAirport(segment.origin)) {
              reason.push(`L'aeroporto di partenza (${segment.origin}) non è italiano. Sciopero valido solo dal territorio nazionale.`);
              eligible = false;
          } else if (currentFlightDate !== strikeRules.strikeDate) {
              reason.push(`La data del volo (${currentFlightDate}) non rientra nel giorno di sciopero (${strikeRules.strikeDate}).`);
              eligible = false;
          }
          else {
              // 2. Verifica se l'orario del volo rientra in una fascia protetta
              // 2. Check if the flight time falls within a protected band
              let isInProtectedBand = false;
              const flightTimeHours = flightDateTime.getHours();
              const flightTimeMinutes = flightDateTime.getMinutes();

              strikeRules.guaranteedTimeBands.forEach(band => {
                  const [bandStartHour, bandStartMinute] = band.start.split(':').map(Number);
                  const [bandEndHour, bandEndMinute] = band.end.split(':').map(Number);

                  const flightTimeInMinutes = flightTimeHours * 60 + flightTimeMinutes;
                  const bandStartTimeInMinutes = bandStartHour * 60 + bandStartMinute;
                  const bandEndTimeInMinutes = bandEndHour * 60 + bandEndMinute;

                  // Check if flight time is within the protected band (inclusive of start and end times)
                  if (flightTimeInMinutes >= bandStartTimeInMinutes && flightTimeInMinutes <= bandEndTimeInMinutes) {
                      isInProtectedBand = true;
                  }
              });

              if (isInProtectedBand) {
                  reason.push(`L'orario di decollo schedulato (${scheduledTimes[index]}) rientra in una fascia oraria garantita.`);
                  eligible = false;
              } else {
                  // If not specifically guaranteed, from Italy, on strike date, and not in protected band
                  // Then it is eligible for strike
                  eligible = true;
                  // Ho incluso la descrizione dello sciopero nella ragione
                  reason.push(`Eligibile per lo sciopero generale del ${strikeRules.strikeDate}.`);

                  // NEW LOGIC HERE: Check for "fuori base" and format with <strong>
                  // NUOVA LOGICA QUI: Controlla "fuori base" e formatta con <strong>
                  if (segment.origin.toUpperCase() !== baseIcao.toUpperCase()) {
                    // Nota: l'uso di dangerouslySetInnerHTML comporta rischi di XSS se il contenuto non è fidato.
                    // In questo caso è sicuro perché la stringa è generata internamente dall'app.
                    reason.push("(<strong>SCIOPERABILE FUORI BASE</strong>)");
                  }
              }
          }
        }

        newResults.push({
            flight: `Volo ${flightCounter}: da ${segment.origin} a ${segment.destination} (${segment.type}) schedulato alle ${scheduledTimes[index]}`,
            eligible: eligible,
            // Passa l'array reason per essere poi unito e renderizzato come HTML
            reason: reason.join(' '),
        });
    });

    setResults(newResults);
  };

  // Funzione per gestire i cambiamenti nell'input della stringa di destinazione
  // Function to handle changes in the destination string input
  const handleDestinationInputChange = (e) => {
    setDestinationInput(e.target.value);
  };

  const strikeDurationText = `10 Luglio 2025 (24 ORE, fasce garantite 07:00-10:00 e 18:00-21:00)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-blue-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Verifica Eleggibilità Sciopero Aereo - {strikeDurationText}</h1>

        {/* Form di input */}
        {/* Input form */}
        <div className="space-y-5">
          <div>
            <label htmlFor="baseIcao" className="block text-sm font-medium text-gray-700 mb-1">
              Base di Appartenenza (Codice ICAO/IATA es. LIMC o MXP)
            </label>
            <input
              type="text"
              id="baseIcao"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={baseIcao}
              onChange={(e) => setBaseIcao(e.target.value.toUpperCase())}
              placeholder="Es. LIMC o MXP"
            />
          </div>

          <div>
            <label htmlFor="numSectors" className="block text-sm font-medium text-gray-700 mb-1">
              Quanti settori prevede il tuo duty? (2 o 4)
            </label>
            <input
              type="number"
              id="numSectors"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          {/* Field for destinations */}
          { (parseInt(numSectors) === 2 || parseInt(numSectors) === 4) && (
            <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Destinazione/i del Duty</h3>
              <div>
                <label htmlFor="destinationInput" className="block text-sm font-medium text-gray-700 mb-1">
                  {parseInt(numSectors) === 2 ?
                    'Inserisci la sigla ICAO/IATA della destinazione (es. PMO):' :
                    'Inserisci le sigle ICAO/IATA delle due destinazioni (es. PMO-BRI):'
                  }
                </label>
                <input
                  type="text"
                  id="destinationInput"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={destinationInput}
                  onChange={handleDestinationInputChange}
                  placeholder={parseInt(numSectors) === 2 ? "Es. LICJ o PMO" : "Es. LICJ-LIBD o PMO-BRI"}
                />
              </div>
            </div>
          )}

          {/* Campi dinamici per gli orari di decollo per ogni segmento di volo */}
          {/* Dynamic fields for scheduled departure times for each flight segment */}
          { (parseInt(numSectors) === 2 || parseInt(numSectors) === 4) &&
            destinationInput && baseIcao && generateFlightSegments(baseIcao, parseInt(numSectors), destinationInput).length > 0 && (
            <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Orari di Decollo Schedulati</h3>
              <div className="space-y-3">
                {generateFlightSegments(baseIcao, parseInt(numSectors), destinationInput).map((segment, index) => (
                  <div key={index}>
                    <label htmlFor={`scheduledTime-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Orario di decollo schedulato per {segment.origin}-{segment.destination} ({segment.type})
                    </label>
                    <input
                      type="time"
                      id={`scheduledTime-${index}`}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Verifica Sciopero
          </button>
        </div>

        {/* Risultati */}
        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Risultati Verifica</h2>
            <div className="space-y-4">
              {results.map((res, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-sm ${
                    res.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className="text-lg font-semibold text-gray-800">
                    {res.flight}
                  </p>
                  {/* Usa dangerouslySetInnerHTML per renderizzare il tag <strong> */}
                  {/* Use dangerouslySetInnerHTML to render the <strong> tag */}
                  <p className={`text-md ${res.eligible ? 'text-green-700' : 'text-red-700'}`}>
                    Stato: <span className="font-bold">{res.eligible ? 'ELIGIBILE' : 'NON ELIGIBILE'}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Motivazione: <span dangerouslySetInnerHTML={{ __html: res.reason }} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modale per i messaggi */}
        {/* Message Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Attenzione!</h3>
              <p className="text-sm text-gray-500 mb-6">{message}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Chiudi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
