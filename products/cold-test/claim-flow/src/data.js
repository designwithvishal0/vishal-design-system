// Concept data. No real person, company or claim: names, amounts and dates are samples for the concept,
// and every total on screen is worked out from these records, never typed.

export const TODAY = new Date('2026-11-06T10:12:00+05:30');

export const policy = {
  company: 'Lumen Labs',
  cover: 500000, // sum insured for the family, per policy year
  account: 'HDFC Bank account ending 4821',
  daysToPay: 10, // working days the insurer takes after documents are complete
};

export const members = [
  { id: 'ananya', name: 'Ananya Iyer', relation: 'You', share: 0 },
  { id: 'rohan', name: 'Rohan Iyer', relation: 'Spouse', share: 0 },
  { id: 'meera', name: 'Meera Iyer', relation: 'Mother', share: 0.1 }, // parents pay 10% of each claim
];

export const kinds = [
  { id: 'stay', label: 'Hospital stay, one night or more' },
  { id: 'daycare', label: 'Day care procedure, no overnight stay' },
  { id: 'visit', label: 'Clinic visit, tests or medicines' },
];

export const docTypes = [
  { id: 'bill', label: 'Final hospital bill', hint: 'The itemised bill with the hospital’s stamp', needs: ['stay', 'daycare', 'visit'] },
  { id: 'receipt', label: 'Payment receipt', hint: 'Shows you paid, by card, UPI or cash', needs: ['stay', 'daycare', 'visit'] },
  { id: 'discharge', label: 'Discharge summary', hint: 'Signed by the treating doctor', needs: ['stay', 'daycare'] },
  { id: 'reports', label: 'Prescriptions and test reports', hint: 'They help your insurer decide faster', needs: [] },
];

export const steps = ['Sent', 'Documents checked', 'Approved', 'Paid'];

// state: needs (insurer asked for something) | sent | review | approved | paid
export const seedClaims = [
  {
    id: 'CLM-25102', member: 'meera', hospital: 'Manipal Hospital, Old Airport Road', treatment: 'Cataract surgery, left eye',
    kind: 'daycare', from: '2026-10-28', to: '2026-10-28', amount: 48200, state: 'needs', sentAt: '2026-10-30T18:40:00+05:30',
    ask: { doc: 'discharge', on: '2026-11-04', text: 'The discharge summary you sent is not signed. Add the copy signed by Dr. Kulkarni.' },
    files: [{ type: 'bill', name: 'Manipal_final_bill_28Oct.pdf', size: 412000 }, { type: 'receipt', name: 'UPI_receipt_Manipal.png', size: 188000 }, { type: 'discharge', name: 'Discharge_summary.pdf', size: 240000 }],
  },
  {
    id: 'CLM-24817', member: 'rohan', hospital: 'Apollo Clinic, Indiranagar', treatment: 'Consultation and blood tests',
    kind: 'visit', from: '2026-10-11', to: '2026-10-11', amount: 6850, approved: 6850, state: 'paid', sentAt: '2026-10-12T09:05:00+05:30', paidOn: '2026-10-24',
    files: [{ type: 'bill', name: 'Apollo_invoice_11Oct.pdf', size: 96000 }, { type: 'receipt', name: 'Card_slip.jpg', size: 302000 }],
  },
  {
    id: 'CLM-23390', member: 'ananya', hospital: 'Fortis Hospital, Bannerghatta Road', treatment: 'Appendix removal',
    kind: 'stay', from: '2026-06-14', to: '2026-06-17', amount: 131150, approved: 131150, state: 'paid', sentAt: '2026-06-19T11:30:00+05:30', paidOn: '2026-07-02',
    files: [{ type: 'bill', name: 'Fortis_final_bill.pdf', size: 820000 }, { type: 'receipt', name: 'Fortis_receipt.pdf', size: 110000 }, { type: 'discharge', name: 'Fortis_discharge.pdf', size: 350000 }],
  },
];

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export const money = (n) => inr.format(n);
export const day = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }).replace(' ', '\u00a0');
export const time = (iso) => new Date(iso).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
export const size = (b) => (b >= 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1e3))} KB`);
export const memberOf = (id) => members.find((m) => m.id === id);

// Cover used is what the insurer has approved this year. Everything that shows cover left reads this.
export const coverLeft = (claims) => policy.cover - claims.reduce((s, c) => s + (c.approved ?? 0), 0);

// What the employee can expect back: the bill, less the family member's share, capped at cover left.
export function estimate(amount, memberId, left) {
  const share = Math.round(amount * (memberOf(memberId)?.share ?? 0));
  const back = Math.max(0, Math.min(amount - share, left));
  return { share, back, capped: amount - share > left };
}

// Working days after a date, skipping Saturday and Sunday.
export function addWorkingDays(from, n) {
  const d = new Date(from);
  while (n > 0) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) n -= 1; }
  return d.toISOString();
}

export const needed = (kind) => docTypes.filter((t) => t.needs.includes(kind));
