import React, { useState, useEffect } from 'react';
// Non è più necessario importare un file CSS esterno, gli stili sono inclusi qui sotto.

// Dati mock degli aeroporti italiani per la verifica (simula un database o API)
// Include sia i codici ICAO che IATA
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
  { icao: 'HESH', iata: 'SSH', name: 'Sharm el-Sheikh International', country: 'Egypt' },
  { icao: 'LIEE', iata: 'CAG', name: 'Cagliari Elmas', country: 'Italy' },
  { icao: 'LICD', iata: 'LMP', name: 'Lampedusa', country: 'Italy' },
  // Aggiungi altri aeroporti se necessario (sia italiani che esteri che l'app deve riconoscere)
];

// Regole di sciopero aggiornate basate sul testo del PDF
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
  affectedAirports: [], // rimane vuoto, si applica a tutto il territorio nazionale
};

// Componente principale dell'applicazione
function App() {
  const [baseIcao, setBaseIcao] = useState('');
  const [numSectors, setNumSectors] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [scheduledTimes, setScheduledTimes] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Funzione per calcolare l'eleggibilità allo sciopero
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

    // Controlla se tutti gli orari schedulati sono stati compilati
    const areAllTimesFilled = scheduledTimes.every(time => time !== '');
    if (!areAllTimesFilled) {
        setMessage('Per favore, inserisci l\'orario di decollo per ogni volo schedulato.');
        setIsModalOpen(true);
        return;
    }

    const newResults = [];
    let flightCounter = 0;

    // Elabora ogni segmento di volo generato con il suo orario schedulato specifico
    currentFlightSegments.forEach((segment, index) => {
        flightCounter++;
        let eligible = false;
        let reason = [];
        const flightDateTime = new Date(`${strikeRules.strikeDate}T${scheduledTimes[index]}`);
        const currentFlightDate = flightDateTime.toISOString().slice(0, 10);

        // 0. Verifica se il volo è uno dei voli specificamente garantiti
        const isSpecificallyGuaranteed = strikeRules.guaranteedFlights.some(gf =>
          gf.origin.toUpperCase() === segment.origin.toUpperCase() &&
          gf.destination.toUpperCase() === segment.destination.toUpperCase()
        );

        if (isSpecificallyGuaranteed) {
          reason.push('Volo garantito da ENAC, non scioperabile.');
          eligible = false;
        } else {
          // 1. Lo sciopero deve partire dal territorio italiano
          if (!isItalianAirport(segment.origin)) {
              reason.push(`L'aeroporto di partenza (${segment.origin}) non è italiano. Sciopero valido solo dal territorio nazionale.`);
              eligible = false;
          } else if (currentFlightDate !== strikeRules.strikeDate) {
              reason.push(`La data del volo (${currentFlightDate}) non rientra nel giorno di sciopero (${strikeRules.strikeDate}).`);
              eligible = false;
          }
          else {
              // 2. Verifica se l'orario del volo rientra in una fascia protetta
              let isInProtectedBand = false;
              const flightTimeHours = flightDateTime.getHours();
              const flightTimeMinutes = flightDateTime.getMinutes();

              strikeRules.guaranteedTimeBands.forEach(band => {
                  const [bandStartHour, bandStartMinute] = band.start.split(':').map(Number);
                  const [bandEndHour, bandEndMinute] = band.end.split(':').map(Number);

                  const flightTimeInMinutes = flightTimeHours * 60 + flightTimeMinutes;
                  const bandStartTimeInMinutes = bandStartHour * 60 + bandStartMinute;
                  const bandEndTimeInMinutes = bandEndHour * 60 + bandEndMinute;

                  if (flightTimeInMinutes >= bandStartTimeInMinutes && flightTimeInMinutes <= bandEndTimeInMinutes) {
                      isInProtectedBand = true;
                  }
              });

              if (isInProtectedBand) {
                  reason.push(`L'orario di decollo schedulato (${scheduledTimes[index]}) rientra in una fascia oraria garantita.`);
                  eligible = false;
              } else {
                  eligible = true;
                  reason.push(`Eligibile per lo sciopero generale del ${strikeRules.strikeDate}.`);

                  if (segment.origin.toUpperCase() !== baseIcao.toUpperCase()) {
                    reason.push("(<strong>SCIOPERABILE FUORI BASE</strong>)");
                  }
              }
          }
        }

        newResults.push({
            flight: `Volo ${flightCounter}: da ${segment.origin} a ${segment.destination} (${segment.type}) schedulato alle ${scheduledTimes[index]}`,
            eligible: eligible,
            reason: reason.join(' '),
        });
    });

    setResults(newResults);
  };

  const handleDestinationInputChange = (e) => {
    setDestinationInput(e.target.value);
  };

  const strikeDurationText = `10 Luglio 2025 (24 ORE, fasce garantite 07:00-10:00 e 18:00-21:00)`;

  return (
    <div className="app-container">
      {/* Stili CSS integrati direttamente nel componente */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #4F46E5, #93C5FD); /* Corrisponde a from-indigo-700 via-blue-500 to-indigo-700 */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem; /* Corrisponde a p-4 */
          font-family: 'Inter', sans-serif;
        }

        .main-card {
          background-color: #ffffff; /* Corrisponde a bg-white */
          padding: 2rem; /* Corrisponde a p-8 */
          border-radius: 1rem; /* Corrisponde a rounded-2xl */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Corrisponde a shadow-2xl */
          width: 100%;
          max-width: 48rem; /* Corrisponde a max-w-2xl */
          border: 1px solid #e5e7eb; /* Corrisponde a border border-gray-200 */
        }

        .main-title {
          font-size: 2.25rem; /* Corrisponde a text-3xl */
          font-weight: 800; /* Corrisponde a font-extrabold */
          color: #111827; /* Corrisponde a text-gray-900 */
          margin-bottom: 2rem; /* Corrisponde a mb-8 */
          text-align: center; /* Corrisponde a text-center */
          letter-spacing: -0.025em; /* Corrisponde a tracking-tight */
          line-height: 1.2;
        }

        .main-title-date {
          color: #2563eb; /* Corrisponde a text-blue-600 */
          font-size: 1.5rem; /* Corrisponde a text-2xl */
          display: block;
          margin-top: 0.5rem;
        }

        .form-sections-container {
            /* Per gestire lo spazio tra i blocchi del form */
        }
        .form-sections-container > *:not(:last-child) {
            margin-bottom: 1.5rem; /* Equivalent to Tailwind's space-y-6 */
        }
        .form-sections-container .main-button {
            margin-top: 1.5rem; /* Add margin-top to the button if it's the last child in the container */
        }

        .input-group {
          /* margin-bottom è gestito dal .form-sections-container */
        }

        .input-label {
          display: block;
          font-size: 0.875rem; /* Corrisponde a text-sm */
          font-weight: 500; /* Corrisponde a font-medium */
          color: #374151; /* Corrisponde a text-gray-700 */
          margin-bottom: 0.25rem; /* Corrisponde a mb-1 */
        }

        .input-field {
          display: block;
          width: 100%;
          padding: 0.5rem 1rem; /* Corrisponde a px-4 py-2 */
          border: 1px solid #d1d5db; /* Corrisponde a border border-gray-300 */
          border-radius: 0.5rem; /* Corrisponde a rounded-lg */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Corrisponde a shadow-sm */
          transition: all 0.2s ease-in-out;
        }

        .input-field:focus {
          outline: none;
          border-color: #3B82F6; /* Corrisponde a focus:border-blue-500 */
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Corrisponde a focus:ring-blue-500 focus:ring-opacity-75 */
        }

        .section-card {
          border: 1px solid #e5e7eb; /* Corrisponde a border border-gray-200 */
          padding: 1.25rem; /* Corrisponde a p-5 */
          border-radius: 0.5rem; /* Corrisponde a rounded-lg */
          background-color: #f9fafb; /* Corrisponde a bg-gray-50 */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Corrisponde a shadow-sm */
          /* Il margin-top è ora gestito da .form-sections-container > *:not(:last-child) */
        }

        .section-title {
          font-size: 1rem; /* Corrisponde a text-md */
          font-weight: 600; /* Corrisponde a font-semibold */
          color: #1F2937; /* Corrisponde a text-gray-800 */
          margin-bottom: 1rem; /* Corrisponde a mb-4 */
        }

        .section-content-space > div:not(:last-child) {
          margin-bottom: 0.75rem; /* Corrisponde a space-y-3 */
        }
        
        .main-button {
          width: 100%;
          background-color: #4F46E5; /* Corrisponde a bg-indigo-600 */
          color: #ffffff; /* Corrisponde a text-white */
          font-weight: 700; /* Corrisponde a font-bold */
          padding: 0.75rem 1.5rem; /* Corrisponde a py-3 px-6 */
          border-radius: 0.5rem; /* Corrisponde a rounded-lg */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Corrisponde a shadow-lg */
          transition: all 0.3s ease-in-out;
          transform: scale(1);
          letter-spacing: 0.025em; /* Corrisponde a tracking-wide */
          border: none;
          cursor: pointer;
        }

        .main-button:hover {
          background-color: #4338CA; /* Corrisponde a hover:bg-indigo-700 */
          transform: scale(1.02); /* Corrisponde a hover:scale-105 */
        }

        .main-button:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5); /* Corrisponde a focus:ring-indigo-500 focus:ring-opacity-75 */
        }

        .results-section {
          margin-top: 2rem; /* Corrisponde a mt-8 */
          padding-top: 1.5rem; /* Corrisponde a pt-6 */
          border-top: 1px solid #e5e7eb; /* Corrisponde a border-t border-gray-200 */
        }

        .results-title {
          font-size: 1.5rem; /* Corrisponde a text-2xl */
          font-weight: 700; /* Corrisponde a font-bold */
          color: #111827; /* Corrisponde a text-gray-900 */
          margin-bottom: 1rem; /* Corrisponde a mb-4 */
          text-align: center; /* Corrisponde a text-center */
        }

        .result-item {
          padding: 1rem; /* Corrisponde a p-4 */
          border-radius: 0.5rem; /* Corrisponde a rounded-lg */
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* Corrisponde a shadow-md */
          margin-bottom: 1rem; /* Corrisponde a space-y-4 per gli item */
        }

        .result-item.eligible {
          background-color: #F0FDF4; /* Corrisponde a bg-green-100 */
          border: 1px solid #6EE7B7; /* Corrisponde a border border-green-300 */
        }

        .result-item.not-eligible {
          background-color: #FEF2F2; /* Corrisponde a bg-red-100 */
          border: 1px solid #FCA5A5; /* Corrisponde a border border-red-300 */
        }

        .result-flight {
          font-size: 1.125rem; /* Corrisponde a text-lg */
          font-weight: 600; /* Corrisponde a font-semibold */
          color: #1F2937; /* Corrisponde a text-gray-800 */
        }

        .result-status {
          font-size: 1rem; /* Corrisponde a text-md */
          font-weight: 700; /* Corrisponde a font-bold */
        }

        .result-status.eligible-text {
          color: #047857; /* Corrisponde a text-green-700 */
        }

        .result-status.not-eligible-text {
          color: #B91C1C; /* Corrisponde a text-red-700 */
        }

        .result-reason {
          font-size: 0.875rem; /* Corrisponde a text-sm */
          color: #4B5563; /* Corrisponde a text-gray-600 */
        }

        /* Stili della Modale */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(75, 85, 99, 0.5); /* Corrisponde a bg-gray-600 bg-opacity-50 */
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
          padding: 1.25rem; /* Corrisponde a p-5 */
          border: 1px solid #d1d5db; /* Corrisponde a border */
          width: 24rem; /* Corrisponde a w-96 */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); /* Corrisponde a shadow-lg */
          border-radius: 0.375rem; /* Corrisponde a rounded-md */
          background-color: #ffffff; /* Corrisponde a bg-white */
          text-align: center; /* Corrisponde a text-center */
        }

        .modal-title {
          font-size: 1.125rem; /* Corrisponde a text-lg */
          line-height: 1.5rem; /* Corrisponde a leading-6 */
          font-weight: 500; /* Corrisponde a font-medium */
          color: #111827; /* Corrisponde a text-gray-900 */
          margin-bottom: 1rem; /* Corrisponde a mb-4 */
        }

        .modal-message {
          font-size: 0.875rem; /* Corrisponde a text-sm */
          color: #6B7280; /* Corrisponde a text-gray-500 */
          margin-bottom: 1.5rem; /* Corrisponde a mb-6 */
        }

        .modal-button {
          margin-top: 0.75rem; /* Corrisponde a mt-3 */
          width: 100%;
          display: inline-flex;
          justify-content: center;
          border-radius: 0.375rem; /* Corrisponde a rounded-md */
          border: 1px solid transparent; /* Corrisponde a border border-transparent */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* Corrisponde a shadow-sm */
          padding: 0.5rem 1rem; /* Corrisponde a px-4 py-2 */
          background-color: #2563EB; /* Corrisponde a bg-blue-600 */
          color: #ffffff; /* Corrisponde a text-white */
          font-size: 1rem; /* Corrisponde a base */
          font-weight: 500; /* Corrisponde a font-medium */
          transition: background-color 0.15s ease-in-out;
          cursor: pointer;
        }

        .modal-button:hover {
          background-color: #1D4ED8; /* Corrisponde a hover:bg-blue-700 */
        }

        .modal-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5), 0 0 0 2px rgba(59, 130, 246, 0.5); /* Corrisponde a focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 */
        }

        /* Media queries per la responsività */
        @media (max-width: 768px) {
          .main-card {
            padding: 1.5rem;
          }
          .main-title {
            font-size: 2rem;
          }
          .main-title-date {
            font-size: 1.25rem;
          }
        }
        `}
      </style>

      <div className="main-card">
        <h1 className="main-title">Verifica Eleggibilità Sciopero Aereo <span className="main-title-date">{strikeDurationText}</span></h1>

        {/* Form di input */}
        <div className="form-sections-container">
          <div className="input-group">
            <label htmlFor="baseIcao" className="input-label">
              Base di Appartenenza (Codice ICAO/IATA es. LIMC o MXP)
            </label>
            <input
              type="text"
              id="baseIcao"
              className="input-field"
              value={baseIcao}
              onChange={(e) => setBaseIcao(e.target.value.toUpperCase())}
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
        </div>

        {/* Risultati */}
        {results.length > 0 && (
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
                    Stato: <span className="font-bold">{res.eligible ? 'ELIGIBILE' : 'NON ELIGIBILE'}</span>
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
      </div>
    </div>
  );
}

export default App;
