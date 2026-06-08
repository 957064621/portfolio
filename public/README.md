# Public Assets

把微信二维码图片放在这个文件夹里，建议命名为 `wechat-qr.png`。

然后打开 `src/data/siteContent.ts`，把 `home.thanks.wechatQrSrc` 改成：

```ts
wechatQrSrc: "/wechat-qr.png",
```
