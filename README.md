# weapp-openapi-gen

该工具用于从 [OpenApi/Swagger 3](https://www.openapis.org/) [声明文件](https://github.com/OAI/OpenAPI-Specification)
生成微信小程序的类型和请求代码。

## 运行

```bash
npm install -g weapp-openapi-gen

// input也可以为地址
weapp-openapi-gen --input my-api.yaml --output my-app/miniprogram/service/api
```

该操作将解析 `my-api.yaml` 生成类型及请求代码到目录 `my-app/miniprogram/service/api`。

## 例子

```bash
weapp-openapi-gen --input https://petstore3.swagger.io/api/v3/openapi.json --output miniprogram/service/api
```

生成

```
├── http-client.ts
├── index.ts
├── models
│   ├── api-response.ts
│   ├── category.ts
│   ├── order.ts
│   ├── pet.ts
│   ├── tag.ts
│   └── user.ts
├── services
│   ├── pet.service.ts
│   ├── store.service.ts
│   └── user.service.ts
└── strict-http-response.ts
```

## 配置文件以及运行参数

优先读取项目目录下的 `weapp-openapi-gen.json`， 也可直接指定 `weapp-openapi-gen --config my-config.json`。

完整的配置列表可以参考[JSON schema file](https://github.com/MinionsDave/weapp-openapi-gen/blob/dev/weapp-openapi-gen-schema.json)，也可以通过 `weapp-openapi-gen --help` 获取。
所有的参数都可在命令中直接使用，例如: `--includeTags tag1,tag2,tag3`，或者 `--exclude-tags tag1,tag2,tag3`。

配置文件例子:

```json
{
  "$schema": "node_modules/weapp-openapi-gen/weapp-openapi-gen-schema.json",
  "input": "my-file.json",
  "output": "out/person-place",
  "ignoreUnusedModels": false
}
```

## HttpClient api

1. `addRequestInterceptor(interceptor: RequestInterceptor)`:
请求拦截器，可在请求发送前对请求参数进行统一的处理，例如添加域名和请求头。

```typescript
import { httpClient } from './service/api';

httpClient.addRequestInterceptor(options => {
  options.url = `https://your.domain.com${options.url}`;
  options.header = Object.assign({}, options.header, {
    Authorization: 'token',
  });
  return options;
});
```

2. `addResponseInterceptor(interceptor: ResponseInterceptor)`:
响应拦截器，可对请求结果进行统一的处理。

```typescript
import { httpClient } from './service/api';

httpClient.addResponseInterceptor(resp => {
  const data = resp.data.data;
  const code = data.code;
  switch (code) {
    case 200:
      resp.data = data;
      break;
    case 400:
      // 业务异常处理
      break;
    case 500:
      // 服务器异常处理
      break;
    // ...
    default:
      break;
  }
  return resp;
});
```
