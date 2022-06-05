pub mod doc;

use axum::response::IntoResponse;
use axum::{http::StatusCode, Json};
use sea_orm::Paginator;
use serde::{de, Deserialize, Deserializer, Serialize};
use std::{fmt, str::FromStr};

/// Serde deserialization decorator to map empty Strings to None,
pub fn empty_string_as_none<'de, D, T>(de: D) -> Result<Option<T>, D::Error>
where
    D: Deserializer<'de>,
    T: FromStr,
    T::Err: fmt::Display,
{
    let opt = Option::<String>::deserialize(de)?;
    match opt.as_deref() {
        None | Some("") => Ok(None),
        Some(s) => FromStr::from_str(s).map_err(de::Error::custom).map(Some),
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MyPagination {
    page_size: usize,
    page_num: usize,
    total: usize,
}

impl MyPagination {
    pub fn new(page_size: usize, page_num: usize, total: usize) -> MyPagination {
        return MyPagination {
            page_size,
            page_num,
            total,
        };
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct MyResponse<T> {
    pub msg: String,
    pub code: i32,
    pub data: Option<T>,
    pub pagination: Option<MyPagination>,
}

type MyResponseIntoResponse<T> = (StatusCode, Json<MyResponse<T>>);

impl<T> MyResponse<T>
where
    MyResponseIntoResponse<T>: IntoResponse,
{
    pub fn new(
        msg: &str,
        code: i32,
        data: Option<T>,
        pagination: Option<MyPagination>,
    ) -> MyResponse<T> {
        return MyResponse {
            msg: msg.into(),
            code,
            data,
            pagination,
        };
    }
    pub fn success_with_data(
        data: T,
        pagination: Option<MyPagination>,
    ) -> MyResponseIntoResponse<T> {
        let res = MyResponse::new("成功", 200, Some(data), pagination);
        return (StatusCode::CREATED, Json(res));
    }
    pub fn success() -> MyResponseIntoResponse<T> {
        let res = MyResponse::new("成功", 200, None, None);
        return (StatusCode::CREATED, Json(res));
    }
    pub fn not_find() -> MyResponseIntoResponse<T> {
        let res = MyResponse::new("没有找到", 100, None, None);
        return (StatusCode::CREATED, Json(res));
    }
    pub fn error(msg:String) -> MyResponseIntoResponse<T> {
        let res = MyResponse::new(msg.as_str(), 100, None, None);
        return (StatusCode::CREATED, Json(res));
    }
}