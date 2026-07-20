import { useMemo, useState } from 'react'

type Tab = 'today' | 'program' | 'progress' | 'measurements' | 'settings'
type DayMode = 'green' | 'blue'
type Exercise = { id: string; name: string; amount: string; cue: string; section: string; optional?: boolean }
type Session = { date: string; mode: DayMode; completed: number; total: number; kneePain: number; stiffness: number; notes: string }
type Measurement = { date: string; waist?: number; belly?: number; arm?: number; weight?: number; note?: string }
type Store = { sessions: Session[]; measurements: Measurement[]; startDate: string }

const STORAGE_KEY = 'project-phoenix-data-v1'
const today = new Date().toISOString().slice(0, 10)

const exercises: Exercise[] = [
  { id:'march', name:'March in place', amount:'2 minutes', cue:'Easy pace. Lift only as high as comfortable.', section:'Standing warm-up' },
  { id:'shoulders', name:'Shoulder rolls', amount:'20 total', cue:'Slow circles, half forward and half backward.', section:'Standing warm-up' },
  { id:'hips', name:'Hip circles', amount:'10 each direction', cue:'Keep the circles comfortable and controlled.', section:'Standing warm-up' },
  { id:'swings-front', name:'Leg swings, front/back', amount:'10 each leg', cue:'Hold a chair or wall. Keep the range small.', section:'Standing warm-up' },
  { id:'swings-side', name:'Leg swings, side/side', amount:'10 each leg', cue:'Move from the hip without twisting the knee.', section:'Standing warm-up' },
  { id:'ankles', name:'Ankle circles', amount:'10 each direction', cue:'Use a chair for balance if needed.', section:'Standing warm-up' },
  { id:'sitstand', name:'Sit-to-stand', amount:'2 sets × 8', cue:'Use a supportive chair. Stop before knee pain increases.', section:'Standing strength' },
  { id:'wallpush', name:'Wall push-ups', amount:'2 sets × 10', cue:'Body stays long. Bend elbows and press away.', section:'Standing strength' },
  { id:'heels', name:'Heel raises', amount:'2 sets × 15', cue:'Rise and lower slowly while holding support.', section:'Standing strength' },
  { id:'calfstraight', name:'Wall calf stretch, straight knee', amount:'45 seconds each', cue:'Back heel stays down; stretch the upper calf.', section:'Standing stretches' },
  { id:'calfbent', name:'Wall calf stretch, bent knee', amount:'45 seconds each', cue:'Keep heel down and gently bend the back knee.', section:'Standing stretches' },
  { id:'hipflexor', name:'Standing hip-flexor stretch', amount:'45 seconds each', cue:'Step back and gently tuck the pelvis under.', section:'Standing stretches' },
  { id:'bridge', name:'Glute bridges', amount:'2 sets × 10', cue:'Press through feet and squeeze your glutes.', section:'Floor strength' },
  { id:'clam', name:'Clamshells', amount:'2 sets × 12 each', cue:'Keep hips stacked and movement small.', section:'Floor strength' },
  { id:'bird', name:'Bird dogs', amount:'2 sets × 8 each', cue:'Move slowly and keep your middle steady.', section:'Floor strength' },
  { id:'deadbug', name:'Dead bugs', amount:'2 sets × 8 each', cue:'Keep your lower back gently supported.', section:'Floor strength', optional:true },
  { id:'hamstring', name:'Supine hamstring stretch', amount:'45–60 seconds each', cue:'Use a towel or hold behind the thigh. Do not force the knee straight.', section:'Floor stretches' },
  { id:'figure4', name:'Figure-4 stretch', amount:'45 seconds each', cue:'Stretch should be felt in the glute, not the knee.', section:'Floor stretches' },
  { id:'butterfly', name:'Butterfly stretch', amount:'60 seconds', cue:'Sit tall and let the knees relax outward.', section:'Floor stretches' },
  { id:'child', name:"Child's pose", amount:'60 seconds', cue:'Use a pillow and widen knees if more comfortable.', section:'Floor stretches' },
  { id:'forward', name:'Seated forward fold', amount:'60 seconds', cue:'Bend knees and hinge gently from the hips.', section:'Floor stretches' },
  { id:'breathing', name:'Deep breathing', amount:'2 minutes', cue:'Slow inhale, longer exhale. Workout complete.', section:'Finish' },
]

const greenIds = new Set(['march','shoulders','hips','ankles','sitstand','wallpush','heels','calfstraight','calfbent','hipflexor','hamstring','figure4','breathing'])

function loadStore(): Store {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw) }
  catch { /* start fresh */ }
  return { sessions: [], measurements: [], startDate: today }
}

function saveStore(store: Store) { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)) }

export default function App() {
  const [tab, setTab] = useState<Tab>('today')
  const [store, setStore] = useState<Store>(loadStore)
  const [mode, setMode] = useState<DayMode>('blue')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [pain, setPain] = useState(0)
  const [stiffness, setStiffness] = useState(0)
  const [notes, setNotes] = useState('')
  const visibleExercises = mode === 'green' ? exercises.filter(e => greenIds.has(e.id)) : exercises

  const updateStore = (next: Store) => { setStore(next); saveStore(next) }
  const sections = useMemo(() => [...new Set(visibleExercises.map(e => e.section))], [visibleExercises])
  const completedToday = store.sessions.find(s => s.date === today)

  function completeWorkout() {
    const session: Session = { date: today, mode, completed: checked.size, total: visibleExercises.length, kneePain: pain, stiffness, notes }
    updateStore({ ...store, sessions: [session, ...store.sessions.filter(s => s.date !== today)] })
    setChecked(new Set())
  }

  function addMeasurement(form: HTMLFormElement) {
    const data = new FormData(form)
    const value = (key: string) => { const v = data.get(key)?.toString(); return v ? Number(v) : undefined }
    const entry: Measurement = { date: data.get('date')?.toString() || today, waist:value('waist'), belly:value('belly'), arm:value('arm'), weight:value('weight'), note:data.get('note')?.toString() }
    updateStore({ ...store, measurements:[entry, ...store.measurements] })
    form.reset()
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type:'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=`project-phoenix-${today}.json`; a.click(); URL.revokeObjectURL(url)
  }

  function importData(file?: File) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { try { const parsed = JSON.parse(String(reader.result)); updateStore(parsed); alert('Your Phoenix data has been restored.') } catch { alert('That file could not be imported.') } }
    reader.readAsText(file)
  }

  return <div className="app">
    <header><div><span className="eyebrow">PROJECT PHOENIX</span><h1>Gentle strength. Quiet fire.</h1></div><div className="flame">✦</div></header>
    <main>
      {tab === 'today' && <>
        <section className="hero-card">
          <div><p className="muted">TODAY · {new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</p><h2>{completedToday ? 'Today is complete' : 'Choose your movement day'}</h2></div>
          <div className="segmented">
            <button className={mode==='green'?'active':''} onClick={()=>setMode('green')}>Green · 15 min</button>
            <button className={mode==='blue'?'active':''} onClick={()=>setMode('blue')}>Blue · 25–30 min</button>
          </div>
          <p>{mode==='green' ? 'A gentle fallback for busy, low-energy, or tender-knee days.' : 'Your full foundation workout, ordered standing first and floor work last.'}</p>
        </section>

        <section className="checkin card"><h3>Before you begin</h3><div className="slider-grid">
          <label>Knee pain <strong>{pain}/10</strong><input type="range" min="0" max="10" value={pain} onChange={e=>setPain(Number(e.target.value))}/></label>
          <label>Stiffness <strong>{stiffness}/10</strong><input type="range" min="0" max="10" value={stiffness} onChange={e=>setStiffness(Number(e.target.value))}/></label>
        </div>{(pain>=5 || stiffness>=6) && <div className="notice">Today may be better suited to a Green Day. Stop any movement that increases pain.</div>}</section>

        {sections.map(section => <section className="workout-section" key={section}><h3>{section}</h3>{visibleExercises.filter(e=>e.section===section).map(e => <label className={`exercise ${checked.has(e.id)?'done':''}`} key={e.id}>
          <input type="checkbox" checked={checked.has(e.id)} onChange={()=>setChecked(prev=>{const n=new Set(prev); n.has(e.id)?n.delete(e.id):n.add(e.id); return n})}/>
          <span className="checkmark">✓</span><span className="exercise-copy"><strong>{e.name}</strong><b>{e.amount}</b><small>{e.cue}{e.optional?' Optional during Week 1.':''}</small></span>
        </label>)}</section>)}
        <section className="card"><label className="field">Workout notes<textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="How did your knee and energy feel?" /></label>
          <button className="primary" onClick={completeWorkout}>Complete workout · {checked.size}/{visibleExercises.length}</button></section>
      </>}

      {tab === 'program' && <section><div className="page-title"><p className="eyebrow">FOUR-WEEK FOUNDATION</p><h2>Your rebuild path</h2></div>
        {[['Week 1','Wake everything up','Use the listed amounts. Dead bugs are optional.'],['Week 2','Build stability','Increase bridges to 2×15, push-ups to 2×15, bird dogs to 2×10, and add dead bugs.'],['Week 3','Build strength','Use 3×10 sit-to-stands, 3×15 bridges and heel raises, and 3×10 core work. Add 2×10 mini squats only if the knee feels good.'],['Week 4','Confidence circuit','Repeat 2–3 rounds: 10 sit-to-stands, 12 wall push-ups, 15 bridges, 15 heel raises, 10 bird dogs and 10 dead bugs per side.']].map((w,i)=><article className="week card" key={w[0]}><span>{i+1}</span><div><h3>{w[0]} · {w[1]}</h3><p>{w[2]}</p></div></article>)}
        <div className="notice">Knee pain lasting eight weeks deserves evaluation by a healthcare professional or physical therapist, especially with swelling, locking, giving way, worsening pain, or limited motion.</div></section>}

      {tab === 'progress' && <section><div className="page-title"><p className="eyebrow">YOUR EMBER TRAIL</p><h2>Progress</h2></div>
        <div className="stats"><div><strong>{store.sessions.length}</strong><span>workouts</span></div><div><strong>{store.sessions.reduce((a,s)=>a+s.completed,0)}</strong><span>exercises</span></div><div><strong>{store.sessions.length ? Math.round(store.sessions.reduce((a,s)=>a+s.kneePain,0)/store.sessions.length*10)/10 : 0}</strong><span>avg. knee pain</span></div></div>
        <h3>Workout history</h3>{store.sessions.length===0?<p className="empty">Your first completed workout will appear here.</p>:store.sessions.map(s=><article className="history card" key={s.date}><div><strong>{new Date(s.date+'T12:00:00').toLocaleDateString()}</strong><span className={`pill ${s.mode}`}>{s.mode} day</span></div><p>{s.completed}/{s.total} exercises · Knee {s.kneePain}/10 · Stiffness {s.stiffness}/10</p>{s.notes&&<small>{s.notes}</small>}</article>)}</section>}

      {tab === 'measurements' && <section><div className="page-title"><p className="eyebrow">MONTHLY, NOT DAILY</p><h2>Measurements</h2></div><p className="muted">Use the same placement and conditions each time. These are information, not a verdict.</p>
        <form className="card measurement-form" onSubmit={e=>{e.preventDefault();addMeasurement(e.currentTarget)}}><label>Date<input name="date" type="date" defaultValue={today}/></label><div className="form-grid"><label>Waist (in)<input name="waist" type="number" step="0.1"/></label><label>Lower belly (in)<input name="belly" type="number" step="0.1"/></label><label>Upper arm (in)<input name="arm" type="number" step="0.1"/></label><label>Weight (optional)<input name="weight" type="number" step="0.1"/></label></div><label>Note<textarea name="note" placeholder="Clothing fit, energy, confidence, non-scale wins…"/></label><button className="primary">Save measurement</button></form>
        {store.measurements.map((m,i)=><article className="card history" key={m.date+i}><strong>{new Date(m.date+'T12:00:00').toLocaleDateString()}</strong><p>Waist {m.waist??'—'} · Belly {m.belly??'—'} · Arm {m.arm??'—'} · Weight {m.weight??'—'}</p>{m.note&&<small>{m.note}</small>}</article>)}</section>}

      {tab === 'settings' && <section><div className="page-title"><p className="eyebrow">KEEP YOUR DATA YOURS</p><h2>Settings & backup</h2></div><div className="card"><h3>Backup</h3><p>Your information is stored only in this browser. Export a backup before clearing browser data or changing phones.</p><div className="button-row"><button className="primary" onClick={exportData}>Export data</button><label className="secondary upload">Import data<input type="file" accept="application/json" onChange={e=>importData(e.target.files?.[0])}/></label></div></div><div className="card"><h3>Reset</h3><button className="danger" onClick={()=>{if(confirm('Delete all locally stored Phoenix data?')) updateStore({sessions:[],measurements:[],startDate:today})}}>Delete local data</button></div><div className="card"><h3>Install on your phone</h3><p>Open the deployed site in your phone browser and choose <strong>Add to Home Screen</strong> or <strong>Install app</strong>.</p></div></section>}
    </main>
    <nav>{([['today','Today','◉'],['program','Program','▤'],['progress','Progress','↗'],['measurements','Measure','◇'],['settings','Settings','⚙']] as [Tab,string,string][]).map(([id,label,icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><span>{icon}</span>{label}</button>)}</nav>
  </div>
}
