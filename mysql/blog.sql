/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 21/03/2022 14:48:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标题',
  `tagId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签id',
  `categoryId` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类id',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '内容',
  `pageImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '封面图片',
  `createTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updateTime` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `star` int NULL DEFAULT 0 COMMENT '点赞数',
  `reading` int(10) UNSIGNED ZEROFILL NULL DEFAULT 0000000001 COMMENT '阅读量',
  `status` int NULL DEFAULT 1 COMMENT '上下线',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tag_id`(`tagId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 180009 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (180003, 'ES6-数组去重', '19007', NULL, '数组去重是面试经常会遇到的问题，解决的方案有很多，本篇着重通过es6提供的新的数据结构来解决。', '数组去重是面试经常会遇到的问题，解决的方案有很多，本篇着重通过es6提供的新的数据结构来解决。\n\n* Map对象解决去重\n* Set对象解决去重\n\n## Map对象解决去重\nMap 对象保存**键值对**。任何值(对象或者原始值) 都可以作为一个键或一个值。\n\n### **Map对象**\n|  方法   | 描述  |\n|  :----:  | :----:  |\n| clear| 删除所有的键/值对，没有返回值 |\n| delete| 删除某个键，返回true。如果删除失败，返回false。|\n| forEach| 	对每个元素执行指定操作。|\n| get | 返回Map对象key相对应的value值。|\n| has| 返回一个布尔值，表示某个键是否在当前Map对象之中。|\n| set | 给Map对象设置key/value键/值对。|\n### 数组去重\n```javascript\nfunction unique(arr) {\n    const res = new Map();\n    return arr.filter((a) => !res.has(a) && res.set(a, 1))\n}\n```\n**Array.filter()**\n> 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。\n\n## Set对象解决去重\n**Set对象**是值的集合,元素只会出现一次,即Set中的元素是**唯一**的.\n通过Set()创建的是一个对象，可以使用**点语法（…）**或者是**Array.from**将其转化为数组，然后既可以使用数组处理函数了。\n\n**Set对象**\n> **语法**：\nnew Set([iterable])\n**参数**：\niterable，如果传递一个可迭代对象(包括 Array，Map，Set，String，TypedArray，arguments 对象等等)，它的所有元素将被添加到新的 Set中。如果不指定此参数或其值为null，则新的 Set为空。\n### 数组去重\n```javascript\nfunction unique(arr) {\n    return Array.from(new Set(arr))\n}\n```\n**Array.from()**\n> 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。', '1635490924807.jpg', '2022-03-20 16:08:58', '2022-03-20 16:08:58', 0, 0000000005, 1);
INSERT INTO `article` VALUES (180004, 'JS-快速排序', '19003', '', '相比传统的排序算法（for循环嵌套），时间复杂度由**O(n²) => O(logn)**。当数据量大的时候就会体现出快排与传统的排序速度的差异，本篇实现快排的一种方法。', '* 为什么选择快速排序？\n* 实现思路\n* 代码实现\n* 总结\n\n## 为什么选择快速排序？\n相比传统的排序算法（for循环嵌套），时间复杂度由**O(n²) => O(logn)**。当数据量大的时候就会体现出快排与传统的排序速度的差异，下面我来实现快排的一种方法。\n## 各大排序算法比较\n<table>\n  <tbody><tr>\n    <th rowspan=\"2\">类别</th>\n    <th rowspan=\"2\">排序方法</th>\n    <th colspan=\"3\">时间复杂度</th>\n    <th>空间复杂度</th>\n    <th rowspan=\"2\">稳定性</th>\n  </tr>\n  <tr>\n    <td>平均情况</td>\n    <td>最好情况</td>\n    <td>最坏情况</td>\n    <td>辅助存储</td>\n  </tr>\n  <tr>\n    <td rowspan=\"2\">插入排序</td>\n    <td>直接插入</td>\n    <td>O(n²)</td>\n    <td>O(n)</td>\n    <td>O(n²)</td>\n    <td>O(1)</td>\n    <td>稳定</td>\n  </tr>\n  <tr>\n    <td>Shell排序</td>\n    <td>O(n^1.3)</td>\n    <td>O(n)</td>\n    <td>O(n²)</td>\n    <td>O(1)</td>\n    <td>不稳定</td>\n  </tr>\n  <tr>\n    <td rowspan=\"2\">选择排序</td>\n    <td>直接选择</td>\n    <td>O(n²)</td>\n    <td>O(n²)</td>\n    <td>O(n²)</td>\n    <td>O(1)</td>\n    <td>不稳定</td>\n  </tr>\n  <tr>\n    <td>堆排序</td>\n    <td>O(nlogn)</td>\n    <td>O(nlogn)</td>\n    <td>O(nlogn)</td>\n    <td>O(1)</td>\n    <td>不稳定</td>\n  </tr>\n  <tr>\n    <td rowspan=\"2\">狡猾排序</td>\n    <td>冒泡排序</td>\n    <td>O(n²)</td>\n    <td>O(n)</td>\n    <td>O(n²)</td>\n    <td>O(1)</td>\n    <td>稳定</td>\n  </tr>\n  <tr>\n    <td>快速排序</td>\n    <td>O(nlogn)</td>\n    <td>O(nlogn)</td>\n    <td>O(n²)</td>\n    <td>O(n)</td>\n    <td>不稳定</td>\n  </tr>\n  <tr>\n    <td colspan=\"2\">归并排序</td>\n    <td>O(nlogn)</td>\n    <td>O(nlogn)</td>\n    <td>O(nlogn)</td>\n    <td>O(n)</td>\n    <td>稳定</td>\n  </tr>\n  <tr>\n    <td colspan=\"2\">基数排序</td>\n    <td>O(d(r+n))</td>\n    <td>O(d(n+rd))</td>\n    <td>O(d(r+n))</td>\n    <td>O(rd+n)</td>\n    <td>稳定</td>\n  </tr>\n</tbody></table>\n\n## 实现思路\n### 1. 确定基准数\n基准数就是选一个数作为标准,方便其他的数和它比较的一个数。\n我们将数组的第一个数作为基准数，将大于基准数的放在基准数的右边，小于基准数的放在放在基准数的左边。\n### 2. 确定数组的边界\n定义两个变量指向序列的最左边(left)和最右边(right),让left自加直到找到大于基准数的时候停下，同理让right自减直到找到小于基准数的时候停下，将两个所对应的值进行交换。然后继续进行上步操作直到left>=right。然后将left对应的值与基准数换位置。\n### 3. 示例\n假设一个数组 arr = [6,1,2,7,9,3,4,5,10,8],对这个数组进行排序。\n**初始状态**\n<table>\n<tbody><tr>\n<th>6</th>\n<th>1</th>\n<th>2</th>\n<th>7</th>\n<th>9</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n<th>10</th>\n<th>8</th>\n</tr>\n<tr>\n<td><b>left</b></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td><b>right</b></td>\n</tr>\n</tbody></table>\n\n**第一次\nleft和right在如下时候停下即（arr[left] > 6 && arr[right] < 6）**\n\n<table>\n<tbody><tr>\n<th>6</th>\n<th>1</th>\n<th>2</th>\n<th>7</th>\n<th>9</th>\n<th>3</th>\n<th>4</th>\n<th>5</th>\n<th>10</th>\n<th>8</th>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td><b>left</b></td>\n<td></td>\n<td></td>\n<td></td>\n<td><b>right</b></td>\n<td></td>\n<td></td>\n</tr>\n</tbody></table>\n\n**left和right所对应的数值交换位置**\n\n<table>\n<tbody><tr>\n<th>6</th>\n<th>1</th>\n<th>2</th>\n<th>5</th>\n<th>9</th>\n<th>3</th>\n<th>4</th>\n<th>7</th>\n<th>10</th>\n<th>8</th>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td><b>left</b></td>\n<td></td>\n<td></td>\n<td></td>\n<td><b>right</b></td>\n<td></td>\n<td></td>\n</tr>\n</tbody></table>	\n\n**第二次\n与第一次同理可得**\n\n<table>\n<tbody><tr>\n<th>6</th>\n<th>1</th>\n<th>2</th>\n<th>5</th>\n<th>4</th>\n<th>3</th>\n<th>9</th>\n<th>7</th>\n<th>10</th>\n<th>8</th>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td><b>left</b></td>\n<td></td>\n<td><b>right</b></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n</tbody></table>	\n	\n**第三次\nleft和right相遇了**\n\n<table>\n<tbody><tr>\n<th>6</th>\n<th>1</th>\n<th>2</th>\n<th>5</th>\n<th>4</th>\n<th>3</th>\n<th>9</th>\n<th>7</th>\n<th>10</th>\n<th>8</th>\n</tr>\n<tr>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n<td><b>right</b>--<b>left</b></td>\n<td></td>\n<td></td>\n<td></td>\n<td></td>\n</tr>\n</tbody></table>	\n		\n**与基准数交换,第一次排序就完成了**\n\n<table>\n<tbody><tr>\n<th>3</th>\n<th>1</th>\n<th>2</th>\n<th>5</th>\n<th>4</th>\n<th>6</th>\n<th>9</th>\n<th>7</th>\n<th>10</th>\n<th>8</th>\n</tr>\n</tbody></table>\n\n## 代码实现\n```javascript\nfunction quick_sort(arr,left, right){\n        var i = left\n        var j = right\n        var z = arr[left]\n        if(left >= right){ // 如果数组只有一个元素\n            return;\n         }\n        while (i < j) {\n            while(arr[j] > z && i < j){\n                j--\n            }\n            while(arr[i] <= z && i < j) {\n                i++\n            }\n            if (i < j) {\n                var n = arr[i]\n                arr[i] = arr[j]\n                arr[j] = n\n            }\n        }\n        arr[left] = arr[i]\n        arr[i] = z\n        \n        quick_sort(arr,left,i-1) // 将基准数的左边进行排序\n        quick_sort(arr,i+1,right)// 将基准数的右边进行排序\n    }\n```\n\n## 总结\n### 优点：\n> 1.用下标取基数，只有一个赋值操作，更快；\n2.原地交换，不需要新建多余的数组容器存储被划分的数据，节省存储；\n### 缺点：\n> 1.实际测试的时候，以第一个数为基准数的快排存在速度慢，数组超过10000条数据还会出现Maximum call stack size exceeded的情况', '1635490833896.jpg', '2022-03-20 12:21:29', '2022-03-20 12:21:28', 0, 0000000006, 1);
INSERT INTO `article` VALUES (180005, 'JS获取URL中参数值', '19003', '19003', '当你进行表单提交用到get的方式的时候，经常会需要在跳转页面中获取URL中的参数，所以本篇就介绍获取URL参数的两种方法：正则法|split拆分法', '\n当你进行表单提交用到get的方式的时候，经常会需要在跳转页面中获取URL中的参数，所以本篇就介绍获取URL参数的两种方法：\n\n* 正则法\n* split拆分法\n\n## 正则法\n**通过正则表达式对URL进行匹配**\n### 函数代码\n```javascript\nfunction GetQueryString(name) {\n    var reg = new RegExp(\'(^|&)\' + name + \'=([^&]*)(&|$)\', \'i\');\n    var r = window.location.search.substr(1).match(reg);//匹配URL的\'?\'符之后的正则表达式\n    if (r != null) {\n        return unescape(r[2]);\n    }\n    return null;\n}\n```\n### 部分函数解析\n> **RegExp()**\nRegExp 对象表示正则表达式，它是对字符串执行模式匹配的强大工具。\n**substr()**\n在字符串中抽取从 start 下标开始的指定数目的字符。\n**unescape()**\n对通过 escape() 编码的字符串进行解码。\n## split拆分法\n\n### 函数代码\n```javascript\nfunction GetQueryValue(queryName) {\n    var query = unescape(window.location.search.substr(1));\n    var vars = query.split(\"&\");\n    for (var i = 0; i < vars.length; i++) {\n        var pair = vars[i].split(\"=\");\n        if (pair[0] == queryName) {\n            return pair[1];\n        }\n    }\n  return null;\n}\n```\n', '1635490867522.jpg', '2022-03-20 16:08:49', '2022-03-20 16:08:49', 0, 0000000006, 1);
INSERT INTO `article` VALUES (180006, 'http和https', '', NULL, '本篇主要描述http和https的概念和区别，以及常见的http状态码', '\n* http和https的概念\n* http常见的状态码\n* http和https的区别\n* https相对于http的改进\n* https的工作原理\n\n## http和https的概念\n**HTTP协议**是一种使用明文数据传输的网络协议。\n**HTTPS协议**可以理解为HTTP协议的升级，就是在HTTP的基础上增加了数据加密。在数据进行传输之前，对数据进行加密，然后再发送到服务器。\n------\n## http常见的状态码\n|  状态码   | 响应类别  | 原因  |\n|  :----:  | :----:  | :----:  |\n| 1XX  | 信息性状态码(Informational)  | 服务器正在处理请求  |\n2XX  | 成功状态码(Success)  | 请求已正常处理完毕  |\n3XX  | 重定向状态码(Redirection)  | 需要进行额外操作以完成请求  |\n4XX  | 客户端错误状态码(Client Error)  | 客户端原因导致服务器无法处理请求  |\n5XX  | 服务器错误状态码（Server Error)  | 服务器原因导致处理请求出错  |\n\n### 1xx（信息）\n> **100 Continue**\n继续。客户端应继续其请求\n**101 Switching Protocols**\n切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议\n\n### 2xx（成功）\n> **200 OK**\n表示请求被服务器正常处理\n**201 Creanted**\n已创建。成功请求并创建了新的资源\n**202 Accepted**\n已接受。已经接受请求，但未处理完成\n**203 Non-Authoritative Information**\n非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本\n**204 No Content**\n表示请求已成功处理，但是没有内容返回（就应该没有内容返回的状况）\n**205 Reset Content**\n重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域\n**206 Partial Content**\n表示服务器已经完成了部分GET请求（客户端进行了范围请求）\n\n### 3xx（重定向）\n> **301 Moved Permanently**\n永久重定向，表示请求的资源已经永久的搬到了其他位置\n**302 Found**\n临时重定向，表示请求的资源临时搬到了其他位置\n**303 See Other**\n表示请求资源存在另一个URI，应使用GET定向获取请求资源\n**304 Not Modified**\n表示客户端发送附带条件的请求（GET方法请求报文中的IF…）时，条件不满足\n**307 Temporary Redirect**\n临时重定向，和302有着相同含义\n\n### 4xx（客户端错误）\n> **400 Bad Request**\n表示请求报文存在语法错误或参数错误，服务器不理解\n**401 Unauthorized**\n表示发送的请求需要有HTTP认证信息或者是认证失败了\n**403 Forbidden**\n表示对请求资源的访问被服务器拒绝了\n**404 Not Found**\n表示服务器找不到你请求的资源\n\n### 5xx（服务器错误）\n> **500 Internal Server Error**\n表示服务器执行请求的时候出错了\n**503 Service Unavailable**\n表示服务器超负载或正停机维护，无法处理请求\n\n------\n\n## http和https的区别\n|  协议   | 数据加密传输(本质区别)  | 传输协议  | 端口 |\n|  :----:  | :----:  | :----:  | :----:  |\n| HTTP| 无| 超文本传输协议| 80|\n| HTTPS| 有| ssl加密传输协议| 443|\n\n## https相对于http的改进\n\n**1.双向的身份认证**\n> 客户端和服务端在传输数据之前,会通过基于X.509证书对双方进行身份认证 。\n\n**2.数据传输的机密性**\n> 客户端和服务端在开始传输数据之前，会协商传输过程需要使用的加密算法。\n\n**3.防止重放攻击**\n > SSL使用序列号来保护通讯方免受报文重放攻击。这个序列号被加密后作为数据包的负载。在整个SSL握手中,都有一个唯一的随机数来标记SSL握手。 这样防止了攻击者嗅探整个登录过程，获取到加密的登录数据之后，不对数据进行解密, 而直接重传登录数据包的攻击手法。\n\n## https的工作原理\n1. 客户使用https的URL访问Web服务器，要求与Web服务器建立SSL连接。\n2. Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。\n3. 客户端的浏览器与Web服务器开始协商SSL连接的安全等级，也就是信息加密的等级。\n4. 客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。\n5. Web服务器利用自己的私钥解密出会话密钥。\n6. Web服务器利用会话密钥加密与客户端之间的通信。', '1635490370763.jpg', '2021-11-10 06:25:48', '2021-11-10 06:25:48', 0, 0000000033, 1);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1 COMMENT '上下线：1上0下',
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19018 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (19001, 'vue', 1, '2021-10-26 23:16:40', '2021-10-26 23:16:40');
INSERT INTO `category` VALUES (19002, 'react', 1, '2021-10-27 00:08:57', '2021-10-27 00:08:57');
INSERT INTO `category` VALUES (19003, 'js', 1, '2021-10-27 00:09:10', '2021-10-27 00:09:10');
INSERT INTO `category` VALUES (19004, 'css', 1, '2021-10-27 00:09:19', '2021-10-27 00:09:19');
INSERT INTO `category` VALUES (19005, 'html', 1, '2021-10-27 07:27:50', '2021-10-27 07:27:50');
INSERT INTO `category` VALUES (19008, '前端', 1, '2021-10-27 07:38:11', '2021-11-15 17:03:04');
INSERT INTO `category` VALUES (19017, '微前端', 1, '2021-11-16 15:24:14', '2022-03-20 12:11:29');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tagName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1 COMMENT '上下线：1上0下',
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19017 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (19001, 'vue', 1, '2021-10-26 23:16:40', '2021-10-26 23:16:40');
INSERT INTO `tag` VALUES (19002, 'react', 1, '2021-10-27 00:08:57', '2021-10-27 00:08:57');
INSERT INTO `tag` VALUES (19003, 'js', 1, '2021-10-27 00:09:10', '2021-10-27 00:09:10');
INSERT INTO `tag` VALUES (19004, 'css', 1, '2021-10-27 00:09:19', '2021-10-27 00:09:19');
INSERT INTO `tag` VALUES (19005, 'html', 1, '2021-10-27 07:27:50', '2021-10-27 07:27:50');
INSERT INTO `tag` VALUES (19007, 'es6', 1, '2021-10-27 07:36:29', '2021-10-27 07:36:29');
INSERT INTO `tag` VALUES (19008, '前端', 1, '2021-10-27 07:38:11', '2021-11-15 17:03:04');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录的用户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createTime` datetime NULL DEFAULT NULL,
  `updateTime` datetime NULL DEFAULT NULL,
  `blogname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '博客用户名',
  `motto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '个性签名',
  `github` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像图片链接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10002 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (10001, 'admin', 'admin', '2021-10-01 00:52:10', '2021-11-09 14:44:24', '笨鸟', '让自己的内心藏着一条巨龙,既是一种苦刑,也是一种乐趣', 'http://zhan-hc.github.io', 'http://localhost:3000/images/1636469061327.jfif');

SET FOREIGN_KEY_CHECKS = 1;
