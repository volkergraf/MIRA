var filterMap = [
  {
    type: "replace",
    replace: { what: "Musk", with: "Vollidiot" },
  },
  {
    type: "replace",
    replace: { what: "Elon", with: "Furzknödel" },
  },
  {
    type: "replace",
    replace: { what: "Tesla", with: "Scheisskarre" },
  },
  {
    type: "replace",
    replace: { what: "Trump", with: "Arschloch" },
  },
  {
    type: "replace",
    replace: { what: "Merz", with: "FTZNFRTZ" },
  },
  {
    type: "replace",
    replace: { what: "Lindner", with: "Kleinkind" },
  },
  {
    type: "replace",
    replace: { what: "Weidel", with: "Nazi-Schlampe" },
  },
  {
    type: "replace",
    replace: { what: "AFD", with: "Nazi-Idioten" },
  },
  {
    type: "replace",
    replace: { what: "AfD", with: "Nazi-Idioten" },
  },
  {
    type: "replace",
    replace: { what: "Söder", with: "Bayern-Arsch" },
  },
  /* {
    type: "remove",
    remove: {
      what: "Musk",
      host: "taz.de",
      node: "grandgrandgrandgrandgrandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Trump",
      host: "taz.de",
      node: "grandgrandgrandgrandgrandparent",
    },
  },
  {
    type: "remove",
    remove: { what: "Putin", host: "taz.de", node: "grandgrandparent" },
  },
  {
    type: "remove",
    remove: { what: "Aiwanger", host: "taz.de", node: "grandgrandparent" },
  },
  {
    type: "remove",
    remove: {
      what: "Trump",
      host: "tagesschau.de",
      node: "grandgrandgrandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Musk",
      host: "tagesschau.de",
      node: "grandgrandgrandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Musk",
      host: "blog.fefe.de",
      node: "grandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Trump",
      host: "blog.fefe.de",
      node: "grandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Trump",
      host: "blog.fefe.de",
      node: "grandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Trump",
      host: "golem.de",
      node: "grandgrandparent",
    },
  },
  {
    type: "remove",
    remove: {
      what: "Musk",
      host: "golem.de",
      node: "grandgrandparent",
    },
  },
  {
    type: "replace",
    replace: { what: "Elon", with: "Furzknödel" },
  },
  {
    type: "replace",
    replace: { what: "Musk", with: "Arschloch" },
  },
  {
    type: "replace",
    replace: { what: "Trump", with: "Riesenarschloch" },
  },
  {
    type: "replace",
    replace: { what: "Donald", with: "Doofkopf" },
  }, */
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
        filterMap[j].type == "replace" && // and type == 'replace'
        filterMap[j].replace && // a replace-entry
        filterMap[j].replace.what && // a replace-what-entry
        filterMap[j].replace.with // a replace-with-entry .... ?
      ) {
        /* Replace <WHAT> with <WITH>. */
        if (node.textContent.includes(filterMap[j].replace.what)) {
          node.textContent = node.textContent
            .split(filterMap[j].replace.what) // .. replace <WHAT>
            .join(filterMap[j].replace.with); // .. with <WITH>
          return;
        }
      } else if (
        filterMap[j].type && // a type
        filterMap[j].type == "remove" && // and type == 'remove'
        filterMap[j].remove.what && // and what exists
        node.textContent.includes(filterMap[j].remove.what) // and filterMap[j].remove.what exists
      ) {
        if (
          !filterMap[j].remove.host || // ALL hosts: filterMap[j].host no set
          filterMap[j].remove.host == "all" || // for ALL filterMap[j].host=="all"
          window.location.host.includes(filterMap[j].remove.host) // filterMap[j].host does fit actual host
        ) {
          if (!filterMap[j].remove.node) {
            // filterMap[j].node has not been set: remove the actual node
            node.remove();
          } else if (filterMap[j].remove.node == "parent") {
            // filterMap[j].node been set to "parent": remove the parent node
            if (node.parentNode) node.parentNode.remove();
          } else if (filterMap[j].remove.node.startsWith("grand")) {
            var occurances = filterMap[j].remove.node.split("grand").length - 1;
            var pnode = node;
            for (
              var i = 0;
              pnode != null && pnode.parentNode != null && i < occurances;
              i++
            ) {
              pnode = pnode.parentNode;
            }
            pnode.remove();
          }
          return;
        }
      }
    }
  } else if (node.tagName && node.tagName.toUpperCase() === "IMG") {
    /* *************************** */
    /* Try to change a few Images. */
    /* *************************** */
    if (node.alt && node.alt.includes("Musk")) {
      node.src = "https://svgsilh.com/svg_v2/1297991.svg";
      return;
    }
  } else if (node.tagName && node.tagName.toUpperCase() === "SOURCE") {
    if (node.srcset) {
      if (node.srcset.includes("Musk") || node.srcset.includes("musk")) {
        node.srcset = "https://svgsilh.com/svg_v2/1297991.svg";
        return;
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
