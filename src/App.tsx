import React, { useMemo, useState } from 'react';
import { Printer, Search, ArrowUp, ExternalLink, X } from 'lucide-react';
import {
  INTRODUCTION_SECTION,
  PROPOSAL_HEADER,
  PROPOSAL_SECTIONS,
  ProposalSection,
  REFERENCES_LIST,
  SectionCategory,
} from './data/proposalData';
import {
  CommunicationMatrixTable,
  CostOfQualityDiagram,
  DeliverablesChecklistGrid,
  DeliveryGanttChart,
  FourFramesDiagram,
  GovernanceArchitectureDiagram,
  HrStaffingDiagram,
  InvestmentAllocationChart,
  PreInitiationDiagram,
  ProcessGroupsFlowDiagram,
  ProcurementFlowDiagram,
  ProgressReportDiagram,
  QualityGateFlowchart,
  RisksControlTable,
  RoiScenarioDiagram,
  ScopeComparisonDiagram,
  StakeholderMatrix,
  SwotMatrixDiagram,
  ThreeSpheresDiagram,
  WaterfallFlowchart,
} from './components/ChartsAndDiagrams';
import {
  GateJustificationFlowchart,
  MotivationWellnessDiagram,
  ProjectCharterBlueprint,
  ProjectClosureVisual,
  ReadinessNetworkDiagram,
  ResourcePlanningDiagram,
  StakeholderGovernanceVisual,
} from './components/AdditionalVisuals';

const CATEGORY_TABS: { key: SectionCategory; label: string }[] = [
  { key: 'all', label: 'All Sections' },
  { key: 'charter-scope', label: 'Charter & Scope' },
  { key: 'schedule-cost', label: 'Schedule & Cost' },
  { key: 'people-governance', label: 'People & Governance' },
  { key: 'quality-risk-closure', label: 'Quality, Risk & Closure' },
];

function renderSectionVisual(sectionId: string): React.ReactNode {
  switch (sectionId) {
    case 'sec-1':
      return (
        <>
          <DeliveryGanttChart />
          <WaterfallFlowchart />
        </>
      );
    case 'sec-2':
      return <ScopeComparisonDiagram />;
    case 'sec-3':
      return <InvestmentAllocationChart />;
    case 'sec-4':
      return <StakeholderMatrix />;
    case 'sec-5':
      return <ThreeSpheresDiagram />;
    case 'sec-6':
      return <FourFramesDiagram />;
    case 'sec-7':
      return <GovernanceArchitectureDiagram />;
    case 'sec-8':
      return <DeliverablesChecklistGrid />;
    case 'sec-10':
      return <GateJustificationFlowchart />;
    case 'sec-10-1':
      return <ProcessGroupsFlowDiagram />;
    case 'sec-11':
      return <PreInitiationDiagram />;
    case 'sec-12':
      return <ProgressReportDiagram />;
    case 'sec-13':
      return <SwotMatrixDiagram />;
    case 'sec-14':
      return <RoiScenarioDiagram />;
    case 'sec-15':
      return <QualityGateFlowchart />;
    case 'sec-16':
      return <ProjectCharterBlueprint />;
    case 'sec-17':
      return <CostOfQualityDiagram />;
    case 'sec-18':
      return <HrStaffingDiagram />;
    case 'sec-19':
      return <MotivationWellnessDiagram />;
    case 'sec-20':
      return <ResourcePlanningDiagram />;
    case 'sec-21':
      return <CommunicationMatrixTable />;
    case 'sec-22':
      return <RisksControlTable />;
    case 'sec-23':
      return <ProcurementFlowDiagram />;
    case 'sec-24':
      return <StakeholderGovernanceVisual />;
    case 'sec-25':
      return <ProjectClosureVisual />;
    default:
      return null;
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<SectionCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSectionId, setActiveSectionId] = useState<string>('introduction');

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROPOSAL_SECTIONS.filter((sec) => {
      const matchesCat =
        activeCategory === 'all' || sec.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        sec.title.toLowerCase().includes(q) ||
        sec.paragraphs.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const showIntro = useMemo(() => {
    if (activeCategory !== 'all') return false;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      INTRODUCTION_SECTION.title.toLowerCase().includes(q) ||
      INTRODUCTION_SECTION.paragraphs.some((p) => p.toLowerCase().includes(q))
    );
  }, [activeCategory, searchQuery]);

  const handleJump = (id: string) => {
    setActiveSectionId(id);
    if (activeCategory !== 'all' && id !== 'references' && id !== 'introduction') {
      setActiveCategory('all');
    }
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <div id="top" className="min-h-screen bg-[#f4f6f5] text-[#1a2420]">
      {/* Strict 3-zone Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-[#d8e1dd] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-[#17382b] whitespace-nowrap shrink-0"
          >
            Ready Valley 2029
          </a>

          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4b5d55]"
          >
            <a
              href="#introduction"
              onClick={(e) => {
                e.preventDefault();
                handleJump('introduction');
              }}
              className="hover:text-[#006d56] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#sec-1"
              onClick={(e) => {
                e.preventDefault();
                handleJump('sec-1');
              }}
              className="hover:text-[#006d56] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Schedule &amp; Cost
            </a>
            <a
              href="#sec-4"
              onClick={(e) => {
                e.preventDefault();
                handleJump('sec-4');
              }}
              className="hover:text-[#006d56] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Governance &amp; HR
            </a>
            <a
              href="#sec-22"
              onClick={(e) => {
                e.preventDefault();
                handleJump('sec-22');
              }}
              className="hover:text-[#006d56] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Risks &amp; Closure
            </a>
            <a
              href="#references"
              onClick={(e) => {
                e.preventDefault();
                handleJump('references');
              }}
              className="hover:text-[#006d56] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              References
            </a>
          </nav>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md bg-[#006d56] px-4 py-2 text-xs font-semibold text-white hover:bg-[#17382b] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Print Charter</span>
          </button>
        </div>
      </header>

      {/* UFV-Themed Deep Green Institutional Hero */}
      <section className="bg-[#17382b] text-white border-b border-[#0f261d]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-bold tracking-widest text-[#bdefdd]">
              {PROPOSAL_HEADER.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] leading-[1.15] [text-wrap:balance]">
              {PROPOSAL_HEADER.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg font-medium text-[#d7ece3]">
              {PROPOSAL_HEADER.subtitle}
            </p>
            <p className="mt-4 text-xs sm:text-sm text-[#bdefdd] font-mono-tabular">
              {PROPOSAL_HEADER.meta}
            </p>
          </div>
        </div>
      </section>

      {/* 4-Column Key Charter Figures Strip directly below Hero */}
      <div className="border-b border-[#d8e1dd] bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x divide-[#e5ece9] px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:pr-6">
            <div className="text-xs text-[#4b5d55]">Hypothetical Investment</div>
            <div className="mt-1 font-mono-tabular text-xl font-bold text-[#17382b]">
              CAD $1,000,000,000
            </div>
          </div>
          <div className="py-4 lg:px-6">
            <div className="text-xs text-[#4b5d55]">Regional Service Coverage</div>
            <div className="mt-1 font-mono-tabular text-xl font-bold text-[#17382b]">
              1.9M+ · 20 Communities
            </div>
          </div>
          <div className="py-4 sm:pr-6 lg:px-6">
            <div className="text-xs text-[#4b5d55]">Pandemic Readiness Reserve Fund</div>
            <div className="mt-1 font-mono-tabular text-xl font-bold text-[#c97a16]">
              $80,000,000
            </div>
          </div>
          <div className="py-4 lg:pl-6">
            <div className="text-xs text-[#4b5d55]">Target Completion &amp; Closure</div>
            <div className="mt-1 font-mono-tabular text-xl font-bold text-[#006d56]">
              December 31, 2029
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Filter & Search Toolbar */}
      <div className="border-b border-[#d8e1dd] bg-[#f9fbfa] no-print">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap items-center gap-1 rounded-md border border-[#d8e1dd] bg-white p-1"
            role="tablist"
            aria-label="Filter charter sections by theme"
          >
            {CATEGORY_TABS.map((tab) => {
              const active = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#006d56] text-white'
                      : 'text-[#4b5d55] hover:text-[#17382b] hover:bg-[#f4f6f5]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4b5d55]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search proposal sections..."
                aria-label="Search proposal sections"
                className="w-full rounded-md border border-[#d8e1dd] bg-white py-1.5 pl-8 pr-8 text-xs text-[#1a2420] placeholder:text-[#6b7d75] focus:border-[#006d56] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4b5d55] hover:text-[#17382b] p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <select
              aria-label="Jump to section"
              value={activeSectionId}
              onChange={(e) => handleJump(e.target.value)}
              className="lg:hidden rounded-md border border-[#d8e1dd] bg-white px-3 py-1.5 text-xs font-medium text-[#17382b]"
            >
              <option value="introduction">Introduction and proposal status</option>
              {PROPOSAL_SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
              <option value="references">References</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Desktop Sticky Chapter Sidebar + Visual Charter Body */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Desktop Chapter Index Rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-[#d8e1dd] bg-white p-4">
            <div className="text-xs font-bold tracking-wider uppercase text-[#4b5d55] pb-2.5 border-b border-[#e5ece9]">
              Charter Contents
            </div>
            <nav aria-label="Chapter index" className="mt-2.5 space-y-0.5">
              <button
                type="button"
                onClick={() => handleJump('introduction')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  activeSectionId === 'introduction'
                    ? 'bg-[#eaf5ef] text-[#17382b] font-semibold'
                    : 'text-[#4b5d55] hover:bg-[#f4f6f5] hover:text-[#17382b]'
                }`}
              >
                Introduction and proposal status
              </button>
              {PROPOSAL_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleJump(sec.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors truncate cursor-pointer ${
                    activeSectionId === sec.id
                      ? 'bg-[#eaf5ef] text-[#17382b] font-semibold'
                      : 'text-[#4b5d55] hover:bg-[#f4f6f5] hover:text-[#17382b]'
                  }`}
                  title={sec.title}
                >
                  {sec.title}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleJump('references')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  activeSectionId === 'references'
                    ? 'bg-[#eaf5ef] text-[#17382b] font-semibold'
                    : 'text-[#4b5d55] hover:bg-[#f4f6f5] hover:text-[#17382b]'
                }`}
              >
                References
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Proposal Sections */}
        <main className="min-w-0 space-y-8">
          {/* Introduction Section */}
          {showIntro && (
            <section
              id={INTRODUCTION_SECTION.id}
              className="scroll-mt-20 rounded-lg border border-[#d8e1dd] bg-white p-6 sm:p-8"
            >
              <div className="text-xs text-[#4b5d55] font-medium">
                Overview ·  &amp; UFV Readiness Network
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#17382b]">
                {INTRODUCTION_SECTION.title}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-[#1a2420] max-w-3xl">
                {INTRODUCTION_SECTION.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <ReadinessNetworkDiagram />
            </section>
          )}

          {/* Filtered Checklist Sections 1–25 */}
          {filteredSections.length === 0 ? (
            <div className="rounded-lg border border-[#d8e1dd] bg-white p-8 text-center">
              <p className="text-sm font-medium text-[#17382b]">
                No charter sections match “{searchQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 rounded-md bg-[#006d56] px-4 py-2 text-xs font-semibold text-white hover:bg-[#17382b] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredSections.map((section: ProposalSection) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-20 rounded-lg border border-[#d8e1dd] bg-white p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#4b5d55] font-medium">
                  <span>Section {section.numberLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#006d56]">{section.categoryLabel}</span>
                </div>

                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#17382b]">
                  {section.title}
                </h2>

                {section.paragraphs.length > 0 && (
                  <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-[#1a2420] max-w-3xl">
                    {section.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}

                {renderSectionVisual(section.id)}
              </section>
            ))
          )}

          {/* References Section */}
          <section
            id="references"
            className="scroll-mt-20 rounded-lg border border-[#d8e1dd] bg-white p-6 sm:p-8"
          >
            <div className="text-xs text-[#4b5d55] font-medium">
              Citations &amp; Supporting Documentation
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#17382b]">
              References
            </h2>
            <div className="mt-5 divide-y divide-[#eef3f0]">
              {REFERENCES_LIST.map((ref) => (
                <div key={ref.url} className="py-3.5 text-sm text-[#1a2420]">
                  <p className="leading-relaxed">{ref.citation}</p>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#006d56] hover:text-[#17382b] hover:underline break-all"
                  >
                    <span>{ref.url}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Quiet Academic Portal Footer */}
      <footer className="mt-12 border-t border-[#d8e1dd] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-[#4b5d55]">
          <div>
            Ready Valley 2029 · Fraser Valley Pandemic Preparedness Project Proposal · Chaacha &amp; UFV
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-semibold text-[#006d56] hover:text-[#17382b]"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to top</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
