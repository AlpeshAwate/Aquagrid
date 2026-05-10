// Service Loop Marketplace
class ServiceMarketplace {
  async getActiveJobs(filters = {}) {
    console.log('[Marketplace] Loading jobs with filters:', filters);
    return [
      {
        id: "JOB-001",
        assetId: "FE-2025-002",
        type: "Bearing Replacement",
        priority: "high",
        status: "assigned",
        technician: { id: "TECH-101", name: "Vijay Kumar", rating: 4.8 },
        location: "Tata Chemicals - ETP",
        scheduledDate: "2025-02-15",
        estimatedCost: 12000,
        parts: ["Bearing Kit FE-B22"]
      },
      {
        id: "JOB-002",
        assetId: "FE-2025-005",
        type: "Preventive Maintenance",
        priority: "medium",
        status: "pending",
        location: "Reliance GIDC - Unit 7",
        scheduledDate: "2025-02-18",
        estimatedCost: 5000
      }
    ];
  }

  async getTechnicians(location) {
    console.log('[Marketplace] Loading technicians for location:', location);
    return [
      {
        id: "TECH-101",
        name: "Vijay Kumar",
        rating: 4.8,
        completedJobs: 234,
        specialization: ["Submersible", "Solar"],
        certifications: ["FE Certified", "ISO 9001"],
        available: true,
        distance: 5.2
      },
      {
        id: "TECH-102",
        name: "Amit Shah",
        rating: 4.6,
        completedJobs: 189,
        specialization: ["Industrial", "ETP"],
        certifications: ["FE Certified"],
        available: true,
        distance: 8.7
      }
    ];
  }

  async createServiceRequest(data) {
    console.log('[Marketplace] Creating service request:', data);
    return {
      jobId: `JOB-${Date.now()}`,
      status: "pending",
      estimatedResponse: "2 hours",
      message: "Service request created. Finding nearest technician..."
    };
  }

  async getSparesParts(assetType) {
    console.log('[Marketplace] Loading spares for asset type:', assetType);
    return [
      { sku: "FE-B22", name: "Bearing Kit", price: 2500, stock: 45, delivery: "24 hrs" },
      { sku: "FE-S15", name: "Seal Assembly", price: 1200, stock: 78, delivery: "24 hrs" },
      { sku: "FE-M08", name: "Motor Winding", price: 8500, stock: 12, delivery: "48 hrs" }
    ];
  }
}

export default new ServiceMarketplace();
