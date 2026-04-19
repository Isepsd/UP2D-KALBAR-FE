/** CREATE NESTED MENU */ export function initNestedMenu(
  idParent = '',
  flatMenuAll: any,
  flatMenuFiltered: any = null
) {
  flatMenuFiltered = flatMenuFiltered ? flatMenuFiltered : flatMenuAll;
  const countChild = (nodes: any) =>
    nodes.length +
    nodes
      .map(({ children = [] }) => countChild(children))
      .reduce((a: any, b: any) => a + b, 0);
  const makeTree = (id: string, xs: any, index: number = 0) =>
    xs
      .filter(({ idParent }: any) => idParent == id)
      .filter((f: any) => f.hidden === false)
      .map(({ id, idParent, ...rest }: any) => {
        const child = makeTree(id, flatMenuAll, index + 1);
        return {
          id,
          ...rest,
          idParent: idParent,
          index: index,
          no: parseInt(rest?.no),
          path: rest?.path,
          ...(child.length
            ? { count: countChild(child), children: child }
            : { count: 0, children: [] }),
        };
      })
      .sort((a: any, b: any) => a.no - b.no);
  return makeTree(idParent, flatMenuFiltered).map((node: any) => ({
    ...node,
    root: true,
  }));
}

export function initFlatMenu(a: any) {
  return a?.reduce(function (flattened: any, { children, ...item }: any) {
    return (
      flattened
        .concat([{ ...item }])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .concat(children ? initFlatMenu(children) : [])
    );
  }, []);
}
