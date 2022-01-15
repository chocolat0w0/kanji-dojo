const format = (sentence: (string[] | string[][])[]): string[][] => {
  sentence.map((morph) => {
    const joined: string[] =
      typeof morph[0] === 'string'
        ? (morph as string[])
        : (morph as string[][]).reduce((prev: string[], current: string[]) => [
            prev[0] + current[0],
            prev[1] + current[1],
          ]);
    console.log(joined);
  });

  return [['test']];
};

export default format;
