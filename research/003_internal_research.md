Below is a first-cut internal evidence pack for your Power Automate workshop. I focused on verifiable items in Finance Operations (esp. Revenue Management & Collection / CF&B), then flagged the gaps and what to collect next. I’ve added confidence levels per item and highlighted sensitive material. 

Executive summary (what we can show now) 
• Clear proof of manual process pain (manual billing, duplicate/late tasks, error handling) and active automation (ARPA Hyperautomation, Power Automate flows, the Month‑End Power Apps solution). 
• We do not yet have a single authoritative source for “invoice counts, error rates, overtime, email approval volumes” at the FinOps-wide level; I list where to extract those next (SAP S/4, Coupa, Outlook Graph, Celonis/ARPA). 

 
 

1) AMADEUS FINANCE OPERATIONS METRICS 

Context: Most documented metrics today are process‑level (e.g., CF.AIR month‑end cadence, manual billing volumes by material, ARPA pipelines) rather than a consolidated FinOps dashboard. 

A. Activity & workload indicators (current evidence) 

Month‑end cadence & effort drivers (CF.AIR) 
The CF.AIR monthly closing plan shows critical activities and runtime guidance (e.g., “CI billing document CREDIT takes minimum ~1h; DEBIT ~5h; Excessive job ~8.5h”)—useful anchors to quantify effort windows and where automation/parallelization helps. Confidence: Medium (deck-level guidance; validate against logs). 05. RMC Monthly Meeting - MAY 24  

1 

Manual billing—transactional volumes 
Illustrative month July/Aug 2025 manual/mediated billing files show very large item volumes handled by CF&B (e.g., Net Ticketed Segment Fee BIT quantity 1,589,835 in Jul‑2025; APIS Quick Query messages 363,889 in Jun‑2025), evidencing scale for automation. Confidence: Medium (file-level; sample months). 
Manual billing 06.2025 (e.g., APIS Quick Query 363,889; NTSF quantities)  

2 

 
Manual billing 07.2025 (e.g., NTSF 1,589,835; multiple materials)  

3 

Task effort registry (team‑reported) 
The RMC CF.AIR activity tracker captures effort (HOURS), complexity, approval needs, and deadlines per task—raw material to quantify “time on repetitive work” once aggregated. Confidence: Medium (needs roll‑up). 
Monthly closing activity list-Summary  

4 

Operational error lists 
Routine “exceptional run” emails circulate detailed error tables from SAP Fiori mediations (CIT/BIT), evidencing recurring manual rework loops during month‑end. Confidence: Medium (qualitative indicator; quantify via error log export). 
1st Exceptional, 13th August 2025 - CIT Errors from Alejandro VALLEJO CARMONA  

5 

High volume finance requests (downstream pain) 
Internal “Working with Finance Requests” job aid cites >2,700 finance‑related requests logged by Sales since April—an external signal of finance process friction (copies of invoices/statements, disputes, address changes). Confidence: Medium (scope: Sales→Finance). 
Working with Finance Requests  

6 

B. What we couldn’t verify yet (and where to pull it) 

Metric asked 

Status 

Where to get next (owner/system) 

Why it matters for your deck 

# invoices processed (monthly/annual) 

Not found consolidated 

SAP S/4 (FI/SD posting docs), Billing Cockpit & Zuora/BRIM where applicable; Coupa for STP; pull by company code and doc type 

Baseline for automation ROI per invoice 

Avg. manual reconciliation time 

No time series 

Month-End App audit + ARPA/Celonis activity logs for “reconciling” tasks; Bank/Sales reconciliation tooling logs 

Quantify hours reclaimed by flow/robot 

Error rates (manual processes) 

Not aggregated 

SAP error tables (CIT/BIT/CTS), exception queues, ServiceNow incident tags; Celonis conformance violations 

Turn “errors” into % KPI + rework cost 

Approval workflow time (cycle time) 

Not found 

Coupa approval logs (PR/PO/Invoice), Outlook Graph (email approvals), Month-End App timestamps 

Direct “lead-time” reduction by PA flows 

Finance HC by location 

Not found 

Workday HC report (Finance org), HR Analytics 

Benchmark automation capacity vs. HC 

Expense reports volume 

Not found 

Cytric Expense export (per legal entity/month) 

Tie AI-audit to actual throughput 

SAP transaction volumes (FI/CO) 

Partial (billing items) 

SAP S/4 FI/CO doc counts (FB03, FBL1N/5N) by period 

Macro scale to justify platform flows 

Excel usage stats 

Not found 

O365 telemetry (SharePoint/OneDrive file analytics) + survey 

Baseline “Excel→App/Flow” conversions 

Email volumes for approvals 

Not found 

Outlook Graph search on approval templates (Month-End, RC/CI greenlights) 

Value of PA + Adaptive Cards approvals 

Overtime hours in Finance 

Not found 

Workday Time/Absence; Finance leadership pulse 

Human impact; change story 

 
 

2) CURRENT AUTOMATION INITIATIVES 

CFA Hyperautomation (ARPA) footprint 
Presentation shows the CFA domain has a growing automation portfolio across Accounts Receivable and Contract Fulfilment & Billing, with processes tracked by year/status; examples include CFA‑P27 Automatic Billing Process (MEA) and CFA‑P30 NDC Material Determination, with delays flagged due to ARPA capacity—great proof that automation is already underway, and demand outstrips capacity. Confidence: High. 
CFA CF&B and AR processes & DTS Hyperautomation SEP24  

7 

 
Corroborated by meeting notes: “Automation of BIT Reports (ARPA)” and “Generic Automation of AFO Reports (ARPA)” in Billing Analytics roadmap emails. Confidence: Medium. [Minutes] [Finance Analytics Service - Billing] Roadmap and Priorities: February 2025 (delays due to ARPA capacity)  

8 

Power Automate used in CF.AIR controls (“four‑eyes principle”) 
Business controls deck states: “Establishment of the 4‑eyes principle … first activity under this approach was Manual Billing, with the validation throughout Power Automate flow of the team leads for every load in the system.” Confidence: High. 
BC Action Plans Presentation  

9 

10 

Power Platform adoption signals (enablement + apps) 
– Power Automate training and an Academy session tracked in Agile (COE‑241) illustrate ongoing enablement. Confidence: Medium. Power Automate Training - Presentation  

11 

; [Agile Platform] Updates for COE-241: 2025 Academy session - Power Automate - Flows - Automation (September)  

12 

 
– Month‑End App (Power Apps) in daily use to push greenlights, manage tasks, and send templated notifications, with evidence of template governance and archival to prevent duplicate tasks. Confidence: High. 
Month End Application - User Guide  

13 

; RE: Your greenlight is NEEDED to start RC3… / …Planning dates / …updating tasks MARCH25  

14 

15 

16 

CoE micro‑automations: e.g., automatic folder creation in CF.AIR via macro/automation—small but scalable “citizen dev” wins to remove repetitive steps. Confidence: High. New CoE PIP: Automation - [CF_AIR] - Automatic creation of folders…  

17 

Digital transformation in Finance org 
Leadership materials and programs (e.g., CLC = VISTA + BRIDGE + PEOPLE) target reduced invoice disputes, better contact management, and automated order validation—use these as “platform” initiatives that automation can plug into. Confidence: Medium. CLC = VISTA + BRIDGE + PEOPLE  

18 

What’s missing: Tenancy‑wide Power Platform usage statistics (flows run, active makers, DLP compliance) weren’t found. Next: Use Power Platform CoE Starter Kit dashboards to pull PA/PA apps usage and governance KPIs to quantify adoption in Finance. 

 
 

3) AMADEUS BUSINESS METRICS (for context slides) 

Use 2024 company metrics to frame the scale of our operations that Finance supports: 

Bookings processed in 2024: 470+ million bookings. Confidence: High (corporate master deck). 2025 - Amadeus Technology Master Deck  

19 

Passengers boarded (Amadeus + Navitaire) 2024: 2.2+ billion. Confidence: High. 2025 - Amadeus Technology Master Deck  

19 

Global footprint: 190+ countries; 20,000+ professionals. Confidence: High. 2025 - Amadeus Technology Master Deck  

19 

Revenue 2024: €6,141.7m; R&D investment €1,365m. Confidence: High. 2025 - Amadeus Technology Master Deck  

19 

Payments scale (Outpayce): $120bn+ processed (positioning figure). Confidence: Medium (deck statement; validate per Payments). 2025 - Amadeus Technology Master Deck  

19 

Financial performance narrative (FCF, leverage, Vision‑Box acquisition): internal investor governance deck for 2023→2024 evolution. Confidence: High for directional statements. 2024 SB Executive Governance  

20 

Global Report 2024 (internal copies) for IR‑consistent claims. Confidence: High. Amadeus Global Report 2024; Amadeus-Global-Report-2024  

21 

22 

Still needed (if you want true FinOps economics): Financial processing costs, IT spend on Finance systems, compliance/audit time/costs—not found consolidated. Likely sources: Finance FP&A (CFO dashboards), SAP cost centers for IT allocations, Internal Audit planning and SOX/GRC reports. 

 
 

4) COMPETITIVE INTELLIGENCE (Finance processes) 

Direct internal comparison of Amadeus Finance process maturity vs. Sabre/Travelport: Not found. Confidence: High (after broad search). 
Next best: Use industry automation maturity or benchmarks via process‑mining KPIs (Manual Touch Rate, First Time Right, Schedule Adherence) already defined in our ARPA Process Mining – CtR assessment to position our baseline vs. industry benchmarks (McKinsey/ISG) in the narrative. Confidence: Medium (methodology available; numbers TBD). ARPA Process Mining_CtR Final assessment_20230530  

23 

 
 

5) SPECIFIC USE CASES & SUCCESS STORIES 

Manual Billing “4‑eyes via Power Automate” (CF.AIR) – control + quality 
Result to present: risk reduction and traceable approvals on manual loads; show process screenshot and quote line. Confidence: High (documented). BC Action Plans Presentation  

9 

Month‑End App (Power Apps) – orchestration & comms 
Result to present: standardized greenlight emails, deadline controls, and archival to remove duplicates/overdue noise; cite email trails to show before/after. Confidence: High. Month End Application - User Guide  

13 

; JULY25 Greenlight for Comparisons - ONLY CREDIT!!!  

24 

; RE: Month End app updating tasks MARCH25  

16 

ARPA automations in pipeline/production 
Result to present: number of processes by stream/year; examples CFA‑P27/P30; learning: capacity bottlenecks (use to argue for Power Automate “citizen” complement). Confidence: High. CFA CF&B and AR processes & DTS Hyperautomation SEP24  

7 

; [Minutes] … Roadmap and Priorities: February 2025  

8 

Employee pain points (task mgmt & visibility) 
The RMC Task Management Tool (CoE‑85) deck explicitly states the problems: “Not all tasks are registered… lack of visibility… fragmented tools… results in unstructured data… ~80 users impacted.” Use this as a voice‑of‑employee quote. Confidence: High. 
COE-85 - RMC Task Management Tool  

25 

Cytric Expense (for Finance) – capability references for future scope (AI audit of 100% of claims, automated VAT recovery) to connect to Finance Operations benefits; note these are solution capabilities, not internal adoption metrics. Confidence: High (product docs). 
2024 INTERNAL Cytric value proposition playbook; Cytric Expense - Product guide_v3.1  

26 

27 

 
 

6) WHAT WE SEARCHED & WHERE IT CAME FROM 

SharePoint / OneDrive (Finance, CF&B/CF.AIR, RMC, CFO materials, Investor/Global Report decks), including: 
05. RMC Monthly Meeting - MAY 24  

1 

; Manual billing 06.2025  

2 

; Manual billing 07.2025  

3 

; CFA CF&B and AR processes & DTS Hyperautomation SEP24  

7 

; BC Action Plans Presentation  

9 

; Month End Application - User Guide  

13 

; 2025 - Amadeus Technology Master Deck  

19 

; 2024 SB Executive Governance  

20 

; Amadeus Global Report 2024  

21 

; COE-85 - RMC Task Management Tool  

25 

Emails / Teams (Finance Ops comms, automation topics): 
[Minutes] [Finance Analytics Service - Billing] Roadmap and Priorities: February 2025  

8 

; 1st Exceptional, 13th August 2025 - CIT Errors  

5 

; RE: Your greenlight is NEEDED to start RC3…  

14 

; JULY25 Greenlight for Comparisons - ONLY CREDIT!!!  

24 

; [Agile Platform] Updates for COE-241…  

12 

If you want live links in your deck, I can extract the SharePoint/OneDrive URLs per file, or attach the files into your Teams channel. 

 
 

7) QUOTES YOU CAN LIFT 

“The first activity under this [4‑eyes] approach was Manual Billing, with the validation throughout Power Automate flow of the team leads for every load in the system.” — BC Action Plans Presentation (CF.AIR controls)  

9 

“Automation of BIT Reports … Generic Automation of AFO Reports (ARPA) — delays expected due to capacity constraints” — [Minutes] [Finance Analytics Service - Billing] Roadmap and Priorities: February 2025  

8 

“Information is not structured or standardized. Manual tracking leads to inefficiencies and errors. … ~80 users impacted.” — COE-85 - RMC Task Management Tool  

25 

 
 

8) SENSITIVE DATA (do not share externally) 

Internal decks and PDFs including financial performance, internal controls, billing materials, error logs, and employee emails (all items cited above). Mark any slides with full screenshots from: BC Action Plans Presentation  

9 

, Manual billing 06.2025 / Manual billing 07.2025  

2 

3 

, ... (multiple) as Internal – Confidential. 

 
 

9) RECOMMENDED “NEXT DATA PULL” TO COMPLETE THE STORY 

If we want exact numbers for your headline metrics (invoices/month, error rates, approval lead-times, overtime), here’s the fastest evidence plan you can include as “in progress”: 

Invoices processed (monthly/annual): SAP S/4 FI/SD doc counts (by legal entity / doc type). Owner: CF&A SAP support. 

Approval cycle times: Coupa (PR/PO/Invoice approval durations) + Outlook Graph counts for Month‑End approval emails (Power Automate connector). 

Reconciliation time & error rates: Extract CIT/BIT error tables (SAP) and conformance violations (Celonis/ARPA) to compute #errors / #items and rework time. 

Expense volumes: Cytric Expense monthly statements per entity. 

Overtime: Workday (Finance org time/overtime) for peak months (MEC, YE). 

Power Platform usage in Finance: Deploy CoE Starter Kit dashboards; slice runs/makers/solutions under Finance workspaces/environments. 

 
 

10) How to present this in your workshop 

Slide 1–2: Business scale (470M bookings; 2.2B boarded; 190+ countries) → “Our finance backbone runs at travel industry scale”.  

19 

Slide 3–4: Pain today — quotes + screenshots (manual billing runs, exception emails, duplicated tasks) → “human toil” + risk.  

5 

1 

16 

Slide 5–6: What we’ve automated already — 4‑eyes Power Automate flow, Month‑End App, ARPA pipeline (call out capacity bottleneck).  

9 

13 

7 

8 

Slide 7: The opportunity metrics we’re finalizing (table with TBDs and systems), + ask for sponsorship to unlock SAP/Coupa/Workday extracts. 

Slide 8: Pilot proposals for Power Automate (e.g., “Approval SLAs” with deadline reminders; “Automated error triage from CIT logs;” “Daily greenlights;” “Excel‑to‑App transformations”). 

 
 

Confidence key 

High: Multiple corroborating internal sources or official corporate decks 

Medium: Single authoritative source or deck-level guidance; needs system extract to quantify 

Low: Anecdotal or inferred; needs validation 