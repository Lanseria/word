<script setup>
import { ref } from "vue";
import axios from "axios";
import * as docx from "docx-preview";
const baseURL = "http://127.0.0.1:3000/getDoc";
const fileRef = ref();
const preview = () => {
  axios({
    method: "get",
    responseType: "blob",
    url: baseURL,
  }).then(({ data }) => {
    console.log(data);
    docx.renderAsync(data, fileRef.value);
  });
};

// 下载
const downLoad = () => {
  axios({
    method: "get",
    responseType: "blob",
    url: baseURL,
  }).then(({ data }) => {
    console.log(data);
    const blob = new Blob([data]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "测试.docx";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
};
</script>

<template>
  <div>
    <button @click="preview">预览word文件</button>
    <button @click="downLoad">下载word文件</button>
    <div class="doc-box" ref="fileRef"></div>
  </div>
</template>

<style>
.doc-box {
  width: 1000px;
  overflow: auto;
}
</style>
