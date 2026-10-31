"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function BrandMark({ className = "h-14 w-14" }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Nadeeni Logo"
        className="absolute max-w-none"
        style={{ width: "297%", height: "auto", left: "-108%", top: "-219%" }}
      />
    </span>
  );
}

function BrandIcon({ className = "h-[54px] w-[54px]" }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-2xl bg-ivory ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        className="absolute max-w-none"
        style={{ width: "403%", height: "auto", left: "-156%", top: "-268%" }}
      />
    </span>
  );
}

const orderNo = "٤٧";
const readyWord = "جاهز";
const counterLine = "للاستلام من الصندوق";

const phoneNotch =
  "absolute top-2.5 left-1/2 z-10 h-4 w-14 -translate-x-1/2 rounded-full bg-burgundy-deep/90";
const phoneShadow =
  "bg-burgundy-deep p-[9px] shadow-[0_30px_60px_-28px_rgba(74,4,24,0.55)]";

const phoneShells = {
  intro: {
    shell: `intro-phone-buzz w-[180px] rounded-[2.1rem] sm:w-[200px] ${phoneShadow}`,
    screen: "relative h-[300px] overflow-hidden rounded-[1.6rem] bg-ivory sm:h-[360px]",
    notch: phoneNotch,
  },
  story: {
    shell: `w-[214px] rounded-[2.2rem] ${phoneShadow}`,
    screen: "relative h-[390px] overflow-hidden rounded-[1.7rem] bg-ivory",
    notch: phoneNotch,
  },
  hero: {
    shell: "mx-auto w-[244px] rounded-[2.35rem] bg-burgundy-deep p-[10px] shadow-[0_30px_60px_-24px_rgba(74,4,24,0.7)]",
    screen: "relative h-[440px] overflow-hidden rounded-[1.85rem]",
    notch: "absolute top-2.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black/25",
  },
};

function PhoneShell({ shell, screen, notch, children }) {
  return (
    <div className={shell}>
      <div className={screen}>
        <span className={notch} />
        {children}
      </div>
    </div>
  );
}

function RippleBurst({ className }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className={className} />
      <span className={className} />
      <span className={className} />
    </span>
  );
}

function ReadyNotice({ tone }) {
  const tones = {
    hero: {
      mark: "h-12 w-12 shrink-0",
      copy: "min-w-0 text-start",
      title: "text-sm font-bold text-burgundy",
      detail: "text-xs text-ink/60",
      detailText: counterLine,
      badge: "ms-auto grid h-8 min-w-8 place-items-center rounded-full bg-gold/30 px-2 text-sm font-bold text-burgundy-deep",
    },
    story: {
      mark: "h-8 w-8 shrink-0",
      copy: "min-w-0 flex-1",
      title: "text-xs leading-4 font-bold text-burgundy",
      detail: "text-[11px] leading-4 text-ink/55",
      detailText: "من الصندوق",
      badge: "grid h-6 min-w-6 place-items-center rounded-full bg-gold/30 px-1.5 text-[11px] font-bold text-burgundy-deep",
    },
  };
  const style = tones[tone];

  return (
    <>
      <BrandMark className={style.mark} />
      <div className={style.copy}>
        <p className={style.title}>{readyWord}</p>
        <p className={style.detail}>{style.detailText}</p>
      </div>
      <span className={style.badge}>{orderNo}</span>
    </>
  );
}

function ReadyLines({ titleClassName, detailClassName }) {
  return (
    <>
      <p className={titleClassName}>{readyWord}</p>
      <p className={detailClassName}>{counterLine}</p>
    </>
  );
}

function FormMark() {
  return (
    <div className="relative mx-auto mb-7 h-28 w-28 overflow-hidden rounded-[1.5rem] bg-ivory ring-1 ring-gold/50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Nadeeni Logo"
        className="absolute top-1/2 left-1/2 h-[300%] w-auto max-w-none -translate-x-1/2 -translate-y-[46%] object-contain object-center"
      />
    </div>
  );
}

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.55, ease: "easeOut" },
};

const retiredCosts = [
  "شراء أجهزة النداء",
  "شواحن وبطاريات",
  "جهاز ضاع أو انكسر",
  "تطبيق على هاتف الزبون",
];

const filmBeats = [
  {
    title: "يمسح الرمز",
    body: "كاميرا المتصفح تكفي. بلا تطبيق وبلا حساب.",
  },
  {
    title: "يرى رقم طلبه",
    body: "اسم المطعم، والرقم الذي كتبه الكاشير.",
  },
  {
    title: "الصفحة تصبح جاهز",
    body: "عندما يُضغط «تنبيه». الصفحة المفتوحة هي المرجع.",
  },
];

function IntroFilm() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="intro-film fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[radial-gradient(120%_80%_at_50%_38%,#fffdf8_0%,#f7f1e4_58%,#f3e6c8_100%)] px-6"
      role="dialog"
      aria-label="كيف يعمل ناديني"
      onAnimationEnd={(event) => {
        if (event.animationName === "intro-dismiss") setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute top-5 end-5 z-10 inline-flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-sm font-semibold text-burgundy shadow-[0_12px_30px_-18px_rgba(74,4,24,0.45)] ring-1 ring-burgundy/10 transition duration-300 hover:-translate-y-0.5"
      >
        <span className="relative grid h-8 w-8 place-items-center" aria-hidden="true">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-burgundy/15" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="intro-ring text-gold" />
          </svg>
        </span>
        تخطي
      </button>

      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="relative">
          <RippleBurst className="intro-ripple" />
          <PhoneShell {...phoneShells.intro}>
            <div className="film-pane film-pane-0">
              <FilmScan />
            </div>
            <div className="film-pane film-pane-1">
              <FilmOrder />
            </div>
            <div className="film-pane film-pane-2">
              <FilmReady />
            </div>
          </PhoneShell>
        </div>

        <div className="relative mt-6 h-28 w-full max-w-xs">
          {filmBeats.map((beat, index) => (
            <div key={beat.title} className={`film-caption film-pane-${index} text-center`}>
              <p className="font-display text-3xl font-bold text-burgundy-deep">{beat.title}</p>
              <p className="mt-2 text-base leading-7 text-ink/70">{beat.body}</p>
            </div>
          ))}
        </div>

        <div className="film-late mt-4">
          <BrandMark className="mx-auto h-16 w-16" />
        </div>
      </div>
    </div>
  );
}

function FilmScan() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-ivory">
      <div className="rounded-[1.4rem] bg-foam px-6 py-5 ring-1 ring-gold/40">
        <div className="relative grid place-items-center">
          <span className="absolute -top-2 -start-2 h-4 w-4 border-t-2 border-s-2 border-gold" />
          <span className="absolute -top-2 -end-2 h-4 w-4 border-t-2 border-e-2 border-gold" />
          <span className="absolute -bottom-2 -start-2 h-4 w-4 border-b-2 border-s-2 border-gold" />
          <span className="absolute -end-2 -bottom-2 h-4 w-4 border-e-2 border-b-2 border-gold" />
          <span className="relative block overflow-hidden rounded-xl">
            <QrMotif />
            <span className="scan-line" aria-hidden="true" />
          </span>
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold text-burgundy">امسحوا الرمز</p>
    </div>
  );
}

function StoryScan() {
  const digits = ["2", "1", "5"];

  return (
    <div className="flex h-full flex-col bg-ivory px-3 pt-11 pb-4">
      <div className="flex items-center justify-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gold text-xs font-bold text-burgundy-deep">
          ن
        </span>
        <span className="text-sm font-bold text-burgundy-deep">اسم مطعمكم</span>
      </div>
      <div className="relative mt-3 grid min-h-0 flex-1 place-items-center overflow-hidden rounded-2xl bg-foam">
        <span className="absolute top-3 start-4 h-4 w-4 border-t-2 border-s-2 border-gold" />
        <span className="absolute top-3 end-4 h-4 w-4 border-t-2 border-e-2 border-gold" />
        <span className="absolute bottom-3 start-4 h-4 w-4 border-b-2 border-s-2 border-gold" />
        <span className="absolute end-4 bottom-3 h-4 w-4 border-e-2 border-b-2 border-gold" />
        <span className="relative block w-[7.6rem] -rotate-6 rounded-2xl bg-white px-3 pt-2.5 pb-3 text-center shadow-[0_10px_18px_-12px_rgba(74,4,24,0.5)]">
          <p className="mb-2 text-[11px] leading-4 font-bold text-burgundy">امسح وتابع طلبك</p>
          <span className="relative mx-auto block w-fit overflow-hidden rounded-xl">
            <QrMotif />
            <span className="scan-line" aria-hidden="true" />
          </span>
        </span>
      </div>
      <p className="mt-3 text-start text-[11px] font-semibold text-ink/55">رقم طلبك</p>
      <div
        className="order-field mt-1.5 flex h-11 items-center justify-end rounded-xl px-3 font-sans text-2xl font-bold text-burgundy-deep ring-2 ring-burgundy-deep"
        dir="ltr"
      >
        {digits.map((digit, index) => (
          <span key={index} className="order-digit">
            {digit}
          </span>
        ))}
      </div>
      <div className="mt-2 grid h-10 place-items-center rounded-xl bg-gold text-sm font-bold text-burgundy-deep">
        تابع طلبي
      </div>
    </div>
  );
}

function FilmOrder() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-ivory px-4 text-center">
      <p className="text-sm font-medium text-burgundy">اسم مطعمكم</p>
      <p className="mt-3 font-sans text-6xl leading-none font-bold text-burgundy-deep">{orderNo}</p>
      <p className="mt-2 text-xs text-ink/55">رقم الطلب</p>
    </div>
  );
}

function StoryWait() {
  const start = 6 * 60 + 30;
  const end = 5 * 60 + 30;
  const tick = 400;
  const radius = 40;
  const length = 2 * Math.PI * radius;
  const [left, setLeft] = useState(start);
  const [snap, setSnap] = useState(false);
  const leftRef = useRef(start);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      const next = leftRef.current <= end ? start : leftRef.current - 1;
      if (next === start) setSnap(true);
      leftRef.current = next;
      setLeft(next);
    }, tick);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!snap) return undefined;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setSnap(false));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [snap]);

  const minutes = Math.floor(left / 60);
  const seconds = String(left % 60).padStart(2, "0");
  const passed = (start - left) / (start - end);
  const fill = 0.65 - passed * 0.18;

  return (
    <div className="flex h-full flex-col bg-ivory px-3.5 pt-11 pb-4">
      <div className="flex items-center justify-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gold text-xs font-bold text-burgundy-deep">
          ن
        </span>
        <span className="text-sm font-bold text-burgundy-deep">اسم مطعمكم</span>
      </div>
      <p className="mt-5 text-center text-[11px] font-semibold text-ink/50">طلبك رقم</p>
      <p className="mt-1 text-center font-sans text-[2.6rem] leading-none font-bold text-burgundy-deep" dir="ltr">
        215
      </p>
      <div className="relative mx-auto mt-4 grid h-36 w-36 place-items-center">
        <svg viewBox="0 0 100 100" className="-rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth="8" className="stroke-gold/20" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-gold"
            style={snap ? undefined : { transition: `stroke-dashoffset ${tick}ms linear` }}
            strokeDasharray={length}
            strokeDashoffset={length * (1 - fill)}
          />
        </svg>
        <div className="absolute text-center">
          <p className="font-sans text-[1.65rem] leading-none font-bold text-burgundy-deep" dir="ltr">
            {minutes}:{seconds}
          </p>
          <p className="mt-1 text-[10px] font-medium text-ink/50">دقائق تقريباً</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between rounded-2xl bg-foam px-3 py-2.5">
        <span className="text-[11px] font-semibold text-ink/55">جاهز حوالي</span>
        <b className="font-sans text-sm font-bold text-burgundy-deep" dir="ltr">
          9:46
        </b>
      </div>
    </div>
  );
}

function ReadyPanel({ children }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-burgundy px-4 text-center text-ivory">
      {children}
      <ReadyLines
        titleClassName="font-display text-5xl font-bold"
        detailClassName="mt-2 text-sm text-gold"
      />
    </div>
  );
}

function FilmReady() {
  return <ReadyPanel />;
}

function StoryReady() {
  return (
    <ReadyPanel>
      <div className="story-notif absolute top-10 inset-x-2 z-20 flex items-center gap-2 rounded-2xl bg-white px-2.5 py-2 text-start shadow-[0_14px_28px_-16px_rgba(74,4,24,0.55)]">
        <ReadyNotice tone="story" />
      </div>
    </ReadyPanel>
  );
}

function StoryRate() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-ivory px-4 text-center">
      <h3 className="font-display text-3xl font-bold text-burgundy-deep">بالعافية!</h3>
      <p className="mt-2 text-sm leading-6 text-ink/60">شو رأيك باسم مطعمكم؟</p>
      <div className="mt-5 flex gap-1.5 text-gold" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <svg key={index} viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M12 2.6 14.7 8.1 21 9l-4.4 4.3 1 6.1L12 16.8 6.4 19.4l1-6.1L3 9l6.3-.9L12 2.6z" />
          </svg>
        ))}
      </div>
      <div className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-burgundy px-4 py-2.5 text-sm font-bold text-ivory">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold" aria-hidden="true">
          <path d="M12 2.6 14.7 8.1 21 9l-4.4 4.3 1 6.1L12 16.8 6.4 19.4l1-6.1L3 9l6.3-.9L12 2.6z" />
        </svg>
        اترك تقييمك
      </div>
    </div>
  );
}

const steps = [
  {
    n: "٠١",
    title: "العميل بيمسح الكود اللي عالكاونتر",
    body: "بكاميرا جواله، بدون تطبيق وبدون حساب. بيكتب رقم طلبه وخلص.",
  },
  {
    n: "٠٢",
    title: "بيشوف كم باقي لطلبه",
    body: "تايمر قدامه طول الوقت، فبيقعد مرتاح بدل ما يضل واقف عالكاونتر يسأل.",
  },
  {
    n: "٠٣",
    title: "ضغطة تنبيه",
    body: "عندما يجهز الطعام تضغطون «تنبيه». الصفحة المفتوحة تصبح «جاهز» خلال ثوانٍ. ضغطة ثانية لا ترسل إشعاراً آخر.",
  },
  {
    n: "٠٤",
    title: "وبعدين بيقيّم محلك",
    body: "بعد ما يستلم، بيطلعله زر بيفتح صفحة ليترك تقييمه لحتى تقدر تتابع رضى العملاء.",
  },
];

const whatsappHref =
  "https://wa.me/963946431543?text=" +
  encodeURIComponent("مرحبا، بدي أجرّب ناديني لمحلي");
const instagramHref = "https://www.instagram.com/nadeeni.sy/";

export default function HomePage() {
  return (
    <div id="top" className="overflow-x-clip">
      <IntroFilm />
      <header className="sticky top-0 z-40 border-b border-burgundy/10 bg-ivory/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
          <a href="#top" className="shrink-0 rounded-2xl">
            <BrandMark className="h-14 w-14" />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
            <a href="#benefits" className="transition-colors hover:text-burgundy">
              لماذا ناديني
            </a>
            <a href="#steps" className="transition-colors hover:text-burgundy">
              الطريقة
            </a>
            <a href="#modes" className="transition-colors hover:text-burgundy">
              الرمز
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-2xl bg-burgundy px-4 py-2.5 text-sm font-semibold text-ivory shadow-[0_10px_30px_-12px_rgba(126,6,42,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-burgundy-deep hover:shadow-[0_12px_26px_-12px_rgba(74,4,24,0.55)]"
          >
            اطلبوا التجربة
          </a>
        </div>
      </header>

      <main>
        <motion.section
          className="relative overflow-hidden bg-white"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute -top-24 start-[-6rem] h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
          <div className="pointer-events-none absolute top-40 end-[-4rem] h-80 w-80 rounded-full bg-foam blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-12 pb-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16 lg:pb-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-paper/80 px-3 py-1 text-sm font-medium text-burgundy">
                <span className="relative h-5 w-5" aria-hidden="true">
                  <span className="absolute bottom-0.5 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-gold" />
                  <span className="absolute bottom-1.5 left-1/2 h-2.5 w-3.5 -translate-x-1/2 rounded-t-full bg-burgundy" />
                  <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-burgundy" />
                </span>
                بديل أجهزة النداء للمطاعم والكافيهات              </p>

              <h1 className="mt-6 font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl lg:text-6xl">
                العميل معه جهازه
                <span className="mt-1 block">
                  <span className="relative inline-block text-burgundy">وانت معك ناديني
                    <span className="absolute -bottom-1 start-0 h-[0.42rem] w-full rounded-full bg-gold sm:h-2.5" />
                  </span>
                </span>
              </h1>

              <p className="mt-8 max-w-xl font-display text-2xl leading-snug font-medium text-ink sm:text-3xl">
              ودّع وقفة الزباين جنب الكاشير وأجهزة النداء المزعجة. مع 'ناديني'، موبايل الزبون هو الحل!              </p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-ink/75">
              الزبون بيقعد مرتاح وبيتابع طلبه من متصفح موبايله بدون ما يحمّل أي تطبيق. وبس يجهز الأكل؟ تنبيه فوري بيوصله ليستلمه              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="rounded-2xl bg-burgundy px-7 py-3.5 font-semibold text-ivory shadow-[0_16px_40px_-18px_rgba(126,6,42,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-burgundy-deep hover:shadow-[0_14px_28px_-12px_rgba(74,4,24,0.55)]"
                >
                  اطلبوا التجربة
                </a>
                <a
                  href="#steps"
                  className="rounded-2xl border border-burgundy/15 bg-white/80 px-7 py-3.5 font-semibold text-burgundy transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-paper hover:shadow-[0_14px_28px_-14px_rgba(140,110,44,0.45)]"
                >
                  شاهدوا الطريقة
                </a>
              </div>

              <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-gold-deep">
                <span>بلا أجهزة</span>
                <span aria-hidden="true">·</span>
                <span>بلا تطبيق</span>
                <span aria-hidden="true">·</span>
                <span>بلا حساب للزبون</span>
                <span aria-hidden="true">·</span>
                <span>بلا رسائل</span>
              </p>
            </div>

            <StagePhone />
          </div>
        </motion.section>

        <section id="benefits" className="relative bg-[#f7f1e4] px-5 py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...rise}>
              <p className="text-sm font-semibold tracking-wide text-gold-deep">
                لماذا يترك المطعم الجهاز
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl">
                السؤال الذي يخرج من الصالة:
                <span className="mt-2 block text-burgundy">«هل جهز طلبي؟»</span>
              </h2>
              <ul className="mt-8 space-y-5 text-lg leading-8 text-ink/80">
                <li>الزبون لا يثبّت شيئاً. رابط في المتصفح الذي معه يكفي.</li>
                <li>الكاشير لا يتعلم نظاماً جديداً. يكتب الرقم، ثم يضغط تنبيه.</li>
                <li>لا حسابات للزبائن، ولا رسائل، ولا ربط مع صندوق الكاشير.</li>
              </ul>
            </motion.div>

            <motion.article
              {...rise}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-md rounded-[1.6rem] bg-paper px-6 py-7 shadow-[0_24px_60px_-30px_rgba(42,16,22,0.45)] ring-1 ring-burgundy/10 transition duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-6 top-0 h-4 bg-[radial-gradient(circle_at_8px_0,transparent_7px,#fffdf8_8px)] bg-[length:16px_16px]" />
              <p className="text-center font-display text-2xl font-bold text-burgundy">
                فاتورة لن تُدفع
              </p>
              <p className="mt-1 text-center text-xs text-ink/50">أجهزة النداء</p>
              <ul className="mt-6 space-y-3 text-sm">
                {retiredCosts.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="line-through decoration-burgundy/80">
                      {item}
                    </span>
                    <span className="mb-1 h-px flex-1 border-b border-dotted border-burgundy/25" />
                    <span className="font-semibold text-burgundy">يُلغى</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-dashed border-gold pt-4">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm text-ink/70">ما يتبقى</p>
                  <p className="text-end font-display text-2xl leading-none font-bold text-burgundy-deep">
                    رقم طلبكم
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-ink/70">المجموع</p>
                  <p className="font-display text-5xl leading-none font-bold text-gold-deep">
                    صفر
                  </p>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        <StepsStory />

        <CompareSection />

        <section id="modes" className="bg-[#f7f1e4] px-5 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...rise} className="max-w-2xl">
              <h2 className="font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl">
                ملصق واحد للمطعم، أو رمز مع كل طلب.
              </h2>
              <p className="mt-4 text-lg leading-8 text-ink/75">
                الصفحتان تؤديان إلى المكان نفسه. الفرق فقط في كيف يصل الهاتف إلى الطلب.
              </p>
            </motion.div>

            <div className="relative mt-12 grid items-stretch gap-5 lg:grid-cols-2">
              <motion.article
                {...rise}
                className="relative z-10 rounded-[1.6rem] border border-white/80 bg-white/80 p-7 shadow-[0_20px_50px_-28px_rgba(126,6,42,0.4)] backdrop-blur-md transition duration-300 hover:-translate-y-1 lg:translate-y-8"
              >
                <p className="text-sm font-semibold text-gold-deep">على الكونتر</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-burgundy-deep">
                  رمز ثابت للمطعم
                </h3>
                <p className="mt-4 leading-8 text-ink/75">
                  ملصق أو بطاقة. الزبون يمسح، يرى اسم المطعم، ويكتب رقم طلبه. إن لم يكن الكاشير قد أدخله بعد، تظهر جملة واحدة واضحة ويمكنه المحاولة مرة أخرى.
                </p>
                <div className="mt-6 flex items-center gap-4 rounded-2xl bg-ivory px-4 py-3 ring-1 ring-burgundy/10">
                  <QrMotif />
                  <p className="text-sm leading-6 text-ink/70">
                    رمز واحد يُطبع ويبقى. لا ملف جديد مع كل طلب.
                  </p>
                </div>
              </motion.article>

              <motion.article
                {...rise}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                className="relative rounded-[1.6rem] bg-burgundy p-7 text-ivory shadow-[0_24px_50px_-24px_rgba(126,6,42,0.7)] transition duration-300 hover:-translate-y-1 lg:-translate-y-3"
              >
                <div className="absolute -top-8 -end-6 h-28 w-28 rounded-full bg-gold/25 blur-2xl" />
                <p className="relative text-sm font-semibold text-gold">على الشاشة</p>
                <h3 className="relative mt-2 font-display text-3xl font-bold">
                  رمز لهذا الطلب
                </h3>
                <p className="relative mt-4 leading-8 text-ivory/85">
                  إنشاء الطلب يُظهر رمزاً يفتح تلك الصفحة مباشرة، بلا كتابة. إن فشل المسح، إظهار الرمز مرة أخرى يعيد الصورة نفسها ولا ينشئ طلباً جديداً.
                </p>
                <p className="relative mt-6 font-display text-2xl font-semibold text-gold">
                  الصفحة واحدة في الحالتين.
                </p>
              </motion.article>
            </div>

            <p className="mt-16 max-w-3xl border-s-4 border-gold ps-5 text-base leading-8 text-ink/80">
              الصفحة المفتوحة تتجدد وحدها خلال ثوانٍ، بلا زر تحديث. الإشعار يصل حيث يدعم المتصفح ذلك، وعلى آيفون بعد إضافة الموقع إلى الشاشة الرئيسية. الصفحة هي المرجع، ولا نعد بأن الإشعار وصل إلى يد الزبون.
            </p>
          </div>
        </section>

        {/* <section id="request" className="relative overflow-hidden bg-gold px-5 py-24 sm:py-28">
          <div
            className="pointer-events-none absolute -top-28 start-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 end-[-4rem] h-64 w-64 rounded-full bg-burgundy/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...rise}>
              <h2 className="font-display text-4xl leading-[1.15] font-bold text-burgundy-deep sm:text-6xl">
                استبدلوا جهاز النداء هذا الأسبوع.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-burgundy-deep/80">
                اكتبوا اسم المطعم ورقم الهاتف. نجهّز نص الطلب لتنسخوه وترسلوه إلى فريق ناديني. الحساب يُفتح من طرفنا، ولا يوجد تسجيل من هذه الصفحة.
              </p>
            </motion.div>

            <motion.form
              onSubmit={onSubmit}
              {...rise}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="rounded-[1.6rem] bg-ivory p-6 text-ink shadow-[0_30px_70px_-28px_rgba(74,4,24,0.4)] sm:p-8"
            >
              <FormMark />
              <label className="block text-sm font-semibold" htmlFor="restaurant">
                اسم المطعم
              </label>
              <input
                id="restaurant"
                name="restaurant"
                required
                autoComplete="organization"
                className="mt-2 w-full rounded-2xl border border-burgundy/15 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold"
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold" htmlFor="city">
                    المدينة
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    autoComplete="address-level2"
                    className="mt-2 w-full rounded-2xl border border-burgundy/15 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold" htmlFor="phone">
                    الهاتف
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    dir="ltr"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-2xl border border-burgundy/15 bg-white px-4 py-3 text-end outline-none transition focus:border-gold focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>

              <label className="mt-4 block text-sm font-semibold" htmlFor="note">
                ملاحظة
                <span className="font-medium text-ink/50"> (اختياري)</span>
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                className="mt-2 w-full resize-none rounded-2xl border border-burgundy/15 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold"
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-2xl bg-burgundy px-6 py-3.5 font-semibold text-ivory transition duration-300 hover:-translate-y-0.5 hover:bg-burgundy-deep hover:shadow-[0_14px_28px_-12px_rgba(74,4,24,0.55)]"
              >
                جهّزوا نص الطلب
              </button>

              {ticket ? (
                <div className="mt-5 rounded-2xl border border-dashed border-gold bg-paper p-4">
                  <p className="text-sm font-semibold text-burgundy">طلبكم جاهز للنسخ</p>
                  <pre
                    className="mt-2 font-sans text-sm leading-7 whitespace-pre-wrap text-ink/80"
                    tabIndex={0}
                  >
                    {ticket}
                  </pre>
                  <button
                    type="button"
                    onClick={copyTicket}
                    className="mt-3 rounded-full border border-burgundy/20 px-4 py-2 text-sm font-semibold text-burgundy"
                  >
                    {copied ? "تم النسخ" : "انسخوا الطلب"}
                  </button>
                  <p className="mt-3 text-xs leading-6 text-ink/60" role="status">
                    أرسلوا النص إلى فريق ناديني. هذه الصفحة لا تنشئ حساباً ولا تتصل بنظام الطلبات.
                  </p>
                </div>
              ) : null}
            </motion.form>
          </div>
        </section> */}
      </main>

      <footer id="contact" className="bg-burgundy-deep px-5 py-16 text-ivory sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">تواصل معنا</h2>

          <div className="mt-7 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-[1.25rem] bg-gold px-5 py-4 text-burgundy-deep transition duration-300 hover:-translate-y-0.5 hover:bg-[#d7b45a]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-burgundy-deep text-gold" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path fill="currentColor" d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-.5-.3Z" />
                </svg>
              </span>
              <span>
                <small className="block text-sm font-semibold text-burgundy-deep/70">احكي معنا عالواتساب</small>
                <b className="mt-0.5 block text-lg font-bold" dir="ltr">0946 431 543</b>
              </span>
            </a>

            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-[1.25rem] bg-white/10 px-5 py-4 text-ivory ring-1 ring-white/15 transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <span>
                <small className="block text-sm font-semibold text-ivory/70">تابعنا على انستغرام</small>
                <b className="mt-0.5 block text-lg font-bold" dir="ltr">@nadeeni.sy</b>
              </span>
            </a>
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <a href="#top" className="inline-flex items-center gap-3">
                <BrandIcon className="h-11 w-11" />
                <span className="font-display text-2xl font-bold">ناديني</span>
              </a>
              <p className="mt-2 text-sm text-ivory/65">نداء الطلب من هاتف الزبون.</p>
            </div>

            <nav aria-label="روابط" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ivory/80">
              <a href="#benefits" className="transition-colors hover:text-gold">لماذا ناديني</a>
              <a href="#steps" className="transition-colors hover:text-gold">الطريقة</a>
              <a href="#compare" className="transition-colors hover:text-gold">المقارنة</a>
              <a href="#modes" className="transition-colors hover:text-gold">الرمز</a>
            </nav>

            <div className="flex gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-burgundy-deep"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path fill="currentColor" d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-.5-.3Z" />
                </svg>
              </a>
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="انستغرام"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-burgundy-deep"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <p className="mt-7 text-sm text-ivory/50">© 2026 ناديني. جميع الحقوق محفوظة. صُنع في سوريا.</p>
        </div>
      </footer>
    </div>
  );
}

function StagePhone() {
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(false);
      setReady(true);
      return;
    }
    const timer = setInterval(() => setReady((value) => !value), 3400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[340px] pt-6">
      <span className="pointer-events-none absolute top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      {ready && live ? <RippleBurst className="notify-ripple" /> : null}

      <div className={`relative ${live ? "stage-float" : ""}`}>
        <div className={ready && live ? "phone-buzz" : ""}>
          <motion.div
            aria-hidden={!ready}
            initial={false}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -24, scale: 0.9 }}
            transition={
              ready
                ? { type: "spring", stiffness: 460, damping: 16, mass: 0.7 }
                : { duration: 0.22, ease: "easeIn" }
            }
            className="pointer-events-none absolute -top-5 inset-x-1 z-20 flex items-center gap-3 rounded-[1.3rem] bg-white px-3 py-2 shadow-[0_18px_40px_-18px_rgba(74,4,24,0.5)] ring-1 ring-gold/50"
          >
            <ReadyNotice tone="hero" />
          </motion.div>

          <PhoneShell {...phoneShells.hero}>
              <motion.div
                className="absolute inset-0"
                animate={{ backgroundColor: ready ? "#7e062a" : "#fdfaf1" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.div
                key={ready ? "ready" : "wait"}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {ready ? <StageReady /> : <StageWait live={live} />}
              </motion.div>
          </PhoneShell>
        </div>
      </div>
    </div>
  );
}

function StageWait({ live }) {
  return (
    <div className="flex h-full flex-col items-center px-4 pt-12 text-center">
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-gold/40">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gold text-xs font-bold text-burgundy-deep">
          ن
        </span>
        <span className="text-sm font-semibold text-burgundy-deep">اسم مطعمكم</span>
      </div>
      <p className="mt-7 text-xs tracking-wide text-ink/50">رقم الطلب</p>
      <p className="mt-1 font-sans text-7xl leading-none font-bold text-burgundy-deep">{orderNo}</p>
      <div className="relative mt-6 h-28 w-28">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#f3e6c8" strokeWidth="7" />
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#cda649"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="314"
            animate={live ? { strokeDashoffset: [280, 36] } : { strokeDashoffset: 90 }}
            transition={live ? { duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : { duration: 0.4 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="font-display text-lg leading-none font-bold text-burgundy">ثوانٍ</p>
            <p className="mt-1 text-[10px] text-ink/50">الصفحة تتجدد</p>
          </div>
        </div>
      </div>
      <p className="mt-5 rounded-full bg-gold/30 px-4 py-1.5 text-sm font-semibold text-burgundy-deep">
        يُحضَّر
      </p>
    </div>
  );
}

function StageReady() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 pb-6 text-center text-ivory">
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 14 }}
        className="grid h-16 w-16 place-items-center rounded-full bg-gold text-3xl font-bold text-burgundy-deep"
      >
        ✓
      </motion.span>
      <p className="mt-5 font-display text-6xl leading-none font-bold">{readyWord}</p>
      <span className="mt-3 h-1 w-16 rounded-full bg-gold" />
      <p className="mt-3 text-sm text-gold">{counterLine}</p>
      <p className="mt-6 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-ivory ring-1 ring-gold/40">
        رقم {orderNo}
      </p>
    </div>
  );
}

function CompareSection() {
  const [pagerOn, setPagerOn] = useState(false);
  const rows = [
    {
      label: "التكلفة",
      retired: "شراء أجهزة وتكاليف استبدال",
      kept: "بلا شراء أجهزة، وبلا استبدال",
    },
    {
      label: "المدى",
      retired: "نطاق محدود يختلف بحسب نوع الجهاز",
      kept: "غير محدود بنطاق جهاز",
    },
    {
      label: "الأجهزة والصيانة",
      retired: "أجهزة تحتاج إلى شحن وتنظيف وصيانة",
      kept: "جوال العميل فقط",
    },
    {
      label: "الهوية",
      retired: "جهاز عام بدون هوية",
      kept: "الصفحة باسم مطعمكم",
    },
    {
      label: "التركيب",
      retired: "تركيب وتجهيز أجهزة",
      kept: "ملصق واحد، بلا تركيب أجهزة",
    },
    {
      label: "التقييم",
      retired: "لا يدعم طلب التقييم من العميل",
      kept: "بعد الاستلام، التقييم من الصفحة نفسها",
    },
  ];

  return (
    <section id="compare" className="bg-[#f7f1e4] px-5 py-24 sm:py-28" aria-labelledby="compare-title">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise} className="max-w-3xl">
          <h2 id="compare-title" className="font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl">
            جهاز النداء، ولا جوال الزبون؟
          </h2>
        </motion.div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
          <motion.article
            {...rise}
            onViewportEnter={() => setPagerOn(true)}
            className="relative overflow-hidden rounded-[1.6rem] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(74,4,24,0.28)] ring-1 ring-burgundy/10 sm:p-8"
          >
            <span className="absolute top-7 end-5 -rotate-12 rounded-lg border-2 border-burgundy/70 px-2.5 py-0.5 font-display text-base font-bold text-burgundy sm:top-8 sm:end-8 sm:px-3 sm:py-1 sm:text-lg">
              خلص زمنه
            </span>
            <div className="flex items-center gap-3 pe-28 sm:pe-24">
              <span className={pagerOn ? "pager-mark is-on" : "pager-mark"} aria-hidden="true" />
              <div>
                <h3 className="font-display text-2xl font-bold text-burgundy-deep">جهاز النداء</h3>
                <p className="mt-1 text-sm text-ink/55">نظام يعتمد على أجهزة مستقلة</p>
              </div>
            </div>
            <ul className="mt-8">
              {rows.map((row) => (
                <li key={row.label} className="flex items-start gap-3 border-t border-burgundy/10 py-4 first:border-t-0 first:pt-0 last:pb-0">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-[22px] w-[22px] shrink-0 rounded-full bg-[#FDE7E7] p-1 text-burgundy" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" d="M7 7l10 10M17 7L7 17" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-burgundy">{row.label}</p>
                    <p className="mt-0.5 text-base leading-7 text-ink/75">{row.retired}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            {...rise}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="rounded-[1.6rem] bg-burgundy-deep p-6 text-ivory shadow-[0_24px_50px_-24px_rgba(74,4,24,0.55)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <BrandIcon />
              <div>
                <h3 className="font-display text-2xl font-bold">ناديني</h3>
                <p className="mt-1 text-sm text-gold">جوال الزبون هو الجهاز</p>
              </div>
            </div>
            <ul className="mt-8">
              {rows.map((row) => (
                <li key={row.label} className="flex items-start gap-3 border-t border-white/15 py-4 first:border-t-0 first:pt-0 last:pb-0">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-[22px] w-[22px] shrink-0 rounded-full bg-gold p-1 text-burgundy-deep" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-gold">{row.label}</p>
                    <p className="mt-0.5 text-base leading-7 text-ivory/90">{row.kept}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function StepsStory() {
  const [active, setActive] = useState(0);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!compact) return undefined;
    const pick = () => {
      const cards = [...document.querySelectorAll("#steps li")];
      const mark = window.innerHeight * 0.7;
      let next = 0;
      cards.forEach((card, index) => {
        if (card.getBoundingClientRect().top <= mark) next = index;
      });
      setActive(next);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [compact]);

  return (
    <section id="steps" className="bg-white px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise} className="max-w-xl">
          <p className="text-sm font-semibold text-gold-deep">من الصندوق إلى الهاتف</p>
          <h2 className="mt-3 font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl">
            أربع حركات. ثم ينتظر الزبون حيث يشاء.
          </h2>
        </motion.div>

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="sticky top-20 z-20 -mx-5 mb-2 flex justify-center bg-white px-5 pt-2 pb-3 lg:top-28 lg:z-auto lg:order-2 lg:mx-0 lg:mb-0 lg:self-start lg:bg-transparent lg:px-0 lg:pt-10 lg:pb-0">
            <div className="origin-top scale-[0.72] -mb-[7.125rem] sm:scale-[0.86] sm:-mb-14 lg:mb-0 lg:scale-100">
              <StoryPhone step={active} />
            </div>
          </div>

          <ol className="lg:order-1">
            {steps.map((step, index) => {
              const on = active === index;
              return (
                <motion.li
                  key={step.n}
                  className="flex min-h-[52vh] items-center py-3 lg:min-h-[72vh]"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  viewport={{ once: true, amount: compact ? 0.35 : 0.72 }}
                  onViewportEnter={() => {
                    if (!compact) setActive(index);
                  }}
                >
                  <article
                    className={`w-full max-w-md rounded-[1.4rem] bg-white p-6 transition duration-300 sm:p-8 ${
                      on
                        ? "shadow-[0_24px_60px_-24px_rgba(74,4,24,0.45)] ring-2 ring-gold"
                        : "shadow-[0_20px_50px_-24px_rgba(74,4,24,0.28)] ring-1 ring-burgundy/10"
                    }`}
                  >
                    <span
                      className={`inline-grid h-9 w-9 place-items-center rounded-xl font-display text-lg leading-none font-bold text-burgundy-deep transition-colors duration-300 ${
                        on ? "bg-gold" : "bg-gold/25"
                      }`}
                    >
                      {step.n}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold text-burgundy sm:text-[1.7rem]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-8 text-ink/75">{step.body}</p>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StoryPhone({ step }) {
  const screens = [
    { id: "scan", Screen: StoryScan },
    { id: "order", Screen: StoryWait },
    { id: "ready", Screen: StoryReady },
    { id: "rate", Screen: StoryRate },
  ];
  const buzzing = screens[step]?.id === "ready";

  return (
    <div className="relative">
      <PhoneShell
        {...phoneShells.story}
        shell={`${phoneShells.story.shell} ${buzzing ? "phone-buzz" : ""}`}
      >
        {screens.map(({ id, Screen }, index) => (
          <div
            key={id}
            aria-hidden={step !== index}
            className={`story-screen absolute inset-0 ${step === index ? "is-on" : ""}`}
          >
            <Screen />
          </div>
        ))}
      </PhoneShell>
      <div className="absolute top-1/2 -end-[26px] grid -translate-y-1/2 gap-2" aria-hidden="true">
        {screens.map(({ id }, index) => (
          <span
            key={id}
            className={`story-dot block w-1.5 rounded-full ${
              step === index ? "h-[22px] bg-burgundy-deep" : "h-1.5 bg-burgundy/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function QrMotif() {
  const cells = [
    1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1,
  ];

  return (
    <span
      aria-hidden="true"
      className="grid h-14 w-14 shrink-0 grid-cols-5 gap-0.5 rounded-xl bg-burgundy p-1.5"
    >
      {cells.map((cell, index) => (
        <span
          key={index}
          className={cell ? "rounded-[2px] bg-ivory" : "rounded-[2px] bg-transparent"}
        />
      ))}
    </span>
  );
}
