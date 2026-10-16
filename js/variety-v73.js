/* TOEIC Trainer V7.3 — editorial variety; pure helpers, no persistence mutation. */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.ToeicTrainerVarietyV73=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
// 728 distinct manually authored contextual examples, not a POS-tag template generator.
const EXAMPLE_ROWS=`
accommodation|The airline arranged accessible accommodation for the delayed passengers.
address|The director will address concerns raised during the safety inspection.
accessible|All employees need an accessible entrance to the renovated building.
accurately|Please record each shipment's weight accurately before dispatch.
accomplishment|Completing the expansion ahead of schedule was a major accomplishment.
administer|The training coordinator will administer the certification examination.
accurate|An accurate inventory count helps prevent expensive ordering mistakes.
actively|Local retailers are actively recruiting bilingual customer-service staff.
accuracy|The accountant checked the accuracy of the annual sales figures.
adopt|Several branches plan to adopt the new reservation system in November.
adequate|The meeting room has adequate seating for thirty participants.
accordingly|The delivery was postponed, and the travel itinerary was revised accordingly.
access|Temporary employees may request access to the shared calendar.
amend|The legal department must amend the contract before both parties sign it.
administrative|Administrative staff will process the reimbursement claims on Friday.
annually|The company reviews its workplace safety policy annually.
accountability|The revised approval process improves accountability across departments.
announce|Management will announce the successful applicants after the interviews.
annual|The annual budget includes funds for customer-service training.
approximately|The updated report is approximately forty pages long.
administrator|A system administrator can reset a locked employee account.
answer|Please answer the client's inquiry before the office closes.
appropriate|Business attire is appropriate for the annual shareholder meeting.
carefully|Read the cancellation policy carefully before confirming the reservation.
affiliation|Applicants must disclose any affiliation with competing suppliers.
anticipate|We anticipate higher demand during the holiday travel season.
applicable|The discount is available only when the stated conditions are applicable.
clearly|The invoice should clearly identify the payment deadline.
announcement|The airport posted an announcement about the revised boarding gates.
appoint|The board will appoint a new regional director next month.
beneficial|Flexible check-in times would be beneficial to business travelers.
closely|The supervisor will closely monitor the manufacturing schedule.
appendix|Detailed pricing tables appear in the appendix to the proposal.
arrange|Please arrange a taxi for the visiting consultant.
binding|Both parties signed a binding agreement after negotiations concluded.
collectively|The project managers collectively approved the revised timetable.
appointment|I have scheduled an appointment with the recruitment officer.
assemble|The coordinator will assemble a team to investigate the outage.
capable|The new scanner is capable of handling larger packages.
completely|The technical team completely restored the booking system by noon.
architecture|The software architecture allows departments to share data securely.
assign|The supervisor will assign a technician to each inspection site.
clear|A clear refund policy reduces disputes with customers.
consistently|Our delivery partner has consistently met its weekly deadlines.
archive|Older contracts are stored in a secure digital archive.
assist|Please assist visitors who need help with the registration kiosk.
collaborative|A collaborative approach helped the teams resolve the supply problem.
currently|The south elevator is currently unavailable for maintenance.
arrangement|We made a temporary arrangement for employees working remotely.
attend|Employees must attend the updated workplace safety briefing.
comprehensive|The auditor submitted a comprehensive review of the financial controls.
directly|Guests can contact the hotel manager directly about accessibility needs.
assembly|The product assembly line will be inspected on Wednesday.
brief|The manager will brief the sales representatives before the launch.
confidential|Customer payment records must remain confidential.
effectively|The revised schedule allows staff to coordinate deliveries more effectively.
asset|The warehouse building is the company's largest physical asset.
calculate|Please calculate the total cost before approving the purchase order.
consistent|The two branches should use consistent procedures for refunds.
efficiently|Automated reminders help the reception team work more efficiently.
assignment|The new employee received an assignment in the finance department.
clarify|Could you clarify whether the quoted price includes installation?
constructive|The committee welcomed constructive feedback on the proposed changes.
eventually|The replacement parts eventually arrived after the customs delay.
assistance|Contact the help desk if you require technical assistance.
classify|Warehouse staff classify returned items by condition.
convenient|The new pickup location is more convenient for commuters.
exclusively|This meeting room is reserved exclusively for training sessions.
attachment|Please review the price list in the email attachment.
collaborate|The design and marketing teams will collaborate on the campaign.
corporate|Corporate clients can request a separate billing statement.
extensively|The revised software was tested extensively before release.
attendance|Attendance at the mandatory briefing will be recorded.
collect|Please collect your visitor badge at reception.
critical|Reliable internet access is critical to the remote support team.
formally|The committee formally approved the expansion proposal.
auditor|The external auditor requested receipts for last quarter.
combine|The revised schedule will combine the two training sessions.
current|Please confirm that your current mailing address is correct.
fully|The conference hall was fully booked two weeks in advance.
authority|Only the finance director has authority to approve this expense.
communicate|The supervisor will communicate the policy changes by email.
dedicated|A dedicated support desk will serve conference attendees.
immediately|Please report any missing equipment immediately.
automation|Automation reduced the time required to prepare monthly reports.
compile|The analyst will compile survey responses into a summary.
detailed|The contractor submitted a detailed estimate for the renovation.
independently|Each reviewer must assess the proposal independently.
badge|Show your identification badge when entering the laboratory.
complete|All applicants must complete the online form by Friday.
digital|The museum now accepts digital tickets at the entrance.
initially|The workshop was initially scheduled for Monday morning.
benchmark|Last year's sales figures provide a benchmark for the new forecast.
conclude|The committee expects to conclude negotiations before the holiday.
direct|The hotel provides a direct shuttle to the conference center.
internally|The revised procedure was reviewed internally before publication.
branch|Our Taipei branch will open an additional customer-service desk.
conduct|Technicians will conduct a safety inspection on Thursday.
effective|The new security procedure becomes effective on November first.
jointly|The two departments jointly developed the updated onboarding plan.
briefing|The safety briefing begins fifteen minutes before the plant tour.
connect|The technician will connect the printer to the company network.
efficient|An efficient approval process reduces delays for new suppliers.
largely|The increase in expenses was largely due to higher shipping costs.
bulletin|The updated timetable is posted on the staff bulletin board.
consider|The board will consider three possible locations for the new office.
essential|A valid passport is essential for international travel.
mainly|The seminar is intended mainly for newly appointed supervisors.
cabinet|Archived personnel records are kept in a locked cabinet.
consult|Please consult the travel coordinator before changing your itinerary.
exclusive|Members receive exclusive access to the annual product preview.
manually|Staff must enter the older receipts manually during migration.
calendar|The shared calendar shows all available meeting rooms.
correct|The accountant will correct the invoice before sending it.
experienced|An experienced technician will lead the equipment demonstration.
mutually|The two suppliers agreed to a mutually acceptable delivery date.
capacity|The venue has a maximum seating capacity of eighty guests.
create|The designer will create a revised brochure for the conference.
external|External contractors must sign in before entering the site.
normally|The reception desk normally closes at six in the evening.
certificate|Participants will receive a certificate after passing the examination.
decide|The hiring panel will decide which candidates advance to interviews.
feasible|A shorter construction schedule may not be feasible during winter.
officially|The regional office officially opened on Monday.
chairperson|The chairperson called the meeting to order at nine.
delegate|The manager will delegate routine purchasing decisions to assistants.
flexible|Flexible working hours are available to eligible employees.
originally|The delivery was originally expected on Wednesday.
checklist|Use the inspection checklist before handing over the equipment.
demonstrate|The technician will demonstrate the new booking application.
formal|We need formal approval before signing the lease.
partially|The warehouse was partially closed after the electrical failure.
clerk|The front-desk clerk checked the guest's reservation details.
describe|Please describe the damage in the online claim form.
frequent|Frequent schedule changes have confused the shuttle drivers.
periodically|The security system is tested periodically throughout the year.
committee|The committee reviewed the proposed training budget.
design|Engineers will design a more accessible entrance to the building.
general|The general manager will attend the staff orientation.
precisely|The invoice specifies precisely when payment is due.
communication|Clear communication helps prevent delivery mistakes.
determine|The survey will determine whether customers prefer weekend hours.
immediate|An immediate response is required if a data breach is suspected.
previously|The room was previously reserved for another group.
compliance|The legal team monitors compliance with privacy regulations.
develop|The company plans to develop a new mobile reservation service.
inclusive|The recruitment policy is intended to create a more inclusive workplace.
primarily|The new training program is designed primarily for supervisors.
confidentiality|All interviewers must protect the confidentiality of applications.
discuss|The sales team will discuss the revised pricing strategy.
independent|An independent consultant reviewed the safety procedure.
promptly|Please return the completed application promptly.
consistency|The training manual promotes consistency across branches.
distribute|Staff will distribute updated timetables at reception.
initial|The initial cost estimate did not include shipping.
properly|All electrical equipment must be properly inspected before use.
consultation|A free consultation is available before customers sign a service contract.
emphasize|The trainer will emphasize the importance of accurate records.
innovative|The startup presented an innovative inventory tracking tool.
publicly|The company publicly announced the partnership on Thursday.
contact|The primary contact for the seminar is the events coordinator.
enable|The new dashboard will enable managers to track late shipments.
internal|An internal review identified errors in several invoices.
recently|The hotel recently renovated its conference rooms.
contribution|The design team's contribution made the launch possible.
encourage|Managers encourage staff to report near misses promptly.
measurable|The project needs measurable targets for reducing waste.
regularly|Fire extinguishers are inspected regularly by qualified staff.
convenience|For your convenience, receipts can be downloaded online.
enforce|Security guards will enforce the revised visitor policy.
mutual|A mutual agreement allowed both companies to amend the contract.
reliably|The new printer operates reliably even during busy periods.
cooperation|The successful event depended on cooperation among volunteers.
enhance|Additional lighting will enhance safety in the parking garage.
necessary|A deposit is necessary to confirm the reservation.
respectively|The two sessions begin at nine and eleven, respectively.
correspondence|Please retain copies of all correspondence with the supplier.
ensure|The supervisor will ensure that each form is signed.
official|Only the official website lists the latest examination dates.
roughly|The renovation will take roughly three weeks to complete.
credential|Employees need a valid credential to access the database.
establish|The parties hope to establish a long-term supply agreement.
optional|The afternoon networking session is optional for attendees.
securely|Store the signed agreement securely in the client folder.
criterion|Relevant work experience is one criterion in the hiring process.
evaluate|The panel will evaluate each proposal against the published criteria.
original|Please retain the original receipt for reimbursement.
separately|Travel and lodging costs must be reported separately.
curriculum|The updated curriculum includes practical workplace scenarios.
examine|Inspectors will examine the electrical system before reopening.
overall|The overall cost has decreased since the first estimate.
significantly|The new software significantly reduced manual data entry.
database|Customer addresses are stored in an encrypted database.
execute|The operations team will execute the revised delivery plan.
particular|This discount applies only to a particular category of products.
simultaneously|Two workshops will run simultaneously in adjacent rooms.
decision|The committee will announce its final decision by Friday.
explain|The trainer will explain how the updated claims process works.
pending|The permit application is still pending review.
specifically|The notice specifically excludes weekend deliveries.
delegation|The visiting delegation will tour the headquarters after lunch.
finalize|The organizers must finalize the guest list today.
periodic|Periodic maintenance helps prevent equipment failures.
strategically|The company strategically expanded into smaller regional markets.
demonstration|The demonstration showed how to submit an online claim.
formulate|The planning team will formulate a response to the survey findings.
permanent|A permanent repair is scheduled after the temporary closure.
successfully|The system was successfully restored before business hours.

designation|The designation of a fire-safety officer is required for every branch.
gather|Staff will gather feedback after the pilot training session.
practical|The workshop offers practical guidance on handling customer complaints.
sufficiently|The package must be sufficiently protected to survive overseas shipping.
desk|Leave the signed visitor forms on the reception desk.
identify|Inspectors could not identify the source of the unusual noise.
preliminary|A preliminary estimate will be ready before the full inspection.
temporarily|The booking system is temporarily unavailable during maintenance.
directory|The employee directory lists extension numbers for each department.
illustrate|The graph will illustrate changes in monthly electricity consumption.
previous|The previous supplier failed to meet several delivery deadlines.
thoroughly|Engineers thoroughly tested the revised safety mechanism.
disclosure|The contract requires disclosure of any conflicts of interest.
improve|Customer feedback helped improve the online payment process.
primary|Reducing late deliveries is the primary goal of the logistics team.
typically|The finance team typically closes its monthly accounts on Friday.
discussion|The board postponed the discussion until the auditor arrived.
inform|Please inform the hotel if your arrival time changes.
professional|A professional interpreter will assist during the client meeting.
ultimately|The committee ultimately selected the proposal with lower maintenance costs.
distribution|The distribution of emergency supplies began after the storm.
initiate|Only the account owner can initiate an international transfer.
prompt|A prompt response prevented the customer from canceling the order.
unanimously|The directors unanimously approved the updated workplace policy.
document|Attach the signed document to your reimbursement request.
inspect|A technician will inspect the elevators before the building reopens.
provisional|The provisional schedule may change after the venue confirms availability.
urgently|The hospital urgently requested another shipment of protective equipment.
draft|Please review the draft before the announcement is published.
instruct|Supervisors must instruct new staff on the evacuation procedure.
public|The public consultation on the transport proposal closes next Monday.
virtually|The new platform allows clients to attend the seminar virtually.
efficiency|Automated reminders have improved the efficiency of appointment scheduling.
integrate|The software team will integrate the payment system with the customer portal.
punctual|A punctual shuttle service is essential for travelers with connecting flights.
enclosure|The enclosed invoice is listed as an enclosure in the cover letter.
introduce|The company will introduce an online returns service next quarter.
reasonable|The supplier offered a reasonable discount for the delayed shipment.
equipment|All equipment must be disconnected before technicians start repairs.
investigate|The security team will investigate the reported data breach.
recurring|A recurring error caused several customer invoices to be duplicated.
evaluation|The evaluation compared energy costs across four factory sites.
justify|The manager must justify any spending above the approved budget.
relevant|Include only relevant work experience in your application.
exception|An exception may be granted to employees with urgent medical appointments.
manage|The operations director will manage the relocation of the warehouse.
remote|Remote employees can access the training materials through a secure portal.
exhibition|The exhibition will remain open to ticket holders until Sunday.
monitor|Quality inspectors monitor production temperatures throughout each shift.
required|A government-issued ID is required to collect the package.
expertise|The contractor was hired for her expertise in electrical installations.
organize|Volunteers will organize the donated books by age group.
respective|The two departments submitted their respective budget forecasts.
feedback|Participants can provide anonymous feedback after the seminar.
oversee|A senior engineer will oversee the installation of the new ventilation system.
responsible|The facilities team is responsible for issuing building access cards.
filing|Electronic filing reduced the time needed to locate old contracts.
participate|Customers may participate in the product trial without paying a fee.
restricted|Access to the laboratory is restricted to authorized technicians.
guideline|The updated guideline explains how to report workplace injuries.
perform|Trained staff will perform the final inspection on Thursday.
routine|A routine audit revealed an error in the supplier records.
headquarters|The marketing team will present its campaign at company headquarters.
prepare|Please prepare an itemized cost estimate for the renovation.
secure|Use a secure connection when uploading confidential documents.
identification|Passengers must show identification when collecting lost baggage.
present|The analyst will present the quarterly results to investors.
separate|Keep personal and business expenses in separate accounts.
implementation|The implementation of the new payroll system begins in January.
prioritize|The repair team will prioritize equipment affecting passenger safety.
significant|The new route has produced significant savings in fuel costs.
initiative|The recycling initiative has attracted support from local retailers.
process|The bank will process refund requests within five business days.
similar|The two proposals offer similar features but different warranties.
instruction|Follow each instruction carefully when resetting the device.
provide|The airline will provide accommodation if the flight is canceled overnight.
standard|The hotel offers a standard check-in time of 3 p.m.
integration|Integration with the inventory database will reduce duplicate orders.
publish|The agency will publish the inspection results on its website.
strategic|Opening a regional office is part of the company's strategic expansion.
interpretation|The lawyer offered a different interpretation of the cancellation clause.
recommend|The consultant will recommend changes after reviewing the sales figures.
substantial|The company made a substantial investment in renewable energy.
invitation|Each speaker received an invitation to the annual research forum.
recruit|The clinic plans to recruit additional nurses before winter.
suitable|The proposed room is not suitable for a group of fifty attendees.
jurisdiction|The dispute falls within the jurisdiction of the local commercial court.
refer|The receptionist will refer billing questions to the finance department.
thorough|A thorough examination found damage beneath the machine's outer casing.
leadership|The course focuses on leadership during periods of rapid growth.
register|Visitors must register at the front desk before entering the factory.
timely|Timely notification allows the supplier to change its delivery schedule.
liaison|The project liaison will coordinate updates between the two companies.
regulate|New rules regulate the storage of hazardous materials on site.
transparent|A transparent refund policy helps customers understand their options.
manual|The maintenance manual includes a diagram of the safety switch.
remind|Please remind the contractor about tomorrow's security briefing.
urgent|The manager requested an urgent replacement for the broken refrigerator.
memorandum|The chief executive circulated a memorandum explaining the new policy.
replace|The vendor will replace defective parts at no additional charge.
valid|Discount vouchers remain valid until the end of December.
minutes|The committee secretary distributed the meeting minutes the next morning.
report|Employees should report safety hazards to their supervisor immediately.
valuable|The customer survey provided valuable insight into booking preferences.
notification|A notification will appear once the refund has been approved.
resolve|The technician managed to resolve the network issue before noon.
voluntary|Participation in the lunchtime language class is voluntary.
objective|The project's objective is to shorten airport security queues.
respond|The customer-service team will respond to written inquiries within two days.
orientation|New employees must attend an orientation before their first shift.
retrieve|The librarian can retrieve the archived documents upon request.
outcome|The final outcome of the negotiations will be announced on Friday.
revise|The editor will revise the brochure to reflect the new prices.
outline|The proposal includes an outline of the planned research activities.
review|An independent auditor will review the annual accounts.
overview|The first page provides an overview of the revised benefits package.
select|Applicants may select one interview time from the available slots.
participant|Each participant will receive a certificate after completing the workshop.
share|Departments can share meeting rooms through the booking system.
permission|Written permission is needed before photographs can be published.
sign|The tenant must sign the lease before receiving the office keys.
personnel|Authorized personnel may enter the storage area after hours.
specify|Please specify the quantity and preferred delivery date on the order form.
priority|Restoring the hospital's power supply is the team's highest priority.
suggest|The survey results suggest that customers prefer shorter checkout times.
protocol|The security protocol requires two people to authorize large transfers.
summarize|Please summarize the key findings in no more than two paragraphs.
qualification|A teaching qualification is necessary for this training position.
supervise|Experienced technicians will supervise the apprentices during installation.
questionnaire|The questionnaire asks travelers about their experience at the airport.
validate|The database will validate each registration number before accepting it.
recommendation|The committee accepted the auditor's recommendation to revise the process.
record|Keep a written record of every maintenance visit.
reference|The report includes a reference to the current safety regulation.
registration|Online registration for the conference closes on Tuesday.
regulation|The new regulation applies to all commercial delivery vehicles.
representative|A customer-service representative will meet guests at the airport.
resolution|The board passed a resolution approving the expansion plan.
resource|The digital library is a useful resource for trainee accountants.
responsibility|Responsibility for the damaged goods remains with the carrier.
restriction|The new parking restriction applies only during business hours.
revision|A revision to the contract clarified who would pay for installation.
roster|The shift roster will be posted in the staff room on Thursday.
seminar|The university will host a seminar on consumer protection.
signature|The application is incomplete without the applicant's signature.
specification|The supplier must confirm each technical specification in writing.
stakeholder|Every stakeholder was invited to comment on the proposal.
stationery|The office orders stationery in bulk every three months.
strategy|The retailer's pricing strategy aims to attract repeat customers.
summary|The financial summary highlights three areas of unexpected spending.
supervisor|A supervisor must approve overtime before employees work late.
survey|The survey found strong demand for an evening shuttle service.
template|Use the approved template when submitting a travel expense claim.
termination|Early termination of the service contract may incur a fee.
timeline|The project timeline leaves two weeks for quality testing.
training|New drivers receive safety training before operating delivery trucks.
transcript|A transcript of the interview will be available to the selection committee.
transparency|Publishing the selection criteria would improve transparency.
update|The airline issued an update about the delayed flight.
verification|Identity verification must be completed before funds are released.
workload|The revised schedule distributes the workload more evenly across teams.
workshop|Participants will practice negotiating contracts during the workshop.
affordable|The new subscription offers affordable access to professional design tools.
competitive|The company reduced shipping fees to remain competitive in regional markets.
complementary|The two services provide complementary benefits for small businesses.
compliant|All imported products must be compliant with national safety standards.
costly|A costly equipment failure forced the factory to suspend production.
customized|Clients can request a customized training program for their employees.
diverse|The retailer offers a diverse selection of locally made products.
durable|The manufacturer uses durable materials to extend product life.
economical|Buying supplies in larger quantities is often more economical.
environmental|The factory commissioned an environmental assessment before expanding.
financial|The bank requested additional financial information from the applicant.
global|The exhibition attracted buyers from across the global furniture industry.
industrial|An industrial supplier will install the warehouse's new conveyor system.
international|International orders require additional customs documentation.
local|The restaurant purchases most vegetables from local farms.
lucrative|The exclusive licensing agreement became a lucrative source of revenue.
operational|Operational costs increased after the company opened a second warehouse.
profitable|The seasonal product line remained profitable despite higher freight costs.
promotional|Promotional prices are available to members through Sunday.
prospective|Prospective tenants may tour the offices before signing a lease.
refundable|The hotel requires a refundable deposit for group reservations.
regional|A regional distributor will handle deliveries to smaller towns.
renewable|The new facility obtains most of its electricity from renewable sources.
scalable|The retailer chose a scalable platform that could support future growth.
seasonal|Seasonal employees receive their work schedules one week in advance.
advertise|The company plans to advertise its new service on commuter trains.
bid|Three construction firms will bid for the station renovation contract.
broaden|The partnership will broaden the brand's access to overseas customers.
commercialize|The startup aims to commercialize its prototype next spring.
compete|Smaller retailers struggle to compete with large online marketplaces.
convert|The hotel will convert an unused meeting room into a guest lounge.
deliver|The courier promised to deliver the replacement parts by noon.
discontinue|The manufacturer will discontinue the outdated model in December.
expand|The company intends to expand its delivery network into rural areas.
export|The factory expects to export most of its new products to Europe.
fulfill|The supplier needs additional staff to fulfill its holiday orders.
import|The distributor plans to import specialty coffee from Central America.
innovate|Companies must innovate to respond to changing customer expectations.
manufacture|The plant will manufacture electric motors for commercial vehicles.
market|The agency will market the resort primarily to business travelers.
merge|The two logistics firms plan to merge their regional operations.
outsource|The retailer decided to outsource its overnight customer support.
package|Workers package fragile components in reinforced cardboard boxes.
partner|The nonprofit will partner with local restaurants for the fundraiser.
promote|The campaign will promote the company's new recycling program.
quote|The contractor will quote separate prices for installation and maintenance.
rebrand|The chain intends to rebrand several older stores next year.
relocate|The publisher will relocate its distribution center closer to the port.
renew|The tenant must renew the warehouse lease before September.
resell|Authorized dealers may resell the product under the manufacturer's warranty.
restructure|The board voted to restructure the company's overseas subsidiaries.
sell|The retailer plans to sell refurbished laptops through its website.
source|The purchasing team will source replacement materials from certified vendors.
sponsor|A regional bank agreed to sponsor the career-development fair.
strategize|Managers will strategize about entering a new market during the retreat.
transport|Specialized trucks will transport the machinery to the new facility.
accessory|The camera accessory is sold separately from the main device.
advertisement|The online advertisement incorrectly listed last year's membership fee.
affiliate|A local affiliate will manage customer inquiries in the region.
agency|The travel agency arranged replacement flights for stranded passengers.
alternative|Customers may choose a cheaper alternative if the item is unavailable.
analysis|The sales analysis revealed a sharp increase in weekend orders.
approach|The company adopted a different approach to training new supervisors.
assortment|The winter assortment includes jackets, gloves and waterproof footwear.
auction|Several used delivery vehicles were sold at a public auction.
backlog|The repair center hired temporary staff to reduce its backlog.
barrier|High installation costs remain a barrier to adopting the technology.
brand|The retailer launched a new brand of environmentally friendly detergents.
brokerage|The brokerage charges a fixed fee for each completed transaction.
campaign|The holiday advertising campaign begins in early November.
catalogue|The updated catalogue lists dimensions and prices for every model.
channel|The company opened an additional sales channel through its mobile app.
client|The consultant sent the client a revised cost estimate.
collaboration|Collaboration between the design and logistics teams shortened delivery times.
competitor|A major competitor announced a similar service at a lower price.
consignment|The gallery accepted the paintings on consignment rather than purchasing them.
consultant|An independent consultant reviewed the business expansion plan.
consumption|Electricity consumption fell after the factory installed more efficient motors.
contract|The contract requires written notice thirty days before cancellation.
conversion|The conversion of the warehouse into offices will begin in June.
corporation|The corporation approved a dividend at its annual shareholder meeting.
customer|The customer requested a refund after receiving the wrong color.
demand|Demand for hotel rooms rises during the annual technology conference.
demographic|The survey examined the demographic characteristics of frequent travelers.
discount|Members receive a ten percent discount on weekend workshops.
distributor|The distributor agreed to maintain spare parts for three years.
diversification|Product diversification helped the manufacturer enter new markets.
domain|Cybersecurity has become an important domain of corporate risk management.
enterprise|The small enterprise now employs more than forty local residents.
entrepreneur|The entrepreneur presented a plan to launch an online repair service.
establishment|The new establishment must obtain a food-service permit before opening.
expansion|The expansion will double the factory's storage capacity.
exposure|Social media coverage gave the new restaurant valuable exposure.
feasibility|Engineers are studying the feasibility of installing solar panels.
franchise|The family opened a franchise of a popular bakery chain.
fulfillment|Order fulfillment slowed while the inventory system was offline.
incentive|An early-payment incentive encouraged customers to settle their invoices.
industry|The hospitality industry is hiring additional workers before summer.
infrastructure|Improved transport infrastructure reduced shipping times to the port.
innovation|The company invested in innovation to lower packaging waste.
insight|Customer interviews provided insight into problems with online checkout.
launch|The product launch was delayed until the safety tests were complete.
licensing|The agreement permits licensing of the software to regional distributors.
marketplace|The online marketplace verifies sellers before allowing new listings.
membership|An annual membership includes access to the conference recordings.
merchandise|Damaged merchandise must be reported within seven days of delivery.
milestone|Opening the third branch was an important milestone for the company.
negotiation|The negotiation focused on payment terms and delivery responsibilities.
niche|The startup found a niche in providing software for independent hotels.
operation|The ferry operation will resume after the harbor inspection.
order|The customer changed the order before the products were shipped.
outlet|The retailer opened an outlet near the train station.
partnership|The partnership allows both companies to share distribution facilities.
patent|The inventor applied for a patent on the new cooling mechanism.
performance|Employee performance is evaluated using several measurable criteria.
placement|The advertisement placement was moved to the newspaper's business section.
platform|The booking platform now supports payments in three currencies.
positioning|The campaign's positioning emphasizes quality rather than low price.
pricing|Transparent pricing helped the service attract new subscribers.
procurement|The procurement department requested written quotations from four vendors.
productivity|New equipment improved productivity without increasing overtime.
promotion|The store's opening promotion offers free delivery to nearby customers.
prospect|The sales representative contacted a prospect who attended the trade fair.
publicity|The unexpected award generated valuable publicity for the manufacturer.
quota|The sales team exceeded its quarterly quota by fifteen percent.
retailer|The retailer extended its return period during the holiday season.
retention|Better onboarding programs improved employee retention.
reputation|The company's reputation suffered after repeated late deliveries.
research|Market research suggested strong demand for more flexible subscriptions.
reseller|The reseller must honor the manufacturer's published warranty.
retail|The company plans to enter retail through a small network of stores.
segment|The firm identified a growing segment of customers who work remotely.
service|The repair service operates six days a week.
sponsorship|Corporate sponsorship will cover the conference venue costs.
startup|The startup secured funding for its first commercial production run.
stock|The warehouse has enough stock to meet expected holiday demand.
subsidiary|The overseas subsidiary will publish its own annual report.
supplier|The supplier offered to replace damaged goods without charging shipping.
supply|An interruption in water supply forced the factory to close early.
target|The new campaign's target is small companies with fewer than ten employees.
tender|The public tender requires bidders to submit safety certificates.
trade|The trade agreement reduced tariffs on several agricultural products.
trademark|The company's trademark appears on every official product label.
trend|The latest industry trend favors reusable packaging materials.
turnover|Annual turnover rose after the chain opened five new stores.
utility|The regional utility announced scheduled maintenance of the power network.
vendor|Each vendor must provide proof of insurance before installation.
volume|The shipping volume increased sharply during the holiday season.
wholesale|The company offers wholesale prices to approved restaurant operators.
accrue|Interest will accrue daily until the outstanding loan is repaid.
approve|The finance director must approve expenses above five thousand dollars.
borrow|The company plans to borrow funds to purchase new machinery.
compensate|The airline agreed to compensate passengers for the canceled flight.
consolidate|The accountant will consolidate the accounts of three overseas branches.
deduct|The employer will deduct the insurance premium from monthly pay.
defer|The bank agreed to defer the first loan payment until January.
disburse|The agency will disburse grants after receiving the signed agreements.
diversify|The investment manager recommended that the client diversify her holdings.
exchange|Travelers can exchange foreign currency at the airport counter.
exceed|The repair bill must not exceed the approved budget.
finance|The company will finance the expansion through a long-term loan.
fund|A charitable foundation agreed to fund the training program.
insure|The shipping company will insure all valuable cargo against damage.
invest|The pension fund plans to invest more heavily in infrastructure.
lend|The credit union may lend to applicants with sufficient income.
liquidate|The company may liquidate unused assets to improve cash flow.
offset|Higher online sales helped offset losses at physical stores.
pay|Customers can pay the invoice by bank transfer or credit card.
reconcile|The accounts team will reconcile bank statements every Friday.
redeem|Members can redeem reward points for travel vouchers.
repay|The borrower must repay the remaining principal by June.
settle|The retailer agreed to settle the outstanding invoice within thirty days.
subsidize|The government will subsidize energy-saving upgrades for small businesses.
value|Independent experts will value the property before the sale.
withdraw|Account holders may withdraw cash from the designated machines.
account|A business account is required to receive overseas customer payments.
accountant|The accountant discovered a discrepancy between the invoice and purchase order.
acquisition|The acquisition of a smaller rival expanded the bank's branch network.
allocation|The budget allocation for cybersecurity increased this year.
allowance|Employees receive a daily meal allowance during overseas assignments.
amortization|The loan's amortization schedule shows the principal paid each month.
appraisal|The bank ordered a property appraisal before approving the mortgage.
arrears|The tenant must clear rent arrears before renewing the lease.
audit|The external audit will begin after the annual statements are finalized.
balance|The account balance reflects deposits received before the close of business.
bankruptcy|The retailer filed for bankruptcy after several quarters of losses.
beneficiary|The insurance beneficiary must submit identification before payment.
billing|Automatic billing will begin after the free trial ends.
bond|The company issued a five-year bond to raise expansion capital.
borrowing|New borrowing increased the firm's total debt during the quarter.
broker|The broker explained the transaction charges before opening the account.
capital|Additional capital is needed to complete the factory modernization.
cashflow|Unpaid invoices created a temporary cash flow problem for the supplier.
charge|A late-payment charge applies after the grace period expires.
claim|The customer submitted an insurance claim for the damaged equipment.
collateral|The lender accepted the warehouse as collateral for the loan.
commission|The sales agent earns a commission on completed contracts.
compensation|The worker requested compensation for expenses incurred during relocation.
concession|The lender made a concession by extending the repayment period.
consolidation|The consolidation of regional offices reduced administrative expenses.
consumer|The consumer requested written confirmation of the advertised interest rate.
cost|The maintenance cost has risen because replacement parts are scarce.
coverage|The policy's coverage does not include accidental loss of baggage.
credit|A strong credit history may improve the terms of a loan.
creditor|The creditor requested payment before the company sold its remaining assets.
currency|The invoice specifies payment in the customer's local currency.
deduction|The tax deduction applies only to eligible business expenses.
deficit|The project ended the year with a deficit after unexpected repairs.
depreciation|Annual depreciation reduced the book value of the delivery vehicles.
dividend|The board declared a dividend after reporting higher annual earnings.
donation|The hospital received a large donation for new medical equipment.
earnings|The company's quarterly earnings exceeded analysts' expectations.
economy|The regional economy benefited from increased tourism spending.
equity|The founders retained majority equity after the new investment round.
expenditure|Capital expenditure rose when the manufacturer purchased new equipment.
fee|The bank waived the account maintenance fee for student customers.
forecast|The revenue forecast assumes that demand will remain stable.
funding|The research team secured funding from three independent sponsors.
guarantee|The supplier provided a written guarantee covering faulty components.
income|Applicants must provide evidence of regular monthly income.
inflation|Higher inflation increased the cost of transporting goods.
installment|The first installment of the training fee is due on Monday.
interest|The interest charged on the loan depends on its repayment period.
investment|The investment in solar panels is expected to reduce utility bills.
liability|The company's liability for damaged products is explained in the contract.
liquidity|The bank maintains sufficient liquidity to meet customer withdrawals.
loan|The borrower applied for a loan to purchase delivery trucks.
margin|The retailer's profit margin narrowed after wholesale prices increased.
maturity|The bond reaches maturity in five years, when principal becomes payable.
merger|The merger is subject to approval by competition authorities.
mortgage|The couple compared mortgage offers from three local banks.
networth|The applicant's net worth was calculated from assets minus liabilities.
obligation|The borrower has a contractual obligation to make monthly payments.
overhead|Shared office facilities reduced the startup's overhead expenses.
payment|The second payment will be released after the inspection is complete.
payroll|The payroll department corrected an error in the employee's bank details.
penalty|The contract imposes a penalty for returning equipment late.
portfolio|The adviser recommended a portfolio with a range of asset types.
premium|The insurance premium will increase when the policy renews.
principal|Each repayment reduces the outstanding principal on the loan.
profit|The company reported a higher operating profit despite lower sales.
projection|The three-year projection assumes a gradual increase in customers.
rate|The bank announced a revised exchange rate for overseas transfers.
rebate|Eligible buyers will receive a rebate after submitting their receipts.
receipt|Please keep the original receipt for a possible warranty claim.
reconciliation|Monthly reconciliation uncovered two payments recorded twice.
recovery|The recovery of overdue debts improved the company's cash position.
redemption|Early redemption of the bond may involve an additional charge.
refund|The customer received a full refund after the flight was canceled.
remittance|The international remittance arrived two business days after submission.
repayment|The repayment schedule lists the amount due each month.
revenue|Subscription revenue now accounts for nearly half of total sales.
risk|The committee evaluated the financial risk before approving the investment.
royalty|The author receives a royalty for each licensed copy sold.
salary|The revised salary will take effect at the beginning of November.
savings|The customer transferred the bonus into a savings account.
shareholder|Each shareholder received notice of the annual general meeting.
solvency|The audit raised concerns about the company's long-term solvency.
statement|The monthly statement includes all card purchases and service charges.
subsidy|The farm applied for a subsidy to install irrigation equipment.
subscription|The online subscription renews automatically unless canceled.
surplus|The charity used its budget surplus to expand food deliveries.
tariff|The new import tariff increased the retail price of the equipment.
taxation|The accountant advised the client about changes in business taxation.
transaction|The bank blocked the suspicious transaction until the customer confirmed it.
transfer|The customer initiated a transfer to an overseas supplier.
treasury|The treasury department manages the firm's short-term cash reserves.
valuation|The property valuation was reviewed before the mortgage was approved.
voucher|Guests can use the voucher toward their next hotel reservation.
warranty|The product warranty covers defective parts for two years.
yield|The bond's annual yield depends on its purchase price.
absence|An unexplained absence must be reported to the supervisor before noon.
achievement|Completing the training program was an important professional achievement.
admission|Admission to the internship program depends on the final interview.
advancement|The company offers advancement opportunities to experienced technicians.
apprentice|The apprentice will work alongside a licensed electrician.
aptitude|The assessment measures each applicant's aptitude for technical work.
benefits|Employee benefits include health insurance and paid annual leave.
career|The university adviser helped students plan their career paths.
colleague|A colleague volunteered to cover the receptionist's afternoon shift.
competence|The interview examines competence in written business communication.
discipline|Good workplace discipline is essential around dangerous machinery.
employee|Each employee must complete an annual cybersecurity course.
employer|The employer agreed to cover the cost of required certification.
employment|The contract sets out the terms of employment and paid leave.
engagement|Employee engagement improved after managers introduced regular feedback sessions.
enrollment|Enrollment in the workshop closes three days before the event.
experience|Previous customer-service experience is preferred but not required.
flexibility|The new schedule gives parents greater flexibility over working hours.
freelancer|The agency hired a freelancer to translate its product catalogue.
grievance|Staff can submit a workplace grievance through a confidential portal.
headhunter|The headhunter identified three candidates with logistics experience.
inclusion|The company's inclusion policy covers employees with disabilities.
intern|The intern prepared a summary of the weekly sales meeting.
internship|The paid internship lasts ten weeks and includes mentoring.
interviewer|The interviewer asked each candidate to describe a difficult decision.
jobseeker|The jobseeker updated her résumé before applying for the vacancy.
labor|The construction project requires additional skilled labor during summer.
leave|Employees must request annual leave at least two weeks in advance.
literacy|Digital literacy is increasingly important for administrative positions.
management|Senior management will review the proposal after the budget meeting.
mentor|Each new salesperson is assigned a mentor for the first month.
motivation|The manager praised the team's motivation during the busy season.
onboarding|Online onboarding allows remote employees to complete paperwork early.
overtime|The warehouse manager must approve overtime during peak demand.
paycheck|The employee noticed a deduction on her first paycheck.
position|The advertised position involves coordinating deliveries and client inquiries.
probation|The employee's probation period ends after three months.
profession|Accounting is a profession that requires careful attention to detail.
recruiter|The recruiter will notify shortlisted applicants by email.
recruitment|The hospital's recruitment campaign focuses on experienced nurses.
referral|An employee referral helped the firm find a qualified technician.
resignation|The manager received the employee's written resignation on Monday.
retirement|The company offers financial-planning seminars before retirement.
résumé|Please attach your résumé as a PDF to the online application.
screening|Initial screening eliminated applications missing the required certificate.
seniority|Holiday scheduling takes seniority into account when requests conflict.
shift|The night shift begins at ten and ends at six.
specialization|Her specialization in employment law made her a strong candidate.
staffing|Temporary staffing will cover the hotel during the conference.
stipend|Each trainee receives a small stipend for transport expenses.
supervision|New technicians must work under direct supervision until certified.
talent|The company launched a scholarship to attract engineering talent.
tenure|Long tenure at the firm does not automatically guarantee promotion.
trainee|The trainee practiced handling complaints with a senior representative.
vacancy|The company posted a vacancy for an administrative assistant.
wage|The new minimum wage will take effect at the start of next year.
workforce|The manufacturer plans to expand its skilled workforce by twenty percent.
workplace|Every workplace should maintain a clear emergency evacuation plan.
arrival|Guests should confirm their estimated arrival time before check-in.
attraction|The new museum is the city's most visited tourist attraction.
baggage|Passengers must collect checked baggage before passing through customs.
boarding|Boarding for the delayed flight will begin at Gate 12.
booking|The hotel will email a booking confirmation after payment.
brochure|The travel brochure includes a map and a list of optional tours.
carriage|Passengers with bicycles should use the last train carriage.
checkin|Online check-in is available starting twenty-four hours before departure.
checkout|Late checkout is subject to room availability and an extra fee.
commuter|The commuter missed the last shuttle after working late.
connection|The passenger had only forty minutes to make the next connection.
customs|All imported equipment must clear customs before delivery.
departure|The departure board shows that the train is running fifteen minutes late.
destination|Please check the destination before boarding the airport bus.
detour|Roadworks forced the tour bus to take a twenty-minute detour.
driver|The shuttle driver will wait outside the hotel entrance.
duration|The total duration of the guided tour is approximately ninety minutes.
excursion|Guests can book an optional excursion to the nearby national park.
fare|The airport bus fare includes one large suitcase.
flight|The flight to Vienna was delayed by severe weather.
gate|The airline changed the boarding gate shortly before departure.
guest|Each hotel guest receives a complimentary breakfast voucher.
hospitality|The hospitality team arranged refreshments for visiting conference speakers.
hotel|The hotel offers a free shuttle from the central railway station.
immigration|Travelers should allow extra time for immigration during peak hours.
journey|The coastal railway journey takes just under three hours.
landmark|The guide used the historic bridge as a landmark for the meeting point.
layover|The airline arranged a lounge pass for passengers with a long layover.
lodging|Conference lodging must be booked separately from registration.
`; 
const examples=Object.freeze(Object.fromEntries(EXAMPLE_ROWS.trim().split(/\n/).filter(Boolean).map(row=>{const n=row.indexOf('|');return [row.slice(0,n).toLowerCase(),row.slice(n+1)];})));
function enhanceCards(cards){return (Array.isArray(cards)?cards:[]).map(c=>examples[String(c?.word||'').toLowerCase()]?{...c,example:examples[c.word.toLowerCase()]}:c);}
// Reviewed phrase completions for the 56 collocations not already covered by V7.2's 16 cloze prompts.
const CLOZE_ROWS=`
v002|meeting _____（會議議程）|agenda|receipt|budget|shipment
v003|job _____（求職應徵者）|applicant|invoice|receipt|warranty
v005|be _____ for（可供……使用）|available|overdue|defective|mandatory
v006|employee _____（員工福利）|benefits|invoices|penalties|reservations
v007|annual _____（年度預算）|budget|ticket|reception|shipment
v008|qualified _____（合格候選人）|candidate|venue|invoice|refund
v009|complimentary _____（免費服務）|service|penalty|invoice|charge
v012|independent _____（獨立承包商）|contractor|receipt|booking|shipment
v014|flight _____（航班延誤）|delay|deposit|invoice|agenda
v015|sales _____（業務部門）|department|refund|inspection|deposit
v016|refundable _____（可退還的押金）|deposit|deadline|benefit|itinerary
v017|be _____ for（符合取得……資格）|eligible|temporary|revised|defective
v018|cost _____（成本估算）|estimate|applicant|meeting|warranty
v020|facilitate _____（促進溝通）|communication|inspection|payment|closure
v021|frequently _____ questions（常見問題）|asked|closed|shipped|revised
v023|inquire _____（詢問有關……）|about|despite|throughout|unless
v024|inventory _____（庫存管理）|management|schedule|salary|journey
v026|travel _____（旅行行程表）|itinerary|allowance|applicant|policy
v027|maintain _____（維護設備）|equipment|receipts|guests|quotations
v028|mandatory _____（強制訓練）|training|refund|shipment|quotation
v030|_____ someone of（通知某人某事）|notify|refund|invoice|deposit
v031|_____ required（偶爾需要）|occasionally|annually|strictly|immediately
v032|overdue _____（逾期款項）|payment|visitor|agenda|shipment
v033|persuade a _____（說服客戶）|client|refund|policy|venue
v035|standard _____（標準作業程序）|procedure|itinerary|refund|deposit
v036|purchase _____（採購訂單）|order|venue|candidate|benefit
v037|reimburse _____（報銷費用）|expenses|employees|applicants|clients
v038|reliable _____（可靠供應商）|supplier|deadline|deposit|quotation
v039|office _____（辦公室整修）|renovation|reimbursement|recruitment|remittance
v040|meet a _____（符合要求）|requirement|schedule|shipment|venue
v041|retain a _____（保存紀錄）|record|closure|shipment|supplier
v042|schedule an _____（安排預約）|appointment|invoice|expense|estimate
v043|track a _____（追蹤貨物）|shipment|candidate|payment|meeting
v044|submit a _____（提交報告）|report|client|venue|policy
v045|suitable _____（合適替代品）|substitute|deadline|approval|receipt
v046|sufficient _____（充裕時間）|time|shipment|invoice|venue
v047|temporary _____（暫時關閉）|closure|invoice|payment|estimate
v048|event _____（活動場地）|venue|receipt|discount|shipment
v050|price _____（價格調整）|adjustment|applicant|reservation|inspection
v051|in _____（事先）|advance|supply|closure|receipt
v052|obtain _____（取得核准）|approval|itinerary|inventory|invoice
v053|assess the _____（評估影響）|impact|report|reception|supplier
v054|attach a _____（附上一份文件）|document|client|booking|guest
v055|check _____（查詢可用情況）|availability|shipment|deadline|approval
v056|circulate a _____（傳閱報告）|report|refund|venue|client
v058|coordinate a _____（協調貨運）|shipment|meeting|invoice|reservation
v059|defective _____（有瑕疵商品）|item|agenda|contract|invoice
v061|travel _____（差旅費用）|expenses|suppliers|employees|deadlines
v062|request an _____（申請延期）|extension|employee|invoice|itinerary
v063|prices _____（價格波動）|fluctuate|authorize|arrange|verify
v065|outstanding _____（未付餘額）|balance|candidate|shipment|venue
v066|company _____（公司政策）|policy|invoice|reception|shipment
v067|proceed with a _____（繼續執行計畫）|plan|refund|supplier|venue
v069|email _____（電子郵件收件人）|recipient|invoice|venue|departure
v070|revised _____（修訂後時程）|schedule|deposit|claim|candidate
v071|tentative _____（暫定時程）|schedule|inventory|balance|refund
`; 
const cloze=Object.freeze(Object.fromEntries(CLOZE_ROWS.trim().split(/\n/).map(row=>{const [id,...val]=row.split('|');return [id,val]})));
function clozeFor(card){return cloze[card?.id]||null;}
function shuffleOptions(rows,random=Math.random){
 return (Array.isArray(rows)?rows:[]).map(row=>{
   if(!Array.isArray(row.options)||row.options.length!==4||!Number.isInteger(row.answer)||row.answer<0||row.answer>=4)throw new Error('V7.3: invalid option mapping '+row.id);
   const indices=[0,1,2,3];for(let i=3;i>0;i--){const raw=Number(random());const v=Number.isFinite(raw)?Math.min(.999999999999,Math.max(0,raw)):.5;const j=Math.floor(v*(i+1));[indices[i],indices[j]]=[indices[j],indices[i]];}
   return {...row,options:indices.map(i=>row.options[i]),answer:indices.indexOf(row.answer),shuffleVersion:'v73'};
 });
}
const isOldTemplate=q=>String(q?.id||'').startsWith('v4-r-');
return Object.freeze({examples,enhanceCards,clozeFor,shuffleOptions,isOldTemplate,version:'7.3.0'});
});
