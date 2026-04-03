document.getElementById("markdown-input").addEventListener("input", convertMarkdown);

function convertMarkdown() {
  const input = document.getElementById("markdown-input").value;
  const lines = input.split("\n");
  let result = "";

  lines.forEach((line) => {
    let html = "";

    // Headings (allow leading spaces but no other characters)
    if (/^\s*###\s+/.test(line)) {
      html = `<h3>${parseInline(line.replace(/^\s*###\s+/, ""))}</h3>`;
    } else if (/^\s*##\s+/.test(line)) {
      html = `<h2>${parseInline(line.replace(/^\s*##\s+/, ""))}</h2>`;
    } else if (/^\s*#\s+/.test(line)) {
      html = `<h1>${parseInline(line.replace(/^\s*#\s+/, ""))}</h1>`;
    }
    // Blockquotes (allow leading spaces)
    else if (/^\s*>\s+/.test(line)) {
      html = `<blockquote>${parseInline(line.replace(/^\s*>\s+/, ""))}</blockquote>`;
    }
    // Plain text or inline formatting (handles images and links too)
    else {
      html = parseInline(line);
    }

    result += html;
  });

  // Display HTML in output and preview
  const outputElement = document.getElementById("html-output");
  const previewElement = document.getElementById("preview");
  
  if (outputElement) outputElement.textContent = result;
  if (previewElement) previewElement.innerHTML = result;

  return result;
}

function parseInline(text) {
  return text
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>");
}