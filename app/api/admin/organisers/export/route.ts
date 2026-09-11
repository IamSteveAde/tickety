import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrganisersSummary } from "@/lib/data";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organisers = await getOrganisersSummary();
  const csv = toCsv(organisers, [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "eventCount", header: "Events Created" },
  ]);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="organisers.csv"',
    },
  });
}