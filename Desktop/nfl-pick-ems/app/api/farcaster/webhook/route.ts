import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Farcaster webhook received:', body)
    
    // Handle different types of Farcaster notifications
    const { type, data } = body
    
    switch (type) {
      case 'pick_submitted':
        // Handle when someone submits picks
        console.log('Pick submitted notification:', data)
        break
        
      case 'week_completed':
        // Handle when a week is completed
        console.log('Week completed notification:', data)
        break
        
      case 'winner_announced':
        // Handle when winners are announced
        console.log('Winner announced notification:', data)
        break
        
      default:
        console.log('Unknown notification type:', type)
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Notification processed successfully' 
    })
    
  } catch (error) {
    console.error('Error processing Farcaster webhook:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process notification' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({ 
    status: 'healthy', 
    service: 'Farcaster Webhook',
    timestamp: new Date().toISOString()
  })
}
