// @ts-ignore
import mainContent from './content/index?script&module';

const s = document.createElement('script');
s.type = "module";
s.src = chrome.runtime.getURL(mainContent);
(document.head || document.documentElement).prepend(s);

