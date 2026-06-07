import React from 'react';
import { Scale, FileSpreadsheet, ArrowRight, ShieldCheck } from 'lucide-react';

export default function EPR() {
  const annualTargets = [
    { year: '2023 – 2024', target: '60%', status: 'Completed' },
    { year: '2024 – 2025', target: '70%', status: 'Active Audit' },
    { year: '2025 – 2026', target: '80%', status: 'Upcoming' },
    { year: '2026 – 2027', target: '80%', status: 'Upcoming' },
  ];

  const regulations = [
    {
      title: 'Rule 6(2) — Bulk Consumer Obligations',
      desc: 'All central/state departments and public sector undertakings must record e-waste inventory and ensure disposal through registered dismantlers.',
    },
    {
      title: 'Schedule I — Lifespan Rules',
      desc: 'Regulatory lifespan standards for computing equipment (5-7 years), consumer electronics, and heavy medical machinery to track amortization.',
    },
    {
      title: 'Form-2 & Form-3 Reporting',
      desc: 'Mandatory maintenance of records of e-waste generated in Form-2 and filing annual reports under Form-3 on or before the 30th day of June.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 mb-10 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider mb-4 inline-block">
            CPCB REGULATORY SYSTEM
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Extended Producer Responsibility (EPR)
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Statutory framework and environmental targets under E-Waste (Management) Rules, 2022.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Main Info Columns */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Rules Overview */}
            <div className="card bg-white border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-800" />
                Statutory Guidelines
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                EPR mandates that producers, manufacturers, and bulk consumers (such as educational institutions) recycle or dispose of end-of-life electrical and electronic appliances safely.
              </p>

              <div className="space-y-4">
                {regulations.map((reg, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex gap-3.5 items-start">
                    <div className="w-6 h-6 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{reg.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{reg.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portal Action Card */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block mb-1">Institutional Audit</span>
                <h3 className="font-bold text-slate-900 text-sm">Start reporting your department's audit logs</h3>
              </div>
              <a href="/add" className="btn-primary py-2 text-xs flex items-center gap-1.5 self-stretch sm:self-auto text-center justify-center">
                Log New Asset
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Targets Table Widget */}
          <div className="card bg-white border border-slate-100 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileSpreadsheet className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">CPCB Recovery Targets</h3>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Minimum target recycling weights based on historical sales and lifespan projections under Schedule III guidelines.
            </p>

            <div className="space-y-2.5">
              {annualTargets.map((row, index) => (
                <div key={index} className="flex justify-between items-center text-xs font-semibold p-2.5 border border-slate-100 rounded-xl bg-[#fafafa]/50">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">{row.year}</span>
                    <span className="text-slate-800 font-extrabold text-sm">{row.target}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    row.status === 'Completed'
                      ? 'bg-slate-100 text-slate-600 border-slate-200'
                      : row.status === 'Active Audit'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-xl p-3.5 text-center text-white flex items-center justify-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold tracking-wide">CPCB Certified Compliance</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
