import React, { useState } from 'react';
import { 
  Truck, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  MapPin, Clock, Droplets, BatteryCharging, Wrench, X, Sliders, User
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface DetailRig {
  id: string;
  vanNumber: string;
  leadTech: string;
  currentZone: string;
  waterLevel: number; // %
  generatorHours: number;
  batteryReserve: number; // %
  activeStatus: 'EN ROUTE' | 'SERVICING' | 'READY' | 'RE-SUPPLY';
  client: {
    name: string;
    address: string;
    vehicle: string;
    service: string;
    revenue: number;
  };
  queue: {
    time: string;
    customer: string;
    service: string;
  }[];
  img: string;
}

const RIGS: DetailRig[] = [
  {
    id: "RIG-01",
    vanNumber: "Mercedes Sprinter 3500XD (Coastal Rig)",
    leadTech: "Marcus Holloway (Lead Detailer)",
    currentZone: "Newport Beach // Harbor Island",
    waterLevel: 82,
    generatorHours: 412,
    batteryReserve: 95,
    activeStatus: "SERVICING",
    client: {
      name: "Harrison Sterling",
      address: "14 Linda Isle, Newport Beach, CA",
      vehicle: "2024 Ferrari Purosangue (Nero)",
      service: "Concourse Decontamination & Multi-Stage Polish",
      revenue: 650
    },
    queue: [
      { time: "11:30 AM", customer: "Elena Rostova", service: "Interior Steam & Leather Nourish (G63 AMG)" },
      { time: "02:00 PM", customer: "Dr. Kenji Tanaka", service: "Full Ceramic Maintenance Wash (Taycan Cross)" }
    ],
    img: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f"
  },
  {
    id: "RIG-02",
    vanNumber: "Ford Transit High-Roof AWD (Metro Rig)",
    leadTech: "Devon Brooks (Senior Tech)",
    currentZone: "Beverly Hills // Trousdale Estates",
    waterLevel: 45,
    generatorHours: 680,
    batteryReserve: 72,
    activeStatus: "EN ROUTE",
    client: {
      name: "Sovereign Family Office",
      address: "1080 Loma Vista Dr, Beverly Hills, CA",
      vehicle: "2023 Rolls-Royce Cullinan (Dark Olive)",
      service: "Weekly Executive Fleet Maintenance (3 Units)",
      revenue: 1200
    },
    queue: [
      { time: "01:15 PM", customer: "Vanguard Partners", service: "Bespoke Mobile Wash (Aston Martin DBX)" }
    ],
    img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9"
  },
  {
    id: "RIG-03",
    vanNumber: "Ram ProMaster 3500 Extended (Valley Rig)",
    leadTech: "Julian Ramos (Detail Tech)",
    currentZone: "Calabasas // The Oaks Gate",
    waterLevel: 98,
    generatorHours: 190,
    batteryReserve: 100,
    activeStatus: "READY",
    client: {
      name: "Chloe Montgomery",
      address: "25400 Prado De Las Bellotas, Calabasas, CA",
      vehicle: "2024 Range Rover SV Long Wheelbase",
      service: "Clay Bar, Swissvax Carnauba & Engine Bay Detail",
      revenue: 550
    },
    queue: [
      { time: "03:30 PM", customer: "Robert Mercer", service: "Ozone Odor Elimination & Fabric Seal" }
    ],
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
  }
];

export default function App() {
  const [selectedRig, setSelectedRig] = useState<DetailRig>(RIGS[0]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [reassignedSuccess, setReassignedSuccess] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const filtered = RIGS.filter(r => 
    selectedStatus === 'ALL' || r.activeStatus === selectedStatus
  );

  const handleInspect = (rig: DetailRig) => {
    setSelectedRig(rig);
    setIsDrawerOpen(true);
    setReassignedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0E1017] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wider text-cyan-400 flex items-center gap-2 text-base">
            <Truck size={18} /> HYDROGLOSS // AUTONOMOUS MOBILE DETAIL DISPATCH DOCK
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 uppercase text-xs">ARCHETYPE A: DENSE OPERATIONAL CONSOLE</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Compass size={14} />
            <span>GPS LIVE ROUTING & TELEMETRY SYNCED</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ FLEET DISPATCH PASS ]
          </button>
        </div>
      </header>

      {/* Main Console Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Utility Rail */}
        <aside className="w-64 border-r border-zinc-800 bg-[#0D0E15] p-5 hidden md:flex flex-col justify-between shrink-0 font-mono text-sm">
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Fleet Telemetry</div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <div className="text-zinc-400">Daily Booked Gross</div>
                  <div className="text-lg font-black text-emerald-400">$3,850 USD</div>
                </div>
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <div className="text-zinc-400">Active Mobile Rigs</div>
                  <div className="text-lg font-black text-cyan-400">3 / 3 ON ROAD</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-bold">Route Triage Filter</div>
              <div className="space-y-1">
                {[
                  { id: 'ALL', label: 'All Mobile Rigs', count: RIGS.length },
                  { id: 'SERVICING', label: 'Onsite Servicing', count: RIGS.filter(r => r.activeStatus === 'SERVICING').length },
                  { id: 'EN ROUTE', label: 'En Route in Transit', count: RIGS.filter(r => r.activeStatus === 'EN ROUTE').length },
                  { id: 'READY', label: 'Staged / Next Queue', count: RIGS.filter(r => r.activeStatus === 'READY').length }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedStatus(filter.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                      selectedStatus === filter.id 
                        ? 'bg-cyan-500 text-black' 
                        : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="text-[11px] font-mono opacity-80">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 text-[11px] text-zinc-500">
            <div>Spotless DI Water: De-ionized</div>
            <div>Honda SuperQuiet EU7000: Green</div>
          </div>
        </aside>

        {/* Center Live Dispatch Queue */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Truck className="text-cyan-400" /> Active Mobile Rig Dispatch Triage
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Click any mobile detail rig to inspect onboard tank levels, power reserve, and current client manifest.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300">
              {filtered.length} Rigs Active
            </div>
          </div>

          {/* Rig Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(rig => (
              <div 
                key={rig.id}
                onClick={() => handleInspect(rig)}
                className={`p-5 rounded-xl border transition-all cursor-pointer bg-[#12141C] hover:border-cyan-500/60 group relative ${
                  selectedRig.id === rig.id ? 'border-cyan-500 ring-1 ring-cyan-500/30' : 'border-zinc-800'
                }`}
              >
                <div className="flex gap-4">
                  <img 
                    src={rig.img} 
                    alt={rig.vanNumber}
                    className="w-28 h-28 object-cover rounded-lg border border-zinc-800 shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-cyan-400 font-bold">{rig.id}</span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        rig.activeStatus === 'SERVICING' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        rig.activeStatus === 'EN ROUTE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {rig.activeStatus}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base mt-1 group-hover:text-cyan-400 transition-colors truncate">
                      {rig.client.vehicle}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">{rig.currentZone}</p>

                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-zinc-800 font-mono text-[11px]">
                      <div>
                        <span className="text-zinc-500 block">DI Water</span>
                        <span className="text-cyan-400 font-bold">{rig.waterLevel}%</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Battery</span>
                        <span className="text-emerald-400 font-bold">{rig.batteryReserve}%</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Job Ticket</span>
                        <span className="text-white font-bold">${rig.client.revenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Slide-out Rig Detail Drawer */}
        {isDrawerOpen && (
          <aside className="w-full sm:w-[480px] bg-[#10121A] border-l border-zinc-800 p-6 overflow-y-auto flex flex-col justify-between font-sans shrink-0 fixed sm:relative right-0 top-0 bottom-0 z-40 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-cyan-400" />
                  <span className="font-mono text-sm font-bold text-zinc-200">RIG TELEMETRY & TICKET</span>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <img 
                  src={selectedRig.img} 
                  alt={selectedRig.vanNumber}
                  className="w-full h-40 object-cover rounded-xl border border-zinc-800" 
                />

                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                    <span>{selectedRig.id}</span>
                    <span>TECH: {selectedRig.leadTech}</span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-1">{selectedRig.vanNumber}</h2>
                  <p className="text-xs text-zinc-400">{selectedRig.currentZone}</p>
                </div>

                {/* Onboard Systems Gauges */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2.5 font-mono text-xs">
                  <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px] mb-1">Onboard Systems Status</div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5"><Droplets size={14} className="text-cyan-400" /> De-ionized Water Tank</span>
                    <span className="text-cyan-400 font-bold">{selectedRig.waterLevel}% (100 Gal Tank)</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                    <span className="text-zinc-400 flex items-center gap-1.5"><BatteryCharging size={14} className="text-emerald-400" /> LiFePO4 Inverter Reserve</span>
                    <span className="text-emerald-400 font-bold">{selectedRig.batteryReserve}% Operational</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 flex items-center gap-1.5"><Wrench size={14} className="text-amber-400" /> Generator Runtime</span>
                    <span className="text-zinc-200 font-bold">{selectedRig.generatorHours} Total Hours</span>
                  </div>
                </div>

                {/* Current Active Ticket */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Active Customer Ticket</div>
                  <div className="text-white font-bold text-sm">{selectedRig.client.name}</div>
                  <div className="text-zinc-400 text-xs">{selectedRig.client.address}</div>
                  <div className="text-zinc-200 pt-1">Vehicle: <strong className="text-white">{selectedRig.client.vehicle}</strong></div>
                  <div className="text-zinc-200">Service: <strong className="text-cyan-300">{selectedRig.client.service}</strong></div>
                  <div className="text-emerald-400 font-black text-sm pt-1">Ticket Value: ${selectedRig.client.revenue} USD</div>
                </div>

                {/* Next Up in Queue */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">Today's Route Schedule</div>
                  <div className="space-y-1.5">
                    {selectedRig.queue.map(q => (
                      <div key={q.time} className="flex justify-between items-center pb-1 border-b border-zinc-800/60 last:border-0">
                        <div>
                          <span className="text-amber-400 font-bold">{q.time}</span> • <span className="text-white">{q.customer}</span>
                          <div className="text-zinc-400 text-[10px] truncate max-w-[280px]">{q.service}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dispatch Action */}
            <div className="pt-4 border-t border-zinc-800 space-y-2 font-mono">
              {reassignedSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold">
                  ✓ DISPATCH ROUTE RE-OPTIMIZED & NOTIFIED
                </div>
              ) : (
                <button
                  onClick={() => setReassignedSuccess(true)}
                  className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-400/20 cursor-pointer min-h-[44px]"
                >
                  DISPATCH NEXT STOP TO MOBILE RIG
                </button>
              )}
            </div>
          </aside>
        )}
      </div>

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
