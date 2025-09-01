import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { untrustedData, trustedData } = data;
  
  // Handle the frame interaction
  console.log('Frame interaction:', untrustedData);
  
  // You can add logic here to handle different button clicks
  // For now, we'll just redirect to the main app
  return NextResponse.json({
    message: 'Welcome to NFL Pick \'ems!',
    redirect: 'https://nfl-pick-ems.vercel.app'
  });
}

export async function GET() {
  // Return the frame metadata
  const frameMetadata = {
    title: 'NFL Pick \'ems',
    description: 'Weekly NFL prediction game on Base chain',
    image: 'https://nfl-pick-ems.vercel.app/og-image.png',
    buttons: [
      {
        label: 'Play Now',
        action: 'post'
      },
      {
        label: 'View Leaderboard',
        action: 'post'
      },
      {
        label: 'Connect Wallet',
        action: 'post'
      }
    ],
    postUrl: 'https://nfl-pick-ems.vercel.app/api/frame'
  };

  return NextResponse.json(frameMetadata);
}
