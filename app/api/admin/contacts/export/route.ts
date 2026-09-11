import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllContactsAdmin } from "@/lib/data";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contacts = await getAllContactsAdmin();
  const csv = toCsv(contacts, [
    { key: "organiserName", header: "Organiser" },
    { key: "eventTitle", header: "Event" },
    { key: "name", header: "Name" },
    { key: "phone", header: "Phone" },
    { key: "email", header: "Email" },
    { key: "ticketType", header: "Ticket Type" },
    { key: "amountPaid", header: "Amount Paid" },
    { key: "paymentStatus", header: "Payment Status" },
    { key: "purchaseDate", header: "Date" },
    { key: "answers", header: "Question Answers" },
  ]);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="all-contacts.csv"',
    },
  });
}