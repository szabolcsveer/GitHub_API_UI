import { type } from "os";

// name, short description, is it a fork?, last commit date, issue count, pull-request count
export type Data = {
  name: string,
  description: string,
  isItaFork: boolean,
  lastCommitDate: number,
  issueCount: number,
  pullRequestCount: number
}

export type Query = {
  allData: Data[];
}