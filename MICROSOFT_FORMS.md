# Microsoft Forms Setup

Go to https://forms.microsoft.com and create a new form titled:
**"MPCS AI & LLM Tools — Staff Input Survey"**

Add a description:
> The School of Mathematical, Physical and Computational Sciences is gathering staff input to inform our approach to Large Language Model (LLM) tool procurement. Takes 5–8 minutes. Responses are anonymous.

---

## Section 1: About You

**Q1 — Choice (required, single answer)**
> Which of the following best describes your role at UoR?
- Research Intensive (RI) academic
- Teaching and Research (T&R) academic
- Teaching Intensive (TI) academic
- Executive Support
- Other

⚙️ **Set branching on this question:**
- RI → go to Section 3 (Research)
- T&R → go to Section 3 (Research)  
- TI → go to Section 4 (Teaching)
- Executive Support → go to Section 5 (Professional Tasks)
- Other → go to Section 5 (Professional Tasks)

**Q2 — Choice (required, single answer)**
> Department
- Computer Science
- Mathematics and Statistics
- Meteorology

---

## Section 2: Current AI Use
*(All roles — but this section is skipped for branching; merge into Section 1 or place before branching question)*

> **Tip:** Put Q3 and Q4 before the branching question so everyone sees them.

**Q3 — Choice (multi-answer)**
> Which AI or LLM tools do you currently use? (select all that apply)
> Note: only Microsoft Copilot Chat is currently approved by UoR for University data.
- Microsoft Copilot Chat (University-approved)
- ChatGPT (personal/free account)
- ChatGPT Plus/Team/Enterprise
- Claude (Anthropic)
- Google Gemini
- GitHub Copilot (coding)
- Grammarly or similar writing tools
- Domain-specific AI tools (e.g. Elicit, Research Rabbit, SciSpace)
- Other
- None — I do not currently use AI/LLM tools

**Q4 — Choice (required, single answer)**
> How often do you use AI/LLM tools in your work?
- Daily
- Several times a week
- Weekly
- Monthly or less
- Never

---

## Section 3: Research Uses
*(Shown to RI and T&R academics only)*

Add subtitle:
> The University's AI Use in Research guidance distinguishes between AI supporting research (efficiency tools) and AI as a research component (core method). See: reading.ac.uk/research-innovation-hub/managing-your-research/ai-use-in-research-and-innovation

**Q5 — Choice (multi-answer)**
> Which research uses are you interested in or already doing? (select all that apply)
- Literature searching and summarisation
- Drafting or improving research writing (papers, grant bids, reports)
- Data analysis, interpretation or visualisation
- Code generation or debugging
- Research ideation, brainstorming or hypothesis generation
- Reviewing manuscripts or grant applications
- Translation or language editing
- AI as a core research method or component (e.g. NLP, computer vision)
- Other research use

**Q6 — Choice (single answer)**
> How confident are you about disclosure requirements for AI use in your research outputs?
- Very confident
- Fairly confident
- Uncertain
- Not confident at all
- Not applicable to my role

**Q7 — Rating (1–5)**
> How concerned are you about data privacy when using AI tools with research data?
> (1 = Not concerned, 5 = Very concerned)

⚙️ **Branching:** If role was T&R → go to Section 4. If role was RI → go to Section 5.

---

## Section 4: Teaching Uses
*(Shown to T&R and TI academics only)*

Add subtitle:
> See CQSD AI guidance: reading.ac.uk/cqsd/artificial-intelligence. This section focuses on staff use of LLMs in teaching, not student use.

**Q8 — Choice (multi-answer)**
> Which teaching tasks do you currently use (or would like to use) LLMs for? (select all that apply)
- Lesson planning and curriculum design
- Creating teaching materials, slides or handouts
- Drafting or personalising student feedback
- Supporting marking (e.g. rubric application, consistency checking)
- Accessibility (e.g. generating transcripts, alternative formats)
- Teaching students about AI literacy and responsible use
- Module design including AI-based assessments (Category 3)
- Other teaching use

**Q9 — Choice (multi-answer)**
> Which assessment categories do you currently use in your modules? (select all that apply)
> As defined in Assessment Handbook Section 5.9.
- Category 1 (AI not permitted)
- Category 2 (AI permitted to support learning)
- Category 3 (AI actively used in assessment)
- Not applicable / I don't set assessments

⚙️ **Branching:** End of section → go to Section 5

---

## Section 5: Professional & Administrative Tasks
*(All roles)*

**Q10 — Choice (multi-answer)**
> Which professional/administrative tasks would you like LLM support for? (select all that apply)
- Drafting emails and correspondence
- Summarising documents, papers or reports
- Meeting notes and minutes
- Policy, procedure or report writing
- Data management, spreadsheet analysis or dashboards
- Project planning or task management
- Creating presentations
- Other administrative use

---

## Section 6: LLM Service Preferences

**Q11 — Choice (single answer)**
> If DTS could procure one additional LLM tool, which would be most valuable to you?
- Microsoft Copilot (integrated into M365 — Teams, Word, Outlook, etc.)
- ChatGPT Enterprise (OpenAI)
- Claude for Work / Enterprise (Anthropic)
- Google Gemini for Workspace
- GitHub Copilot (coding/development)
- A specialised research AI tool (e.g. Elicit, Consensus)
- A University-developed or self-hosted solution
- No preference — any approved tool
- I do not want LLM tools procured

**Q12 — Choice (multi-answer, max 4)**
> Which features matter most to you in an LLM tool? (select up to 4)
- Data privacy and GDPR compliance
- Integration with Microsoft 365 (Outlook, Word, Teams, SharePoint)
- High-quality outputs for academic/research writing
- Coding / programming support
- Ability to process large documents
- Web search / up-to-date information
- Multi-language support
- Reasonable cost / value for money
- Ease of use and low learning curve
- Institutional admin and access management

**Q13 — Choice (single answer)**
> How urgently do you feel DTS should procure enhanced LLM access for staff?
- Very urgently — I need this now
- In the next 6 months
- Within the year
- No rush
- I don't think we should

---

## Section 7: Support & Concerns

**Q14 — Choice (multi-answer)**
> Which concerns do you have about LLM use at UoR? (select all that apply)
- Data privacy and confidentiality
- Academic integrity and student misuse
- Accuracy and hallucination
- Intellectual property and copyright
- Environmental impact / energy use
- Equity of access
- Bias in AI outputs
- Deskilling or over-reliance
- Lack of transparency in AI decisions
- Reputational risk to the University

**Q15 — Choice (multi-answer)**
> What training or support would be most useful? (select all that apply)
- An introductory workshop on what LLMs can and cannot do
- Discipline-specific guidance for researchers
- Guidance on teaching with/about AI
- Training on data protection and responsible use
- Hands-on sessions with specific tools (e.g. Microsoft Copilot)
- A self-service online resource / FAQ
- Peer communities of practice
- Nothing — I feel I have enough knowledge already

**Q16 — Text (long answer, optional)**
> Is there anything else you'd like us to know about your needs or views on AI/LLM tools?

---

## Collecting responses for the dashboard

Once you have responses:
1. In Microsoft Forms, click **Responses** tab → **Open in Excel**
2. Save/export as CSV
3. Upload to the dashboard at your survey URL + `/dashboard`
