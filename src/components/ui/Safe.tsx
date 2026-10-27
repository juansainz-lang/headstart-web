"use client";

import { Component, type ReactNode } from "react";

// Error boundary: if one section or demo fails, only that piece disappears —
// the rest of the page keeps working.
export default class Safe extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
