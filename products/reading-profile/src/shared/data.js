// Shared content for the three reading profile layouts. One reader, Meera Krishnan, on 6 November 2026.
// Real books; the reader, her ratings and her reviews are invented for the prototype.

export const reader = {
  name: 'Meera Krishnan',
  first: 'Meera',
  place: 'Bengaluru',
  since: 2019,
  totalRead: 312,
  followers: 248,
};

// Goodreads convention: three exclusive shelves (plus Did not finish), then the reader's own, each with a count.
export const shelves = [
  { id: 'read', name: 'Read', count: 312, exclusive: true },
  { id: 'currently-reading', name: 'Currently reading', count: 2, exclusive: true },
  { id: 'to-read', name: 'Want to read', count: 46, exclusive: true },
  { id: 'dnf', name: 'Did not finish', count: 4, exclusive: true },
  { id: 'favourites', name: 'favourites', count: 24 },
  { id: 'indian-fiction', name: 'indian-fiction', count: 58 },
  { id: 'translated', name: 'translated', count: 31 },
  { id: 'short-stories', name: 'short-stories', count: 22 },
  { id: 'essays', name: 'essays', count: 17 },
  { id: 'rereads', name: 'rereads', count: 9 },
];

export const currentlyReading = [
  { title: 'The Ministry of Utmost Happiness', author: 'Arundhati Roy', page: 212, pages: 445, started: '21 Oct' },
  { title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', page: 140, pages: 391, started: '30 Oct' },
];

// Every book read this year, in the order finished. 34 books.
const M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
const raw = [
  [0, 'Tomorrow, and Tomorrow, and Tomorrow', 'Gabrielle Zevin', 5, 416, ['favourites']],
  [0, 'Small Things Like These', 'Claire Keegan', 4, 116, ['short-stories']],
  [0, 'The Hungry Tide', 'Amitav Ghosh', 4, 403, ['indian-fiction']],
  [0, 'Piranesi', 'Susanna Clarke', 5, 272, ['favourites', 'rereads']],
  [1, 'Klara and the Sun', 'Kazuo Ishiguro', 4, 303, []],
  [1, 'A Burning', 'Megha Majumdar', 3, 293, ['indian-fiction']],
  [1, 'Trust', 'Hernan Diaz', 4, 402, []],
  [2, 'Interpreter of Maladies', 'Jhumpa Lahiri', 5, 198, ['short-stories', 'favourites']],
  [2, 'Demon Copperhead', 'Barbara Kingsolver', 4, 548, []],
  [3, 'Lessons in Chemistry', 'Bonnie Garmus', 3, 390, []],
  [3, 'The Covenant of Water', 'Abraham Verghese', 5, 724, ['indian-fiction', 'favourites']],
  [3, 'Sea of Tranquility', 'Emily St. John Mandel', 4, 255, []],
  [3, 'Foster', 'Claire Keegan', 5, 88, ['short-stories']],
  [3, 'Ghachar Ghochar', 'Vivek Shanbhag', 4, 118, ['translated', 'indian-fiction']],
  [4, 'Yellowface', 'R. F. Kuang', 3, 336, []],
  [4, 'The God of Small Things', 'Arundhati Roy', 5, 340, ['indian-fiction', 'rereads', 'favourites']],
  [4, 'Educated', 'Tara Westover', 4, 334, []],
  [5, 'The Remains of the Day', 'Kazuo Ishiguro', 5, 258, ['favourites']],
  [5, 'Days at the Morisaki Bookshop', 'Satoshi Yagisawa', 3, 160, ['translated']],
  [6, 'Normal People', 'Sally Rooney', 3, 273, []],
  [6, 'Tomb of Sand', 'Geetanjali Shree', 4, 696, ['translated', 'indian-fiction']],
  [6, 'A Fine Balance', 'Rohinton Mistry', 5, 603, ['indian-fiction', 'favourites']],
  [6, 'Pachinko', 'Min Jin Lee', 4, 490, []],
  [7, 'The Overstory', 'Richard Powers', 4, 502, []],
  [7, 'Stoner', 'John Williams', 5, 288, ['favourites']],
  [7, 'Convenience Store Woman', 'Sayaka Murata', 4, 163, ['translated']],
  [8, 'Intermezzo', 'Sally Rooney', 4, 448, []],
  [8, 'The Night Watchman', 'Louise Erdrich', 4, 451, []],
  [8, 'Orbital', 'Samantha Harvey', 4, 136, []],
  [9, 'James', 'Percival Everett', 5, 303, ['favourites']],
  [9, 'North Woods', 'Daniel Mason', 4, 373, []],
  [9, 'Bluets', 'Maggie Nelson', 3, 95, ['essays']],
  [9, 'Heart Lamp', 'Banu Mushtaq', 5, 208, ['translated', 'short-stories', 'indian-fiction', 'favourites']],
  [10, 'Hamnet', "Maggie O'Farrell", 4, 305, []],
];
export const readThisYear = raw.map(([m, title, author, rating, pages, tags]) => ({ month: M[m], m, title, author, rating, pages, tags }));
export const months = M;

// Goodreads convention: read N of goal, and how far ahead or behind schedule today.
const dayOfYear = 310; // 6 November
const goal = 50;
const done = readThisYear.length;
const expected = Math.floor((goal * dayOfYear) / 365);
export const challenge = { year: 2026, goal, done, left: goal - done, behind: expected - done };

export const stats = {
  pages: readThisYear.reduce((n, b) => n + b.pages, 0),
  average: (readThisYear.reduce((n, b) => n + b.rating, 0) / done).toFixed(1),
  longest: readThisYear.reduce((a, b) => (b.pages > a.pages ? b : a)),
  perMonth: M.map((_, i) => readThisYear.filter((b) => b.m === i).length),
};

export const reviews = [
  { title: 'Hamnet', author: "Maggie O'Farrell", rating: 4, date: '2 Nov', likes: 12, text: 'A book about a famous play that barely mentions it. The grief in the middle chapters is so quiet that I only noticed how hard it had landed when I put it down. The last pages move too fast for what came before.' },
  { title: 'James', author: 'Percival Everett', rating: 5, date: '24 Oct', likes: 31, text: 'Funny, then furious, then funny again, and never once lets you off the hook. Jim choosing his own words is the whole book, and it works on every page.' },
  { title: 'Heart Lamp', author: 'Banu Mushtaq', rating: 5, date: '12 Oct', likes: 18, text: 'Twelve stories, and each one sits in a different kitchen. Deepa Bhasthi keeps the Kannada rhythm in English instead of smoothing it out, and that choice is why it feels so close.' },
];

// Books a visitor has also read, for Compare books on My taste. Ratings are the visitor's.
export const visitorRatings = {
  Piranesi: 5, 'Interpreter of Maladies': 4, 'The God of Small Things': 5, 'The Remains of the Day': 3,
  Stoner: 5, James: 4, 'Klara and the Sun': 2, 'Normal People': 4, 'A Fine Balance': 5,
};

export const favourites = readThisYear.filter((b) => b.tags.includes('favourites'));

// Real covers from Open Library, by ISBN (English editions where one has a cover), saved into the repo.
// A cover that fails to load falls back to the neutral placeholder in Cover.
const isbn = {
  "Tomorrow, and Tomorrow, and Tomorrow": '9781784744649',
  "Small Things Like These": '9780571368709',
  "The Hungry Tide": '9780618329977',
  "Piranesi": '9781526622426',
  "Klara and the Sun": '9780571364916',
  "A Burning": '9780525658696',
  "Trust": '9780593420317',
  "Interpreter of Maladies": '9781559353465',
  "Demon Copperhead": '9780571376490',
  "Lessons in Chemistry": '9780385547345',
  "The Covenant of Water": '9780802162731',
  "Ghachar Ghochar": '9781538400302',
  "Yellowface": '9780063330306',
  "The God of Small Things": '9780613621410',
  "Educated": '9780525510673',
  "Days at the Morisaki Bookshop": '9780063278677',
  "Normal People": '9780593168202',
  "Tomb of Sand": '9781911284611',
  "A Fine Balance": '9780679776451',
  "Pachinko": '9781455569496',
  "The Overstory": '9780393635522',
  "Stoner": '9780099595168',
  "Convenience Store Woman": '9780802129628',
  "Intermezzo": '9780571365470',
  "The Night Watchman": '9781472155368',
  "Orbital": '9781529922936',
  "James": '9781035031245',
  "North Woods": '9780593597033',
  "Bluets": '9781933517407',
  "Heart Lamp": '9780143464471',
  "Hamnet": '9780593212158',
  "The Ministry of Utmost Happiness": '9780525434818',
  "Braiding Sweetgrass": '9781571313560',
  "Sea of Tranquility": '9780593552070',
  "Foster": '9780571255658',
  "The Remains of the Day": '9780394251349',
};
// Saved in public/covers/ and served with the site, so nothing depends on Open Library at review time.
// Every layout page sits one folder down (year/, taste/, story/), so the covers are one level up.
export const coverOf = (title) => (isbn[title] ? `../covers/${isbn[title]}.jpg` : undefined);
