import emojiList from './emojiList.json';
import { Skylab } from './skylab';

export default function filterEmoji(searchText, maxResults) {
  return emojiList
    .filter((emoji) => {
      if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (Skylab.getInstance().getVariant('emoji-keyword-search') === 'true') {
        if (emoji.keywords.includes(searchText)) {
          return true;
        }
      }
      return false;
    })
    .slice(0, maxResults);
}
