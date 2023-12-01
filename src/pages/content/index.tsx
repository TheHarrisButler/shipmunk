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
    Object.assign(this.mountPoint.style, {
      position: 'fixed',
      backgroundColor: 'white',
      maxWidth: 'calc(100vw - 45px)',
      maxHeight: 'calc(100vh - 50px)',
      overflowY: 'scroll',
      bottom: "50px",
      right: "45px",
      zIndex: 999
    });
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

try {
  customElements.define("shipmunk-root", ShipmunkExtension);

  const shipmunkRoot = document.createElement("shipmunk-root");
  document.body.appendChild(shipmunkRoot);
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
