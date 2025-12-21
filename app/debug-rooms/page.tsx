import { getRooms } from "@/lib/rooms/sanity-queries";

export const revalidate = 0; // No cache for debugging

export default async function DebugRoomsPage() {
    const rooms = await getRooms();
    
    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', fontSize: '14px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>🔍 Debug: Rooms Data from Sanity</h1>
            
            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <strong>Total Rooms Found:</strong> {rooms.length}
            </div>
            
            {rooms.map((room, index) => (
                <div key={room._id} style={{ 
                    background: 'white', 
                    padding: '20px', 
                    marginBottom: '20px', 
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#FF6B35' }}>
                        Room {index + 1}: {room.title}
                    </h2>
                    
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px', fontWeight: 'bold', width: '200px' }}>ID:</td>
                                <td style={{ padding: '8px' }}>{room._id}</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px', fontWeight: 'bold' }}>Slug:</td>
                                <td style={{ padding: '8px' }}>{room.slug.current}</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px', fontWeight: 'bold' }}>Price:</td>
                                <td style={{ padding: '8px' }}>GHS {room.price}</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px', fontWeight: 'bold' }}>Capacity:</td>
                                <td style={{ padding: '8px' }}>{room.capacity} guests</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee', background: room.cancellationPolicy ? '#e8f5e9' : '#ffebee' }}>
                                <td style={{ padding: '8px', fontWeight: 'bold' }}>Cancellation Policy:</td>
                                <td style={{ padding: '8px' }}>
                                    {room.cancellationPolicy ? (
                                        <span style={{ color: 'green' }}>✅ {room.cancellationPolicy}</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>❌ NOT SET (will use default)</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
            
            <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', marginTop: '30px' }}>
                <h3 style={{ marginBottom: '10px' }}>📝 Instructions:</h3>
                <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Check if cancellationPolicy shows ✅ (green) or ❌ (red)</li>
                    <li>If ❌, go to Sanity Studio: <a href="http://localhost:3002/studio" target="_blank">http://localhost:3002/studio</a></li>
                    <li>Click &quot;Room&quot; → Select each room that shows ❌</li>
                    <li>Go to tab &quot;6. Additional Details&quot;</li>
                    <li>Fill in &quot;Cancellation Policy&quot; field</li>
                    <li>Click &quot;Publish&quot;</li>
                    <li>Wait 60 seconds and refresh this page</li>
                </ol>
            </div>
            
            <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
                <strong>Raw Data (JSON):</strong>
                <pre style={{ 
                    background: '#f8f9fa', 
                    padding: '15px', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '12px',
                    marginTop: '10px'
                }}>
                    {JSON.stringify(rooms.map(r => ({
                        title: r.title,
                        slug: r.slug.current,
                        cancellationPolicy: r.cancellationPolicy || null
                    })), null, 2)}
                </pre>
            </div>
        </div>
    );
}
