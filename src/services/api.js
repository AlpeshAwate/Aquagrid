const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.aquagrid.in';

class ApiService {
  async fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  async getCityDetails(cityId) {
    try {
      return await this.fetchWithTimeout(`${API_BASE}/cities/${cityId}`);
    } catch {
      // Fallback to mock data
      return {
        quality: { ph: 7.2, tds: 210, turbidity: 1.5, ecoli: "Absent" },
        supply: [{ time: "06:00", status: "Active" }, { time: "18:00", status: "Scheduled" }],
        source: "Mahi River via French Wells"
      };
    }
  }

  async getProducts() {
    try {
      return await this.fetchWithTimeout(`${API_BASE}/products`);
    } catch {
      return [
        { name: "FPS 4400 Series", type: "Submersible", fit: "Ideal for 400ft Depth" },
        { name: "Fhoton SolarPak", type: "Solar Drive", fit: "Zero Grid Dependency" },
        { name: "SubDrive Connect", type: "Constant Pressure", fit: "Smart Control" }
      ];
    }
  }

  async getMarketData() {
    try {
      return await this.fetchWithTimeout(`${API_BASE}/market`);
    } catch {
      return [
        { seller: "Ramesh Patel (Farmer)", amount: "400 Credits", price: "INR 8,000", type: "sell" },
        { seller: "Reliance GIDC", amount: "1200 Credits", price: "INR 24,000", type: "buy" },
        { seller: "Vadodara Muni. Corp", amount: "5000 Credits", price: "INR 95,000", type: "buy" }
      ];
    }
  }

  async getTelemetry() {
    try {
      return await this.fetchWithTimeout(`${API_BASE}/telemetry`);
    } catch {
      return Array.from({ length: 6 }, (_, i) => ({
        id: `FE-ASSET-${1000 + i}`,
        status: i === 2 ? 'warning' : 'optimal',
        message: i === 2 ? 'Warning: Vibration High' : 'Running Optimal'
      }));
    }
  }
}

export default new ApiService();
