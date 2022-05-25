import React, { ReactNode } from "react";

// children
// fallbackRender 渲染发生异常时要渲染的组件

type FallbackRender = (props: {error: Error | null}) => React.ReactElement
export class ErrorBoundary extends React.Component<{children: ReactNode, fallbackRender: FallbackRender}, {error: Error | null}> {
  state = {error: null};

  //当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state;
    const {fallbackRender, children} = this.props
    if (error) return fallbackRender({error});
    return children;
  }
}