// Global type declarations for ion-icon Web Component

import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string;
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}
