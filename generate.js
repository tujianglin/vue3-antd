const { generateApi } = require('swagger-typescript-api');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const apiList = ['system', 'cps', 'authentication', 'notify', 'mdc', 'dnc', 'tpm', 'trace', 'visual', 'sync', 'tool', 'perf', 'dmp-log', 'fms', 'coproduction', 'andon', 'lms'];

apiList.map((api) => {
  fetchText(api, `${process.env.VITE_PROXY}/v2/api-docs?group=${api}`);
});

// 生成接口
async function fetchText(api, url) {
  const res = await axios.get(url);
  fs.writeFile(`./interface/${api}.json`, JSON.stringify(res.data), (err) => {
    if (err) return;
    generateApi({
      name: `${api}_api.ts`,
      input: `./interface/${api}.json`,
      output: path.resolve(process.cwd(), `./src/api/modules`),
      generateClient: true,
      generateRouteTypes: false,
      silent: true,
      templates: './api-templates',
    });
  });
}

function toCamelCase(str) {
  const words = str.split('-');
  const camelCaseWords = words.map((word) => word.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()));
  const word = camelCaseWords.join('');
  return word === 'Authentication' ? 'Auth' : word;
}

// 自动写入 api index
function writeApiIndex() {
  const filePath = path.resolve(process.cwd(), `./src/api/index.ts`);
  fs.writeFileSync(filePath, '');
  // 设定要循环写入的次数
  apiList.map((api) => {
    const text = `import { Api as ${toCamelCase(api)} } from './modules/${api}_api'; \n`;
    // 追加写入文件
    fs.appendFileSync(filePath, text);
  });
  let text = 'export default {\n';
  text += `  ...new Cps().bladeCps,
  ...new Mdc().bladeMdc,
  ...new Mdc().bladeCps,
  ...new Auth().bladeAuth,
  ...new Notify().bladeNotify,
  ...new System().bladeUser,
  ...new System().bladeSystem,
  ...new System().bladeResource,
  ...new Tpm().bladeTpm,
  ...new Dnc().bladeDnc,
  ...new Visual().bladeVisual,
  ...new Sync().bladeSync,
  ...new Tool().bladeTool,
  ...new Fms().bladeFms,
  ...new Coproduction().bladeCoproduction,
  ...new DmpLog().bladeDmpLog,
  ...new Andon().bladeAndon,
  ...new Trace().bladeTrace,
  ...new Perf().bladePerf,
  ...new Lms().bladeLms,
`;

  text += `};`;
  fs.appendFileSync(filePath, text);
}

writeApiIndex();