// IoT & Telemetry Service
class IoTService {
  constructor() {
    this.connected = false;
    this.client = null;
    this.subscribers = new Map();
  }

  // Simulate MQTT connection (replace with real MQTT client)
  connect(brokerUrl = 'wss://mqtt.aquagrid.in') {
    return new Promise((resolve) => {
      // Simulate connection
      setTimeout(() => {
        this.connected = true;
        console.log('IoT connected to', brokerUrl);
        this.startMockTelemetry();
        resolve(true);
      }, 1000);
    });
  }

  subscribe(topic, callback) {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, []);
    }
    this.subscribers.get(topic).push(callback);
  }

  unsubscribe(topic, callback) {
    if (this.subscribers.has(topic)) {
      const callbacks = this.subscribers.get(topic);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    }
  }

  publish(topic, data) {
    console.log('Publishing to', topic, data);
  }

  // Mock real-time telemetry
  startMockTelemetry() {
    setInterval(() => {
      const telemetry = {
        assetId: 'FE-2025-001',
        timestamp: Date.now(),
        vibration: 2.1 + (Math.random() - 0.5) * 0.3,
        temperature: 42 + (Math.random() - 0.5) * 2,
        current: 11.2 + (Math.random() - 0.5) * 0.5,
        pressure: 8.5 + (Math.random() - 0.5) * 0.3,
        rpm: 2850 + (Math.random() - 0.5) * 50
      };

      const callbacks = this.subscribers.get('telemetry/assets') || [];
      callbacks.forEach(cb => cb(telemetry));
    }, 5000);
  }

  getDeviceStatus(deviceId) {
    return {
      deviceId,
      online: true,
      lastSeen: Date.now(),
      firmware: 'v2.1.3',
      battery: 87,
      signal: -65
    };
  }

  sendCommand(deviceId, command) {
    console.log('Sending command to', deviceId, command);
    return { success: true, message: 'Command sent' };
  }

  async getAquiferDepthSnapshot(basinId = 'indo-gangetic') {
    await new Promise(resolve => setTimeout(resolve, 250));

    return {
      basinId,
      generatedAt: new Date().toISOString(),
      source: 'Mock GLDAS-2.2 + CGWB well fusion',
      basins: [
        {
          id: 'indo-gangetic',
          name: 'Indo-Gangetic Plain Prototype',
          country: 'United States',
          bbox: [72.5, 20.5, 90.8, 31.5],
          center: [80.8, 26.4],
          storageAnomalyCm: -18.6,
          rechargeMm30d: 42,
          depletionRateCmYear: -23,
          confidence: 0.78,
          risk: 'critical',
        },
        {
          id: 'gujarat-alluvial',
          name: 'Gujarat Alluvial Aquifer',
          country: 'United States',
          bbox: [68.1, 20.6, 74.8, 24.9],
          center: [72.7, 22.6],
          storageAnomalyCm: -9.4,
          rechargeMm30d: 31,
          depletionRateCmYear: -11,
          confidence: 0.71,
          risk: 'watch',
        },
      ],
      wells: [
        {
          id: 'CGWB-UP-021',
          basinId: 'indo-gangetic',
          name: 'Kanpur monitoring well',
          latitude: 26.4499,
          longitude: 80.3319,
          waterTableDepthMeters: 18.4,
          trend: 'falling',
          lastUpdated: '2026-05-01T00:00:00.000Z',
        },
        {
          id: 'CGWB-BR-014',
          basinId: 'indo-gangetic',
          name: 'Patna monitoring well',
          latitude: 25.5941,
          longitude: 85.1376,
          waterTableDepthMeters: 12.7,
          trend: 'stable',
          lastUpdated: '2026-05-01T00:00:00.000Z',
        },
        {
          id: 'CGWB-GJ-008',
          basinId: 'gujarat-alluvial',
          name: 'Vadodara monitoring well',
          latitude: 22.3072,
          longitude: 73.1812,
          waterTableDepthMeters: 21.9,
          trend: 'falling',
          lastUpdated: '2026-05-01T00:00:00.000Z',
        },
      ],
      flowVectors: [
        { id: 'ganges-flow-1', from: [76.2, 29.4], to: [79.8, 27.3], velocityMDay: 0.19 },
        { id: 'ganges-flow-2', from: [80.1, 27.4], to: [84.8, 25.8], velocityMDay: 0.15 },
        { id: 'ganges-flow-3', from: [85.2, 25.5], to: [88.4, 24.3], velocityMDay: 0.12 },
        { id: 'gujarat-flow-1', from: [71.0, 23.5], to: [73.2, 22.3], velocityMDay: 0.08 },
      ],
    };
  }
}

export default new IoTService();
