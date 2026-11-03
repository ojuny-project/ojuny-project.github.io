#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_ROOT = "src/content/docs";
const CONTENT_EXTENSIONS = new Set([".md", ".mdx"]);

const HARD_RULES = new Map([
  ["em-dash", "em dash"],
  ["en-dash", "en dash"],
  ["curly-quote", "curly quote"],
  ["not-just", '"not just"'],
  ["closing-summary", "closing summary"],
  ["emoji-heading", "emoji in heading"],
]);

const RULE_ALIASES = new Map([
  ["em-dash", "em-dash"],
  ["emdash", "em-dash"],
  ["en-dash", "en-dash"],
  ["endash", "en-dash"],
  ["curly-quote", "curly-quote"],
  ["curly-quotes", "curly-quote"],
  ["curly", "curly-quote"],
  ["not-just", "not-just"],
  ["closing-summary", "closing-summary"],
  ["summary", "closing-summary"],
  ["emoji-heading", "emoji-heading"],
  ["emoji", "emoji-heading"],
]);

const VOCABULARY = [
  "delve",
  "leverage",
  "robust",
  "seamless",
  "comprehensive",
  "crucial",
  "pivotal",
  "underscore",
  "showcase",
  "foster",
  "tapestry",
  "testament",
  "realm",
  "myriad",
  "intricate",
  "meticulous",
  "vibrant",
  "landscape",
  "multifaceted",
  "prioritize",
  "dependable",
  "quietly",
  "steady",
  "matters",
  "echoed",
  "clearer",
];

const VOCABULARY_RE = new RegExp(`\\b(${VOCABULARY.join("|")})\\b`, "gi");
const EMOJI_RE = /[\p{Extended_Pictographic}\uFE0F]/u;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else if (CONTENT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }
  return files;
}

function splitFrontmatter(source) {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { body: normalized, bodyLineOffset: 0 };
  const consumed = match[0];
  return {
    body: normalized.slice(consumed.length),
    bodyLineOffset: (consumed.match(/\n/g) ?? []).length,
  };
}

function normalizeRule(raw) {
  const name = raw.trim().toLowerCase().replace(/_/g, "-");
  return RULE_ALIASES.get(name) ?? null;
}

function readExceptions(body) {
  const allowed = new Set();
  const unknown = new Set();
  for (const match of body.matchAll(/<!--\s*docs-allow:\s*([^>]*?)\s*-->/gi)) {
    for (const raw of match[1].split(",")) {
      if (!raw.trim()) continue;
      const rule = normalizeRule(raw);
      if (rule) allowed.add(rule);
      else unknown.add(raw.trim());
    }
  }
  return { allowed, unknown };
}

function stripCode(body) {
  const kept = [];
  let fence = null;
  for (const line of body.split("\n")) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (
        fenceMatch &&
        fenceMatch[1][0] === fence[0] &&
        fenceMatch[1].length >= fence.length
      ) {
        fence = null;
      }
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      continue;
    }
    if (/^( {4}|\t)/.test(line)) continue;
    kept.push(line);
  }
  return kept.join("\n");
}

function toProse(block) {
  return block
    .split("\n")
    .filter((line) => !/^\s*#{1,6}\s/.test(line))
    .filter((line) => !/^\s*\|/.test(line))
    .filter((line) => !/^\s*(?:import|export)\s/.test(line))
    .filter((line) => !/^\s*:::/.test(line))
    .filter((line) => !/^\s*\[[^\]]+\]:/.test(line))
    .filter((line) => !/^\s*(?:-{3,}|\*{3,}|_{3,}|=+)\s*$/.test(line))
    .join("\n")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*|__|\*|_/g, "")
    .replace(/[ \t]+/g, " ");
}

function wordsOf(text) {
  return text.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) ?? [];
}

function sentencesOf(text) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (!flat) return [];
  return flat
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'(\\[])/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => /\p{L}/u.test(sentence));
}

function lineAt(source, index) {
  if (index < 0) return 0;
  return source.slice(0, index).split("\n").length;
}

function percent(part, whole) {
  return whole === 0 ? 0 : (part / whole) * 100;
}

function analyze(file, source) {
  const { body, bodyLineOffset } = splitFrontmatter(source);
  const { allowed, unknown } = readExceptions(body);
  const withoutCode = stripCode(body);
  const proseBlock = toProse(withoutCode);
  const headlines = withoutCode
    .split("\n")
    .filter((line) => /^\s*#{1,6}\s/.test(line));

  const words = wordsOf(proseBlock);
  const sentences = sentencesOf(proseBlock);
  const lengths = sentences.map((sentence) => wordsOf(sentence).length);
  const sentenceCount = lengths.length;
  const wordCount = words.length;
  const meanSentenceLength =
    sentenceCount === 0
      ? 0
      : Math.round((lengths.reduce((sum, length) => sum + length, 0) / sentenceCount) * 10) / 10;
  const underEight = lengths.filter((length) => length < 8).length;
  const overTwentyFive = lengths.filter((length) => length > 25).length;

  const paragraphs = proseBlock
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const lastParagraph = paragraphs.at(-1) ?? "";
  const closingSummaryStart = lastParagraph.match(
    /^(?:in summary|in conclusion|overall)\b/i,
  );

  const hardHits = [];
  const warnings = [];
  const exceptionsUsed = [];

  const recordHard = (rule, count, index) => {
    if (count === 0) return;
    if (allowed.has(rule)) {
      exceptionsUsed.push({ rule, count });
      return;
    }
    hardHits.push({
      rule,
      label: HARD_RULES.get(rule),
      count,
      line: lineAt(body, index) + bodyLineOffset,
    });
  };

  const emDashIndex = withoutCode.indexOf("\u2014");
  recordHard(
    "em-dash",
    (withoutCode.match(/\u2014/g) ?? []).length,
    emDashIndex,
  );

  const enDashIndex = withoutCode.indexOf("\u2013");
  recordHard(
    "en-dash",
    (withoutCode.match(/\u2013/g) ?? []).length,
    enDashIndex,
  );

  const curlyMatches = [...withoutCode.matchAll(/[\u2018\u2019\u201C\u201D]/g)];
  recordHard(
    "curly-quote",
    curlyMatches.length,
    curlyMatches[0]?.index ?? -1,
  );

  const notJustMatches = [...withoutCode.matchAll(/\bnot just\b/gi)];
  recordHard(
    "not-just",
    notJustMatches.length,
    notJustMatches[0]?.index ?? -1,
  );

  if (closingSummaryStart) {
    const closers = [
      ...body.matchAll(/^\s*(?:in summary|in conclusion|overall)\b/gim),
    ];
    recordHard("closing-summary", 1, closers.at(-1)?.index ?? -1);
  }

  const emojiHeadlines = headlines.filter((line) => EMOJI_RE.test(line));
  if (emojiHeadlines.length > 0) {
    const index = withoutCode.indexOf(emojiHeadlines[0]);
    recordHard("emoji-heading", emojiHeadlines.length, index);
  }

  const isnMatches = withoutCode.match(/\bisn['’]t\b/gi) ?? [];
  if (isnMatches.length > 0) {
    warnings.push(`${isnMatches.length} contraction(s) of "isn't"`);
  }

  const notOnlyMatches = withoutCode.match(/\bnot only\b/gi) ?? [];
  if (notOnlyMatches.length > 0) {
    warnings.push(`${notOnlyMatches.length} "not only" construction(s)`);
  }

  const vocabularyMatches = [...withoutCode.matchAll(VOCABULARY_RE)];
  const vocabularyHitWords = vocabularyMatches.map((match) =>
    match[1].toLowerCase(),
  );
  const distinctVocabulary = new Set(vocabularyHitWords).size;
  const vocabularyRate =
    wordCount === 0 ? 0 : (vocabularyMatches.length / wordCount) * 1000;
  const distinctRate =
    wordCount === 0 ? 0 : (distinctVocabulary / wordCount) * 1000;
  if (distinctRate >= 3 || vocabularyRate >= 5) {
    warnings.push(
      `vocabulary: ${distinctVocabulary} distinct, ${vocabularyMatches.length} total (${vocabularyHitWords.join(", ")})`,
    );
  }

  if (sentenceCount >= 3 && (meanSentenceLength < 15 || meanSentenceLength > 20)) {
    warnings.push(`mean sentence length ${meanSentenceLength} outside 15 to 20`);
  }
  const underEightPercent = percent(underEight, sentenceCount);
  if (sentenceCount >= 3 && underEightPercent > 15) {
    warnings.push(
      `${underEightPercent.toFixed(1)}% of sentences are under 8 words`,
    );
  }
  const overTwentyFivePercent = percent(overTwentyFive, sentenceCount);
  if (sentenceCount >= 3 && overTwentyFivePercent < 8) {
    warnings.push(
      `${overTwentyFivePercent.toFixed(1)}% of sentences are over 25 words`,
    );
  }

  for (const name of unknown) {
    warnings.push(`unknown docs-allow rule "${name}"`);
  }

  const youCount = (proseBlock.match(/\b(?:you|your)\b/gi) ?? []).length;

  return {
    file,
    words: wordCount,
    sentences: sentenceCount,
    meanSentenceLength,
    underEightPercent: Math.round(underEightPercent * 10) / 10,
    overTwentyFivePercent: Math.round(overTwentyFivePercent * 10) / 10,
    youPerThousand:
      wordCount === 0 ? 0 : Math.round((youCount / wordCount) * 1000 * 10) / 10,
    emDashes: (withoutCode.match(/\u2014/g) ?? []).length,
    enDashes: (withoutCode.match(/\u2013/g) ?? []).length,
    curlyQuotes: curlyMatches.length,
    notJust: notJustMatches.length,
    isnt: isnMatches.length,
    notOnly: notOnlyMatches.length,
    closingSummary: closingSummaryStart ? 1 : 0,
    vocabulary: {
      distinct: distinctVocabulary,
      total: vocabularyMatches.length,
      words: [...new Set(vocabularyHitWords)].sort(),
    },
    hardHits,
    warnings,
    exceptionsUsed,
  };
}

function parseArgs(argv) {
  const options = { json: false, roots: [] };
  for (const argument of argv) {
    if (argument === "--json") {
      options.json = true;
    } else if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      options.roots.push(argument);
    }
  }
  if (options.roots.length === 0) options.roots.push(DEFAULT_ROOT);
  return options;
}

function printHuman(report) {
  for (const result of report.files) {
    console.log(
      `${result.file}: ${result.words} words, ${result.sentences} sentences, ` +
        `mean ${result.meanSentenceLength}, ` +
        `<8w ${result.underEightPercent}%, >25w ${result.overTwentyFivePercent}%, ` +
        `you/your ${result.youPerThousand}/1k`,
    );
    if (result.vocabulary.total > 0) {
      console.log(
        `  vocabulary: ${result.vocabulary.distinct} distinct, ` +
          `${result.vocabulary.total} total (${result.vocabulary.words.join(", ")})`,
      );
    }
    for (const warning of result.warnings) {
      console.log(`  warn: ${warning}`);
    }
    for (const hit of result.hardHits) {
      console.log(`  FAIL ${hit.rule} (${hit.label}) x${hit.count} at line ${hit.line}`);
    }
  }

  console.log("");
  console.log(
    `Scanned ${report.files.length} file(s): ` +
      `${report.failures.length} hard failure(s), ` +
      `${report.warningCount} warning(s), ` +
      `${report.exceptions.length} exception(s).`,
  );

  if (report.exceptions.length > 0) {
    console.log("Exceptions honored:");
    for (const exception of report.exceptions) {
      console.log(`  ${exception.file}: ${exception.rule} x${exception.count}`);
    }
  }

  if (report.failures.length > 0) {
    console.log("Hard failures:");
    for (const failure of report.failures) {
      console.log(
        `  ${failure.file}:${failure.line} ${failure.rule} (${failure.label}) x${failure.count}`,
      );
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log("Usage: node scripts/docs-metrics.mjs [--json] [paths...]");
    return 0;
  }

  const files = [];
  for (const root of options.roots) {
    const stat = await readdir(root, { withFileTypes: true }).catch(() => null);
    if (stat === null) throw new Error(`Not a directory: ${root}`);
    files.push(...(await walk(root)));
  }

  const results = [];
  const failures = [];
  const exceptions = [];
  let warningCount = 0;

  for (const file of files) {
    const result = analyze(file, await readFile(file, "utf8"));
    results.push(result);
    warningCount += result.warnings.length;
    for (const hit of result.hardHits) {
      failures.push({ file, ...hit });
    }
    for (const exception of result.exceptionsUsed) {
      exceptions.push({ file, ...exception });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    roots: options.roots,
    fileCount: results.length,
    warningCount,
    files: results,
    failures,
    exceptions,
  };

  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHuman(report);
  }

  return failures.length > 0 ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`docs-metrics: ${error.message}`);
    process.exit(2);
  });
