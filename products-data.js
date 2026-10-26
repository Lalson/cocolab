/* CocoLabs product pages: the content of every product page lives here.
   To add a 4th product, add one entry and its key to ORDER, then run: node build-products.js
   youtube: the product's YouTube channel of demo videos; leave it out if there is none. */
var PRODUCTS={
 route:{
  key:'route',name:'CocoRoute',tag:'CRM FOR FREIGHT FORWARDERS',domain:'cocoroute.co',url:'https://cocoroute.co',youtube:'https://www.youtube.com/@cocoroute',
  menu:'Enquiries, quotes and customers in one place, for forwarding teams.',
  h1:'Every enquiry, quote and customer in one place.',
  lede:'CocoRoute is a CRM built for forwarding sales and operations teams. Enquiries arrive, quotes go out in minutes, follow-ups happen on time, and the manager can see the whole pipeline without asking.',
  audience:['Freight forwarders','NVOCCs','Customs brokers','Sales & ops teams'],
  preview:'pipeline',
  pains:[
   ['Enquiries live in WhatsApp and inboxes','One comes by WhatsApp, one by email, one by phone. A week later nobody can find the rate that was quoted.','One pipeline','Every enquiry becomes a card, from new to won, whichever way it came in. The history stays on the card.'],
   ['Quotes are retyped every time','Each quote starts from a blank sheet. Same lanes, same surcharges, typed again, with a different mistake each time.','Quotes in minutes','Pick the lane and the charges you saved last time. Send a clean PDF with your logo on it.'],
   ['Follow-ups depend on memory','The customer said “call me Thursday”. Thursday came and went. The shipment went to the forwarder who called.','Reminders that chase','A follow-up date on every enquiry. Today’s calls sit in one list until each one is done.'],
   ['The owner can’t see the pipeline','“How many quotes are open this week?” is answered by asking everyone in the office.','A live overview','Open quotes, what closed this month, and who has what, on one screen for the manager.']
  ],
  features:[
   ['pipeline','Enquiry pipeline','New, quoted, follow-up, won or lost. Drag a card and its history follows.','Each enquiry carries the customer, the route, the mode and every note the team left. Lost enquiries keep their reason, so you learn where business goes.','Sales · Manager'],
   ['quote','Quick quotes','Saved lanes and charges, a clean PDF, sent from the enquiry.','Build a quote from the last one on that lane. Surcharges, validity and terms come from your templates. The PDF carries your logo and lands in the customer’s inbox.','Sales'],
   ['person','Customer profiles','Every company with its contacts, past quotes and shipments.','Open a customer and see what they asked for, what you quoted, and who spoke to them last. New staff pick up an account without a handover meeting.','Sales · Operations'],
   ['bell','Follow-up reminders','Set a date on any enquiry. It nudges you until it is done.','A Today list shows every call due, overdue ones first. Reassign a follow-up when somebody is off; nothing waits for them to come back.','Sales'],
   ['chart','Team overview','Who has what, what is overdue, what closed this month.','The manager sees the pipeline by person and by stage, without a Monday meeting. Win rate and response time are counted, not guessed.','Manager · Owner'],
   ['memory','Rate memory','The last rate quoted on a lane, ready when the request returns.','When the same customer asks for the same route again, the previous quote is one click away, with its date, so you know how old it is.','Sales'],
   ['phone','Works on the phone','Update an enquiry from the port or the customer’s office.','Every screen works at 360px. Add an enquiry, move a card or log a call from wherever the conversation happened.','Everyone'],
   ['roles','Simple roles','Sales sees their own customers; the manager sees everyone.','No training needed. A person gets the screens their job needs and nothing else, and an account is set up in a minute.','Owner']
  ],
  roles:[
   ['SE','Sales executive','Enquiries, quotes, follow-ups',['Your enquiries and your Today list','Quotes out in minutes, from saved lanes','Every conversation logged on the customer']],
   ['OP','Operations','From enquiry to delivery',['The full history of a job before you pick it up','Customer contacts and terms in one profile','No chasing sales for the details']],
   ['MG','Owner or manager','The whole picture',['Open quotes and what closed, by person','Overdue follow-ups before they cost a customer','Numbers without a meeting']]
  ],
  day:[
   ['09:05','An enquiry arrives','By WhatsApp: 2 × 40ft, Jebel Ali to Mombasa. The sales exec adds it in thirty seconds.'],
   ['09:20','Quote sent','Built from last month’s quote on the same lane. The PDF is in the customer’s inbox.'],
   ['11:00','A reminder pops','Call Al Noor Trading about last week’s quote. Done, and noted on the card.'],
   ['15:40','Won','The card moves to Won. Operations opens it and finds everything they need.'],
   ['17:30','The owner looks','Fourteen open quotes, three won today, one follow-up overdue. No questions asked.']
  ],
  facts:[
   ['Made for the UAE','AED, the Dubai clock and the working week your office keeps.'],
   ['Your data stays yours','Each company’s customers and quotes are kept apart from every other company’s.'],
   ['Phone first','Every screen works at 360px, so it works at the port and in the customer’s office.'],
   ['Same-day start','Add your team, import your customer list, quote the same afternoon.']
  ],
  faq:[
   ['Is it only for sea freight?','No. Sea, air and land; the mode is a field on the enquiry, and a quote can carry more than one leg.'],
   ['Can I import my customer list?','Yes, from a spreadsheet. Companies, contacts and notes come in; duplicates are shown before they are saved.'],
   ['Does it replace my operations system?','No. CocoRoute runs the sales side: enquiries, quotes, customers and follow-ups. Operations and accounts keep their tools.'],
   ['Who sees what?','Each salesperson sees their own customers and enquiries. The manager sees everyone. You decide who else gets in.'],
   ['How is it priced?','Per user, per month. Book a demo and we will quote for your team size.']
  ]
 },
 mio:{
  key:'mio',name:'CocoMio',tag:'HR & LEARNING APP',domain:'cocomio.co',url:'https://cocomio.co',youtube:'https://www.youtube.com/@cocomio-me',
  menu:'Attendance, leave, learning and career growth, for HR teams and employees.',
  h1:'HR, learning and careers, in one app your team actually opens.',
  lede:'CocoMio is an employee portal and career academy for companies under a hundred people. Attendance, leave and documents on one side; courses, exams and a career ladder everyone can read on the other. Built first for a shipping company in Dubai and Abu Dhabi.',
  audience:['SMEs in the UAE','HR teams','Managers','Every employee'],
  preview:'punch',
  pains:[
   ['Attendance on paper and WhatsApp','Who came in, who was late, who is on leave: a register, a group chat and memory. Month-end takes days.','A punch clock with a geofence','In and out from the phone, only at the office. The month closes with one click and exports to payroll.'],
   ['A visa expires and nobody noticed','Passports, visas, Emirates IDs and contracts sit in a drawer. The reminder is the fine.','Documents that warn you','Every document with its date and its file. Reminders reach the employee and HR at 90, 60 and 30 days.'],
   ['Training is scattered','A procedure in a PDF, a voice note, a day of shadowing. Nobody can say who actually knows the process.','An Academy from your own documents','Lessons and question banks drafted from your procedures, reviewed by a person, then assigned by role.'],
   ['Promotion feels arbitrary','Employees don’t know what to learn or pass to reach the next level, so the good ones leave.','A career ladder everyone can read','Where I am, what I must learn, which exams, which level is next, what salary band, and how close I am.']
  ],
  features:[
   ['clock','Punch clock with geofence','Clock in from the phone, only inside the office’s radius.','Late, early and missing punches are flagged for HR. A punch that lands before someone’s joining date is flagged, never lost. Time follows the office: Dubai, Abu Dhabi or another country’s clock.','Employee · HR'],
   ['calendar','Leave and approvals','Request, approve, and see balances on the phone.','UAE statutory leave types come set up; the company adds its own. A leave type can be limited to one gender, and a manager approves from the same inbox as everything else.','Employee · Manager · HR'],
   ['file','Document expiry tracking','Visa, passport, Emirates ID, contract: date, file, reminders.','HR verifies each upload. Expiring documents appear on HR’s Today screen, and a company-issued document can have its date corrected with a reason on the trail.','HR'],
   ['lock','Month-end close and payroll export','Lock the month, unlock with a reason, export the sheet.','After the lock, records change only through an audited HR unlock, enforced in the database, not just on the screen. The export carries the columns Finance signed off.','HR · Finance'],
   ['book','The Academy','Courses built from your own procedures, with exams and certificates.','Read every lesson, sit the round, pass. Nobody is asked what nobody taught them. A pass creates a pending certificate that a named person approves; withdrawal keeps the record.','Everyone · Trainer'],
   ['ladder','Career ladder and promotion desk','Rungs with salary bands. Readiness is arithmetic; promotion is a decision.','The employee sees the same readiness score the desk sees. Passing never promotes and never pays by itself: management decides, with a written reason if it goes outside the band.','Employee · Management'],
   ['coins','My money','Salary history and “if I resigned today”, for every employee.','The gratuity arithmetic is shown in the open, per country’s rules. Salary rows are append-only; a mistake is retracted with a reason, never deleted.','Employee · Finance'],
   ['roles','Roles you name yourself','No fixed job titles. The company invents its own and ticks a permission matrix.','Scope a role to a branch, a department or a reporting tree. A new permission installs itself with sensible defaults, and every sensitive read leaves an audit row.','Admin']
  ],
  roles:[
   ['EM','Employee','On the phone, every day',['Punch, leave and documents in one place','Lessons, exams and certificates','“How close am I to the next level?” answered honestly']],
   ['MG','Manager','The team at a glance',['Attendance and lateness per office','Approvals waiting on you, in one inbox','Who is ready for the next rung']],
   ['HR','HR','What needs a person today',['Expiring documents and verifications','Month-end close and payroll export','The promotion desk and the HR desk messages']],
   ['AD','Founder or admin','The company, set up once',['Offices, shifts, holidays and policies','Roles, permissions and themes','A company page drawn from real reporting lines']]
  ],
  day:[
   ['08:58','Punch in','At the Jebel Ali office. The geofence confirms; the day begins.'],
   ['10:30','A reminder for HR','Rahul’s visa expires in 60 days. HR opens the renewal from the same screen.'],
   ['13:00','A lesson','Six minutes of reading from the company’s own Customs Clearance procedure.'],
   ['13:20','The round','Ten questions drawn from what was taught. Pass. A certificate waits for a named approver.'],
   ['17:00','My career moves','Readiness for Senior Coordinator: three of four met. The next step is named.']
  ],
  facts:[
   ['One database per company','With its own encryption key. Nobody else’s people are in it.'],
   ['Time follows the office','Dubai, Abu Dhabi or another country. Company-wide screens keep the company clock.'],
   ['Nothing is asked that nothing taught','Questions are drawn only from lessons the person actually read.'],
   ['Passing never pays automatically','Readiness is shown; management decides. Every decision leaves a record.'],
   ['Works at 360px','Every employee screen is designed for the phone first.'],
   ['Ten themes, all contrast-tested','A company picks its look; green still means done and red still means stopped.']
  ],
  faq:[
   ['Can we use it outside the UAE?','Yes. Each office carries its country, currency and working week, and end-of-service rules are set per country.'],
   ['Who writes the courses?','Your own documents are the source. Lessons and questions can be drafted from them, but a named person reviews and approves everything before any employee sees it.'],
   ['Can employees see each other’s salaries?','No. Money leaves the server only when asked for by name, and every reveal of somebody else’s pay is logged.'],
   ['Does it run payroll?','It closes the month and exports the sheet your payroll needs. Payroll itself stays in your existing tool.'],
   ['What if we have 200 people?','CocoMio is built for companies under a hundred. If you are larger, talk to us before deciding.']
  ]
 },
 trado:{
  key:'trado',name:'CocoTrado',tag:'TRADING ACCOUNTS',domain:'cocotrado.com',url:'https://cocotrado.com',youtube:'https://www.youtube.com/@cocotrado',
  menu:'Client money per currency and two-signature payments, for buying agents.',
  h1:'Prove how much of your client’s money is left, in every currency.',
  lede:'CocoTrado is for agents who buy goods on behalf of a client with the client’s money. It keeps one ledger per client per currency, needs two signatures to pay a supplier, and prints the statement your client actually reads.',
  audience:['Buying agents','Trading houses','Import agents','Finance teams'],
  preview:'balance',
  pains:[
   ['The balance lives in a spreadsheet','One sheet, one person who understands it, and a number the client has to take on trust.','One ledger per client per currency','Opening, received, paid, charges, fees, adjustments. The running balance is right at every line and never combined across currencies.'],
   ['Currencies get mixed','AED in, USD out, a rate remembered from that day. The statement adds things that should never be added.','Both sides of every payment','What left the client’s balance, what the supplier received, and the rate between them, stored on the row forever.'],
   ['One person can pay','The same person prepares and releases a supplier payment. The bank and the auditor both notice.','Maker and checker','Finance prepares, a different person approves. No role holds both, and the database refuses anything else.'],
   ['Statements are built by hand','Every month, an evening of copy and paste, and a figure nobody can reproduce later.','A statement in one click','A three-sheet Excel with live formulas and a PDF, per client, per period, archived so it reproduces exactly.']
  ],
  features:[
   ['coins','Balance per currency','Opening + received − paid − charges − fees ± adjustments. No grand total anywhere.','The ledger key is client and currency. Funds can be earmarked to a deal, and the dashboard shows what is free. A commitment in a currency the client does not hold is shown, not hidden.','Finance · Management'],
   ['box','Deals and documents','Each deal with its supplier, value, status and required documents.','Document types are yours to define; missing ones are flagged on the deal. Twelve states from draft to closed, every move with a reason and an actor.','Trade officer'],
   ['swap','Cross-currency payments','Account side, paid side, FX rate. Impossible to record half.','A payment stores what left the balance and what the supplier received. When the currencies differ, the rate is mandatory; when they match, it is fixed at one.','Finance maker'],
   ['sign','Two-signature payments','Maker prepares, approver releases. Admin holds neither.','The beneficiary is snapshotted at preparation, so anything that changes before approval is shown to the approver. Refunds need the same two signatures.','Finance maker · Finance approver'],
   ['receipt','Fees with the working shown','Commission rules you configure; every line prints its derivation.','Fixed, percentage, volume, tiered or manual. Rules are versioned, so a rate change today never moves a fee posted last month.','Admin · Finance'],
   ['sheet','Client statements','Excel with real formulas and a PDF, every export archived.','One block per currency, never summed. Totals are formulas against the transaction sheet, so the client can check the arithmetic themselves.','Everyone who sends statements'],
   ['shield','Compliance review','KYC per party, a review per trade, gates that block money.','Only Compliance clears or rejects a case; an Admin cannot lift their own hold. A gate that is not built yet reports as unknown, never as passed.','Compliance'],
   ['undo','No silent edits','Amend by reversal, correct by adjustment, never delete.','An entry on a sent statement is locked and shows why. Everything else is reversed and reposted, so the ledger reads original, reversal, replacement.','Everyone']
  ],
  roles:[
   ['TO','Trade officer','Deals and quotes',['Deals, documents and quotes','The deal’s status and what blocks it','Statements when the client asks']],
   ['FM','Finance maker','The first signature',['Record funds received','Prepare payments and refunds','Enter the bank’s actual rate and charges']],
   ['FA','Finance approver','The second signature',['Check the beneficiary against the snapshot','Release or reject, with a reason','Never prepare what you approve']],
   ['CO','Compliance','The hold nobody else lifts',['KYC and source of funds per party','The review with four outcomes','Expiring identity documents']],
   ['MG','Management','Your own earnings',['Revenue and margin in a reporting currency','Kept apart from client money, always','Activity log for every action']]
  ],
  day:[
   ['09:00','Funds arrive','USD 150,000 from the client, matched to a deal and a bank reference.'],
   ['10:15','Compliance clears the trade','KYC current, source of funds recorded. The gate opens.'],
   ['11:00','A payment is prepared','USD 87,552 to the supplier in India. The beneficiary details are snapshotted.'],
   ['11:40','Released','The approver checks the beneficiary and signs. The ledger posts what left the balance.'],
   ['16:00','The statement','Three sheets, one balance per currency, archived, sent to the client.']
  ],
  facts:[
   ['Isolation enforced by the database','Row-level security on every table; a forgotten filter fails closed.'],
   ['Money is never a float','Amounts to four decimals, rates to eight, rounded only at display.'],
   ['Every statement is archived','With a snapshot, so a figure sent last year reproduces exactly.'],
   ['Clients never log in','They receive the statement. There is no client portal, by design.'],
   ['Nothing is hardcoded','Currencies, suppliers, fee rules, document types and numbering are yours.'],
   ['930 automated checks','Run against a database built from nothing before every deploy.']
  ],
  faq:[
   ['Is this accounting software?','No. It is the custody ledger for money you hold for clients. Your own books stay in your accounting tool.'],
   ['Can my client log in?','No, by design. Clients receive the statement, in Excel and PDF, and never see the application.'],
   ['We don’t trade coffee. Does it matter?','No. Nothing is hardcoded: currencies, suppliers, fee rules, document types and deal numbering are configured by your Admin.'],
   ['Can I correct a mistake?','Yes: by reversal, or by an adjustment with a reason that appears on the statement. Nothing is ever deleted.'],
   ['How do we start?','Run one month alongside your existing spreadsheet and reconcile the closing balance per client per currency. Then switch.']
  ]
 }
};
var ORDER=['route','mio','trado'];
module.exports={PRODUCTS:PRODUCTS,ORDER:ORDER};
