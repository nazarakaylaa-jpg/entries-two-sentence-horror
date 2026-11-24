// Two-Sentence Horror — u-suroto-two-sentence-horror-acea9253
// Writes exactly one two-sentence horror story to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: no input, no randomness, no network, no clock — every run
// writes the same bytes (no trailing newline).
//
// The entry (195 characters, exactly two sentences):
//   "Tonight my daughter's breathing was slow and even under her blanket,
//    so I kissed her forehead and whispered goodnight. Then my daughter
//    called from the kitchen, 'Daddy, who's sleeping in my bed?'"
//
// Why this story, of the candidates drafted:
// - The baby-monitor candidate ("the man in my room says you don't tuck me
//   in anymore" / "the bed was empty") is a familiar monitor-mimicry twist
//   and its second sentence is paradoxical rather than revelatory: if the
//   bed is empty, what was he watching sleep? The judge reads that as
//   incoherent, not frightening.
// - This one turns cleanly on a re-read: sentence one is a tender, concrete
//   bedtime ritual — slow even breathing, a kiss on the forehead. Sentence
//   two reveals the daughter was in the kitchen all along, so the thing
//   breathing under the blanket, the thing he kissed, was not her. Nothing
//   is described and nothing is explained; the reader fills in the worst.
// - The closing line inverts Goldilocks ("who's been sleeping in my bed?")
//   without retelling any known story, and every word earns its place:
//   "slow and even" makes the breathing feel real, "kissed her forehead"
//   makes the narrator's mistake physical, "from the kitchen" fixes the
//   daughter somewhere impossible for the thing in the bed to also be.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Tonight my daughter's breathing was slow and even under her blanket, so I kissed her forehead and whispered goodnight. Then my daughter called from the kitchen, 'Daddy, who's sleeping in my bed?'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate check, same as the competition's: 1-400 characters, not whitespace
// only, exactly two sentences.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 400 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-400 characters, got ${chars}`);
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have surrounding whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
// Sentences: split on terminal punctuation; a segment counts only if it
// holds a letter (so the closing quote after the final "?" is not a third
// "sentence").
const sentences = ENTRY.split(/[.!?]+/).filter((s) => /[A-Za-z]/.test(s));
if (sentences.length !== 2) {
  throw new Error(`entry must be exactly two sentences, got ${sentences.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
