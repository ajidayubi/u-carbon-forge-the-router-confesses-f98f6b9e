// The Router Confesses.
// The entry is one confession line, at most 200 characters, spoken by a
// home Wi-Fi router that dropped the connection at the climax of a movie.
// This program validates the line and writes exactly it (no trailing
// newline) to /output/entry.txt, so the grader reads one line and nothing
// else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The confession: the router is a drama queen with a fragile ego. The
// movie's twist was so good that the router itself fainted — it was never
// built to handle that kind of drama. The joke turns on the router
// reacting like a fainting viewer instead of blaming the signal, and it
// dodges the tired buffering, bandwidth and firmware-update gags.
const LINE =
  "The twist was so good I fainted. I'm a router, I wasn't built to handle that kind of drama.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line, no line breaks");
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve("/output");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
// Read back and confirm the grader will see exactly the line, nothing else.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(LINE);
console.log(`chars: ${LINE.length}`);
void here;
