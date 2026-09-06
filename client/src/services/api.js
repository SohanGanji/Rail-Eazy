/**
 * API Service for Rail Eazy
 * Connects with backend running on localhost:5000 (via Vite proxy)
 */

const API_BASE = '';

/**
 * Fetch all available stations
 */
export async function getStations() {
  try {
    const res = await fetch(`${API_BASE}/api/routes/stations`);
    if (!res.ok) {
      throw new Error(`Failed to fetch stations: HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
    throw new Error(data.message || 'Malformed stations response');
  } catch (err) {
    console.error('Error fetching stations:', err);
    throw err;
  }
}

/**
 * Search direct and split routes between origin and destination
 */
export async function searchRoutes({
  origin,
  destination,
  intermediate = null,
  minLayoverMinutes = 45,
  maxLayoverMinutes = 360,
  preferredClass = '3A'
}) {
  try {
    const params = new URLSearchParams({
      origin: origin.trim().toUpperCase(),
      destination: destination.trim().toUpperCase(),
      minLayoverMinutes: String(minLayoverMinutes),
      maxLayoverMinutes: String(maxLayoverMinutes),
      preferredClass
    });

    if (intermediate && intermediate.trim()) {
      params.append('intermediate', intermediate.trim().toUpperCase());
    }

    const res = await fetch(`${API_BASE}/api/routes/search?${params.toString()}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Route search failed: HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error searching routes:', err);
    throw err;
  }
}

/**
 * Check backend service health
 */
export async function getHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline' };
    return await res.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}
