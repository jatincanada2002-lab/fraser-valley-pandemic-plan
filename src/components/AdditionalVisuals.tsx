import React, { useState } from 'react';
import {
  Activity,
  Building2,
  CheckCircle2,
  Compass,
  HeartHandshake,
  Lock,
  PackageCheck,
  Radio,
  ShieldCheck,
  Users,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* INTRO: FRASER VALLEY READINESS NETWORK HUB-AND-SPOKE VISUAL                */
/* -------------------------------------------------------------------------- */
export const ReadinessNetworkDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number>(0);

  const nodes = [
    {
      title: 'Early Warning & Surveillance',
      detail: 'Aggregate indicators checked for privacy & connected regional surveillance (PHAC & WHO alignment).',
      icon: Radio,
    },
    {
      title: 'Testing & Lab Logistics',
      detail: 'Diagnostic capacity, cold-chain logistics, mobile collection & sample transport.',
      icon: Activity,
    },
    {
      title: 'Selected-Site Enhancements',
      detail: 'Clean-air & ventilation upgrades across chosen hospital, community, and UFV facilities.',
      icon: Building2,
    },
    {
      title: 'Rotating Strategic Supplies',
      detail: 'PPE kits, respirators, tests & consumables rotated into normal operations before expiry.',
      icon: PackageCheck,
    },
    {
      title: 'Paid Surge Workforce',
      detail: 'Trained, contactable paid reserve roster with safe workloads & wellness protections.',
      icon: Users,
    },
    {
      title: 'Accessible Communications',
      detail: 'Multilingual, plain-language public messaging through local trusted channels & call service.',
      icon: HeartHandshake,
    },
  ];

  const active = nodes[selectedNode];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-[#f7faf9] p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-[#d8e1dd] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#17382b]">
            Ready Valley 2029 Regional Network Architecture
          </h3>
          <p className="text-xs text-[#4b5d55] mt-0.5">
            Connecting 6 readiness pillars across 20 Fraser Health communities (1.9M+ individuals)
          </p>
        </div>
        <span className="font-mono-tabular text-xs font-semibold text-[#c97a16]">
          $80M Trigger-Based Reserve Fund
        </span>
      </div>

      {/* Central Hub Banner */}
      <div className="mt-4 rounded-md bg-[#17382b] p-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#bdefdd]">
            Central Coordination Hub
          </div>
          <div className="text-sm font-bold mt-0.5">
            Fraser Health · UFV · Local &amp; Indigenous Partners · PHAC
          </div>
        </div>
        <div className="text-xs text-[#d7ece3] font-mono-tabular">
          No new hospital · No personal tracking app
        </div>
      </div>

      {/* 6 Connected Nodes */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = idx === selectedNode;
          return (
            <button
              key={node.title}
              type="button"
              onClick={() => setSelectedNode(idx)}
              className={`text-left rounded-md border p-3.5 transition-colors cursor-pointer ${
                isSelected
                  ? 'border-[#006d56] bg-white shadow-xs'
                  : 'border-[#d8e1dd] bg-white hover:border-[#006d56]/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded ${
                    isSelected
                      ? 'bg-[#006d56] text-white'
                      : 'bg-[#eaf5ef] text-[#17382b]'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold text-[#17382b]">
                  {node.title}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#4b5d55]">
                {node.detail}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded border border-[#d8e1dd] bg-white px-4 py-2.5 text-xs text-[#1a2420] flex flex-wrap items-center justify-between gap-2">
        <span>
          <strong className="text-[#17382b]">Selected Network Pillar:</strong>{' '}
          {active.title}
        </span>
        <span className="text-[#006d56] font-medium">
          Addresses federal &amp; BC COVID-19 review gaps (OAG, 2021; BC, 2022)
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION 10: GATE JUSTIFICATION & TOP-DOWN / BOTTOM-UP FLOWCHART            */
/* -------------------------------------------------------------------------- */
export const GateJustificationFlowchart: React.FC = () => {
  const gates = [
    {
      gate: 'Gate 1 · Start-Up',
      evidence: 'Approved charter',
      phase: 'Initiation',
    },
    {
      gate: 'Gate 2 · Planning',
      evidence: 'Signed baseline documents',
      phase: 'Requirements & Plan',
    },
    {
      gate: 'Gate 3 · Pre-Acquisition',
      evidence: 'Design / privacy review validated',
      phase: 'Design & Buy',
    },
    {
      gate: 'Gate 4 · Pre-Testing',
      evidence: 'Construction / integration documentation',
      phase: 'Build',
    },
    {
      gate: 'Gate 5 · Pre-Closure',
      evidence: 'Acceptance + named operating owners',
      phase: 'Test & Hand Over',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ece9] pb-3 gap-1">
        <h3 className="text-sm font-bold text-[#17382b]">
          Waterfall Gate Evidence &amp; Blocker Architecture
        </h3>
        <span className="text-xs font-semibold text-[#b91c1c]">
          Incomplete evidence blocks work progression
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {gates.map((g, i) => (
          <div
            key={g.gate}
            className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="font-mono-tabular text-[11px] font-bold text-[#006d56]">
                {g.gate}
              </div>
              <div className="mt-1 text-xs font-bold text-[#17382b]">
                {g.evidence}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#e5ece9] flex items-center justify-between text-[11px] text-[#4b5d55]">
              <span>{g.phase}</span>
              <span className="font-mono-tabular font-semibold text-[#17382b]">
                0{i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
        <div className="rounded border border-[#d8e1dd] bg-[#eaf5ef] p-3 text-[#17382b]">
          <strong>Top-Down Control:</strong> Written requirements, fixed Dec 31, 2029 deadline, and formal steering gate approvals.
        </div>
        <div className="rounded border border-[#d8e1dd] bg-[#edf4f8] p-3 text-[#1b4965]">
          <strong>Bottom-Up Reality Checks:</strong> Initial partner identification, site investigation, blueprints, and design reviews before expansion.
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION 16: PROJECT CHARTER VISUAL SUMMARY BLUEPRINT                       */
/* -------------------------------------------------------------------------- */
export const ProjectCharterBlueprint: React.FC = () => {
  const fields = [
    { label: 'Project Name', value: 'Ready Valley 2029' },
    { label: 'Proposed Sponsor', value: 'Fraser Health' },
    { label: 'Proposed Champion', value: 'Chief Medical Health Officer' },
    { label: 'Project Director', value: 'Yet to be named' },
    { label: 'End Date', value: 'December 31, 2029' },
    { label: 'Hypothetical Funding', value: 'CAD $1,000,000,000' },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#17382b]/25 bg-white overflow-hidden">
      <div className="bg-[#17382b] px-5 py-3.5 text-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#bdefdd]" aria-hidden="true" />
          <span className="text-sm font-bold">Initial Project Charter Summary Sheet</span>
        </div>
        <span className="text-xs text-[#bdefdd]">Planning purposes only · Not for construction or awards</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e5ece9] border-b border-[#e5ece9]">
        {fields.map((f) => (
          <div key={f.label} className="p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4b5d55]">
              {f.label}
            </div>
            <div className="mt-1 text-sm font-bold text-[#17382b] font-mono-tabular">
              {f.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e5ece9] text-xs">
        <div className="p-4 bg-[#f7faf9]">
          <div className="font-bold text-[#006d56] mb-1.5">Authorized Charter Scope</div>
          <p className="text-[#2f3d37] leading-relaxed">
            Data · Communications · Exercises · Evaluation · Transition · Facilities · Workforce &amp; Data · Regional Coordination
          </p>
        </div>
        <div className="p-4 bg-[#fdf6f6]">
          <div className="font-bold text-[#991b1b] mb-1.5">Explicit Charter Exceptions</div>
          <p className="text-[#2f3d37] leading-relaxed">
            New hospital · New authorities · Mandated monitoring · Production of vaccines
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION 19: WORKFORCE MOTIVATION & WELLNESS LOOP DIAGRAM                   */
/* -------------------------------------------------------------------------- */
export const MotivationWellnessDiagram: React.FC = () => {
  const pillars = [
    {
      title: 'Fair Workload & Pay',
      detail: 'Paid trainees with limited workload, less backfilling, no unpaid overtime, and compensated community expertise.',
    },
    {
      title: 'Psychological Safety',
      detail: 'Blameless problem finding without disclosing names, plus sharing senior ideas across staff members.',
    },
    {
      title: 'Monthly Strain Checks',
      detail: 'Monthly strain assessments, training, and feedback loops enabling timely workload adjustments.',
    },
    {
      title: 'Recognition & Alignment',
      detail: 'Structured manager meetings on project aims, risks, improvements, work & community achievements.',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <h3 className="text-sm font-bold text-[#17382b] border-b border-[#e5ece9] pb-3">
        Workforce Motivation, Safety &amp; Retention Framework
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, idx) => (
          <div key={p.title} className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4">
            <div className="font-mono-tabular text-[11px] font-bold text-[#006d56]">
              0{idx + 1} · Pillar
            </div>
            <div className="mt-1 text-xs font-bold text-[#17382b]">{p.title}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-[#4b5d55]">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION 20: RESOURCE PLANNING & INVENTORY ROTATION FLOW                    */
/* -------------------------------------------------------------------------- */
export const ResourcePlanningDiagram: React.FC = () => {
  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ece9] pb-3 gap-1">
        <h3 className="text-sm font-bold text-[#17382b]">
          Resource Control, Inventory Rotation &amp; Financial Firewall
        </h3>
        <span className="text-xs font-semibold text-[#c97a16]">
          Operating funds NOT topped up with Readiness Reserve
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
        <div className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4">
          <div className="font-bold text-[#17382b] flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-[#006d56]" aria-hidden="true" />
            <span>Work Package &amp; Partner Stocking</span>
          </div>
          <p className="mt-2 text-[#2f3d37] leading-relaxed">
            Assign ownership, labor estimates, dependencies, schedules &amp; acceptance docs across clinicians, facilities, data owners, UFV &amp; community partners.
          </p>
        </div>

        <div className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4">
          <div className="font-bold text-[#17382b] flex items-center gap-1.5">
            <PackageCheck className="h-4 w-4 text-[#006d56]" aria-hidden="true" />
            <span>Lifecycle &amp; Expiry Rotation</span>
          </div>
          <p className="mt-2 text-[#2f3d37] leading-relaxed">
            Track maintenance, replacement, warranties, disposition costs, minimum supply stocks, expiry rotation &amp; backup suppliers.
          </p>
        </div>

        <div className="rounded-md border border-[#e7c99b] bg-[#fef7ec] p-4">
          <div className="font-bold text-[#7c5812] flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-[#c97a16]" aria-hidden="true" />
            <span>Monthly Cash Flow Discipline</span>
          </div>
          <p className="mt-2 text-[#5c4310] leading-relaxed">
            Resource forecasts monitored monthly against cash flow; operating budgets stay strictly separated from the $80M Readiness Reserve.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION 24: DEDICATED STAKEHOLDER ESCALATION & GOVERNANCE VISUAL           */
/* -------------------------------------------------------------------------- */
export const StakeholderGovernanceVisual: React.FC = () => {
  const tiers = [
    { tier: 'Tier 1', role: 'Workstream Lead', action: 'Logs decisions, dates & commitments in Stakeholder Register' },
    { tier: 'Tier 2', role: 'Project Director', action: 'Resolves cross-workstream operational & schedule barriers' },
    { tier: 'Tier 3', role: 'Executive Sponsor', action: 'Links regional Fraser Health & ministry escalation pathways' },
    { tier: 'Tier 4', role: 'Steering Committee', action: 'Final multi-partner alignment on unresolved scope/cost issues' },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <h3 className="text-sm font-bold text-[#17382b] border-b border-[#e5ece9] pb-3">
        Stakeholder Register, Rights-Holder Engagement &amp; Escalation Ladder
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((t) => (
          <div key={t.tier} className="rounded border border-[#d8e1dd] bg-[#f7faf9] p-3.5">
            <div className="font-mono-tabular text-[11px] font-bold text-[#006d56]">
              {t.tier}
            </div>
            <div className="mt-1 text-xs font-bold text-[#17382b]">{t.role}</div>
            <p className="mt-1.5 text-xs text-[#4b5d55] leading-relaxed">{t.action}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
        <div className="rounded border border-[#b9decb] bg-[#eaf5ef] p-3 text-[#17382b]">
          <strong>Indigenous Governments (Rights Holders):</strong> Jurisdictions honored; engaged early through sovereign processes.
        </div>
        <div className="rounded border border-[#d8e1dd] bg-[#f7faf9] p-3 text-[#1a2420]">
          <strong>UFV Campus Governance Channel:</strong> Clear feedback pathways for residents &amp; workers with honest participation gap tracking.
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION 25: PROJECT CLOSURE CHECKLIST & ONGOING READINESS RING             */
/* -------------------------------------------------------------------------- */
export const ProjectClosureVisual: React.FC = () => {
  const closeoutGates = [
    'Acceptance testing complete',
    'Critical defects resolved',
    'Operators & sustaining resources assigned',
    'Staff trained & facilities commissioned',
    'Warranties & inventories accepted',
    'Privacy owners & residual risks accepted',
    'Costs reconciled & unspent funds returned',
    'Planned vs. actual closure report & lessons learned',
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ece9] pb-3 gap-1">
        <h3 className="text-sm font-bold text-[#17382b]">
          Formal Close-Out Verification &amp; Ongoing Readiness Cycle
        </h3>
        <span className="font-mono-tabular text-xs font-semibold text-[#006d56]">
          Target Closure: Dec 31, 2029
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {closeoutGates.map((gate) => (
          <div
            key={gate}
            className="flex items-start gap-2 rounded border border-[#e5ece9] bg-[#f7faf9] p-3 text-xs text-[#1a2420]"
          >
            <CheckCircle2 className="h-4 w-4 text-[#00a055] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{gate}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md bg-[#17382b] p-4 text-white">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#bdefdd]">
          Post-2029 Continuous Readiness Loop
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
          {[
            'Maintenance',
            'Exercises',
            'Training',
            'Rotating of supplies',
            'Capturing of benefits',
          ].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <span className="rounded bg-white/10 px-3 py-1.5 border border-white/15">
                {step}
              </span>
              {idx < arr.length - 1 && (
                <span className="text-[#bdefdd]" aria-hidden="true">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
