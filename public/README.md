# Public Assets

如果微信二维码使用本地图片，可以把图片放在这个文件夹里，建议命名为 `wechat-qr.png`。

然后打开 `src/data/siteContent.ts`，把 `home.thanks.wechatQrSrc` 改成：

```ts
wechatQrSrc: "/wechat-qr.png",
```

如果二维码已经上传到 OSS，也可以直接填完整图片链接。
