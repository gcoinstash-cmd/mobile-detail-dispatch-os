import React, { useState } from 'react';
import { 
  Truck, Shield, Droplets, Zap, MapPin, Calendar, Clock, Lock, 
  CheckCircle2, Plus, Sparkles, Navigation, AlertCircle, Check, Phone
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface VanRig {
  id: string;
  name: string;
  driver: string;
  zone: string;
  waterLevel: string;
  batteryLevel: string;
  currentStatus: 'EN_ROUTE' | 'ON_SITE_DETAILING' | 'STANDBY';
  eta: string;
}

const RIGS: VanRig[] = [
  { id: 'RIG-01', name: 'Mobile Unit Alpha', driver: 'Marcus Sterling', zone: 'Bel-Air / Beverly Hills', waterLevel: '85 Gal (RO)', batteryLevel: '100% Inverter', currentStatus: 'ON_SITE_DETAILING', eta: '45 mins remaining' },
  { id: 'RIG-02', name: 'Mobile Unit Bravo', driver: 'Derrick Vance', zone: 'Santa Monica / Venice', waterLevel: '92 Gal (RO)', batteryLevel: '98% Inverter', currentStatus: 'EN_ROUTE', eta: '12 mins to site' },
  { id: 'RIG-03', name: 'Mobile Unit Charlie', driver: 'Leo Alvarez', zone: 'Downtown Arts District', waterLevel: '64 Gal (RO)', batteryLevel: '95% Inverter', currentStatus: 'STANDBY', eta: 'Immediate Dispatch' },
  { id: 'RIG-04', name: 'Mobile Unit Delta', driver: 'Julian Hayes', zone: 'Newport Beach / Irvine', waterLevel: '100 Gal (RO)', batteryLevel: '100% Inverter', currentStatus: 'EN_ROUTE', eta: '25 mins to site' },
];

interface Addon {
  id: string;
  name: string;
  price: number;
  timeMins: number;
  desc: string;
}

const ADDONS: Addon[] = [
  { id: 'engine-steam', name: 'Cosmetic Engine Bay Steam Clean', price: 95, timeMins: 30, desc: 'Degrease & satin OEM wire harness dressing' },
  { id: 'ozone-purge', name: 'Ozone Cabin Odor Sterilization', price: 85, timeMins: 45, desc: 'Medical-grade O3 virus & tobacco neutralization' },
  { id: 'leatherique', name: 'Leatherique Oil Deep Hydration', price: 140, timeMins: 45, desc: 'Restores stiff Connolly & Nappa automotive leather' },
  { id: 'headlight-resto', name: 'Wet-Sand Headlight UV Guard', price: 120, timeMins: 40, desc: 'Removes oxidation + 2-year ceramic clear coat' },
  { id: 'pet-hair', name: 'Severe Pet Hair & Sand Extraction', price: 75, timeMins: 35, desc: 'Dual-pass high static pneumatic tornador extraction' },
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  // Triage state
  const [waterAccess, setWaterAccess] = useState<'onboard' | 'client'>('onboard');
  const [powerAccess, setPowerAccess] = useState<'generator' | 'outlet'>('generator');
  const [locationType, setLocationType] = useState<'driveway' | 'garage' | 'office'>('driveway');
  const [selectedPackage, setSelectedPackage] = useState<'concierge' | 'enhancement' | 'fleet'>('concierge');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['engine-steam']);
  const [clientAddress, setClientAddress] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const basePrice = selectedPackage === 'concierge' ? 340 : selectedPackage === 'enhancement' ? 550 : 980;
  const addonsTotal = selectedAddons.reduce((sum, aId) => {
    const a = ADDONS.find(item => item.id === aId);
    return sum + (a ? a.price : 0);
  }, 0);
  const totalCost = basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientAddress || !clientPhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setClientAddress('');
      setClientPhone('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans pb-24 selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Top Dispatch Radar Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-md border-b border-zinc-800 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-zinc-950 font-bold shadow-lg shadow-emerald-500/20">
              <Truck className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">LIVE FLEET DISPATCH ACTIVE</span>
              </div>
              <h1 className="text-base font-bold text-white leading-none">MOBILE DETAIL DISPATCH OS</h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>ON-SITE RO WATER: <strong>100% AUTONOMOUS</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>POWER: <strong>INVERTER RIG GENERATOR</strong></span>
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3" />
              <span>[ RIG PASS ]</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Fleet Route Queue Status */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">TELEMATICS MONITOR</span>
              <h2 className="text-xl font-bold text-white">Active Mobile Detailing Units (GPS Telemetry)</h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">4 Rigs Dispatched</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RIGS.map((rig) => (
              <div key={rig.id} className="p-4 rounded-2xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-white">{rig.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      rig.currentStatus === 'ON_SITE_DETAILING' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                      rig.currentStatus === 'EN_ROUTE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {rig.currentStatus.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{rig.zone}</span>
                  </p>

                  <div className="space-y-1.5 text-[11px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-2">
                    <div className="flex justify-between">
                      <span>Water Tank:</span>
                      <span className="text-cyan-400">{rig.waterLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Power Cell:</span>
                      <span className="text-amber-400">{rig.batteryLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">Tech: {rig.driver}</span>
                  <span className="text-emerald-400 font-bold">{rig.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dispatch Order Builder & Utility Triage */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Utility Triage & Package Selector */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Base Detail Package */}
            <div className="p-6 rounded-3xl bg-[#121214] border border-zinc-800">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">STEP 1: SELECT CONCIERGE LEVEL</span>
              <h3 className="text-lg font-bold text-white mb-4">Service Tier (Full Mobile Van Mobilization)</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'concierge', title: 'Executive Concierge', price: 340, desc: 'Snow foam, de-ionized rinse, iron decon, interior steam & leather feed' },
                  { id: 'enhancement', title: 'Single-Stage Polish', price: 550, desc: 'Machine gloss enhancement, 70% swirl removal, graphene nano sealant' },
                  { id: 'fleet', title: 'Multi-Vehicle Estate', price: 980, desc: '3+ Vehicles detailed simultaneously at your estate or office headquarters' }
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id as any)}
                    className={`text-left p-4 rounded-2xl border transition flex flex-col justify-between ${
                      selectedPackage === pkg.id 
                        ? 'bg-emerald-950/20 border-emerald-500 shadow-lg shadow-emerald-950/30' 
                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold font-mono text-white block mb-1">{pkg.title}</span>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{pkg.desc}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-base font-extrabold font-mono text-emerald-400">${pkg.price}</span>
                      {selectedPackage === pkg.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Utility & Hookup Triage */}
            <div className="p-6 rounded-3xl bg-[#121214] border border-zinc-800">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">STEP 2: ON-SITE UTILITY TRIAGE</span>
              <h3 className="text-lg font-bold text-white mb-4">Verify On-Site Water & Power Conditions</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Water Triage */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-2">Water Source</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setWaterAccess('onboard')}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition ${
                        waterAccess === 'onboard' ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Van Onboard Tank (100 Gal RO)</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWaterAccess('client')}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition ${
                        waterAccess === 'client' ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span>Outdoor Spigot Available</span>
                    </button>
                  </div>
                </div>

                {/* Power Triage */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-2">Electric Power</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setPowerAccess('generator')}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition ${
                        powerAccess === 'generator' ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Van Inverter Generator</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPowerAccess('outlet')}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition ${
                        powerAccess === 'outlet' ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <span>110V Outlet Within 50ft</span>
                    </button>
                  </div>
                </div>

                {/* Location Type */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-2">Parking Location</label>
                  <div className="space-y-2">
                    {[
                      { id: 'driveway', label: 'Private Driveway' },
                      { id: 'garage', label: 'Parking Garage' },
                      { id: 'office', label: 'Office Parking Lot' },
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setLocationType(loc.id as any)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition ${
                          locationType === loc.id ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Add-on Builder */}
            <div className="p-6 rounded-3xl bg-[#121214] border border-zinc-800">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">STEP 3: CUSTOM ADD-ONS</span>
              <h3 className="text-lg font-bold text-white mb-4">Precision Treatment Add-Ons</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                        isChecked 
                          ? 'bg-emerald-950/20 border-emerald-500/60 text-white' 
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold font-mono text-white block">{addon.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">+{addon.timeMins} mins • {addon.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 ml-3">+${addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Ticket & Submission */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 p-6 rounded-3xl bg-[#121214] border border-emerald-500/30 shadow-2xl">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">DISPATCH MANIFEST</span>
              <h3 className="text-xl font-bold text-white mb-4">Live Appointment Ticket</h3>

              <div className="space-y-3 text-xs font-mono border-b border-zinc-800 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Selected Tier:</span>
                  <span className="text-white font-bold uppercase">{selectedPackage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Base Price:</span>
                  <span className="text-white">${basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Add-ons ({selectedAddons.length}):</span>
                  <span className="text-emerald-400">+${addonsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Water Setup:</span>
                  <span className="text-cyan-400 font-bold">{waterAccess === 'onboard' ? 'Autonomous Tank' : 'Client Spigot'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Power Setup:</span>
                  <span className="text-amber-400 font-bold">{powerAccess === 'generator' ? 'Onboard Inverter' : '110V Wall'}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-6">
                <span className="text-xs font-mono text-zinc-400">TOTAL ESTIMATE:</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">${totalCost} USD</span>
              </div>

              <form onSubmit={handleDispatchSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Service Address</label>
                  <input
                    type="text"
                    required
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="e.g. 1044 Ocean Ave, Santa Monica"
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Mobile Contact Line</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 019-2831"
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 mt-2"
                >
                  {submitted ? '✓ VAN DISPATCH CONFIRMED' : 'DISPATCH MOBILE DETAIL RIG'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Operational Bottom Dock */}
      <div className="fixed bottom-3 inset-x-0 z-40 max-w-xl mx-auto px-4">
        <div className="bg-[#121214]/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl px-5 py-2.5 flex items-center justify-between shadow-2xl text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <Navigation className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>NEAREST RIG: <strong>VAN #02 (12 MINS)</strong></span>
          </div>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Supervisor Portal</span>
            <span className="text-zinc-500">[detail2026]</span>
          </button>
        </div>
      </div>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
