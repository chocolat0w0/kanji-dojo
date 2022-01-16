const join = (morph: string[] | string[][]): string[] => {
  const joined: string[] =
    typeof morph[0] === 'string'
      ? (morph as string[])
      : (morph as string[][]).reduce((prev: string[], current: string[]) => [
          prev[0] + current[0],
          prev[1] + current[1],
        ]);

  return joined;
};

const zip = <T>(...args: T[][]): T[][] => {
  const length = Math.min(...args.map((x) => x.length));
  const minLengthArgs = args.map((x) => x.slice(0, length));

  const result: T[][] = Array(length)
    .fill(null)
    .map((_) => []) as T[][];
  minLengthArgs.forEach((arr) =>
    arr.forEach((value, index) => result[index].push(value)),
  );

  return result;
};

const devide = (morph: string[]): string[][] => {
  const devided: string[][] = morph[0].includes(',')
    ? zip(...morph.map((str) => str.split(',')))
    : [morph];

  return devided;
};

const format = (sentence: (string[] | string[][])[]): string[][] =>
  sentence
    .map((morph) => {
      const joined = join(morph);
      const devided = devide(joined);

      return devided;
    })
    .flat(1);

const kanaToHira = (str: string): string =>
  str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;

    return String.fromCharCode(chr);
  });

type KanjiPart = { t: 'kanji'; v: string[] };
type KanaPart = { t: 'kana'; v: string };
type exampleType = (KanjiPart | KanaPart)[];
const getJson = (sentence: string[][]): exampleType =>
  sentence.map((x) =>
    /[\u4E00-\u9FFF]/.test(x[0]) // 漢字の正規表現
      ? { t: 'kanji', v: [x[0], kanaToHira(x[1])] }
      : { t: 'kana', v: x[0] },
  );

export { join, zip, devide, format, getJson };
