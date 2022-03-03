<script setup lang="ts">
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { RouterLink, RouterView } from "vue-router";
import MonacoEditor from "@/components/MonacoEditor.vue";
import { ref } from "vue";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

let code = ref(`request = {
    method: HttpMethod.get,
    url: "https://alidev-neo.thellsapi.com/api/v1/chronus/auth/url",
    query: {
        "redirectUrl": "https://www.baidu.com",
    },
}`);

let codeDefine = ref(`const HttpMethod = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  options: "OPTIONS",
  delete: "DELETE",
  head: "HEAD"
}

class RequestOptions {
  constructor() {
    this.method = ""
    this.url = ""
    this.query = {}
    this.header = {}
    this.body = {}
  }
}
let x  = {age: 123};
let request = new RequestOptions();`);
let uri = monaco.Uri.file("file://define.js");
let model = monaco.editor.createModel(codeDefine.value, "javascript", uri);
monaco.editor.setModelLanguage(model, "javascript");

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const apiClient: AxiosInstance = axios.create({});
function runCode() {
  monaco.editor.getModel(uri)!.setValue("");
  return;
  let r = eval(codeDefine.value + code.value);
  apiClient
    .request({
      url: r.url + "?" + serialize(r.query),
      params: r.body,
      headers: r.headers,
    })
    .then((response: any) => {
      console.log(response);
    })
    .catch((e: Error) => {
      console.log(e);
    });
}

let serialize = function (obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
</script>

<template>
  <button @click="runCode">Run</button>
  <MonacoEditor v-model="code" />
</template>

<style>
#app {
  width: 100%;
  height: 100vh;
}
body {
  margin: 0px;
}
</style>
