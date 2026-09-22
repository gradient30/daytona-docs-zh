# 卷 {#volumes}

卷是跨沙箱共享的持久存储，后端是 S3 兼容对象存储，挂载为可读写目录。多个沙箱可同时挂同一卷；卷的寿命独立于沙箱。

## 创建与就绪 {#create}

创建后要等到状态 ready 再挂载。

```python
volume = daytona.volume.create("my-data")
volume.wait_until_ready()
```

## 挂载 {#mount}

推荐**每租户一个 subpath**，而不是整卷挂到同一路径：

```python
sandbox = daytona.create(volumes=[{
  "volumeId": volume.id,
  "mountPath": "/data",
  "subpath": "tenant-a",
}])
```

省略 subpath 则挂整棵树，适合所有沙箱共享同一目录。

## 在卷上工作 {#work}

用沙箱文件系统 API 读写挂载路径。删掉沙箱后卷还在。

## 查询与删除 {#crud}

按名字或 ID 获取、列表、删除。删除前确保没有沙箱挂着。

## 沙箱间共享 {#share}

生产者写入后删除沙箱；消费者用同一 `volumeId` 挂上读取。

## 多卷 / 多租户 {#multi}

一台沙箱可挂多个卷。多租户时每个沙箱只挂自己的 subpath，互相看不见。

## 限制与价格 {#limits}

容量、吞吐与计费见 [计费](/docs/billing) 与 [限额](/docs/limits)。
