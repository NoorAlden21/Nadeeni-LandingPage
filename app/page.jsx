"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";

function trackClick(event, label) {
  if (!posthog.__loaded) return;
  posthog.capture(event, { label });
}

function BrandMark({ className = "h-14 w-12" }) {
  return (
    <span className={`relative block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Nadeeni Logo" className="h-full w-full object-contain" />
    </span>
  );
}

function BrandIcon({ className = "h-[54px] w-12" }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-ivory p-1 ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" className="h-full w-full object-contain" />
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

function ReadyNotice({ tone, number = orderNo }) {
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
      <span className={style.badge}>{number}</span>
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
    <div className="relative mx-auto mb-7 grid h-28 w-24 place-items-center overflow-hidden rounded-[1.5rem] bg-ivory p-2 ring-1 ring-gold/50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Nadeeni Logo" className="h-full w-full object-contain" />
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

const leaveReasons = [
  {
    title: "بلا تطبيق",
    body: "الزبون بيمسح الرمز من المتصفح اللي معه. ما بيحمّل شي، وما بيعمل حساب.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 18h2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "شغل الكاشير خفيف",
    body: "بيكتب رقم الطلب اللي عندكم، وبيضغط تنبيه لما يجهز. ما في نظام جديد يتعلّمه.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M5 7h14M5 12h9M5 17h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "الزبون ما بيوقف يسأل",
    body: "بيتابع الصفحة من محلّه. بتتجدد وحدها خلال ثوانٍ، بلا رسائل وبلا ربط مع الصندوق.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4.5l2.5 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
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
    <div className="flex h-full justify-center">
      <div className="h-[440px] w-[244px] origin-top scale-[0.68] sm:scale-[0.82]">
        <StageWait live name="مطعم الشام" />
      </div>
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

function StoryReady({ number = orderNo }) {
  return (
    <ReadyPanel>
      <div className="story-notif absolute top-10 inset-x-2 z-20 flex items-center gap-2 rounded-2xl bg-white px-2.5 py-2 text-start shadow-[0_14px_28px_-16px_rgba(74,4,24,0.55)]">
        <ReadyNotice tone="story" number={number} />
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
    body: "عندما يجهز الطعام تضغطون «تنبيه». الصفحة المفتوحة تصبح «جاهز» فورا.",
  },
  {
    n: "٠٤",
    title: "وبالنهاية بيترك تقييم",
    body: "بعد ما يستلم طلبه، بيطلعله زر بيفتح صفحة ليترك تقييمه لحتى تقدر تتابع رضى العملاء.",
  },
];

const whatsappHref =
  "https://wa.me/963946431543?text=" +
  encodeURIComponent("مرحبا، بدي أجرّب ناديني لمطعمي");
const instagramHref = "https://www.instagram.com/nadeeni.sy/";

const demoBeats = [
  {
    id: "scan",
    label: "امسح الرمز",
    role: "الخطوة الأولى · الزبون",
    title: "تبدأ بمسحة واحدة.",
    body: "بيمسح الرمز بكاميرا جواله، بدون تطبيق وبدون حساب، وبيكتب رقم طلبه. المسح هنا محاكاة، وما منفتح الكاميرا.",
    action: "جرّب مسح الرمز",
    state: "بانتظار مسح الرمز",
    caption: "أولًا، الزبون يمسح الرمز اللي عالكاونتر.",
  },
  {
    id: "wait",
    label: "كم باقي",
    role: "الخطوة الثانية · الزبون",
    title: "بيشوف كم باقي لطلبه.",
    body: "التايمر يضل قدامه على الجوال، فبيقعد مرتاح بدل ما يضل واقف عالكاونتر يسأل.",
    action: "نبّه الزبون",
    state: "العميل يتابع الطلب",
    caption: "رقم 215 قدامه، والتايمر يعدّ.",
  },
  {
    id: "ready",
    label: "يصل التنبيه",
    role: "الخطوة الثالثة · الكاشير",
    title: "ضغطة تنبيه، والصفحة تصير جاهز.",
    body: "لما يجهز الأكل بتضغطون «تنبيه». الصفحة المفتوحة تصير «جاهز». الزر تحت يعيد نفس التنبيه للعرض، وبالخدمة الضغطة الثانية ما بترسل إشعارًا ثانيًا.",
    action: "",
    state: "جاهز للاستلام",
    caption: "الصفحة صارت جاهز، والزبون يشوفها بدون ما يحدّث.",
  },
];

function playReadyChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const now = context.currentTime;
  [523.25, 783.99].forEach((frequency, index) => {
    const tone = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.11;
    tone.type = "sine";
    tone.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.05, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
    tone.connect(gain);
    gain.connect(context.destination);
    tone.start(start);
    tone.stop(start + 0.34);
  });
  window.setTimeout(() => context.close(), 900);
}

function TryStudio({ open, onClose }) {
  const dialogRef = useRef(null);
  const [step, setStep] = useState(0);
  const [sound, setSound] = useState(true);
  const [replay, setReplay] = useState(0);
  const beat = demoBeats[step];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setSound(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open) {
      setStep(0);
      setReplay(0);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function advance() {
    if (step === 1 && sound) playReadyChime();
    setStep((current) => Math.min(current + 1, demoBeats.length - 1));
  }

  function notifyAgain() {
    if (sound) playReadyChime();
    setReplay((value) => value + 1);
  }

  return (
    <dialog
      ref={dialogRef}
      className="try-studio"
      aria-labelledby="try-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4 sm:px-7">
          <div>
            <p className="text-sm font-semibold text-gold-deep">جرّب ناديني</p>
            <h2 id="try-title" className="mt-1 font-display text-2xl leading-tight font-bold text-burgundy-deep sm:text-3xl">
              من مسح الرمز… إلى التنبيه.
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-burgundy ring-1 ring-burgundy/10"
              aria-pressed={sound}
              onClick={() => setSound((value) => !value)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m8 8 5-4v16l-5-4H4V8h4Z" />
                {sound ? <path d="M17 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> : <path d="m17 9 5 6m0-6-5 6" />}
              </svg>
              <span className="hidden sm:inline">{sound ? "الصوت مفعّل" : "الصوت مقفل"}</span>
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-burgundy ring-1 ring-burgundy/10"
              aria-label="إغلاق التجربة"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </header>

        <ol className="flex flex-wrap gap-x-5 gap-y-2 border-b border-burgundy/10 px-5 py-3 sm:px-7" aria-label="خطوات التجربة">
          {demoBeats.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2 text-sm font-semibold" aria-current={index === step ? "step" : undefined}>
              <b
                className={`grid h-7 w-7 place-items-center rounded-full text-xs ${
                  index === step
                    ? "bg-burgundy text-ivory"
                    : index < step
                      ? "bg-gold text-burgundy-deep"
                      : "bg-burgundy/10 text-burgundy/35"
                }`}
              >
                {index < step ? "✓" : index + 1}
              </b>
              <span className={index === step ? "text-burgundy" : "text-ink/45"}>{item.label}</span>
            </li>
          ))}
        </ol>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto px-5 py-5 sm:px-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="order-2 lg:order-none">
            <p className="text-sm font-semibold text-gold-deep">{beat.role}</p>
            <h3 className="mt-2 font-display text-3xl leading-tight font-bold text-burgundy-deep">{beat.title}</h3>
            <p className="mt-3 max-w-md text-base leading-7 text-ink/70">{beat.body}</p>
            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-burgundy/10">
              <p className="text-sm text-ink/55">
                الطلب <strong className="ms-1 font-sans text-xl font-bold text-burgundy-deep" dir="ltr">#215</strong>
              </p>
              <p className="text-sm font-semibold text-burgundy">{beat.state}</p>
            </div>
            {step < 2 ? (
              <button
                type="button"
                onClick={advance}
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-burgundy px-5 py-3.5 font-semibold text-ivory transition duration-300 hover:bg-burgundy-deep"
              >
                {beat.action}
                <span aria-hidden="true">←</span>
              </button>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={notifyAgain}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-burgundy px-5 py-3.5 font-semibold text-ivory transition duration-300 hover:bg-burgundy-deep"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 8a6 6 0 0 0-12 0c0 6-3 7-3 9h18c0-2-3-3-3-9M10 21h4" />
                  </svg>
                  نادِه مرة ثانية
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setReplay(0);
                  }}
                  className="text-sm font-semibold text-burgundy"
                >
                  أعد التجربة من المسح
                </button>
              </div>
            )}
            <p className="mt-3 text-sm leading-6 text-ink/55">
              {step === 2
                ? "محاكاة داخل الصفحة. الصفحة هي المرجع، وما بنعد إن الإشعار وصل ليد الزبون."
                : "محاكاة فقط. ما منفتح الكاميرا ولا منطلب صلاحيات."}
            </p>
          </div>

          <div className="order-1 flex flex-col items-center lg:order-none">
            <p className="mb-3 text-sm font-semibold text-gold-deep">جوال الزبون</p>
            <PhoneShell
              key={`${beat.id}-${replay}`}
              shell={`${phoneShells.story.shell} ${step === 2 ? "phone-buzz" : ""}`}
              screen={phoneShells.story.screen}
              notch={phoneShells.story.notch}
            >
              <div className="story-screen is-on absolute inset-0">
                {step === 0 ? <StoryScan /> : null}
                {step === 1 ? <StoryWait /> : null}
                {step === 2 ? <StoryReady number="215" /> : null}
              </div>
            </PhoneShell>
            <p className="mt-4 max-w-xs text-center text-sm leading-6 text-ink/60">{beat.caption}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div id="top" className="overflow-x-clip">
      <IntroFilm />
      <header className="sticky top-0 z-40 border-b border-burgundy/10 bg-ivory/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5">
          <a href="#top" className="shrink-0 rounded-2xl">
            <BrandMark className="h-14 w-14" />
          </a>
          <nav className="hidden items-center gap-4 text-sm font-medium text-ink/70 md:flex lg:gap-6">
            <a href="#benefits" className="transition-colors hover:text-burgundy">
              لماذا ناديني
            </a>
            <a href="#steps" className="transition-colors hover:text-burgundy">
              الطريقة
            </a>
            <a href="#menu" className="transition-colors hover:text-burgundy">
              المنيو
            </a>
            <a href="#game" className="transition-colors hover:text-burgundy">
              اللعبة
            </a>
            <a href="#compare" className="transition-colors hover:text-burgundy">
              المقارنة
            </a>
            {/* <a href="#modes" className="transition-colors hover:text-burgundy">
              الرمز
            </a> */}
          </nav>
          <a
            href="#contact"
            onClick={() => trackClick("header_request_trial_clicked", "اطلبوا التجربة")}
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
            <div className="@container min-w-0">
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

              <div className="mt-8 flex flex-nowrap items-center gap-2 @max-[340px]:gap-1.5 md:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackClick("hero_try_demo_clicked", "جرّب النداء بنفسك");
                    setDemoOpen(true);
                  }}
                  className="cursor-pointer whitespace-nowrap rounded-2xl bg-burgundy px-3 py-2.5 text-sm font-semibold text-ivory shadow-[0_16px_40px_-18px_rgba(126,6,42,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-burgundy-deep hover:shadow-[0_14px_28px_-12px_rgba(74,4,24,0.55)] @max-[340px]:px-1.5 @max-[340px]:text-[11px] md:px-7 md:py-3.5 md:text-base"
                >
                  جرّب النداء بنفسك
                </button>
                <a
                  href="#contact"
                  onClick={() => trackClick("hero_request_trial_clicked", "اطلبوا التجربة")}
                  className="whitespace-nowrap rounded-2xl border border-burgundy/15 bg-white/80 px-3 py-2.5 text-sm font-semibold text-burgundy transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-paper hover:shadow-[0_14px_28px_-14px_rgba(140,110,44,0.45)] @max-[340px]:px-1.5 @max-[340px]:text-[11px] md:px-7 md:py-3.5 md:text-base"
                >
                  اطلبوا التجربة
                </a>
                <a
                  href="#steps"
                  onClick={() => trackClick("hero_watch_how_clicked", "شاهدوا الطريقة")}
                  className="whitespace-nowrap rounded-2xl border border-burgundy/15 bg-white/80 px-3 py-2.5 text-sm font-semibold text-burgundy transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-paper hover:shadow-[0_14px_28px_-14px_rgba(140,110,44,0.45)] @max-[340px]:px-1.5 @max-[340px]:text-[11px] md:px-7 md:py-3.5 md:text-base"
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

        <section id="benefits" className="relative overflow-hidden bg-[#f7f1e4] px-5 py-24 sm:py-28">
          <div className="pointer-events-none absolute -top-20 end-[-5rem] h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p
                {...rise}
                className="inline-flex items-center rounded-full border border-gold/60 bg-paper/80 px-3 py-1 text-sm font-medium text-burgundy"
              >
                ليش تستخدم ناديني
              </motion.p>
              <motion.h2
                {...rise}
                transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
                className="mt-5 font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl"
              >
                <span>الصالة بتسأل</span>{" "}
                <span className="whitespace-nowrap">سؤال واحد</span>
              </motion.h2>
              <motion.p
                className="quote-float relative mt-6 inline-block rounded-2xl rounded-ss-md bg-white px-5 py-3 font-display text-2xl font-bold text-burgundy shadow-[0_16px_40px_-24px_rgba(74,4,24,0.4)] ring-1 ring-burgundy/10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
              >
                «هل جهز طلبي؟»
              </motion.p>
              <motion.p
                {...rise}
                transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                className="mt-6 max-w-xl text-lg leading-8 text-ink/75"
              >
                ناديني بيخلّي الجواب على جوال الزبون. الكاشير بيضغط تنبيه، والصفحة المفتوحة بتصير «جاهز».
              </motion.p>
              <ul className="mt-8 space-y-3">
                {leaveReasons.map((reason, index) => (
                  <motion.li
                    key={reason.title}
                    className="flex items-start gap-4 rounded-2xl bg-white/80 p-4 shadow-[0_16px_40px_-28px_rgba(74,4,24,0.45)] ring-1 ring-burgundy/10"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: 0.18 + index * 0.1, ease: "easeOut" }}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/30 text-burgundy-deep">
                      {reason.icon}
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-burgundy-deep">{reason.title}</p>
                      <p className="mt-1 text-base leading-7 text-ink/75">{reason.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.article
              {...rise}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-md rounded-[1.6rem] bg-paper px-6 py-7 shadow-[0_24px_60px_-30px_rgba(42,16,22,0.45)] ring-1 ring-burgundy/10 transition duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-6 top-0 h-4 bg-[radial-gradient(circle_at_8px_0,transparent_7px,#fffdf8_8px)] bg-[length:16px_16px]" />
              <p className="text-center font-display text-2xl font-bold text-burgundy">
                فاتورة ما بتندفع
              </p>
              <p className="mt-1 text-center text-xs text-ink/50">أجهزة النداء</p>
              <ul className="mt-6 space-y-3 text-sm">
                {retiredCosts.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-baseline gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                  >
                    <span className="line-through decoration-burgundy/80">
                      {item}
                    </span>
                    <span className="mb-1 h-px flex-1 border-b border-dotted border-burgundy/25" />
                    <span className="font-semibold text-burgundy">يُلغى</span>
                  </motion.li>
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

        <MenuSection />

        <GameSection />

        <CompareSection />

        {/* <section id="modes" className="bg-[#f7f1e4] px-5 py-24 sm:py-28">
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
        </section> */}

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
              onClick={() => trackClick("whatsapp_clicked", "احكي معنا عالواتساب")}
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
              onClick={() => trackClick("instagram_clicked", "تابعنا على انستغرام")}
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
              <a href="#menu" className="transition-colors hover:text-gold">المنيو</a>
              <a href="#game" className="transition-colors hover:text-gold">اللعبة</a>
              <a href="#compare" className="transition-colors hover:text-gold">المقارنة</a>
              {/* <a href="#modes" className="transition-colors hover:text-gold">الرمز</a> */}
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
      <TryStudio open={demoOpen} onClose={() => setDemoOpen(false)} />
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

function StageWait({ live, name = "اسم مطعمكم" }) {
  return (
    <div className="flex h-full flex-col items-center px-4 pt-12 text-center">
      <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-gold/40">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gold text-xs font-bold text-burgundy-deep">
          ن
        </span>
        <span className="text-sm font-semibold text-burgundy-deep">{name}</span>
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

const menuDishes = [
  {
    name: "شاورما عربي",
    detail: "دجاج، ثوم، وبطاطا",
    price: "٣٥",
    icon: "wrap",
  },
  {
    name: "صحن فلافل",
    detail: "حمص، سلطة، وخبز",
    price: "١٨",
    icon: "plate",
  },
  {
    name: "ليمون ونعناع",
    detail: "كأس طازج",
    price: "١٠",
    icon: "cup",
  },
];

const menuNotes = [
  {
    title: "بلا منيو ورقي",
    body: "السعر والصنف بيتحدثوا من عندكم، والزبون دايماً شايفاً النسخة الجديدة.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M7 4.5h8.5L19 8v11.5H7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M15 4.5V8h4M9.5 12h5M9.5 15.5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "على نفس الصفحة",
    body: "ما في رابط ثاني. المنيو فوق، ورقم طلبه تحت، على جواله.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 7.5h5M9.5 11h5M9.5 14.5h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "وهو قاعد",
    body: "بيملا وقت الانتظار من كرسيه، بدل ما يوقف على الكاونتر يسأل.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M5 11h14v2.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 11V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V11M8 15.5V19M16 15.5V19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

function MenuIcon({ name }) {
  const pen = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "plate") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" {...pen} />
        <circle cx="12" cy="12" r="3" {...pen} />
        <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2" {...pen} />
      </svg>
    );
  }

  if (name === "cup") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M7 8h8.5v5.5a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V8Z" {...pen} />
        <path d="M15.5 9.5H18a2 2 0 0 1 0 4h-2.5M8 20.5h8" {...pen} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M5 10c1.4-4 12.6-4 14 0" {...pen} />
      <path d="M6.5 10.5h11l-.7 6a3 3 0 0 1-3 2.6h-3.6a3 3 0 0 1-3-2.6l-.7-6Z" {...pen} />
      <path d="M9 10.2c.5 2 1.3 3 3 3s2.5-1 3-3" {...pen} />
    </svg>
  );
}

function MenuScreen() {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#fffdf8_0%,#fdfaf1_55%,#f8e8ed_100%)]">
      <div className="px-3 pt-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-gold text-[11px] font-bold text-burgundy-deep">
              ن
            </span>
            <span className="truncate text-xs font-bold text-burgundy-deep">اسم مطعمكم</span>
          </div>
          <span className="shrink-0 rounded-full bg-burgundy px-2 py-0.5 text-[10px] font-bold text-ivory">المنيو</span>
        </div>
        <div className="mt-3 flex gap-1">
          {["سندويش", "مشروبات", "حلويات"].map((label, index) => (
            <span
              key={label}
              className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                index === 0
                  ? "bg-burgundy text-ivory"
                  : "bg-white text-ink/45 ring-1 ring-burgundy/10"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 px-2.5">
        {menuDishes.map((dish, index) => (
          <motion.li
            key={dish.name}
            className={`flex items-center gap-2 rounded-2xl px-2 py-1.5 ring-1 ${
              index === 0
                ? "bg-white shadow-[0_10px_24px_-16px_rgba(126,6,42,0.55)] ring-gold/70"
                : "bg-white/80 ring-burgundy/10"
            }`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: 0.12 + index * 0.08, ease: "easeOut" }}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-foam text-burgundy">
              <MenuIcon name={dish.icon} />
            </span>
            <span className="min-w-0 flex-1 text-start">
              <span className="block truncate text-[12px] leading-4 font-bold text-burgundy-deep">{dish.name}</span>
              <span className="mt-0.5 block truncate text-[10px] leading-3 text-ink/50">{dish.detail}</span>
            </span>
            <span className="font-sans text-sm font-bold text-gold-deep">{dish.price}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mx-2.5 mt-auto mb-3 flex items-center gap-2 rounded-2xl bg-burgundy-deep px-2.5 py-2 text-ivory shadow-[0_14px_28px_-18px_rgba(74,4,24,0.8)]">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold font-sans text-xs font-bold text-burgundy-deep">
          {orderNo}
        </span>
        <span className="min-w-0 flex-1 text-start">
          <span className="flex items-center gap-1.5 text-[11px] font-bold">
            <span className="menu-live h-1.5 w-1.5 rounded-full bg-gold" />
            طلبك يُحضَّر
          </span>
          <span className="mt-0.5 block text-[10px] text-gold">المنيو قدامك وأنت تنتظر</span>
        </span>
      </div>
    </div>
  );
}

function MenuStage() {
  const paperLines = ["شاورما", "فلافل", "مشاوي", "عصائر", "حلويات"];

  return (
    <div className="relative mx-auto w-full max-w-[26rem] py-4">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-burgundy/15" aria-hidden="true" />

      <div className="absolute top-20 end-1 z-0 hidden w-36 rotate-[7deg] overflow-hidden rounded-[1.2rem] bg-paper px-3.5 py-4 shadow-[0_18px_40px_-24px_rgba(74,4,24,0.45)] ring-1 ring-gold/50 sm:block">
        <p className="text-end font-display text-sm font-bold text-burgundy/80">منيو ورقي</p>
        <ul className="mt-3 space-y-2">
          {paperLines.map((line) => (
            <li key={line} className="flex items-center gap-2 text-[11px] text-ink/35">
              <span className="h-px flex-1 border-b border-dotted border-burgundy/20" />
              <span className="line-through decoration-burgundy/50">{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-end text-[10px] font-semibold text-burgundy/50">يُعاد طبعه</p>
      </div>

      <motion.div
        className="absolute top-6 start-0 z-20 hidden rounded-2xl bg-white px-3 py-2 shadow-[0_16px_36px_-22px_rgba(74,4,24,0.55)] ring-1 ring-gold/60 sm:block"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
      >
        <p className="text-[11px] font-semibold text-ink/45">نفس الرمز</p>
        <p className="font-display text-sm font-bold text-burgundy">منيو ونداء</p>
      </motion.div>

      <div className="stage-float relative z-10 mx-auto w-fit">
        <PhoneShell {...phoneShells.story}>
          <MenuScreen />
        </PhoneShell>
      </div>
    </div>
  );
}

function MenuSection() {
  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[radial-gradient(90%_80%_at_100%_0%,#fffdf8_0%,#f8e8ed_46%,#f3e6c8_100%)] px-5 py-24 sm:py-28"
      aria-labelledby="menu-title"
    >
      <div className="pointer-events-none absolute -bottom-24 start-[-4rem] h-72 w-72 rounded-full bg-white/50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="order-2 lg:order-none">
            <motion.h2
              {...rise}
              id="menu-title"
              className="font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl"
            >
              وهو ينتظر،
              <span className="mt-1 block">
                <span className="relative inline-block">
                  المنيو قدامه
                  <span className="absolute -bottom-1 start-0 h-[0.42rem] w-full rounded-full bg-gold sm:h-2" />
                </span>
              </span>
            </motion.h2>
            <motion.p
              {...rise}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-8 text-ink/75"
            >
              الرمز نفسه اللي بيفتح متابعة الطلب بيفتح منيو مطعمكم. بلا ورقة، وبلا تطبيق، وبلا ما يسأل الموظف «شو عندكم؟».
            </motion.p>
          </div>
          <div className="order-1 lg:order-none">
            <MenuStage />
          </div>
        </div>

        <ul className="mt-4 grid gap-4 md:mt-8 md:grid-cols-3">
          {menuNotes.map((note, index) => (
            <motion.li
              key={note.title}
              className="rounded-[1.4rem] bg-white/85 p-5 shadow-[0_18px_44px_-28px_rgba(74,4,24,0.4)] ring-1 ring-white backdrop-blur-sm transition duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: 0.08 + index * 0.08, ease: "easeOut" }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/30 text-burgundy-deep">
                {note.icon}
              </span>
              <p className="mt-4 font-display text-xl font-bold text-burgundy-deep">{note.title}</p>
              <p className="mt-2 text-base leading-7 text-ink/75">{note.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const gameCells = [null, null, null, 2, null, null, null, null, null, null, 4, null, null, 2, null, null];

const gameNotes = [
  {
    title: "من نفس الصفحة",
    body: "تحت حالة الطلب في زر: «العب وأنت تنتظر». بلا تطبيق وبلا ما يترك المطعم.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M8 6.5v11l10-5.5-10-5.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "الرقم قدامه",
    body: "رقم الطلب يبقى فوق اللوحة، حتى وهو عم يلعب. ما بيضيع الطلب باللعبة.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 15V9M12 15V9M16 15v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "يرجع بلحظة",
    body: "«إغلاق اللعبة» ترجّعه لحالة الطلب. الصفحة نفسها، من غير ما يحدّث.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M8 8.5 5 12l3 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12h9.5a4.5 4.5 0 1 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

function GameScreen() {
  return (
    <div className="flex h-full flex-col bg-[#f6e7ee] px-2.5 pt-10 pb-2.5">
      <div className="rounded-xl bg-[#fff8ee] py-1.5 text-center text-[11px] font-bold text-burgundy-deep shadow-sm">
        إغلاق اللعبة
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="w-fit rounded-md bg-burgundy px-2 py-1 text-[10px] font-bold text-ivory">لعبة جديدة</div>
          <div className="mt-1 flex gap-1">
            {[
              ["الأفضل", "0"],
              ["النقاط", "0"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-[#e7d3c4] px-1.5 py-0.5 text-center">
                <p className="text-[8px] font-semibold text-burgundy/70">{label}</p>
                <p className="font-sans text-[11px] leading-4 font-bold text-burgundy-deep" dir="ltr">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="font-sans text-[1.7rem] leading-none font-bold text-burgundy-deep" dir="ltr">
          2048
        </p>
      </div>
      <p className="mt-2 text-end text-[10px] leading-4 text-ink/55">اسحب اللوحة لدمج الأرقام المتشابهة.</p>
      <p className="mt-1 text-center text-[11px] font-bold text-burgundy">
        رقم الطلب <span className="font-sans">{orderNo}</span>
      </p>
      <div dir="ltr" className="mt-1.5 grid min-h-0 flex-1 grid-cols-4 grid-rows-4 gap-1 rounded-xl bg-[#d8c4b2] p-1.5">
        {gameCells.map((value, index) => (
          <span
            key={index}
            className={`grid place-items-center rounded-md font-sans text-sm font-bold text-burgundy-deep ${
              value ? "bg-[#fff8ee] shadow-[0_4px_8px_-6px_rgba(74,4,24,0.45)]" : "bg-[#eadccf]"
            }`}
          >
            {value || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function GameStage() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] py-4">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/35" aria-hidden="true" />

      <motion.div
        className="absolute top-8 start-0 z-20 hidden rounded-2xl bg-white px-3 py-2.5 text-center shadow-[0_16px_36px_-22px_rgba(74,4,24,0.55)] ring-1 ring-gold/60 sm:block"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
      >
        <p className="text-[11px] font-semibold text-ink/45">يتم التحضير</p>
        <p className="mt-1 rounded-full bg-[#fff4df] px-3 py-1 text-xs font-bold text-burgundy">العب وأنت تنتظر</p>
      </motion.div>

      <div className="stage-float relative z-10 mx-auto w-fit">
        <PhoneShell {...phoneShells.story}>
          <GameScreen />
        </PhoneShell>
      </div>
    </div>
  );
}

function GameSection() {
  return (
    <section id="game" className="relative overflow-hidden bg-white px-5 py-24 sm:py-28" aria-labelledby="game-title">
      <div className="pointer-events-none absolute top-10 start-[-4rem] h-72 w-72 rounded-full bg-foam blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="order-2 lg:order-none">
            <motion.h2
              {...rise}
              id="game-title"
              className="font-display text-4xl leading-tight font-bold text-burgundy-deep sm:text-5xl"
            >
              وهو ينتظر،
              <span className="mt-1 block">
                <span className="relative inline-block">
                  بلعب لعبة
                  <span className="absolute -bottom-1 start-0 h-[0.42rem] w-full rounded-full bg-gold sm:h-2" />
                </span>
              </span>
            </motion.h2>
            <motion.p
              {...rise}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-8 text-ink/75"
            >
              من صفحة الطلب يفتح لعبة أرقام خفيفة. بيسحب اللوحة ويدمج المتشابه، ورقم طلبه يبقى قدامه لين يجهز الأكل.
            </motion.p>
          </div>
          <div className="order-1 lg:order-none">
            <GameStage />
          </div>
        </div>

        <ul className="mt-4 grid gap-4 md:mt-8 md:grid-cols-3">
          {gameNotes.map((note, index) => (
            <motion.li
              key={note.title}
              className="rounded-[1.4rem] bg-ivory p-5 shadow-[0_18px_44px_-28px_rgba(74,4,24,0.35)] ring-1 ring-burgundy/10 transition duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: 0.08 + index * 0.08, ease: "easeOut" }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/30 text-burgundy-deep">
                {note.icon}
              </span>
              <p className="mt-4 font-display text-xl font-bold text-burgundy-deep">{note.title}</p>
              <p className="mt-2 text-base leading-7 text-ink/75">{note.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
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
      label: "المنيو",
      retired: "ورقة منفصلة عن جهاز النداء",
      kept: "المنيو على نفس صفحة الطلب",
    },
    {
      label: "الانتظار",
      retired: "وقوف على الكاونتر حتى ينادى",
      kept: "لعبة خفيفة على نفس الصفحة",
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
