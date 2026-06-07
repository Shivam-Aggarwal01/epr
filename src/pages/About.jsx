import React from 'react';
import { Shield, FileText, CheckCircle2, Building2 } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4 mb-10 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider mb-4 inline-block">
            ABOUT THE REGULATORY PORTAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            E-Waste Management & Compliance
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Panjab University Joint Initiative for Statutory Environmental Tracking and Safe Segregation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          {/* Main Card */}
          <div className="card bg-white border border-slate-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-800" />
              Portal Mandate
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              This system serves as an institutional pilot prototype designed to track the accumulation, utility lifespan, and eventual disposal of electrical and electronic assets across Panjab University campuses and constituent departments.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              By monitoring statutory lifespan averages and providing predefined Standard Operating Procedures (SOPs) based on CPCB guidelines, the portal ensures that all institutional scrap is processed safely before transfer to authorized government recyclers.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card bg-white border border-slate-100 p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-1.5">SOP Guideline database</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Pre-configured sorting rules and lifecycle lifespan metrics based on schedule I specifications.
                </p>
              </div>
            </div>

            <div className="card bg-white border border-slate-100 p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-1.5">Asset Audit Tracking</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Register, verify, and monitor equipment counts, serial stamps, and real-time lifecycle states.
                </p>
              </div>
            </div>

            <div className="card bg-white border border-slate-100 p-5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center mb-3">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-1.5">Campus Segregation</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Standardized storage bin tracking for departments to avoid premature disposal and environmental pollution.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional note */}
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800">
            <h4 className="font-bold text-white text-sm mb-2">Technical Demonstration Context</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This application operates as a high-fidelity client-side interface utilizing local context state storage. Simulated multi-campus login credentials (e.g., host maps and campus profiles) enable mock audits and database interaction without live administrative API dependencies.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
