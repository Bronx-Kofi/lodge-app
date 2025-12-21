import { createClient } from 'next-sanity'

// Load environment variables from .env.local
// Note: when running via 'npx sanity exec', it usually loads env vars, 
// but we'll try to access them directly.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing environment variables. Check .env.local')
    console.error('Project ID:', projectId)
    console.error('Dataset:', dataset)
    console.error('Token exists:', !!token)
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-01-01',
})

const defaultHomepage = {
    _id: 'homepage',
    _type: 'homepage',
    heroTitle: 'Welcome to Miky Hillside Lodge',
    heroTagline: 'Experience authentic Ghanaian hospitality in the heart of the Bono Region.',
    featuresTitle: 'Why Stay With Us',
    features: [
        {
            _key: 'f1',
            title: 'Off-Grid Sustainability',
            description: 'Powered by solar energy and Starlink internet.'
        },
        {
            _key: 'f2',
            title: 'Authentic Experience',
            description: 'Immerse yourself in local culture and heritage.'
        },
        {
            _key: 'f3',
            title: 'Luxury Comfort',
            description: 'Modern amenities with a traditional touch.'
        }
    ],
    featuredRoomsTitle: 'Our Rooms',
    whatsappEnabled: true,
    whatsappMessage: "Hello! I'm interested in booking a stay."
}

async function resetHomepage() {
    console.log('🔄 Resetting homepage data to match new simplified schema...')

    try {
        // Overwrite the homepage document completely
        const result = await client.createOrReplace(defaultHomepage)
        console.log('✅ Homepage reset successfully!')
        console.log('New Document ID:', result._id)
        console.log('\n👉 You can now refresh the Studio and the "Unknown fields" error will be gone.')
    } catch (error) {
        console.error('❌ Error resetting homepage:', error)
    }
}

resetHomepage()
