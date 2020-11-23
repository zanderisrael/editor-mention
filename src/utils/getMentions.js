import getRegExp from './getRegExp';

export default function getMentions(contentState, prefix = '@', suggestions) {
  const regex = getRegExp(prefix, suggestions, true);
  const entities = [];
  contentState.getBlockMap().forEach((block) => {
    const blockText = block.getText();
    let matchArr;
    while ((matchArr = regex.exec(blockText)) !== null) { // eslint-disable-line
      entities.push(matchArr[0].trim());
    }
  });
  return entities;
}
