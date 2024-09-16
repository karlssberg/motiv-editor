import { $getSelection, $isRangeSelection } from 'lexical';

export function getSelectionStartEnd(): [
  number | undefined,
  number | undefined
] {
  let start;
  let end;
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const points = selection.getStartEndPoints();
    if (points) {
      const [startPoint, endPoint] = points;
      start = startPoint.offset;
      end = endPoint.offset;
    }
  }
  return [start, end];
}
