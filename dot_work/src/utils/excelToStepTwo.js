import * as XLSX from "xlsx";

const norm = (s) => String(s ?? "").trim();
const lc = (s) => norm(s).toLowerCase();
const headerKey = (h) => lc(h).replace(/\s+/g, " "); // "Option   1" => "option 1"

// Matches: "Option 1..10", "Opt 2", "Choice 3", "A..F", "1..10"
const isOptionHeader = (k) => {
  // accept letter A-F or number 1-10 with optional "option/opt/choice" prefix
  return /^(?:option|opt|choice)?\s*(?:[a-f]|[1-9]|10)$/i.test(k);
};

const splitOptions = (val) => {
  console.log("splitOptions", val)
  const s = String(val ?? "");
  const DELIMS = ["\r\n", "\n", "||", ";;", "|", ";", ",", "/", "\\"];
  for (const d of DELIMS) if (s.includes(d)) {
    return s.split(d).map((p) => norm(p)).filter(Boolean);
  }
  return [norm(s)].filter(Boolean);
};

const normalizeRow = (raw) => {
  const out = {};
  Object.keys(raw || {}).forEach((k) => (out[headerKey(k)] = raw[k]));
  return out;
};

const getFirst = (row, keys) => {
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(row, k)) {
      const v = row[k];
      if (v !== undefined && v !== null && norm(v) !== "") return v;
    }
  }
  return undefined;
};

const toIntOr = (v, fallback = 1) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.trunc(n) : fallback;
};

function extractQuestion(row) {
  // Text/statement
  const text = getFirst(row, ["statement", "question", "question text", "text", "prompt", "description"]) || "";

  // Marks
  const marksCell = getFirst(row, ["marks", "mark", "points", "score"]);
  const marks = toIntOr(marksCell, 1);

  // Declared type (optional)
  const declaredRaw = getFirst(row, ["type", "question type", "qtype"]) || "";
  const declared = lc(declaredRaw);
  const declaredMap = {
    "true_false": "TRUE_FALSE",
    "true false": "TRUE_FALSE",
    "true/false": "TRUE_FALSE",
    "t/f": "TRUE_FALSE",        
    "tf": "TRUE_FALSE",
    "mcq": "MCQ",
    "multiple-choice": "MCQ",
    "multiple choice": "MCQ",
    "descriptive": "DESCRIPTIVE",
    "text": "DESCRIPTIVE",
  };

  // Options (either columns Option 1.. or a single "Options" cell)
  // 1) collect any "option-like" columns:
  const explicitOptions = [];
  Object.keys(row).forEach((k) => {
    if (isOptionHeader(k)) {
      const v = row[k];
      if (v !== undefined && v !== null && norm(v) !== "") {
        explicitOptions.push(norm(v));
      }
    }
  });
  // 2) or from one "Options"/"Choices" cell:
  let options = [...explicitOptions];
  if (options.length === 0) {
    const single = getFirst(row, ["options", "choices", "answer options"]);
    if (single !== undefined) options = splitOptions(single);
  }

  // Infer type if not declared
  let inferred = "DESCRIPTIVE";
  const tfSet = new Set(options.map((o) => lc(o)));
  const looksTF = options.length === 2 && tfSet.has("true") && tfSet.has("false");
  if (looksTF) inferred = "TRUE_FALSE";
  else if (options.length >= 2) inferred = "MCQ";

  const type = declaredMap[declared] || inferred;

  return {
    text: norm(text),
    options: options.length ? options : null,
    marks,
    type,
  };
}

export async function parseExcelToQuestions(arrayBuffer, opts = { debug: false }) {
  const wb = XLSX.read(arrayBuffer); // xls/xlsx
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const normalizedRows = rawRows.map(normalizeRow);
  const extracted = normalizedRows.map(extractQuestion);

  const mcqs = [];
  const trueFalse = [];
  const descriptive = [];

  extracted.forEach((e) => {
    const id = new Date().toISOString() + Math.random().toString(36).slice(2);
    if (e.type === "TRUE_FALSE") {
      trueFalse.push({ id, question: e.text, marks: e.marks });
    } else if (e.type === "MCQ") {
      mcqs.push({ id, question: e.text, options: e.options || [], marks: e.marks });
    } else {
      descriptive.push({ id, question: e.text, marks: e.marks });
    }
  });

  const result = { mcqs, trueFalse, descriptive };

  if (opts.debug) {
    console.groupCollapsed("%c[Excel DEBUG] Parsed sheet", "color:#1f6feb");
    console.log("Raw rows from xlsx:", rawRows);
    console.log("Normalized rows (lower-cased headers):", normalizedRows);
    console.log("Extracted (text/options/marks/type):", extracted);
    console.log("Buckets:", result);
    console.groupEnd();
    return { ...result, _debug: { rawRows, normalizedRows, extracted } };
  }
  return result;
}
