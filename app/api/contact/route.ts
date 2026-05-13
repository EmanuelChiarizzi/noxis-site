import { NextResponse } from 'next/server';
export async function POST(req: Request) { try { const body = await req.json(); console.log('CONTACT', body); return NextResponse.json({ ok: true }); } catch { return NextResponse.json({ ok: false }, { status: 500 }); } }
