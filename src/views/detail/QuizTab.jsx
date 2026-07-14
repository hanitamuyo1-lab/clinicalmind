import { useEffect, useState } from 'react';
import { useProgress } from '../../context/ProgressProvider.jsx';

export function QuizTab({ conditionId, quizBank }) {
  const { actions } = useProgress();
  const [qIndex, setQIndex] = useState(0);
  const [qSelected, setQSelected] = useState(null);
  const [qAnswered, setQAnswered] = useState(false);
  const [qScore, setQScore] = useState(0);
  const [qFinished, setQFinished] = useState(false);

  useEffect(() => { setQIndex(0); setQSelected(null); setQAnswered(false); setQScore(0); setQFinished(false); }, [conditionId]);

  const q = quizBank[Math.min(qIndex, quizBank.length - 1)];

  function select(i) {
    if (qAnswered) return;
    const correct = q.answer === i;
    setQSelected(i);
    setQAnswered(true);
    setQScore(s => s + (correct ? 1 : 0));
  }

  function next() {
    if (qIndex >= quizBank.length - 1) {
      setQFinished(true);
      actions.recordQuiz(conditionId, qScore, quizBank.length);
      return;
    }
    setQIndex(i => i + 1);
    setQSelected(null);
    setQAnswered(false);
  }

  function restart() {
    setQIndex(0); setQSelected(null); setQAnswered(false); setQScore(0); setQFinished(false);
  }

  if (qFinished) {
    let qVerdict = 'Keep going', qVerdictSub = 'Revisit the cascade and the priorities, then try again.';
    if (qScore === quizBank.length) { qVerdict = 'Outstanding'; qVerdictSub = 'Full marks — you’ve connected mechanism to management. On to the next condition.'; }
    else if (qScore >= quizBank.length - 1) { qVerdict = 'Strong work'; qVerdictSub = 'Nearly there — review the one you missed and lock it in.'; }
    else if (qScore >= Math.ceil(quizBank.length * 0.6)) { qVerdict = 'Solid start'; qVerdictSub = 'A good foundation. Re-explore the mechanism map to firm up the weak spots.'; }
    return (
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '50px 20px', border: '1px solid var(--border2)', borderRadius: 18, background: 'rgba(15,107,94,0.08)' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 46, color: 'var(--teal-bright)', lineHeight: 1 }}>{qScore}/{quizBank.length}</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, margin: '10px 0 6px' }}>{qVerdict}</div>
          <div style={{ fontSize: 13, color: 'rgba(194,240,234,.55)', marginBottom: 22, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>{qVerdictSub}</div>
          <div onClick={restart} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--black)', background: 'var(--teal-bright)', borderRadius: 9, padding: '10px 18px' }}>Retake quiz</div>
        </div>
      </div>
    );
  }

  const qCorrect = qAnswered && qSelected === q.answer;
  const qProgPct = Math.round(((qIndex + (qAnswered ? 1 : 0)) / quizBank.length) * 100);

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: 'rgba(194,240,234,.5)' }}>Question {qIndex + 1} of {quizBank.length}</div>
        <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(37,196,168,0.12)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${qProgPct}%`, background: 'var(--teal-bright)' }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--teal-bright)' }}>Score {qScore}</div>
      </div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 21, lineHeight: 1.35, marginBottom: 18 }}>{q.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {q.opts.map((label, i) => {
          let bg = 'rgba(15,107,94,0.06)', bd = 'var(--border)', col = 'var(--white2)', mark = String.fromCharCode(65 + i), markBg = 'rgba(37,196,168,0.1)', markCol = 'var(--teal-light)';
          if (qAnswered) {
            if (i === q.answer) { bg = 'rgba(54,212,114,0.1)'; bd = 'rgba(54,212,114,0.4)'; col = '#d6ffe8'; mark = '✓'; markBg = '#36d472'; markCol = '#0a0e0d'; }
            else if (i === qSelected) { bg = 'rgba(232,93,93,0.1)'; bd = 'rgba(232,93,93,0.4)'; col = '#ffd9d9'; mark = '✕'; markBg = '#e85d5d'; markCol = '#0a0e0d'; }
            else { col = 'rgba(194,240,234,0.4)'; }
          }
          return (
            <div key={i} onClick={() => select(i)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 11,
              cursor: qAnswered ? 'default' : 'pointer', fontSize: 14, transition: 'all .15s', background: bg, border: `1px solid ${bd}`, color: col,
            }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flex: 'none', background: markBg, color: markCol }}>{mark}</span>
              <span style={{ flex: 1 }}>{label}</span>
            </div>
          );
        })}
      </div>
      {qAnswered && (
        <div style={{ marginTop: 16, border: '1px solid var(--border)', borderRadius: 11, padding: '14px 16px', background: 'rgba(15,107,94,0.08)' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--teal-mid)', marginBottom: 6 }}>{qCorrect ? '✓ Correct' : '✕ Not quite'}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(194,240,234,.75)' }}>{q.explain}</div>
          <div onClick={next} style={{
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 14, fontSize: 13, fontWeight: 500,
            color: 'var(--black)', background: 'var(--teal-bright)', borderRadius: 9, padding: '9px 17px',
          }}>
            {qIndex >= quizBank.length - 1 ? 'See results' : 'Next question'}
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}><path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      )}
    </div>
  );
}
