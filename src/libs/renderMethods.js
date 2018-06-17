import React from 'react';

// Constants ====================================================================
const linkRegexp = /\[[^\s]+\]\([^\s]+\)/ig;
const pureLink = /\([^\s]+\)/;
const pureText = /\[[^\s]+\]/;
const codeRegexp = /\`(.*?)\`/ig;
const boldRegexp = /\*(.*?)\*/ig;

// Main Render functions ========================================================
export const renderParagraph = (line, key) => {
  const textWithInline = findInline(line) || line;
  return <p key={key}>{textWithInline}</p>;
};

export const renderElement = (element, line, regexp, key) => {
  const newLine = line.replace(regexp, '');
  const textWithInline = findInline(line) || newLine;
  return React.createElement(element, { key }, textWithInline || newLine);
};

// Additional functions to find inline elements <Links> and <Code> ==============
const findInline = line => {
  const parsedLinks = line.match(linkRegexp) || [];
  const parsedCode = line.match(codeRegexp) || [];
  let newLine;
  if (parsedLinks.length) {
    newLine = findLink(line, parsedLinks);
  } else if (parsedCode.length) {
    newLine = findCode(line, parsedCode);
  }
  if (parsedCode.length && parsedLinks.length) {
    newLine = findCode(newLine, parsedCode);
  }
  return newLine;
};

const findLink = (line, parsedLine) => {
  let newLine = line;
  for (let elem of parsedLine) {
    newLine = newLine.replace(elem, '{%Here%}');
  }
  newLine = newLine.split('{%Here%}');
  parsedLine.map((el, id) => {
    const text = removeFirstAndLast(el, pureText);
    const link = removeFirstAndLast(el, pureLink);
    newLine.splice((id * 2 + 1), 0, <a href={link} key={id}>{text}</a>);
  });
  return newLine;
}

const findCode = (line, parsedLine) => {
  let newLine;
  if (line instanceof Array) {
    newLine = line.map(linePart => {
      if (linePart instanceof Object) {
        return linePart;
      } else {
        return replaceCodeWithLinks(linePart, parsedLine);
      }
    });
    return newLine;
  } else {
    newLine = line;
    return replacePureCode(newLine, parsedLine);
  }
}

const replaceCodeWithLinks = (linePart, parsedLine) => {
  console.log(linePart);
  let newLinePart = linePart;
  let newParsedLine = linePart.match(codeRegexp) || [];
  for (let elem of parsedLine) {
    newLinePart = newLinePart.replace(elem, '{%Here%}');
  }
  newLinePart = newLinePart.split('{%Here%}');
  newParsedLine.map((el, id) => {
    const text = removeFirstAndLast(el, codeRegexp);
    newLinePart.splice((id * 2 + 1), 0, <code key={id}>{text}</code>);
  });
  return newLinePart;
}

const replacePureCode = (newLine, parsedLine) => {
  console.log(newLine);
  for (let elem of parsedLine) {
    newLine = newLine.replace(elem, '{%Here%}');
  }
  newLine = newLine.split('{%Here%}');
  parsedLine.map((el, id) => {
    const text = removeFirstAndLast(el, codeRegexp);
    newLine.splice((id * 2 + 1), 0, <code key={id}>{text}</code>);
  });
  return newLine;
}

const removeFirstAndLast = (line, type) => {
  const newLine = line.match(type)[0].split('');
  return newLine.slice(1, newLine.length - 1).join('');
}