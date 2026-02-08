export const generateTableOfContents = () => {
  const result: string[] = ['<h2 class="mt-0">In this page</h2>'];

  // Start the first level
  result.push('<ul>');

  const filteredHeadings = document.evaluate(
    `//*[
          (self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6) 
          and 
          contains(concat(' ', normalize-space(@class), ' '), ' heading-component ')
      ]`,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );

  if (filteredHeadings.snapshotLength === 0) {
    return '';
  }
  const levelStack: number[] = []; // Track the current nesting levels

  // Helper function to get heading level from tag name
  const getHeadingLevel = (element: Element): number => {
    return Number.parseInt(element.tagName.charAt(1), 10);
  };

  for (let i = 0; i < filteredHeadings.snapshotLength; i++) {
    const heading = filteredHeadings.snapshotItem(i) as Element;
    if (!heading) continue;

    // console.log(heading);
    const headingLevel = getHeadingLevel(heading);
    const headingId = heading.id;
    const headingText = heading.textContent || '';

    if (i === 0) {
      // First heading - initialize
      levelStack.push(headingLevel);
      result.push(`<li><a href="#${headingId}">${headingText}</a>`);
    } else {
      const previousLevel = levelStack[levelStack.length - 1];

      if (headingLevel > previousLevel) {
        // Going deeper - start new nested list
        result.push('<ul>');
        levelStack.push(headingLevel);
        result.push(`<li><a href="#${headingId}">${headingText}</a>`);
      } else if (headingLevel === previousLevel) {
        // Same level - close previous item and start new one
        result.push('</li>');
        result.push(`<li><a href="#${headingId}">${headingText}</a>`);
      } else {
        // Going shallower - close nested levels
        result.push('</li>'); // Close current item

        // Close nested lists until we reach the target level or shallower
        while (levelStack.length > 0 && levelStack[levelStack.length - 1] > headingLevel) {
          result.push('</ul></li>');
          levelStack.pop();
        }

        // If we're at the exact same level as something in our stack, close that item
        if (levelStack.length > 0 && levelStack[levelStack.length - 1] === headingLevel) {
          result.push('</li>');
        } else {
          // We're at a new level that's not in our stack
          levelStack.push(headingLevel);
        }

        result.push(`<li><a href="#${headingId}">${headingText}</a>`);
      }
    }
  }

  // Close any remaining open items and lists
  result.push('</li>'); // Close the last item

  // Close all remaining nested levels
  while (levelStack.length > 1) {
    result.push('</ul></li>');
    levelStack.pop();
  }

  result.push('</ul>'); // Close the root list

  return result.join('');
};
