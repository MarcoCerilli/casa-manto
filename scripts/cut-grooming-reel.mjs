import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const src = "public/clip/toelettatura-sorgente.mp4";
const srtPath = "public/clip/toelettatura.srt";
const out = "public/clip/toelettatura.mp4";

const kitSrc = readFileSync(new URL("../lib/clip-kits.ts", import.meta.url), "utf8");
const block = kitSrc.split('sector: "toelettatura"')[1]?.split("cues: [")[1]?.split("],")[0] ?? "";
const cues = [...block.matchAll(/start: "([^"]+)", end: "([^"]+)", text: "((?:\\.|[^"\\])*)"/g)];
if (!cues.length) {
  console.error("Nessun sottotitolo toelettatura");
  process.exit(1);
}
writeFileSync(
  srtPath,
  cues
    .map((match, index) => `${index + 1}\n${match[1]} --> ${match[2]}\n${match[3].replace(/\\n/g, "\n")}\n`)
    .join("\n")
);

const prep =
  "scale=1080:-2:flags=lanczos,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x1c1917,fps=30,setsar=1,format=yuv420p";
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
  "MarginV=48",
].join(",");

const clips = [
  { start: 0.1, end: 3.4 },
  { start: 21.9, end: 24.7 },
  { start: 24.95, end: 30.8 },
  { start: 37.3, end: 44.0 },
  { start: 48.15, end: 50.75 },
  { start: 68.8, end: 77.55 },
];

const parts = clips.map(
  (clip, index) =>
    `[0:v]trim=start=${clip.start}:end=${clip.end},setpts=PTS-STARTPTS,${prep}[v${index}]`
);
const labels = clips.map((_, index) => `[v${index}]`).join("");

const filter = [
  ...parts,
  `${labels}concat=n=6:v=1:a=0[v]`,
  `[v]subtitles=${srtPath}:fontsdir=/usr/share/fonts/truetype/lato:force_style='${style}'[outv]`,
].join(";");

const result = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    src,
    "-f",
    "lavfi",
    "-t",
    "30",
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-filter_complex",
    filter,
    "-map",
    "[outv]",
    "-map",
    "1:a",
    "-t",
    "30",
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

if (result.status !== 0) process.exit(result.status ?? 1);
console.log("Reel toelettatura pronto:", out);
