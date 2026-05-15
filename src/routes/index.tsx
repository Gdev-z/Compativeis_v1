import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import mainPortrait from "@/assets/main-portrait.jpg";
import secundaryPortrait from "@/assets/secundary-portrait.jpg";
import Prt02 from "@/assets/prt02.jpg";
import Prt03 from "@/assets/prt03.jpg";
import Prt04 from "@/assets/prt04.jpg";
import Prt05 from "@/assets/prt05.jpg";
import marcioPro from "@/assets/marcio-pro.jpg";
import proPortrait from "@/assets/background.jpg";
import bts1 from "@/assets/bts-1.jpg";
import bts2 from "@/assets/bts-2.jpg";
import Comunidade from "@/assets/comunidade.jpg";
import clients1 from "@/assets/clients-1.jpg";
import clients2 from "@/assets/clients-2.jpg";
import clients3 from "@/assets/clients-3.jpg";
import compImg from "@/assets/comp_img.png";

export const Route = createFileRoute("/")({
  component: Index, 
  head: () => ({
    meta: [
      { title: "Compatíveis — Transforme o seu relacionamento" },
      {
        name: "description",
        content:
          "O programa COMPATÍVEIS é uma jornada de transformação para relacionamentos. Ganhe clareza absoluta para Revelar, Romper ou Restaurar. O programa que vai transformar o seu relacionamento e te ajudar a tomar a melhor decisão da sua vida.",
      },
      { property: "og:title", content: "Compatíveis — Clareza e Transformação" },
      {
        property: "og:description",
        content: "Revelar, Romper ou Restaurar. Encontre a Bússola da Decisão.",
      },
      { property: "og:image", content: heroPortrait },
    ],
  }),
});

function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference">
      <a href="#top" className="font-display text-2xl tracking-tight text-foreground">
        Compatíveis
      </a>
      <div className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
        <a href="#work" className="hover:text-ember transition-colors">Trilhas</a>
        <a href="#about" className="hover:text-ember transition-colors">Sobre</a>
        <a href="#services" className="hover:text-ember transition-colors">Serviços</a>
        <a href="#contact" className="hover:text-ember transition-colors">Contato</a>
      </div>
      <a
        href="#contact"
        className="font-mono text-[11px] uppercase tracking-[0.2em] border border-foreground/30 px-4 py-2 rounded-full hover:bg-ember hover:border-ember transition-all"
      >
        Tornar-se Compativel →
      </a>
    </nav>
  );
}

function Hero() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: -1 (above) → 0 (center) → 1 (below)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      // translate up to ±60px
      setOffset(Math.max(-80, Math.min(80, -progress * 80)));
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col overflow-hidden pt-20 pb-12 px-6 md:px-10"
    >
      <div className="absolute inset-0 bg-grain" />

      {/* Hero portrait centered, below title */}
      <div ref={wrapperRef} className="relative z-10 w-screen h-screen overflow-hidden rounded-sm">
        <img
          ref={imgRef}
          src={heroPortrait}
          alt="Greyola Finn portrait"
          className="w-full h-full object-cover object-[center_30%] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <Reveal className="absolute inset-0 flex items-center justify-center translate-y-30">
          <img src={compImg} alt="Compatíveis Imagem" />
        </Reveal>
      </div>

      {/* Headline + meta row */}
      <div className="relative z-10 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-7">
          <Reveal as="h2" delay={120} className="font-display text-5xl md:text-7xl leading-[0.9] text-foreground">
            TRANSFORME <span className="text-ember">/</span>
            <br />
            <span className="text-stroke">SEU RELACIONAMENTO</span>
          </Reveal>
        </div>
        <Reveal
          delay={240}
          className="col-span-12 md:col-span-5 grid grid-cols-3 gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
        >
          <div>
            <div className="text-ember mb-1">1 Revelar</div>
            <div className="text-foreground">Descubra os </div>
            <div className="text-foreground">Padrões</div>
          </div>
          <div>
            <div className="text-ember mb-1">2 Romper</div>
            <div className="text-foreground">Quebre o</div>
            <div className="text-foreground">Ciclo</div>
          </div>
          <div>
            <div className="text-ember mb-1">3 Restaurar</div>
            <div className="text-foreground">Não Repita</div>
            <div className="text-foreground">Seus Erros</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Quebrar a objeção", "★", "Bonus Exclusivos", "★", "Desintoxicação Emocional", "★", "Mente Saudável", "★"];
  return (
    <div className="border-y border-border py-5 overflow-hidden bg-card">
      <div className="flex marquee-track whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-3xl md:text-4xl mx-8 text-foreground">
            {item === "★" ? <span className="text-ember">★</span> : item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-end justify-between mb-12 gap-6">
        <Reveal as="h2" className="font-display text-6xl md:text-9xl text-foreground">
          CONHEÇA<br />
          <span className="">AS</span><span className="text-ember">TRILHAS</span>
        </Reveal>
        <Reveal delay={150} className="hidden md:block font-mono text-[11px] uppercase tracking-widest text-muted-foreground max-w-xs text-right">
          Um caminho passo a passo para você sair do automático e tomar a melhor decisão da sua vida com clareza.
        </Reveal>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <figure className="col-span-12 md:col-span-7 group relative overflow-hidden">
          <img src={mainPortrait} alt="Yellow muscle car at sunset" loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
          <figcaption className="absolute bottom-4 left-4 right-4 flex justify-start font-mono text-[10px] uppercase tracking-widest text-foreground">
            <span>01 — </span>
            <span className="text-black ml-3">Desintoxicação Emocional</span>
          </figcaption>
        </figure>
        <figure className="col-span-6 md:col-span-4 group relative overflow-hidden">
          <img src={Prt02} alt="Hooded figure" loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
          <figcaption className="absolute bottom-4 left-4 right-4 flex justify-start font-mono text-[10px] uppercase tracking-widest text-foreground">
            <span>02 - Revelar, Romper Ou</span>
            <span className="text-ember ml-3"> Restaurar</span>
          </figcaption>
        </figure>

        <figure className="col-span-6 md:col-span-4 group relative overflow-hidden">
          <img src={Prt03} alt="Hooded figure" loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
          <figcaption className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-foreground">
            <span>03 - Áreas da Vida</span>
          </figcaption>
        </figure>
        <figure className="col-span-6 md:col-span-4 group relative overflow-hidden">
          <img src={Prt04} alt="Portrait dread" loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
          <figcaption className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-foreground">
            <span>04 - Manual dos Traços</span>
          </figcaption>
        </figure>
        <figure className="col-span-6 md:col-span-4 group relative overflow-hidden">
          <img src={Prt05} alt="Hooded figure" loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
          <figcaption className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-foreground">
            <span>05 - Lidando com Recaída</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
      <Reveal as="h2" className="font-display text-5xl md:text-7xl text-center mb-16">
        QUEM É <span className="text-stroke">MARCIO</span><br />
        CONCEIÇÃO
      </Reveal>

      <div className="grid grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
        <div className="col-span-12 md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden bg-card">
            <img src={marcioPro} alt="Greyola portrait" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <Reveal delay={120} className="col-span-12 md:col-span-7 space-y-6">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            Doutor Honóris causa em ciências do comportamento humano, membro da academia brasileira
            ciências arte história e literatura, diplomata civil pela Jethro internacional,
            Especialista em Análise corporal e comportamental, mentor de relacionamento e terapeuta
            de alta performance.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Com o programa COMPATÍVEIS, você vai ganhar clareza absoluta para Revelar, Romper ou Restaurar seu relacionamento. Encontre a Bússola da Decisão e transforme sua vida amorosa para melhor.
          </p>
          <a href="#contact" className="inline-flex items-center gap-3 mt-4 font-mono text-[11px] uppercase tracking-[0.2em] bg-ember text-foreground px-6 py-3 rounded-full hover:opacity-90 transition-all">
            Saiba Mais →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ProSection() {
  const services = [
    { n: "00", title: "3 Áreas da Vida", body: "Como seu relacionamento impacta sua carreira, suas finanças e sua saúde." },
    { n: "01", title: "Revelar", body: "Descobrir os padrões inconscientes que estão sabotando o seu relacionamento e entender de onde vem a dor." },
    { n: "02", title: "Romper", body: "Quebrar os ciclos herdados da infância e parar de repetir os mesmos erros de sempre." },
    { n: "03", title: "Restaurar", body: "Aprender a não desistir de si mesma quando a vida apertar e reconstruir com consciência." },
  ];
  return (
    <section id="services" className="relative overflow-hidden">
      <div className="px-6 md:px-10 pt-24 md:pt-32 pb-16 grid grid-cols-12 gap-6 items-start">
        <Reveal className="col-span-12 md:col-span-6">
          <h2 className="font-display text-7xl md:text-[10rem] leading-[0.85] text-foreground">
            3R'S<span className="text-ember">.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="col-span-12 md:col-span-6 md:pt-8">
          <p className="text-lg text-foreground/80 leading-relaxed">
            O que você ganha com o método — um framework prático para lidar com seus gatilhos, seus traumas e seu futuro.
          </p>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {services.map((s) => (
              <div key={s.n} className="grid grid-cols-12 gap-4 py-5 group hover:bg-card transition-colors px-2">
                <div className="col-span-2 font-mono text-[11px] text-ember pt-1">{s.n}</div>
                <div className="col-span-4 font-display text-2xl text-foreground">{s.title}</div>
                <div className="col-span-6 text-sm text-muted-foreground">{s.body}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Big red portrait */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img src={proPortrait} alt="Cinematic red portrait" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        <div className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal as="h3" className="font-display text-4xl md:text-6xl text-foreground max-w-2xl">
            LEMBRE-SE — UM LUGAR QUIETO
            <br />O AGUARDA
            <br /> É A HORA DE MUDAR
            <br /> A SUA
            <br />
            <span className="text-ember">HISTÓRIA</span>.
          </Reveal>
          <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/70">↑ scroll</span>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "16+", l: "Anos de experiência" },
    { v: "5+", l: "Cursos ministrados" },
    { v: "10★", l: "Avaliação" },
    { v: "90%", l: "Clientes satisfeitos" },
  ];
  return (
    <section className="px-6 md:px-10 py-20 border-y border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s) => (
          <div key={s.l} className="flex flex-col items-center text-center">
            <div className="font-display text-7xl md:text-9xl text-foreground">
              {s.v.includes("★") ? <>{s.v.replace("★", "")}<span className="text-ember">★</span></> : s.v.includes("%") ? <><span className="text-ember">{s.v}</span></> : s.v}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BehindScenes() {
  return (
    <section className="px-6 md:px-10 py-24">
      <Reveal as="p" className="font-mono text-[11px] uppercase tracking-widest text-ember mb-3">// 04 · BTS</Reveal>
      <Reveal as="h3" delay={100} className="font-display text-4xl md:text-6xl mb-10 max-w-3xl">
        BEHIND<br />THE FRAME
      </Reveal>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-3 aspect-square overflow-hidden">
          <img src={bts1} alt="Behind the scenes" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-6 md:col-span-3 aspect-square overflow-hidden">
          <img src={bts2} alt="Camera" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-12 md:col-span-6 aspect-[2/1] overflow-hidden bg-card flex items-center justify-center p-8">
          <p className="font-display text-3xl md:text-4xl text-foreground/90 text-center">
            "Patience is the<br />real <span className="text-ember">aperture</span>."
          </p>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const clients = [
    { name: "NIKE / NORTH STAR", role: "Editorial campaign", img: clients1 },
    { name: "VAULT MAG / ISSUE 12", role: "Cover story", img: clients2 },
    { name: "ATELIER 7", role: "Lookbook AW25", img: clients3 },
  ];
  return (
    <section className="px-6 md:px-10 py-24 border-t border-border">
      <Reveal as="p" className="font-mono text-[11px] uppercase tracking-widest text-ember mb-3 text-center">// 05 · Selected clients</Reveal>
      <Reveal as="h3" delay={100} className="font-display text-4xl md:text-5xl text-center mb-12">SELECTED <span className="text-stroke">WORK</span></Reveal>
      <div className="grid grid-cols-12 gap-6">
        {clients.map((c) => (
          <article key={c.name} className="col-span-12 md:col-span-4 group">
            <div className="aspect-[4/3] overflow-hidden mb-4">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-display text-2xl text-foreground">{c.name}</h4>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{c.role}</p>
              </div>
              <span className="text-ember font-mono text-xs">↗</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PressQuote() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-0 items-center">
        <div className="col-span-12 md:col-span-6 aspect-[4/5] md:aspect-auto md:h-[80vh] relative">
          <img src={Comunidade} alt="Red portrait" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-12 md:col-span-6 px-8 md:px-16 py-16 md:py-0">
          <Reveal
            as="blockquote"
            delay={120}
            className="font-display text-3xl md:text-5xl leading-[1.05] text-foreground"
          >
          Comunidade Exclusiva
            <br />
            Compatíveis 
            <br />
            <br />
            <span className="text-ember">VOCÊ NUNCA MAIS VAI SE SENTIR SOZINHO</span>
          </Reveal>
          <Reveal
            as="p"
            delay={240}
            className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            — Um lugar seguro, sem julgamentos, onde você vai poder compartilhar suas dores e suas
            vitórias com pessoas que estão na mesma jornada.
          </Reveal>
          <div className="mt-12 grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="border border-border p-4">Moderação profissional</div>
            <div className="border border-border p-4">Conteúdo exclusivo semanal</div>
            <div className="border border-border p-4">Suporte entre membros</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "01 — Por quanto tempo terei acesso?", a: "Acesso por 12 meses." },
    { q: "02 — Terei Orientação?", a: "Sim. Receberá orientação do Márcio." },
    { q: "03 — Quando poderei assistir?", a: "Assista quando e onde quiser." },
    { q: "04 — Tem aulas Ao vivo?", a: "Tire suas dúvidas ao vivo." },
  ];
  return (
    <section className="px-6 md:px-10 py-24 border-t border-border">
      <div className="grid grid-cols-12 gap-8">
        <Reveal className="col-span-12 md:col-span-4">
          {/* <p className="font-mono text-[11px] uppercase tracking-widest text-ember mb-3">// 06 · FAQ</p> */}
          <h3 className="font-display text-5xl md:text-6xl">PERGUNTAS<span className="text-ember">?</span></h3>
        </Reveal>
        <div className="col-span-12 md:col-span-8 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5 cursor-pointer">
              <summary className="flex items-center justify-between font-display text-xl md:text-2xl text-foreground list-none">
                {f.q}
                <span className="text-ember text-2xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 text-center bg-checker">
      <Reveal
        as="h2"
        delay={120}
        className="font-display text-6xl md:text-[10rem] leading-[0.85] text-foreground"
      >
        TRANSFORME-SE
        <br />
        <span className="text-stroke">AGORA</span>
      </Reveal>
      <a
        href="mailto:hello@greyola.studio"
        className="inline-flex items-center gap-3 mt-10 font-mono text-[11px] uppercase tracking-[0.25em] bg-ember text-foreground px-8 py-4 rounded-full hover:opacity-90 transition-all ember-glow"
      >
        Tornar-se Compativel →
      </a>
      <div className="mt-10 flex justify-center gap-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <a href="#" className="hover:text-ember">Instagram</a>
        <span>·</span>
        <a href="#" className="hover:text-ember">Youtube</a>
        <span>·</span>
        <a href="#" className="hover:text-ember">Likedin</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-border">
      <div className="font-display text-[28vw] md:text-[24vw] leading-[0.85] text-foreground">
        COMP
      </div>
      <div className="font-display text-[28vw] md:text-[24vw] leading-[0.85] text-foreground">
      ATÍVEIS
      </div>
      <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>© 2026 Copatíveis. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Portfolio />
      <About />
      <ProSection />
      <Stats />
      {/* <BehindScenes /> */}
      {/* <Clients /> */}
      <PressQuote />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
