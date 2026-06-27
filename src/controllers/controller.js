const providers = [
  {
    id: 1,
    name: 'Alice Sharma',
    specialty: 'High Scale Distributed Systems',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    specialty: 'Fullstack (Next.js, TypeScript)',
    timezone: 'Asia/Kolkata'
  },
  {
    id: 3,
    name: 'Meera Iyer',
    specialty: 'Machine Learning Systems',
    timezone: 'Europe/Berlin'
  }
];

let bookings = [
  {
    id: 1,
    providerId: 1,
    candidateName: 'Test Candidate',
    candidateEmail: 'candidate@example.com',
    startTime: '2026-02-03T10:00:00.000Z',
    endTime: '2026-02-03T10:30:00.000Z',
    notes: 'Initial system design round'
  }
];

let nextBookingId = 2;

function generateMockSlotsForProvider(providerId, date) {
  const baseDate = date || '2026-02-03';
  return [
    {
      providerId,
      startTime: `${baseDate}T09:00:00.000Z`,
      endTime: `${baseDate}T09:30:00.000Z`
    },
    {
      providerId,
      startTime: `${baseDate}T09:30:00.000Z`,
      endTime: `${baseDate}T10:00:00.000Z`
    },
    {
      providerId,
      startTime: `${baseDate}T10:00:00.000Z`,
      endTime: `${baseDate}T10:30:00.000Z`
    }
  ];
}

exports.getProviders = (req, res) => {
  res.json(providers);
};

exports.getProviderById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const provider = providers.find(p => p.id === id);

  if (!provider) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  res.json(provider);
};

exports.getProviderSlots = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const provider = providers.find(p => p.id === id);

  if (!provider) {
    return res.status(404).json({ error: 'Provider not found' });
  }

  const { date } = req.query;
  const slots = generateMockSlotsForProvider(provider.id, date);
  res.json({ providerId: provider.id, slots });
};

exports.listBookings = (req, res) => {
  res.json(bookings);
};

exports.getBookingById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json(booking);
};

exports.createBooking = (req, res) => {
  const { providerId, candidateName, candidateEmail, startTime, endTime, notes } = req.body;

  if (!providerId || !candidateName || !candidateEmail || !startTime || !endTime) {
    return res.status(400).json({ error: 'providerId, candidateName, candidateEmail, startTime and endTime are required' });
  }

  const provider = providers.find(p => p.id === Number(providerId));
  if (!provider) {
    return res.status(400).json({ error: 'Invalid providerId' });
  }

  const newBooking = {
    id: nextBookingId++,
    providerId: Number(providerId),
    candidateName,
    candidateEmail,
    startTime,
    endTime,
    notes: notes || ''
  };

  bookings.push(newBooking);

  res.status(201).json(newBooking);
};
