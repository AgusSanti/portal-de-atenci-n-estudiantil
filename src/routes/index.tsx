import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, HandCoins, CalendarCheck, FileText, Trash2, X, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal de Reservas RREE · USM San Joaquín" },
      { name: "description", content: "Agenda atención de salud, apoyo psicológico y asistencia social en Relaciones Estudiantiles USM." },
      { property: "og:title", content: "Portal de Reservas RREE · USM San Joaquín" },
      { property: "og:description", content: "Agenda atención de salud y asistencia social en RREE USM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: App,
});

type Cat = "salud" | "social";
type Cita = { id: string; cat: Cat; prof: string; fecha: string; bloque: string; tramite: string; comentario: string; creada: string };

const USER = { nombre: "Adolfo Epstein", rol: "202273514-K", carrera: "Ing. Civil Informática" };
const CATS: Record<Cat, string> = { salud: "Salud / Psicología", social: "Asistencia Social" };
const PROFS: Record<Cat, string[]> = {
  salud: [
    "Sr. Cristóbal Cortázar - Psicólogo(a) Clínico(a), Edificio F, Primer Piso",
    "Sra. María Berríos - Psicólogo(a) Clínico(a), Edificio F, Primer Piso",
    "Srta. Andrea Schifferli - Psicólogo(a) Consejería, Edificio F, Primer Piso",
    "Srta. Josefa Goic - Psicólogo(a) Clínico(a), Edificio F, Primer Piso",
    "Srta. Soledad Kobilic - Psicólogo(a) Consejería, Edificio F, Primer Piso",
    "Dr. Stefano Colonelli - Médico(a), Centro Médico y Dental San Joaquín",
    "Dra. Martina Piulats - Médico(a), Centro Médico y Dental San Joaquín",
    "Dr. Matías Pérez - Odontólogo(a), Centro Médico y Dental San Joaquín",
    "Dra. Bernardita Cruchaga - Odontólogo(a), Centro Médico y Dental San Joaquín"
  ],
  social: [
    "Sra. Carmen Cárdenas Mundaca - Asistente Social, Oficina F-152, carmen.cardenas@usm.cl",
    "Sra. Patricia Lagos - Asistente Social, Oficina F-153, patricia.lagos@usm.cl",
  ],
};
const TRAMITES: Record<Cat, string[]> = {
  salud: ["Primera consulta psicológica", "Control psicológico", "Consulta médica general", "Atención dental", "Certificado médico"],
  social: ["Congelar con Gratuidad", "Pérdida de beneficios MINEDUC", "Postulación Becas MINEDUC", "Apelación Gratuidad", "Orientación socioeconómica"],
};
// Trámites disponibles según cada profesional de salud (los de asistencia social son comunes a ambos).
const PRO_TRAMITES: Record<string, string[]> = {
  [PROFS.salud[0]!]: ["Primera consulta psicológica", "Control psicológico"],
  [PROFS.salud[1]!]: ["Primera consulta psicológica", "Control psicológico"],
  [PROFS.salud[2]!]: ["Primera consulta psicológica", "Control psicológico"],
  [PROFS.salud[3]!]: ["Primera consulta psicológica", "Control psicológico"],
  [PROFS.salud[4]!]: ["Primera consulta psicológica", "Control psicológico"],
  [PROFS.salud[5]!]: ["Consulta médica general", "Certificado médico"],
  [PROFS.salud[6]!]: ["Consulta médica general", "Certificado médico"],
  [PROFS.salud[7]!]: ["Atención dental"],
  [PROFS.salud[8]!]: ["Atención dental"],
};
const DOCS: Record<string, string[]> = {
  "Congelar con Gratuidad": [
    "Formulario de solicitud de congelamiento firmado",
    "Certificado de alumno regular vigente",
    "Documento que respalde el motivo (médico, laboral o familiar)",
    "Comprobante de Registro Social de Hogares actualizado",
  ],
  "Pérdida de beneficios MINEDUC": [
    "Carta de apelación dirigida a la Asistente Social",
    "Concentración de notas (SIGA)",
    "Certificados que justifiquen el bajo rendimiento o causal",
    "Cédula de identidad vigente",
  ],
};
const BLOQUES = ["08:15 - 08:35", "09:00 - 09:20", "09:40 - 10:00", "10:55 - 12:05", "12:00 - 12:20", "14:30 - 14:50", "15:40 - 16:00", "16:45 - 17:05"];

const fmt = (f: string) => new Date(f + "T12:00").toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const today = new Date().toISOString().slice(0, 10);

const INICIALES: Cita[] = [
  { 
    id: "RREE-1042", 
    cat: "salud", 
    prof: PROFS.salud[0]!, 
    fecha: "2026-11-05", 
    bloque: "09:00 - 09:20", 
    tramite: "Control psicológico", 
    comentario: "Seguimiento de sesiones anteriores.", 
    creada: "2026-10-28" 
  },
  { 
    id: "RREE-1057", 
    cat: "social", 
    prof: PROFS.social[0]!, 
    fecha: "2026-11-06",    
    bloque: "12:00 - 12:20", 
    tramite: "Pérdida de beneficios MINEDUC", 
    comentario: "Estudiante de curso superior. Tope académico.", 
    creada: "2026-11-01" 
  },
];

type View = "inicio" | "agendar" | "citas";

function App() {
  const [view, setView] = useState<View>("inicio");
  const [citas, setCitas] = useState<Cita[]>(INICIALES);
  const [preCat, setPreCat] = useState<Cat | "">("");
  const [ver, setVer] = useState<Cita | null>(null);
  const [anular, setAnular] = useState<Cita | null>(null);
  const go = (v: View, c: Cat | "" = "") => { setPreCat(c); setView(v); window.scrollTo(0, 0); };

  return (
    <div className="min-h-screen font-sans">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold">UTFSM · Campus San Joaquín</p>
            <h1 className="text-lg font-bold">Portal de Reservas RREE</h1>
          </div>
          <p className="text-sm opacity-90">{USER.nombre} · Rol {USER.rol} · {USER.carrera}</p>
        </div>
        <nav className="mx-auto max-w-5xl px-4 flex gap-1">
          {([["inicio", "Inicio"], ["agendar", "Agendar Atención"], ["citas", `Mis Citas Agendadas (${citas.length})`]] as [View, string][]).map(([k, l]) => (
            <button key={k} onClick={() => go(k)} className={`px-4 py-2.5 text-sm font-medium rounded-t-md transition ${view === k ? "bg-background text-primary" : "hover:bg-primary-foreground/10"}`}>{l}</button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {view === "inicio" && <Inicio go={go} n={citas.length} />}
        {view === "agendar" && <Agendar key={preCat} pre={preCat} onAdd={(c) => setCitas((p) => [...p, c])} go={go} />}
        {view === "citas" && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Mis Citas Agendadas</h2>
            {citas.length === 0 ? (
              <div className="rounded-lg border bg-card p-8 text-center">
                <p className="text-muted-foreground mb-4">No tienes citas activas.</p>
                <Button onClick={() => go("agendar")}>Agendar Atención</Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {citas.map((c) => (
                  <li key={c.id} className="rounded-lg border bg-card p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-primary">{c.id} · {CATS[c.cat]}</p>
                      <p className="font-semibold">{c.tramite}</p>
                      <p className="text-sm text-muted-foreground">{c.prof}</p>
                      <p className="text-sm capitalize">{fmt(c.fecha)} · {c.bloque}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setVer(c)}><FileText /> Ver Comprobante</Button>
                      <Button variant="destructive" onClick={() => setAnular(c)}><Trash2 /> Anular Solicitud de Hora</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      {ver && <Modal onClose={() => setVer(null)}><Comprobante c={ver} /><div className="mt-4 text-right"><Button onClick={() => setVer(null)}>Cerrar</Button></div></Modal>}
      {anular && (
        <Modal onClose={() => setAnular(null)}>
          <h3 className="text-lg font-bold mb-2">¿Anular solicitud de hora?</h3>
          <p className="text-sm text-muted-foreground mb-4">Se anulará la cita {anular.id} ({anular.tramite}) del {fmt(anular.fecha)}, {anular.bloque}. Esta acción no se puede deshacer.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setAnular(null)}>Volver</Button>
            <Button variant="destructive" onClick={() => { setCitas((p) => p.filter((x) => x.id !== anular.id)); setAnular(null); }}>Sí, anular</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Inicio({ go, n }: { go: (v: View, c?: Cat | "") => void; n: number }) {
  const cards = [
    { c: "salud" as Cat, icon: HeartPulse, t: "Salud y Apoyo Psicológico", d: "Atención de Psicología, Médico general y Dental para estudiantes regulares del campus.", items: ["Psicología", "Médico", "Dental"] },
    { c: "social" as Cat, icon: HandCoins, t: "Beneficios y Asistencia Social", d: "Orientación con Asistentes Sociales sobre beneficios estatales y situación académica.", items: ["Gratuidad", "Becas MINEDUC", "Congelamiento"] },
  ];
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hola, {USER.nombre.split(" ")[0]}</h2>
        <p className="text-muted-foreground">Elige el tipo de atención que necesitas en Relaciones Estudiantiles.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map(({ c, icon: I, t, d, items }) => (
          <div key={c} className="rounded-xl border bg-card p-6 flex flex-col shadow-sm">
            <I className="size-9 text-primary mb-3" />
            <h3 className="text-xl font-bold">{t}</h3>
            <p className="text-sm text-muted-foreground mt-1">{d}</p>
            <div className="flex flex-wrap gap-2 my-4">{items.map((i) => <span key={i} className="text-xs rounded-full bg-secondary px-3 py-1 font-medium">{i}</span>)}</div>
            <Button className="mt-auto" onClick={() => go("agendar", c)}>Agendar en {CATS[c]}</Button>
          </div>
        ))}
      </div>
      <button onClick={() => go("citas")} className="w-full rounded-xl border-2 border-brand-gold bg-card p-5 flex items-center gap-4 text-left hover:bg-secondary transition">
        <CalendarCheck className="size-8 text-primary" />
        <div><p className="font-bold">Mis Citas Agendadas</p><p className="text-sm text-muted-foreground">Tienes {n} cita(s) activa(s). Revisa comprobantes o anula solicitudes.</p></div>
      </button>
    </section>
  );
}

function Req({ ok }: { ok: boolean }) { return ok ? null : <span className="text-destructive ml-0.5">*</span>; }

function Agendar({ pre, onAdd, go }: { pre: Cat | ""; onAdd: (c: Cita) => void; go: (v: View) => void }) {
  const [cat, setCat] = useState<Cat | "">(pre);
  const [prof, setProf] = useState("");
  const [fecha, setFecha] = useState("");
  const [bloque, setBloque] = useState("");
  const [tramite, setTramite] = useState("");
  const [com, setCom] = useState("");
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState<Cita | null>(null);

  const valid = cat && prof && fecha && bloque && tramite;
  const field = "w-full rounded-md border bg-card px-3 py-2 text-sm";
  const err = (v: string) => tried && !v ? <p className="text-xs text-destructive mt-1">Campo obligatorio</p> : null;

  if (done) return (
    <section className="max-w-xl mx-auto rounded-xl border bg-card p-6">
      <div className="flex items-center gap-2 text-success mb-4"><CheckCircle2 /> <h2 className="text-xl font-bold">Reserva confirmada</h2></div>
      <Comprobante c={done} />
      <div className="mt-5 flex gap-2 justify-end">
        <Button variant="outline" onClick={() => { setDone(null); setProf(""); setFecha(""); setBloque(""); setTramite(""); setCom(""); setTried(false); }}>Agendar otra</Button>
        <Button onClick={() => go("citas")}>Ir a Mis Citas Agendadas</Button>
      </div>
    </section>
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setTried(true);
    if (!valid) return;
    const c: Cita = { id: `RREE-${Math.floor(1100 + Math.random() * 8900)}`, cat: cat as Cat, prof, fecha, bloque, tramite, comentario: com, creada: today };
    onAdd(c); setDone(c);
  };

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto rounded-xl border bg-card p-6 space-y-5">
      <div><h2 className="text-2xl font-bold">Agendar Atención</h2><p className="text-sm text-muted-foreground">Los campos con <span className="text-destructive">*</span> faltan por completar.</p></div>
      <div>
        <label className="text-sm font-semibold">Categoría<Req ok={!!cat} /></label>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {(Object.keys(CATS) as Cat[]).map((k) => (
            <button type="button" key={k} onClick={() => { setCat(k); setProf(""); setTramite(""); }} className={`rounded-md border px-3 py-2 text-sm font-medium ${cat === k ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`}>{CATS[k]}</button>
          ))}
        </div>{err(cat)}
      </div>
      <div>
        <label className="text-sm font-semibold">Profesional<Req ok={!!prof} /></label>
        <select className={field} value={prof} disabled={!cat} onChange={(e) => { setProf(e.target.value); setTramite(""); }}>
          <option value="">{cat ? "Selecciona un profesional" : "Primero elige una categoría"}</option>
          {cat && PROFS[cat].map((p) => <option key={p}>{p}</option>)}
        </select>{err(prof)}
      </div>
      <div>
        <label className="text-sm font-semibold">Fecha<Req ok={!!fecha} /></label>
        <input type="date" min={today} className={field} value={fecha} onChange={(e) => setFecha(e.target.value)} />{err(fecha)}
      </div>
      <div>
        <label className="text-sm font-semibold">Bloque Horario USM<Req ok={!!bloque} /></label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
          {BLOQUES.map((b) => <button type="button" key={b} onClick={() => setBloque(b)} className={`rounded-md border px-2 py-2 text-sm ${bloque === b ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`}>{b}</button>)}
        </div>{err(bloque)}
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold mb-1">Motivo de Atención</legend>
        <div>
          <label className="text-sm">Trámite<Req ok={!!tramite} /></label>
          <select className={field} value={tramite} disabled={!prof} onChange={(e) => setTramite(e.target.value)}>
            <option value="">{prof ? "Selecciona un trámite" : "Primero elige un profesional"}</option>
            {(cat === "social" ? TRAMITES.social : prof ? PRO_TRAMITES[prof] ?? [] : []).map((t) => <option key={t}>{t}</option>)}
          </select>{err(tramite)}
        </div>
        {cat === "social" && DOCS[tramite] && (
          <div className="rounded-md border-l-4 border-brand-gold bg-secondary p-4">
            <p className="font-semibold text-sm flex items-center gap-2"><Info className="size-4" /> Documentos obligatorios para «{tramite}»</p>
            <ul className="list-disc pl-6 text-sm mt-2 space-y-1">{DOCS[tramite].map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        )}
        <div>
          <label className="text-sm">Comentarios (opcional)</label>
          <textarea rows={3} className={field} value={com} onChange={(e) => setCom(e.target.value)} placeholder="Describe brevemente tu situación" />
        </div>
      </fieldset>
      <Button type="submit" className="w-full" disabled={tried && !valid}>Confirmar Reserva</Button>
    </form>
  );
}

function Comprobante({ c }: { c: Cita }) {
  const rows: [string, string][] = [
    ["N° de reserva", c.id], ["Estudiante", USER.nombre], ["Rol USM", USER.rol], ["Carrera", USER.carrera],
    ["Categoría", CATS[c.cat]], ["Profesional", c.prof], ["Fecha", fmt(c.fecha)], ["Bloque", c.bloque],
    ["Trámite", c.tramite], ["Comentarios", c.comentario || "—"], ["Emitido", fmt(c.creada)],
  ];
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Comprobante oficial · RREE UTFSM San Joaquín</p>
      <dl className="mt-3 divide-y text-sm">
        {rows.map(([k, v]) => <div key={k} className="grid grid-cols-3 gap-2 py-1.5"><dt className="text-muted-foreground">{k}</dt><dd className="col-span-2 font-medium capitalize-first">{v}</dd></div>)}
      </dl>
      <p className="text-xs text-muted-foreground mt-3">Preséntate 5 minutos antes con tu credencial universitaria.</p>
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-xl bg-card p-6 shadow-xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Cerrar" onClick={onClose} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
        {children}
      </div>
    </div>
  );
}
