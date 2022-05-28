# GeoJSON格式
## 原始文档
[The GeoJSON Format](https://datatracker.ietf.org/doc/html/rfc7946)

## 摘要
GeoJson是基于JSON的地理信息交换格式。它定义了几种JSON对象和manner，分别代表地理要素，地理要素的属性和地理要素的扩展。GeoJson使用WGS84（世界地理坐标系1984）作为地理坐标系。

## memo的状态
这是一个国际标准跟踪文档

这个文档是IETF（Internet Engineering Task Force）的产品。

## 著作权注意

## 目录
1. 介绍
    1. 需要的语言
    2. 这篇文章中用到的Conversion
    3. GeoJSON的定义
    4. 定义
    5. 例子
2. GeoJSON文本
3. GeoJSON对象
   1. Geometry对象
      1. Position
      1. Point
      2. MultiPoint
      3. LineString
      4. MultiLineString
      5. Polygon
      6. MultiPolygon
      7. GeometryCollection
      8. Antimeridian Cutting
      9.  Uncertainty and Precision
   2. Feature对象
   3. FeatureCollection对象
4. 坐标参考系统
5. 包围盒
   1. The Connecting Lines
   2. The Antimeridian
   3. The Poles
6. GeoJSON扩展
   1. 外部成员
7. GeoJSON类型是不可扩展的
   1. GeoJSON成员和类型的名称不可变
8. 版本
9. Mapping 'geo' URIs
10. 安全考虑
11. Interoperability考虑
    1. I-JSON
    2. 坐标精度
12. IANA考虑
13. 参考
    1.  Normative参考
    2.  Infomative参考
14. 附录A:Geometry示例
    1.  Points
    2.  LineStrings
    3.  Polygons
    4.  MultiPoints
    5.  MultiLineStrings
    6.  MultiPolygons
    7.  GeometryCollections
15. 附录B:和前IETF GeoJSON格式定义的区别
    1.  Normative区别
    2.  Informative区别
16. 附录C:GeoJOSN文本序列
17. 知识
18. 作者的地址

## 介绍
GeoJSON是一个用JSON\[[RFC7159](https://datatracker.ietf.org/doc/html/rfc7159)\]编码不同地理数据结构的格式。一个GeoJSON对象可能代表一个空间区域（Geometry）,一个有特殊边界的实体（Feature）,GeoJSON支持下面几种Geometry类型：Point，LineString，Polygon，MultiPoint，MultiLineString，MultiPolygon，and GeometryCollection。GeoJSON中的Feature包含一类Geometry和一些属性，一个FeatureCollection包含一个Feature的列表。

GeoJSON格式中的地理数据具有很宽泛的意义，任何空间有质量的物体，不论是不是物理结构，都能是一个Feature,GeoJSON中的概念不是最新的，它来源于开放地理信息系统标准，被改造成适用于使用JSON的网络应用开发。

GeoJSON从用于SQL的开放GIS简单要素定义（OpenGIS Simple Features Implementation Specification for SQL）即[SFSQL](https://datatracker.ietf.org/doc/html/rfc7946#ref-SFSQL)中借用了Geometry类型。零维的Point和MultiPoint，一维的LineString和多MultiLineString，二维的Polygon和MultiPolygon，GeometryCollection。