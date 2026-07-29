// Auto-generated from community-provided FAQ content.
// Structure: one entry per category, each with an ordered list of Q&A pairs,
// an optional glossary table, and optional official source links/names.

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGlossary {
  title: string | null;
  headers: [string, string];
  rows: [string, string][];
}

export interface FaqCategory {
  id: string;
  title: string;
  intro?: string;
  items: FaqItem[];
  glossary?: FaqGlossary;
  sources?: string[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "moving-to-germany",
    title: `Moving to Germany (General Newcomer Guide)`,
    items: [
      {
        question: `What should I do immediately after arriving in Germany?`,
        answer: `After arriving in Germany, there are several important steps you should complete:

1. Register your address (Anmeldung) at the local registration office.
2. Open a German bank account.
3. Obtain health insurance.
4. Apply for a residence permit if required.
5. Get your tax identification number (Steuer-ID).
6. Register for university, work, or other official purposes depending on your situation.

Completing these steps helps you settle legally and access important services.
Official Information:
Make it in Germany – The German government's portal for international newcomers.`,
      },
      {
        question: `What is Anmeldung and why is it important?`,
        answer: `Anmeldung means registering your residential address with the local authorities.
Everyone living in Germany is legally required to register their address after moving into a new apartment or room.
You need Anmeldung for many important services:

* Opening a bank account
* Receiving your Tax ID
* Applying for a residence permit
* Getting a mobile phone contract
* Signing many official contracts

You normally need to register within 14 days after moving into your accommodation.
Required documents usually include:

* Passport
* Residence document (if available)
* Registration form
* Confirmation from your landlord (Wohnungsgeberbestätigung)`,
      },
      {
        question: `Where can I register my address in Marburg?`,
        answer: `People living in Marburg can register their address at the city's registration office (Bürgerbüro / Meldebehörde).
You should book an appointment before visiting.
Bring:

* Passport
* Residence permit/visa
* Completed registration form
* Landlord confirmation`,
      },
      {
        question: `What happens if I do not complete Anmeldung?`,
        answer: `Not completing Anmeldung can create problems because many German services depend on your registered address.
Possible difficulties include:

* Not receiving your Tax ID
* Problems opening a bank account
* Problems with residence permit applications
* Missing official letters

Germany uses your registered address for important communication.`,
      },
      {
        question: `What is a residence permit (Aufenthaltstitel)?`,
        answer: `A residence permit is an official document that allows non-EU citizens to legally live in Germany.
The type of residence permit depends on your reason for staying, for example:

* Studying
* Employment
* Family reunification
* Research
* Vocational training
* Humanitarian reasons

The conditions written on your residence permit define what activities you are allowed to do.`,
      },
      {
        question: `What is the difference between a visa and a residence permit?`,
        answer: `A visa allows you to enter Germany for a specific purpose.
A residence permit allows you to stay in Germany for a longer period after arrival.
Example:
A student from Pakistan may enter Germany with a student visa and later receive a student residence permit from the local immigration authority (Ausländerbehörde).`,
      },
      {
        question: `How do I extend my residence permit?`,
        answer: `You should apply for an extension before your current permit expires.
Generally, you need:

* Passport
* Current residence permit
* Proof of financial resources
* Health insurance proof
* University/work documents depending on your purpose

Apply early because appointments can take time.`,
      },
      {
        question: `Can I travel outside Germany with my residence permit?`,
        answer: `Yes, generally you can travel within the Schengen Area if your residence permit is valid.
However:

* Your passport must be valid.
* Your residence permit must not expire during travel.
* Longer stays outside Germany may affect your residence status.

Always check your specific conditions before travelling.`,
      },
      {
        question: `What documents should I always keep safely?`,
        answer: `Important documents include:

* Passport
* Residence permit
* Anmeldung certificate
* Health insurance card
* University enrollment certificate
* Employment contract
* Tax ID letter
* Bank documents
* Rental contract

Keep digital copies as well.`,
      },
      {
        question: `What is the Tax Identification Number (Steuer-ID)?`,
        answer: `The Steuer-ID is your personal tax identification number in Germany.
It is automatically sent after you complete Anmeldung.
You need it for:

* Employment
* Tax purposes
* Salary processing
* Some government services

The number remains the same throughout your life.`,
      },
      {
        question: `What is the difference between Steuer-ID and tax number?`,
        answer: `The Steuer-ID is a permanent personal identification number.
A tax number (Steuernummer) is mainly used for businesses and tax offices.
Most employees only need their Steuer-ID.`,
      },
      {
        question: `Do I need a German bank account?`,
        answer: `A German bank account is highly recommended because it makes daily life easier.
You usually need it for:

* Receiving salary
* Paying rent
* Health insurance payments
* Mobile contracts
* Electricity bills

Many banks offer accounts specifically for students.`,
      },
      {
        question: `How can I get a German SIM card?`,
        answer: `You can buy a German mobile SIM card from:

* Mobile network providers
* Supermarkets
* Online providers

You normally need:

* Passport
* Address information
* Identity verification

Germany has prepaid and monthly contract options.`,
      },
      {
        question: `What emergency numbers should everyone know?`,
        answer: `Important emergency numbers:
🚑 Medical Emergency / Fire
112
👮 Police
110
🩺 Medical Service (non-emergency)
116117
Use emergency numbers only for urgent situations.`,
      },
      {
        question: `What should I do if I lose my passport?`,
        answer: `If you lose your passport:

1. Report the loss to the police.
2. Contact the Pakistani Embassy/Consulate.
3. Apply for replacement documents if required.
4. Inform relevant authorities if your residence documents are affected.

Keep a copy of your passport separately to make the process easier.`,
      },
      {
        question: `Can I move from one German city to another?`,
        answer: `Yes, but you must consider:

* Residence permit conditions
* University/work requirements
* Address registration rules

After moving, you must complete Anmeldung at your new address.`,
      },
      {
        question: `What is the Ausländerbehörde?`,
        answer: `The Ausländerbehörde is the immigration authority responsible for:

* Residence permits
* Extensions
* Work permissions
* Family reunification
* Other immigration matters

Each city has its own immigration office.`,
      },
      {
        question: `What is BAMF?`,
        answer: `BAMF (Bundesamt für Migration und Flüchtlinge) is Germany's Federal Office for Migration and Refugees.
It handles:

* Integration courses
* Migration information
* Refugee procedures
* Research and migration programmes`,
      },
      {
        question: `Where can newcomers get help in Marburg?`,
        answer: `Newcomers can seek help from:

* Pakistanis in Marburg community
* University international offices
* City counselling services
* Migration advice centres
* Student organisations
* Local authorities

Community members can help with:

* Understanding German paperwork
* Finding accommodation
* University orientation
* Daily life questions`,
      },
      {
        question: `Is Germany a good place for Pakistani students and professionals?`,
        answer: `Germany offers many opportunities for international residents through:

* High-quality universities
* Skilled worker opportunities
* Research programmes
* Strong labour protections
* Social security system

Success usually depends on:

* German language skills
* Professional qualifications
* Adaptability
* Understanding German systems`,
      },
    ],
  },
  {
    id: "students-in-germany",
    title: `Students in Germany (International Students Guide)`,
    intro: `This section is designed especially for Pakistani students coming to Germany for:

* Studienkolleg
* Bachelor studies
* Master studies
* PhD studies
* Language preparation courses`,
    items: [
      {
        question: `How can I study in Germany as a Pakistani student?`,
        answer: `Pakistani students can study in Germany if they meet the admission requirements of a German university.
The general process includes:

1. Checking whether your previous education is recognised.
2. Choosing a suitable university and programme.
3. Preparing required documents.
4. Applying through the university or platforms such as uni-assist (if required).
5. Obtaining a student visa.
6. Arriving in Germany and completing registration.

Requirements depend on:

* Your educational background
* Your chosen programme
* Language requirements
* University regulations`,
      },
      {
        question: `What is Studienkolleg?`,
        answer: `Studienkolleg is a preparatory course for international students whose school qualification is not directly equivalent to the German Abitur.
It prepares students for university studies in Germany.
There are different courses:

* T-Kurs → Engineering, Mathematics, Natural Sciences
* M-Kurs → Medicine and Biology-related fields
* W-Kurs → Business and Economics
* G-Kurs → Humanities
* S-Kurs → Language-related studies

After completing Studienkolleg, students usually take the Feststellungsprüfung (FSP).
Passing the FSP allows students to apply for university admission in the corresponding field.`,
      },
      {
        question: `Do Pakistani students always need Studienkolleg?`,
        answer: `Not always.
It depends on:

* Your Pakistani qualification
* Your previous university studies
* The German university requirements

Some applicants may directly qualify for university admission, while others need Studienkolleg.
Students should check their eligibility through official recognition databases and university admission offices.`,
      },
      {
        question: `What is uni-assist?`,
        answer: `uni-assist is a service that evaluates applications from international students for many German universities.
They check:

* Educational documents
* Eligibility
* Application requirements

Not every university uses uni-assist. Some universities accept applications directly.`,
      },
      {
        question: `What documents are usually required for university applications?`,
        answer: `Common documents include:

* Passport copy
* Academic certificates
* Transcripts
* Language certificates
* CV
* Motivation letter (depending on programme)
* Application forms
* Proof of previous education

Requirements vary between universities.`,
      },
      {
        question: `Which German language level is needed for university?`,
        answer: `The required level depends on the programme.
Common requirements:

* B1/B2 → Some preparatory programmes
* B2/C1 → Many German-taught university programmes
* C1 → Common requirement for many Bachelor's and Master's programmes

Accepted certificates may include:

* TestDaF
* DSH
* telc C1 Hochschule
* Goethe certificates

Always check the university's specific requirements.`,
      },
      {
        question: `Can I study in English in Germany?`,
        answer: `Yes.
Germany offers many English-taught programmes, especially at Master's level.
However:

* Daily life still requires German.
* Part-time jobs often require German skills.
* Integration becomes easier with German.`,
      },
      {
        question: `How much money do I need to study in Germany?`,
        answer: `International students usually need proof of financial resources for their visa.
This is often demonstrated through:

* Blocked account (Sperrkonto)
* Scholarship
* Financial guarantee

The required amount can change each year, so students should check the latest official visa requirements.`,
      },
      {
        question: `What is a blocked account (Sperrkonto)?`,
        answer: `A blocked account is a special bank account used to prove that a student has enough money to support themselves in Germany.
The money is blocked and released monthly according to German regulations.
It is commonly used for student visa applications.`,
      },
      {
        question: `Can international students work in Germany?`,
        answer: `Yes.
International students from non-EU countries can generally work according to the conditions of their residence permit.
Students should follow the legal working limits written in their documents.
Working should not negatively affect:

* Studies
* Residence status
* University progress`,
      },
      {
        question: `How many hours can students work?`,
        answer: `The permitted working time depends on current immigration regulations and your residence permit conditions.
Students should check:

* Their residence permit
* Official immigration guidance
* University regulations

Working beyond permitted limits can create problems.`,
      },
      {
        question: `What jobs can students do in Germany?`,
        answer: `Common student jobs include:

* Research assistant (HiWi)
* Restaurant work
* Delivery jobs
* Retail jobs
* Warehouse jobs
* Tutoring
* University assistant positions

German language skills significantly increase job opportunities.`,
      },
      {
        question: `What is a HiWi job?`,
        answer: `A HiWi (Hilfswissenschaftliche Hilfskraft) is a student assistant position at a university.
Tasks may include:

* Research support
* Laboratory assistance
* Data analysis
* Administrative work
* Supporting professors

HiWi jobs are valuable because they provide academic experience.`,
      },
      {
        question: `Can students do internships?`,
        answer: `Yes.
Internships are common in Germany.
They can help students:

* Gain professional experience
* Improve German skills
* Build professional networks
* Find future employment

Always check whether your residence permit allows the internship.`,
      },
      {
        question: `Can students change their university?`,
        answer: `In many cases, yes.
However, students should consider:

* Residence permit conditions
* Credit transfer
* Admission requirements
* University deadlines

Always inform the relevant authorities if your study situation changes.`,
      },
      {
        question: `Can students change their study programme?`,
        answer: `Changing programmes may be possible, but repeated changes can affect residence status.
Students should:

* Contact their university
* Check immigration requirements
* Plan carefully`,
      },
      {
        question: `What happens if I fail an exam?`,
        answer: `Failing an exam does not automatically mean losing your residence permit.
However:

* Repeated failures
* Lack of academic progress
* Long delays

may create problems.
Students should contact:

* University academic counselling
* International office
* Student advisory services`,
      },
      {
        question: `What is semester contribution (Semesterbeitrag)?`,
        answer: `Most public universities charge a semester contribution.
It usually covers:

* Student services
* Administration
* Student organisations
* Public transport ticket (in many universities)

It is not the same as tuition fees.`,
      },
      {
        question: `Are German public universities free?`,
        answer: `Many public universities do not charge tuition fees for most programmes.
However, students usually pay:

* Semester contribution
* Living expenses
* Health insurance
* Accommodation costs

Some programmes or universities may have tuition fees.`,
      },
      {
        question: `Can international students get scholarships?`,
        answer: `Yes.
Scholarships are available from:

* Universities
* German organisations
* Foundations
* Research institutions

Examples include:

* DAAD scholarships
* University scholarships

Eligibility depends on academic performance and personal circumstances.`,
      },
      {
        question: `How can I improve my chances of finding a student job?`,
        answer: `Helpful steps:

* Learn German (B1/B2 improves opportunities)
* Prepare a German CV (Lebenslauf)
* Create a LinkedIn profile
* Visit university job portals
* Network with students and professionals`,
      },
      {
        question: `What is a German CV (Lebenslauf)?`,
        answer: `A German CV usually includes:

* Personal information
* Education
* Work experience
* Skills
* Languages
* Certificates

It should normally be:

* Clear
* Professional
* Chronological`,
      },
      {
        question: `Can students bring their spouse to Germany?`,
        answer: `In some cases, yes.
Family reunification depends on:

* Residence status
* Financial situation
* Accommodation
* Legal requirements

Students should contact the Ausländerbehörde for individual guidance.`,
      },
      {
        question: `Can students apply for permanent residence?`,
        answer: `Possible, but requirements must be fulfilled.
Factors include:

* Duration of residence
* Employment status
* Income
* German language skills
* Pension contributions`,
      },
      {
        question: `Can students stay in Germany after graduation?`,
        answer: `Yes.
Graduates may apply for a residence permit to search for qualified employment after completing their studies.`,
      },
      {
        question: `What should students do before graduation?`,
        answer: `Students should:

* Improve German language skills
* Gain internships/work experience
* Build professional networks
* Prepare German CV
* Research job opportunities`,
      },
      {
        question: `How can Pakistani students adapt to German culture?`,
        answer: `Helpful tips:

* Learn German
* Respect appointments and punctuality
* Understand recycling rules
* Follow laws and regulations
* Participate in local activities`,
      },
      {
        question: `Where can Pakistani students get help in Marburg?`,
        answer: `Students in Marburg can seek support from:

* Philipps-Universität Marburg International Office
* Studentenwerk
* Student organisations
* Pakistanis in Marburg community
* Local counselling services`,
      },
      {
        question: `What challenges do Pakistani students commonly face?`,
        answer: `Common challenges include:

* German bureaucracy
* Language barriers
* Finding accommodation
* Managing finances
* Cultural differences
* Finding part-time jobs

Preparation and community support make adaptation easier.`,
      },
      {
        question: `How can Pakistani students connect with the community in Marburg?`,
        answer: `Students can join:

* Cultural events
* Sports activities
* Student gatherings
* Volunteer activities
* Pakistani community programmes

The Pakistanis in Marburg community aims to support newcomers through networking, guidance and social activities.`,
      },
    ],
  },
  {
    id: "professionals-workers-in-germany",
    title: `Professionals & Workers in Germany (Career & Employment Guide)`,
    intro: `This section is designed for Pakistani professionals who come to Germany for:

* Skilled employment
* Engineering and IT jobs
* Healthcare professions
* Business opportunities
* Blue Card employment
* Vocational jobs
* Career development`,
    items: [
      {
        question: `Can Pakistani citizens work in Germany?`,
        answer: `Yes.
Pakistani citizens can work in Germany if they obtain the appropriate visa or residence permit that allows employment.
The type of permit depends on:

* Professional qualification
* Job offer
* Salary level
* Education
* Work experience

Germany has several immigration routes for qualified workers.`,
      },
      {
        question: `Do I need a job offer before coming to Germany?`,
        answer: `It depends on the immigration route.
Many work visas require a job offer from a German employer.
However, some programmes allow qualified professionals to enter Germany to search for employment under specific conditions.
Examples:

* Opportunity Card (Chancenkarte)
* Job seeker routes (depending on eligibility)`,
      },
      {
        question: `What is the Opportunity Card (Chancenkarte)?`,
        answer: `The Opportunity Card allows qualified international professionals to come to Germany to look for employment.
Eligibility may depend on:

* Recognised qualification
* Professional experience
* Language skills
* Age
* Financial ability

The card allows job searching under defined conditions.`,
      },
      {
        question: `What qualifications are needed to work in Germany?`,
        answer: `Requirements depend on the profession.
Generally, professionals may need:

* Recognised university degree or vocational qualification
* Relevant work experience
* Language skills
* Employment contract

Some regulated professions require official recognition before working.`,
      },
      {
        question: `How can I check if my Pakistani degree is recognised?`,
        answer: `You can check recognition through official German databases.
Important resources include:

* Anabin database
* Recognition Finder
* Relevant professional authorities

Recognition is especially important for regulated professions.`,
      },
      {
        question: `What is professional recognition (Anerkennung)?`,
        answer: `Anerkennung is the official process of comparing a foreign qualification with a German qualification.
It determines whether your qualification is:

* Fully recognised
* Partially recognised
* Requires additional training

This process helps employers understand your qualifications.`,
      },
      {
        question: `Which professions are in demand in Germany?`,
        answer: `Germany has demand in many sectors, including:

* Information Technology
* Engineering
* Healthcare
* Nursing
* Skilled trades
* Science and research
* Education
* Logistics

Demand changes depending on labour market needs.`,
      },
      {
        question: `Do I need German language skills to work in Germany?`,
        answer: `It depends on the profession.
Some international companies operate in English.
However, German improves opportunities in:

* Customer-facing jobs
* Healthcare
* Administration
* Local companies
* Career advancement

Recommended levels:

* A2/B1 → Basic workplace communication
* B2 → Many professional jobs
* C1 → Advanced professional communication`,
      },
      {
        question: `How can I find a job in Germany?`,
        answer: `Common job search platforms include:

* Federal Employment Agency job portal
* Company career pages
* LinkedIn
* Indeed Germany
* StepStone
* University career portals

Networking is also very important in Germany.`,
      },
      {
        question: `How should I prepare a German CV?`,
        answer: `A German CV (Lebenslauf) should usually include:

* Personal details
* Professional summary
* Education
* Work experience
* Technical skills
* Language skills
* Certificates
* Projects

Keep it clear and professional.
Many German employers prefer a structured chronological format.`,
      },
      {
        question: `What is a German cover letter (Anschreiben)?`,
        answer: `Anschreiben is a motivation letter explaining:

* Why you are applying
* Why you are suitable
* Why you want to work for that company

It should be customised for each application.`,
      },
      {
        question: `What documents should professionals prepare before applying?`,
        answer: `Important documents include:

* Passport
* CV
* Degree certificates
* Transcripts
* Employment certificates
* Training certificates
* Language certificates
* Reference letters

Having translated documents can be helpful.`,
      },
      {
        question: `What is the EU Blue Card?`,
        answer: `The EU Blue Card is a residence permit for highly qualified non-EU professionals.
It is designed for:

* University graduates
* Qualified professionals
* Higher-paying employment positions

Requirements include:

* Recognised qualification
* Suitable employment
* Minimum salary requirements

Salary thresholds can change yearly.`,
      },
      {
        question: `Can I change employers after receiving a work residence permit?`,
        answer: `In many cases, yes.
However:

* Check the conditions of your residence permit.
* Some restrictions may apply initially.
* Inform the immigration authority if required.`,
      },
      {
        question: `What rights do employees have in Germany?`,
        answer: `Employees have important legal protections, including:

* Minimum wage protection
* Paid holidays
* Sick leave
* Protection against unfair dismissal
* Workplace safety
* Social insurance`,
      },
      {
        question: `How many vacation days do employees get?`,
        answer: `The legal minimum depends on working days per week.
Many full-time employees receive around:

* 20 working days minimum for a five-day work week
* Often 25–30 days through employment contracts

Your contract determines your exact entitlement.`,
      },
      {
        question: `What happens if I become sick while working?`,
        answer: `If you become sick:

1. Inform your employer immediately.
2. Visit a doctor if necessary.
3. Submit a medical certificate if required.

Employees may receive continued salary payments during illness under German labour law conditions.`,
      },
      {
        question: `What is a probation period (Probezeit)?`,
        answer: `A probation period is an initial trial period in an employment contract.
During this period:

* Employer and employee evaluate the working relationship.
* Notice periods may be shorter.

The maximum probation period is generally limited by German law.`,
      },
      {
        question: `What is the difference between gross salary and net salary?`,
        answer: `Gross salary (Brutto):
The salary before deductions.
Net salary (Netto):
The amount you receive after deductions.
Deductions may include:

* Income tax
* Health insurance
* Pension insurance
* Unemployment insurance
* Care insurance`,
      },
      {
        question: `Do foreign workers pay taxes in Germany?`,
        answer: `Yes.
Employees in Germany usually pay:

* Income tax
* Social security contributions

The amount depends on:

* Salary
* Tax class
* Personal circumstances`,
      },
      {
        question: `What is a tax class (Steuerklasse)?`,
        answer: `Tax classes determine how much income tax is deducted from your salary.
Factors include:

* Marriage status
* Employment situation
* Family circumstances`,
      },
      {
        question: `Can professionals bring their family to Germany?`,
        answer: `Yes, under certain conditions.
Family reunification may be possible for:

* Spouses
* Children

Requirements depend on:

* Residence status
* Income
* Accommodation
* Legal conditions`,
      },
      {
        question: `Can my spouse work after joining me in Germany?`,
        answer: `In many cases, yes.
The exact work rights depend on the residence permit issued to the spouse.
Always check the residence document.`,
      },
      {
        question: `How can professionals integrate into German working culture?`,
        answer: `Helpful practices:

* Be punctual
* Respect deadlines
* Communicate clearly
* Prepare for meetings
* Follow workplace rules
* Learn German workplace vocabulary`,
      },
      {
        question: `How can Pakistani professionals build a career network in Germany?`,
        answer: `Useful methods:

* Attend professional events
* Join LinkedIn groups
* Participate in conferences
* Connect with Pakistani professionals
* Join local communities
* Attend university alumni events

Networking can help with:

* Job opportunities
* Career advice
* Industry knowledge`,
      },
      {
        question: `Can I start my own business in Germany?`,
        answer: `Yes, depending on your residence status.
Entrepreneurs may need:

* Appropriate residence permission
* Business plan
* Financial resources
* Registration with authorities`,
      },
      {
        question: `What is Gewerbeanmeldung?`,
        answer: `Gewerbeanmeldung is the registration of a commercial business activity.
It is required for many self-employed activities.
After registration, businesses may need:

* Tax registration
* Accounting records
* Insurance`,
      },
      {
        question: `What support exists for entrepreneurs?`,
        answer: `Support may come from:

* Local business offices
* Chambers of commerce
* Startup programmes
* Business counselling services`,
      },
      {
        question: `Can I study while working in Germany?`,
        answer: `Yes, depending on your situation.
Many professionals complete:

* Part-time degrees
* Professional courses
* Language courses
* Certifications`,
      },
      {
        question: `How can Pakistani professionals contribute to the Marburg community?`,
        answer: `Professionals can support the community by:

* Mentoring students
* Sharing career experience
* Helping newcomers
* Organising workshops
* Creating professional networks

A strong professional network helps the Pakistani community grow.`,
      },
    ],
    sources: [
      `Make it in Germany (Federal Government portal)`,
      `BAMF (Federal Office for Migration and Refugees)`,
      `Bundesagentur für Arbeit (Federal Employment Agency)`,
      `Recognition in Germany portal`,
    ],
  },
  {
    id: "families-in-germany",
    title: `Families in Germany (Family Life & Integration Guide)`,
    intro: `This section is designed for Pakistani families living in Germany or planning to bring their family members.
Topics covered:

* Family reunification
* Bringing spouse and children
* Schools and education
* Childcare
* Child benefits
* Healthcare
* Housing
* Family integration in Marburg`,
    items: [
      {
        question: `Can I bring my family to Germany?`,
        answer: `Yes, in many cases family members can join you in Germany through family reunification (Familiennachzug).
The possibility depends on:

* Your residence status
* Your financial situation
* Available housing
* Health insurance coverage
* Relationship documents

Different rules apply depending on whether you are:

* A German citizen
* An EU citizen
* A skilled worker
* A student
* A refugee`,
      },
      {
        question: `Who can join me through family reunification?`,
        answer: `Usually, family reunification applies to:

* Spouse (husband/wife)
* Minor unmarried children

In some special cases, other family members may qualify.
Each case is evaluated individually by German authorities.`,
      },
      {
        question: `What documents are needed for family reunification?`,
        answer: `Common documents include:

* Valid passports
* Marriage certificate
* Birth certificates of children
* Proof of residence in Germany
* Proof of income
* Rental contract
* Health insurance proof
* Residence permit of the person living in Germany

Foreign documents may require:

* Translation into German
* Legalisation or apostille`,
      },
      {
        question: `Does my spouse need German language skills before coming to Germany?`,
        answer: `In many cases, spouses from non-EU countries need basic German knowledge before entering Germany.
Usually, an A1 German certificate is required.
However, there are exceptions depending on:

* Type of residence permit
* Professional qualification
* Personal circumstances

Always check the latest rules with the German embassy or immigration authority.`,
      },
      {
        question: `Can my spouse work after coming to Germany?`,
        answer: `In many cases, yes.
The residence permit issued after family reunification often allows employment.
The exact permission is written on the residence document.
Look for wording such as:
"Erwerbstätigkeit gestattet"
which means employment is allowed.`,
      },
      {
        question: `Can my children study in Germany?`,
        answer: `Yes.
Education is available for children living in Germany.
School attendance is compulsory in Germany.
Children usually attend:

* Kindergarten (before school)
* Grundschule (primary school)
* Secondary schools

The education system differs slightly between German states.`,
      },
      {
        question: `Is education free for children in Germany?`,
        answer: `Public schools in Germany are generally free.
Families usually do not pay tuition fees.
However, costs may include:

* School materials
* Trips
* Meals
* Transportation (depending on location)`,
      },
      {
        question: `How does the German school system work?`,
        answer: `The general structure:
Kindergarten
Age:
Approximately 3–6 years
Grundschule
Primary school:
Usually grades 1–4
Secondary education:
Different school types prepare students for:

* Vocational training
* University studies
* Professional careers

Teachers and schools advise families about suitable pathways.`,
      },
      {
        question: `Can children who do not speak German attend school?`,
        answer: `Yes.
Germany supports children who are learning German.
Many schools offer:

* German support classes
* Language preparation programmes
* Integration support

Children usually learn German quickly through daily interaction.`,
      },
      {
        question: `What is Kindergarten?`,
        answer: `Kindergarten is early childhood education before primary school.
It helps children develop:

* Language skills
* Social skills
* Independence
* Creativity

Places are organised by:

* Municipalities
* Churches
* Private organisations`,
      },
      {
        question: `How can I find childcare in Marburg?`,
        answer: `Families can search for:

* Kindergarten places
* Daycare centres (Kita)
* Childminders (Tagespflege)

Applications are usually handled through local authorities or childcare providers.
Demand for childcare places can be high, so early application is recommended.`,
      },
      {
        question: `What is Kindergeld?`,
        answer: `Kindergeld is a monthly child benefit provided by the German government.
It supports families with children.
Eligibility depends on:

* Residence status
* Child's living situation
* Legal requirements

Applications are usually made through the Familienkasse.`,
      },
      {
        question: `Who can receive Kindergeld?`,
        answer: `Many families living legally in Germany can receive Kindergeld if they meet the requirements.
This can include:

* German citizens
* EU citizens
* Some non-EU residents

The rules depend on residence status.`,
      },
      {
        question: `What is Elterngeld?`,
        answer: `Elterngeld is financial support for parents after the birth of a child.
It allows parents to reduce working hours while caring for their baby.
It supports:

* Mothers
* Fathers
* Adoptive parents in certain situations`,
      },
      {
        question: `Do families need health insurance in Germany?`,
        answer: `Yes.
Everyone living in Germany must have health insurance.
Children are often covered through family insurance under public health insurance systems if requirements are met.`,
      },
      {
        question: `How can I find a family doctor (Hausarzt)?`,
        answer: `Families should register with a local general practitioner.
A Hausarzt helps with:

* General health problems
* Medical certificates
* Referrals to specialists

For children, families should also find a:
Kinderarzt (paediatrician)`,
      },
      {
        question: `Are vaccinations required for children?`,
        answer: `Germany recommends several vaccinations for children.
Some vaccinations are required for specific situations, such as proof of measles protection for children attending childcare facilities.
Parents should discuss vaccination schedules with their child's doctor.`,
      },
      {
        question: `How can Pakistani families adapt to life in Germany?`,
        answer: `Helpful steps:

* Learn German as a family
* Participate in local activities
* Attend school events
* Respect German laws and customs
* Maintain cultural traditions
* Build relationships with neighbours

Integration works best when families participate actively in society.`,
      },
      {
        question: `Where can Pakistani families meet other families in Marburg?`,
        answer: `Families can connect through:

* Pakistanis in Marburg community events
* Cultural programmes
* Sports activities
* University and city events
* Religious and social organisations

Community connections help families feel welcomed and supported.`,
      },
      {
        question: `How can Pakistani parents support their children's future in Germany?`,
        answer: `Parents can support children by:

* Encouraging German language learning
* Supporting education
* Communicating with teachers
* Encouraging hobbies and activities
* Maintaining cultural identity
* Helping children build confidence in both cultures`,
      },
      {
        question: `Can parents bring elderly family members to Germany?`,
        answer: `Bringing parents or elderly relatives is generally more difficult than bringing spouses or children.
It depends on:

* Legal category
* Exceptional circumstances
* Financial ability
* Current immigration rules

Professional advice may be needed.`,
      },
      {
        question: `Can my family receive social benefits in Germany?`,
        answer: `Eligibility depends on:

* Residence status
* Income
* Employment situation
* Individual circumstances

Some residence permits have restrictions regarding access to certain benefits.`,
      },
      {
        question: `What support is available for families with integration?`,
        answer: `Families can access:

* Integration courses
* Language schools
* Family counselling
* School support
* Migration advice centres`,
      },
      {
        question: `What should new Pakistani families do after arriving in Marburg?`,
        answer: `Recommended first steps:

1. Complete Anmeldung.
2. Register children for school/Kita.
3. Arrange health insurance.
4. Find a family doctor.
5. Learn about local services.
6. Connect with community networks.`,
      },
      {
        question: `How can families contribute to Pakistanis in Marburg?`,
        answer: `Families can strengthen the community by:

* Participating in events
* Sharing experiences
* Helping newcomers
* Organising cultural activities
* Supporting students and young professionals

A strong family network creates a welcoming environment for everyone.`,
      },
    ],
    sources: [
      `Federal Office for Migration and Refugees (BAMF)`,
      `Make it in Germany`,
      `Familienkasse`,
      `City of Marburg services`,
      `German education authorities`,
    ],
  },
  {
    id: "refugees-asylum-seekers-in-germany",
    title: `Refugees & Asylum Seekers in Germany (Protection, Rights & Integration Guide)`,
    intro: `This section is designed for Pakistani refugees and asylum seekers living in Germany or planning to seek protection.
It explains:

* Asylum procedure
* Rights and responsibilities
* Accommodation
* Healthcare
* Work opportunities
* Language learning
* Education
* Family reunification
* Integration support

Important: Refugee and asylum cases are individual. The final decision depends on German authorities and each person's personal situation.`,
    items: [
      {
        question: `What is asylum in Germany?`,
        answer: `Asylum is a form of protection provided by Germany to people who cannot safely return to their home country due to serious risks.
Germany examines asylum applications according to national and international laws.
The asylum process is handled by:
BAMF (Bundesamt für Migration und Flüchtlinge)
Federal Office for Migration and Refugees.`,
      },
      {
        question: `Who can apply for asylum in Germany?`,
        answer: `People may apply for asylum if they believe they face serious danger or persecution in their home country.
Reasons may include:

* Political persecution
* Religious persecution
* Threats to personal safety
* Serious human rights violations

Each application is reviewed individually.`,
      },
      {
        question: `How can someone apply for asylum in Germany?`,
        answer: `A person must register with German authorities after arrival.
The process generally includes:

1. Registration
2. Distribution to a responsible authority/location
3. Personal asylum application at BAMF
4. Interview about personal circumstances
5. Decision by BAMF

Applicants should provide truthful information and available documents.`,
      },
      {
        question: `What happens after applying for asylum?`,
        answer: `After submitting an application:

* The applicant receives documents confirming their status.
* BAMF examines the case.
* The applicant may be assigned accommodation.
* They may receive support according to their legal status.

The waiting time depends on:

* Individual case complexity
* Number of applications
* Available resources`,
      },
      {
        question: `What is an Aufenthaltsgestattung?`,
        answer: `An Aufenthaltsgestattung is a document given to asylum seekers while their asylum procedure is ongoing.
It confirms that they are allowed to remain in Germany during the asylum process.
The document contains important information about:

* Identity
* Residence area
* Possible work restrictions`,
      },
      {
        question: `Where do asylum seekers live in Germany?`,
        answer: `Accommodation depends on the stage of the asylum process.
Possible accommodation includes:

* Initial reception centres (Erstaufnahmeeinrichtung)
* Collective accommodation
* Municipal housing

Authorities organise accommodation according to availability.`,
      },
      {
        question: `Do asylum seekers receive financial support?`,
        answer: `Depending on their legal status, asylum seekers may receive support under German law.
Support can include:

* Basic living assistance
* Accommodation
* Healthcare support

The amount and type of support depend on individual circumstances.`,
      },
      {
        question: `Can asylum seekers work in Germany?`,
        answer: `Work permission depends on:

* Current asylum status
* Length of stay
* Individual restrictions

Some asylum seekers may be allowed to work after receiving permission from authorities.
Before starting work, always check:

* Residence document
* Ausländerbehörde requirements`,
      },
      {
        question: `Can recognised refugees work in Germany?`,
        answer: `Yes.
Recognised refugees generally have access to the German labour market.
They can:

* Work as employees
* Start vocational training
* Study
* Build professional careers`,
      },
      {
        question: `Can asylum seekers study in Germany?`,
        answer: `Yes, in many cases asylum seekers can study if they meet university requirements.
They may need:

* Recognised educational qualifications
* Language certificates
* Admission from a university

Financial and residence conditions may vary.`,
      },
      {
        question: `Can refugees learn German for free?`,
        answer: `Many refugees and eligible migrants can participate in:

* Integration courses
* German language programmes
* Vocational language courses

Eligibility depends on residence status.
German language skills are one of the most important factors for successful integration.`,
      },
      {
        question: `What is an integration course (Integrationskurs)?`,
        answer: `An integration course usually combines:
German language lessons
and
Orientation course
The orientation course teaches:

* German laws
* Culture
* History
* Rights and responsibilities`,
      },
      {
        question: `Can refugees receive healthcare in Germany?`,
        answer: `Yes.
Access to healthcare depends on the person's legal status.
Healthcare support may include:

* Doctor visits
* Emergency treatment
* Necessary medical care

The exact coverage depends on the applicable regulations.`,
      },
      {
        question: `What should I do if I become sick as an asylum seeker?`,
        answer: `If you need medical help:

* Contact your responsible authority.
* Ask about healthcare access.
* In emergencies call:

112 — Emergency medical service
For non-emergency medical advice:
116117`,
      },
      {
        question: `Can refugee children attend school in Germany?`,
        answer: `Yes.
Children living in Germany generally have access to education.
Schools support children through:

* German language learning
* Integration classes
* Regular education programmes

Education rules differ slightly between German federal states.`,
      },
      {
        question: `Can refugees bring their family members to Germany?`,
        answer: `Family reunification may be possible depending on:

* Type of protection received
* Residence status
* Family relationship
* Legal requirements

Recognised refugees generally have stronger family reunification rights than asylum seekers whose applications are still pending.`,
      },
      {
        question: `What is subsidiary protection?`,
        answer: `Subsidiary protection is a protection status granted when a person does not qualify for asylum or refugee status but cannot safely return to their country.
It provides a legal residence status with certain rights.`,
      },
      {
        question: `What happens if an asylum application is rejected?`,
        answer: `If an application is rejected:

* The person receives an official decision.
* They may have legal options, including appeal within certain deadlines.
* They may need to leave Germany if no other residence option exists.

Legal advice is strongly recommended.`,
      },
      {
        question: `Where can refugees get free advice?`,
        answer: `Support is available from:

* Migration counselling services
* Refugee support organisations
* Welfare organisations
* Legal advice centres
* Local authorities

In Marburg, refugees can contact local migration support organisations for guidance.`,
      },
      {
        question: `What responsibilities do refugees and asylum seekers have?`,
        answer: `Important responsibilities include:

* Providing truthful information
* Following German laws
* Attending official appointments
* Informing authorities about address changes
* Cooperating with the asylum procedure
* Respecting accommodation rules`,
      },
      {
        question: `Can refugees work in skilled professions?`,
        answer: `Yes.
Recognised refugees can work in qualified professions if they have:

* Required qualifications
* Recognition where needed
* Necessary language skills

They can also participate in:

* Vocational training (Ausbildung)
* Further education
* Professional courses`,
      },
      {
        question: `What is Ausbildung?`,
        answer: `Ausbildung is vocational training combining:

* Practical workplace training
* Professional school education

It is a popular pathway into German employment.
Examples:

* Nursing
* Technical professions
* Hospitality
* Skilled trades
* Office professions`,
      },
      {
        question: `Can refugees become permanent residents in Germany?`,
        answer: `Yes, under certain conditions.
Requirements may include:

* Length of residence
* Financial independence
* German language skills
* Integration achievements
* Legal requirements`,
      },
      {
        question: `How can refugees integrate successfully in Germany?`,
        answer: `Important steps:

* Learn German
* Attend integration programmes
* Understand German systems
* Find education or employment
* Build social connections
* Participate in community activities`,
      },
      {
        question: `How can Pakistanis in Marburg support refugees?`,
        answer: `The Pakistani community can help through:

* Translation assistance
* Orientation for newcomers
* Sharing information
* Language practice groups
* Community events
* Social support

However, legal decisions must always come from official authorities.`,
      },
    ],
    sources: [
      `BAMF (Federal Office for Migration and Refugees)`,
      `Make it in Germany`,
      `German Federal Government migration information`,
      `Local migration counselling services`,
    ],
  },
  {
    id: "housing-accommodation-in-germany",
    title: `Housing & Accommodation in Germany (Finding a Home Guide)`,
    intro: `Finding accommodation is one of the biggest challenges for international students, professionals and families arriving in Germany. This section explains the German rental system, important documents, tenant rights and practical advice for Pakistanis living in Marburg.
Topics covered:

* Finding apartments
* Student accommodation
* Shared apartments (WG)
* Rental contracts
* Deposits
* Utilities
* Landlord requirements
* Tenant rights
* Avoiding scams
* Moving checklist`,
    items: [
      {
        question: `How can I find accommodation in Germany?`,
        answer: `There are several ways to find accommodation:
Online platforms:

* Immobilien websites
* Student housing portals
* Local housing groups
* University notice boards

Other options:

* Studentenwerk housing
* Shared apartments (WG)
* Private landlords
* Community networks

In Marburg, students should also check accommodation options through Philipps-Universität Marburg and local student services.`,
      },
      {
        question: `What types of accommodation are available in Germany?`,
        answer: `Common accommodation options include:
Studentenwohnheim (Student Residence)
Affordable housing mainly for students.
Advantages:

* Lower cost
* Close to university
* Easy social connections

WG (Wohngemeinschaft)
A shared apartment where several people live together.
Usually:

* Private bedroom
* Shared kitchen
* Shared bathroom

WG is very popular among students and young professionals.
Private Apartment
You rent your own apartment.
Advantages:

* More privacy
* Suitable for families

Disadvantages:

* Higher costs
* More requirements`,
      },
      {
        question: `What is a WG?`,
        answer: `WG means Wohngemeinschaft (shared living).
In a WG:

* Each person usually has their own room.
* Kitchen and bathroom are shared.
* Rent and utilities are divided.

WG is a good option for newcomers because it helps:

* Reduce living costs
* Meet people
* Practice German`,
      },
      {
        question: `What is the difference between warm rent and cold rent?`,
        answer: `German rental advertisements often mention:
Kaltmiete (Cold Rent)
The basic rent only.
It does not include additional costs.
Warmmiete (Warm Rent)
The total monthly cost including many additional expenses.
Usually includes:

* Heating
* Water
* Building costs

However, electricity and internet may sometimes be separate.
Always ask the landlord what is included.`,
      },
      {
        question: `What are Nebenkosten?`,
        answer: `Nebenkosten are additional housing costs.
They may include:

* Heating
* Water
* Building maintenance
* Waste collection
* Cleaning of common areas
* Property management

Tenants usually pay these monthly together with rent.`,
      },
      {
        question: `What is Kaution (rental deposit)?`,
        answer: `Kaution is a security deposit paid to the landlord.
It protects the landlord against:

* Unpaid rent
* Damage to the apartment

The legal maximum is usually up to three months of cold rent (Kaltmiete).
The deposit must be returned after moving out if there are no valid claims.`,
      },
      {
        question: `What documents do landlords usually ask for?`,
        answer: `Common documents include:

* Passport/ID
* Residence permit
* Proof of income
* Employment contract
* University enrollment certificate
* SCHUFA report
* Previous rental references (if available)

Students without income may need:

* Guarantor (Bürgschaft)
* Blocked account proof
* Parent guarantee`,
      },
      {
        question: `What is SCHUFA?`,
        answer: `SCHUFA is a German credit information system.
It provides information about your payment history.
Landlords often request SCHUFA to check financial reliability.
New arrivals may not have SCHUFA because they have no previous credit history in Germany.`,
      },
      {
        question: `How can international students find housing in Marburg?`,
        answer: `Students can search through:

* Studentenwerk Marburg
* University housing services
* WG platforms
* Student groups
* Community networks

Start searching early because demand is high, especially before semester start.`,
      },
      {
        question: `What should I check before signing a rental contract?`,
        answer: `Before signing:
Check:

* Monthly rent
* Included costs
* Deposit amount
* Contract duration
* Notice period
* Furniture condition
* Existing damage

Never sign a contract you do not understand.
Ask for clarification if necessary.`,
      },
      {
        question: `What is a Mietvertrag?`,
        answer: `Mietvertrag is the official rental contract between tenant and landlord.
It contains:

* Address
* Rent amount
* Additional costs
* Deposit
* Rules
* Rights and responsibilities

Always keep a copy.`,
      },
      {
        question: `Can landlords refuse foreign tenants?`,
        answer: `Landlords can choose tenants based on legal and practical considerations.
However, discrimination based on nationality, ethnicity, religion or other protected characteristics is prohibited under German law.`,
      },
      {
        question: `What should I do when moving into an apartment?`,
        answer: `On moving day:

1. Complete apartment inspection.
2. Record existing damage.
3. Take photos/videos.
4. Receive keys.
5. Record meter readings.
6. Complete Anmeldung.

A handover document (Übergabeprotokoll) is recommended.`,
      },
      {
        question: `What is Anmeldung after moving?`,
        answer: `After moving into a new apartment, you must register your new address with the local authorities.
You need:

* Passport
* Registration form
* Landlord confirmation (Wohnungsgeberbestätigung)

This is legally required.`,
      },
      {
        question: `How much does accommodation cost in Marburg?`,
        answer: `Housing costs depend on:

* Location
* Size
* Condition
* Distance from university
* Type of accommodation

Students often choose:

* WG rooms
* Student residences

Families usually require larger apartments with higher rent.`,
      },
      {
        question: `How can I avoid rental scams?`,
        answer: `Be careful if:
❌ Rent is extremely cheap
❌ Landlord refuses a viewing
❌ You are asked to transfer money before seeing the contract
❌ Someone claims to be abroad and cannot meet
❌ You are pressured to decide immediately
Safe practices:
✅ Visit the apartment if possible
✅ Verify landlord identity
✅ Sign a proper contract
✅ Do not pay deposits before legal agreement`,
      },
      {
        question: `Can I sublet a room in Germany?`,
        answer: `Yes, but usually you need permission from the landlord.
Subletting without permission can create legal problems.`,
      },
      {
        question: `Can I have guests in my apartment?`,
        answer: `Yes.
Normal visits from friends and family are allowed.
However, permanently allowing another person to live in the apartment usually requires landlord approval.`,
      },
      {
        question: `What are tenant rights in Germany?`,
        answer: `Tenants have strong legal protections.
Rights include:

* Protection against unfair eviction
* Proper notice periods
* Privacy
* Safe living conditions
* Return of deposit under correct conditions`,
      },
      {
        question: `What are tenant responsibilities?`,
        answer: `Tenants should:

* Pay rent on time
* Keep the apartment clean
* Follow house rules
* Avoid unnecessary damage
* Separate waste correctly
* Report problems quickly`,
      },
      {
        question: `Can the landlord enter my apartment anytime?`,
        answer: `No.
A landlord cannot enter without permission except in exceptional legal situations.
Tenants have a right to privacy.`,
      },
      {
        question: `What is Hausordnung?`,
        answer: `Hausordnung means house rules.
It may include:

* Quiet hours
* Cleaning responsibilities
* Waste disposal rules
* Use of shared spaces

Residents should follow these rules.`,
      },
      {
        question: `How does waste separation work in Germany?`,
        answer: `Germany separates waste into different categories:

* Paper
* Plastic packaging
* Organic waste
* General waste
* Glass

Correct recycling is an important part of daily life.`,
      },
      {
        question: `What happens when I move out?`,
        answer: `Before leaving:

* Give notice according to contract.
* Clean the apartment.
* Repair agreed damages.
* Return keys.
* Complete final inspection.

The landlord checks the apartment before returning the deposit.`,
      },
      {
        question: `What should newcomers know about housing culture in Germany?`,
        answer: `Important points:

* Appointments are important.
* Neighbours value quiet hours.
* Recycling rules are taken seriously.
* Contracts are important.
* Communication with landlords should be respectful and written.`,
      },
    ],
    sources: [
      `City of Marburg Housing Services`,
      `Studentenwerk`,
      `German Tenant Associations`,
      `Make it in Germany`,
      `Consumer Advice Centres (Verbraucherzentrale)`,
    ],
  },
  {
    id: "healthcare-system-in-germany",
    title: `Healthcare System in Germany (Health & Medical Guide)`,
    intro: `Germany has one of the most comprehensive healthcare systems in the world. Health insurance is mandatory for everyone living in Germany, including international students, workers, families and many refugees.
This section explains:

* Health insurance
* Finding doctors
* Emergency services
* Hospitals in Marburg
* Medicines
* Dental care
* Mental health support
* Healthcare for families and students`,
    items: [
      {
        question: `Is health insurance mandatory in Germany?`,
        answer: `Yes.
Everyone living in Germany must have valid health insurance.
You usually cannot:

* Enrol at a university
* Obtain a residence permit
* Work legally

without appropriate health insurance coverage.`,
      },
      {
        question: `What types of health insurance exist in Germany?`,
        answer: `Germany has two main types:
Public Health Insurance (Gesetzliche Krankenversicherung - GKV)
Most residents use public insurance.
Examples:

* TK (Techniker Krankenkasse)
* AOK
* Barmer
* DAK

Benefits are regulated by law.
Private Health Insurance (Private Krankenversicherung - PKV)
Available for certain groups, such as:

* Some high-income employees
* Self-employed persons
* Certain students

Private insurance works differently and should be considered carefully.`,
      },
      {
        question: `Which health insurance is suitable for international students?`,
        answer: `Most international students choose public student health insurance.
Common providers include:

* TK
* AOK
* Barmer

The correct option depends on:

* Age
* University status
* Previous insurance situation
* Residence permit requirements`,
      },
      {
        question: `How do I get health insurance after arriving in Germany?`,
        answer: `You can apply directly with a health insurance company.
You usually need:

* Passport
* Residence documents
* University admission/enrolment proof
* Personal information

After registration, you receive a health insurance card (Gesundheitskarte).`,
      },
      {
        question: `What is the health insurance card (Gesundheitskarte)?`,
        answer: `The Gesundheitskarte is your medical insurance card.
You show it when visiting:

* Doctors
* Hospitals
* Medical facilities

It contains your insurance information electronically.`,
      },
      {
        question: `Do I have to pay every time I visit a doctor?`,
        answer: `For people with public health insurance, many standard medical services are directly covered by insurance.
However, some optional services may require additional payment.
Always ask before receiving private services.`,
      },
      {
        question: `How do I find a doctor in Germany?`,
        answer: `You can search for doctors through:

* Health insurance websites
* Doctor search portals
* Recommendations from friends/community
* University services

Important terms:
Hausarzt → General doctor/family doctor
Facharzt → Specialist doctor`,
      },
      {
        question: `What is a Hausarzt?`,
        answer: `A Hausarzt is usually your first contact for medical problems.
They provide:

* General medical treatment
* Health advice
* Referrals to specialists
* Medical certificates

It is recommended to have a regular Hausarzt.`,
      },
      {
        question: `How do I make a doctor appointment?`,
        answer: `Appointments can be made through:

* Phone calls
* Online booking systems
* Doctor websites

In Germany, it is common to make appointments in advance.
For urgent problems, inform the practice that it is urgent.`,
      },
      {
        question: `What should I do in a medical emergency?`,
        answer: `For life-threatening emergencies:
Call:
112
Use 112 for:

* Serious accidents
* Breathing problems
* Severe injuries
* Life-threatening situations`,
      },
      {
        question: `What is 116117?`,
        answer: `116117 is the medical on-call service for situations that are urgent but not life-threatening.
Examples:

* Doctor needed outside normal hours
* Medical advice
* Finding an available doctor`,
      },
      {
        question: `Which hospitals are available in Marburg?`,
        answer: `Marburg has major medical facilities, including:

* University hospital services
* Emergency departments
* Specialist clinics

The main hospital provider in the city is:
Universitätsklinikum Gießen und Marburg (UKGM) – Standort Marburg
It provides specialist medical care, emergency treatment and university medical services.`,
      },
      {
        question: `How does emergency treatment work?`,
        answer: `In emergencies:

1. Call 112 if the situation is serious.
2. Visit the emergency department if necessary.
3. Show your health insurance card if available.

Emergency treatment is provided when medically necessary.`,
      },
      {
        question: `How do I get medicine in Germany?`,
        answer: `Medicines are obtained from pharmacies (Apotheke).
There are two main categories:
Prescription medicines (Rezeptpflichtig)
Need a doctor's prescription.
Over-the-counter medicines
Can be purchased directly from pharmacies.`,
      },
      {
        question: `What are pharmacy opening hours?`,
        answer: `Most pharmacies operate during normal business hours.
Outside opening hours, Germany has emergency pharmacies:
Notdienst-Apotheke
Information is usually displayed at local pharmacies or available online.`,
      },
      {
        question: `Are medicines free in Germany?`,
        answer: `Not always.
Public insurance usually covers many medically necessary medicines.
However, patients may have legally required co-payments depending on the medicine and situation.`,
      },
      {
        question: `How does dental treatment work?`,
        answer: `Dental care (Zahnarzt) is part of the German healthcare system.
Public insurance covers many basic dental treatments.
Additional treatments may require:

* Personal payment
* Additional dental insurance`,
      },
      {
        question: `What healthcare services are available for women?`,
        answer: `Women can access:

* General medical care
* Gynaecologists (Frauenarzt)
* Pregnancy care
* Preventive examinations

Pregnancy and maternity care are strongly supported within the German healthcare system.`,
      },
      {
        question: `What healthcare services are available for children?`,
        answer: `Children can access:

* Paediatricians (Kinderarzt)
* Vaccinations
* Preventive check-ups
* Emergency care

Families should register with a local paediatrician after arrival.`,
      },
      {
        question: `How does pregnancy care work in Germany?`,
        answer: `Pregnant women receive medical support through:

* Gynaecologists
* Midwives (Hebamme)
* Hospitals

Regular check-ups are covered according to healthcare rules.`,
      },
      {
        question: `Is mental health support available in Germany?`,
        answer: `Yes.
Mental health support includes:

* Psychologists
* Psychotherapists
* Counselling services
* Crisis support

Finding an appointment may take time, so early contact is recommended.`,
      },
      {
        question: `Can international students access mental health support?`,
        answer: `Yes.
Students can contact:

* University counselling services
* Student support organisations
* Health insurance providers

Many universities offer confidential counselling.`,
      },
      {
        question: `What if I do not speak German during a medical visit?`,
        answer: `Many doctors speak English, especially in university cities.
Helpful options:

* Ask if English is available
* Bring a German-speaking friend
* Use professional translation support when necessary

For important medical decisions, accurate communication is important.`,
      },
      {
        question: `What vaccinations are recommended in Germany?`,
        answer: `Germany recommends vaccinations according to age and health situation.
Doctors advise patients based on:

* Medical history
* Age
* Risk factors
* Travel situation`,
      },
      {
        question: `What should Pakistani newcomers do for healthcare after arriving?`,
        answer: `Recommended steps:

1. Get health insurance.
2. Receive your insurance card.
3. Find a Hausarzt.
4. Learn emergency numbers.
5. Keep medical documents safely.
6. Understand how pharmacies and appointments work.`,
      },
      {
        question: `Can refugees access healthcare?`,
        answer: `Yes.
Healthcare access depends on the person's legal status and applicable regulations.
Refugees and asylum seekers receive healthcare support according to German law.`,
      },
      {
        question: `Can international visitors use German healthcare?`,
        answer: `Visitors need appropriate travel insurance or healthcare coverage.
Without insurance, medical costs can become very expensive.`,
      },
      {
        question: `How can Pakistanis in Marburg support newcomers with healthcare?`,
        answer: `The community can help by:

* Explaining how the system works
* Sharing doctor recommendations
* Helping with German medical vocabulary
* Supporting elderly family members
* Guiding newcomers to official services

Important Emergency Numbers
🚑 112
Medical emergencies & fire
👮 110
Police
🩺 116117
Non-emergency medical service`,
      },
    ],
    sources: [
      `German Federal Ministry of Health`,
      `Health insurance providers`,
      `BAMF integration information`,
      `Marburg healthcare services`,
    ],
  },
  {
    id: "banking-taxes-financial-life-in-germany",
    title: `Banking, Taxes & Financial Life in Germany (Money Management Guide)`,
    intro: `Understanding banking, taxes and financial systems is essential for students, professionals, families and newcomers in Germany.
This section explains:
Opening bank accounts
Salary payments
Tax identification
Income tax
Student jobs
Mini-jobs
Social insurance
Sending money abroad
Financial planning`,
    items: [
      {
        question: `Do I need a German bank account?`,
        answer: `A German bank account is highly recommended for daily life.
You usually need it for:
Receiving salary
Paying rent
Paying health insurance
Electricity and internet bills
Mobile phone contracts
University payments
Most employers in Germany pay salaries directly into a bank account.`,
      },
      {
        question: `How can I open a bank account in Germany?`,
        answer: `To open a bank account, you usually need:
Passport
Residence permit or visa
Anmeldung certificate
Tax ID (sometimes required)
Some banks allow online account opening with identity verification.`,
      },
      {
        question: `Which banks are commonly used in Germany?`,
        answer: `Popular options include:
Traditional banks:
Sparkasse
Volksbank/Raiffeisenbank
Deutsche Bank
Commerzbank
Online banks:
N26
ING
DKB
Other digital banking providers
Choose based on:
Monthly fees
Online services
Customer support
ATM availability`,
      },
      {
        question: `What is IBAN?`,
        answer: `IBAN means International Bank Account Number.
It identifies your bank account for payments.
You use IBAN for:
Receiving salary
Paying rent
Bank transfers
Direct debits
German IBAN numbers usually start with:
DE`,
      },
      {
        question: `What is a direct debit (Lastschrift)?`,
        answer: `Lastschrift allows companies to automatically collect payments from your bank account.
Common examples:
Health insurance payments
Phone contracts
Electricity bills
Subscriptions
Always check agreements before allowing direct debit.`,
      },
      {
        question: `What is a Tax ID (Steuer-ID)?`,
        answer: `The Steuer-ID is your personal tax identification number.
It is:
Unique
Permanent
Issued by the German government
You need it for:
Employment
Salary processing
Tax matters
You usually receive it automatically after Anmeldung.`,
      },
      {
        question: `What is the difference between Steuer-ID and Steuernummer?`,
        answer: `Steuer-ID
Used mainly by individuals.
Examples:
Employees
Students with jobs
Steuernummer
Used mainly for:
Businesses
Self-employed persons
Tax office communication
A person running a business may need both.`,
      },
      {
        question: `Do employees pay taxes in Germany?`,
        answer: `Yes.
Employees usually pay:
Income tax (Einkommensteuer)
Solidarity surcharge (where applicable)
Social insurance contributions
The amount depends on:
Salary
Tax class
Personal circumstances`,
      },
      {
        question: `What are social insurance contributions?`,
        answer: `Germany has a social security system.
Contributions usually include:
Health insurance
(Krankenversicherung)
Pension insurance
(Rentenversicherung)
Unemployment insurance
(Arbeitslosenversicherung)
Nursing care insurance
(Pflegeversicherung)
These are normally deducted automatically from salary.`,
      },
      {
        question: `What is gross salary and net salary?`,
        answer: `Gross salary (Brutto)
The amount before deductions.
Net salary (Netto)
The amount you receive after:
Taxes
Social insurance deductions
Your employment contract usually shows the gross salary.`,
      },
      {
        question: `What is a tax class (Steuerklasse)?`,
        answer: `Tax class determines how much income tax is deducted from your salary.
Factors include:
Marriage status
Family situation
Multiple jobs
Examples:
Single employees often belong to Steuerklasse I.
Married couples may have different combinations.`,
      },
      {
        question: `Do international students pay taxes in Germany?`,
        answer: `It depends on income.
Students may have to pay taxes if their earnings exceed certain limits.
Many student jobs result in little or no income tax because earnings remain below tax-free allowances.
However, social insurance rules can differ.`,
      },
      {
        question: `What is a Minijob?`,
        answer: `A Minijob is a type of employment with special income rules.
It is popular among:
Students
Part-time workers
People looking for flexible work
Minijob regulations can change, so employees should check current limits.`,
      },
      {
        question: `What is a Werkstudent job?`,
        answer: `A Werkstudent job is a student employment position related or unrelated to studies.
Benefits:
Professional experience
Higher income potential
Career networking
Students must still follow working-time and residence regulations.`,
      },
      {
        question: `Do students need to inform their university about work?`,
        answer: `Requirements depend on the university.
Students should check:
University regulations
Residence permit conditions
Study workload
Working should not prevent successful completion of studies.`,
      },
      {
        question: `What is a payslip (Gehaltsabrechnung)?`,
        answer: `A payslip explains your monthly salary.
It usually includes:
Gross salary
Taxes
Social contributions
Net salary
Employer details
Keep payslips safely because they are important documents.`,
      },
      {
        question: `What is an income tax return (Steuererklärung)?`,
        answer: `A tax return allows you to report your yearly income and expenses to the tax office.
Some people receive a refund if too much tax was deducted.
You can submit a tax return:
Online
Through tax software
With professional help`,
      },
      {
        question: `Can students get money back through a tax return?`,
        answer: `Sometimes yes.
Students may be able to claim certain expenses depending on their situation.
Examples may include:
Work-related expenses
Study-related costs
Professional expenses
Eligibility depends on individual circumstances.`,
      },
      {
        question: `How can I send money from Germany to Pakistan?`,
        answer: `Common methods include:
Bank transfers
International money transfer services
Online transfer providers
Before choosing a service, compare:
Exchange rates
Fees
Transfer speed
Security`,
      },
      {
        question: `Can I receive money from Pakistan?`,
        answer: `Yes.
International transfers can be sent to your German bank account.
The sender usually needs:
Your name
IBAN
Bank details
SWIFT/BIC code`,
      },
      {
        question: `What is SCHUFA and why is it important?`,
        answer: `SCHUFA is a credit information system.
It records information related to financial reliability.
It may be checked for:
Apartment rentals
Loans
Some contracts
Paying bills on time helps maintain good credit history.`,
      },
      {
        question: `How can newcomers build good financial habits?`,
        answer: `Recommended practices:
✅ Create a monthly budget
✅ Pay bills on time
✅ Keep emergency savings
✅ Understand contracts before signing
✅ Avoid unnecessary debt
✅ Keep financial documents organised`,
      },
      {
        question: `What financial documents should I keep?`,
        answer: `Important documents include:
Bank statements
Salary slips
Tax documents
Insurance documents
Rental contracts
Employment contracts
Receipts
Keep digital copies as well.`,
      },
      {
        question: `Can foreigners get loans in Germany?`,
        answer: `Yes, but approval depends on:
Income
Employment stability
Credit history
Residence status
Banks evaluate each application individually.`,
      },
      {
        question: `What should entrepreneurs know about taxes?`,
        answer: `Business owners may need:
Tax registration
Business accounting
VAT registration (depending on activity)
Regular tax reporting
Professional tax advice is recommended for businesses.`,
      },
      {
        question: `What is VAT (Mehrwertsteuer)?`,
        answer: `VAT is a consumption tax included in many products and services.
Common rates:
Standard VAT
Reduced VAT for certain goods
Businesses collect VAT and transfer it to the tax authorities when required.`,
      },
      {
        question: `How does financial life differ for students and professionals?`,
        answer: `Students:
Usually focus on:
Affordable banking
Part-time work
Managing living expenses
Professionals:
Usually focus on:
Salary optimisation
Taxes
Insurance
Savings
Investments`,
      },
      {
        question: `How can Pakistanis in Marburg support newcomers financially?`,
        answer: `The community can help by sharing:
Information about banking
Job opportunities
Tax basics
Budgeting tips
Trusted services
Community advice should complement, not replace, professional financial advice.`,
      },
    ],
    glossary: {
      title: `Important Financial Terms`,
      headers: [`German`, `English`],
      rows: [
        [`Konto`, `Bank account`],
        [`IBAN`, `International bank account number`],
        [`Steuer-ID`, `Tax identification number`],
        [`Gehalt`, `Salary`],
        [`Brutto`, `Gross income`],
        [`Netto`, `Net income`],
        [`Steuererklärung`, `Tax return`],
        [`Versicherung`, `Insurance`],
        [`Rechnung`, `Invoice`],
        [`Vertrag`, `Contract`],
      ],
    },
    sources: [
      `German Federal Ministry of Finance`,
      `Finanzamt (Tax Offices)`,
      `Bundesagentur für Arbeit`,
      `Make it in Germany`,
      `Consumer Advice Centres (Verbraucherzentrale)`,
    ],
  },
  {
    id: "driving-licence-cars-transport-in-germany",
    title: `Driving Licence, Cars & Transport in Germany (Mobility Guide)`,
    intro: `Germany has a highly developed transport system. Understanding driving rules, licence requirements and public transport options helps students, professionals and families move around safely and independently.
This section explains:
Pakistani driving licence conversion
German driving licence process
Driving schools
Buying and owning a car
Car insurance
Public transport
Deutschlandticket
Traffic rules
Fines and penalties
Transport in Marburg`,
    items: [
      {
        question: `Can I drive in Germany with a Pakistani driving licence?`,
        answer: `Yes, but the rules depend on:
How long you have been living in Germany
Your licence category
German regulations for your country of origin
A foreign driving licence is generally valid for a limited period after establishing residence in Germany.
After that period, you may need to convert it into a German driving licence.`,
      },
      {
        question: `How long can I use my Pakistani driving licence in Germany?`,
        answer: `Generally, non-EU driving licences can be used for up to six months after establishing normal residence in Germany.
After this period, conversion is usually required.
Always check the latest rules because requirements depend on:
Country of licence issuance
Licence category
Individual circumstances`,
      },
      {
        question: `Can I convert my Pakistani driving licence into a German licence?`,
        answer: `Yes, Pakistani driving licence holders may apply for conversion.
The process depends on German regulations for Pakistan.
You may need:
Application at the driving licence authority
Eye test
First-aid course
Biometric photo
Translation of documents (if required)
Theory exam
Practical driving exam`,
      },
      {
        question: `Do Pakistani licence holders need to take driving exams?`,
        answer: `Depending on the country agreement and current regulations, applicants from Pakistan may need to complete:
Theory examination
Practical driving examination
The exact requirements should be confirmed with the local driving licence authority.`,
      },
      {
        question: `Where can I apply for a German driving licence in Marburg?`,
        answer: `Driving licence matters are handled by the local driving licence authority (Fahrerlaubnisbehörde).
You should contact the relevant authority responsible for Marburg residents.
They provide information about:
Licence conversion
Applications
Required documents
Appointments`,
      },
      {
        question: `What documents are required for driving licence conversion?`,
        answer: `Common documents include:
Passport
Residence permit
Registration certificate (Anmeldung)
Original driving licence
Translation (if required)
Biometric photograph
Eye test certificate
First-aid course certificate
Additional documents may be required depending on your case.`,
      },
      {
        question: `How do I get a German driving licence from zero?`,
        answer: `If you do not have a driving licence, the process includes:
Registering with a driving school (Fahrschule)
Completing theory lessons
Taking driving lessons
Completing first-aid training
Passing theory exam
Passing practical exam`,
      },
      {
        question: `What is a Fahrschule?`,
        answer: `A Fahrschule is a driving school.
It provides:
Theory lessons
Practical driving training
Exam preparation
Students choose a driving school and complete required training before exams.`,
      },
      {
        question: `How much does a German driving licence cost?`,
        answer: `The cost varies depending on:
Number of driving lessons
Driving school prices
Exam attempts
Required training
Many people spend several thousand euros.
Planning a budget before starting is recommended.`,
      },
      {
        question: `Is a German driving licence difficult?`,
        answer: `Many international students find it challenging because:
Traffic rules are detailed
Theory exams require preparation
Practical exams focus on safety and correct procedures
Learning German traffic vocabulary helps significantly.`,
      },
      {
        question: `What are the basic driving rules in Germany?`,
        answer: `Important rules:
Drive on the right side of the road.
Follow speed limits.
Wear seat belts.
Do not use a mobile phone while driving.
Give priority according to traffic signs.
Respect pedestrians and cyclists.`,
      },
      {
        question: `What are common speed limits in Germany?`,
        answer: `Typical limits:
Residential areas:
Usually 30 km/h
Cities:
Usually 50 km/h
Country roads:
Usually 100 km/h
Autobahn:
Some sections have no general speed limit, but many areas have restrictions.
Always follow signs.`,
      },
      {
        question: `What happens if I get a traffic fine?`,
        answer: `Traffic violations can result in:
Fines
Points in Flensburg
Driving bans in serious cases
Examples:
Speeding
Parking violations
Using a phone while driving
Driving under influence`,
      },
      {
        question: `What is the point system in Flensburg?`,
        answer: `Germany records serious driving offences in a central register located in Flensburg.
Points may be added for offences such as:
Dangerous driving
Serious speeding
Alcohol-related offences
Too many points can result in losing your driving licence.`,
      },
      {
        question: `Is car insurance mandatory in Germany?`,
        answer: `Yes.
Every registered vehicle must have motor vehicle liability insurance (Kfz-Haftpflichtversicherung).
Without insurance, a car cannot legally be registered.`,
      },
      {
        question: `What types of car insurance exist?`,
        answer: `Main types:
Liability Insurance (Haftpflicht)
Required by law.
Covers damage caused to others.
Partial Coverage (Teilkasko)
May cover:
Theft
Glass damage
Weather damage
Full Coverage (Vollkasko)
Provides wider protection, including damage to your own vehicle in many situations.`,
      },
      {
        question: `How do I buy a car in Germany?`,
        answer: `You can buy from:
Car dealerships
Online marketplaces
Private sellers
Before buying:
Check:
Vehicle documents
Inspection status (TÜV)
Service history
Insurance costs
Condition of vehicle`,
      },
      {
        question: `What documents are needed to register a car?`,
        answer: `Usually required:
Passport/ID
Residence documents
Insurance confirmation (eVB number)
Vehicle documents
Registration forms
The car must be registered before driving.`,
      },
      {
        question: `What is TÜV?`,
        answer: `TÜV is the mandatory vehicle inspection system.
It checks:
Road safety
Technical condition
Environmental requirements
Cars must pass inspection regularly to remain legally on the road.`,
      },
      {
        question: `Can international students buy a car?`,
        answer: `Yes.
Students can buy cars if they can manage:
Purchase cost
Insurance
Maintenance
Registration fees
Fuel costs
Many students prefer public transport because it is cheaper.`,
      },
      {
        question: `What public transport options exist in Germany?`,
        answer: `Germany has:
Buses
Trains
Trams
Regional trains
Underground systems (in larger cities)
Public transport is widely used by students and professionals.`,
      },
      {
        question: `What is the Deutschlandticket?`,
        answer: `The Deutschlandticket is a monthly public transport ticket.
It allows travel on many local and regional public transport services throughout Germany.
It is commonly used by:
Students
Workers
Daily commuters
Conditions and prices can change, so users should check current information.`,
      },
      {
        question: `How does public transport work in Marburg?`,
        answer: `Marburg has a local bus network connecting:
University areas
Residential areas
Train station
City centre
Students often use public transport for daily university travel.`,
      },
      {
        question: `What is a Semesterticket?`,
        answer: `Many universities include a semester transport ticket in the semester contribution.
It may provide students with public transport access according to the agreement of the university and transport association.
Check current rules with your university.`,
      },
      {
        question: `Can I use bicycles in Marburg?`,
        answer: `Yes.
Marburg is a student city where many people use bicycles.
Benefits:
Low cost
Environmentally friendly
Convenient for short distances
Remember:
Use bicycle lights at night
Follow traffic rules
Lock your bicycle properly`,
      },
      {
        question: `Where can I buy a bicycle in Marburg?`,
        answer: `Options include:
Bicycle shops
Second-hand platforms
Student groups
Local markets
Always check:
Brakes
Lights
Tyres
Frame condition`,
      },
      {
        question: `What should newcomers know about German traffic culture?`,
        answer: `Important points:
Pedestrians have strong protection.
Rules are followed strictly.
Punctuality matters.
Parking rules are controlled.
Cyclists have designated areas.`,
      },
      {
        question: `Can I drive in other EU countries with a German licence?`,
        answer: `Yes.
A valid German driving licence is generally recognised throughout the EU and many other countries.
Rules may vary outside the EU.`,
      },
      {
        question: `How can Pakistanis in Marburg help newcomers with transport?`,
        answer: `Community support can include:
Explaining public transport systems
Sharing driving school experiences
Helping understand German traffic rules
Advising about buying cars
Supporting licence conversion questions`,
      },
      {
        question: `What transport mistakes should newcomers avoid?`,
        answer: `Avoid:
❌ Driving without valid permission
❌ Ignoring speed limits
❌ Parking without payment where required
❌ Buying a car without checking documents
❌ Ignoring insurance requirements
Germany has strict transport regulations.`,
      },
    ],
    glossary: {
      title: `Important Transport Terms`,
      headers: [`German`, `English`],
      rows: [
        [`Führerschein`, `Driving licence`],
        [`Fahrschule`, `Driving school`],
        [`Fahrerlaubnisbehörde`, `Driving licence authority`],
        [`Auto`, `Car`],
        [`Versicherung`, `Insurance`],
        [`TÜV`, `Vehicle inspection`],
        [`Haltestelle`, `Bus stop`],
        [`Fahrkarte`, `Ticket`],
        [`Bahnhof`, `Train station`],
        [`Bußgeld`, `Fine`],
      ],
    },
    sources: [
      `German Federal Ministry of Transport`,
      `Local driving licence authorities`,
      `Deutsche Bahn`,
      `Regional transport associations`,
      `ADAC (German automobile association)`,
    ],
  },
  {
    id: "german-language-integration-everyday-communication",
    title: `German Language, Integration & Everyday Communication (Language & Cultural Guide)`,
    intro: `Learning German is one of the most important steps for successful integration in Germany. Strong German skills improve opportunities in:
University education
Employment
Daily communication
Government procedures
Building friendships
Understanding German society
This section explains:
German language levels
Language courses
Exams and certificates
Integration courses
Communication culture
Everyday German life
Tips for newcomers`,
    items: [
      {
        question: `Why is learning German important in Germany?`,
        answer: `Although many Germans speak English, German is essential for:
Finding better jobs
Communicating with authorities
Understanding contracts
Visiting doctors
Building social connections
Long-term integration
German skills increase independence and confidence.`,
      },
      {
        question: `What are the German language levels?`,
        answer: `Germany follows the Common European Framework of Reference for Languages (CEFR).
Levels are:
A1 – Beginner
You can:
Introduce yourself
Understand basic phrases
Handle simple daily situations
A2 – Elementary
You can:
Communicate in familiar situations
Understand simple conversations
Describe basic personal information
B1 – Intermediate
You can:
Handle everyday conversations
Write simple texts
Understand common topics
Manage many daily situations independently
B2 – Upper Intermediate
You can:
Communicate professionally
Understand complex discussions
Study or work in many environments
C1 – Advanced
You can:
Communicate academically and professionally
Understand complex texts
Participate confidently in German society`,
      },
      {
        question: `Which German level is needed for university?`,
        answer: `Requirements depend on the programme.
Common requirements:
Studienkolleg: often B1/B2 depending on institution
Bachelor's programmes: often B2–C1
Master's programmes: depends on the programme language
German-taught programmes commonly require certificates such as:
TestDaF
DSH
telc C1 Hochschule
Goethe certificates`,
      },
      {
        question: `Which German level is needed for work?`,
        answer: `It depends on the profession.
Examples:
Basic jobs:
A2–B1 may be sufficient for some positions.
Skilled professions:
B1–B2 is often preferred.
Academic and customer-facing jobs:
B2–C1 is commonly required.
Higher German skills usually lead to better opportunities.`,
      },
      {
        question: `What is an Integration Course (Integrationskurs)?`,
        answer: `An integration course helps newcomers learn:
German language
German culture
Laws and society
It usually contains:
Language Course
and
Orientation Course
The orientation course covers:
German history
Political system
Rights and responsibilities
Social values`,
      },
      {
        question: `Who can attend an integration course?`,
        answer: `Eligibility depends on residence status.
Possible participants include:
Some refugees
New immigrants
Family migrants
Other eligible residents
The responsible authority determines eligibility.`,
      },
      {
        question: `Where can I learn German in Marburg?`,
        answer: `Options include:
University language courses
Volkshochschule (VHS)
Private language schools
Integration course providers
Community language groups
Students can also use university support programmes.`,
      },
      {
        question: `What are Goethe, telc and TestDaF exams?`,
        answer: `These are recognised German language examinations.
Goethe Certificate
Used internationally to prove German skills.
Levels:
A1–C2
telc
Offers certificates for:
General German
Professional German
University German
TestDaF
Mainly used for university admission.
Many German universities accept TestDaF results.`,
      },
      {
        question: `What is DSH?`,
        answer: `DSH (Deutsche Sprachprüfung für den Hochschulzugang) is a German language examination for university admission.
It tests:
Reading
Listening
Writing
Speaking
Many German universities offer their own DSH examination.`,
      },
      {
        question: `How can I improve German faster?`,
        answer: `Effective methods:
✅ Speak German every day
✅ Watch German news/videos
✅ Read simple German books
✅ Join German conversation groups
✅ Practice with native speakers
✅ Write regularly
✅ Use German in daily situations
Consistency is more important than studying only before exams.`,
      },
      {
        question: `Should I speak German even if I make mistakes?`,
        answer: `Yes.
Making mistakes is a natural part of learning.
Most Germans appreciate foreigners who try to communicate in German.
Practice improves confidence.`,
      },
      {
        question: `How can newcomers practice German in Marburg?`,
        answer: `Good opportunities include:
Language exchange groups
University activities
Sports clubs
Volunteering
Community events
Speaking with neighbours
Daily interaction is one of the fastest ways to improve.`,
      },
      {
        question: `What is a Sprachpartner (language partner)?`,
        answer: `A Sprachpartner is someone who helps you practise a language.
Usually:
One person practises German.
The other practises another language.
It helps improve:
Speaking confidence
Pronunciation
Cultural understanding`,
      },
      {
        question: `What are important German communication habits?`,
        answer: `German communication often values:
Directness
Clear information
Punctuality
Reliability
Respectful language
Direct communication is usually not considered rude.`,
      },
      {
        question: `Why is punctuality important in Germany?`,
        answer: `Being on time shows:
Respect
Reliability
Professionalism
For appointments:
Arrive a few minutes early.
Inform people if you are delayed.`,
      },
      {
        question: `How should I communicate with German authorities?`,
        answer: `When contacting:
Ausländerbehörde
University offices
Bürgerbüro
Employers
Helpful practices:
✅ Be polite
✅ Prepare documents
✅ Write clear emails
✅ Keep appointment dates
✅ Save official letters`,
      },
      {
        question: `How do I write a formal email in German?`,
        answer: `A formal email usually includes:
Greeting:
"Sehr geehrte Damen und Herren"
or
"Sehr geehrte Frau / Herr ..."
Main message:
Explain your request clearly.
Ending:
"Mit freundlichen Grüßen"
followed by your name.`,
      },
      {
        question: `What German habits should newcomers understand?`,
        answer: `Important everyday habits:
Recycling correctly
Respecting quiet hours
Following appointments
Separating private and professional communication
Following rules`,
      },
      {
        question: `What are Ruhezeiten (quiet hours)?`,
        answer: `Many buildings have quiet hours where residents should avoid loud activities.
Common examples:
Late evening
Sundays and public holidays
Exact rules depend on local regulations and rental agreements.`,
      },
      {
        question: `How does German society view rules?`,
        answer: `Rules are generally considered important because they create:
Safety
Fairness
Organisation
Following rules helps newcomers integrate smoothly.`,
      },
      {
        question: `How can Pakistani newcomers maintain their culture while integrating?`,
        answer: `Integration does not mean abandoning your culture.
You can:
Speak your native language
Celebrate Pakistani traditions
Share Pakistani culture
Participate in German society
Learn German customs
A multicultural identity is possible.`,
      },
      {
        question: `How can Pakistanis in Marburg support German learning?`,
        answer: `The community can organise:
Conversation circles
German practice sessions
Language exchange events
Help for newcomers
Translation support`,
      },
      {
        question: `What mistakes do newcomers often make while learning German?`,
        answer: `Common mistakes:
❌ Waiting too long to speak
❌ Translating everything from native language
❌ Avoiding German conversations
❌ Studying grammar without practice
❌ Being afraid of mistakes
Active use leads to improvement.`,
      },
      {
        question: `How long does it take to learn German?`,
        answer: `It depends on:
Study intensity
Previous language experience
Daily practice
Learning environment
With regular practice, many learners reach:
A2/B1 within months
B2/C1 with continued study and practice`,
      },
      {
        question: `Why is German important for permanent residence and citizenship?`,
        answer: `German language skills are among the requirements considered for:
Permanent residence
Naturalisation (citizenship)
Exact requirements depend on current German law and individual circumstances.`,
      },
      {
        question: `How can professionals improve business German?`,
        answer: `Professionals should focus on:
Industry vocabulary
Formal emails
Meetings
Presentations
Negotiations
Professional German improves career opportunities.`,
      },
      {
        question: `How can students improve academic German?`,
        answer: `Students should practise:
Academic vocabulary
Writing essays
Presentations
Reading scientific texts
Listening to lectures
University language centres can provide support.`,
      },
      {
        question: `What free resources can help learn German?`,
        answer: `Useful resources include:
Deutsche Welle German courses
Goethe learning materials
Library resources
Language exchange platforms
University courses`,
      },
      {
        question: `How can families help children learn German?`,
        answer: `Parents can support children by:
Encouraging German conversations
Reading German books
Supporting school activities
Allowing friendships with German-speaking children
Children often learn quickly through school and social interaction.`,
      },
      {
        question: `How can Pakistanis in Marburg create a stronger bilingual community?`,
        answer: `The community can promote:
German language workshops
Pakistani-German cultural events
Student mentoring
Professional networking
Integration activities
A community that supports language learning creates stronger opportunities for everyone.`,
      },
    ],
    glossary: {
      title: `Important German Words for Newcomers`,
      headers: [`German`, `English`],
      rows: [
        [`Anmeldung`, `Registration`],
        [`Aufenthaltstitel`, `Residence permit`],
        [`Ausländerbehörde`, `Immigration office`],
        [`Bürgerbüro`, `Citizens' office`],
        [`Termin`, `Appointment`],
        [`Antrag`, `Application`],
        [`Bescheid`, `Official decision`],
        [`Versicherung`, `Insurance`],
        [`Vertrag`, `Contract`],
        [`Rechnung`, `Invoice`],
        [`Kündigung`, `Cancellation/termination`],
      ],
    },
    sources: [
      `Federal Office for Migration and Refugees (BAMF)`,
      `Goethe-Institut`,
      `TestDaF Institute`,
      `German universities`,
      `Local Volkshochschule (VHS)`,
    ],
  },
  {
    id: "pakistani-community-culture-religious-life-in-marburg",
    title: `Pakistani Community, Culture & Religious Life in Marburg (Community Guide)`,
    intro: `This section is designed for Pakistani students, professionals, families and newcomers who want to connect with the Pakistani community in Marburg while also integrating into German society.
Topics covered:
Pakistani community networks
Cultural events
Religious facilities
Halal food
Pakistani traditions
Social support
Student networking
Volunteering
Building Pakistan-Germany connections`,
    items: [
      {
        question: `Is there a Pakistani community in Marburg?`,
        answer: `Yes.
Marburg has a growing Pakistani community consisting of:
Students
Researchers
Professionals
Families
New arrivals
The community supports newcomers through:
Information sharing
Social gatherings
Cultural events
Networking
Practical guidance`,
      },
      {
        question: `What is the purpose of the Pakistanis in Marburg community?`,
        answer: `The community aims to:
Support Pakistanis living in Marburg
Help newcomers understand life in Germany
Promote Pakistani culture
Encourage integration
Connect students and professionals
Create a welcoming environment`,
      },
      {
        question: `How can I join the Pakistani community in Marburg?`,
        answer: `You can join by:
Participating in community events
Joining official social media groups
Attending cultural programmes
Meeting community members
Volunteering
Newcomers are encouraged to actively participate.`,
      },
      {
        question: `Are there Pakistani cultural events in Marburg?`,
        answer: `Yes.
Cultural activities may include:
Independence Day celebrations
Eid gatherings
Pakistani food events
Cultural evenings
Sports activities
Family gatherings
Student networking events
These events help preserve Pakistani culture while connecting with German society.`,
      },
      {
        question: `Why are cultural events important for the community?`,
        answer: `Cultural events help:
Newcomers feel welcomed
Students build friendships
Families create social connections
Germans learn about Pakistani culture
Different generations connect
They create understanding between cultures.`,
      },
      {
        question: `How can I participate in organising Pakistani events?`,
        answer: `You can contribute through:
Event planning
Food preparation
Translation support
Marketing
Photography
Volunteer coordination
Cultural presentations
Community events depend on active volunteers.`,
      },
      {
        question: `Are Pakistani festivals celebrated in Marburg?`,
        answer: `Many Pakistani families and students celebrate:
Eid-ul-Fitr
Eid-ul-Adha
Pakistan Independence Day
Ramadan activities
Cultural celebrations
Celebrations may be organised privately or through community groups.`,
      },
      {
        question: `Where can Pakistanis pray in Marburg?`,
        answer: `Muslims in Marburg have access to prayer facilities through local Islamic communities and mosques.
Newcomers can find prayer locations through:
Local Muslim organisations
Community members
University Muslim groups
Prayer facilities may vary depending on location and availability.`,
      },
      {
        question: `Are there halal food options in Marburg?`,
        answer: `Yes.
Marburg has several options for people looking for:
Halal meat
Pakistani food
South Asian groceries
Middle Eastern products
Newcomers can ask the community for recommendations.`,
      },
      {
        question: `Where can I buy Pakistani groceries in Germany?`,
        answer: `Pakistani and South Asian products are available through:
Asian supermarkets
International grocery stores
Turkish/Arabic supermarkets
Online shops
Common products include:
Rice
Spices
Tea
Lentils
Frozen foods
Traditional ingredients`,
      },
      {
        question: `Can I find Pakistani restaurants near Marburg?`,
        answer: `Options may include:
South Asian restaurants
Indian/Pakistani restaurants in nearby cities
International food markets
Community members often share recommendations for halal and Pakistani food options.`,
      },
      {
        question: `How can Pakistani students connect with each other?`,
        answer: `Students can connect through:
University groups
Cultural events
Social media communities
Student associations
Language exchange activities
Networking helps students adjust faster.`,
      },
      {
        question: `How can senior Pakistani community members help newcomers?`,
        answer: `Experienced community members can support newcomers by sharing:
Housing information
University experiences
Job search advice
German bureaucracy guidance
Cultural knowledge
Mentorship creates a stronger community.`,
      },
      {
        question: `Can German people participate in Pakistani community events?`,
        answer: `Yes.
Many cultural events are open to:
Germans
International students
Other communities
Welcoming visitors helps promote intercultural understanding.`,
      },
      {
        question: `How can Pakistanis introduce Pakistani culture to Germans?`,
        answer: `Ways include:
Food festivals
Traditional clothing presentations
Music and performances
Historical presentations
Language workshops
Cultural exhibitions`,
      },
      {
        question: `What Pakistani foods are popular at community events?`,
        answer: `Common dishes include:
Biryani
Karahi
Nihari
Samosas
Pakoras
Chapati
Desserts such as kheer and gulab jamun
Food is an important way to share Pakistani culture.`,
      },
      {
        question: `How can families connect with other Pakistani families?`,
        answer: `Families can connect through:
Community gatherings
Eid events
Children's activities
Cultural programmes
Social networks
Family connections help newcomers feel settled.`,
      },
      {
        question: `How can Pakistani professionals support the community?`,
        answer: `Professionals can contribute through:
Career guidance
Student mentoring
Workshops
Networking events
Sharing industry experience
Professional networks create opportunities for younger generations.`,
      },
      {
        question: `How can students support the community?`,
        answer: `Students can help through:
Welcoming new students
Sharing university experiences
Helping with German bureaucracy
Organising events
Volunteering`,
      },
      {
        question: `Are there Pakistani-German cultural exchange activities?`,
        answer: `Yes.
Activities may include:
International evenings
University cultural events
Food festivals
Language exchanges
Community collaborations
These strengthen relationships between Pakistan and Germany.`,
      },
      {
        question: `How can Pakistanis volunteer in Marburg?`,
        answer: `Volunteering opportunities may include:
Cultural events
Social organisations
University activities
Charity activities
Community projects
Volunteering improves:
German skills
Networks
Professional experience`,
      },
      {
        question: `Can Pakistani students create university societies?`,
        answer: `Yes.
Students can establish groups through university procedures.
Possible activities:
Cultural evenings
Academic discussions
Networking events
Student support programmes`,
      },
      {
        question: `How can the Pakistani community support integration?`,
        answer: `The community can help by:
Encouraging German learning
Explaining German systems
Connecting newcomers with services
Promoting respect for German laws
Supporting education and careers`,
      },
      {
        question: `How can Pakistani culture and German culture exist together?`,
        answer: `Integration means participation while maintaining cultural identity.
Pakistanis can:
Celebrate Pakistani traditions
Learn German customs
Respect local values
Build friendships across cultures
Both identities can coexist successfully.`,
      },
      {
        question: `What values should guide the Pakistani community in Germany?`,
        answer: `A strong community should promote:
✅ Respect
✅ Education
✅ Professional growth
✅ Inclusion
✅ Helping newcomers
✅ Following German laws
✅ Positive representation of Pakistan`,
      },
      {
        question: `How can Pakistanis in Marburg support new arrivals on their first days?`,
        answer: `Support may include:
Explaining Anmeldung
Showing important locations
Helping understand public transport
Sharing housing information
Explaining university systems
Introducing community contacts`,
      },
      {
        question: `How can the community support Pakistani businesses?`,
        answer: `The community can support entrepreneurs by:
Promoting local businesses
Attending events
Sharing recommendations
Encouraging ethical business practices`,
      },
      {
        question: `How can Pakistani entrepreneurs contribute to Marburg?`,
        answer: `Entrepreneurs can contribute through:
Creating jobs
Introducing Pakistani products
Supporting cultural exchange
Participating in local markets and events`,
      },
      {
        question: `How can young Pakistanis become community leaders?`,
        answer: `Leadership can develop through:
Volunteering
Learning German
Organising activities
Building professional skills
Supporting others`,
      },
      {
        question: `What is the vision for Pakistanis in Marburg?`,
        answer: `A successful Pakistani community in Marburg should be:
Connected
Educated
Welcoming
Professionally successful
Culturally proud
Fully integrated into German society`,
      },
    ],
    glossary: {
      title: `Useful Community Activities`,
      headers: [`Activity`, `Purpose`],
      rows: [
        [`Cultural evenings`, `Promote Pakistani culture`],
        [`Student mentoring`, `Support newcomers`],
        [`Language exchange`, `Improve German skills`],
        [`Professional networking`, `Career development`],
        [`Family gatherings`, `Social connections`],
        [`Sports activities`, `Health and friendships`],
        [`Volunteer projects`, `Community contribution`],
      ],
    },
  },
  {
    id: "german-government-offices-important-authorities",
    title: `German Government Offices & Important Authorities (Bureaucracy Guide)`,
    intro: `Germany has a structured administrative system. Understanding which office handles which issue saves time and helps newcomers complete important procedures correctly.
This section is designed for:
Students
Professionals
Families
Refugees
New arrivals in Marburg
Topics covered:
Immigration office
Registration
Residence permits
Visa matters
Tax office
Employment agencies
University offices
Official communication
Important documents`,
    items: [
      {
        question: `What are the most important German authorities for newcomers?`,
        answer: `The most important offices include:
German Office	Main Responsibility
Bürgerbüro / Bürgeramt	Address registration, identity documents
Ausländerbehörde	Residence permits and immigration matters
Finanzamt	Taxes
Agentur für Arbeit	Employment support
Jobcenter	Financial support for eligible unemployed people
Krankenkasse	Health insurance
Standesamt	Birth, marriage and civil records
Universität / International Office	Student support
BAMF	Migration and asylum matters`,
      },
      {
        question: `What is the Bürgerbüro (Citizens Office)?`,
        answer: `The Bürgerbüro handles many everyday administrative tasks.
Services include:
Anmeldung (address registration)
Deregistration (Abmeldung)
Registration certificates
Identity documents
Some official forms
Almost every newcomer interacts with the Bürgerbüro after arrival.`,
      },
      {
        question: `What is Anmeldung and why is it important?`,
        answer: `Anmeldung is the official registration of your residential address in Germany.
You usually need to complete it after moving into a new home.
You receive:
Meldebescheinigung (registration certificate)
This document is often required for:
Bank accounts
Residence permits
University procedures
Contracts
Official applications`,
      },
      {
        question: `What documents are needed for Anmeldung?`,
        answer: `Usually:
Passport
Residence document (if available)
Registration form
Landlord confirmation (Wohnungsgeberbestätigung)
Requirements may vary slightly by municipality.`,
      },
      {
        question: `What happens if I do not register my address?`,
        answer: `Germany requires residents to register their address.
Failure to complete registration can create problems with:
Authorities
Banking
Residence procedures
Official communication
Always complete Anmeldung on time.`,
      },
      {
        question: `What is the Ausländerbehörde?`,
        answer: `The Ausländerbehörde is the immigration authority.
It handles:
Residence permits
Visa extensions
Work permissions
Family reunification
Immigration-related questions
International students, workers and families often need to contact this office.`,
      },
      {
        question: `When should I contact the Ausländerbehörde?`,
        answer: `Contact them for:
Extending your residence permit
Changing your residence purpose
Questions about work permission
Family reunification
Lost residence documents
Do not wait until your residence permit expires.`,
      },
      {
        question: `How can I apply for a residence permit?`,
        answer: `The process usually involves:
Making an appointment
Submitting required documents
Completing application forms
Providing biometric information if required
Receiving the residence card
Requirements depend on your residence category.`,
      },
      {
        question: `What documents are usually required for residence permits?`,
        answer: `Common documents:
Passport
Current residence permit/visa
Anmeldung certificate
Health insurance proof
Financial proof
Employment contract or university documents
Biometric photo
Application forms
Additional documents may be required.`,
      },
      {
        question: `What should I do if my residence permit expires soon?`,
        answer: `Apply for extension before the expiry date.
Keep:
Appointment confirmation
Emails with authorities
Proof that you applied
Do not ignore expiry dates.`,
      },
      {
        question: `What is a Fiktionsbescheinigung?`,
        answer: `A Fiktionsbescheinigung is a temporary document issued in certain situations when a residence application is being processed.
It can confirm that your stay remains legally permitted while waiting for a decision.
The rights connected to it depend on the specific situation.`,
      },
      {
        question: `What is BAMF?`,
        answer: `BAMF stands for:
Bundesamt für Migration und Flüchtlinge
(Federal Office for Migration and Refugees)
It handles:
Asylum procedures
Integration courses
Migration information
Some refugee-related matters`,
      },
      {
        question: `What is the Finanzamt?`,
        answer: `The Finanzamt is the tax office.
It handles:
Income tax matters
Tax returns
Tax numbers
Business taxation
Employees usually do not visit frequently because taxes are automatically deducted from salaries.`,
      },
      {
        question: `What is a tax number (Steuernummer)?`,
        answer: `A Steuernummer is issued by the tax office.
It is mainly used for:
Self-employed people
Businesses
Tax communication
It is different from the personal tax ID (Steuer-ID).`,
      },
      {
        question: `What is the Agentur für Arbeit?`,
        answer: `The Federal Employment Agency provides support related to:
Job searching
Career counselling
Training opportunities
Employment services
It supports both Germans and international residents who are eligible.`,
      },
      {
        question: `What is the Jobcenter?`,
        answer: `The Jobcenter supports eligible people who are unemployed or have insufficient income.
Services may include:
Financial support
Job counselling
Employment programmes
Eligibility depends on residence status and personal circumstances.`,
      },
      {
        question: `What is the difference between Agentur für Arbeit and Jobcenter?`,
        answer: `Agentur für Arbeit:
Mainly supports:
Employment search
Career development
Unemployment insurance benefits
Jobcenter:
Mainly supports:
Basic financial assistance
Employment integration for eligible persons`,
      },
      {
        question: `What is the Standesamt?`,
        answer: `The Standesamt handles civil records.
Services include:
Birth registration
Marriage registration
Death certificates
Civil status documents`,
      },
      {
        question: `How do I register a marriage in Germany?`,
        answer: `Requirements depend on:
Nationality
Previous marital status
Documents from home country
Foreign documents may require:
Translation
Legalisation
Additional certificates`,
      },
      {
        question: `What is the International Office at a university?`,
        answer: `Universities have International Offices to support international students.
They help with:
Admission questions
Orientation
Student services
Integration programmes
Exchange programmes`,
      },
      {
        question: `What is the Studentenwerk?`,
        answer: `Student services organisations (Studentenwerk) support students with:
Accommodation
Cafeterias (Mensa)
Counselling
Financial advice
Social support`,
      },
      {
        question: `How should I communicate with German authorities?`,
        answer: `Recommended approach:
✅ Be polite
✅ Write clear emails
✅ Include your full name and case details
✅ Attach required documents
✅ Keep copies of everything
✅ Arrive on time for appointments`,
      },
      {
        question: `How do I write an email to an authority?`,
        answer: `A formal email should include:
Subject:
Clear description of your request.
Example:
"Request for appointment regarding residence permit extension"
Message:
Introduction
Explanation of your situation
Request
Attachments
Ending:
"Mit freundlichen Grüßen"`,
      },
      {
        question: `What is a Termin (appointment)?`,
        answer: `Many German authorities work through appointments.
Appointments are required for:
Residence permits
Registration
Official applications
Always book early because waiting times can be long.`,
      },
      {
        question: `What happens if I miss an official appointment?`,
        answer: `Missing appointments without notice can cause problems.
If you cannot attend:
Inform the office as soon as possible.
Request a new appointment.`,
      },
      {
        question: `Why are official letters important in Germany?`,
        answer: `German authorities communicate mainly through written letters.
Important letters may contain:
Deadlines
Decisions
Required actions
Never ignore official mail.`,
      },
      {
        question: `What is a Bescheid?`,
        answer: `A Bescheid is an official written decision from an authority.
Examples:
Tax decisions
Immigration decisions
Benefit decisions
Read carefully and check deadlines.`,
      },
      {
        question: `Where can newcomers get help understanding German bureaucracy?`,
        answer: `Support options include:
Migration counselling centres
University international offices
Community organisations
Local advisory services`,
      },
      {
        question: `How can Pakistanis in Marburg help newcomers with bureaucracy?`,
        answer: `The community can support through:
Explaining procedures
Sharing experiences
Helping translate basic information
Showing where offices are located
Helping prepare documents
However, official decisions must always come from German authorities.`,
      },
      {
        question: `What documents should every newcomer keep safely?`,
        answer: `Important documents:
✅ Passport
✅ Residence permit
✅ Anmeldung certificate
✅ Tax ID letter
✅ Health insurance card
✅ Employment contract
✅ University documents
✅ Rental contract
✅ Certificates and qualifications
Keep both paper and digital copies.`,
      },
    ],
    glossary: {
      title: `Important German Administrative Vocabulary`,
      headers: [`German`, `English`],
      rows: [
        [`Behörde`, `Authority`],
        [`Antrag`, `Application`],
        [`Termin`, `Appointment`],
        [`Formular`, `Form`],
        [`Bescheid`, `Official decision`],
        [`Aufenthaltstitel`, `Residence permit`],
        [`Verlängerung`, `Extension`],
        [`Nachweis`, `Proof/document`],
        [`Gebühr`, `Fee`],
        [`Frist`, `Deadline`],
      ],
    },
    sources: [
      `German Federal Government`,
      `BAMF (Federal Office for Migration and Refugees)`,
      `City administration services`,
      `Local immigration authorities`,
      `University International Offices`,
    ],
  },
  {
    id: "legal-rights-contracts-consumer-protection-in-germany",
    title: `Legal Rights, Contracts & Consumer Protection in Germany (Law & Protection Guide)`,
    intro: `Germany has a strong legal system designed to protect residents, employees, tenants and consumers. Understanding basic rights and responsibilities helps international students, professionals, families and refugees avoid problems and make informed decisions.
This section explains:
Contracts
Employment rights
Rental agreements
Consumer protection
Mobile and internet contracts
Insurance contracts
Legal assistance
Police procedures
Anti-discrimination rights
Everyday laws`,
    items: [
      {
        question: `Do foreigners have the same legal rights as Germans in Germany?`,
        answer: `Foreign residents in Germany are protected by German law.
Rights depend on:
Residence status
Type of contract
Individual circumstances
Everyone living in Germany must follow German laws and regulations.`,
      },
      {
        question: `Why are contracts important in Germany?`,
        answer: `Germany is a contract-based society.
Many services require written agreements, including:
Apartments
Jobs
Mobile phones
Internet
Insurance
Memberships
Always read and understand a contract before signing.`,
      },
      {
        question: `What should I check before signing a contract?`,
        answer: `Before signing, check:
Price and payment conditions
Duration
Cancellation rules
Responsibilities
Additional fees
Notice periods
If you do not understand something, ask for clarification.`,
      },
      {
        question: `Are verbal agreements legally valid in Germany?`,
        answer: `Some verbal agreements can be legally valid.
However, written agreements are strongly recommended because they provide proof.
For important matters such as:
Employment
Housing
Business
Loans
always keep written documents.`,
      },
      {
        question: `What is a cancellation period (Kündigungsfrist)?`,
        answer: `Kündigungsfrist is the notice period required to end a contract.
It applies to:
Employment contracts
Rental contracts
Phone contracts
Insurance contracts
The period depends on the type of contract and legal rules.`,
      },
      {
        question: `What does Kündigung mean?`,
        answer: `Kündigung means officially ending a contract.
Examples:
Ending a rental agreement
Leaving a job
Cancelling an internet contract
Many cancellations must be made in writing.`,
      },
      {
        question: `What is Verbraucherzentrale?`,
        answer: `The Verbraucherzentrale is a consumer advice organisation.
It helps consumers with:
Contract problems
Unfair agreements
Consumer rights
Complaints`,
      },
      {
        question: `What rights do consumers have in Germany?`,
        answer: `Consumers are protected regarding:
Product quality
Incorrect information
Unfair business practices
Online purchases
Contract transparency`,
      },
      {
        question: `Can I return products bought in a shop?`,
        answer: `Not always.
In Germany:
Returning an item bought in a physical shop depends on the store's policy.
Online purchases usually have a legal cancellation right under certain conditions.
Always check the seller's return policy.`,
      },
      {
        question: `What is the right of withdrawal (Widerrufsrecht)?`,
        answer: `For many online purchases, consumers have a right to cancel within a legally defined period.
Exceptions exist for certain products and services.
The rules depend on:
Type of purchase
Seller information
Product category`,
      },
      {
        question: `What should I do if I receive an unfair bill?`,
        answer: `Steps:
Do not ignore the bill.
Check whether it is correct.
Contact the company.
Request clarification in writing.
Seek consumer advice if needed.`,
      },
      {
        question: `What is a Mahnung?`,
        answer: `A Mahnung is a payment reminder.
It is sent when a company believes a payment is overdue.
Ignoring reminders can lead to:
Additional costs
Collection procedures
Legal action`,
      },
      {
        question: `What is Inkasso?`,
        answer: `Inkasso means debt collection.
A company may send a case to a collection agency if payments are not made.
If you receive an Inkasso letter:
Check whether the claim is correct.
Do not ignore it.
Seek advice if necessary.`,
      },
      {
        question: `What are employee rights in Germany?`,
        answer: `Employees generally have rights regarding:
Salary payment
Working hours
Holidays
Sick leave
Workplace safety
Protection against unfair treatment`,
      },
      {
        question: `Should I always receive an employment contract?`,
        answer: `Yes.
Employees should receive written information about employment conditions.
A contract usually includes:
Job position
Salary
Working hours
Holiday entitlement
Start date
Notice period`,
      },
      {
        question: `Can an employer refuse to pay salary?`,
        answer: `No.
Employers must pay agreed wages according to the employment agreement and legal requirements.
If salary problems occur:
Communicate in writing.
Keep evidence.
Seek legal advice if needed.`,
      },
      {
        question: `What is minimum wage in Germany?`,
        answer: `Germany has a legally defined minimum wage.
The amount can change over time.
Some exceptions and special rules may apply.
Always check the current official rate.`,
      },
      {
        question: `Can employees work without a contract?`,
        answer: `Working without proper registration can create serious problems.
Employees should ensure:
Legal employment registration
Written employment conditions
Proper salary documentation`,
      },
      {
        question: `What protection do tenants have in Germany?`,
        answer: `Tenants have strong protections.
Rights include:
Privacy in their home
Proper notice before eviction
Protection against unfair rent practices
Return of deposit under correct conditions`,
      },
      {
        question: `Can a landlord increase rent?`,
        answer: `Rent increases are regulated by German law.
Rules depend on:
Location
Existing rent
Local regulations
Contract type
Tenants can seek advice if they believe an increase is incorrect.`,
      },
      {
        question: `What should I do if there is a problem with my landlord?`,
        answer: `Recommended steps:
Communicate politely in writing.
Keep records.
Understand your contract.
Contact tenant advice organisations if needed.`,
      },
      {
        question: `Is discrimination illegal in Germany?`,
        answer: `Yes.
Germany protects people against discrimination.
The General Equal Treatment Act (Allgemeines Gleichbehandlungsgesetz - AGG) protects against discrimination in areas such as:
Employment
Housing
Services`,
      },
      {
        question: `What should I do if I experience discrimination?`,
        answer: `Possible steps:
Document what happened.
Keep messages or evidence.
Seek advice from counselling organisations.
Report serious cases.`,
      },
      {
        question: `What rights do women have in Germany?`,
        answer: `Women have equal legal rights, including:
Equal treatment
Protection from harassment
Employment rights
Access to education
Personal freedom`,
      },
      {
        question: `What should I do if I become a victim of a crime?`,
        answer: `If there is immediate danger:
Call:
110 — Police
For emergencies involving health or fire:
112
You can report crimes at a police station.`,
      },
      {
        question: `What happens when I report a crime?`,
        answer: `Police may:
Record your statement
Investigate the case
Collect evidence
Forward the case to prosecutors
The process depends on the type of crime.`,
      },
      {
        question: `What is legal aid (Beratungshilfe)?`,
        answer: `People with limited income may receive support for legal advice.
Eligibility depends on:
Income
Financial situation
Type of legal issue`,
      },
      {
        question: `Do I need a lawyer for every legal problem?`,
        answer: `No.
Many issues can be solved through:
Advice centres
Authorities
Consumer organisations
Mediation
Lawyers are needed for more complex cases.`,
      },
      {
        question: `What insurance protects me legally?`,
        answer: `Important insurance types include:
Liability Insurance (Haftpflichtversicherung)
Protects against accidental damage caused to others.
Legal Protection Insurance (Rechtsschutzversicherung)
May cover certain legal costs.`,
      },
      {
        question: `How can Pakistanis in Marburg protect themselves legally?`,
        answer: `Recommended practices:
✅ Read contracts carefully
✅ Keep documents organised
✅ Ask questions before signing
✅ Learn basic German legal vocabulary
✅ Seek official advice when needed
✅ Respect German laws and regulations`,
      },
    ],
    glossary: {
      title: `Important Legal Terms`,
      headers: [`German`, `English`],
      rows: [
        [`Vertrag`, `Contract`],
        [`Kündigung`, `Cancellation`],
        [`Frist`, `Deadline`],
        [`Recht`, `Law/Right`],
        [`Pflicht`, `Responsibility`],
        [`Schaden`, `Damage`],
        [`Versicherung`, `Insurance`],
        [`Miete`, `Rent`],
        [`Arbeitgeber`, `Employer`],
        [`Arbeitnehmer`, `Employee`],
        [`Beratung`, `Advice`],
      ],
    },
    sources: [
      `German Federal Government`,
      `Verbraucherzentrale (Consumer Advice Centres)`,
      `Federal Ministry of Justice`,
      `Labour offices`,
      `Tenant advice organisations`,
    ],
  },
  {
    id: "digital-life-in-germany-internet-mobile-phones-apps-online-services",
    title: `Digital Life in Germany — Internet, Mobile Phones, Apps & Online Services (Digital Guide)`,
    intro: `Germany is a highly organised digital society where many daily activities depend on online services. For newcomers, understanding mobile contracts, internet services, online banking, digital security and official online platforms makes everyday life much easier.
This section is designed for:
Students
Professionals
Families
Refugees
New arrivals in Marburg
Topics covered:
Mobile phone services
Internet contracts
Wi-Fi
German apps
Online banking
Digital government services
Data protection
Cybersecurity
Useful digital tools`,
    items: [
      {
        question: `Do I need a German mobile phone number?`,
        answer: `Yes.
A German phone number is highly recommended because it is needed for:
Bank verification
Job applications
University communication
Two-factor authentication
Government appointments
Daily communication`,
      },
      {
        question: `How can I get a German SIM card?`,
        answer: `You can get a SIM card from:
Mobile network providers:
Telekom
Vodafone
O2
Discount providers:
Aldi Talk
Lidl Connect
Congstar
Blau
You can choose between:
Prepaid SIM
Monthly contract`,
      },
      {
        question: `What documents are needed to buy a SIM card?`,
        answer: `Usually:
Passport or ID
German address
Identity verification
Germany requires SIM card registration for security reasons.`,
      },
      {
        question: `What is prepaid mobile service?`,
        answer: `Prepaid means you pay before using services.
Advantages:
✅ No long contract
✅ Easy for newcomers
✅ Flexible payments
Disadvantages:
Less suitable for heavy users
Usually fewer benefits than contracts`,
      },
      {
        question: `What is a mobile contract (Vertrag)?`,
        answer: `A mobile contract usually provides:
Monthly data allowance
Calls
SMS
Fixed monthly payment
Contracts often last for a minimum period.
Always check:
Contract duration
Cancellation rules
Price after promotional period`,
      },
      {
        question: `Which mobile provider has the best coverage in Germany?`,
        answer: `Coverage depends on location.
Germany's major networks are:
Telekom network
Vodafone network
Telefónica/O2 network
Before choosing, check coverage where you live and study/work.`,
      },
      {
        question: `How much mobile data do I need?`,
        answer: `Typical usage:
Light user:
Messaging
Emails
Occasional browsing
Medium user:
Social media
Videos
Navigation
Heavy user:
Streaming
Hotspot
Frequent video calls
Students often choose plans with sufficient data for university and travel.`,
      },
      {
        question: `How do I get internet at home?`,
        answer: `Home internet is usually provided through contracts with companies offering:
DSL
Cable
Fibre internet
Common providers include:
Telekom
Vodafone
1&1
Local providers
Availability depends on your address.`,
      },
      {
        question: `What should I check before signing an internet contract?`,
        answer: `Check:
Monthly price
Contract duration
Installation costs
Internet speed
Router conditions
Cancellation rules
Promotional prices may increase after the first period.`,
      },
      {
        question: `How long does internet installation take in Germany?`,
        answer: `It depends on:
Provider
Building infrastructure
Appointment availability
New customers may need to wait several weeks.
Apply early when moving into a new apartment.`,
      },
      {
        question: `Can I use public Wi-Fi in Germany?`,
        answer: `Yes.
Available at:
Universities
Cafés
Libraries
Public places
However:
Avoid entering sensitive information on unsecured networks.`,
      },
      {
        question: `What is eduroam?`,
        answer: `Eduroam is an international university Wi-Fi network.
Students and researchers can use it at many universities worldwide with their university login.
It is especially useful for international students.`,
      },
      {
        question: `What apps are useful for students in Germany?`,
        answer: `Common useful apps:
Transport:
DB Navigator
Local transport apps
Communication:
WhatsApp
Signal
Banking:
Your bank's official app
Language:
Dictionary and translation apps
University:
University portals and learning platforms`,
      },
      {
        question: `What apps are useful for daily life in Marburg?`,
        answer: `Useful categories:
Transport:
Bus and train apps
Shopping:
Supermarket apps
Second-hand platforms
Navigation:
Google Maps
Other navigation services
Communication:
Messaging applications`,
      },
      {
        question: `How does online banking work in Germany?`,
        answer: `Online banking allows you to:
Check balance
Transfer money
Pay bills
Manage accounts
Most banks provide:
Mobile apps
Online portals
Digital notifications`,
      },
      {
        question: `Is online banking safe in Germany?`,
        answer: `Generally yes, if you follow security practices.
Important:
✅ Use official banking apps
✅ Never share passwords
✅ Enable two-factor authentication
✅ Avoid suspicious links
✅ Update devices regularly`,
      },
      {
        question: `What is two-factor authentication (2FA)?`,
        answer: `2FA adds an additional security step.
Example:
Enter password.
Confirm with mobile app or security code.
Many German banks require strong authentication.`,
      },
      {
        question: `What is GDPR and why is it important?`,
        answer: `GDPR (General Data Protection Regulation) is European data protection law.
It protects personal information such as:
Name
Address
Financial data
Health information
Online behaviour
Companies must handle personal data responsibly.`,
      },
      {
        question: `Can companies use my personal information freely?`,
        answer: `No.
Companies must follow data protection rules.
They generally need:
Legal reason
Consent where required
Secure handling of information`,
      },
      {
        question: `What should I do if I receive suspicious emails?`,
        answer: `Be careful with:
❌ Unknown attachments
❌ Fake bank messages
❌ Requests for passwords
❌ Urgent payment demands
Do not click suspicious links.`,
      },
      {
        question: `How can I identify online scams?`,
        answer: `Common warning signs:
Unrealistic offers
Pressure to act quickly
Requests for personal information
Poor language quality
Unknown senders
When unsure, verify through official channels.`,
      },
      {
        question: `What is ELSTER?`,
        answer: `ELSTER is the official online tax platform in Germany.
It allows users to manage certain tax-related processes digitally.
It is mainly used for:
Tax returns
Communication with tax authorities`,
      },
      {
        question: `What is BundID?`,
        answer: `BundID is a digital identity service for accessing some government online services.
It helps users authenticate themselves online.`,
      },
      {
        question: `Can I complete government procedures online?`,
        answer: `Increasingly, yes.
Some services are available digitally, including:
Tax services
Applications
Appointments
Document requests
However, some procedures still require physical visits.`,
      },
      {
        question: `How can international students manage university tasks online?`,
        answer: `Universities usually provide:
Student portals
Email accounts
Online course platforms
Examination registration systems
Students should regularly check university emails.`,
      },
      {
        question: `What is a German email etiquette for official communication?`,
        answer: `For official emails:
Use:
Clear subject line
Formal greeting
Short explanation
Attach documents properly
Professional ending
Avoid informal language with authorities or employers.`,
      },
      {
        question: `How can newcomers store important documents digitally?`,
        answer: `Recommended:
Scan documents
Use secure cloud storage
Keep encrypted backups
Organise folders
Important documents:
Passport copy
Residence permit
Insurance documents
Contracts
Certificates`,
      },
      {
        question: `What digital skills help with employment in Germany?`,
        answer: `Useful skills include:
Professional email writing
Microsoft Office
Online meeting tools
Digital applications
Data security awareness
Digital competence improves job opportunities.`,
      },
      {
        question: `How can Pakistanis in Marburg help newcomers digitally?`,
        answer: `Community support can include:
Helping set up digital services
Explaining German apps
Teaching online banking basics
Helping with university portals
Supporting elderly newcomers`,
      },
      {
        question: `What digital mistakes should newcomers avoid?`,
        answer: `Avoid:
❌ Sharing passwords
❌ Ignoring official emails
❌ Signing online contracts without reading
❌ Using unsafe websites for payments
❌ Giving personal data to unknown people`,
      },
    ],
    glossary: {
      title: `Useful Digital Vocabulary`,
      headers: [`German`, `English`],
      rows: [
        [`Internetanschluss`, `Internet connection`],
        [`Mobilfunkvertrag`, `Mobile contract`],
        [`Passwort`, `Password`],
        [`Datenschutz`, `Data protection`],
        [`Anmeldung`, `Registration`],
        [`Online-Banking`, `Online banking`],
        [`Rechnung`, `Bill/Invoice`],
        [`Vertrag`, `Contract`],
        [`Kündigung`, `Cancellation`],
        [`App`, `Application`],
      ],
    },
    sources: [
      `German Federal Office for Information Security (BSI)`,
      `Federal Commissioner for Data Protection`,
      `Consumer Advice Centres`,
      `Official government digital services`,
      `University IT services`,
    ],
  },
];
