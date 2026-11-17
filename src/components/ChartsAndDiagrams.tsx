import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  ShieldAlert,
  Users,
  Layers,
  GitBranch,
  ClipboardCheck,
  RefreshCw,
} from 'lucide-react';
import {
  COST_BAR_ITEMS,
  GANTT_PERIODS,
  GANTT_TRACKS,
  QUALITY_GATE_STEPS,
  STAKEHOLDER_QUADRANTS,
  TOP_TEN_RISKS,
  WATERFALL_STAGES,
  WORKSTREAM_TABLE,
} from '../data/proposalData';

/* -------------------------------------------------------------------------- */
/* 1. DELIVERY GANTT + WATERFALL LIFE CYCLE + CRITICAL PATH (Section 1)       */
/* -------------------------------------------------------------------------- */
export const DeliveryGanttChart: React.FC = () => {
  const [selectedTrackIdx, setSelectedTrackIdx] = useState<number>(0);
  const activeTrack = GANTT_TRACKS[selectedTrackIdx];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between border-b border-[#e5ece9] pb-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-[#17382b]">
            READY VALLEY 2029 | DELIVERY GANTT
          </h3>
          <p className="text-xs text-[#4b5d55] mt-0.5">
            Project period and Waterfall approval gates · active work · gate / milestone
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#4b5d55]">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm bg-[#006d56]" />
            Active work
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[#17382b]" />
            Gate / milestone
          </span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-[240px_repeat(7,minmax(0,1fr))] border-b border-[#e5ece9] pb-2 text-xs font-semibold text-[#4b5d55]">
            <div>Workstream Phase</div>
            {GANTT_PERIODS.map((period) => (
              <div key={period} className="text-center font-mono-tabular">
                {period}
              </div>
            ))}
          </div>

          <div className="divide-y divide-[#eef3f0]">
            {GANTT_TRACKS.map((track, idx) => {
              const isSelected = idx === selectedTrackIdx;
              const startPct = (track.startIndex / 7) * 100;
              const spanPct = ((track.endIndex - track.startIndex + 1) / 7) * 100;
              const markerLeftPct = ((track.markerIndex + 0.5) / 7) * 100;

              return (
                <button
                  key={track.label}
                  type="button"
                  onClick={() => setSelectedTrackIdx(idx)}
                  className={`w-full text-left grid grid-cols-[240px_1fr] items-center py-3 transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-[#006d56] ${
                    isSelected ? 'bg-[#f0f7f4]' : 'hover:bg-[#f7faf9]'
                  }`}
                >
                  <span className="pr-3 text-sm font-medium text-[#1a2420]">
                    {track.label}
                  </span>
                  <div className="relative h-8 flex items-center">
                    <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                      {GANTT_PERIODS.map((p) => (
                        <div key={p} className="border-l border-[#eef3f0] h-full" />
                      ))}
                    </div>
                    <div
                      className="relative h-6 rounded-md bg-[#006d56] transition-all"
                      style={{
                        marginLeft: `${startPct}%`,
                        width: `${spanPct}%`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ left: `${markerLeftPct}%` }}
                    >
                      {track.markerType === 'diamond' ? (
                        <span className="block h-3 w-3 rotate-45 bg-white border-2 border-[#17382b]" />
                      ) : (
                        <span className="block h-2.5 w-2.5 rounded-full bg-white border-2 border-[#17382b]" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#e5ece9] pt-3 text-xs text-[#17382b]">
        <span>
          <strong className="font-semibold">Selected Phase:</strong> {activeTrack.label}
        </span>
        <span className="font-mono-tabular text-[#006d56] font-medium">
          {GANTT_PERIODS[activeTrack.startIndex]}
          {activeTrack.endIndex !== activeTrack.startIndex
            ? ` – ${GANTT_PERIODS[activeTrack.endIndex]}`
            : ''}{' '}
          · {activeTrack.gateLabel}
        </span>
      </div>
    </div>
  );
};

export const WaterfallFlowchart: React.FC = () => {
  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-medium text-[#4b5d55]">
          Project flow chart — Waterfall stages and approval gates:
        </p>
        <h3 className="text-base font-bold tracking-tight text-[#17382b] mt-1">
          WATERFALL LIFE CYCLE
        </h3>
        <p className="text-xs text-[#4b5d55] mt-0.5">
          Approval evidence is reviewed at each gate before work advances.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {WATERFALL_STAGES.map((stage, idx) => (
          <div key={stage.step} className="flex items-center gap-2">
            <div className="flex-1 rounded-md border border-[#17382b]/20 bg-[#17382b] px-3.5 py-3 text-white">
              <div className="text-xs font-bold tracking-wide">{stage.step}</div>
              <div className="mt-1 text-xs text-[#bdefdd]">{stage.detail}</div>
            </div>
            {idx < WATERFALL_STAGES.length - 1 && (
              <ArrowRight
                className="hidden lg:block h-4 w-4 shrink-0 text-[#006d56]"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4">
        <div className="text-xs font-semibold text-[#17382b] mb-2.5">
          Critical Path Sequence
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#1a2420]">
          {[
            'Agreement with partner',
            'Site assessment',
            'Design',
            'Integration of site commission',
            'Acceptance',
          ].map((node, index, arr) => (
            <React.Fragment key={node}>
              <span className="rounded border border-[#c7d6cf] bg-white px-2.5 py-1.5">
                {node}
              </span>
              {index < arr.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-[#006d56]" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. SCOPE BOUNDARY TABLE & FLOW (Section 2)                                 */
/* -------------------------------------------------------------------------- */
export const ScopeComparisonDiagram: React.FC = () => {
  const inScope = [
    'Coordination',
    'Quick signals',
    'Reporting capacity',
    'Debugging and sample transport',
    'Up to date facility',
    'Occupied paid working team',
    'Providing supplies',
    'Trusted communication',
  ];

  const outOfScope = [
    'A Hospital',
    'Replace medical records DBMS',
    'New legislative powers',
    'Vaccine production',
    'Ensure tracking',
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5">
        <div className="flex items-center justify-between border-b border-[#e5ece9] pb-3">
          <h4 className="text-sm font-bold text-[#17382b]">
            In-Scope Regional Network Elements
          </h4>
          <span className="text-xs font-mono-tabular text-[#006d56] font-semibold">
            8 Core Pillars
          </span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-[#1a2420]">
          {inScope.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check className="h-4 w-4 shrink-0 text-[#00a055] mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5">
        <div className="flex items-center justify-between border-b border-[#e5ece9] pb-3">
          <h4 className="text-sm font-bold text-[#17382b]">
            Items Not Included (Scope Exclusions)
          </h4>
          <span className="text-xs font-mono-tabular text-[#991b1b] font-semibold">
            5 Exclusions
          </span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-[#1a2420]">
          {outOfScope.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#dc2626] text-[10px] font-bold text-[#dc2626]"
                aria-hidden="true"
              >
                ×
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-[#e5ece9] pt-3 text-xs text-[#4b5d55]">
          Scope change appeal requires mandatory analysis: Options · Costs · Schedules · Risk · Equity · Operating effect.
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. INVESTMENT ALLOCATION BAR CHART & WORKSTREAM TABLE (Section 3)          */
/* -------------------------------------------------------------------------- */
export const InvestmentAllocationChart: React.FC = () => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const maxMillions = 300;

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-1 border-b border-[#e5ece9] pb-4 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="text-base font-bold tracking-tight text-[#17382b]">
              PROPOSED INVESTMENT ALLOCATION
            </h3>
            <p className="text-xs text-[#4b5d55] mt-0.5">
              CAD millions · Total = $1,000 million · Amber bar = dedicated readiness reserve
            </p>
          </div>
          <span className="font-mono-tabular text-sm font-bold text-[#17382b]">
            CAD $1,000M Total
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {COST_BAR_ITEMS.map((item) => {
            const widthPct = (item.amountMillions / maxMillions) * 100;
            const isHovered = hoveredLabel === item.label;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredLabel(item.label)}
                onMouseLeave={() => setHoveredLabel(null)}
                className={`grid grid-cols-1 gap-1.5 sm:grid-cols-[220px_1fr_72px] sm:items-center rounded px-2 py-1 transition-colors ${
                  isHovered ? 'bg-[#f4f8f6]' : ''
                }`}
              >
                <div className="text-sm font-medium text-[#1a2420] truncate">
                  {item.label}
                </div>
                <div className="h-6 w-full rounded bg-[#edf2ef] overflow-hidden">
                  <div
                    className={`h-full rounded transition-all duration-200 ${
                      item.isReserve ? 'bg-[#c97a16]' : 'bg-[#006d56]'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <div className="font-mono-tabular text-sm font-semibold text-[#17382b] sm:text-right">
                  ${item.amountMillions}M
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between text-[11px] font-mono-tabular text-[#4b5d55] border-t border-[#e5ece9] pt-2 sm:pl-[228px] sm:pr-[80px]">
          <span>$0M</span>
          <span>$50M</span>
          <span>$100M</span>
          <span>$150M</span>
          <span>$200M</span>
          <span>$250M</span>
          <span>$300M</span>
        </div>
      </div>

      <div className="rounded-lg border border-[#d8e1dd] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#17382b] text-white">
                <th className="py-3 px-4 font-semibold">Workstream</th>
                <th className="py-3 px-4 font-semibold text-right whitespace-nowrap">
                  Allocation
                </th>
                <th className="py-3 px-4 font-semibold">Planned use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5ece9]">
              {WORKSTREAM_TABLE.map((row) => (
                <tr
                  key={row.workstream}
                  className={
                    row.isTotal
                      ? 'bg-[#e8f2ee] font-bold text-[#17382b]'
                      : row.isReserve
                      ? 'bg-[#fef7ec]'
                      : 'odd:bg-white even:bg-[#f8fbf9]'
                  }
                >
                  <td className="py-3 px-4 font-medium text-[#1a2420]">
                    {row.workstream}
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular whitespace-nowrap text-[#17382b]">
                    {row.allocation}
                  </td>
                  <td className="py-3 px-4 text-[#2f3d37]">{row.plannedUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. STAKEHOLDER INFLUENCE x INTEREST MATRIX (Section 4)                     */
/* -------------------------------------------------------------------------- */
export const StakeholderMatrix: React.FC = () => {
  const quadrants = [
    {
      ...STAKEHOLDER_QUADRANTS.keepAligned,
      bg: 'bg-[#edf4f8]',
      border: 'border-[#c8dce8]',
      accent: 'text-[#1b4965]',
    },
    {
      ...STAKEHOLDER_QUADRANTS.workClosely,
      bg: 'bg-[#eaf5ef]',
      border: 'border-[#b9decb]',
      accent: 'text-[#17382b]',
    },
    {
      ...STAKEHOLDER_QUADRANTS.monitor,
      bg: 'bg-[#fbf6e9]',
      border: 'border-[#eadcb9]',
      accent: 'text-[#7c5812]',
    },
    {
      ...STAKEHOLDER_QUADRANTS.listenInform,
      bg: 'bg-[#f9eeee]',
      border: 'border-[#e6caca]',
      accent: 'text-[#7f1d1d]',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="border-b border-[#e5ece9] pb-4">
        <h3 className="text-base font-bold tracking-tight text-[#17382b]">
          STAKEHOLDER INFLUENCE × INTEREST
        </h3>
        <p className="text-xs text-[#4b5d55] mt-0.5">
          Draft engagement map · confirm each group's authority, needs, and preferred engagement
        </p>
      </div>

      <div className="mt-5 flex flex-col lg:flex-row gap-4">
        <div className="hidden lg:flex flex-col justify-between items-center py-6 text-[11px] font-semibold uppercase tracking-wider text-[#4b5d55] w-8 shrink-0">
          <span>High</span>
          <span className="-rotate-90 whitespace-nowrap text-[#17382b]">
            INFLUENCE
          </span>
          <span>Low</span>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quadrants.map((q) => (
              <div
                key={q.title}
                className={`rounded-md border p-4 ${q.bg} ${q.border}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className={`text-sm font-bold tracking-wide ${q.accent}`}>
                    {q.title}
                  </h4>
                  <span className="text-[11px] text-[#4b5d55]">{q.position}</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-[#1a2420]">
                  {q.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#17382b] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#4b5d55] px-1">
            <span>Lower Interest</span>
            <span className="text-[#17382b]">INTEREST →</span>
            <span>Higher Interest</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. THREE SPHERES OF SYSTEM MANAGEMENT (Section 5)                          */
/* -------------------------------------------------------------------------- */
export const ThreeSpheresDiagram: React.FC = () => {
  const spheres = [
    {
      name: 'Business',
      items: ['Value and operating cost', 'Funding stakeholder alignment', 'Measurable improvement in planned time'],
    },
    {
      name: 'Organization',
      items: ['Governance & data authorization', 'Staff workflows & trainers', 'Operational owners & capacity'],
    },
    {
      name: 'Technology',
      items: ['Data & privacy protections', 'Facilities & integration', 'Cybersecurity and support'],
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-[#e5ece9] pb-3">
        <h3 className="text-sm font-bold text-[#17382b]">
          Three Spheres Alignment at Each Waterfall Design Gate
        </h3>
        <span className="text-xs text-[#4b5d55]">Business · Organization · Technology</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {spheres.map((sphere) => (
          <div
            key={sphere.name}
            className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#17382b]">
              <Layers className="h-4 w-4 text-[#006d56]" aria-hidden="true" />
              <span>{sphere.name}</span>
            </div>
            <ul className="mt-2.5 space-y-1.5 text-xs text-[#2f3d37]">
              {sphere.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-[#bdefdd] bg-[#edf8f3] px-4 py-3 text-center text-xs font-medium text-[#17382b]">
        Converging Gate Sign-Off: Business, Operational, and Technical Owners agree on benefits, capacity, integration, and lifecycle requirements.
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. FOUR FRAMES OF ORGANIZATIONS & UFV (Section 6)                          */
/* -------------------------------------------------------------------------- */
export const FourFramesDiagram: React.FC = () => {
  const frames = [
    {
      title: 'Structural Frame',
      detail: 'Explanatory roles of approval, work planning, formal structures, and facility security & responsibility.',
    },
    {
      title: 'Human Resource Frame',
      detail: 'Safety and training, TFR student placement, staff workload determination, and college supervision.',
    },
    {
      title: 'Political Frame',
      detail: "Structuring partners' interests, UFV leadership approval, and shared resource commitments.",
    },
    {
      title: 'Symbolic Frame',
      detail: 'Trusted and inclusive work reflecting the public mission of UFV across Fraser Valley communities.',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-1 border-b border-[#e5ece9] pb-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-bold text-[#17382b]">
          Bolman & Deal Four-Frame Organizational Review (UFV)
        </h3>
        <span className="text-xs text-[#4b5d55]">
          Reviewed at Initiation · Design · Deliver
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {frames.map((f) => (
          <div
            key={f.title}
            className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4"
          >
            <h4 className="text-sm font-bold text-[#006d56]">{f.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-[#2f3d37]">{f.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7 & 8. GOVERNANCE & DELIVERABLES FLOW (Sections 7 & 8)                     */
/* -------------------------------------------------------------------------- */
export const GovernanceArchitectureDiagram: React.FC = () => {
  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <h3 className="text-sm font-bold text-[#17382b] border-b border-[#e5ece9] pb-3">
        Governance Authority & Champion Structure
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-md border border-[#17382b]/25 bg-[#17382b] p-4 text-white">
          <div className="text-xs font-medium text-[#bdefdd]">Proposed Champion</div>
          <div className="mt-1 text-sm font-bold">Mr. Stephen Smith</div>
          <div className="mt-1 text-xs text-white/85">
            Fraser Health Executive Sponsor & Chief Medical Health Officer · removes senior obstacles & links evidence
          </div>
        </div>
        <div className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4">
          <div className="text-xs font-medium text-[#006d56]">Decision Authority</div>
          <div className="mt-1 text-sm font-bold text-[#17382b]">
            Multi-Partner Steering Committee
          </div>
          <div className="mt-1 text-xs text-[#2f3d37]">
            Approves major scope, cost, and schedule decisions; no change to statutory authority
          </div>
        </div>
        <div className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-4">
          <div className="text-xs font-medium text-[#006d56]">Execution Accountability</div>
          <div className="mt-1 text-sm font-bold text-[#17382b]">Project Director</div>
          <div className="mt-1 text-xs text-[#2f3d37]">
            Responsible for delivering the project against charter baselines and controls
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeliverablesChecklistGrid: React.FC = () => {
  const deliverables = [
    { name: 'Charter and governance', test: 'Signed charter & steering terms' },
    { name: 'Readiness office and playbook', test: 'Operational workflow sign-off' },
    { name: 'Privacy protected reporting', test: 'Privacy, security & accessibility tests' },
    { name: 'Exercises and corrective actions', test: 'Exercise attainment verification' },
    { name: 'Evaluations', test: 'Independent baseline & outcomes review' },
    { name: 'Rotating supplies', test: 'Inventory & expiry rotation audit' },
    { name: 'Appointed paid surge roster', test: 'Role readiness verification for staff' },
    { name: 'Accessible public information & community grants', test: 'Accessibility & multilingual validation' },
    { name: 'Facility upgrades & UFV simulation hub (if approved)', test: 'Commissioning & facility sign-off' },
    { name: 'Paid handover and closure report', test: 'Operating owner transfer acceptance' },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white overflow-hidden">
      <div className="border-b border-[#e5ece9] bg-[#f7faf9] px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#17382b]">
          Deliverables & Acceptance Verification Matrix
        </h3>
        <span className="text-xs text-[#4b5d55]">Owner + Acceptance Test Required</span>
      </div>
      <div className="divide-y divide-[#eef3f0]">
        {deliverables.map((d, i) => (
          <div
            key={d.name}
            className="grid grid-cols-1 gap-1 px-4 py-2.5 text-sm sm:grid-cols-[44px_1fr_280px] sm:items-center"
          >
            <span className="font-mono-tabular text-xs font-semibold text-[#006d56]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-medium text-[#1a2420]">{d.name}</span>
            <span className="text-xs text-[#4b5d55]">{d.test}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 10.1 & 11. PROCESS GROUPS, CHANGE CONTROL & GATE 1 INPUTS                  */
/* -------------------------------------------------------------------------- */
export const ProcessGroupsFlowDiagram: React.FC = () => {
  const groups = [
    {
      name: '1. Initiating',
      desc: 'Authorizes needs, sponsor, scope, stakeholders, planning.',
    },
    {
      name: '2. Planning',
      desc: 'Baselines schedule, budget, staffing, quality, procurement, communication, risk & benefits.',
    },
    {
      name: '3. Executing',
      desc: 'Hires, procures, constructs, trains and communicates.',
    },
    {
      name: '4. Monitoring & Controlling',
      desc: 'Monitors cost, schedule, risk, defect, vendors, changes; corrects variances.',
    },
    {
      name: '5. Close-out',
      desc: 'Deliverable acceptance, transfer of operation, contract reconciliation, lessons learned.',
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5">
        <h3 className="text-sm font-bold text-[#17382b] mb-3">
          Five Project Process Groups
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {groups.map((g) => (
            <div
              key={g.name}
              className="rounded-md border border-[#d8e1dd] bg-[#f7faf9] p-3.5"
            >
              <div className="text-xs font-bold text-[#006d56]">{g.name}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#2f3d37]">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#17382b] mb-3">
          Mandatory Change Control Flow
        </h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            'Written change request',
            'Impact assessment',
            'Recommendation',
            'Record of approval',
            'New baseline',
          ].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <span className="rounded border border-[#c7d6cf] bg-[#f7faf9] px-3 py-1.5 font-medium text-[#17382b]">
                {step}
              </span>
              {idx < arr.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-[#006d56]" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PreInitiationDiagram: React.FC = () => {
  const inputs = ['Finance', 'Procurement', 'IT', 'Real Property', 'HR'];
  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5">
      <h3 className="text-sm font-bold text-[#17382b] mb-3">
        Charter Contributions Feeding Pre-Initiation & Gate 1
      </h3>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2 flex-1">
          {inputs.map((inp) => (
            <span
              key={inp}
              className="rounded border border-[#d8e1dd] bg-[#f7faf9] px-3 py-1.5 text-xs font-semibold text-[#17382b]"
            >
              {inp}
            </span>
          ))}
        </div>
        <ArrowRight className="hidden sm:block h-4 w-4 text-[#006d56] shrink-0" aria-hidden="true" />
        <div className="rounded-md bg-[#17382b] px-4 py-2.5 text-xs font-semibold text-white">
          Gate 1 Readiness: Partner interest · Governance options · Credible 2029 path
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 12. PROGRESS REPORTS RAG & CADENCE TABLE (Section 12)                      */
/* -------------------------------------------------------------------------- */
export const ProgressReportDiagram: React.FC = () => {
  const ragRows = [
    {
      status: 'Green',
      colorClass: 'bg-[#00a055] text-white',
      rule: 'On track within baseline schedule, cost, and quality tolerances verified by finance & workstream owners.',
    },
    {
      status: 'Amber',
      colorClass: 'bg-[#c97a16] text-white',
      rule: 'Requires documented cause, named owner, recovery plan, and date of decision in monthly sponsor report.',
    },
    {
      status: 'Red',
      colorClass: 'bg-[#b91c1c] text-white',
      rule: 'Material variance or major safety/privacy incident; immediate communication & escalation with recovery plan.',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white overflow-hidden">
      <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x divide-[#e5ece9] bg-[#f7faf9]">
        <div className="p-4">
          <div className="text-xs font-semibold text-[#006d56]">Monthly Cadence</div>
          <div className="mt-1 text-sm font-bold text-[#17382b]">Sponsor Reports</div>
          <p className="mt-1 text-xs text-[#4b5d55]">
            Milestones, completion forecast, budgeted/expended/committed/forecast costs, top risks, defects, procurement, resourcing & benefits.
          </p>
        </div>
        <div className="p-4">
          <div className="text-xs font-semibold text-[#006d56]">Quarterly Cadence</div>
          <div className="mt-1 text-sm font-bold text-[#17382b]">Public Investment Reports</div>
          <p className="mt-1 text-xs text-[#4b5d55]">
            Public overview of expenditure, progress, exercises, mitigations & feedback responses (no personal or security-sensitive data).
          </p>
        </div>
      </div>
      <div className="border-t border-[#e5ece9] p-4">
        <div className="text-xs font-bold text-[#17382b] mb-2.5">
          Red / Amber / Green (RAG) Threshold Discipline
        </div>
        <div className="space-y-2">
          {ragRows.map((row) => (
            <div
              key={row.status}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded border border-[#e5ece9] p-2.5 text-xs"
            >
              <span
                className={`inline-block w-20 text-center rounded py-1 font-bold shrink-0 ${row.colorClass}`}
              >
                {row.status}
              </span>
              <span className="text-[#2f3d37]">{row.rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 13. SWOT MATRIX (Section 13)                                               */
/* -------------------------------------------------------------------------- */
export const SwotMatrixDiagram: React.FC = () => {
  const cells = [
    {
      label: 'STRENGTHS',
      tone: 'bg-[#eaf5ef] border-[#b9decb] text-[#17382b]',
      points: ['Presence of services at the regional and national levels'],
    },
    {
      label: 'WEAKNESSES',
      tone: 'bg-[#fbf6e9] border-[#eadcb9] text-[#7c5812]',
      points: ['Decentralization', 'Lack of baselines'],
    },
    {
      label: 'OPPORTUNITIES',
      tone: 'bg-[#edf4f8] border-[#c8dce8] text-[#1b4965]',
      points: ['Upgrading facilities', 'Training'],
    },
    {
      label: 'THREATS',
      tone: 'bg-[#f9eeee] border-[#e6caca] text-[#7f1d1d]',
      points: ['Pathogens', 'Misinformation', 'Cyber incidents', 'Inflation', 'Short-term funding'],
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <h3 className="text-sm font-bold text-[#17382b] border-b border-[#e5ece9] pb-3">
        Snapshot of Ready Valley 2029 — SWOT Proposal Stage
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cells.map((cell) => (
          <div key={cell.label} className={`rounded-md border p-4 ${cell.tone}`}>
            <div className="text-xs font-bold tracking-wider">{cell.label}</div>
            <ul className="mt-2.5 space-y-1 text-sm text-[#1a2420]">
              {cell.points.map((pt) => (
                <li key={pt}>• {pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 14. ROI & PAYBACK ANALYSIS CHART (Section 14)                              */
/* -------------------------------------------------------------------------- */
export const RoiScenarioDiagram: React.FC = () => {
  const scenarios = [
    {
      name: 'Low Scenario',
      desc: 'Lower outbreak severity & limited disruption avoided',
      barWidth: '38%',
    },
    {
      name: 'Central Scenario',
      desc: 'Expected baseline avoided disruption, emergency premiums & service interruptions',
      barWidth: '68%',
    },
    {
      name: 'High Scenario',
      desc: 'High severity event where regional readiness offsets widespread shutdown costs',
      barWidth: '94%',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-1 border-b border-[#e5ece9] pb-3 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-sm font-bold text-[#17382b]">
          Sensitivity & Scenario Evaluation Framework (Low · Central · High)
        </h3>
        <span className="font-mono-tabular text-xs font-semibold text-[#006d56]">
          Benchmark: 1.1M Workers Affected (StatsCan, 2021)
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {scenarios.map((s) => (
          <div key={s.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-[#17382b]">{s.name}</span>
              <span className="text-[#4b5d55]">{s.desc}</span>
            </div>
            <div className="h-4 w-full rounded bg-[#edf2ef] overflow-hidden">
              <div
                className="h-full rounded bg-[#006d56]"
                style={{ width: s.barWidth }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 border-t border-[#e5ece9] pt-4 text-xs">
        <div className="rounded border border-[#e5ece9] bg-[#f7faf9] p-3">
          <div className="font-bold text-[#17382b]">Return on Investment</div>
          <div className="mt-1 font-mono-tabular text-[#006d56]">
            Net Benefits / Lifetime Cost
          </div>
        </div>
        <div className="rounded border border-[#e5ece9] bg-[#f7faf9] p-3">
          <div className="font-bold text-[#17382b]">Sensitivity Variables</div>
          <div className="mt-1 text-[#2f3d37]">
            Severity · Timing · Uptake · Operating cost
          </div>
        </div>
        <div className="rounded border border-[#e5ece9] bg-[#f7faf9] p-3">
          <div className="font-bold text-[#17382b]">Validation Gate</div>
          <div className="mt-1 text-[#2f3d37]">
            Independent review prior to investment gates
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 15 & 17. QUALITY GATE & COST OF QUALITY (Sections 15 & 17)                 */
/* -------------------------------------------------------------------------- */
export const QualityGateFlowchart: React.FC = () => {
  const indicators = [
    'Alerts being prompted',
    'Completeness of data',
    'Attainment of exercise objectives',
    'Critical defect closure',
    'Commissioning of equipment',
    'Competency of training',
    'Accessibility of communication',
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="text-base font-bold tracking-tight text-[#17382b]">
          QUALITY GATE | CRITICAL DEFECTS CLOSE BEFORE ACCEPTANCE
        </h3>
        <p className="text-xs text-[#4b5d55] mt-0.5">
          A clear review trail from requirements to signed approval
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        {QUALITY_GATE_STEPS.map((q, idx) => (
          <div key={q.stage} className="flex items-center gap-2">
            <div
              className={`flex-1 rounded-md px-3.5 py-3 text-white ${
                q.stage === 'FIX & RETEST'
                  ? 'bg-[#c97a16]'
                  : q.stage === 'ACCEPT'
                  ? 'bg-[#006d56]'
                  : 'bg-[#17382b]'
              }`}
            >
              <div className="text-xs font-bold tracking-wide">{q.stage}</div>
              <div className="mt-1 text-xs text-white/90">{q.sub}</div>
            </div>
            {idx < QUALITY_GATE_STEPS.length - 1 && (
              <ArrowRight
                className="hidden sm:block h-4 w-4 shrink-0 text-[#006d56]"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-[#e5ece9] pt-4">
        <div className="text-xs font-bold text-[#17382b] mb-2">
          7 Tracked Quality Indicators
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs text-[#1a2420]">
          {indicators.map((ind) => (
            <div
              key={ind}
              className="rounded border border-[#e5ece9] bg-[#f7faf9] px-3 py-2 flex items-center gap-2"
            >
              <ClipboardCheck className="h-3.5 w-3.5 text-[#006d56] shrink-0" aria-hidden="true" />
              <span>{ind}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CostOfQualityDiagram: React.FC = () => {
  const parts = [
    {
      title: 'Prevention Costs',
      detail: 'Formal privacy reviews, requirements verification, staff competency training.',
    },
    {
      title: 'Appraisal Costs',
      detail: 'De-identified/synthetic testing, lab/cold-chain checks, emergency exercises.',
    },
    {
      title: 'Internal Rework',
      detail: 'Correcting failed accessibility, language, backup communication & distribution tests before live release.',
    },
    {
      title: 'External Failures (Avoided)',
      detail: 'Preventing live defects that cause unsafe information, service interruption, and delayed care.',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5">
      <h3 className="text-sm font-bold text-[#17382b] mb-3">
        Cost of Quality Formula: Prevention + Appraisal + Internal Rework + External Failures
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {parts.map((p) => (
          <div key={p.title} className="rounded border border-[#d8e1dd] bg-[#f7faf9] p-3.5">
            <div className="text-xs font-bold text-[#006d56]">{p.title}</div>
            <p className="mt-1 text-xs text-[#2f3d37] leading-relaxed">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 18, 19, 20. HR STAFFING, MOTIVATION & RESOURCE PLANNING                    */
/* -------------------------------------------------------------------------- */
export const HrStaffingDiagram: React.FC = () => {
  const roles = [
    'Director',
    'Scheduler / Controller',
    'Financial & Procurement Leads',
    'Clinical / Public Health Specialists',
    'Data & Cyber Specialists',
    'Facilities & Infection Control Specialists',
    'Laboratory / Logistics Coordinators',
    'Workforce Specialists',
    'UFV & Indigenous Relations Liaison',
    'Communications / Accessibility Specialists',
    'Quality, Evaluation, Record & Training Specialists',
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e5ece9] pb-3 gap-1">
        <h3 className="text-sm font-bold text-[#17382b] flex items-center gap-2">
          <Users className="h-4 w-4 text-[#006d56]" aria-hidden="true" />
          <span>Forecast Staffing Architecture</span>
        </h3>
        <span className="font-mono-tabular text-xs font-bold text-[#006d56]">
          $190M Staff Budget Envelope
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs">
        {roles.map((r) => (
          <div
            key={r}
            className="rounded border border-[#e5ece9] bg-[#f7faf9] px-3 py-2 font-medium text-[#1a2420]"
          >
            {r}
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 21. STAKEHOLDER COMMUNICATION TABLE (Section 21)                           */
/* -------------------------------------------------------------------------- */
export const CommunicationMatrixTable: React.FC = () => {
  const rows = [
    {
      audience: 'Steering committee members',
      cadence: 'Monthly',
      content: 'Status, risks, decisions, and projections',
    },
    {
      audience: 'Operators',
      cadence: 'Monthly',
      content: 'Operator playbooks, data definitions, training materials, contacts, and exercise results',
    },
    {
      audience: 'Indigenous governments & communities',
      cadence: 'Early draft review',
      content: 'Early drafts for review and revision details based on Indigenous input',
    },
    {
      audience: 'UFV Liaison',
      cadence: 'Ongoing',
      content: 'Named academic & campus liaison coordination',
    },
    {
      audience: 'Residents',
      cadence: 'Continuous & accessible',
      content: 'Online, local trusted sources, own language, plain language by phone & print',
    },
    {
      audience: 'Public Reporting',
      cadence: 'Quarterly',
      content: 'Expenditures and corrective actions',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white overflow-hidden">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-[#17382b] text-white">
            <th className="py-2.5 px-4 font-semibold">Stakeholder Group</th>
            <th className="py-2.5 px-4 font-semibold">Cadence</th>
            <th className="py-2.5 px-4 font-semibold">Deliverables & Channels</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e5ece9]">
          {rows.map((r) => (
            <tr key={r.audience} className="odd:bg-white even:bg-[#f8fbf9]">
              <td className="py-2.5 px-4 font-semibold text-[#17382b]">{r.audience}</td>
              <td className="py-2.5 px-4 font-mono-tabular text-xs text-[#006d56] whitespace-nowrap">
                {r.cadence}
              </td>
              <td className="py-2.5 px-4 text-[#2f3d37]">{r.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 22. TOP TEN RISKS & CONTROLS TABLE (Section 22)                            */
/* -------------------------------------------------------------------------- */
export const RisksControlTable: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<'All' | 'High' | 'Medium'>('All');

  const filtered =
    filterLevel === 'All'
      ? TOP_TEN_RISKS
      : TOP_TEN_RISKS.filter((r) => r.level === filterLevel);

  const highCount = TOP_TEN_RISKS.filter((r) => r.level === 'High').length;
  const medCount = TOP_TEN_RISKS.filter((r) => r.level === 'Medium').length;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 text-xs text-[#4b5d55] font-mono-tabular">
          <span>Total Risks: {TOP_TEN_RISKS.length}</span>
          <span>·</span>
          <span className="text-[#b91c1c] font-semibold">High: {highCount}</span>
          <span>·</span>
          <span className="text-[#b45309] font-semibold">Medium: {medCount}</span>
        </div>

        <div
          className="inline-flex items-center gap-1 rounded-md border border-[#d8e1dd] bg-[#f4f6f5] p-1 self-start"
          role="group"
          aria-label="Filter risks by severity level"
        >
          {(['All', 'High', 'Medium'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                filterLevel === lvl
                  ? 'bg-[#17382b] text-white'
                  : 'text-[#4b5d55] hover:text-[#17382b]'
              }`}
            >
              {lvl === 'All' ? 'All (10)' : `${lvl} (${lvl === 'High' ? highCount : medCount})`}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[#d8e1dd] bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#1b365d] text-white">
                <th className="py-3 px-4 font-semibold">Risk</th>
                <th className="py-3 px-4 font-semibold text-center w-28">Level</th>
                <th className="py-3 px-4 font-semibold">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5ece9]">
              {filtered.map((row) => (
                <tr key={row.risk} className="odd:bg-white even:bg-[#f8fbf9]">
                  <td className="py-3 px-4 font-medium text-[#1a2420]">{row.risk}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center gap-1 font-bold text-xs ${
                        row.level === 'High' ? 'text-[#b91c1c]' : 'text-[#b45309]'
                      }`}
                    >
                      <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                      {row.level}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#2f3d37]">{row.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 23. PROCUREMENT TENDERING FLOW (Section 23)                                */
/* -------------------------------------------------------------------------- */
export const ProcurementFlowDiagram: React.FC = () => {
  const steps = [
    {
      title: '1. Purchase Programs',
      desc: 'Ventilation, filtration, secure hosting, cyber testing, diagnostics/labs, cold chain, PPE, training, translation, call centre, evaluations, UFV simulation.',
    },
    {
      title: '2. Tender Specification',
      desc: 'Need definition, service level, testing, timeline, lifecycle cost, privacy, accessibility, warranty, data ownership, audit & exit clauses.',
    },
    {
      title: '3. Supplier Evaluation',
      desc: 'Value, resilience, interoperability, supplier capacity, and risk factor reviewed by cross-functional leads.',
    },
    {
      title: '4. Waterfall Award',
      desc: 'Award process executed pending budget and Waterfall gate approval.',
    },
  ];

  return (
    <div className="mt-6 rounded-lg border border-[#d8e1dd] bg-white p-5">
      <h3 className="text-sm font-bold text-[#17382b] mb-3 flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-[#006d56]" aria-hidden="true" />
        <span>Procurement & Tendering Workflow</span>
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.title} className="rounded border border-[#d8e1dd] bg-[#f7faf9] p-3.5">
            <div className="text-xs font-bold text-[#006d56]">{s.title}</div>
            <p className="mt-1.5 text-xs text-[#2f3d37] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 24 & 25. ESCALATION PATH & ONGOING READINESS CLOSURE LOOP                  */
/* -------------------------------------------------------------------------- */
export const EscalationAndClosureDiagram: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5">
        <h3 className="text-sm font-bold text-[#17382b] mb-3">
          Stakeholder Escalation Path (Section 24)
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {['Workstream', 'Director', 'Sponsor', 'Steering Committee'].map(
            (tier, i, arr) => (
              <React.Fragment key={tier}>
                <span className="rounded border border-[#c7d6cf] bg-[#f7faf9] px-3 py-1.5 font-semibold text-[#17382b]">
                  {tier}
                </span>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-[#006d56]" aria-hidden="true" />
                )}
              </React.Fragment>
            )
          )}
        </div>
        <p className="mt-3 text-xs text-[#4b5d55]">
          Indigenous governments engaged early as rights holders; residents & workers provide feedback through UFV campus governance.
        </p>
      </div>

      <div className="rounded-lg border border-[#d8e1dd] bg-white p-5">
        <h3 className="text-sm font-bold text-[#17382b] mb-3 flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-[#006d56]" aria-hidden="true" />
          <span>Ongoing Readiness Loop Post-Closure (Section 25)</span>
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            'Maintenance',
            'Exercises',
            'Training',
            'Rotating of supplies',
            'Capturing of benefits',
          ].map((item, i, arr) => (
            <React.Fragment key={item}>
              <span className="rounded border border-[#b9decb] bg-[#eaf5ef] px-2.5 py-1.5 font-semibold text-[#17382b]">
                {item}
              </span>
              {i < arr.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-[#006d56]" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
