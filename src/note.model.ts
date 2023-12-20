export interface INote {
  id: string;
  title: string;
  content: string;
}

import * as fs from 'fs';

const DATA_FILE_PATH = './data/notes.json';

const readDataFile = (): INote[] => {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data) as INote[];
  } catch (error) {
    return [];
  }
};

const writeDataFile = (data: INote[]) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
};

let notes: INote[] = readDataFile();

export { notes, writeDataFile };