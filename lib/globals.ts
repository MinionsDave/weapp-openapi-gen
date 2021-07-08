import { fileName } from './gen-utils';
import { Options } from './options';

/**
 * Stores the global variables used on generation
 */
export class Globals {
  httpClientClass: string;
  httpClientFile: string;
  responseClass: string;
  responseFile: string;
  modelIndexFile?: string;
  serviceIndexFile?: string;
  rootUrl?: string;

  constructor(options: Options) {
    this.httpClientClass = options.httpClient || 'HttpClient';
    this.httpClientFile = fileName(this.httpClientClass);
    this.responseClass = options.response || 'StrictHttpResponse';
    this.responseFile = fileName(this.responseClass);
    if (options.serviceIndex !== false && options.serviceIndex !== '') {
      this.serviceIndexFile =
        options.serviceIndex === true || options.serviceIndex === undefined
          ? 'services'
          : options.serviceIndex;
    }
    if (options.modelIndex !== false && options.modelIndex !== '') {
      this.modelIndexFile =
        options.modelIndex === true || options.modelIndex === undefined
          ? 'models'
          : options.modelIndex;
    }
  }
}
