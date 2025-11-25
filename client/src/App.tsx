import { useEffect, useState } from 'react';
import { loginId, startAuth, finishAuth, getDashboard, markAttendance, startReg, finishReg } from './api';

type DashboardData = any;

export default function App() {
  const [studentId, setStudentId] = useState('S12345');
  const [password, setPassword] = useState('demo');
  const [dash, setDash] = useState<DashboardData | null>(null);
  const [status, setStatus] = useState('');

  const load = async () => setDash(await getDashboard(studentId));

  const doLoginId = async () => {
    const r = await loginId(studentId, password);
    if (r.ok) {
      setStatus('Logged in by ID');
      load();
    } else setStatus('Login failed');
  };

  const doPasskeyRegister = async () => {
    try {
      const opts = await startReg(studentId);
      // @ts-ignore
      const cred = await navigator.credentials.create({ publicKey: opts });
      const r = await finishReg(studentId, cred);
      setStatus(r.ok ? 'Device Auth Registered' : 'Registration failed');
    } catch (e) {
      setStatus('Registration not available');
    }
  };

  const doPasskeyLogin = async () => {
    try {
      const opts = await startAuth(studentId);
      // @ts-ignore
      const cred = await navigator.credentials.get({ publicKey: opts });
      const r = await finishAuth(studentId, cred);
      if (r.ok) {
        setStatus('Logged in via Face/Passkey');
        load();
      } else setStatus('Auth failed');
    } catch (e) {
      setStatus('Use ID login if device auth unavailable');
    }
  };

  const attend = async (courseId: string) => {
    const method = dash ? 'webauthn' : 'id';
    await markAttendance(studentId, courseId, method);
    setStatus('Attendance recorded');
    load();
  };

  useEffect(() => {}, []);

  if (!dash) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="w-[420px] bg-slate-900/60 backdrop-blur rounded-xl p-6 shadow-lg border border-cyan-500/30">
          <h1 className="text-2xl font-mono text-cyan-400">Computerestic Portal</h1>
          <p className="text-sm text-slate-400 mb-4">Secure Student Access</p>
          <input
            className="w-full my-2 p-2 rounded bg-slate-800 border border-slate-700"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student ID"
          />
          <input
            className="w-full my-2 p-2 rounded bg-slate-800 border border-slate-700"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-2 bg-cyan-600 rounded hover:bg-cyan-500" onClick={doLoginId}>
              Login ID
            </button>
            <button className="px-3 py-2 bg-emerald-600 rounded hover:bg-emerald-500" onClick={doPasskeyLogin}>
              Login Face/Passkey
            </button>
            <button className="px-3 py-2 bg-fuchsia-600 rounded hover:bg-fuchsia-500" onClick={doPasskeyRegister}>
              Register Device Auth
            </button>
          </div>
          <p className="text-xs mt-3 text-cyan-300">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-cyan-500/30 bg-slate-900/70 sticky top-0 backdrop-blur">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h2 className="font-mono text-cyan-400">Computerestic Dashboard</h2>
          <span className="text-sm text-slate-400">ID: {studentId}</span>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 grid lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="font-mono text-cyan-300">Results</h3>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              {dash.results.map((r: any) => (
                <div key={r.id} className="p-3 rounded bg-slate-800 border border-slate-700">
                  <div className="flex justify-between">
                    <span>{r.periodLabel}</span>
                    <span className="text-emerald-400 font-bold">GPA {r.gpa}</span>
                  </div>
                  <p className="text-xs text-slate-400">{r.details}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="font-mono text-cyan-300">Assignments</h3>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              {dash.assignments.map((a: any) => (
                <div key={a.id} className="p-3 rounded bg-slate-800 border border-slate-700">
                  <div className="flex justify-between">
                    <span>{a.courseTitle}</span>
                    <span className="text-fuchsia-400">{a.title}</span>
                  </div>
                  <p className="text-xs text-slate-400">Due {a.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="font-mono text-cyan-300">Routine</h3>
            <ul className="space-y-2">
              {dash.routine.map((r: any) => (
                <li key={r.id} className="flex justify-between items-center p-2 rounded bg-slate-800 border border-slate-700">
                  <div>
                    <div className="text-cyan-200">{r.title}</div>
                    <div className="text-xs text-slate-400">
                      {r.day} • {r.time} • {r.room}
                    </div>
                  </div>
                  <button className="px-2 py-1 bg-emerald-600 rounded hover:bg-emerald-500" onClick={() => attend(r.courseId)}>
                    Attend
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="font-mono text-cyan-300">Credits & Teachers</h3>
            <ul className="space-y-2">
              {dash.courses.map((c: any) => (
                <li key={c.id} className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="flex justify-between">
                    <span>{c.title}</span>
                    <span className="text-emerald-400">{c.credit} cr</span>
                  </div>
                  <div className="text-xs text-slate-400">By {c.teacher}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-cyan-500/30">
            <h3 className="font-mono text-cyan-300">Progress</h3>
            <p className="text-sm text-slate-300">
              Completed: {dash.results.length} • Remaining: {Math.max(0, dash.courses.length - dash.results.length)}
            </p>
          </div>
        </aside>
      </main>
      <footer className="border-t border-cyan-500/30 p-4 text-center text-xs text-slate-500">Made for CS students — neon matrix vibes.</footer>
    </div>
  );
}
