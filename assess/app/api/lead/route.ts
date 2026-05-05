import { submitLeadPipeline } from "@/lib/assessmentBackend";
import type { LeadPayload } from "@/lib/assessmentTypes";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    await submitLeadPipeline(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/lead]", e);
    return NextResponse.json(
      { ok: false, error: "Unable to submit" },
      { status: 500 },
    );
  }
}
