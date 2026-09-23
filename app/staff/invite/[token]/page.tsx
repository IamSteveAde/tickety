import { notFound } from "next/navigation";
import { createHash } from "crypto";
import { prisma } from "@/lib/db";
import StaffInvitationClient from "@/components/staff/StaffInvitationClient";

export const dynamic = "force-dynamic";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export default async function StaffInvitationPage({
  params,
}: {
  params: { token: string };
}) {
  const token = params.token?.trim();

  if (!token) {
    notFound();
  }

  const tokenHash = hashToken(token);

  const invitation = await prisma.staffInvitation.findUnique({
    where: {
      tokenHash,
    },
    select: {
      id: true,
      email: true,
      expiresAt: true,
      acceptedAt: true,
      revokedAt: true,
      event: {
        select: {
          id: true,
          title: true,
          venue: true,
          date: true,
        },
      },
      invitedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!invitation) {
    return (
      <StaffInvitationClient
        token={token}
        status="invalid"
      />
    );
  }

  if (invitation.revokedAt) {
    return (
      <StaffInvitationClient
        token={token}
        status="revoked"
        email={invitation.email}
        eventTitle={invitation.event.title}
      />
    );
  }

  if (invitation.acceptedAt) {
    return (
      <StaffInvitationClient
        token={token}
        status="accepted"
        email={invitation.email}
        eventTitle={invitation.event.title}
      />
    );
  }

  if (invitation.expiresAt <= new Date()) {
    return (
      <StaffInvitationClient
        token={token}
        status="expired"
        email={invitation.email}
        eventTitle={invitation.event.title}
      />
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: invitation.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (
    existingUser &&
    (existingUser.role === "ORGANISER" ||
      existingUser.role === "ADMIN")
  ) {
    return (
      <StaffInvitationClient
        token={token}
        status="restricted"
        email={invitation.email}
        eventTitle={invitation.event.title}
      />
    );
  }

  return (
    <StaffInvitationClient
      token={token}
      status="ready"
      email={invitation.email}
      eventTitle={invitation.event.title}
      venue={invitation.event.venue}
      eventDate={invitation.event.date.toISOString()}
      inviterName={invitation.invitedBy.name}
      existingUser={!!existingUser}
      existingUserName={existingUser?.name ?? null}
    />
  );
}