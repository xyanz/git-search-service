export class AdvancedSearchModel {
  // ? - variables are optional, can be ommited by constructor
  constructor(
    public q: string,
    public language?: string,
    public user?: string,
    public size?: number,
    public stars?: number,
    public topic?: string
) {  }
}
