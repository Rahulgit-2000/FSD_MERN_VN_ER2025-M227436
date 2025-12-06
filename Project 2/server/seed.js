require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Flight.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@flightbooking.com',
      password: 'admin123',
      userType: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User'
      }
    });

    // Create sample customer
    const customer = await User.create({
      username: 'arjun',
      email: 'arjun@example.com',
      password: 'password123',
      userType: 'customer',
      profile: {
        firstName: 'Arjun',
        lastName: 'Kumar',
        phone: '+91-9876543210',
        passportNumber: 'P1234567',
        frequentFlyerNumber: 'FF123456'
      },
      preferences: {
        seatPreference: 'window',
        mealPreference: 'vegetarian'
      }
    });

    console.log('✅ Created users');

    // Create sample flights
    const flights = [
      {
        flightId: 'AI101',
        flightName: 'Air India Express',
        airline: 'Air India',
        origin: 'DEL',
        destination: 'BOM',
        departureTime: new Date('2025-12-15T06:00:00'),
        arrivalTime: new Date('2025-12-15T08:15:00'),
        duration: '2h 15m',
        totalSeats: 180,
        availableSeats: 180,
        basePrice: 850,
        classes: [
          { className: 'economy', price: 850, availableSeats: 120 },
          { className: 'business', price: 2500, availableSeats: 30 }
        ],
        status: 'scheduled',
        gate: 'A12',
        terminal: 'T3',
        aircraft: 'Boeing 737'
      },
      {
        flightId: 'SG205',
        flightName: 'SpiceJet',
        airline: 'SpiceJet',
        origin: 'BOM',
        destination: 'BLR',
        departureTime: new Date('2025-12-15T09:30:00'),
        arrivalTime: new Date('2025-12-15T11:00:00'),
        duration: '1h 30m',
        totalSeats: 150,
        availableSeats: 150,
        basePrice: 750,
        classes: [
          { className: 'economy', price: 750, availableSeats: 120 },
          { className: 'premium-economy', price: 1200, availableSeats: 30 }
        ],
        status: 'scheduled',
        gate: 'B5',
        terminal: 'T2',
        aircraft: 'Airbus A320'
      },
      {
        flightId: 'IG302',
        flightName: 'IndiGo',
        airline: 'IndiGo',
        origin: 'DEL',
        destination: 'BLR',
        departureTime: new Date('2025-12-15T14:00:00'),
        arrivalTime: new Date('2025-12-15T16:45:00'),
        duration: '2h 45m',
        totalSeats: 186,
        availableSeats: 186,
        basePrice: 950,
        classes: [
          { className: 'economy', price: 950, availableSeats: 156 },
          { className: 'business', price: 2800, availableSeats: 30 }
        ],
        status: 'scheduled',
        gate: 'C8',
        terminal: 'T1',
        aircraft: 'Airbus A321'
      },
      {
        flightId: 'UK450',
        flightName: 'Vistara',
        airline: 'Vistara',
        origin: 'BLR',
        destination: 'DEL',
        departureTime: new Date('2025-12-16T07:00:00'),
        arrivalTime: new Date('2025-12-16T09:30:00'),
        duration: '2h 30m',
        totalSeats: 164,
        availableSeats: 164,
        basePrice: 1200,
        classes: [
          { className: 'economy', price: 1200, availableSeats: 100 },
          { className: 'premium-economy', price: 1800, availableSeats: 32 },
          { className: 'business', price: 3500, availableSeats: 32 }
        ],
        status: 'scheduled',
        gate: 'D3',
        terminal: 'T2',
        aircraft: 'Boeing 787'
      },
      {
        flightId: 'AI505',
        flightName: 'Air India',
        airline: 'Air India',
        origin: 'BOM',
        destination: 'GOI',
        departureTime: new Date('2025-12-15T11:00:00'),
        arrivalTime: new Date('2025-12-15T12:15:00'),
        duration: '1h 15m',
        totalSeats: 140,
        availableSeats: 140,
        basePrice: 550,
        classes: [
          { className: 'economy', price: 550, availableSeats: 110 },
          { className: 'business', price: 1500, availableSeats: 30 }
        ],
        status: 'scheduled',
        gate: 'E7',
        terminal: 'T1',
        aircraft: 'Airbus A319'
      },
      {
        flightId: 'SG678',
        flightName: 'SpiceJet',
        airline: 'SpiceJet',
        origin: 'DEL',
        destination: 'CCU',
        departureTime: new Date('2025-12-17T08:00:00'),
        arrivalTime: new Date('2025-12-17T10:30:00'),
        duration: '2h 30m',
        totalSeats: 150,
        availableSeats: 150,
        basePrice: 1050,
        classes: [
          { className: 'economy', price: 1050, availableSeats: 120 },
          { className: 'premium-economy', price: 1600, availableSeats: 30 }
        ],
        status: 'scheduled',
        gate: 'F2',
        terminal: 'T3',
        aircraft: 'Boeing 737 MAX'
      }
    ];

    await Flight.insertMany(flights);
    console.log('✅ Created sample flights');

    console.log('\n📊 Seed Summary:');
    console.log(`   Users: ${await User.countDocuments()}`);
    console.log(`   Flights: ${await Flight.countDocuments()}`);
    console.log('\n🔐 Admin Credentials:');
    console.log('   Email: admin@flightbooking.com');
    console.log('   Password: admin123');
    console.log('\n👤 Customer Credentials:');
    console.log('   Email: arjun@example.com');
    console.log('   Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
