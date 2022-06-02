use axum::{
    extract::{Extension, Query},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize,Deserializer,de, Serialize};
use sqlx::{Error, PgPool};
use std::{fmt, str::FromStr};

#[derive(Debug, Serialize, Deserialize)]
pub struct TGDoc {
    pub id: i32,
    pub cn_name: Option<String>,
    pub en_name: Option<String>,
    pub doc_type: Option<String>,
    pub link_type: Option<String>,
    pub description: Option<String>,
    pub author: Option<String>,
    pub link: Option<String>,
    pub page_no: Option<i32>,
    pub language: Option<String>,
    pub content: Option<String>,
}
pub async fn query_list(
    Query(params): Query<Params>,
    Extension(pool): Extension<PgPool>,
) -> impl IntoResponse {
    println!("{:#?}",&params);
    let doc_list = sqlx::query_as!(
        TGDoc,
        "
            select * from tg_doc;
        ",
    )
    .fetch_all(&pool)
    .await
    .expect("查询失败");
    (StatusCode::CREATED, Json(doc_list))
}


#[derive(Debug, Serialize, Deserialize)]
pub struct Params {
    #[serde(default, deserialize_with = "empty_string_as_none")]
    id: Option<i32>,
    cn_name:Option<String>
}
/// Serde deserialization decorator to map empty Strings to None,
fn empty_string_as_none<'de, D, T>(de: D) -> Result<Option<T>, D::Error>
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
