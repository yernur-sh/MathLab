# MathLab scientific project template contract

## Reference

- Retained source: `/Users/ernrsahar/Desktop/SynypKz.docx`
- SHA-256: `021e8a2a674f43715ccbdf097229d824ebce9aef4c26ea2215046638ae07d38c`
- Render evidence: `/Users/ernrsahar/Desktop/MathLab/.docx_work/template-reference-render`
- Style evidence: `/Users/ernrsahar/Desktop/MathLab/.docx_work/evidence/template-style-evidence.json`
- Source length: 14 rendered pages, one section, 125 body paragraphs, 11 tables.

## Page system

- One portrait A4 section, 8.27 by 11.69 inches.
- Margins: left 1.25 in, right 1.00 in, top 1.00 in, bottom 1.00 in.
- Header and footer are unlinked and use thin green horizontal rules. The footer has left-aligned city and year text and a right-aligned automatic page number.
- The first page uses the same header and footer geometry as later pages.
- Page breaks are content-driven; the cover occupies page 1 and the report starts on page 2.

## Typography and color

- Base family: Times New Roman. Body 12 pt, black `#111111`, 1.35 line spacing, justified, first-line indent approximately 0.25 in, 6 pt paragraph-after.
- Title style: Times New Roman 23 pt bold, centered, dark blue `#1F4368`, 8 pt after.
- Heading 1: Times New Roman 17 pt bold, dark blue `#1F4368`, 14 pt before and 10 pt after.
- Heading 2: Times New Roman 14.5 pt bold, green `#2D7650`, 11 pt before and 6 pt after.
- List paragraph: Times New Roman 12 pt, 1.2 line spacing, 3 pt after, hanging indent for bullets or numbers.
- Cover institution line: centered gray `#555555`, 13-14 pt.
- Cover label: 20 pt bold dark blue; subtitle: 15 pt bold italic dark blue.
- All headings remain black or source dark blue/green according to the retained template, with no extra decorative underline.

## Tables and lists

- Cover metadata table: two columns, 8 rows in source; left column pale green, bold labels; right column white. Thin light-gray borders.
- Report tables: full text width, deliberate equal or purpose-weighted columns. Header row uses dark green `#2D7650` or dark blue `#234A70`, bold white centered text. Body rows alternate white and pale gray-blue. All borders light gray.
- Table text is generally 10.5-11 pt with vertically centered cells and modest padding; rows expand naturally.
- Bulleted and numbered lists use hanging indentation and no dense table substitute.

## Components and content flow

1. Cover page: institution/event lines, scientific-project label, project title and subtitle, metadata table.
2. Introduction: relevance, research problem and hypothesis, goal and tasks, object/subject/methods, novelty and practical significance.
3. Theoretical section: digital learning environment, interactive learning principles, personalization and feedback, information security.
4. Practical section: technology stack, architecture, page map, theory/formula/shape modules, practice and testing, authentication and progress storage.
5. Results and analysis: functional counts, build verification, pedagogical evaluation criteria, limitations.
6. Conclusion, recommendations, references and project materials.

## Slot map

- `word/document.xml` body content is editable for the new MathLab report. Existing paragraph and table formatting patterns are the layout authority, but source-specific SynypKz text and tables are replaced.
- Cover student and teacher fields must be deliberately blank, represented by visible underline space; do not invent names, school, class, phone, or email.
- Cover title becomes `MATHLAB МАТЕМАТИКА ЗЕРТХАНАСЫ`; subtitle describes the interactive Kazakh-language school-mathematics platform.
- Footer city is left blank except for an underline and the year 2026; automatic page number is preserved.
- `word/header1.xml`, `word/footer1.xml`, styles, numbering, theme, font table, settings, footnotes, endnotes, relationships and content types are preserve-only unless a footer text replacement is required.
- No images, comments, content controls, or external relationships exist in the source.

## Package preservation

- Source package has 16 parts: content types, package relationship file, app/core properties, document, document relationships, one header, one footer, settings, styles, numbering, endnotes, footnotes, theme, web settings and font table.
- Preserve header geometry, footer page-number field, styles, numbering, theme, footnotes/endnotes, settings, and relationships. `word/document.xml` is intentionally rewritten from the copied source through the python-docx object model; footer text is intentionally updated while its rule and PAGE field are retained.

## Fidelity gates

- Reference remains byte-for-byte unchanged at the recorded path and hash.
- Final remains one A4 portrait section with the same margins, header/footer line treatment, Times New Roman typography, blue/green hierarchy, table system, footer page number, and cover composition.
- All pages are rendered and inspected at 100 percent. No clipping, overlap, broken rows, stranded headings, or unexpected blank pages.
- Student and teacher information stays blank and easy to fill by hand or in Word.
- Final project claims must match the actual MathLab repository. The verified production command is `npm run build -- --webpack`, which completed successfully and generated 10 routes including the not-found page; 9 user-facing application routes are documented.
