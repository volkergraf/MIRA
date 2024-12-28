var filterMap = [
  {
    type: 'replace',
    replace: { what: 'Musk', with: 'Idiot' }
  },
  {
    type: 'replace',
    replace: { what: 'Elon', with: 'Furzknödel' }
  },
  {
    type: 'replace',
    replace: { what: 'Trump', with: 'orangenes Arschloch' }
  },
  {
    type: 'replace',
    replace: { what: 'Merz', with: 'FTZNFRTZ' }
  },
  {
    type: 'replace',
    replace: { what: 'Lindner', with: 'Kleinkind' }
  },
  {
    type: 'replace',
    replace: { what: 'Weidel', with: 'Nazi-Schlampe' }
  },
  {
    type: 'replace',
    replace: { what: 'AFD', with: 'Nazi-Idioten' }
  },
  {
    type: 'replace',
    replace: { what: 'AfD', with: 'Nazi-Idioten' }
  },
  {
    type: 'replace',
    replace: { what: 'Söder', with: 'Bayern-Arsch' }
  }
];

function traverseDOM(node) {
  if (node.nodeType === 3 && filterMap) {
    /* **************************************** */
    /* We only serach && replace in Text-Nodes. */
    /* **************************************** */
    for (var j = 0; j < filterMap.length; j++) {
      /* ********************************************************** */
      /* REPLACE: Does filterMap[j] contain */
      /* ********************************************************** */
      if (
        filterMap[j].type && // a type
        filterMap[j].type == 'replace' && // and type == 'replace'
        filterMap[j].replace && // a replace-entry
        filterMap[j].replace.what && // a replace-what-entry
        filterMap[j].replace.with // a replace-with-entry .... ?
      ) {
        /* Replace <WHAT> with <WITH>. */
        if (node.textContent.includes(filterMap[j].replace.what)) {
          node.textContent = node.textContent
            .split(filterMap[j].replace.what) // .. replace <WHAT>
            .join(filterMap[j].replace.with); // .. with <WITH>
        }
      }
    }
  } else if (node.tagName && node.tagName.toUpperCase() === 'IMG') {
    /* *************************** */
    /* Try to change a few Images. */
    /* *************************** */
    // Is this a IMG-Node ?
    if (node.alt && node.alt.includes('Musk')) {
      node.src = 'https://svgsilh.com/svg_v2/1297991.svg';
      return;
    }
  } else if (node.tagName && node.tagName.toUpperCase() === 'SOURCE') {
    if (node.srcset) {
      if (node.srcset.includes('Musk') || node.srcset.includes('musk')) {
        node.srcset = 'https://svgsilh.com/svg_v2/1297991.svg';
      }
    }
  }
  // Nothing found, let's try to traverse deeper
  if (node) {
    for (let child of node.childNodes) {
      traverseDOM(child);
    }
  }
}

traverseDOM(document.body);
