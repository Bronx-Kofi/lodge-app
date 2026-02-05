import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'jyrzp1q7',
  dataset: 'production',
  token: 'sk8Ogt47TJ3lnOjKBbkr3CJqv26wfLwXWMG3tu4Q2Iwhipaxh9nbQE0kdwJhiNqirEWD98knLth4kkla7nsZLh3T65LRwLKonOBBOCxDAlmp2zdLjtQlI4cTGzYKgfEKhJf8oOsViDMy19V8Fi46CsnvNoIW4tSZclAG2JFNdkoDrYKtfFAF',
  apiVersion: '2024-02-28',
  useCdn: false,
});

async function createBooking() {
  const checkInReference = `CHK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const booking = {
    _type: 'checkInForm',
    checkInReference,
    guestName: 'Deeper Life Bible Church',
    guestEmail: 'deeperlifebiblechurch@gmail.com',
    checkInDate: '2026-02-05',
    checkOutDate: '2026-02-07',
    numberOfGuests: 2,
    numberOfRooms: 1,
    nightlyRate: 350,
    totalPrice: 1050, // 350 × 3 nights
    roomPreference: 'Standard Room',
    submittedAt: new Date().toISOString(),
  };

  try {
    const result = await client.create(booking);
    console.log('✅ Booking created successfully!');
    console.log('📋 Check-in Reference:', checkInReference);
    console.log('📧 Email:', booking.guestEmail);
    console.log('💰 Total:', 'GH₵1,050 (GH₵350 × 3 nights)');
    console.log('\n🧾 Get receipt at:');
    console.log(`http://localhost:3002/receipt/visa?email=${encodeURIComponent(booking.guestEmail)}&reference=${checkInReference}`);
    return result;
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    throw error;
  }
}

createBooking().catch(console.error);
