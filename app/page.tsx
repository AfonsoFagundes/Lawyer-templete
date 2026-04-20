"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, ArrowUpRight, Scale, Phone, Mail, MapPin, Menu, X } from "lucide-react"
import type { Variants } from "framer-motion"

// ============================================================
// 🔧 CONFIGURAÇÃO DO CLIENTE — edite apenas este bloco
// ============================================================
const CONFIG = {
  nome:        "Silva & Associados",
  area:        "Advocacia",
  cidade:      "Curitiba, PR",
  fundacao:    "2008",
  anos:        "16",
  whatsapp:    "5541999990000",
  email:       "contato@silvaadv.com.br",
  telefone:    "(41) 9 9999-0000",
  endereco:    "Rua XV de Novembro, 1000 — Centro, Curitiba/PR",
  oab:         "OAB/PR n.º 00000",
  stats: {
    casos:     "1.200+",
    exito:     "94%",
    cidades:   "3",
  },
  heroDesc:    "Assessoria jurídica especializada para pessoas físicas e empresas. Atendimento personalizado, resultados concretos.",
  sobreDesc:   "Fundado em 2008, nosso escritório atua com equipe multidisciplinar dedicada às melhores soluções jurídicas. Combinamos experiência técnica com relacionamento próximo ao cliente.",
  quote:       "Cada causa é tratada como única. Não existe advocacia de massa aqui — existe comprometimento real com o resultado do cliente.",
  quoteSig:    "Dr. Carlos Silva — Sócio fundador",
  award:       "Escritório reconhecido pela OAB/PR como referência em atendimento ao cliente.",
  creds: [
    { tag: "Especialização", txt: "Pós-graduação em Direito Processual Civil — USP" },
    { tag: "Associações",    txt: "Membro ativo da OAB/PR e IASP" },
    { tag: "Atuação",        txt: "Tribunais Estaduais, STJ e STF em causas de alta complexidade" },
    { tag: "Atendimento",    txt: "Presencial em Curitiba e online para todo o Brasil" },
  ],
  areas: [
    { titulo: "Direito Civil",          desc: "Contratos, responsabilidade civil, família e sucessões" },
    { titulo: "Direito Trabalhista",    desc: "Rescisões, horas extras, assédio e direitos do trabalhador" },
    { titulo: "Direito Empresarial",    desc: "Societário, contratos, fusões e recuperação judicial" },
    { titulo: "Direito Previdenciário", desc: "Aposentadoria, BPC e revisão de benefícios do INSS" },
    { titulo: "Direito Criminal",       desc: "Defesa criminal, habeas corpus e inquéritos policiais" },
    { titulo: "Direito Imobiliário",    desc: "Compra e venda, locações, usucapião e regularização" },
  ],
  depoimentos: [
    { texto: "Profissionalismo impecável. Resolveram meu processo trabalhista em tempo recorde.", autor: "Marcos Oliveira",  cargo: "Engenheiro — Curitiba, PR" },
    { texto: "Consegui minha aposentadoria depois de anos tentando sozinha. Recomendo de olhos fechados.", autor: "Ana Paula Santos", cargo: "Professora — Londrina, PR" },
    { texto: "Atendimento humanizado e resultado excelente. Do início ao fim com seriedade.", autor: "Roberto Lima",     cargo: "Empresário — Maringá, PR" },
  ],
}
// ============================================================

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(5px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.7, ease } },
}

const navLinks = [
  { label: "O Escritório", href: "#sobre"    },
  { label: "Áreas",        href: "#areas"    },
  { label: "Como Funciona",href: "#processo" },
  { label: "Contato",      href: "#contato"  },
]

// ── Stars ──
function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-[#9a7d4a]" viewBox="0 0 24 24">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

// ── SectionLabel ──
function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`text-[9px] font-medium tracking-[.28em] uppercase text-[#9a7d4a] mb-3 ${center ? "text-center" : ""}`}>
      {children}
    </div>
  )
}

// ── Smooth scroll helper ──
function scrollTo(href: string) {
  const id = href.replace("#", "")
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

// ── NAVBAR ──
function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const WA = `https://wa.me/${CONFIG.whatsapp}?text=Olá, gostaria de agendar uma consulta gratuita.`

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b border-[#e8e4de] transition-all duration-300
        ${scrolled ? "bg-[#fafaf8]/95 backdrop-blur-xl shadow-sm" : "bg-[#fafaf8]"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-[#9a7d4a]" />
            <span className="font-serif text-lg font-normal">{CONFIG.nome}</span>
            <div className="hidden sm:block w-px h-5 bg-[#9a7d4a] opacity-50" />
            <span className="hidden sm:block text-[10px] font-medium tracking-[.2em] uppercase text-[#6b6860]">{CONFIG.area}</span>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-[11px] font-medium tracking-[.15em] uppercase text-[#6b6860] hover:text-[#111110] transition-colors">
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA desktop + burger mobile */}
          <div className="flex items-center gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="text-[11px] font-medium tracking-[.15em] uppercase bg-[#111110] text-white px-5 py-2.5 hover:bg-[#2a2a2a] transition-colors">
              Consulta Gratuita
            </a>
            {/* Burger — só no mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-[#111110] hover:text-[#9a7d4a] transition-colors"
              aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 top-16 z-40 bg-[#fafaf8] flex flex-col px-6 pt-8 pb-12 gap-6 md:hidden">

            {navLinks.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease }}
                onClick={() => { scrollTo(l.href); setOpen(false) }}
                className="text-left font-serif text-3xl font-normal text-[#111110] hover:text-[#9a7d4a] transition-colors py-2 border-b border-[#e8e4de]">
                {l.label}
              </motion.button>
            ))}

            <motion.a
              href={WA} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3, ease }}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#9a7d4a] text-white text-[11px] font-medium tracking-[.18em] uppercase px-8 py-4 hover:bg-[#c4a46b] transition-colors">
              <MessageCircle className="w-4 h-4" />
              Falar pelo WhatsApp
            </motion.a>

            {/* Contatos rápidos */}
            <div className="mt-auto flex flex-col gap-3 text-[12px] text-[#6b6860]">
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#9a7d4a]" />{CONFIG.telefone}</div>
              <div className="flex items-center gap-2"><Mail  className="w-3.5 h-3.5 text-[#9a7d4a]" />{CONFIG.email}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── PAGE ──
export default function Page() {
  const WA = `https://wa.me/${CONFIG.whatsapp}?text=Olá, gostaria de agendar uma consulta gratuita.`

  return (
    <main className="bg-[#fafaf8] text-[#111110] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Esquerda — escura */}
        <div className="bg-[#111110] flex flex-col justify-end px-8 md:px-12 py-16 relative overflow-hidden min-h-[65vh] lg:min-h-auto">
          <div className="absolute -top-20 -right-20 w-72 h-72 border border-[#9a7d4a]/10 rounded-full pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-48 h-48 border border-[#9a7d4a]/06 rounded-full pointer-events-none" />

          <motion.div variants={fadeUp} initial="hidden" animate="show"
            className="text-[10px] font-medium tracking-[.28em] uppercase text-[#9a7d4a] mb-7">
            {CONFIG.cidade} — Desde {CONFIG.fundacao}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl xl:text-6xl font-normal leading-[1.06] text-white mb-7">
            Defendemos seus<br />direitos com{" "}
            <em className="italic text-[#c4a46b]">ética</em><br />e precisão.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            style={{ originX: 0 }}
            className="w-9 h-px bg-[#9a7d4a] mb-6" />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="text-[14px] leading-[1.85] text-white/50 max-w-sm mb-9">
            {CONFIG.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="flex flex-wrap gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase bg-[#9a7d4a] hover:bg-[#c4a46b] text-white px-7 py-3.5 transition-all hover:-translate-y-0.5">
              <MessageCircle className="w-4 h-4" />
              Falar com advogado
            </a>
            <button onClick={() => scrollTo("#areas")}
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase text-white/60 hover:text-white border border-white/15 hover:border-white/40 px-7 py-3.5 transition-all">
              Ver áreas de atuação
            </button>
          </motion.div>
        </div>

        {/* Direita — clara */}
        <div className="bg-[#f3f0eb] flex flex-col justify-center px-8 md:px-12 py-16 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-10 right-10 text-right">
            <div className="font-serif text-6xl font-normal text-[#9a7d4a]/15 leading-none">{CONFIG.anos}</div>
            <div className="text-[9px] tracking-[.22em] uppercase text-[#6b6860]">anos de experiência</div>
          </motion.div>

          {/* IMAGE PLACEHOLDER */}
          <div className="w-full h-52 bg-[#e2ddd4] rounded mb-6 flex items-center justify-center border border-[#d4cfc8]">
            <div className="text-center text-[#9a7d4a]/40">
              <Scale className="w-10 h-10 mx-auto mb-2" />
              <div className="text-[11px] tracking-[.15em] uppercase">Foto do escritório</div>
              <div className="text-[10px] text-[#6b6860] mt-1">/public/foto-escritorio.jpg</div>
            </div>
          </div>
          {/* Para adicionar foto, substitua o bloco acima por:
            <Image src="/foto-escritorio.jpg" alt="Escritório" width={500} height={208}
              className="w-full h-52 object-cover rounded mb-6" />
          */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
            className="flex flex-col">
            {[
              { n: CONFIG.stats.casos,   l: "casos atendidos" },
              { n: CONFIG.stats.exito,   l: "taxa de êxito" },
              { n: CONFIG.stats.cidades, l: "cidades de atuação" },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-baseline py-4 border-t border-[#e8e4de]">
                <span className="font-serif text-4xl font-normal text-[#111110] tracking-tight">{s.n}</span>
                <span className="text-[11px] tracking-widest uppercase text-[#6b6860] text-right max-w-[100px] leading-snug">{s.l}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.8 }}
            className="mt-5 p-4 border border-[#e8e4de] bg-white">
            <div className="text-[9px] tracking-[.22em] uppercase text-[#9a7d4a] mb-1">Reconhecimento</div>
            <div className="font-serif text-[14px] leading-snug text-[#111110]">{CONFIG.award}</div>
          </motion.div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="bg-[#111110] py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <SectionLabel>O escritório</SectionLabel>
            <h2 className="font-serif text-4xl font-normal leading-[1.1] text-white mb-4">
              Tradição jurídica a <em className="italic text-[#c4a46b]">serviço</em> de quem precisa
            </h2>
            <div className="w-9 h-px bg-[#9a7d4a] mb-6" />
            <blockquote className="font-serif text-xl italic text-white/70 leading-relaxed border-l-2 border-[#9a7d4a] pl-5 mb-3">
              "{CONFIG.quote}"
            </blockquote>
            <div className="text-[11px] tracking-[.18em] uppercase text-[#9a7d4a] mb-5">{CONFIG.quoteSig}</div>
            <p className="text-[14px] leading-[1.85] text-white/50">{CONFIG.sobreDesc}</p>
          </div>

          <div className="flex flex-col gap-3">
            {/* IMAGE PLACEHOLDER — foto do sócio */}
            <div className="w-full h-44 bg-white/5 border border-white/[0.08] flex items-center justify-center mb-1">
              <div className="text-center text-[#9a7d4a]/30">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 text-xl font-serif text-white/20">Dr</div>
                <div className="text-[10px] tracking-[.15em] uppercase text-white/20">Foto do sócio</div>
                <div className="text-[10px] text-white/15 mt-0.5">/public/foto-socio.jpg</div>
              </div>
            </div>
            {/* Para adicionar foto, substitua por:
              <Image src="/foto-socio.jpg" alt="Dr. Nome" width={500} height={176}
                className="w-full h-44 object-cover object-top mb-1" />
            */}

            {CONFIG.creds.map((c, i) => (
              <div key={i}
                className="p-4 border border-white/[0.07] hover:border-[#9a7d4a]/35 hover:translate-x-1 transition-all duration-200">
                <div className="text-[9px] tracking-[.22em] uppercase text-[#9a7d4a] mb-1">{c.tag}</div>
                <div className="text-[13px] text-white/55 leading-relaxed">{c.txt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÁREAS ── */}
      <section id="areas" className="bg-[#f3f0eb] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <SectionLabel>Áreas de atuação</SectionLabel>
              <h2 className="font-serif text-4xl font-normal leading-[1.1]">
                Expertise jurídica onde <em className="italic text-[#9a7d4a]">você</em> precisa
              </h2>
            </div>
            <p className="text-[14px] leading-[1.85] text-[#6b6860]">
              Atuamos com equipes especializadas em cada área, garantindo profundidade técnica e resultados consistentes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e4de]">
            {CONFIG.areas.map((a, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.07 }}
                className="group bg-[#f3f0eb] hover:bg-white p-7 relative overflow-hidden transition-all hover:-translate-y-1 cursor-default">
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9a7d4a] group-hover:w-full transition-all duration-500" />
                <div className="w-7 h-7 border border-[#9a7d4a]/30 flex items-center justify-center mb-4">
                  <Scale className="w-3 h-3 text-[#9a7d4a]" />
                </div>
                <div className="font-serif text-base font-normal text-[#111110] mb-2">{a.titulo}</div>
                <div className="text-[12px] text-[#6b6860] leading-relaxed">{a.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="processo" className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Como funciona</SectionLabel>
          <h2 className="font-serif text-4xl font-normal leading-[1.1] mb-14">
            Do primeiro contato à <em className="italic text-[#9a7d4a]">resolução</em>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            <div className="hidden lg:block absolute top-5 left-[12%] right-[12%] h-px bg-[#e8e4de]" />
            {[
              { n: "01", t: "Consulta gratuita",  d: "Analisamos seu caso sem custo e sem compromisso" },
              { n: "02", t: "Análise jurídica",   d: "Mapeamos a melhor estratégia para o seu caso" },
              { n: "03", t: "Proposta clara",      d: "Honorários transparentes antes de qualquer ação" },
              { n: "04", t: "Acompanhamento",      d: "Atualização constante sobre o andamento do processo" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center relative">
                <div className="w-11 h-11 rounded-full border border-[#e8e4de] bg-white flex items-center justify-center mb-5 font-serif text-[#9a7d4a] relative z-10 group-hover:bg-[#9a7d4a] group-hover:text-white group-hover:border-[#9a7d4a] transition-all duration-300">
                  {s.n}
                </div>
                <div className="font-serif text-[15px] font-normal text-[#111110] mb-2">{s.t}</div>
                <div className="text-[12px] text-[#6b6860] leading-relaxed">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="bg-[#111110] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Depoimentos</SectionLabel>
          <h2 className="font-serif text-4xl font-normal leading-[1.1] text-white mb-10">
            O que nossos clientes <em className="italic text-[#c4a46b]">dizem</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {CONFIG.depoimentos.map((d, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="bg-[#111110] hover:bg-[#181816] p-7 transition-colors">
                <Stars />
                <p className="font-serif text-[15px] italic text-white/65 leading-[1.75] mb-5">"{d.texto}"</p>
                <div className="text-[11px] tracking-[.15em] uppercase text-[#9a7d4a]">{d.autor}</div>
                <div className="text-[11px] text-white/25 mt-0.5">{d.cargo}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="contato" className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_500px_300px_at_50%_50%,rgba(154,125,74,0.06),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <SectionLabel center>Contato</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.08] mb-4">
            Seu problema jurídico tem <em className="italic text-[#9a7d4a]">solução</em>
          </h2>
          <div className="w-9 h-px bg-[#9a7d4a] mx-auto mb-5" />
          <p className="text-[14px] text-[#6b6860] leading-[1.85] mb-10">
            Agende uma consulta gratuita. Nossa equipe analisa seu caso e apresenta as melhores opções sem compromisso.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <motion.a href={WA} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase bg-[#111110] text-white px-8 py-4 hover:bg-[#2a2a2a] transition-colors">
              <MessageCircle className="w-4 h-4" />
              Falar pelo WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <a href={`mailto:${CONFIG.email}`}
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[.18em] uppercase text-[#6b6860] border border-[#e8e4de] hover:border-[#111110] hover:text-[#111110] px-8 py-4 transition-all">
              <Mail className="w-4 h-4" />
              Enviar e-mail
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[12px] text-[#6b6860]">
            <div className="flex items-center gap-2"><Phone  className="w-3.5 h-3.5 text-[#9a7d4a]" />{CONFIG.telefone}</div>
            <div className="flex items-center gap-2"><Mail   className="w-3.5 h-3.5 text-[#9a7d4a]" />{CONFIG.email}</div>
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#9a7d4a]" />{CONFIG.endereco}</div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111110] py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-[#9a7d4a]" />
              <span className="font-serif text-lg text-white">{CONFIG.nome}</span>
            </div>
            <p className="text-[12px] text-white/30 leading-[1.8] max-w-[220px]">
              Advocacia comprometida com o resultado. Atendemos pessoas físicas e jurídicas em todo o Brasil.
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-[.22em] uppercase text-[#9a7d4a] mb-4">Áreas</div>
            <div className="flex flex-col gap-2">
              {CONFIG.areas.map((a, i) => (
                <span key={i} className="text-[13px] text-white/35">{a.titulo}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[.22em] uppercase text-[#9a7d4a] mb-4">Contato</div>
            <div className="flex flex-col gap-2 text-[13px] text-white/35">
              <span>{CONFIG.telefone}</span>
              <span>{CONFIG.email}</span>
              <span className="leading-relaxed">{CONFIG.endereco}</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/[0.06] flex flex-wrap justify-between gap-2">
          <span className="text-[11px] text-white/20">
            © {new Date().getFullYear()} {CONFIG.nome} — Todos os direitos reservados
          </span>
          <span className="text-[11px] text-white/15">{CONFIG.oab}</span>
        </div>
      </footer>

      {/* ── WHATSAPP FLUTUANTE ── */}
      <motion.a href={WA} target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] transition-shadow"
        aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </motion.a>
    </main>
  )
}