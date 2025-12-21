"use client";

import { useState, useEffect } from "react";
import { SimpleDatePicker } from "../(marketing)/rooms/[slug]/_components/SimpleDatePicker";
import type { DateRange } from "react-day-picker";

export default function TestResponsivePage() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [showCalendar, setShowCalendar] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                    📱 Responsive Calendar Test Page
                </h1>
                
                {mounted && (
                    <div style={{ 
                        background: 'white', 
                        padding: '20px', 
                        borderRadius: '12px',
                        marginBottom: '30px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Current Screen Info
                        </h2>
                        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                            <div>Window Width: <strong>{window.innerWidth}px</strong></div>
                            <div>Window Height: <strong>{window.innerHeight}px</strong></div>
                            <div>Device Pixel Ratio: <strong>{window.devicePixelRatio}</strong></div>
                            <div>User Agent: <strong style={{ fontSize: '11px' }}>{navigator.userAgent}</strong></div>
                        </div>
                    </div>
                )}

                <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '12px',
                    marginBottom: '30px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                        Test Calendar Modal
                    </h2>
                    
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        style={{
                            padding: '12px 24px',
                            background: '#FF6B35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginBottom: '15px'
                        }}
                    >
                        {showCalendar ? 'Close Calendar' : 'Open Calendar'}
                    </button>

                    {dateRange?.from && (
                        <div style={{ marginTop: '15px', padding: '12px', background: '#f0f0f0', borderRadius: '8px' }}>
                            <strong>Selected:</strong>
                            <div>From: {dateRange.from.toDateString()}</div>
                            {dateRange.to && <div>To: {dateRange.to.toDateString()}</div>}
                        </div>
                    )}
                </div>

                {/* Calendar Modal */}
                {showCalendar && (
                    <>
                        {/* Backdrop */}
                        <div
                            onClick={() => setShowCalendar(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 9998,
                            }}
                        />
                        
                        {/* Calendar */}
                        <div
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 'calc(min(95vw, 400px))',
                                maxHeight: 'calc(min(90vh, 600px))',
                                minHeight: '300px',
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                border: '1px solid #ddd',
                                overflow: 'auto',
                                zIndex: 9999,
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            <SimpleDatePicker
                                selected={dateRange}
                                onSelect={(range) => {
                                    setDateRange(range);
                                    if (range?.from && range?.to) {
                                        setShowCalendar(false);
                                    }
                                }}
                            />
                        </div>
                    </>
                )}

                <div style={{ 
                    background: '#e3f2fd', 
                    padding: '20px', 
                    borderRadius: '12px',
                    border: '1px solid #90caf9'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                        📝 Testing Instructions
                    </h2>
                    <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Check the screen info above matches your device</li>
                        <li>Click "Open Calendar" button</li>
                        <li>Calendar should appear <strong>centered on screen</strong></li>
                        <li>Calendar should NOT be in bottom-right corner</li>
                        <li>Try selecting dates</li>
                        <li>Click backdrop (dark area) to close</li>
                        <li>Test on different screen sizes using DevTools</li>
                    </ol>

                    <div style={{ 
                        marginTop: '20px', 
                        padding: '15px', 
                        background: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #64b5f6'
                    }}>
                        <strong>Quick Device Tests:</strong>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>iPhone SE: 375 × 667</li>
                            <li>iPhone 12: 390 × 844</li>
                            <li>Kindle Fire HDX: 800 × 1280</li>
                            <li>iPad: 1024 × 1366</li>
                            <li>Desktop: 1920 × 1080</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
