/**
 * Script to remove old priceMin/priceMax fields from room documents
 * Run with: npx tsx scripts/clean-old-price-fields.ts
 */

import { client } from '../sanity/lib/client';

async function cleanOldPriceFields() {
  console.log('🔍 Finding rooms with old price fields...\n');

  // Fetch all rooms that have priceMin or priceMax
  const rooms = await client.fetch(`
    *[_type == "roomSimplified" && (defined(priceMin) || defined(priceMax))]{
      _id,
      title,
      priceMin,
      priceMax,
      price
    }
  `);

  if (rooms.length === 0) {
    console.log('✅ No rooms found with old price fields. All clean!\n');
    return;
  }

  console.log(`📋 Found ${rooms.length} room(s) with old price fields:\n`);
  rooms.forEach((room: any) => {
    console.log(`   - ${room.title}`);
    console.log(`     Old: priceMin=${room.priceMin}, priceMax=${room.priceMax}`);
    console.log(`     New: price=${room.price || 'NOT SET'}\n`);
  });

  console.log('🧹 Cleaning up old price fields...\n');

  // Remove priceMin and priceMax from each room
  for (const room of rooms) {
    try {
      await client
        .patch(room._id)
        .unset(['priceMin', 'priceMax'])
        .commit();
      
      console.log(`✅ Cleaned: ${room.title}`);
    } catch (error) {
      console.error(`❌ Error cleaning ${room.title}:`, error);
    }
  }

  console.log('\n✅ Cleanup complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Go to Sanity Studio and refresh');
  console.log('   2. Open any room - old field warnings should be gone');
  console.log('   3. Verify all rooms have "price" field set\n');
}

// Run the cleanup
cleanOldPriceFields()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
