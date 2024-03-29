import { defineClientConfig } from "@vuepress/client";
import { onMounted } from "vue";

// Client should hide the input marker by CSS.

export default defineClientConfig({
  setup() {
    onMounted(() => {
      const ele = document.createElement("style");
      ele.innerHTML = `/* Autolinker links */
pre[class*=language-] code a {
  color: inherit;
  text-decoration: underline dotted grey 1px;
}
pre[class*=language-] code a:hover {
  text-decoration: underline grey 1px;
}
`;
      document.head.appendChild(ele);
    });
  },
});
