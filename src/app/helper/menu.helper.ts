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

/** CREATE NESTED MENU FOR HIDDEN ITEMS */ export function initHiddenNestedMenu(
  idParent = '',
  flatMenuAll: any
) {
  const countChild = (nodes: any) =>
    nodes.length +
    nodes
      .map(({ children = [] }) => countChild(children))
      .reduce((a: any, b: any) => a + b, 0);

  // First, get all hidden items
  const hiddenItems = flatMenuAll.filter((item: any) => item.hidden === true);
  
  // Then, get all parent IDs of hidden items to build the complete tree
  const getParentChain = (item: any): any[] => {
    const parent = flatMenuAll.find((p: any) => p.id === item.idParent);
    if (!parent) return [];
    return [parent, ...getParentChain(parent)];
  };
  
  const allRelevantIds = new Set();
  hiddenItems.forEach((item: any) => {
    allRelevantIds.add(item.id);
    getParentChain(item).forEach((parent: any) => allRelevantIds.add(parent.id));
  });
  
  const relevantItems = flatMenuAll.filter((item: any) => allRelevantIds.has(item.id));
  
  const makeTree = (id: string, xs: any, index: number = 0) =>
    xs
      .filter(({ idParent }: any) => idParent == id)
      .map(({ id, idParent, ...rest }: any) => {
        const child = makeTree(id, relevantItems, index + 1);
        
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
  
  return makeTree(idParent, relevantItems).map((node: any) => ({
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
