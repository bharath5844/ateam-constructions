import React from 'react';
import { INSPO_ALL, IMG } from '../site/media';

const ROW1 = [IMG.elevA, ...INSPO_ALL.slice(0, 12), IMG.elevC];
const ROW2 = [IMG.ceiling, ...INSPO_ALL.slice(12), IMG.kitchen].reverse();

function Row({ list, rev }) {
  const items = [...list, ...list];
  return (
    <div className={`s-inspo-row ${rev ? 'rev' : ''}`}>
      <div className="s-inspo-track">
        {items.map((u, k) => <figure key={k}><img src={u} alt="" loading="lazy" /></figure>)}
      </div>
    </div>
  );
}

export default function Inspo() {
  return (
    <section className="s-inspo" aria-label="Home design inspiration">
      <Row list={ROW1} />
      <Row list={ROW2} rev />
    </section>
  );
}
