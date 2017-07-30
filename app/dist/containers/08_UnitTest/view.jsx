/* @flow */
import React from 'react';

export default class Demo extends React.Component<void, any, void> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  sum = (first: number, second: number): number => first + second;

  doubleSum = (first: number, second: number): number =>
    this.sum(this.sum(first, second), this.sum(first, second));

  render() {
    return <div>Unit test sample.</div>;
  }
}
