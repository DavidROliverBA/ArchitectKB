#!/usr/bin/env node
/**
 * Migrate Classified Atomic Notes to Bitwarden CSV
 *
 * Converts Obsidian Atomic Notes with classification: secret/confidential to
 * Bitwarden-compatible CSV format for import as Secure Notes.
 *
 * Usage:
 *   node scripts/migrate-to-bitwarden.js
 *   node scripts/migrate-to-bitwarden.js --dry-run
 *   node scripts/migrate-to-bitwarden.js --output /path/to/output.csv
 *
 * After running:
 *   1. Review the generated CSV file
 *   2. Import to Bitwarden: bw import bitwardencsv /path/to/bitwarden-import.csv
 *   3. Verify items appear in Bitwarden
 *   4. DELETE the CSV file (contains plaintext credentials!)
 *   5. Delete the original Atomic Notes from the vault
 *   6. Run BFG to clean git history
 *
 * Bitwarden CSV format:
 *   folder,favorite,type,name,notes,fields,reprompt,login_uri,login_username,login_password,login_totp
 *
 * For Secure Notes, only folder, type, name, and notes are used.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Configuration
const VAULT_ROOT = path.join(__dirname, "..");
const DEFAULT_OUTPUT = path.join(VAULT_ROOT, "bitwarden-import.csv");
const BITWARDEN_FOLDER = "Obsidian Vault";

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const outputIndex = args.indexOf("--output");
const outputPath = outputIndex !== -1 ? args[outputIndex + 1] : DEFAULT_OUTPUT;

/**
 * Find all Atomic Notes with sensitive classification
 */
function findClassifiedNotes() {
  const classifiedNotes = [];
  const files = fs.readdirSync(VAULT_ROOT);

  for (const file of files) {
    if (!file.startsWith("Atomic Note -") || !file.endsWith(".md")) {
      continue;
    }

    const filePath = path.join(VAULT_ROOT, file);
    const content = fs.readFileSync(filePath, "utf-8");

    try {
      const parsed = matter(content);
      const classification = parsed.data.classification;

      // Only include notes with sensitive classification
      if (classification === "secret" || classification === "confidential") {
        classifiedNotes.push({
          file: file,
          path: filePath,
          title:
            parsed.data.title ||
            file.replace("Atomic Note - ", "").replace(".md", ""),
          classification: classification,
          tags: parsed.data.tags || [],
          content: parsed.content.trim(),
        });
      }
    } catch (err) {
      console.error(`Error parsing ${file}: ${err.message}`);
    }
  }

  return classifiedNotes;
}

/**
 * Escape CSV field (handle quotes and commas)
 */
function escapeCSV(field) {
  if (!field) return "";
  const str = String(field);
  // If contains comma, newline, or quote, wrap in quotes and escape internal quotes
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * Convert notes to Bitwarden CSV format
 * Format: folder,favorite,type,name,notes,fields,reprompt,login_uri,login_username,login_password,login_totp
 */
function convertToBitwardenCSV(classifiedNotes) {
  const header =
    "folder,favorite,type,name,notes,fields,reprompt,login_uri,login_username,login_password,login_totp";
  const rows = [header];

  for (const note of classifiedNotes) {
    // Build notes content with metadata
    const notesContent = [
      note.content,
      "",
      "---",
      `Source: ${note.file}`,
      `Classification: ${note.classification}`,
      `Tags: ${note.tags.join(", ") || "none"}`,
      `Migrated: ${new Date().toISOString()}`,
    ].join("\n");

    // Bitwarden secure note row
    // folder,favorite,type,name,notes,fields,reprompt,login_uri,login_username,login_password,login_totp
    const row = [
      escapeCSV(BITWARDEN_FOLDER), // folder
      "", // favorite (empty = not favorite)
      "note", // type (secure note)
      escapeCSV(note.title), // name
      escapeCSV(notesContent), // notes
      "", // fields
      "", // reprompt
      "", // login_uri
      "", // login_username
      "", // login_password
      "", // login_totp
    ].join(",");

    rows.push(row);
  }

  return rows.join("\n");
}

/**
 * Main execution
 */
function main() {
  console.log("🔐 Migrate Classified Atomic Notes to Bitwarden\n");

  // Find classified notes
  const classifiedNotes = findClassifiedNotes();

  if (classifiedNotes.length === 0) {
    console.log(
      "No classified notes found (classification: secret or confidential)",
    );
    return;
  }

  console.log(`Found ${classifiedNotes.length} classified note(s):\n`);
  for (const note of classifiedNotes) {
    console.log(`  📝 ${note.title}`);
    console.log(`     File: ${note.file}`);
    console.log(`     Classification: ${note.classification}`);
    console.log("");
  }

  if (dryRun) {
    console.log("🔍 Dry run - no files written");
    console.log("\nTo generate the CSV, run without --dry-run");
    return;
  }

  // Generate CSV
  const csv = convertToBitwardenCSV(classifiedNotes);

  // Write output
  fs.writeFileSync(outputPath, csv, "utf-8");
  console.log(`✅ Bitwarden CSV written to: ${outputPath}`);

  console.log("\n📋 Next steps:");
  console.log("   1. Review the CSV file to ensure content is correct");
  console.log("   2. Install Bitwarden CLI: brew install bitwarden-cli");
  console.log("   3. Login: bw login");
  console.log("   4. Import: bw import bitwardencsv " + outputPath);
  console.log("   5. Verify items in Bitwarden (web or app)");
  console.log("   6. DELETE the CSV file (contains plaintext data!)");
  console.log("   7. Delete original Atomic Notes from vault");
  console.log("   8. Run BFG to clean git history");

  console.log(
    "\n⚠️  WARNING: The CSV file contains sensitive data in plaintext!",
  );
  console.log("   Delete it immediately after importing to Bitwarden.");
}

main();
