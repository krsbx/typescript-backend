declare module 'async-express-mw' {
  function asyncMw(
    middleware: (req: any, res: any, next: any) => any
  ): Promise<void> | void | udnefined;

  export default asyncMw;
}
