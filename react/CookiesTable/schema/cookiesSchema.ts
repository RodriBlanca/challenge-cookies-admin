export interface TableSchema {
  properties: {
    cookieFortune: {
      title: string;
    }
  }
}

export const cookiesSchema: TableSchema = {
  properties: {
    cookieFortune: {
      title: 'Cookie phrase',
    },
  },
}
