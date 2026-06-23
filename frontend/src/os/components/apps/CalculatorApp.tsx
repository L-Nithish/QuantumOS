import { useEffect, useState } from 'react';

interface CalcButton {
  label: string;
  type: 'fn' | 'op' | 'num' | 'eq';
  action: 'clear' | 'input' | 'percent' | 'eval';
  val?: string;
}

const BUTTONS: CalcButton[] = [
  { label: 'C', type: 'fn', action: 'clear' },
  { label: '(', type: 'fn', action: 'input', val: '(' },
  { label: ')', type: 'fn', action: 'input', val: ')' },
  { label: '/', type: 'op', action: 'input', val: '/' },
  { label: '7', type: 'num', action: 'input', val: '7' },
  { label: '8', type: 'num', action: 'input', val: '8' },
  { label: '9', type: 'num', action: 'input', val: '9' },
  { label: '*', type: 'op', action: 'input', val: '*' },
  { label: '4', type: 'num', action: 'input', val: '4' },
  { label: '5', type: 'num', action: 'input', val: '5' },
  { label: '6', type: 'num', action: 'input', val: '6' },
  { label: '-', type: 'op', action: 'input', val: '-' },
  { label: '1', type: 'num', action: 'input', val: '1' },
  { label: '2', type: 'num', action: 'input', val: '2' },
  { label: '3', type: 'num', action: 'input', val: '3' },
  { label: '+', type: 'op', action: 'input', val: '+' },
  { label: '%', type: 'fn', action: 'percent' },
  { label: '0', type: 'num', action: 'input', val: '0' },
  { label: '.', type: 'num', action: 'input', val: '.' },
  { label: '=', type: 'eq', action: 'eval' },
];

export function CalculatorApp() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleCalc = (b: CalcButton) => {
    if (b.action === 'clear') {
      setExpression('');
      setResult('0');
      setJustEvaluated(false);
    } else if (b.action === 'input' && b.val) {
      setExpression((prev) => {
        let nextExpr = prev;
        if (justEvaluated && /[0-9.]/.test(b.val!)) {
          nextExpr = '';
        }
        setJustEvaluated(false);
        return nextExpr + b.val;
      });
    } else if (b.action === 'percent') {
      try {
        // Safe evaluation
        if (/^[\d+\-*/().%\s]+$/.test(expression)) {
          // eslint-disable-next-line no-eval
          const val = eval(expression) / 100;
          setExpression(String(val));
          setResult(String(val));
        }
      } catch (e) {
        setResult('Error');
      }
    } else if (b.action === 'eval') {
      try {
        // Safety: only allow numbers, math symbols
        if (/^[\d+\-*/().%\s]+$/.test(expression)) {
          // eslint-disable-next-line no-eval
          const evalResult = eval(expression);
          const formattedResult = Number.isFinite(evalResult)
            ? parseFloat(evalResult.toFixed(10))
            : 'Error';
          setResult(String(formattedResult));
          setExpression(String(Number.isFinite(evalResult) ? formattedResult : ''));
          setJustEvaluated(true);
        } else {
          setResult('Error');
          setExpression('');
          setJustEvaluated(true);
        }
      } catch (e) {
        setResult('Error');
        setExpression('');
        setJustEvaluated(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9.+\-*/()%]/.test(key)) {
        handleCalc({ label: key, type: 'num', action: 'input', val: key });
      } else if (key === 'Enter' || key === '=') {
        handleCalc({ label: '=', type: 'eq', action: 'eval' });
      } else if (key === 'Backspace') {
        setExpression((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        handleCalc({ label: 'C', type: 'fn', action: 'clear' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expression, justEvaluated]);

  const displayExpr = expression.replace(/\*/g, '×').replace(/\//g, '÷');

  return (
    <div className="calc-container">
      <div className="calc-display">
        <div className="calc-expr" id="calc-expr">
          {displayExpr}
          {justEvaluated && displayExpr ? ' =' : ''}
        </div>
        <div className="calc-result" id="calc-result">
          {result}
        </div>
      </div>
      <div className="calc-grid" id="calc-grid">
        {BUTTONS.map((b, idx) => (
          <button
            key={`btn-${idx}`}
            className={`calc-btn ${b.type}`}
            onClick={() => handleCalc(b)}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
