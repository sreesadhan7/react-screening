import { NextRequest, NextResponse } from 'next/server'

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export function handleCors(request: NextRequest, response: NextResponse) {
  const headers = corsHeaders()
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

export function createCorsResponse(data?: unknown, status: number = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(),
  })
}

// For handling OPTIONS preflight requests
export function handleOptions() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  })
}
