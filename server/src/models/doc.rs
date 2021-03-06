use axum::extract::{Form, Path};
use axum::routing::{delete, get, post, put};
use axum::{
    extract::{Extension, Query},
    http::StatusCode,
    response::IntoResponse,
    Json, Router,
};
use sea_orm::ActiveValue::NotSet;
use sea_orm::entity::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, Set,ActiveModelTrait};
use serde::{de, Deserialize, Deserializer, Serialize};

use crate::models::{empty_string_as_none, MyPagination, MyResponse};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "tg_doc", schema_name = "public")]
#[serde(rename_all = "camelCase")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)] // Skip deserializing
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

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        panic!("No RelationDef")
    }
}

impl ActiveModelBehavior for ActiveModel {}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QueryListParams {
    #[serde(default, deserialize_with = "empty_string_as_none")]
    cn_name: Option<String>,
    page_size: Option<usize>,
    page_num: Option<usize>,
}

pub async fn query_list(
    Query(params): Query<QueryListParams>,
    Extension(ref conn): Extension<DatabaseConnection>,
) -> impl IntoResponse {
    let page_size = params.page_size.unwrap_or(10);
    let page_num = params.page_num.unwrap_or(1);

    let paginator = Entity::find().paginate(conn, page_size);
    let total = paginator.num_items().await.ok().unwrap();
    let pagination = MyPagination::new(page_size, page_num, total);

    let records = paginator
        .fetch_page(page_num - 1)
        .await
        .expect("??????????????????");
    return MyResponse::success_with_data(records, Some(pagination));
}

pub async fn find_by_id(
    Extension(ref conn): Extension<DatabaseConnection>,
    Path(id): Path<i32>,
) -> impl IntoResponse {
    let find_res: Option<Model> = Entity::find_by_id(id).one(conn).await.expect("not find");
    return match find_res {
        Some(record) => MyResponse::success_with_data(record, None),
        None => MyResponse::not_find(),
    };
}

pub async fn create(
    Json(model): Json<Model>,
    Extension(ref conn): Extension<DatabaseConnection>,
) -> impl IntoResponse {
    let active_model = ActiveModel {
        cn_name: Set(model.cn_name),
        en_name: Set(model.en_name),
        doc_type: Set(model.doc_type),
        link_type: Set(model.link_type),
        description: Set(model.description),
        author: Set(model.author),
        link: Set(model.link),
        page_no: Set(model.page_no),
        language: Set(model.language),
        content: Set(model.content),
        ..Default::default()
    };
    let db_res = active_model.save(conn).await;
    match db_res {
        Ok(raw) => MyResponse::success_with_data(raw.id.unwrap(), None),
        Err(e) => MyResponse::error(format!("{:#?}", e)),
    }
}

pub async fn update(
    Path(id): Path<i32>,
    Json(model): Json<Model>,
    Extension(ref conn): Extension<DatabaseConnection>,
) -> impl IntoResponse {
    let db_res = ActiveModel {
        id: Set(id),
        cn_name: Set(model.cn_name),
        en_name: Set(model.en_name),
        doc_type: Set(model.doc_type),
        link_type: Set(model.link_type),
        description: Set(model.description),
        author: Set(model.author),
        link: Set(model.link),
        page_no: Set(model.page_no),
        language: Set(model.language),
        content: Set(model.content),
    }
        .update(conn)
        .await;
    match db_res {
        Ok(raw) => MyResponse::success_with_data(1, None),
        Err(_) => MyResponse::error("????????????".to_string()),
    }
}

pub async fn deleteOp(
    Extension(ref conn): Extension<DatabaseConnection>,
    Path(id): Path<i32>,
) -> impl IntoResponse {
    let post: Model = Entity::find_by_id(id)
        .one(conn)
        .await
        .unwrap()
        .unwrap()
        .into();
    post.delete(conn).await.unwrap();
    MyResponse::<usize>::success();
}

pub fn route(router: Router) -> Router {
    router
        .route("/doc", get(query_list).post(create))
        .route("/doc/:id", get(find_by_id).delete(deleteOp).put(update))
}
