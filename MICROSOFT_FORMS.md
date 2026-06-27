# Microsoft Forms Setup

Go to https://forms.microsoft.com and click New Form.

Form title (paste this):
MPCS AI & LLM Tools -- Staff Input Survey

Form description (paste this):
The School of Mathematical, Physical and Computational Sciences is gathering staff input to inform our approach to Large Language Model (LLM) tool procurement. This takes 5-8 minutes. Responses are anonymous.

---

## How sections and branching work

Microsoft Forms uses Sections to group questions. You will create 7 sections. Branching is set on the Role question (Q1) so that:

- Research Intensive (RI) -- goes to Section 3 (Research), then continues to Section 5
- Teaching and Research (T&R) -- goes to Section 3 (Research), then Section 4 (Teaching), then Section 5
- Teaching Intensive (TI) -- goes to Section 4 (Teaching), then continues to Section 5
- Executive Support -- goes straight to Section 5 (Professional Tasks)
- Other -- goes straight to Section 5 (Professional Tasks)

Sections 5, 6 and 7 are seen by everyone.

To set branching: click the three dots (...) on Q1 and choose "Add branching". For each answer option, select the section it should jump to.

Because T&R needs to see both Section 3 and Section 4, set T&R to go to Section 3, and at the end of Section 3 add a question directing T&R respondents to Section 4. Microsoft Forms handles this by setting the last question in Section 3 to branch T&R to Section 4 and RI to Section 5.

---

## Section 1: About You

Add a new section titled (paste):
About You

--- Q1 ---
Question type: Choice (Required, single answer)

Question text (paste):
Which of the following best describes your role at UoR?

Options (one per line, paste):
Research Intensive (RI) academic
Teaching and Research (T&R) academic
Teaching Intensive (TI) academic
Executive Support
Other

BRANCHING on this question (click ... then Add branching):
Research Intensive (RI) academic -- go to Section 3: Research
Teaching and Research (T&R) academic -- go to Section 3: Research
Teaching Intensive (TI) academic -- go to Section 4: Teaching
Executive Support -- go to Section 5: Professional Tasks
Other -- go to Section 5: Professional Tasks

--- Q2 ---
Question type: Choice (Required, single answer)

Question text (paste):
Department

Options (one per line, paste):
Computer Science
Mathematics and Statistics
Meteorology

---

## Section 2: Current AI Use

Add a new section titled (paste):
Current AI and LLM Use

--- Q3 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which AI or LLM tools do you currently use? Select all that apply.

Subtitle (paste):
Note: only Microsoft Copilot Chat is currently approved by UoR for use with University data.

Options (one per line, paste):
Microsoft Copilot Chat (University-approved)
ChatGPT (personal or free account)
ChatGPT Plus, Team or Enterprise
Claude (Anthropic)
Google Gemini
GitHub Copilot (coding)
Grammarly or similar writing tools
Domain-specific AI tools (e.g. Elicit, Research Rabbit, SciSpace)
Other
None -- I do not currently use AI or LLM tools

--- Q4 ---
Question type: Choice (Required, single answer)

Question text (paste):
How often do you use AI or LLM tools in your work?

Options (one per line, paste):
Daily
Several times a week
Weekly
Monthly or less
Never

---

## Section 3: Research Uses

Add a new section titled (paste):
Research Uses

Section description (paste):
The University's AI Use in Research guidance distinguishes between AI supporting research (efficiency tools such as writing, summarising and coding) and AI as a research component (where AI is a core method). See: reading.ac.uk/research-innovation-hub/managing-your-research/ai-use-in-research-and-innovation

--- Q5 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which of the following research uses are you interested in or already doing? Select all that apply.

Options (one per line, paste):
Literature searching and summarisation
Drafting or improving research writing (papers, grant bids, reports)
Data analysis, interpretation or visualisation
Code generation or debugging
Research ideation, brainstorming or hypothesis generation
Reviewing manuscripts or grant applications
Translation or language editing
AI as a core research method or component (e.g. NLP, computer vision)
Other research use

--- Q6 ---
Question type: Choice (Required, single answer)

Question text (paste):
How confident are you about the disclosure requirements for AI use in your research outputs?

Subtitle (paste):
Publishers, funders and the University require disclosure of significant AI assistance in papers, grant applications and reports.

Options (one per line, paste):
Very confident
Fairly confident
Uncertain
Not confident at all
Not applicable to my role

--- Q7 ---
Question type: Rating (1 to 5, label as: 1 = Not concerned, 5 = Very concerned)

Question text (paste):
How concerned are you about data privacy when using AI tools with research data?

Subtitle (paste):
For example, uploading datasets, interview transcripts or unpublished results to cloud-based LLM tools.

BRANCHING at end of Section 3:
Add a final question to this section asking T&R respondents to continue:

--- Q7b (routing question for T&R only) ---
Question type: Choice (single answer)
Question text (paste):
Are you also involved in teaching?

Options (one per line, paste):
Yes -- I teach as well as research
No -- research only

BRANCHING on this question:
Yes -- go to Section 4: Teaching
No -- go to Section 5: Professional Tasks

---

## Section 4: Teaching Uses

Add a new section titled (paste):
Teaching Uses

Section description (paste):
See CQSD AI guidance for staff at reading.ac.uk/cqsd/artificial-intelligence. This section is about staff use of LLMs in teaching, not student use.

--- Q8 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which teaching tasks do you currently use or would like to use LLMs for? Select all that apply.

Options (one per line, paste):
Lesson planning and curriculum design
Creating teaching materials, slides or handouts
Drafting or personalising student feedback
Supporting marking (e.g. rubric application, consistency checking)
Accessibility (e.g. generating transcripts, alternative formats)
Teaching students about AI literacy and responsible use
Module design including AI-based assessments (Category 3)
Other teaching use

--- Q9 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which assessment categories do you currently use in your modules? Select all that apply.

Subtitle (paste):
As defined in Assessment Handbook Section 5.9.

Options (one per line, paste):
Category 1 (AI not permitted)
Category 2 (AI permitted to support learning)
Category 3 (AI actively used in assessment)
Not applicable -- I don't set assessments

---

## Section 5: Professional and Administrative Tasks

Add a new section titled (paste):
Professional and Administrative Tasks

--- Q10 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which professional or administrative tasks would you like LLM support for? Select all that apply.

Options (one per line, paste):
Drafting emails and correspondence
Summarising documents, papers or reports
Meeting notes and minutes
Policy, procedure or report writing
Data management, spreadsheet analysis or dashboards
Project planning or task management
Creating presentations
Other administrative use

---

## Section 6: LLM Service Preferences

Add a new section titled (paste):
LLM Service Preferences

--- Q11 ---
Question type: Choice (Required, single answer)

Question text (paste):
If DTS could procure one additional LLM tool, which would be most valuable to you?

Options (one per line, paste):
Microsoft Copilot (integrated into M365 -- Teams, Word, Outlook, etc.)
ChatGPT Enterprise (OpenAI)
Claude for Work or Enterprise (Anthropic)
Google Gemini for Workspace
GitHub Copilot (coding and development)
A specialised research AI tool (e.g. Elicit, Consensus)
A University-developed or self-hosted solution
No preference -- any approved tool
I do not want LLM tools procured

--- Q12 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which features matter most to you in an LLM tool? Select up to 4.

Options (one per line, paste):
Data privacy and GDPR compliance
Integration with Microsoft 365 (Outlook, Word, Teams, SharePoint)
High-quality outputs for academic and research writing
Coding and programming support
Ability to process large documents
Web search and up-to-date information
Multi-language support
Reasonable cost and value for money
Ease of use and low learning curve
Institutional admin and access management

--- Q13 ---
Question type: Choice (Required, single answer)

Question text (paste):
How urgently do you feel DTS should procure enhanced LLM access for staff?

Options (one per line, paste):
Very urgently -- I need this now
In the next 6 months
Within the year
No rush
I don't think we should

---

## Section 7: Support and Concerns

Add a new section titled (paste):
Support and Concerns

--- Q14 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
Which concerns do you have about LLM use at UoR? Select all that apply.

Options (one per line, paste):
Data privacy and confidentiality
Academic integrity and student misuse
Accuracy and hallucination (AI presenting false information as fact)
Intellectual property and copyright
Environmental impact and energy use
Equity of access (not all staff having equal access)
Bias in AI outputs
Deskilling or over-reliance
Lack of transparency in how AI makes decisions
Reputational risk to the University

--- Q15 ---
Question type: Choice (Multiple answers allowed)

Question text (paste):
What training or support would be most useful to you? Select all that apply.

Options (one per line, paste):
An introductory workshop on what LLMs can and cannot do
Discipline-specific guidance for researchers
Guidance on teaching with and about AI
Training on data protection and responsible use
Hands-on sessions with specific tools (e.g. Microsoft Copilot)
A self-service online resource or FAQ
Peer communities of practice (staff sharing examples)
Nothing -- I feel I have enough knowledge already

--- Q16 ---
Question type: Text (Long answer, not required)

Question text (paste):
Is there anything else you would like us to know about your needs or views on AI and LLM tools?
