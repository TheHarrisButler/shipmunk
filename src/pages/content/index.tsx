import React from "react";
import ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";
import { Content } from "./content";

export default class ShipmunkExtension extends HTMLElement {
  shadowRoot: ShadowRoot;

  createContent() {
    return React.createElement(Content, { container: this.shadowRoot }, React.createElement("slot"));
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
    ReactDOM.render(this.createContent(), this.shadowRoot);
    retargetEvents(this.shadowRoot);
  }
}

try {
  customElements.define("shipmunk-root", ShipmunkExtension);

  const shipmunkRoot = document.createElement("shipmunk-root");
  document.body.appendChild(shipmunkRoot);
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
