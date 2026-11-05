// Shared content for the three messaging layouts. A small team at Kite, a budgeting app,
// in the week they ship version 2.4. Real sounding names and messages, nothing invented as results.

export const me = 'rohan';

export const people = {
  rohan: { name: 'Rohan Mehta', role: 'Product designer', live: true },
  maya: { name: 'Maya Rao', role: 'Design lead', live: true },
  dev: { name: 'Dev Iyer', role: 'iOS engineer', live: true },
  asha: { name: 'Asha Nair', role: 'Product manager', live: false },
  kabir: { name: 'Kabir Shah', role: 'Support lead', live: true },
  ira: { name: 'Ira Bose', role: 'Marketing', live: false },
  tom: { name: 'Tom Hughes', role: 'Backend engineer', live: true },
  leila: { name: 'Leila Haddad', role: 'Data analyst', live: false },
};

export const workspace = { name: 'Kite', team: 'Kite team' };

// The channels. Their unread counts are not typed in: they are worked out from channelMessages
// and lastRead below, so every count on every screen agrees with the messages you can see.
const baseChannels = [
  { id: 'launch', name: 'launch', topic: 'Kite 2.4 ships Thursday 13 November', lastRead: 'l2' },
  { id: 'design', name: 'design', topic: 'Reviews, critiques and files', lastRead: null },
  { id: 'engineering', name: 'engineering', topic: 'Builds, releases and incidents', lastRead: null },
  { id: 'support', name: 'support', topic: 'What customers are telling us', lastRead: null },
  { id: 'general', name: 'general', topic: 'Team wide news', lastRead: 'n1' },
  { id: 'random', name: 'random', topic: 'Lunch, links and everything else', lastRead: null },
];

export const directs = [
  { id: 'dm-maya', person: 'maya', unread: 1 },
  { id: 'dm-dev', person: 'dev', unread: 0 },
  { id: 'dm-asha', person: 'asha', unread: 0 },
];

// Times are today unless a day is given. Text uses `backticks` for inline code.
export const threads = [
  {
    id: 't-goals',
    channel: 'launch',
    root: { id: 'm1', author: 'asha', time: '9:12', text: 'Savings goals copy is locked for 2.4. Last call on the empty state before I hand it to Ira for the App Store notes.' },
    replies: [
      { id: 'm2', author: 'maya', time: '9:20', text: 'The empty state still says “Start saving today”. Can we name the goal instead? “Your first goal could be a trip, a laptop or a rainy day fund.”' },
      { id: 'm3', author: 'rohan', time: '9:24', text: 'I like naming it. I will update the frame in the file and drop the illustration, it pushes the button below the fold on small phones.' },
      { id: 'm4', author: 'asha', time: '10:02', text: '@Rohan can you share the new frame here when it is in? Ira is waiting on it.' },
      { id: 'm5', author: 'ira', time: '10:05', text: 'Yes please. I need the final line by 3 today to make the store submission.' },
      { id: 'm6', author: 'maya', time: '10:06', text: 'Also check it at 200% text. The headline wrapped to four lines last time.' },
    ],
    lastRead: 'm3',
    people: ['asha', 'maya', 'rohan', 'ira'],
  },
  {
    id: 't-widget',
    channel: 'engineering',
    root: { id: 'w1', author: 'dev', time: '8:41', text: 'The home screen widget shows last month’s balance on iOS 18 after a restart. Repro steps in the ticket.' },
    replies: [
      { id: 'w2', author: 'tom', time: '8:55', text: 'The widget reads the cached summary. If the app has not opened since midnight the cache is stale. We can refresh it from the background task.', code: 'BGAppRefreshTaskRequest(identifier: "app.kite.summary")' },
      { id: 'w3', author: 'dev', time: '9:10', text: 'That works. I will schedule it every 4 hours and refresh on unlock.' },
      { id: 'w4', author: 'tom', time: '9:58', text: 'Pushed to `release/2.4`. Can someone run it on a real device overnight?' },
    ],
    lastRead: 'w2',
    people: ['dev', 'tom'],
  },
  {
    id: 't-refunds',
    channel: 'support',
    root: { id: 's1', author: 'kabir', time: '8:30', text: '12 tickets since Monday about the round up feature charging twice. All on Android, all with two linked cards.' },
    replies: [
      { id: 's2', author: 'leila', time: '8:47', text: 'I see 31 accounts with duplicate round ups in the last 7 days. 28 have two cards from the same bank.' },
      { id: 's3', author: 'kabir', time: '9:31', text: '@Rohan what should the message to these customers say? They are asking if they lost money.' },
    ],
    lastRead: 's2',
    people: ['kabir', 'leila'],
  },
  {
    id: 't-onboarding',
    channel: 'design',
    root: { id: 'd1', author: 'maya', time: 'Yesterday', text: 'Critique on Friday at 4: the new onboarding. Three screens, one question each. Bring opinions.' },
    replies: [
      { id: 'd2', author: 'rohan', time: 'Yesterday', text: 'I will bring two versions of the income question. One asks for a range, one asks for nothing until day 3.' },
      { id: 'd3', author: 'asha', time: '9:45', text: 'Can we keep it under 30 minutes? I have the release review at 4:30.' },
      { id: 'd4', author: 'rohan', time: '9:52', text: 'Yes, 25 minutes. I will share both versions before lunch.', status: 'failed' },
    ],
    lastRead: 'd4',
    people: ['maya', 'rohan', 'asha'],
  },
  {
    id: 't-review',
    channel: 'launch',
    root: { id: 'r1', author: 'ira', time: 'Yesterday', text: 'App Store screenshots are in the shared folder. Five frames, light and dark.' },
    replies: [
      { id: 'r2', author: 'maya', time: 'Yesterday', text: 'Frame 3 still shows the old tab bar. Everything else looks right.' },
      { id: 'r3', author: 'ira', time: 'Yesterday', text: 'Fixed and replaced. Thanks for catching it.' },
    ],
    lastRead: 'r3',
    people: ['ira', 'maya'],
  },
];

// The channel view: recent messages in #launch, oldest first.
export const channelMessages = {
  launch: [
    { id: 'l1', author: 'asha', time: 'Yesterday', text: 'Release review moved to Friday 4:30. Same link.' },
    { id: 'l2', author: 'ira', time: 'Yesterday', text: 'App Store screenshots are in the shared folder. Five frames, light and dark.', thread: 't-review' },
    { id: 'l3', author: 'asha', time: '9:12', text: 'Savings goals copy is locked for 2.4. Last call on the empty state before I hand it to Ira for the App Store notes.', thread: 't-goals' },
    { id: 'l4', author: 'tom', time: '9:40', text: 'Build 2.4 (412) is on TestFlight. Release notes are in the build.' },
    { id: 'l5', author: 'tom', time: '9:41', text: 'Known issue: the widget can show last month’s balance after a restart. Fix is in review.' },
    { id: 'l6', author: 'dev', time: '9:58', text: 'Fix merged. Next build tonight.' },
    { id: 'l7', author: 'asha', time: '10:02', text: '@Rohan can you post the final empty state frame here when it is in? Ira is waiting on it.' },
    { id: 'l8', author: 'ira', time: '10:05', text: 'I need the final line by 3 today to make the store submission.' },
  ],
  design: [
    { id: 'g1', author: 'maya', time: 'Yesterday', text: 'Critique on Friday at 4: the new onboarding. Three screens, one question each.', thread: 't-onboarding' },
    { id: 'g2', author: 'maya', time: '9:02', text: 'Icon set is updated in the library. Outline, 1.5 stroke, please swap any old ones you see.' },
    { id: 'g3', author: 'rohan', time: '9:30', text: 'Swapped in the goals flow. Two left in settings.' },
  ],
  engineering: [
    { id: 'e1', author: 'dev', time: '8:41', text: 'The home screen widget shows last month’s balance on iOS 18 after a restart.', thread: 't-widget' },
    { id: 'e2', author: 'tom', time: '9:58', text: 'Pushed to `release/2.4`. Can someone run it on a real device overnight?' },
  ],
  support: [
    { id: 'p1', author: 'kabir', time: '8:30', text: '12 tickets since Monday about the round up feature charging twice.', thread: 't-refunds' },
    { id: 'p2', author: 'kabir', time: '9:31', text: '@Rohan what should the message to these customers say? They are asking if they lost money.' },
  ],
  general: [
    { id: 'n1', author: 'asha', time: 'Monday', text: 'Welcome Leila, who joins us to lead data. Say hello.' },
  ],
  random: [],
};

// What needs a reply or a decision from you. dueBy is a 24 hour time used to sort by deadline.
export const needsYou = [
  { id: 'n-kabir', kind: 'Asked you', channel: 'support', thread: 't-refunds', from: 'kabir', time: '9:31', text: 'What should the message to these customers say? They are asking if they lost money.' },
  { id: 'n-asha', kind: 'Asked you', channel: 'launch', thread: 't-goals', from: 'asha', time: '10:02', text: 'Can you share the new frame here when it is in? Ira is waiting on it.', due: 'Needed by 3:00', dueBy: '15:00' },
  { id: 'n-maya', kind: 'Direct message', dm: 'dm-maya', from: 'maya', time: '10:11', text: 'Free for 10 minutes before lunch? I want your eyes on the goals chart.' },
];

export const waitingOnOthers = [
  { id: 'o-dev', channel: 'engineering', thread: 't-widget', who: 'dev', text: 'You asked Dev to test the widget fix on a real device overnight.', time: '9:58' },
  { id: 'o-leila', channel: 'support', thread: 't-refunds', who: 'leila', text: 'You asked Leila for the list of affected accounts.', time: 'Yesterday' },
];

export const firstName = (id) => people[id].name.split(' ')[0];
export const threadById = (id) => threads.find((t) => t.id === id);

// Unread: messages after the last one you read, not counting your own. Mention: one of them names you.
const unreadIn = (c) => {
  const all = channelMessages[c.id];
  const after = c.lastRead ? all.slice(all.findIndex((m) => m.id === c.lastRead) + 1) : all;
  return after.filter((m) => m.author !== me);
};
export const channels = baseChannels.map((c) => {
  const unread = unreadIn(c);
  return { ...c, unread: unread.length, mention: unread.some((m) => m.text.includes('@Rohan')) };
});
export const channelById = (id) => channels.find((c) => c.id === id);
export const totalUnread = channels.reduce((n, c) => n + c.unread, 0);
