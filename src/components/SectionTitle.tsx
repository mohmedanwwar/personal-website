export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="section-title">
      <h2>{kicker}</h2>
      <p>{title}</p>
    </div>
  );
}
