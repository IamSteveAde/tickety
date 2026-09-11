export default function WhatsAppMockup() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] border-8 border-ink bg-ink shadow-2xl">
      <div className="overflow-hidden rounded-[1.5rem] bg-[#ECE5DD]">
        {/* Chat header */}
        <div className="flex items-center gap-3 bg-leaf-600 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-display text-sm font-bold text-leaf-600">
            T
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Tickety Bot</p>
            <p className="text-xs text-leaf-100">online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-2 px-3 py-4">
          <ChatBubble from="bot">
            Hi Ada — you tapped in from <strong>Afrobeats Picnic — Lagos</strong>. Here&apos;s what&apos;s
            available:
            <br />
            <br />
            Regular — ₦5,000 (240 left)
            <br />
            VIP — ₦15,000 (32 left)
            <br />
            Table for 4 — ₦50,000 (6 left)
          </ChatBubble>
          <ChatBubble from="user">VIP</ChatBubble>
          <ChatBubble from="bot">Great choice — how many VIP tickets?</ChatBubble>
          <ChatBubble from="user">2</ChatBubble>
          <ChatBubble from="bot">
            ✔ Payment received!
            <br />
            <strong>Ticket #TCK-88213</strong>
            <br />
            2× VIP · Sat, 12 Sept
            <br />
            QR activates 2 hours before doors open.
          </ChatBubble>
          <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2">
            <span className="h-1.5 w-1.5 animate-blink1 rounded-full bg-ink-light" />
            <span className="h-1.5 w-1.5 animate-blink2 rounded-full bg-ink-light" />
            <span className="h-1.5 w-1.5 animate-blink3 rounded-full bg-ink-light" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  from,
  children,
}: {
  from: "bot" | "user";
  children: React.ReactNode;
}) {
  const isUser = from === "user";
  return (
    <div
      className={
        isUser
          ? "self-end rounded-2xl rounded-br-sm bg-leaf-500 px-3 py-2 text-sm text-white max-w-[80%]"
          : "self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-ink max-w-[85%]"
      }
    >
      {children}
    </div>
  );
}
