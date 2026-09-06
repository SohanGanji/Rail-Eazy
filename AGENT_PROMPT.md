# Instructions for Antigravity Agent

Take over the project and build the frontend inside the `client` directory:

1. Scaffold a React Vite application inside `client` if not already present.
2. Configure `client/vite.config.js` to proxy `/api` calls to `http://localhost:5000`.
3. Set up Tailwind CSS with the dark synthwave theme (#100c1a background, #7b51df violet accents, #10b981 emerald highlights).
4. In `client/src/App.jsx`, build the full interactive interface:
   - Origin and Destination dropdowns populated dynamically from `GET /api/routes/stations`.
   - Class selector buttons (`SL`, `3A`, `2A`, `CC`).
   - Max layover range slider (45 to 360 mins).
   - "Search Routes" button that queries `GET /api/routes/search`.
   - Two tabs for results: "Split Routes" and "Direct Routes".
   - Interactive cards: Leg 1 details, an intermediate junction layover badge, Leg 2 details, dynamic class selection chips that re-calculate total fare on the fly, and total travel time.
5. Ensure the frontend connects properly to the backend already running on port 5000.
