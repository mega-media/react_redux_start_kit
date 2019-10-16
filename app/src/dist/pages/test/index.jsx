/* @flow */
import React from 'react';

export default class Demo extends React.Component<any, void> {
  sum = (first: number, second: number): number => first + second;

  doubleSum = (first: number, second: number): number =>
    this.sum(this.sum(first, second), this.sum(first, second));

  render() {
    return <div>Unit test sample.</div>;
  }
}
