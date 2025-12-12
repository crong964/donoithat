import { IProductClassification } from "@/components/route/admin/product/interface";

export default function Count(params: number, value: IProductClassification[]) {
  if (params == 0 || value.length == 0) {
    return [];
  }

  let f = value.map((_) => {
    return 0;
  });
  let ls = [];
  for (let i = 0; i < params; i++) {
    if (f[value.length - 1] < value[value.length - 1].options.length - 1) {
      let temp = "";
      for (let j = 0; j < f.length; j++) {
        const element = f[j];
        temp += `${element} `;
      }
      temp = temp.trim();
      ls.push(temp);
      f[value.length - 1] += 1;
      continue;
    }

    for (let jj = f.length - 1; jj >= 0; jj--) {
      f[jj] += 1;
      if (f[jj] < value[jj].options.length - 1) {
        break;
      } else {
        f[jj] = 0;
      }
    }
    i -= 1;
  }
  return ls;
}
