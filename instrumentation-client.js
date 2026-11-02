import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

function scrub(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\/o\/[^/?#]+/g, "/o/[token]");
}

function isLocalDevHost(hostname) {
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]"
  ) {
    return true;
  }

  const parts = hostname.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return false;
  }

  const [a, b] = parts;
  if (a === 10 || a === 127) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

if (token && !isLocalDevHost(window.location.hostname)) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-08-30",
    person_profiles: "identified_only",
    disable_session_recording: true,
    before_send(event) {
      if (!event?.properties) return event;
      for (const key of ["$current_url", "$pathname", "$referrer"]) {
        event.properties[key] = scrub(event.properties[key]);
      }
      return event;
    },
  });
}
