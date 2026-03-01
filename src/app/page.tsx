export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-6xl text-foreground">Oslo Herbs</h1>
        <p className="font-body text-xl text-muted mt-4">Design system loaded</p>
        <div className="mt-8 glass rounded-[20px] p-6 inline-block">
          <p className="text-accent-gold font-heading text-2xl">Glassmorphic Card</p>
        </div>
      </div>
      <div className="grain-overlay" />
    </main>
  );
}
