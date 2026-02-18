import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the webhook data for debugging
    console.log('Farcaster webhook received:', body)
    
    // Handle different types of webhook events
    const { type, data } = body
    
    switch (type) {
      case 'user_joined':
        // User added your app to their list
        console.log('User joined:', data)
        break
        
      case 'user_left':
        // User removed your app
        console.log('User left:', data)
        break
        
      case 'notification_clicked':
        // User clicked a notification
        console.log('Notification clicked:', data)
        break
        
      default:
        console.log('Unknown webhook type:', type)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({ status: 'ok', message: 'NFL Pick ems webhook endpoint' })
}
