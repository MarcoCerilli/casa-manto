import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const src = readFileSync(new URL("../lib/clip-kits.ts", import.meta.url), "utf8");

function seconds(stamp) {
  const [h, m, rest] = stamp.split(":");
  const [s, ms] = rest.split(",");
  return Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
}

function kits() {
  const sectors = [...src.matchAll(/sector: "([^"]+)"/g)].map((match) => match[1]);
  const blocks = [...src.matchAll(/cues: \[([\s\S]*?)\],/g)].map((match) => match[1]);
  return sectors.map((sector, index) => {
    const cues = [...blocks[index].matchAll(/start: "([^"]+)", end: "([^"]+)", text: "((?:\\.|[^"\\])*)"/g)].map(
      (match) => ({
        start: seconds(match[1]),
        end: seconds(match[2]),
        text: match[3].replace(/\\n/g, "\n"),
      })
    );
    return { sector, cues };
  });
}

function stamp(seconds) {
  const ms = Math.round(seconds * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const milli = String(ms % 1000).padStart(3, "0");
  return `${h}:${m}:${s},${milli}`;
}

function build(kit) {
  const srtPath = `public/clip/${kit.sector}.srt`;
  const srt = kit.cues
    .map((cue, index) => `${index + 1}\n${stamp(cue.start)} --> ${stamp(cue.end)}\n${cue.text}\n`)
    .join("\n");
  writeFileSync(srtPath, srt);

  const style = [
    "FontName=Lato",
    "Bold=1",
    "FontSize=18",
    "PrimaryColour=&H00FFFFFF",
    "OutlineColour=&H00000000",
    "BackColour=&H96000000",
    "BorderStyle=4",
    "Outline=0",
    "Shadow=0",
    "Alignment=2",
    "MarginV=70",
  ].join(",");

  const vf = [
    "scale=1080:1920:flags=lanczos",
    "zoompan=z='1+0.0001*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=30",
    `subtitles=${srtPath}:fontsdir=/usr/share/fonts/truetype/lato:force_style='${style}'`,
  ].join(",");

  const out = `public/clip/${kit.sector}.mp4`;
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-loop",
      "1",
      "-framerate",
      "30",
      "-i",
      `public/locandine/${kit.sector}-reel.jpg`,
      "-f",
      "lavfi",
      "-t",
      "30",
      "-i",
      "anullsrc=channel_layout=stereo:sample_rate=44100",
      "-t",
      "30",
      "-vf",
      vf,
      "-map",
      "0:v",
      "-map",
      "1:a",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-profile:v",
      "high",
      "-crf",
      "20",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      "-shortest",
      out,
    ],
    { stdio: "inherit" }
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

mkdirSync("public/clip", { recursive: true });
const only = process.argv[2];
for (const kit of kits()) {
  if (only && kit.sector !== only) continue;
  if (existsSync(`public/clip/${kit.sector}-sorgente.mp4`)) {
    console.log(`${kit.sector}: skip locandina, reel già tagliato dalla registrazione`);
    continue;
  }
  if (!kit.cues.length) {
    console.error(`Nessun sottotitolo per ${kit.sector}`);
    process.exit(1);
  }
  console.log(`\n${kit.sector}: ${kit.cues.length} battute`);
  build(kit);
}
