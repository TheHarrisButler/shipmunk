import React from "react";
import ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";
import { Content } from "./content";

export default class ShipmunkExtension extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  mountPoint: HTMLSpanElement;
  title: string;

  createContent(title: string) {
    return React.createElement(Content, { title }, React.createElement("slot"));
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.mountPoint);

    const title = this.getAttribute("title");
    ReactDOM.render(this.createContent(title as string), this.mountPoint);
    retargetEvents(shadowRoot);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "title") {
      ReactDOM.render(this.createContent(newValue), this.mountPoint);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("shipmunk-root", ShipmunkExtension);

  const shipmunkRoot = document.createElement("shipmunk-root");
  document.body.appendChild(shipmunkRoot);
});

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
